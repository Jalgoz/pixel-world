# Del píxel al mundo vivo

Una experiencia visual de scrollytelling sobre cómo los videojuegos pasaron de ser respuestas simples en pantalla a mundos digitales complejos, sociales y reactivos.

El proyecto está construido como pieza de portfolio frontend: una página editorial, inmersiva y responsive hecha solo con HTML, CSS y JavaScript vanilla.

## Concepto

La pregunta central del sitio es:

> ¿Cómo pasaron los videojuegos de mover píxeles en una pantalla a crear mundos que parecen vivos?

La narrativa evita funcionar como una cronología histórica. En su lugar, presenta seis cambios en la experiencia del jugador:

- Interacción inicial con la pantalla
- Exploración de mundos laterales
- Aparición del espacio tridimensional
- Juego conectado entre personas
- Creación por parte del jugador
- Sistemas reactivos que responden a decisiones

## Características

- Hero cinematográfico con entrada editorial
- Narrativa scroll-driven con seis capítulos
- Scrollytelling dos columnas en desktop: texto sticky + escena visual
- Escenas lineales integradas en tablet y mobile
- Fondos degradados por capítulo con transiciones suaves
- Barra de progreso de lectura
- Navegación de capítulos accesible
- Interacción final de perfil de jugador con animación FLIP
- Botones de perfil se desplazan a las esquinas de la imagen al seleccionar
- Overlay hover en imagen de perfil
- Preparado para secciones editoriales con video local
- Sección editorial de video: “La pantalla dejó de ser un límite”
- Reveals al entrar en viewport para títulos, texto y video
- Soporte para teclado y `prefers-reduced-motion`
- Diseño responsive para desktop, tablet y mobile

## Stack

- HTML5 semántico
- CSS3 modular
- CSS Custom Properties
- Media Queries
- JavaScript vanilla
- ES Modules nativos
- IntersectionObserver
- Video HTML5 local
- SVG para favicon

Las imágenes de capítulos y perfiles deben agregarse como archivos JPG en `assets/images/`. Consultar `assets/images/README-chapter-media.txt` para nombres y dimensiones requeridas.

Los videos editoriales deben agregarse como archivos MP4 en `assets/videos/`. Consultar `assets/videos/README-video-assets.txt` para nombres, posters y recomendaciones de peso.

No usa frameworks, librerías UI, preprocesadores, TypeScript ni librerías de animación.

## Estructura

```text
├── assets/
│   ├── icons/
│   ├── textures/
│   ├── illustrations/
│   ├── images/
│   └── videos/
├── styles/
│   ├── main.css
│   ├── reset.css
│   ├── tokens.css
│   ├── themes.css
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   ├── scenes.css
│   ├── animations.css
│   └── utilities.css
└── scripts/
    ├── main.js
    ├── config/
    ├── state/
    ├── controllers/
    └── utils/
```

## Desarrollo Local

El proyecto no requiere instalación ni build. Solo necesita servirse desde un servidor local porque usa ES Modules nativos.

Con Node.js:

```bash
npx --yes http-server . -p 5500
```

Con Python:

```bash
python -m http.server 5500
```

Abrir:

```text
http://localhost:5500/
```

No abras `index.html` directamente con `file://`, porque el navegador puede bloquear los módulos JavaScript por reglas CORS.

## Estado

Proyecto completo en fase de pulido final, con la primera sección editorial de video integrada.

Incluye estructura, HTML semántico, sistema visual con tokens y temas, escenas por capítulo, animaciones CSS, comportamiento JavaScript modular con IntersectionObserver, sección editorial de video, responsive review, accesibilidad básica e interacción final de perfil con transiciones animadas.

## Licencia

MIT
