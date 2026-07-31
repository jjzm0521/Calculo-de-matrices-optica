# Cálculo de matrices ópticas

Esta aplicación web permite crear y analizar sistemas ópticos paraxiales mediante matrices de transferencia 2×2. La aplicación es estática y puede ejecutarse localmente sin servidor ni conexión a internet.

## Uso rápido

1. Descarga `Calculo_de_matrices.html` desde este repositorio (puedes usar el botón **Download** o `git clone` para obtener todo el proyecto).
2. Abre el archivo en cualquier navegador moderno. Los estilos y la biblioteca de precisión decimal necesarias ya están incluidas en el repositorio.
3. Agrega fases al sistema (traslaciones, lentes, superficies reflectoras o refractoras) y la aplicación calculará automáticamente la matriz total.
4. Opcionalmente, guarda o carga configuraciones en formato JSON con los botones correspondientes.
5. Para indicar una superficie plana marca la casilla **R → ∞**. Estos valores de `Infinity` se conservan al exportar o importar el JSON.

## Ejecutar localmente

```bash
# Clonar el repositorio
$ git clone https://github.com/jjzm0521/Calculo-de-matrices-optica.git
$ cd Calculo-de-matrices-optica

# Abrir el HTML directamente en tu navegador
$ xdg-open Calculo_de_matrices.html
```

## Recursos

- La teoría de matrices para óptica geométrica se implementa en JavaScript dentro del propio archivo HTML.
- Los estilos compilados están en `styles.css` y Decimal.js está fijado localmente en `vendor/`, por lo que la interfaz y los cálculos no dependen de servicios externos.

Cualquier sugerencia o mejora es bienvenida. ¡Disfruta explorando sistemas ópticos!

## Verificación y estilos

Las comprobaciones matemáticas básicas pueden ejecutarse con:

```bash
node tests/optics-smoke.test.js
```

Si se agregan o cambian clases visuales en el HTML, se puede regenerar la hoja de estilos local con:

```bash
npx --yes tailwindcss@3.4.17 -i tailwind.input.css -o styles.css --content Calculo_de_matrices.html --minify
```

## Archivos de distribución

La carpeta `distribucion/` contiene tres archivos listos para compartir:

- `Calculadora_Optica.html`: versión completamente autocontenida. Incluye estilos, cálculos y Decimal.js en un solo archivo; puede copiarse a un teléfono, tableta o computador y abrirse sin internet.
- `Instalar_Calculadora_Optica_Mac.command`: instala el HTML en `~/Applications/CalculadoraOptica` y lo abre con el navegador predeterminado.
- `Instalar_Calculadora_Optica_Windows.bat`: instala el HTML en `%LOCALAPPDATA%\CalculadoraOptica` y lo abre con el navegador predeterminado.

Los instaladores primero buscan `Calculadora_Optica.html` junto a ellos. Si no está presente, intentan descargarlo desde la rama `main` de este repositorio.

Para reconstruir la versión autocontenida después de modificar la aplicación:

```bash
node scripts/build-standalone.js
```

## Convención de matrices

La aplicación utiliza el vector columna de rayo reducido \( (u, y)^T \), donde \(u=n\theta\) en la aproximación paraxial. Una fase transforma el rayo mediante

\[
\begin{pmatrix}u_2\\y_2\end{pmatrix}
=M
\begin{pmatrix}u_1\\y_1\end{pmatrix}.
\]

Las matrices implementadas son:

- **Traslación** a través de una distancia \(d\) en un medio de índice \(n\):

  \[
  \begin{pmatrix}
  1 & 0 \\
  \frac{d}{n} & 1
  \end{pmatrix}
  \]

- **Refracción** en una superficie de radio \(R\) entre índices \(n_1\) y \(n_2\):

  \[
  \begin{pmatrix}
  1 & -\frac{n_2 - n_1}{R} \\
  0 & 1
  \end{pmatrix}
  \]

- **Reflexión** en un espejo de radio \(R\) inmerso en un medio de índice \(n\):

  \[
  \begin{pmatrix}
  1 & \frac{2 n}{R} \\
  0 & 1
  \end{pmatrix}
  \]

  Para un espejo plano (\(R \to \infty\)) la matriz se reduce a la identidad.

- **Lente delgada** con distancia focal \(f\) y medio de salida de índice \(n\):

  \[
  \begin{pmatrix}
  1 & -\frac{n}{f} \\
  0 & 1
  \end{pmatrix}
  \]

Cuando la lente se define por potencia \(P\) en dioptrías, el término de la matriz es \(-P/1000\) en mm⁻¹. Si se define mediante radios e índices, se usa

\[
P_{mm^{-1}}=\frac{n_L-n_1}{R_1}+\frac{n_2-n_L}{R_2}.
\]

La matriz total respeta el orden físico de las fases:

\[
M_{total}=M_k M_{k-1}\cdots M_1.
\]

Estas son las mismas expresiones utilizadas internamente por `Calculo_de_matrices.html`.
