# charlespolart.com

Personal CV site — **boot terminal aesthetic**, deployed on **Cloudflare Pages**.

## Stack

- **Astro 5** — static-first, islands architecture, 0 JS by default
- **React 19** — only on interactive islands (boot sequence, custom cursor, scroll spy)
- **TypeScript** (strict)
- **GSAP 3** — boot sequence, section reveal, hover micro-interactions
- **Biome** — format + lint
- Vanilla CSS (`@layer` based) for the amber phosphor / CRT effects

## Project structure

```
src/
├── data/                  → typed bilingual content (profile, skills, experience, projects, education, ui)
├── styles/                → global.css + fonts.css
├── lib/                   → gsap.ts (plugin registration)
├── components/
│   ├── *.astro            → server-rendered section components
│   └── islands/           → client-hydrated React (BootSequence, TerminalEffects)
├── layouts/
│   └── BaseLayout.astro   → HTML chrome, header, overlays, View Transitions
└── pages/
    ├── index.astro        → EN (default locale, no prefix)
    └── fr/index.astro     → FR
```

## Dev

```bash
nvm use            # Node 22 LTS
npm install
npm run dev        # http://localhost:4321
```

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # serves dist/ locally
```

## Deploy to Cloudflare Pages

1. Push to GitHub
2. In Cloudflare Pages, connect the repo
3. Build command: `npm run build`
4. Output directory: `dist`
5. Node version: `22` (from `.nvmrc`)
6. Add `charlespolart.com` custom domain

That's it — static output, no Functions, no Workers needed.

## Editing content

All CV content lives in `src/data/*.ts` files. Each export is `{ en: ..., fr: ... }`. Edit, push, deploy. TypeScript will catch missing fields at build time.

## Adding a project

Add an entry to both `en` and `fr` arrays in `src/data/projects.ts`. Done.

## Keyboard

- `L` — toggle language (EN ↔ FR)
- `0`–`6` — jump to section
- `↑` `↓` — scroll
- `⌘K` — command palette
- Type `sudo` / `hack` / `help` for easter eggs
