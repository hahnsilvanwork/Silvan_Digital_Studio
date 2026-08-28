<#
.SYNOPSIS
  Imports the four approved concept visuals from the supplied Stitch mockups into
  public/images/projects so the site has no runtime dependency on Google hosting.

.DESCRIPTION
  Every asset is pinned by byte length and SHA-256. A download only replaces an
  approved file after the serving origin, the media type and the full body have
  been verified, so a redirected, oversized or altered response can never land in
  the repository.

.PARAMETER LibraryOnly
  Defines the helper functions and returns without contacting the network. Used by
  tests/unit/importer-contract.test.ts to exercise the safety helpers directly.
#>
[CmdletBinding()]
param(
  [switch]$LibraryOnly
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Net.Http

$script:ApprovedAssetScheme = "https"
$script:ApprovedAssetHost = "lh3.googleusercontent.com"
$script:ApprovedAssetPathPrefix = "/aida-public/"

function Assert-ApprovedAssetUri {
  [CmdletBinding()]
  param(
    [Parameter(Mandatory = $true)]
    [Uri]$Uri
  )

  if ($null -eq $Uri) {
    throw "No asset URI was supplied"
  }

  if (-not $Uri.IsAbsoluteUri) {
    throw "Refusing relative asset URI: $Uri"
  }

  if ($Uri.Scheme -ne $script:ApprovedAssetScheme) {
    throw "Refusing non-$($script:ApprovedAssetScheme) asset URI: $Uri"
  }

  # A populated userinfo section is the classic way to make a hostile host look
  # approved in a glance-read log line.
  if (-not [string]::IsNullOrEmpty($Uri.UserInfo)) {
    throw "Refusing asset URI carrying userinfo: $Uri"
  }

  if ($Uri.Host -ne $script:ApprovedAssetHost) {
    throw "Refusing asset host $($Uri.Host); expected $($script:ApprovedAssetHost)"
  }

  if (-not $Uri.AbsolutePath.StartsWith(
    $script:ApprovedAssetPathPrefix,
    [System.StringComparison]::Ordinal
  )) {
    throw "Refusing asset path $($Uri.AbsolutePath) outside $($script:ApprovedAssetPathPrefix)"
  }
}

function Get-ApprovedAssetResponse {
  [CmdletBinding()]
  param(
    [Parameter(Mandatory = $true)]
    [System.Net.Http.HttpClient]$Client,

    [Parameter(Mandatory = $true)]
    [Uri]$Uri,

    [Parameter(Mandatory = $true)]
    [string]$ContentType,

    [Parameter(Mandatory = $true)]
    [int]$MaximumBytes,

    [Parameter(Mandatory = $true)]
    [System.Threading.CancellationTokenSource]$CancellationTokenSource
  )

  Assert-ApprovedAssetUri -Uri $Uri

  $response = $Client.GetAsync(
    $Uri,
    [System.Net.Http.HttpCompletionOption]::ResponseHeadersRead,
    $CancellationTokenSource.Token
  ).GetAwaiter().GetResult()

  try {
    if (-not $response.IsSuccessStatusCode) {
      throw "HTTP $([int]$response.StatusCode) $($response.ReasonPhrase)"
    }

    # Redirects are followed automatically, so the URI that actually served this
    # body is the one that has to be approved, not just the one we asked for.
    Assert-ApprovedAssetUri -Uri $response.RequestMessage.RequestUri

    $mediaType = $response.Content.Headers.ContentType.MediaType
    if ($mediaType -ne $ContentType) {
      throw "Expected $ContentType, received $mediaType"
    }

    $declaredLength = $response.Content.Headers.ContentLength
    if ($null -ne $declaredLength -and $declaredLength -gt $MaximumBytes) {
      throw "Declared length $declaredLength exceeds the approved body size"
    }
  }
  catch {
    $response.Dispose()
    throw
  }

  return $response
}

function Install-ApprovedAssetStream {
  [CmdletBinding()]
  param(
    [Parameter(Mandatory = $true)]
    [System.IO.Stream]$SourceStream,

    [Parameter(Mandatory = $true)]
    [string]$TargetPath,

    [Parameter(Mandatory = $true)]
    [string]$TemporaryPath,

    [Parameter(Mandatory = $true)]
    [int]$ExpectedBytes,

    [Parameter(Mandatory = $true)]
    [string]$ExpectedSha256,

    [Parameter(Mandatory = $true)]
    [System.Threading.CancellationTokenSource]$CancellationTokenSource
  )

  # One byte past the approved length already proves the body is wrong, so an
  # oversized or endless response is never written to disk in full.
  $maximumBytes = $ExpectedBytes + 1
  $buffer = [byte[]]::new(65536)
  $written = 0

  try {
    $targetStream = [System.IO.File]::Open(
      $TemporaryPath,
      [System.IO.FileMode]::CreateNew,
      [System.IO.FileAccess]::Write,
      [System.IO.FileShare]::None
    )

    try {
      while ($true) {
        $read = $SourceStream.Read($buffer, 0, $buffer.Length)
        if ($read -le 0) {
          break
        }

        $written += $read
        if ($written -gt $maximumBytes) {
          throw "Response body exceeded the approved $ExpectedBytes byte length"
        }

        $targetStream.Write($buffer, 0, $read)
      }
    }
    finally {
      $targetStream.Dispose()
    }

    if ($written -ne $ExpectedBytes) {
      throw "Expected $ExpectedBytes bytes, received $written"
    }

    $downloadHash = (Get-FileHash -LiteralPath $TemporaryPath -Algorithm SHA256).Hash
    if ($downloadHash -ne $ExpectedSha256) {
      throw "SHA-256 $downloadHash does not match the approved asset"
    }

    Move-Item -LiteralPath $TemporaryPath -Destination $TargetPath -Force

    return (Get-Item -LiteralPath $TargetPath).Length
  }
  catch {
    # Cancel the in-flight request so a slow or endless body stops immediately,
    # then drop the partial file. The already approved target stays untouched.
    if (-not $CancellationTokenSource.IsCancellationRequested) {
      $CancellationTokenSource.Cancel()
    }

    if (Test-Path -LiteralPath $TemporaryPath) {
      Remove-Item -LiteralPath $TemporaryPath -Force
    }

    throw
  }
}

if ($LibraryOnly) {
  return
}

$assets = @(
  [PSCustomObject]@{
    Name = "objects-shop"
    FileName = "objects-shop.jpg"
    ContentType = "image/jpeg"
    ExpectedBytes = 40918
    ExpectedSha256 = "7B2D8F8F7C11A00BB0B2A6BAB40A12614D9A217EDEA2922ABC7FC174ED86CE3F"
    Uri = "https://lh3.googleusercontent.com/aida-public/AB6AXuCQK0dEq8e1qnOEo0OofP4JbUeK98Nq6uzKtumFOF1oFn-3BRWPdSQLRcsJMoRACPTlKKDFuqNJtzpXI35VA7Httbak1A37yAnwTxj0ZEEQX2cbO2CeGYTU3pU4O-pn8dkHDWWQgVtVgsSfF4uWkvvTZc_QQSC8qN6_2Wm0Tj9BxQ0OoUqH_F8ZvSXhJRB5ANslBzfKIb4Unp0DEp38qxj7wNmO9IdMWIFmkVTPrku4Axsp1Kyshauf"
  }
  [PSCustomObject]@{
    Name = "studio-mobile"
    FileName = "studio-mobile.jpg"
    ContentType = "image/jpeg"
    ExpectedBytes = 15505
    ExpectedSha256 = "C6CC75CD14762FC45BA9A9444256F43F883547321A81AD9439CC950E519B4EAE"
    Uri = "https://lh3.googleusercontent.com/aida-public/AB6AXuDbht6EEruyA622IMAdmsqGWa2Ie8cgLvK45Gf7bz2o656CGVIIDW8AttNWChQtpov6_9Y-s_UYv65CU7ApyrvSKg_7zoz4jUVcgyzzso92XJmLnmbmX-uZjthxRRjS5U_5lygLMdA_z036PV8h_17IxQlhXUXJxqqhAefh9zlw0LPbpj3yUKFz-5uhl5novC6kDjURRHEKn5Ml97RDjyuQKWJkPJiqKXA1lVAHSoALlirsETx2NVxF"
  }
  [PSCustomObject]@{
    Name = "architecture-practice"
    FileName = "architecture-practice.jpg"
    ContentType = "image/jpeg"
    ExpectedBytes = 32765
    ExpectedSha256 = "0F8F449BC10FF69160528AF13DABCBA8BD0D41D44EAC0392E3E18BF2AE016953"
    Uri = "https://lh3.googleusercontent.com/aida-public/AB6AXuAryuZT1FFcDVQXFvTHr_YT3Cz6ZNDy-TRwxv_2mLImCIhAg8qY6YajPPieSiqW1y_qCBiHgw0vrmL1zE-Uo5L38y8lhNn4F7BUMdZ2IFi1-Uu5WaHXSBtg6owcxDxUHczHK9aokKZ6ugKZ1zpkF19H7cE-czK8VVpZ0vTKoH53jLHJPK8ekqy4i5UfIJZI7R6Z_x0sipKNXrpUh3sprjnPza6YAArnc96-bKq1Lbfg0cWV5TuVjbN0"
  }
  [PSCustomObject]@{
    Name = "apparel-store"
    FileName = "apparel-store.jpg"
    ContentType = "image/jpeg"
    ExpectedBytes = 30523
    ExpectedSha256 = "F9C235D52848F63C585FA95FDB11A0C5385F05174C80C2A0383E4C13F3AD2D87"
    Uri = "https://lh3.googleusercontent.com/aida-public/AB6AXuC4rsXJKe281jcUAqy-48NeE0V68dVi5LJSSrjr5jWk-FowOHFBF2MHE4Hp8FpsO7LyjtqMcy639H9XmWdldhc9dTHtB4Sp8Owv6MHIk_6Rlz2sbm5F5VC9nnQ-mCpaAb-ydSJLR1p2mbQbx_a_zkFQYZ8ylLEIEA17YFeCpDYHgJJjM6Ncun8xxhp-csnc8D5iJuoVXHFF6kePDDeIGQdQL215m1Cl3qHihsnshXidzFJP8cQ1jqDJ"
  }
)

$projectRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot ".."))
$assetDirectory = [System.IO.Path]::GetFullPath(
  (Join-Path $projectRoot "public\images\projects")
)
$assetDirectoryWithSeparator = $assetDirectory.TrimEnd(
  [System.IO.Path]::DirectorySeparatorChar,
  [System.IO.Path]::AltDirectorySeparatorChar
) + [System.IO.Path]::DirectorySeparatorChar
[System.IO.Directory]::CreateDirectory($assetDirectory) | Out-Null

$handler = [System.Net.Http.HttpClientHandler]::new()
$handler.AllowAutoRedirect = $true
$handler.MaxAutomaticRedirections = 5
$client = [System.Net.Http.HttpClient]::new($handler)
$client.Timeout = [TimeSpan]::FromSeconds(45)
$client.DefaultRequestHeaders.UserAgent.ParseAdd("SILVAN-asset-importer/1.0")

try {
  foreach ($asset in $assets) {
    $targetPath = [System.IO.Path]::GetFullPath(
      (Join-Path $assetDirectory $asset.FileName)
    )

    if (-not $targetPath.StartsWith(
      $assetDirectoryWithSeparator,
      [System.StringComparison]::OrdinalIgnoreCase
    )) {
      throw "Refusing asset target outside the project image directory: $targetPath"
    }

    $maximumBytes = $asset.ExpectedBytes + 1
    $imported = $false

    for ($attempt = 1; $attempt -le 3 -and -not $imported; $attempt++) {
      $temporaryPath = Join-Path $assetDirectory (
        ".{0}.{1}.tmp" -f $asset.Name, [System.IO.Path]::GetRandomFileName()
      )
      $cancellation = [System.Threading.CancellationTokenSource]::new()

      try {
        $response = Get-ApprovedAssetResponse `
          -Client $client `
          -Uri ([Uri]$asset.Uri) `
          -ContentType $asset.ContentType `
          -MaximumBytes $maximumBytes `
          -CancellationTokenSource $cancellation

        try {
          $sourceStream = $response.Content.ReadAsStreamAsync().GetAwaiter().GetResult()

          try {
            $importedBytes = Install-ApprovedAssetStream `
              -SourceStream $sourceStream `
              -TargetPath $targetPath `
              -TemporaryPath $temporaryPath `
              -ExpectedBytes $asset.ExpectedBytes `
              -ExpectedSha256 $asset.ExpectedSha256 `
              -CancellationTokenSource $cancellation
          }
          finally {
            $sourceStream.Dispose()
          }
        }
        finally {
          $response.Dispose()
        }

        Write-Host (
          "Imported {0} ({1}, {2} bytes)" -f
          $asset.Name,
          $asset.ContentType,
          $importedBytes
        )
        $imported = $true
      }
      catch {
        if (Test-Path -LiteralPath $temporaryPath) {
          Remove-Item -LiteralPath $temporaryPath -Force
        }

        if ($attempt -eq 3) {
          throw "Failed to import $($asset.Name) after 3 attempts: $($_.Exception.Message)"
        }

        Start-Sleep -Seconds $attempt
      }
      finally {
        $cancellation.Dispose()
      }
    }
  }
}
finally {
  $client.Dispose()
  $handler.Dispose()
}
