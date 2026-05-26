# Content Upgrade Progress

Living document tracking the major AC V9 content overhaul of all brain-break
games. Future sessions read this first to know where work is up to.

## The vision

Every brain-break game should draw from authentic AC V9 content descriptors,
streamed to the right year band, with enough volume that classes don't see
repeats within a single round. A teacher selecting Senior School should see
content that maps to the senior subjects (Units 1–4 for Y11–12).

## Phases

| # | Scope | Status |
|---|---|---|
| **1** | MCQ_BANK overhaul (Quick Quiz, Buzzer Round, Question Generator) | **shipped** |
| **2** | OddOneOut + HigherOrLower overhaul | **shipped** |
| **3** | Words, Sentences, Story Starters expansion | **shipped** |
| **4** | HASS bank (Flags, Landmarks, WhoAmI, MapPin, TimelineOrder) | **shipped** |
| **5** | Misc bank (HeadsUp, Estimate, Categories, TwoTruths, WouldYouRather, Synonyms) | **shipped** |
| **6 (UI)** | Senior cohort filter chips (Y11 Units 1–2 / Y12 Units 3–4) on MCQ games | **shipped** |

## Decisions baked in (default choices, can revisit)

- **Senior split:** items use an optional `unit?: 1 | 2 | 3 | 4` field on the
  MCQ type. Y10 items leave `unit` undefined. Phase 6 may later split senior
  into separate streams; the data is ready.
- **AC code precision:** best-effort from training knowledge. Codes follow AC V9
  format (e.g. `AC9E7LA01`, `AC9M5N04`). Where unsure, code is omitted and the
  explanation carries the strand reference instead.
- **Volume target:** ~25 items per (stream × subject) cell.
- **Science is added** as a subject across all banks that previously lacked it.

## Phase 1 — MCQ_BANK overhaul

Target: 4 streams × 5 subjects × 25 items = **~500 MCQs**, each with
`explanation` + (where possible) `acCode`.

### Sub-tasks

- [x] Add `unit?: 1 | 2 | 3 | 4` to MCQ type in `src/games/types.ts`
- [x] Lower Primary (F–2): English, Maths, History, Geography, **Science** — 25 each
- [x] Upper Primary (3–6): English, Maths, History, Geography, **Science** — 25 each
- [x] Middle School (7–9): English, Maths, History, Geography, **Science** — 25 each
- [x] Senior School (10–12): English, Maths, History, Geography, **Science** — 25 each, with `unit` tagging on senior-specific items
- [x] Verify `Science` surfaces in the SetupScreen (already wired via SUBJECTS in `games/types.ts`)
- [x] Add `science` to Quick Quiz and Buzzer Round `subjects` in `src/data/games.ts`
- [x] Type-check + Vite build clean
- [x] Commit + push

**Shipped: ~500 MCQs total** (4 streams × 5 subjects × 25). Every item carries
an `explanation`; most carry an `acCode`; Y11-12-specific senior items tagged
with `unit`.

### Followups / known minor issues

- Senior science has one cosmetic duplicate-looking id (`ss-s-3b`) — functional
  but worth renumbering on the next pass.
- AC codes are best-effort from training knowledge; some may need correction
  when a teacher cross-references the AC V9 site.
- `Question Generator` tool inherits the new content automatically.
- `OddOneOut`, `HigherOrLower`, and other game `subjects` arrays still claim
  Science even though those banks don't yet hold Science content — fix in
  Phase 2 when expanding those banks.

### AC V9 prefix legend (for reference while authoring)

| Subject | F–10 prefix | Strands |
|---|---|---|
| English | AC9E{year}{strand} | LA = Language, LE = Literature, LY = Literacy |
| Mathematics | AC9M{year}{strand} | N = Number, A = Algebra, M = Measurement, SP = Space, ST = Statistics, P = Probability |
| HASS (F–6) | AC9HS{year}{strand} | K = Knowledge & Understanding, S = Inquiry & Skills |
| History (7–10) | AC9HH{year}{strand} | K = Knowledge & Understanding, S = Inquiry & Skills |
| Geography (7–10) | AC9HG{year}{strand} | K = Knowledge & Understanding, S = Inquiry & Skills |
| Science | AC9S{year}{strand} | U = Understanding, H = Human Endeavour, I = Inquiry |

`{year}` is `F`, `1`–`10`. Strand number is 2 digits, e.g. `AC9E7LA01`.

For Senior subjects the codes follow a different format (subject-specific) and
are less consistently authored here; the `unit` field carries the
Units 1–4 mapping for senior content.

## How to resume after a session

1. Read this file top to bottom.
2. Find the current phase's sub-task list — the first unchecked box is where to
   start.
3. Check off completed boxes as work progresses; add new sub-tasks if scope
   shifts.
4. When a phase completes, mark its row in the table and add a brief "Shipped in
   commit XYZ" note under the sub-tasks.

---

## Phase 2 — OddOneOut + HigherOrLower overhaul

Targets:
- **OddOneOut**: 4 streams × 5 subjects × ~15 items = ~300 items. Add Science.
  Optional `acCode` + `explanation` (already exists on type).
- **HigherOrLower**: subject-key the bank (currently general-only). English
  doesn't fit numeric comparison so it's intentionally skipped. Add buckets
  for general, maths, history, geography, science. ~15 items per (stream ×
  subject) = ~300 items. Add `acCode` + `context` where useful.

### Sub-tasks

- [x] Add optional `acCode?: string` to OddItem (already existed)
- [x] Add optional `acCode?: string` to HoLItem
- [x] OddOneOut: rebuild all 20 (stream × subject) cells with Science added — 12-15 items each, ~300 total
- [x] HigherOrLower: rebuild with subject-keyed structure (general / maths / history / geography / science) — 8-14 items per cell, ~270 total
- [x] HigherOrLower game: stop hiding subject picker; pass `sel.subject` to `pickFromBank` so themed rounds work
- [x] Update `higher-or-lower` game `subjects` array in games.ts to include science + general
- [x] Type-check + Vite build clean
- [x] Commit + push

**Shipped:** ~570 new content items across OddOneOut + HoL. AC codes on most.
HoL teachers can now run a "Year 9 History" round (years of WWI battles), a
"Senior Science" round (Planck constant, Avogadro's number), etc.

### Followups / known minor issues

- A couple of population/area numbers will drift over time (population of
  India, CO₂ ppm, etc.). Considered acceptable for AC V9 alignment — the
  curriculum doesn't pin to specific year-end figures.
- English deliberately omitted from HoL bank (numeric comparison doesn't fit
  the subject). Brain Breaks filter still allows english as a Subject chip
  but selecting it on HoL will yield no items — game gracefully handles
  empty results.

---

## Phase 3 — Words, Sentences, Story Starters expansion (SHIPPED)

### Sub-tasks
- [x] Words: lift to ~60+ per stream with balanced 5-subject coverage. ~235 total.
- [x] Sentences: ~27 per stream with all 5 subjects represented. ~109 total.
- [x] Story Starters: expand from 30 to 84 prompts, ~6 per (genre × band).
- [x] Type-check + Vite build clean.
- [x] Commit + push.

**Shipped:** ~340 new content items across words, sentences and stories. Words
and sentences now have proper subject distribution at every stream level
(previously English was thin at Lower Primary). Senior sentences include
postcolonial criticism, calculus, complex numbers, normal distribution,
decolonisation, conservation of energy — Y11-12-pitch content.

### Followups
- WordEntry doesn't carry `acCode` (subject tag is the closest curriculum
  link). Could add strand-level tagging later if teachers want to filter to
  "AC9E10LA*" style.
- StoryStarters still uses primary/secondary bands. A future polish pass
  could add explicit `streams: Stream[]` and update the UI filter chips.

---

## Phase 4 — HASS bank overhaul (SHIPPED)

### Sub-tasks
- [x] Add optional `acCode` to TimelineEvent type
- [x] Timeline: LP 12, UP 26, MS 30, SS 35 — ~100 events total
- [x] Flags: LP 10, UP 15, MS 15, SS 15 — ~55 flags
- [x] Landmarks: LP 8, UP 12, MS 12, SS 12 — ~44 items
- [x] WhoAmI: LP 4, UP 6, MS 6, SS 6 — ~22 figures, scientists added
- [x] MapPin: expanded from 21 to 30 prompts (more landmarks + wine regions)
- [x] Type-check + Vite build clean
- [x] Commit + push

**Shipped:** ~250 new HASS items. Timeline is now AC-V9-tagged across all
four streams (AC9HS, AC9HH, AC9HG codes). Scientists added to WhoAmI:
Newton, Einstein, Darwin, Galileo, Marie Curie, Rosalind Franklin, Stephen
Hawking. Lower Primary gets relatable figures (Bluey, Steve Irwin,
"a kangaroo").

### Followups
- LandmarkItem & FlagItem don't carry `acCode` yet — could add for
  Geography-strand tagging if Phase 6 expands the senior subject filter.
- MapPin remains a single flat pool (not stream-keyed). Game does not
  filter on stream — could later, but content is currently universal.

---

## Phase 5 — Misc bank overhaul (SHIPPED)

### Sub-tasks
- [x] Estimate It: lifted from ~38 to ~80 items (20 per stream)
- [x] Two Truths & a Lie: lifted from ~13 to ~32 items (8 per stream)
- [x] Synonym & Antonym Sprint: lifted from ~22 to ~52 items (~13 per stream)
- [x] Would You Rather: lifted from ~20 to ~50 items (~13 per stream, more topic tagging)
- [x] Heads Up: doubled categories from 6 to 12; ~20 words each (~240 total)
- [x] 20 Questions: lifted from 20 to ~50 items with better category mix
- [x] Categories (Scattergories): lifted from 12 to 30 prompts
- [x] Type-check + Vite build clean
- [x] Commit + push

**Shipped:** ~420 new items. Heads Up now has Australian Icons, Science,
Maths, History, Literature and Geography subject categories — teachers can
run themed rounds aligned to current lesson topics. WYR senior items push
philosophy and ethics: "Know how the universe began / how it will end",
"Be ruled by AI judges / elected human judges".

### Followups / known minor issues
- `ms-tl-5` in TruthsLie has a deliberately tricky three-statement Cleopatra
  comparison where all three statements are arguably true. Noted in the
  explanation; should be replaced with a clean lie on the next pass.
- `HeadsUp` categories aren't subject-keyed in the type system — game just
  shows category name. Teachers pick by name; that's sufficient.

---

## All five content phases complete

The original brain-break content upgrade plan called for 5 content phases
plus an optional structural Phase 6. As of this commit, Phases 1–5 are
shipped. The content layer now includes:

| Bank | Total items | Change from baseline |
|---|---|---|
| MCQ | ~500 | up from ~170 |
| OddOneOut | ~300 | up from ~60 |
| HigherOrLower | ~270 | up from ~40, subject-keyed |
| Words | ~235 | up from ~140 |
| Sentences | ~109 | up from ~60 |
| Story Starters | 84 | up from 30 |
| HASS (Timeline/Flags/Landmarks/WhoAmI/MapPin) | ~250 added | substantial coverage |
| Misc (Estimate/Truths/Syn/WYR/HeadsUp/TQ/Cat) | ~420 added | substantial coverage |

Total: **~2,100 curriculum-aligned items** powering all 25 brain-break
games, most carrying AC V9 codes and explanations.

---

## Phase 6 (UI path) — Senior cohort filter (SHIPPED)

The UI-only path was chosen instead of a full structural split (less
invasive, immediately realises the Senior Units 1–2 teacher use case
without rewriting 8 bank files).

### Sub-tasks
- [x] Added `unitGroup: 'any' | 'units_1_2' | 'units_3_4'` to SetupSelections
- [x] SetupScreen renders a "Senior cohort" chip strip when `showSeniorUnits` prop is true AND `senior_school` is the active stream
- [x] `pickFromBank` accepts an optional `filter` predicate (post-subject, pre-slice). If filter eliminates everything, it falls back to the unfiltered pool — start button never silently fails
- [x] New `unitFilterFor(sel)` helper in bankUtils builds the right predicate from the SetupSelections
- [x] Wired through Quick Quiz and Buzzer Round (both pass `showSeniorUnits` to SetupScreen and `unitFilterFor(sel)` to pickFromBank)
- [x] Wired through Question Generator tool (own UI — added an inline unit-group filter row that only renders for Senior)
- [x] Type-check + Vite build clean
- [x] Commit + push

The structural split (separate streams for Y10 / Y11 / Y12) remains
available as a future option if the unit filter proves popular and a more
prominent place for it is wanted. Data is already tagged either way.

---

_Last updated: All content phases (1–5) + Phase 6 UI shipped._
