# Cálculo de matrices ópticas

Esta aplicación web permite crear y analizar sistemas ópticos parabiales mediante el uso de matrices de transferencia 2×2. Todos los cálculos y la interfaz están contenidos en un único archivo HTML.

## Uso rápido

1. Descarga `Calculo_de_matrices.html` desde este repositorio (puedes usar el botón **Download** o `git clone` para obtener todo el proyecto).
2. Abre el archivo en cualquier navegador moderno. No se necesitan dependencias adicionales ni servidores: es una página estática.
3. Agrega fases al sistema (traslaciones, lentes, superficies reflectoras o refractoras) y la aplicación calculará automáticamente la matriz total.
4. Opcionalmente, guarda o carga configuraciones en formato JSON con los botones correspondientes.

## Ejecutar localmente

```bash
# Clonar el repositorio
$ git clone https://github.com/tu_usuario/Calculo-de-matrices-optica.git
$ cd Calculo-de-matrices-optica

# Abrir el HTML directamente en tu navegador
$ xdg-open Calculo_de_matrices.html
```

## Recursos

- La teoría de matrices para óptica geométrica se implementa en JavaScript dentro del propio archivo HTML.
- Se usan Tailwind CSS y Font Awesome a través de CDN para estilizar la página.

Cualquier sugerencia o mejora es bienvenida. ¡Disfruta explorando sistemas ópticos!

## Convención de matrices

La aplicación sigue la notación empleada en algunos cursos de óptica para el vector de rayos \( (\theta, y) \). Las matrices implementadas son:

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
  1 & \frac{n_2 - n_1}{R} \\
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
  1 & 0 \\
  -\frac{n}{f} & 1
  \end{pmatrix}
  \]

Estas expresiones son las utilizadas internamente por `Calculo_de_matrices.html` para construir la matriz total del sistema óptico.
