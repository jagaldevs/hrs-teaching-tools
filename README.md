# HRS Teaching Tools

Teaching toolkit for **Haileybury Rendall School** — Innovation Centre.
React + Vite PWA. Dark-first. Works offline. All state stored in the browser.

## What's in here

- **26 classroom tools** across 5 categories — Classroom Management, Teaching Aids, Randomisers, Literacy, Numeracy.
- **23 brain-break games** across 5 groups (Quick & Energetic, Word & Language, Number & Logic, History & Geography, Whole-Class Energiser), each tagged to one or more AC V9 streams (Foundation–Y2, Y3–Y6, Y7–Y9, Y10–Y12) and subjects (English, Maths, History, Geography, Science, General). All games run from the teacher's projected screen — no per-student devices required.
- **AC V9-aligned content banks** under `src/data/banks/` — MCQs, odd-one-out items, higher-or-lower facts, vocabulary with optional subject tags, sight-word lists, sentences, timelines, HASS items (flags, landmarks, maps, historical figures) and more.
- **Splash → Dashboard** routing with optional "don't show again" via localStorage.
- **Dark / Light theme** with system-preference fallback, persisted across visits.
- **Editorial dashboard** — hairline-bordered tool cards, accent-on-hover reveals description, responsive grid.
- **Fullscreen-friendly games** with a projector-ready GameShell (back button + fullscreen toggle).
- **PWA service worker** for full offline support after first load.
- **Subject/stream filtering** on the Brain Breaks index and inside tools that draw from streamed banks (Word Builder, Sentence Builder).

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
│   └── banks/         Content banks: mcq, oddOneOut, higherOrLower, words,
│                       sentences, sightWords, timelines, hass, misc
├── games/             25 game implementations + shared GameShell + ResultScreen
├── hooks/             usePersistedState — drop-in useState that saves to localStorage
├── pages/             Dashboard, BrainBreaks, ToolPlaceholder, About
├── styles/            tokens.css (design tokens), globals.css
├── theme/             ThemeProvider + useTheme hook
└── tools/             Tool implementations grouped by category + ToolShell
```

## Brand

- Palette built around the HRS burgundy crest — accent `#a2235f` (sampled from `public/1660004439-haileybury-rendall.png`), near-black backgrounds.
- Display serif: Source Serif 4. Body sans: Inter. Loaded from Google Fonts (cached by the service worker for offline use).
- Real HRS crest is in place on the splash screen and dashboard header.

## AC V9 alignment

Games and streamed tools use four fixed streams to mirror AC V9 bands:

| Stream | Years |
|---|---|
| Lower Primary | Foundation – Year 2 |
| Upper Primary | Year 3 – Year 6 |
| Middle School | Year 7 – Year 9 |
| Senior School | Year 10 – Year 12 |

Question banks are filtered by stream and (where relevant) by subject. The Brain Breaks page exposes both as chip filters with a "Surprise me" picker.

## Known gaps

- **PWA icons** — `public/pwa-192.png`, `pwa-512.png` and `pwa-512-maskable.png` are still placeholders. The manifest is wired up; just drop in the final exports.
- **Numeracy category** has only one tool (FDP Converter). It will either fold into Teaching Aids or get expanded in a future pass.
