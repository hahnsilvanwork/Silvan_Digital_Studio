param(
  [Parameter(Mandatory = $true)]
  [string]$ImporterPath
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

. $ImporterPath -LibraryOnly

$allowedUri = [Uri]"https://lh3.googleusercontent.com/aida-public/approved"
Assert-ApprovedAssetUri -Uri $allowedUri

foreach ($blockedUri in @(
  [Uri]"http://lh3.googleusercontent.com/aida-public/insecure",
  [Uri]"https://example.com/aida-public/unapproved"
)) {
  $blocked = $false
  try {
    Assert-ApprovedAssetUri -Uri $blockedUri
  }
  catch {
    $blocked = $true
  }

  if (-not $blocked) {
    throw "Unsafe URI was accepted: $blockedUri"
  }
}

$testRoot = [System.IO.Path]::GetFullPath([System.IO.Path]::GetTempPath())
$testDirectory = [System.IO.Path]::Combine(
  $testRoot,
  "silvan-importer-test-$([Guid]::NewGuid().ToString('N'))"
)
[System.IO.Directory]::CreateDirectory($testDirectory) | Out-Null
$temporaryPath = Join-Path $testDirectory "oversized.tmp"
$targetPath = Join-Path $testDirectory "approved.jpg"

try {
  $payload = [byte[]](0, 1, 2, 3, 4, 5)
  $approvedBytes = [byte[]](99, 98, 97)
  [System.IO.File]::WriteAllBytes($targetPath, $approvedBytes)
  $source = [System.IO.MemoryStream]::new($payload, $false)
  $cancellation = [System.Threading.CancellationTokenSource]::new()
  $overflowBlocked = $false

  try {
    Install-ApprovedAssetStream `
      -SourceStream $source `
      -TargetPath $targetPath `
      -TemporaryPath $temporaryPath `
      -ExpectedBytes 4 `
      -ExpectedSha256 ("0" * 64) `
      -CancellationTokenSource $cancellation | Out-Null
  }
  catch {
    $overflowBlocked = $true
  }
  finally {
    $source.Dispose()
  }

  if (-not $overflowBlocked) {
    throw "Oversized stream was accepted"
  }

  if (-not $cancellation.IsCancellationRequested) {
    throw "Oversized stream did not cancel the request"
  }

  if (Test-Path -LiteralPath $temporaryPath) {
    throw "Oversized stream left a temporary file behind"
  }

  $preservedBytes = [System.IO.File]::ReadAllBytes($targetPath)
  if ($preservedBytes.Length -ne $approvedBytes.Length) {
    throw "Oversized stream replaced the approved target"
  }

  for ($index = 0; $index -lt $approvedBytes.Length; $index++) {
    if ($preservedBytes[$index] -ne $approvedBytes[$index]) {
      throw "Oversized stream changed the approved target"
    }
  }

  Write-Output "IMPORTER_BEHAVIOR_PASS"
}
finally {
  if ($testDirectory.StartsWith(
    $testRoot,
    [System.StringComparison]::OrdinalIgnoreCase
  ) -and (Test-Path -LiteralPath $testDirectory)) {
    Remove-Item -LiteralPath $testDirectory -Recurse -Force
  }
}
