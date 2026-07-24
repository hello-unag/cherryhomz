Add-Type -AssemblyName System.Drawing

$origPath = Join-Path (Get-Location) "public\images\prop-box-hill.jpg"
$destPath = Join-Path (Get-Location) "public\images\prop-box-hill.jpg"

$src = [System.Drawing.Image]::FromFile($origPath)
[int]$srcW = $src.Width
[int]$srcH = $src.Height

Write-Host "Original photo size: $srcW x $srcH"

[int]$targetH = $srcH
[int]$targetW = [int]($targetH * 4.0 / 3.0)

$bmp = New-Object System.Drawing.Bitmap($targetW, $targetH)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

[int]$xOffset = [int](($targetW - $srcW) / 2)
[int]$rightW = $targetW - ($xOffset + $srcW)

# Draw left background extension by stretching 20px edge
$leftDest = New-Object System.Drawing.Rectangle(0, 0, ($xOffset + 2), $targetH)
$leftSrc = New-Object System.Drawing.Rectangle(0, 0, 20, $srcH)

# Draw right background extension by stretching 20px edge
$rightDest = New-Object System.Drawing.Rectangle(($xOffset + $srcW - 2), 0, ($rightW + 2), $targetH)
$rightSrc = New-Object System.Drawing.Rectangle(($srcW - 20), 0, 20, $srcH)

$unit = [System.Drawing.GraphicsUnit]::Pixel

$g.DrawImage($src, $leftDest, 0, 0, 20, $srcH, $unit)
$g.DrawImage($src, $rightDest, ($srcW - 20), 0, 20, $srcH, $unit)

# Draw original image in center
$centerDest = New-Object System.Drawing.Rectangle($xOffset, 0, $srcW, $srcH)
$g.DrawImage($src, $centerDest, 0, 0, $srcW, $srcH, $unit)

$src.Dispose()
$g.Dispose()

$tempPath = Join-Path (Get-Location) "public\images\prop-box-hill-temp.jpg"
$bmp.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$bmp.Dispose()

Copy-Item $tempPath $destPath -Force
Remove-Item $tempPath -Force

Write-Host "Canvas extended to 4:3 landscape ($targetW x $targetH) preserving 100% of Box Hill house!"
