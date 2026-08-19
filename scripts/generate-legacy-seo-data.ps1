param(
  [string]$PlanPath = (Join-Path $PSScriptRoot '..\ABATEK_SEO_PLAN.md'),
  [string]$OutputPath = (Join-Path $PSScriptRoot '..\app\data\legacySeo.ts')
)

$content = Get-Content -Raw -Encoding UTF8 $PlanPath
$pattern = '(?ms)^### \d+\. \[(https://abatek\.ru/[^]]*)\]\([^)]*\)\s+.*?^- \*\*Сейчас:\*\* title — (.*?); description — (.*?); H1 — (.*?)\.\s*$'
$matches = [regex]::Matches($content, $pattern)
$lines = [System.Collections.Generic.List[string]]::new()
$lines.Add('// Сгенерировано из фактического аудита ABATEK_SEO_PLAN.md. Не редактировать вручную.')
$lines.Add('export interface LegacySeoEntry {')
$lines.Add('  title: string;')
$lines.Add('  description: string;')
$lines.Add('  h1: string;')
$lines.Add('}')
$lines.Add('')
$lines.Add('export const legacySeo: Record<string, LegacySeoEntry> = {')

foreach ($match in $matches) {
  $uri = [uri]$match.Groups[1].Value
  $slug = [uri]::UnescapeDataString($uri.AbsolutePath.Trim('/'))
  if (-not $slug) { continue }
  $title = $match.Groups[2].Value.Replace('\', '\\').Replace("'", "\'")
  $description = $match.Groups[3].Value.Replace('\', '\\').Replace("'", "\'")
  $h1 = $match.Groups[4].Value.Replace('\', '\\').Replace("'", "\'")
  $lines.Add("  '$slug': {")
  $lines.Add("    title: '$title',")
  $lines.Add("    description: '$description',")
  $lines.Add("    h1: '$h1',")
  $lines.Add('  },')
}

$lines.Add('};')
[System.IO.File]::WriteAllLines([System.IO.Path]::GetFullPath($OutputPath), $lines, [System.Text.UTF8Encoding]::new($false))
Write-Output "Created $OutputPath with $($matches.Count - 1) legacy entries"
