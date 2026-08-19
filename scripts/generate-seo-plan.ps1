param(
  [string]$SitemapUrl = 'https://abatek.ru/sitemap.xml',
  [string]$OutputPath = (Join-Path $PSScriptRoot '..\ABATEK_SEO_PLAN.md')
)

$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

function ConvertFrom-HtmlText([string]$Value) {
  if ([string]::IsNullOrWhiteSpace($Value)) { return '' }
  $withoutTags = [regex]::Replace($Value, '<[^>]+>', ' ')
  $decoded = [System.Net.WebUtility]::HtmlDecode($withoutTags)
  return [regex]::Replace($decoded, '\s+', ' ').Trim()
}

function Get-MatchText([string]$Html, [string]$Pattern) {
  $match = [regex]::Match($Html, $Pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor [System.Text.RegularExpressions.RegexOptions]::Singleline)
  if (-not $match.Success) { return '' }
  return ConvertFrom-HtmlText $match.Groups[1].Value
}

function Get-PageFamily([string]$Path) {
  $families = [ordered]@{
    'Ленточные конвейеры — гео' = '^lentochnye-konvejery-.+'
    'Резервуары РГС — гео' = '^rezervuary-rgs-.+'
    'Силосы для зерна — гео' = '^silos-dlja-zerna-.+'
    'Силосы для цемента — гео' = '^silosy-dlya-(?:cementa|tsementa)-.+'
    'Силосы — гео' = '^silosy-.+'
    'Электроножи — гео' = '^elektronoji-dlya-rezki-konveyernih-lent-tehnicheskih-plastin-.+'
    'Резервуары РГС — объём' = '^rgs-\d+$'
    'Конвейеры по назначению' = '^(?:konvejery-dlya-|konveyer-dlya-|transporterdlya)'
    'Ленточные конвейеры — тип' = '^(?:g-obraznye|gorizontalnyj|naklonnyj|povorotnye|z-obraznyj|konveyer-lentochnyy)'
    'Роликовые конвейеры' = '^(?:rolgang|neprivodnye-rolikovye|privodnye-rolikovye|razdvizhnoj-rolgang|sharikovye-stoly)'
    'Комплектующие' = '^(?:barabany|kovshi|rolikikonveyernye|rolikoopory|shneki-konveera|komplektuyushie)'
  }
  foreach ($entry in $families.GetEnumerator()) {
    if ($Path -match $entry.Value) { return $entry.Key }
  }
  return 'Самостоятельная страница'
}

function Get-BlockSummary([string[]]$Headings, [string]$H1) {
  $items = @()
  if ($H1) { $items += "hero/H1: $H1" }
  foreach ($heading in ($Headings | Select-Object -First 5)) { $items += $heading }
  if ($items.Count -eq 0) { return 'Структура заголовков не извлечена; требуется ручная проверка контента.' }
  return ($items -join '; ')
}

function Get-SeoActions($Page, [int]$TitleCount, [int]$DescriptionCount, [int]$H1Count) {
  $actions = [System.Collections.Generic.List[string]]::new()
  if (-not $Page.Title) { $actions.Add('добавить уникальный title') }
  elseif ($Page.Title.Length -gt 65) { $actions.Add('сократить title примерно до 50–65 знаков') }
  elseif ($TitleCount -gt 1) { $actions.Add("уникализировать title: совпадает у $TitleCount URL") }
  else { $actions.Add('сохранить уникальный title и проверить коммерческий интент') }

  if (-not $Page.Description) { $actions.Add('добавить уникальный meta description') }
  elseif ($DescriptionCount -gt 1) { $actions.Add("уникализировать description: совпадает у $DescriptionCount URL") }
  elseif ($Page.Description.Length -gt 170) { $actions.Add('сократить description до информативного сниппета') }

  if (-not $Page.H1) { $actions.Add('добавить один H1') }
  elseif ($H1Count -gt 1) { $actions.Add("устранить повтор H1: совпадает у $H1Count URL") }

  if ($Page.Family -like '*гео') {
    $actions.Add('добавить реальные локальные условия доставки/монтажа, кейс или срок расчёта; без уникальных данных рассмотреть canonical/noindex либо объединение')
  }
  if ($Page.Family -eq 'Резервуары РГС — объём') {
    $actions.Add('добавить подтверждённые характеристики конкретного объёма, таблицу параметров и Product/Offer только при наличии фактических данных')
  }
  if ($Page.Headings.Count -lt 2) { $actions.Add('расширить логичную H2-структуру: назначение, варианты, процесс, FAQ, CTA') }
  $actions.Add('проверить canonical, breadcrumbs, внутренние ссылки, alt изображений и индексируемый SSR-контент')
  return ($actions -join '; ')
}

$sitemap = [xml](Invoke-WebRequest -UseBasicParsing -Uri $SitemapUrl).Content
$urls = @($sitemap.urlset.url.loc)
$pages = [System.Collections.Generic.List[object]]::new()

foreach ($url in $urls) {
  try {
    $response = Invoke-WebRequest -UseBasicParsing -Uri $url -TimeoutSec 40
    $html = $response.Content
    $uri = [uri]$url
    $path = $uri.AbsolutePath.Trim('/')
    $title = Get-MatchText $html '<title[^>]*>(.*?)</title>'
    $description = Get-MatchText $html '<meta[^>]+name=["'']description["''][^>]+content=["''](.*?)["'']'
    if (-not $description) { $description = Get-MatchText $html '<meta[^>]+content=["''](.*?)["''][^>]+name=["'']description["'']' }
    $h1Matches = [regex]::Matches($html, '<h1[^>]*>(.*?)</h1>', 'IgnoreCase,Singleline')
    $h1 = if ($h1Matches.Count) { ConvertFrom-HtmlText $h1Matches[0].Groups[1].Value } else { '' }
    $headings = @([regex]::Matches($html, '<h[2-3][^>]*>(.*?)</h[2-3]>', 'IgnoreCase,Singleline') | ForEach-Object { ConvertFrom-HtmlText $_.Groups[1].Value } | Where-Object { $_ })
    $pages.Add([pscustomobject]@{ Url = $url; Path = $path; Status = [int]$response.StatusCode; Title = $title; Description = $description; H1 = $h1; H1Elements = $h1Matches.Count; Headings = $headings; Family = Get-PageFamily $path })
  } catch {
    $pages.Add([pscustomobject]@{ Url = $url; Path = ([uri]$url).AbsolutePath.Trim('/'); Status = 'ERROR'; Title = ''; Description = ''; H1 = ''; H1Elements = 0; Headings = @(); Family = Get-PageFamily ([uri]$url).AbsolutePath.Trim('/') })
  }
}

$titleGroups = $pages | Where-Object Title | Group-Object Title -AsHashTable -AsString
$descriptionGroups = $pages | Where-Object Description | Group-Object Description -AsHashTable -AsString
$h1Groups = $pages | Where-Object H1 | Group-Object H1 -AsHashTable -AsString
$failed = @($pages | Where-Object Status -ne 200).Count
$duplicateTitles = @($titleGroups.Values | Where-Object Count -gt 1).Count
$duplicateDescriptions = @($descriptionGroups.Values | Where-Object Count -gt 1).Count
$duplicateH1 = @($h1Groups.Values | Where-Object Count -gt 1).Count

$lines = [System.Collections.Generic.List[string]]::new()
$lines.Add('# План контента и SEO для abatek.ru')
$lines.Add('')
$lines.Add("Дата аудита: $(Get-Date -Format 'yyyy-MM-dd HH:mm zzz'). Источник URL: [$SitemapUrl]($SitemapUrl). Проанализировано: **$($pages.Count)** страниц; ошибок ответа: **$failed**.")
$lines.Add('')
$lines.Add('> Это план улучшений по фактическому HTML сайта на дату аудита, а не отчёт о уже внедрённых изменениях. Формулировка «SEO» у каждой страницы означает рекомендуемые действия. Перед публикацией технические характеристики и коммерческие утверждения необходимо подтвердить данными компании.')
$lines.Add('')
$lines.Add('## Общая стратегия')
$lines.Add('')
$lines.Add("- Найдено групп повторяющихся title: **$duplicateTitles**, description: **$duplicateDescriptions**, H1: **$duplicateH1**.")
$lines.Add('- Сохранить один поисковый интент на URL: категория, тип оборудования, применение, объём или регион не должны конкурировать друг с другом.')
$lines.Add('- Геостраницы индексировать только при наличии полезных локальных данных. Простая замена города создаёт doorway/duplicate-риск; слабые страницы объединить, canonical-направить или закрыть от индексации после анализа трафика и ссылок.')
$lines.Add('- Для товарных и категорийных страниц: уникальные title/description/H1, хлебные крошки, связанный каталог, подтверждённые параметры, кейсы, FAQ и понятный CTA.')
$lines.Add('- Schema.org: BreadcrumbList для иерархии; Organization на уровне сайта; Product/Offer только при реальном товаре, цене/условиях и доступности; FAQPage только для видимого уникального FAQ и с учётом актуальных правил поисковиков.')
$lines.Add('- Настроить 301-карту до смены URL, self-canonical, XML sitemap только для канонических 200-страниц, robots.txt и контроль индексации в Яндекс Вебмастере/Google Search Console.')
$lines.Add('')
$lines.Add('## Шаблоны контентных блоков')
$lines.Add('')
$lines.Add('- Категория/тип оборудования: hero → назначение → варианты исполнения → подтверждённые характеристики → процесс проектирования/производства → кейсы → FAQ → связанные решения → CTA.')
$lines.Add('- Страница применения: hero → задача отрасли/груза → требования к перемещению → подходящие конфигурации → ограничения → кейс → FAQ → CTA.')
$lines.Add('- Геостраница: hero с городом → что и куда поставляется → реальные условия логистики → локальный кейс/фото/документ → этапы заказа → контакты → FAQ. Без уникальных локальных фактов страницу не индексировать как самостоятельную.')
$lines.Add('- Страница объёма РГС: hero → назначение → подтверждённая таблица параметров → комплектация → документация → производство/контроль → доставка → FAQ → CTA.')
$lines.Add('')
$lines.Add('## Реестр всех страниц')
$lines.Add('')

$index = 0
foreach ($page in $pages) {
  $index++
  $titleCount = if ($page.Title -and $titleGroups.ContainsKey($page.Title)) { $titleGroups[$page.Title].Count } else { 0 }
  $descriptionCount = if ($page.Description -and $descriptionGroups.ContainsKey($page.Description)) { $descriptionGroups[$page.Description].Count } else { 0 }
  $h1Count = if ($page.H1 -and $h1Groups.ContainsKey($page.H1)) { $h1Groups[$page.H1].Count } else { 0 }
  $summary = Get-BlockSummary $page.Headings $page.H1
  $seo = Get-SeoActions $page $titleCount $descriptionCount $h1Count
  $safeTitle = if ($page.Title) { $page.Title } else { 'нет' }
  $safeDescription = if ($page.Description) { $page.Description } else { 'нет' }
  $lines.Add("### $index. [$($page.Url)]($($page.Url))")
  $lines.Add('')
  $lines.Add("- **Тип:** $($page.Family). **HTTP:** $($page.Status).")
  $lines.Add("- **Сейчас:** title — $safeTitle; description — $safeDescription; H1 — $(if ($page.H1) { $page.H1 } else { 'нет' }).")
  $lines.Add("- **Кратко о блоках:** $summary")
  $lines.Add("- **SEO-план:** $seo.")
  $lines.Add('')
}

$resolvedOutput = [System.IO.Path]::GetFullPath($OutputPath)
[System.IO.File]::WriteAllLines($resolvedOutput, $lines, [System.Text.UTF8Encoding]::new($false))
Write-Output "Created $resolvedOutput with $($pages.Count) pages"
