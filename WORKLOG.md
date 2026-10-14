# Work Log

The engineering log for HRS Brain Breaks: how the code is organised, the
conventions, the decisions and lessons worth keeping, and a dated handoff
for every session (last section, newest first). Jack's
quick reference is `JACK-NOTES.md`; the class-onboarding workflow is
`.claude/skills/onboard-class/SKILL.md`.

Sections 1–7 describe the code **as it is now** — update them in place
when it changes. Session handoffs are history: append, don't rewrite.
(The pre-2026-10-14 versions of §1–7, written for the VCE era, are in
git history.)

---

## 1. Orientation

- React 18 + Vite 5 + TypeScript PWA; dark-first, offline, all state in
  `localStorage` under `hrs:` keys. No server.
- **Brain Breaks** (`/`): 14 games. **Teacher Tools** (`/tools`): 25.
- Content is static TypeScript in `src/data/banks/` — never fetched.
- Teachers pick a **year band** and a **class** (`src/data/classes.ts`).
  The three Quick & Energetic games and the Question Generator serve a
  class's **anchored** items when it has them, otherwise a **generic**
  AC V9 pool for its stream + subject.
- Scope: content work targets the 20 Year 7–10 classes. F–6 stays in the
  app with generic content. VCE is reference material only (removed from
  the app 2026-06-03; study designs live in `source-material/_reference/vce/`).
- Repo: `C:\Users\jack.galbraith\Code\hrs_teaching_tools` (Windows PC).
  Remote `jagaldevs/hrs-teaching-tools` (private).

## 2. Where things live

| Path | What |
|---|---|
| `src/data/classes.ts` | `YEAR_BANDS`, `BAND_TO_STREAM`, `HRS_CLASSES` (28: 8 primary + 20 Y7–10), `isSelectable()`, class helpers `f2/p36/y7–y10(…, extra)` |
| `src/data/games.ts` | Game registry (id, group, streams, subjects) + legacy `Stream` type |
| `src/data/banks/mcq.ts` | `MCQ_BANK` — generic `byStreamSubject` + anchored `byClass` |
| `src/data/banks/oddOneOut.ts` | `ODD_BANK`, same shape |
| `src/data/banks/misc.ts` | `TRUTHS` (Two Truths, keyed by stream; class items carry `classId`), `ESTIMATE`, `SYN_ANT`, `WYR` |
| `src/data/banks/hass.ts` · `words.ts` · `sentences.ts` · `stories.ts` | Timeline / Who Am I · word games · tools |
| `src/games/bankUtils.ts` | `pickFromClass`, `classPool`, `shuffleOptions` |
| `src/games/ClassPicker.tsx` | `<ClassPicker>` + `useClassSelection()` — shared by `SetupScreen` and the Question Generator |
| `src/games/GameShell.tsx` | `<GameShell>` chrome + `<SetupScreen>` (band/class/count → `SetupSelections`) |
| `src/games/registry.ts` · `src/tools/registry.ts` | id → lazy component |
| `src/test/*.test.ts` | Vitest: bank integrity, class wiring, `shuffleOptions` |
| `scripts/audit-content.ts` | `npm run audit:content` rigour heuristics |
| `scaffold_overviews.py` | Creates `_overview.md` templates for the 20 Y7–10 class folders |
| `source-material/` | Gitignored teaching materials: `<subject>/year-<n>/` per class, `_reference/{ac-v9,vce,hrs}/` cross-class |

## 3. Conventions

### 3.1 Classes and selection

- A class is **anchored** when `anchored: true` and the banks have
  `byClass[id]` items — `npm test` checks the two agree. Set it with the
  helper's `extra` arg: `y8('y8-science', …, { anchored: true })`.
- A class is **selectable** (shown in pickers) when it's anchored or its
  subject has a generic pool (`isSelectable`). Health & PE (`general`)
  is hidden until anchored.
- `pickFromClass(bank, classId, n)`: anchored items first, topped up
  from the generic pool (`legacyStream` × `backfillSubjects ?? [subject]`).
  **No random-mix fallback** — that's what once served science questions
  to Health & PE. Humanities classes set `backfillSubjects:
  ['history', 'geography']` via the `HUM` constant.
- Two Truths: class items are `TRUTHS[legacyStream]` entries with
  `classId`; a class with none gets the stream's generic items with a
  visible "General knowledge" chip (generic TL items are deliberately
  cross-subject, so they can't be subject-filtered).

### 3.2 Subjects

`Subject` = english · maths · history · geography · science · general,
defined in `src/games/types.ts` (`SUBJECTS`, `SUBJECT_COLOURS`) and
mirrored in the `Game.subjects` union in `src/data/games.ts`. Adding one
means updating both, plus `GENERIC_SUBJECTS` in `classes.ts` if it gets a
generic pool.

### 3.3 Bank item shapes

```ts
MCQ          { id, q, choices: [4], answer: 0–3, explanation?, acCode? }
OddItem      { id, items: [4], outlier: 0–3, explanation?, acCode? }
TruthsLieItem{ id, statements: [3], lie: 0–2, explanation, subject?, classId? }
```

Answer position in the data doesn't matter: games call `shuffleOptions`
at round start. **Explanations must not refer to option order.**

### 3.4 IDs

- Anchored: `y<year>-<subj>-N` (`y10-math-12`, `y8-hum-200`) for MCQ and
  OOO; `y<year>-tl-<subj>-N` for Two Truths.
- Generic: stream prefix `lp/up/ms/ss` + subject letter (`ms-g-7`), with
  a game infix where a bank is shared (`ms-tl-3`, `ss-est-4`).

### 3.5 Quality

`npm test` must pass; `npm run audit:content -- --class <id>` should be
clean or every finding justified. The rigour rules are in the SKILL.

### 3.6 Commits

Imperative subject ≤ 72 chars; body says why. End with the co-author
trailer naming the Claude model that wrote the change. Keep content and
code changes in separate commits where practical. Commit and push are
fine in this repo.

## 4. Decisions worth remembering

- **Per-class targeting over AC V9 streams** (2026-06-02). Streams
  survive only as the generic backfill key.
- **Quick & Energetic games only show a class picker**; other games pick
  a year band (they have no class-anchored banks).
- **One MCQ bank** serves Quick Quiz and the Question Generator.
- **Removed games** (teacher feedback, 2026): Higher or Lower, Spelling
  Bee, Categories, Equation Match, Map Pin, Landmark Snap, Heads Up,
  20 Questions, Buzzer Round, Memory Sequence, Flag Flash. Don't re-add
  without Jack.
- **Scope** (Jack): VCE removed 2026-06-03; content work narrowed to
  Y7–10 on 2026-07-08 with F–6 kept as generic; arts/electives/languages
  and the `computing` subject removed; Teacher Tools back in scope
  2026-10-14.
- **Shuffle at runtime, not in data** (2026-10-14): fixes position bias
  for every bank, including future ones, without data rewrites.
- **Source material stays out of git** (school IP). It therefore needs
  its own backup.

## 5. Lessons — don't repeat

- **5.1 Silent fallbacks hide wrong content.** If a selection has
  nothing to serve, hide it or say so; never quietly serve something
  else (Health & PE → science, 2026-10-14; Lower Primary trivia for
  Computing, 2026-06).
- **5.2 Audit claims need a script, not a memory.** The rigour audit
  was reported clean while a case-sensitive grep missed lowercase
  "only" distractors, Two Truths items were all-true, and Y10 Maths had
  96% of Odd One Out answers in slot D. Run `npm run audit:content` and
  `npm test`; don't hand-wave.
- **5.3 Check file size before reading.** Textbooks run 20–400 MB.
- **5.4 Read before Edit.** Grep doesn't satisfy the Edit tool.
- **5.5 Two Truths needs exactly one lie.** `ms-tl-5` and
  `y10-tl-math-36` shipped with three truths until 2026-10-14.
- **5.6 PWA cache makes fixes look broken.** Hard-refresh or unregister
  the service worker before concluding a change failed. The dev server's
  SW is disabled; preview/production isn't.
- **5.7 Find the real repo first.** The OneDrive folder is a stub; the
  repo is under `C:\Users\jack.galbraith\Code\`. And check `git status`
  against the remote — this PC was 13 commits behind on 2026-10-14.
- **5.8 Extract big textbooks, don't skip them.** Their named case
  studies make the best questions.
- **5.9 Author big banks in chunks** against a sentinel comment with
  `tsc` after each; one giant insert truncated `mcq.ts`.
- **5.10 Regex data clean-ups:** finish by listing everything that
  still matches, not just what changed (Timeline year leak, 2026-07-12).
- **5.11 Scanned PDFs need OCR.** If pypdf returns empty pages, use
  PyMuPDF + pytesseract (Tesseract in
  `%LOCALAPPDATA%\Programs\Tesseract-OCR\`, no admin needed) at
  ~200 DPI; ~3–5 s per page.
- **5.12 Git Bash `npm`/`npx` fail silently on this PC.** Use
  PowerShell (or `npm.cmd`).
- **5.13 Stale dev-server modules.** If the app throws "X is not
  defined" after an edit `tsc` accepts, restart the dev server — HMR
  can pin an old lazy-chunk URL in `registry.ts`.

## 6. Onboarding a class

Follow `.claude/skills/onboard-class/SKILL.md`. In short: inventory and
extract the class folder + `_reference/`, draft `_overview.md`, **stop
for Jack's misconceptions review**, flip `anchored`, author 302 MCQ + 75
OOO + 75 TL in sentinel-bounded chunks, run `npm test` and
`npm run audit:content`, check in the app, update `PROGRESS-LOG.md` and
this log, commit, push.

## 7. Open questions and known follow-ups

1. ~~**Rigour fixes from the 2026-10-14 re-audit.**~~ Done 2026-10-14
   (see handoff). All three anchored classes audit clean.
2. **Generic pools are thin:** 25 MCQ per stream × subject (senior maths
   11 and senior science 23 after the VCE clean-up), and Years 7, 8 and 9 share one pool.
   Repeats are likely for unanchored classes until they're anchored.
3. **Health & PE** needs a subject decision when the first one is
   anchored (keep `general` or add `health-pe`).
4. **Teacher Tools streams:** Word Builder, Sentence Builder and Group
   Name Generator still use their own "Lower Primary … Senior School"
   stream buttons rather than year bands. Works; inconsistent.
5. **Dependencies:** `npm audit` reports issues mostly in build tooling;
   React 19 / Vite 6+ / vite-plugin-pwa 1+ are major upgrades — do them
   as a separate, tested step.
6. **Backup** for `source-material/` (not in git, not in OneDrive).

---

## Session handoffs

**Session handoff (2026-10-14, later — §7.1 rigour fixes):**
Fixed the re-audit findings; Jack reviewed the before/after list first.

- **Y10 Maths, 17 Two Truths lies:** each "always/only/every" lie is now
  a specific worked counterexample of a common misconception (e.g.
  `√2 × √8 is irrational`, `x² + 4 factorises as (x + 2)(x − 2)`,
  `y = (2x)² is a vertical dilation by factor 2`). Explanations show the
  working. `y10-tl-math-26`'s truth "It can be used…" named its subject
  (a pronoun that relies on statement order breaks under shuffle);
  `-64`'s "These theorems…" lie was replaced for the same reason.
- **Y8 Humanities:** 10 "only …" distractors across 7 MCQs (the audit
  reports only the first per item, and `-214`/`-234` had 2–3), plus
  4 absolute distractors in `-145`/`-148` ("nothing truly changes",
  "historians can never be trusted", …) at Jack's request, all replaced
  with misconception-based options.
- **Checks:** `npm test` 2,221 passed; tsc clean; audit Y8 Hum 0
  findings, Y10 Maths 1 (`y10-math-210` length, a decimal median —
  justified).
- **Gotcha:** PowerShell's execution policy blocks `npm.ps1` on this
  PC; call `npm.cmd` / `npx.cmd`. Plain `python` isn't on PATH, use `py`.

**Next:** onboard the next class (confirm which with Jack) once
`_reference/` is populated. Open: `source-material/` backup (§7.6).

**Session handoff (2026-10-14, back on Windows — audit + cleanup):**
Jack picked the project up on the Windows work PC after the July Mac
stint. A read-only audit came first, then a five-phase plan Jack
approved (commit + push per phase).

- **Migration:** the local `Code` copy was 13 commits behind GitHub
  (the Mac's July work) — pulled. `python-pptx` installed. Toolchain
  otherwise present (Node 24, Python 3.14, Tesseract). Jack chose not to
  bring the Mac's Y7/Y8 Humanities source material across.
- **Correctness fixes:** Health & PE hidden until anchored
  (`isSelectable`); Two Truths labels generic-only rounds; Humanities
  backfills from history + geography; `up-h-12` duplicate distractor;
  result screens score against rounds actually played; real PWA icons
  and favicon from the crest.
- **VCE clean-up:** 61 unit tags and `MCQ.unit` removed; 17
  beyond-Year-10 senior MCQs deleted (Jack approved the list);
  `pickFromBank` and its random-mix fallback replaced by `genericPool`.
- **Question Generator** moved onto the shared `ClassPicker` (it can
  now see anchored content); dead legacy-key migration removed (it read
  unprefixed keys and never ran).
- **Safety net:** Vitest suite (`npm test`, 2,221 tests) and
  `npm run audit:content`. The audit found Y10 Maths answer positions
  heavily biased (OOO 72/75 in slot D) → games now shuffle options at
  round start. It also found two all-true Two Truths items (fixed) and
  the rigour findings in §7.1 (not yet fixed).
- **Reference material:** `source-material/_reference/{ac-v9,vce,hrs}/`
  skeleton; scaffold script limited to the 20 Y7–10 folders;
  onboard-class SKILL rewritten for the current workflow.
- **Docs:** JACK-NOTES rewritten for Windows; this log's §1–7 rewritten;
  `PLAN-CLASS-FILTER.md` and `CONTENT_UPGRADE_PROGRESS.md` deleted
  (historical — in git history).

**Next:** Jack is collecting AC V9 / HRS scope & sequences and VCE study
designs into `_reference/`. Then fix the §7.1 rigour findings and
onboard the next class (confirm which with Jack).

**Session handoff (2026-07-12, Year 8 Humanities — first mega-batch, 3/20 anchored):**
Second Y7–10 class onboarded, same day as Y7 Humanities completed.
First class run **mega-batch** (no first-unit checkpoint — Jack's
"go" approved the recommendation since Y7 had calibrated the
humanities style). Commits: `1674155` (452 items + anchored flip),
docs commit on top. What landed:

- **Extraction:** 26 unique files — 3 Canvas unit spines (Medieval
  Europe, Japan under the Shoguns, Coasts), 13 lesson PPTXs, 2
  key-terms DOCXs, activities. **python-pptx added to the extraction
  toolchain** (slide text + tables + notes) — most of the geography
  drop is PowerPoint. Two image-only PDFs OCR'd (both low-value).
  GOTCHA: a "skip ` (1).` duplicates" filter silently skipped
  `The Genpei War (1).pptx`, which has NO non-(1) twin — check a twin
  exists before skipping suffixed files.
- **Overview:** `humanities/year-8/_overview.md` — 4 units + skills
  strands, 106 numbered misconceptions, 8 [CONFIRM] flags. Open
  non-blocking flags (same handling as Y7): COMA/TEEAL/BOLTSS
  expansions; the Oxford desert-rainfall figure (extraction reads
  "25 mm/yr", standard is 250 — items avoid the number); Perry never
  named in materials (items say "an American fleet"); Tokugawa
  four-class order assumed taught; geisha left out of items.
- **452 items authored:** 302 MCQ (`y8-hum-1..302`; Medieval 66,
  Japan 78, history skills 14, landscapes 30, coasts 62, cities 34,
  geo skills 18 — first class with a geography-heavy split, 158/144),
  75 OOO (`y8-hum-1..75`), 75 TL (`y8-tl-hum-1..75`, classId
  `y8-humanities`, subject history/geography per unit). Unit-sized
  chunks against the `// Y8_HUM_MCQ_END` sentinel, tsc after each —
  no corruption. Cross-era distractor style continued both ways
  (bushido as a chivalry distractor, sankin-kotai in coasts OOO).
  The two key-terms DOCXs served as verbatim definition anchors.
- **Mid-session credit exhaustion** hit exactly between the OOO tsc
  and TL authoring. Resume was trivial: audit `grep -c` counts +
  registrations + git status against the plan, then continue — the
  chunk-and-sentinel pattern leaves clean seams. Do the same audit
  first after any interrupted authoring run.
- **Audit fully clean:** 0 Only/Just, 0 em-dash-in-choices, 0 length
  asymmetry >2.5x, 0 duplicate stems; MCQ answers 76/76/75/75, OOO
  outliers 19/18/19/19, TL lies 25/25/25; TL absolute-language tells
  0 after rewriting 11 flagged lies (the audit regex now also runs
  against TL as standard).
- **Verified live:** Y8 Humanities pinned in the "HRS-anchored ✓"
  optgroup and auto-selected for the Y8 band; instrumented 15-question
  Quick Quiz playthrough served all units with 0 errors (all-A
  autoplay scored 1/15 — position balance visibly working); OOO and
  Two Truths both serve y8 content; landing footer roll-call lists
  all three anchored classes; tsc + production build clean.

**UPDATE (later same day): landing rework from Jack's screenshot.**
Three changes: (1) **Who Am I? → Whole-Class Energiser** (games.ts
group + registry reorder; component untouched). (2) **Flag Flash
removed** (15 → 14 games; component, CSS, registry + games.ts
entries, and its FLAGS bank in hass.ts — FLAGS fed only this game).
See §4.6. (3) **Timeline Order answer leak fixed** — every TIMELINE
`event` string embedded its year ("Australian Federation (1901)"),
handing students the sort order; the component already reveals the
`year` field after "Lock in order", so the suffixes were pure leak
plus reveal-screen duplication. Stripped 100 year/age parentheticals
via regex in `hass.ts` and hand-fixed four where the year was part of
the name (both "1967 Referendum" items reworded, "Foundation of Rome
(753 BCE, traditional)" → "(traditional date)", Vesuvius "(79 AD)" —
that one slipped the first regex because "AD" wasn't in the
alternation; the exhaustive list-all-parentheticals sweep caught it.
LESSON: when regex-cleaning data, finish with a dump of everything
REMAINING that resembles the pattern, not just what changed).
Verified live: landing shows 14 games, HASS group "1 game"
(pluralisation fixed in BrainBreaks.tsx), Whole-Class shows
Who Am I? + Would You Rather, /brain-breaks/flag-flash falls back to
the not-found placeholder, and three Timeline rounds showed zero
years pre-reveal with years appearing on reveal. tsc + build clean.

**Next class:** confirm the target with Jack once its materials are
dropped. Y9/Y10 Humanities would reuse this session's geography
patterns heavily; any subject's first class should still get the
misconceptions-review gate.

**Earlier session handoff (2026-07-12, Year 7 Humanities — Deep Time checkpoint):**
First class onboarding kicked off (the calibration-checkpoint model
agreed for the first class). What landed:

- Read all 9 HRS Canvas unit PDFs (history: Deep Time + Egypt/Greece/
  Rome/China + skills; geography: Water in the World + Place &
  Liveability + skills). Extracted each to `.extracted.txt`
  (gitignored) via pypdf.
- Drafted `source-material/humanities/year-7/_overview.md` — full
  topic sequence, 60+ misconceptions, `[CONFIRM]` flags on
  COMA/TEEAL/SPICESS/BOLTSS expansions. **Misconceptions list is
  awaiting Jack's review — that's the checkpoint gate.**
- Authored the **Deep Time History unit only** as the calibration
  slice: 44 MCQ (`y7-hum-1..44`), 12 OOO (`y7-hum-1..12`), 12 TL
  (`y7-tl-hum-1..12`, classId `y7-humanities`). Flipped
  `y7-humanities` to a literal HrsClass with `anchored: true`.
- Rigour: three-tier audit clean (fixed 2 "Only X" distractors + 2
  length-asymmetry items). **Also caught and fixed an answer-position
  bias** — my first MCQ draft had 39/44 correct answers at position A;
  a rebalancing script spread them to 11/11/11/11. TL lie positions
  balanced 4/4/4. Added this as a standing audit step (see below).
- Verified live: Y7 Humanities pinned top with ✓ badge; Quick Quiz,
  Odd One Out and Two Truths all serve real Deep Time content; a full
  instrumented Quick Quiz playthrough threw 0 errors; tsc + build
  clean.

**GOTCHA logged — mid-file corruption during a large array insert.**
A big single-Edit insert of the MCQ array failed partway, leaving
`mcq.ts` with a truncated item (`y7-hum-8` cut mid-string) and the
`export const MCQ_BANK` line gone — the file wouldn't compile and
Vite HMR served a broken lazy chunk (the source of a pile of stale
`at Lazy/at Suspense/at GameRouter` console errors that persisted in
the preview buffer even after the fix). Lesson: author large banks in
unit-sized chunks against a sentinel comment, type-checking after
each, rather than one giant insert. New audit step for every batch:
check correct-answer / outlier / lie positions are spread across all
slots, not clustered at one index — grep+python, same as length.

**UPDATE (later same day): Year 7 Humanities fully authored — 452
items shipped.** Jack said "Yes go" to the full sweep. Authored the
remaining 8 units on top of the Deep Time checkpoint:
- **302 MCQ** (`y7-hum-1..302`) across all 9 units — Deep Time 44,
  History Skills 22, Egypt 44, Greece 38, Rome 38, China 38,
  Geography Skills 22, Water 28, Liveability 28.
- **75 OOO** (`y7-hum-1..75`) and **75 TL** (`y7-tl-hum-1..75`,
  classId `y7-humanities`, subject history/geography per unit).
- Authored in unit-sized chunks against the `// Y7_HUM_MCQ_END`
  sentinel with a tsc after each (the anti-corruption pattern) — no
  repeat of the earlier mid-insert corruption.
- Full audit clean: MCQ 0 Tier-1 / 0 em-dash / 0 length>2.5x /
  0 duplicate stems, answer positions 76/76/75/75; OOO outliers
  19/19/19/18; TL one-false-statement verified, lie positions
  25/25/25, 0 absolute-language tells (fixed 19 "Only" MCQ
  distractors + 15 absolute-lie TL items during the audit).
- Verified live: full instrumented Quick Quiz playthrough at 15
  questions threw 0 errors; content spans all units (saw China,
  Geography Skills, Egypt items); tsc + build clean.

**Cross-era distractor style** worked well for a multi-topic class:
e.g. "Social order in ancient China was reinforced by: Confucius /
Julius Caesar / Herodotus / Ramses II" — plausible wrong answers
drawn from the other Ancient Worlds cultures. Reuse for other
survey-style classes.

**Still worth Jack's eye (non-blocking):** the misconceptions list
and the COMA/TEEAL/SPICESS/BOLTSS `[CONFIRM]` expansions in the
overview — a handful of items depend on them and are quick to fix if
any expansion is wrong. **Next class:** confirm the target with Jack
(likely another Y7–10 core once its materials are uploaded).

**Session handoff (2026-07-09, game removals + upload prep):**

- **Buzzer Round and Memory Sequence removed entirely** at Jack's
  direction (17 → 15 games). Components, module CSS, registry
  entries and games.ts entries deleted. No bank content lost:
  Buzzer shared MCQ_BANK with Quick Quiz (see §4.1 update), Memory
  Sequence's tiles were inline in the component. The Quick &
  Energetic anchored-content group is now 3 games. Old
  `/brain-breaks/buzzer-round` bookmarks fall back to the not-found
  placeholder. Verified live: landing shows "15 projector-ready
  games", Quick Quiz serves normally, type-check + build clean.
- **Upload prep** (earlier same day, also see inline updates in the
  2026-07-08 entry): OCR toolchain installed + full extraction
  pipeline verified end-to-end (pypdf / tesseract+PyMuPDF /
  python-docx); the 20 Y7–10 class folders scaffolded locally with
  `_overview.md` templates; `technology/` removal finalised.
- **Workflow agreed for the onboarding campaign**: Jack bulk-drops
  materials (only conversion rule: equation-bearing .docx → PDF);
  one class per session; Claude drafts the `_overview.md` from the
  materials and Jack reviews the misconceptions list; the FIRST
  class runs with a checkpoint after topic 1 to calibrate, then
  mega-batch for the rest.

**Earlier session handoff (2026-07-08, scope narrowed to Year 7–10):**
Decisions (Jack):

- **Brain-break scope is now Year 7–10 only** (was Foundation–Y10).
  20 classes in scope: Y7–10 English / Maths / Science / Humanities /
  Health & PE. Y10 Maths remains the only anchored one (1/20).
- **Arts, electives and languages are out of scope.** Their
  source-material folders were removed (tracked .gitkeeps deleted,
  .gitignore negations dropped). `technology/` kept — currently
  unused. _(Update 2026-07-09: Jack deleted `technology/` from disk
  too; removal finalised in git. Five subject folders remain, and
  the 20 Y7–10 class folders were scaffolded locally with
  `_overview.md` templates ahead of the bulk upload.)_
- Jack is about to upload teaching materials **in bulk** to the
  in-scope source-material folders for onboarding sessions.

Docs updated: README (scope bullets + stale VCE-era "AC V9
alignment" section rewritten as "Scope & class targeting" + known
gaps), source-material/README (six-folder catalog, Y7–10 drop
examples), **PROGRESS-LOG.md rebuilt as the per-class Y7–10
tracker** (materials → overview → anchored → audited, per class,
with commit refs), JACK-NOTES scope note.

**Record-keeping model** (clarified for Jack this session):
- `WORKLOG.md` — engineering log + dated session handoffs (this).
- `source-material/PROGRESS-LOG.md` — per-class content tracker.
- `anchored` flags in `classes.ts` — machine-readable truth.
- Git history — the diff-level record; hashes cited throughout.

**Pending decision (do NOT act without Jack):** code-level scope
reduction to match — F–2 / 3–6 year bands + classes + lp-/up-
generic bank items, and the elective / Chinese / French class
entries whose source folders no longer exist. Same shape as the VCE
reduction (`3cd12b7`); needs Jack's call on delete vs hide.

**Heads-up:** the onboard-class SKILL rewrite (running as a separate
task) was briefed with the older Foundation–Y10 scope — tighten to
Y7–10 when it lands.

**Update, later same session — UI scope audit + reduction shipped.**
Jack reported the class dropdown still offering out-of-scope classes
(screenshot: Y9 showing 11 electives + Chinese + French). Full audit
of user-facing surfaces ran; Jack's decisions on the four axes:

1. **F–2 / 3–6 bands + primary classes + all generic (lp-/up-)
   content STAY** — "the generic f-6 bands can stay", the Y7–10
   scope is about where content-development work happens, not about
   stripping the app's reach. Do NOT propose deleting these again.
2. **Elective + language class entries REMOVED** — 24 electives +
   8 Chinese/French cut from `HRS_CLASSES` (60 → 28 entries).
3. **`computing` subject REMOVED** — from the Subject union,
   SUBJECTS, SUBJECT_COLOURS, the Game interface union and 4 games'
   subject arrays; "VCE Computing" stale copy fixed in Quick Quiz +
   Buzzer Round descriptions. Bank prose mentioning "computing" as a
   word (3 items) untouched.
4. **Teacher Tools LEFT ALONE entirely** (Jack's call) — including
   the Question Generator's broken Y11/Y12 senior picker (see §7.2).

Verified live: Y9 class dropdown now shows 5 classes (English,
Maths, Science, Humanities, Health & PE); no "VCE Computing" text
anywhere; all six year bands still offered; type-check + build
clean. Regression-tested the persisted-selection path: a saved
removed classId (`y9-recreational-studies`) self-heals via the
SetupScreen defensive snap to the anchored default (Y10 Maths) —
no crash, storage rewritten.

**Earlier session handoff (2026-07-02, Mac migration — environment setup):**
One commit — this one. (The session started with no git at all; see
the update at the end of this entry.) Work completed:

- Confirmed the Windows→Mac migration state: this copy
  (`~/Desktop/hrs-teaching-tools-main`) is a GitHub ZIP download,
  not a clone. No `.git`, no history, no remote.
- Installed the toolchain: `npm install` (Node 26 / npm 11 already
  present) and `python3 -m pip install python-docx pypdf`
  (Python 3.14 already present). macOS note: the docs' commands are
  Windows-flavoured — use `python3` instead of `py`, ignore the
  winget lines.
- Added `.claude/launch.json` so Claude Code can drive the dev
  server for verification.
- Verified end-to-end: `npm run build` clean (tsc + Vite + PWA
  precache). Live-tested splash → landing → Quick Quiz: SetupScreen
  defaults to Year 10 Maths (HRS-ANCHORED ✓) and serves y10-math
  anchored content correctly.
- **Decision (Jack):** the old machine's `source-material/` contents
  are NOT being transferred — the completed subjects don't need
  them. The folder stays as empty scaffolding; future onboardings
  drop fresh materials and regenerate `_overview.md` templates via
  `python3 scaffold_overviews.py`.

**Update, later same session — git and the remote are fully
restored.** The repo is `jagaldevs/hrs-teaching-tools`, **private**
(which is why anonymous GitHub search couldn't find it; JACK-NOTES'
"repo is public" note was out of date and is now fixed). Recovery
path used: `gh auth login` (HTTPS) on the Mac, `git remote add
origin`, fetch, verify the ZIP tree matched `origin/main`
(`03d8056`) exactly, then re-commit this session's work as one
commit on top of the real history. All commit hashes cited in this
log resolve again.

Also this session: Windows-path staleness in JACK-NOTES / §5.7 /
§6 / README fixed. Discovered in passing: the onboard-class SKILL
still teaches the VCE-era workflow (`vce34()` helper, `unit: 3/4`
tagging, 200-MCQ batch-1 counts, "both anchored classes" = SD3-4 +
Sociology) — a staleness banner at the top of the SKILL now
redirects to the Y10 Maths precedent; a full rewrite is running as
its own task.

**Earlier session handoff (2026-06-03, scope reduction + migration prep):**
Three commits landed:

- `8b40dcc` Add JACK-NOTES.md — personal quick-reference for the
  project owner (project summary, file-location map, prep checklist,
  bootstrap message, conventions, pitfalls, audit commands). Lives in
  repo root so it travels across machines.
- `2e7ce40` Docs: add Development setup section to README. Covers
  toolchain (Node, Git, Python, python-docx, pypdf, optional Tesseract)
  for cloning onto a fresh machine and bootstrapping Claude Code.
- `3cd12b7` **Scope reduction**: removed VCE Units 1-2 and 3-4 entirely.
  Project scope is now Foundation – Year 10. Dropped 40 VCE classes
  from HRS_CLASSES, both VCE year bands, the `vce12()` / `vce34()`
  helpers, the `legacyUnits` field, ~330 lines of SENIOR_COMPUTING
  MCQs, ~315 lines of SENIOR_SOCIOLOGY MCQs, 150 SENIOR_*VCE OOO items,
  110 ss-tl-comp/ss-tl-soc TL items. Y10 Maths preserved (only
  anchored class now). `'computing'` Subject stays (used by y8-game-
  development and y9-codecraft electives). Type-check clean; verified
  live — Y10 Maths still serves correctly.

**Migration context.** The user is moving the project to a different
computer. The bootstrap and dev-setup docs are now in place so the
new device will be productive in 10–15 minutes after clone + npm
install + source-material transfer (gitignored, ~62 MB for Y10 Maths
alone). The `source-material/` content only needs to come over if
revisiting existing anchored work; new class onboardings just drop
fresh materials.

**Earlier session handoff (2026-06-03, Y10 Maths + SetupScreen UI):**
Major
session with both UI and content work. Commits landed:

- `cdde49f` SetupScreen: replace class chip grid with a dropdown.
  Native `<select>` with two `<optgroup>`s — anchored classes pinned
  to top, others in source order. Subject-colour dot tracks the
  current selection. Ships across all 17 games via shared GameShell.
- `733766d` SetupScreen: hide class picker on non-rapid games.
  Only the Quick & Energetic group (`group: 'rapid'`) has class-
  anchored banks. The class picker is now hidden for the other 13
  games (Word & Language, Number & Logic, HASS, Whole-Class) —
  those select on year band alone. SetupSelections still derives a
  valid `classId` internally so downstream callers stay well-formed.
- `642cce1` Year 10 Maths: flip class to `anchored: true`. Phase-0
  setup commit — switched from `y10()` helper to a literal HrsClass
  object (helpers don't take an `anchored` param yet per SKILL §4).
  Extracted all 31 .docx + 13 .pdf source files in
  `source-material/maths/year-10/` to plain text via python-docx +
  pypdf for grep-able access during authoring.
- `17ae225` Year 10 Maths: 452 anchored items (302 MCQ + 75 OOO +
  75 TL). First non-VCE class to be anchored. Authored from Jack's
  905-line `_overview(2).md` covering 9 topics, VC2M10 codes, 73
  listed misconceptions, and per-topic source-file inventory. ID
  prefix `y10-math-N` for MCQ/OOO, `y10-tl-math-N` for TL. No
  `unit` tag (per SKILL §6 Year 7-10). Notation: Unicode for
  symbols (², √, ÷, ×, π, −), ASCII slash for fractions — matches
  existing `ms-m-*` / `lp-m-*` items. Rigour audit ran all three
  SKILL §5g tiers: 2 Only/Just hits + 1 em-dash hit + 5 length-
  asymmetry hits all rewritten; 1 remaining 3.0× ratio on
  `y10-math-210` is a legitimate numerical median answer
  (8.5 vs 7/8/9). Verified live: Quick Quiz with Y10 Maths
  selected serves `y10-math-59` ("Simplify: x/4 + x/6") as Q1.

**Two follow-ups remain from §7.6:** audit of the ~1500 non-anchored
generic AC V9 MCQs (likely same anti-patterns at similar density),
and formal OOO + Two Truths audit. Both independent.

---

**Earlier session handoff (2026-06-03, SD3-4 textbook batch 2):**
Closed out queued follow-up #1 from the previous handoff. One commit:

- `93734a5` VCE Software Development 3-4: textbook-anchored MCQ
  batch 3 (+100). Items `ss-comp-201..300`, 25 per AOS, anchored to
  the OCR'd Cengage textbook. Specific case studies mined: WannaCry
  2017 (cryptoworm, NSA stockpile, March-patch vs May-attack,
  ~230k computers / 150 countries, 98% Win7/8), Apache Subversion
  (CollabNet 2000, top-level Apache, branches+tags, FreeBSD/GCC/
  SourceForge users), Adem's gym design brief (primary user = owner,
  three feasibility aspects), Jane the motivational-speaker persona,
  GitHub Copilot powered by OpenAI Codex, Essential Eight + ACSC/ASD
  publisher + maturity levels 0-3, six memory-safe languages
  (C#, Go, Java, Ruby, Rust, Swift). Rigour audit clean on all three
  tiers after one em-dash fix on `ss-comp-272`. Verified live in
  the QuickQuiz with VCE Software Development 3-4 selected — first
  round served `ss-comp-14` style anchored COMPUTING content
  correctly. SD3-4 now genuinely at the 450-item-and-rigorous
  standard, matching Sociology.

**Two follow-ups remain from §7.6:** audit of the ~1500 non-anchored
generic AC V9 MCQs (same anti-patterns at similar density likely),
and formal OOO + Two Truths audit. Both are independent — pick
either at the next session's start.

---

**Earlier session handoff (2026-06-03, rigour-audit session):**
Six commits landed:

- `ba3326f` Sociology textbook batch 2 (+100 items)
- `da761d2` WORKLOG + SKILL refresh after previous handoff
- `dceb249` → `051e129` Five-commit rigour audit: ~152 of 500
  anchored MCQs rewritten. Zero items remain at >2.5x length
  asymmetry. See §5.12 for full breakdown.
- `aa527c7` (also) installed Tesseract OCR + OCRed the 371MB scanned
  SD3-4 textbook into 24,368 lines of greppable text. See §5.11.
- `76c6529` Removed the redundant landing-page filter — Surprise Me
  still works, subhead now reads "Pick one — then choose your class
  on the next screen." See §5.13.

**Three follow-ups are queued (see §7.6):** SD3-4 textbook batch 2
(textbook now extracted, MCQs not yet written), audit of the ~1500
non-anchored MCQs, formal OOO + Two Truths audit. The next session
should ask Jack which to tackle first — these are all independent.

**The onboard-class skill** has been updated (§1a pypdf, §5f
textbook batch 2 pattern, §5g 6-point rigour checklist with grep
commands and length-asymmetry script). It is the source of truth
for any new class onboarding. Read it AND WORKLOG before starting.
