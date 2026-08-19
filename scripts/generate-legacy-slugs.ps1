param(
  [string]$PlanPath = (Join-Path $PSScriptRoot '..\ABATEK_SEO_PLAN.md'),
  [string]$OutputPath = (Join-Path $PSScriptRoot '..\app\data\legacySlugs.ts')
)

$urls = Select-String -Path $PlanPath -Encoding UTF8 -Pattern '^### \d+\. \[(https://abatek\.ru/[^]]*)\]' | ForEach-Object {
  $_.Matches[0].Groups[1].Value
}

$slugs = $urls | ForEach-Object { [uri]::UnescapeDataString(([uri]$_).AbsolutePath.Trim('/')) } | Where-Object { $_ }
$lines = [System.Collections.Generic.List[string]]::new()
$lines.Add('// Сгенерировано из ABATEK_SEO_PLAN.md. Не редактировать вручную.')
$lines.Add('export const legacySlugs = [')
foreach ($slug in $slugs) {
  $escaped = $slug.Replace("'", "\'")
  $lines.Add("  '$escaped',")
}
$lines.Add('] as const;')
$lines.Add('')
$lines.Add('export const legacySlugSet: ReadonlySet<string> = new Set(legacySlugs);')

[System.IO.File]::WriteAllLines([System.IO.Path]::GetFullPath($OutputPath), $lines, [System.Text.UTF8Encoding]::new($false))
Write-Output "Created $OutputPath with $($slugs.Count) slugs"
