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
