const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'Calculo_de_matrices.html'), 'utf8');
const decimalSource = fs.readFileSync(path.join(root, 'vendor', 'decimal.min.js'), 'utf8');
const scriptMatch = html.match(/<script>\s*([\s\S]*?)<\/script>/);

assert.ok(scriptMatch, 'No se encontró el bloque principal de JavaScript.');

const mathSource = scriptMatch[1].split('// --- Calculadora de Poder Óptico ---')[0];
const context = vm.createContext({ console });
vm.runInContext(decimalSource, context, { filename: 'decimal.min.js' });
vm.runInContext(
    `${mathSource}\nglobalThis.opticsApi = { matrixUtils, opticalMatrices, phaseToMatrix };`,
    context,
    { filename: 'Calculo_de_matrices.html' }
);

const { matrixUtils, opticalMatrices, phaseToMatrix } = context.opticsApi;
const closeTo = (actual, expected, tolerance = 1e-12) => {
    assert.ok(Math.abs(Number(actual) - expected) <= tolerance, `${actual} no es aproximadamente ${expected}`);
};

const identity = matrixUtils.identity();
assert.equal(identity[0][0].toString(), '1');
assert.equal(identity[0][1].toString(), '0');

const focalLens = opticalMatrices.thinLens({ f: 100, n_surrounding: 1.5 });
closeTo(focalLens[0][1], -0.015);

const poweredLens = opticalMatrices.thinLens({ P: 10 });
closeTo(poweredLens[0][1], -0.01);

const detailedLens = phaseToMatrix({
    type: 'thin_lens',
    params: {
        tl_use_detailed: true,
        R1_tl: 100,
        n1_incident_tl: 1,
        nl_lens_tl: 1.5,
        R2_tl: -100,
        n2_exit_tl: 1
    }
});
closeTo(detailedLens[0][1], -0.01);

const mirror = phaseToMatrix({
    type: 'reflection_surface',
    params: { R_reflect: 100, n_medium_reflect: 1.5 }
});
closeTo(mirror[0][1], 0.03);

const flatSurface = opticalMatrices.surface(Infinity, 1, 1.5);
closeTo(flatSurface[0][0], 1);
closeTo(flatSurface[0][1], 0);

const zeroTranslation = opticalMatrices.translation(0, 1.33);
closeTo(zeroTranslation[1][0], 0);

const thickLens = opticalMatrices.thickLens(100, 1, 1.5, 5, -100, 1);
const determinant = thickLens[0][0].times(thickLens[1][1])
    .minus(thickLens[0][1].times(thickLens[1][0]));
closeTo(determinant, 1);

const translation = opticalMatrices.translation(20, 1);
const combined = matrixUtils.multiply(poweredLens, translation);
closeTo(combined[0][0], 0.8);
closeTo(combined[0][1], -0.01);
closeTo(combined[1][0], 20);
closeTo(combined[1][1], 1);

console.log('Pruebas ópticas completadas correctamente.');
