[CmdletBinding()]
param()

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$assets = @(
  [PSCustomObject]@{
    Name = "archa"
    FileName = "archa.jpg"
    ContentType = "image/jpeg"
    ExpectedBytes = 40918
    ExpectedSha256 = "7B2D8F8F7C11A00BB0B2A6BAB40A12614D9A217EDEA2922ABC7FC174ED86CE3F"
    Uri = "https://lh3.googleusercontent.com/aida-public/AB6AXuCQK0dEq8e1qnOEo0OofP4JbUeK98Nq6uzKtumFOF1oFn-3BRWPdSQLRcsJMoRACPTlKKDFuqNJtzpXI35VA7Httbak1A37yAnwTxj0ZEEQX2cbO2CeGYTU3pU4O-pn8dkHDWWQgVtVgsSfF4uWkvvTZc_QQSC8qN6_2Wm0Tj9BxQ0OoUqH_F8ZvSXhJRB5ANslBzfKIb4Unp0DEp38qxj7wNmO9IdMWIFmkVTPrku4Axsp1Kyshauf"
  }
  [PSCustomObject]@{
    Name = "lumen"
    FileName = "lumen.jpg"
    ContentType = "image/jpeg"
    ExpectedBytes = 15505
    ExpectedSha256 = "C6CC75CD14762FC45BA9A9444256F43F883547321A81AD9439CC950E519B4EAE"
    Uri = "https://lh3.googleusercontent.com/aida-public/AB6AXuDbht6EEruyA622IMAdmsqGWa2Ie8cgLvK45Gf7bz2o656CGVIIDW8AttNWChQtpov6_9Y-s_UYv65CU7ApyrvSKg_7zoz4jUVcgyzzso92XJmLnmbmX-uZjthxRRjS5U_5lygLMdA_z036PV8h_17IxQlhXUXJxqqhAefh9zlw0LPbpj3yUKFz-5uhl5novC6kDjURRHEKn5Ml97RDjyuQKWJkPJiqKXA1lVAHSoALlirsETx2NVxF"
  }
  [PSCustomObject]@{
    Name = "architech-studio"
    FileName = "architech-studio.jpg"
    ContentType = "image/jpeg"
    ExpectedBytes = 32765
    ExpectedSha256 = "0F8F449BC10FF69160528AF13DABCBA8BD0D41D44EAC0392E3E18BF2AE016953"
    Uri = "https://lh3.googleusercontent.com/aida-public/AB6AXuAryuZT1FFcDVQXFvTHr_YT3Cz6ZNDy-TRwxv_2mLImCIhAg8qY6YajPPieSiqW1y_qCBiHgw0vrmL1zE-Uo5L38y8lhNn4F7BUMdZ2IFi1-Uu5WaHXSBtg6owcxDxUHczHK9aokKZ6ugKZ1zpkF19H7cE-czK8VVpZ0vTKoH53jLHJPK8ekqy4i5UfIJZI7R6Z_x0sipKNXrpUh3sprjnPza6YAArnc96-bKq1Lbfg0cWV5TuVjbN0"
  }
  [PSCustomObject]@{
    Name = "vanguard-apparel"
    FileName = "vanguard-apparel.jpg"
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

Add-Type -AssemblyName System.Net.Http
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

    $imported = $false
    for ($attempt = 1; $attempt -le 3 -and -not $imported; $attempt++) {
      $temporaryPath = Join-Path $assetDirectory (
        ".{0}.{1}.tmp" -f $asset.Name, [System.IO.Path]::GetRandomFileName()
      )

      try {
        $response = $client.GetAsync(
          $asset.Uri,
          [System.Net.Http.HttpCompletionOption]::ResponseHeadersRead
        ).GetAwaiter().GetResult()

        try {
          if (-not $response.IsSuccessStatusCode) {
            throw "HTTP $([int]$response.StatusCode) $($response.ReasonPhrase)"
          }

          $contentType = $response.Content.Headers.ContentType.MediaType
          if ($contentType -ne $asset.ContentType) {
            throw "Expected $($asset.ContentType), received $contentType"
          }

          $sourceStream = $response.Content.ReadAsStreamAsync().GetAwaiter().GetResult()
          try {
            $targetStream = [System.IO.File]::Open(
              $temporaryPath,
              [System.IO.FileMode]::CreateNew,
              [System.IO.FileAccess]::Write,
              [System.IO.FileShare]::None
            )
            try {
              $sourceStream.CopyTo($targetStream)
            }
            finally {
              $targetStream.Dispose()
            }
          }
          finally {
            $sourceStream.Dispose()
          }
        }
        finally {
          $response.Dispose()
        }

        $download = Get-Item -LiteralPath $temporaryPath
        if ($download.Length -le 0) {
          throw "Downloaded file is empty"
        }

        if ($download.Length -ne $asset.ExpectedBytes) {
          throw "Expected $($asset.ExpectedBytes) bytes, received $($download.Length)"
        }

        $downloadHash = (Get-FileHash -LiteralPath $temporaryPath -Algorithm SHA256).Hash
        if ($downloadHash -ne $asset.ExpectedSha256) {
          throw "Downloaded SHA-256 does not match the approved $($asset.Name) asset"
        }

        Move-Item -LiteralPath $temporaryPath -Destination $targetPath -Force
        Write-Host (
          "Imported {0} ({1}, {2} bytes)" -f
          $asset.Name,
          $asset.ContentType,
          (Get-Item -LiteralPath $targetPath).Length
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
    }
  }
}
finally {
  $client.Dispose()
  $handler.Dispose()
}
