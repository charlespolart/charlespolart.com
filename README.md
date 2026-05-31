```
   ____ _   _    _    ____  _     _____ ____    ____   ___  _        _    ____ _____
  / ___| | | |  / \  |  _ \| |   | ____/ ___|  |  _ \ / _ \| |      / \  |  _ \_   _|
 | |   | |_| | / _ \ | |_) | |   |  _| \___ \  | |_) | | | | |     / _ \ | |_) || |
 | |___|  _  |/ ___ \|  _ <| |___| |___ ___) | |  __/| |_| | |___ / ___ \|  _ < | |
  \____|_| |_/_/   \_\_| \_\_____|_____|____/  |_|    \___/|_____/_/   \_\_| \_\|_|
```

```
charles@cv:~$ cat README.md
```

> **[charlespolart.com](https://charlespolart.com)** — personal CV site.
> boot terminal aesthetic · amber phosphor · CRT vibes · 100 % static.

→ live at **<https://charlespolart.com>**

[![status](https://img.shields.io/badge/status-online-00ff66?style=flat-square&labelColor=0a0700)](https://charlespolart.com)
[![astro](https://img.shields.io/badge/astro-5-ff5d01?style=flat-square&labelColor=0a0700)](https://astro.build)
[![react](https://img.shields.io/badge/react-19-61dafb?style=flat-square&labelColor=0a0700)](https://react.dev)
[![gsap](https://img.shields.io/badge/gsap-3-88ce02?style=flat-square&labelColor=0a0700)](https://gsap.com)
[![hosted](https://img.shields.io/badge/cloudflare-pages-f38020?style=flat-square&labelColor=0a0700)](https://pages.cloudflare.com)

---

## `// stack`

```
> astro 5         · static-first, islands architecture, 0 JS by default
> react 19        · only on interactive islands (terminal, scroll-spy, palette)
> typescript      · strict mode
> gsap 3          · boot sequence, scroll-trigger reveals, magnetic links
> canvas 2d       · matrix rain (margins + on-demand full-screen burst)
> css @layer      · amber/CRT theme, no framework
> biome           · format + lint
```

## `// pwd`

```
.
├── public/                  → favicons, cv.pdf, fonts
├── scripts/                 → build helpers
├── src/
│   ├── data/                → bilingual content (profile · skills · experience
│   │                          · projects · education · ui · types)
│   ├── styles/              → global.css + fonts.css (@layer based)
│   ├── lib/                 → gsap plugin registration
│   ├── components/
│   │   ├── *.astro          → server-rendered section components
│   │   │                      (Whoami · About · Skills · Experience · Projects
│   │   │                       · Education · Contact · Header)
│   │   └── islands/         → client-hydrated react
│   │       ├── BootSequence       → on-load CRT power-on + figlet
│   │       ├── TerminalEffects    → gsap reveals, konami, glitches, magnetic
│   │       ├── BottomTerminal     → real prompt, 25+ commands, history
│   │       ├── MatrixRain         → ambient margin rain + `matrix` burst
│   │       ├── CommandPalette     → ⌘K fuzzy nav
│   │       ├── SudoPrompt         → fake `sudo` overlay
│   │       └── CvDownload         → cv.pdf w/ progress bar
│   ├── layouts/
│   │   └── BaseLayout.astro → html chrome, custom cursor, scan beam,
│   │                          reading progress, view transitions
│   └── pages/
│       ├── index.astro      → EN (default, no prefix)
│       └── fr/index.astro   → FR
└── astro.config.mjs
```

## `// dev`

```bash
nvm use                      # Node 22 LTS (from .nvmrc)
npm install
npm run dev                  # → http://localhost:4321
```

## `// build`

```bash
npm run build                # outputs static site to ./dist
npm run preview              # serves ./dist locally
npm run check                # astro check + biome
```

## `// deploy`

connected to **Cloudflare Pages** via GitHub. every push to `master` triggers
a fresh build + deploy in ~1 min. preview deployments on other branches.

one-time setup :

```
> repo            charlespolart/charlespolart.com
> framework       Astro (auto-detected)
> build command   npm run build
> output dir      dist
> node version    22         (NODE_VERSION env, or .nvmrc)
> custom domain   charlespolart.com
```

static output only — no Workers, no Functions, no serverless.

## `// content`

all CV content lives in `src/data/*.ts`. each export is `{ en: ..., fr: ... }`.
TypeScript catches missing translations at build time.

```bash
> add a project       → push to both en/fr arrays in src/data/projects.ts
> edit experience     → src/data/experience.ts
> tweak boot lines    → src/data/ui.ts
```

## `// keybinds`

```
> ⌘K · ctrl+K         → open command palette
> L                   → toggle language (EN ↔ FR)
> 0–6                 → jump to section (whoami → contact)
> ↑ ↓                 → scroll
> ↑↑↓↓←→←→ba          → konami code (try it)
```

type `help` in the bottom terminal for the full command list — there are
some easter eggs in there too (sudo · matrix · glitch · boom · 42 · ...).

## `// license`

content (CV, photo, projects) © Charles Polart.
code is MIT — fork it, theme it, make your own terminal CV.

```
charles@cv:~$ exit
bye 👋
```
