#!/bin/zsh
set -eu

SCRIPT_DIR="$(cd -- "$(dirname -- "$0")" && pwd)"
SOURCE_FILE="${SCRIPT_DIR}/Calculadora_Optica.html"
INSTALL_DIR="${HOME}/Applications/CalculadoraOptica"
TARGET_FILE="${INSTALL_DIR}/Calculadora_Optica.html"
DOWNLOAD_URL="https://raw.githubusercontent.com/jjzm0521/Calculo-de-matrices-optica/main/distribucion/Calculadora_Optica.html"

mkdir -p "$INSTALL_DIR"

if [[ -f "$SOURCE_FILE" ]]; then
    cp -f "$SOURCE_FILE" "$TARGET_FILE"
else
    TEMP_FILE="$(mktemp "${TMPDIR:-/tmp}/calculadora-optica.XXXXXX")"
    trap 'rm -f "$TEMP_FILE"' EXIT
    echo "Descargando la Calculadora Óptica..."
    curl -fL "$DOWNLOAD_URL" -o "$TEMP_FILE"
    mv -f "$TEMP_FILE" "$TARGET_FILE"
    trap - EXIT
fi

echo "Calculadora instalada en: $TARGET_FILE"
open "$TARGET_FILE"
