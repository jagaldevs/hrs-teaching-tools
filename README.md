# HRS Teaching Tools

Teaching toolkit for **Haileybury Rendall School** — Innovation Centre.
React + Vite PWA. Dark-first. Works offline. All state stored in the browser.

## What's in here so far

- **Splash → Dashboard** routing with optional "don't show again" via localStorage.
- **Dark / Light theme** with system-preference fallback, persisted across visits.
- **Editorial dashboard** — hairline-bordered tool cards, accent-on-hover reveals description, responsive grid.
- **57 tools** across 7 categories (Time, Classroom, Teaching Aids, Randomisers, Utilities, Literacy, Numeracy).
- **25 brain-break games** across 5 groups, streamed to four AC V9 bands (F-2, 3-6, 7-9, 10-12).
- **Student Tools** tab for student-facing items.
- **PWA service worker** for full offline support after first load.
- **Placeholder tool pages** wired for every tool & game so navigation works end-to-end.

Each tool currently shows a "coming soon" placeholder — the catalogue, theming, routing, and PWA shell are in place. Tools themselves get built iteratively from here.

## Prerequisites

Node.js 18+ and npm. If Node isn't installed:

```powershell
winget install OpenJS.NodeJS.LTS
```

## Run it

```powershell
npm install
npm run dev
```

Opens at http://localhost:5173 — visit `/` for the splash, or jump straight to `/dashboard`.

## Build for hosting

```powershell
npm run build
npm run preview
```

The `dist/` folder is static — drop it on any host (school IIS, GitHub Pages, Cloudflare Pages, etc.). The service worker activates after the first load and the app then runs offline.

## Project layout

```
src/
├── components/        Crest, Header, ThemeToggle, ToolCard, CategorySection, Splash
├── data/              Single source of truth — categories, tools, games
├── hooks/             usePersistedState — drop-in useState that saves to localStorage
├── pages/             Dashboard, BrainBreaks, StudentTools, ToolPlaceholder, About
├── styles/            tokens.css (design tokens), globals.css
└── theme/             ThemeProvider + useTheme hook
```

## Brand

- Palette sampled from the Innovation Centre target: near-black `#0A0A0B`, magenta accent `#E6007E`.
- Display serif: Cormorant Garamond. Body sans: Inter. Loaded from Google Fonts (cached by service worker for offline).
- Crest at `public/crest.svg` is a placeholder — swap in the real HRS crest when available; the palette will be re-sampled.

## To-do (next sprint)

1. Drop in real HRS crest + favicon set + PWA icons (`public/pwa-192.png`, `pwa-512.png`, `pwa-512-maskable.png`).
2. Build tool logic per-category, highest-value first. Suggested first pass: Countdown, Name Picker, Random Group Maker, Whiteboard, Quick Quiz.
3. Author AC V9 question banks per stream per subject — JSON files under `src/data/banks/`.
4. Add `/games-of-the-day` shortcut on Brain Breaks landing.
