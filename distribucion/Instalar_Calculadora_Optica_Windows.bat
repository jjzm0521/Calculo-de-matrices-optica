@echo off
setlocal

set "INSTALL_DIR=%LOCALAPPDATA%\CalculadoraOptica"
set "TARGET_FILE=%INSTALL_DIR%\Calculadora_Optica.html"
set "SOURCE_FILE=%~dp0Calculadora_Optica.html"
set "DOWNLOAD_URL=https://raw.githubusercontent.com/jjzm0521/Calculo-de-matrices-optica/main/distribucion/Calculadora_Optica.html"

if not exist "%INSTALL_DIR%" mkdir "%INSTALL_DIR%"

if exist "%SOURCE_FILE%" (
    copy /Y "%SOURCE_FILE%" "%TARGET_FILE%" >nul
) else (
    echo Descargando la Calculadora Optica...
    powershell -NoProfile -ExecutionPolicy Bypass -Command "$ErrorActionPreference='Stop'; $tmp=[IO.Path]::GetTempFileName(); try { Invoke-WebRequest -UseBasicParsing -Uri '%DOWNLOAD_URL%' -OutFile $tmp; Move-Item -Force $tmp '%TARGET_FILE%' } finally { if (Test-Path $tmp) { Remove-Item -Force $tmp } }"
    if errorlevel 1 (
        echo No fue posible descargar la calculadora.
        echo Verifica tu conexion a internet e intenta nuevamente.
        pause
        exit /b 1
    )
)

echo Calculadora instalada en: %TARGET_FILE%
start "" "%TARGET_FILE%"
endlocal
