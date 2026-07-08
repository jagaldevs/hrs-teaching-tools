# HRS Brain Breaks

Projector-ready brain-break games for **Haileybury Rendall School**, plus
a Teacher Tools section for everyday classroom utilities. Built as a
React + Vite + PWA. Dark-first. Works offline. All state stored in the
browser — no accounts, no servers, no student data ever leaves the
device.

## What's in here

### Brain Breaks (the headline)
- **17 brain-break games** across 5 groups (Quick & Energetic, Word & Language, Number & Logic, History & Geography, Whole-Class Energiser)
- **Scope: Year 7–10.** Content development targets HRS Year 7–10 classes (20 classes across English, Maths, Science, Humanities and Health & PE)
- Classes marked **HRS-anchored** serve content authored from that class's real teaching materials; all other classes fall back to generic AC V9-aligned items
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
# Windows
winget install OpenJS.NodeJS.LTS
```

```bash
# macOS
brew install node        # or the installer from nodejs.org
```

## Run it

```powershell
npm install
npm run dev
```

Opens at http://localhost:5173.

## Development setup (full)

If you're cloning this onto a fresh machine (e.g. moving devices), here's
the full toolchain needed for end-to-end work including class onboarding:

```powershell
# Windows
# Required for the app
winget install OpenJS.NodeJS.LTS
winget install Git.Git

# Required for source-material extraction (used during class onboarding)
winget install Python.Python.3.12
py -m pip install python-docx pypdf

# Optional: only if onboarding a class whose textbook is a scanned PDF
winget install -e --id UB-Mannheim.TesseractOCR --silent
py -m pip install pytesseract PyMuPDF
```

```bash
# macOS equivalents
brew install node git    # or installers from nodejs.org / git-scm.com
python3 -m pip install python-docx pypdf

# Optional OCR toolchain (scanned-PDF textbooks)
brew install tesseract
python3 -m pip install pytesseract PyMuPDF
```

On macOS, use `python3` wherever these docs say `py`.

After cloning the repo and running `npm install`, the app is fully
functional. Source material under `source-material/` is gitignored —
if you need the existing anchored class's source documents on a new
machine, transfer that folder separately (USB / OneDrive / direct file
copy). For new class onboardings you only need to drop fresh materials
into the relevant `source-material/<subject>/<class>/` folder.

### Bootstrap a Claude Code session

The onboarding playbook and engineering log are in the repo:

- `WORKLOG.md` — every project decision, convention and pitfall
- `.claude/skills/onboard-class/SKILL.md` — the class-onboarding workflow
- `JACK-NOTES.md` — quick-reference for the project owner

To start a new Claude Code session with full context, paste the
bootstrap message from `JACK-NOTES.md` ("Read @WORKLOG.md and
@.claude/skills/onboard-class/SKILL.md..."). Same paste-text works
on any device with the repo cloned.

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
                       HRS teaching documents organised by subject + year
                       (english, maths, science, humanities, health-and-pe,
                       technology). Used to anchor brain-break content
                       generation for Year 7–10 classes.
```

## Brand

- Palette built around the HRS burgundy crest — accent `#a2235f`, near-black backgrounds
- Display serif: Source Serif 4. Body sans: Inter
- Real HRS crest is in place on the splash screen and dashboard header

## Scope & class targeting

Brain-break content development targets **HRS Year 7–10 classes**
(scope decision 2026-07-08). The class registry lives in
`src/data/classes.ts`; each Quick & Energetic game's setup screen
offers a year-band picker and a class dropdown with HRS-anchored
classes pinned to the top.

- **Anchored classes** (currently: Year 10 Maths, 452 items) serve
  content authored from the class's real HRS teaching materials via
  the `source-material/` workflow.
- **All other classes** fall back to generic AC V9-aligned items.
  Internally, legacy AC V9 "stream" tags still index that generic
  pool, but streams are no longer a user-facing concept.

`source-material/PROGRESS-LOG.md` tracks each in-scope class through
the content pipeline: materials received → overview written →
anchored → audited.

## Known gaps

- **PWA icons** — `public/pwa-192.png`, `pwa-512.png` and `pwa-512-maskable.png` are still placeholders. Drop in final exports of the HRS crest to brand the home-screen tile.
- **HRS-anchored content** — 1 of the 20 in-scope classes is anchored so far (Year 10 Maths, 452 items). The remaining Year 7–10 classes serve generic AC V9 content until their materials are processed — see `source-material/PROGRESS-LOG.md` for the per-class tracker.
- **Legacy Foundation–Y6 content** — the app still carries primary-years year bands, classes and generic bank items from the earlier, broader scope. Removing (or hiding) them is a pending code-level scope reduction.
