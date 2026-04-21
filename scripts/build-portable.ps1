$ErrorActionPreference = 'Stop'

$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$electronDist = Join-Path $projectRoot 'node_modules\\electron\\dist'

if (-not (Test-Path $electronDist)) {
  throw "Electron runtime not found at '$electronDist'. Run 'npm install' first."
}

$appName = 'Image generator'
$portableFolderName = 'Image generator'
$exeName = "$appName.exe"
$portableRoot = Join-Path $projectRoot $portableFolderName
$rarPath = Join-Path $projectRoot "$portableFolderName.rar"
$zipPath = Join-Path $projectRoot "$portableFolderName.zip"
$resourcesApp = Join-Path $portableRoot 'resources\\app'

$legacyArtifacts = @(
  (Join-Path $projectRoot 'test build'),
  (Join-Path $projectRoot 'test build.zip'),
  (Join-Path $projectRoot 'test build.rar'),
  $portableRoot,
  $rarPath,
  $zipPath
)

foreach ($artifact in $legacyArtifacts) {
  if (Test-Path $artifact) {
    Remove-Item -LiteralPath $artifact -Recurse -Force
  }
}

New-Item -ItemType Directory -Force -Path $portableRoot | Out-Null

Get-ChildItem -LiteralPath $electronDist -Force | ForEach-Object {
  Copy-Item -LiteralPath $_.FullName -Destination (Join-Path $portableRoot $_.Name) -Recurse -Force
}

$electronExe = Join-Path $portableRoot 'electron.exe'
if (-not (Test-Path $electronExe)) {
  throw "Portable build failed because '$electronExe' was not copied."
}
$appExe = Join-Path $portableRoot $exeName
Copy-Item -LiteralPath $electronExe -Destination $appExe -Force

New-Item -ItemType Directory -Force -Path $resourcesApp | Out-Null

$filesToCopy = @(
  'main.js',
  'preload.js',
  'renderer.js',
  'index.html',
  'styles.css',
  'package.json'
)

foreach ($relativePath in $filesToCopy) {
  Copy-Item -LiteralPath (Join-Path $projectRoot $relativePath) -Destination (Join-Path $resourcesApp $relativePath) -Force
}

Copy-Item -LiteralPath (Join-Path $projectRoot 'assets') -Destination (Join-Path $resourcesApp 'assets') -Recurse -Force

$runBat = @"
@echo off
cd /d "%~dp0"
start "" "%~dp0$exeName"
"@
Set-Content -LiteralPath (Join-Path $portableRoot 'run.bat') -Value $runBat -Encoding ASCII

$readme = @"
$portableFolderName

How to use:
1. Extract this folder anywhere on the PC.
2. Double-click $exeName or run.bat.
3. No installation is required.

Notes:
- Keep all files in this folder together.
- If Windows SmartScreen appears, click More info and then Run anyway.
"@
Set-Content -LiteralPath (Join-Path $portableRoot 'README.txt') -Value $readme -Encoding ASCII

$winRarCandidates = @(
  'C:\\Program Files\\WinRAR\\Rar.exe',
  'C:\\Program Files (x86)\\WinRAR\\Rar.exe'
)

$winRarExe = $winRarCandidates | Where-Object { Test-Path $_ } | Select-Object -First 1

if ($winRarExe) {
  & $winRarExe a -r -ep1 $rarPath $portableRoot | Out-Null
}
else {
  Compress-Archive -Path $portableRoot -DestinationPath $zipPath -Force
}

Write-Host "Portable folder created:"
Write-Host "  $portableRoot"
if ($winRarExe) {
  Write-Host "Shareable WinRAR archive created:"
  Write-Host "  $rarPath"
}
else {
  Write-Host "Shareable zip created:"
  Write-Host "  $zipPath"
}
