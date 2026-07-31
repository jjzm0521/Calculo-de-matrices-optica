const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const sourcePath = path.join(root, 'Calculo_de_matrices.html');
const cssPath = path.join(root, 'styles.css');
const decimalPath = path.join(root, 'vendor', 'decimal.min.js');
const outputDirectory = path.join(root, 'distribucion');
const outputPath = path.join(outputDirectory, 'Calculadora_Optica.html');

const source = fs.readFileSync(sourcePath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');
const decimal = fs.readFileSync(decimalPath, 'utf8').replace(/<\/script/gi, '<\\/script');

const standalone = source
    .replace(
        '    <link rel="stylesheet" href="styles.css">',
        `    <style data-recurso-integrado="tailwind">\n${css}\n    </style>`
    )
    .replace(
        '    <script src="vendor/decimal.min.js"></script>',
        `    <script data-recurso-integrado="decimal-js">\n${decimal}\n    </script>`
    )
    .replace(
        '<!DOCTYPE html>',
        '<!DOCTYPE html>\n<!-- Archivo autocontenido: no requiere instalación ni conexión a internet. -->'
    )
    .replace(/[ \t]+$/gm, '');

if (standalone === source || standalone.includes('href="styles.css"') || standalone.includes('src="vendor/decimal.min.js"')) {
    throw new Error('No fue posible integrar todos los recursos en el HTML.');
}

fs.mkdirSync(outputDirectory, { recursive: true });
fs.writeFileSync(outputPath, standalone, 'utf8');
console.log(`Archivo autocontenido creado: ${outputPath}`);
