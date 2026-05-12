# Del píxel al mundo vivo

A premium visual scrollytelling website about the evolution of the videogame experience — from early screen interaction to complex, social and reactive digital worlds.

Built with HTML5, CSS3, and vanilla JavaScript as a frontend portfolio project demonstrating semantic HTML, responsive layouts, scroll-based storytelling, and maintainable architecture.

## Stack

- HTML5
- CSS3 (BEM, custom properties, fluid scales)
- JavaScript Vanilla (ES Modules)
- SVG

## Features

- Cinematic hero section
- Scroll-driven narrative with six chapters
- Abstract visual metaphors for each era
- Dynamic theme transitions
- Reading progress indicator
- Chapter navigation
- Final interactive player profile section
- Fully responsive (desktop, tablet, mobile)
- Keyboard accessible with reduced-motion support

## Project structure

```
├── assets/
│   ├── icons/
│   ├── textures/
│   ├── illustrations/
│   └── images/
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

## Development

Run a local static server and open the site from `localhost`.

Recommended option if Node.js is installed:

```bash
npx --yes http-server . -p 5500
```

Then open:

```text
http://localhost:5500/
```

Alternative option if Python is correctly installed:

```bash
python -m http.server 5500
```

Then open:

```text
http://localhost:5500/
```

Do not open `index.html` directly with `file://`, because native ES Modules are blocked by browser CORS rules in that mode.

No build step required.

## License

MIT
