# HRS Brain Breaks

Projector-ready brain-break games for **Haileybury Rendall School**, plus
a Teacher Tools section for everyday classroom utilities. Built as a
React + Vite + PWA. Dark-first. Works offline. All state stored in the
browser — no accounts, no servers, no student data ever leaves the
device.

## What's in here

### Brain Breaks (the headline)
- **18 brain-break games** across 5 groups (Quick & Energetic, Word & Language, Number & Logic, History & Geography, Whole-Class Energiser)
- Each game tagged to one or more AC V9 streams (Foundation–Y2, Y3–Y6, Y7–Y9, Y10–Y12) and subjects (English, Maths, History, Geography, Science, General)
- Senior cohort filter (Y11 Units 1–2 / Y12 Units 3–4) on MCQ-driven games
- ~2,100 curriculum-aligned content items across the banks, most with AC V9 codes and explanations
- Every game runs from the teacher's projected screen — no per-student devices

### Teacher Tools (the secondary section)
Accessible from the **Teacher Tools** tab in the header.

- **25 classroom tools** across 5 categories — Classroom Management, Randomisers, Literacy, Numeracy, Science
- Includes Random Group Maker, Marble Jar, Tournaments, Polling, Spelling Test Runner, Sentence Builder, Periodic Table, Fraction Tool, Place Value Chart, FDP Converter, and more

## Routes

| URL | Page |
|---|---|
| `/` | Brain Breaks (landing) |
| `/brain-breaks/:id` | Individual brain-break game |
| `/tools` | Teacher Tools |
| `/tool/:id` | Individual tool |
| `/about` | About |
| `/splash` | First-visit splash |

Old `/dashboard` and `/brain-breaks` URLs redirect to the new home so
existing bookmarks survive the pivot.

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

Opens at http://localhost:5173.

## Build for hosting

```powershell
npm run build
npm run preview
```

The `dist/` folder is static — drop it on any host (school IIS, GitHub
Pages, Cloudflare Pages, etc.). The service worker activates after the
first load and the app runs offline thereafter.

## Project layout

```
src/
├── components/        Crest, Header, ThemeToggle, ToolCard, CategorySection, Splash
├── data/              Single source of truth — categories, tools, games
│   └── banks/         Content banks: mcq, oddOneOut, higherOrLower, words,
│                       sentences, sightWords, hass, misc, stories
├── games/             23 game implementations + shared GameShell + ResultScreen
├── hooks/             usePersistedState — drop-in useState that saves to localStorage
├── pages/             Dashboard (Teacher Tools), BrainBreaks (landing),
│                      ToolPlaceholder, About
├── styles/            tokens.css (design tokens), globals.css
├── theme/             ThemeProvider + useTheme hook
└── tools/             Tool implementations grouped by category + ToolShell

source-material/       (gitignored except README + PROGRESS-LOG)
                       HRS SACs, scope & sequence documents, unit overviews
                       organised by subject + year level. Used to anchor
                       brain-break content generation.
```

## Brand

- Palette built around the HRS burgundy crest — accent `#a2235f`, near-black backgrounds
- Display serif: Source Serif 4. Body sans: Inter
- Real HRS crest is in place on the splash screen and dashboard header

## AC V9 alignment

Brain breaks and streamed tools use four fixed streams to mirror AC V9 bands:

| Stream | Years |
|---|---|
| Lower Primary | Foundation – Year 2 |
| Upper Primary | Year 3 – Year 6 |
| Middle School | Year 7 – Year 9 |
| Senior School | Year 10 – Year 12 |

Senior MCQ items also carry an optional `unit: 1 | 2 | 3 | 4` tag so the
Y11 (Units 1–2) and Y12 (Units 3–4) cohort filter on Quick Quiz, Buzzer
Round and Question Generator can narrow rounds to a specific year.

Question banks are filterable by stream and subject. The Brain Breaks
page exposes both as chip filters plus a "Surprise me" picker.

## Known gaps

- **PWA icons** — `public/pwa-192.png`, `pwa-512.png` and `pwa-512-maskable.png` are still placeholders. Drop in final exports of the HRS crest to brand the home-screen tile.
- **HRS-anchored content** — every bank is currently authored from AC V9 training-knowledge. The `source-material/` workflow (gitignored, drop SACs in per subject × year folder, Claude rewrites the matching bank items) is set up but no subjects have been processed yet. See `source-material/PROGRESS-LOG.md` for the matrix of what's been done.
