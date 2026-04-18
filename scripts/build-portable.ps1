$ErrorActionPreference = 'Stop'

$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$electronDist = Join-Path $projectRoot 'node_modules\\electron\\dist'

if (-not (Test-Path $electronDist)) {
  throw "Electron runtime not found at '$electronDist'. Run 'npm install' first."
}

$appName = 'Jam_iw Software'
$portableFolderName = 'test build'
$exeName = "$appName.exe"
$portableRoot = Join-Path $projectRoot $portableFolderName
$zipPath = Join-Path $projectRoot "$portableFolderName.zip"
$resourcesApp = Join-Path $portableRoot 'resources\\app'

if (Test-Path $portableRoot) {
  Remove-Item -LiteralPath $portableRoot -Recurse -Force
}

if (Test-Path $zipPath) {
  Remove-Item -LiteralPath $zipPath -Force
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

Compress-Archive -Path $portableRoot -DestinationPath $zipPath -Force

Write-Host "Portable folder created:"
Write-Host "  $portableRoot"
Write-Host "Shareable zip created:"
Write-Host "  $zipPath"
