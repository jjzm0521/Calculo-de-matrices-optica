const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const standalonePath = path.join(root, 'distribucion', 'Calculadora_Optica.html');
const html = fs.readFileSync(standalonePath, 'utf8');

assert.match(html, /<meta name="viewport"/);
assert.match(html, /data-recurso-integrado="tailwind"/);
assert.match(html, /data-recurso-integrado="decimal-js"/);
assert.doesNotMatch(html, /<script\s+[^>]*src=/i);
assert.doesNotMatch(html, /<link\s+[^>]*rel=["']stylesheet["']/i);

const scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)];
assert.equal(scripts.length, 2, 'El archivo debe contener Decimal.js y la aplicación integrados.');

scripts.forEach((match, index) => {
    new vm.Script(match[1], { filename: `script-integrado-${index + 1}.js` });
});

assert.ok(Buffer.byteLength(html, 'utf8') < 250_000, 'El archivo autocontenido creció más de lo esperado.');
console.log('Distribución autocontenida verificada correctamente.');
