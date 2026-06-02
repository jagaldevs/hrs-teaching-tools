---
name: onboard-class
description: Use whenever the user wants to add a new HRS-anchored class to the Brain Breaks app and bring it from "generic AC V9 content" to a populated source-material/overview + a deep pool of class-specific brain-break questions. Triggers on phrasings like "do the same for VCE Methods 3-4", "onboard this subject", "anchor this class", "I uploaded the PDFs for X — same as software dev", "produce questions for Year 8 Science" and similar. Reads the study design (and optional exam) PDFs in the class's source-material folder, populates the _overview.md, flips the class to anchored in HRS_CLASSES, authors brain-break questions across the four Quick & Energetic games (~350 items by default: 200 MCQ + 75 OOO + 75 TL), type-checks, commits and pushes. Read WORKLOG.md first if cold-starting.
---

# Onboard a new HRS class — the SD3-4 playbook generalised

This skill captures the exact process used to onboard
**VCE Software Development 3-4** as the project's first anchored class
(see commits `b306dd8` through `224c32e` for the worked example).
Follow it for every subsequent class so authoring quality stays
consistent and we don't re-derive decisions.

**Read `WORKLOG.md` first** if you're cold-starting this session —
especially §3 (conventions), §5 (mistakes-not-to-repeat) and §6
(the recipe overview).

---

## Step 0 — Identify the target class precisely

VCE subject names can be ambiguous (e.g. "Applied Computing" at
Units 3-4 actually splits into Data Analytics 3-4 and Software
Development 3-4). Before touching anything:

1. **Confirm the exact class** with the user if there's any doubt.
   Cross-reference against `src/data/classes.ts` (HRS_CLASSES array)
   — every supported class is listed there with its `id`, `name`,
   `yearBand`, `subject` and `sourcePath`.
2. **Confirm the source folder**. It should match the class's
   `sourcePath`, e.g.
   `source-material/technology/software-development-3-4/`.
3. If the class isn't in `HRS_CLASSES` yet (rare — there are 114
   entries covering F-2 through VCE 3-4), add it before continuing.
   Use the existing `vce34('...')` / `y8('...')` etc. helper
   functions in classes.ts.

## Step 1 — Pre-flight on the source-material folder

```bash
ls -la "/c/Users/jack.galbraith/Code/hrs_teaching_tools/source-material/<area>/<class>/"
```

Identify what's there. Typical files:
- `<NameOf>StudyDesign.pdf` — **canonical**, always read first
- `<Subject> examination.pdf` — **canonical for question style**
  when available (VCAA writes the exam, so its question shape is
  exactly what the discipline tests)
- `<Textbook>.pdf` — usually large (100MB+). **Skip unless < 5MB.**
  Textbooks elaborate dot-points the study design already lists;
  reading them whole burns context for no benefit. Only dip into
  them if a specific bank item needs a fact the study design
  doesn't cover.
- `_overview.md` — the scaffolded template; we'll populate it.

If the textbook is larger than ~5MB, **do not** sequentially read
all pages. Use page ranges (e.g. `pages: "1-20"`) only if you
genuinely need a specific concept the study design doesn't cover.

## Step 2 — Read the source PDFs (small to large)

Order:
1. **Study design first** (always under 1MB). Establishes the
   examinable scope and key knowledge dot-points.
2. **Exam (if present)**. Critical for question style — VCAA exam
   questions ARE the gold standard for the discipline's question
   shape. Note named-character scenarios, distractor patterns,
   the difficulty calibration.
3. **Textbook only if needed**. Use page ranges.

After reading, you should have a clear mental model of:
- The unit / AOS structure
- Key knowledge dot points per AOS (these become bank items)
- Assessment mix (SACs / SAT / exam weightings)
- Specific terminology and Acts (Privacy Act 1988, Copyright Act
  1968, etc.)
- Common misconceptions (great MCQ distractors)

## Step 3 — Populate `_overview.md`

Use the SD3-4 overview as the template
(`source-material/technology/software-development-3-4/_overview.md`)
— same section structure:

- **Scope this year/unit** (1–2 sentences)
- **Topic sequence** with key concepts + vocabulary + VCAA reference
  pages, organised by Unit and AOS
- **Assessment style** table (SAC / SAT / exam contributions)
- **Depth expectations** (fluent recall vs recognise vs out-of-scope)
- **Common misconceptions** (these become MCQ distractors)
- **Notes for question generation** (tone, conventions, anchoring
  rules)

Write what the source material says. Don't pad with general
training-time knowledge — anchor everything to specific page
references when possible.

## Step 4 — Flip the class to `anchored` in `HRS_CLASSES`

Edit `src/data/classes.ts`. Find the class's entry (e.g.
`vce34('vce-methods-3-4', ...)`) and set the `anchored` flag.
For VCE 3-4 classes the helper already accepts an `anchored`
parameter:

```ts
vce34('vce-methods-3-4', 'VCE Mathematical Methods 3-4', 'maths', 'maths/methods-3-4', /* anchored */ true),
```

For other helpers (`f2`, `p36`, `y7`, etc.) that don't take
`anchored` yet, switch to a literal object so you can set the flag:

```ts
{ id: 'y8-science', yearBand: 'y8', name: 'Year 8 Science',
  subject: 'science', sourcePath: 'science/year-8',
  anchored: true, legacyStream: 'middle_school' },
```

The `anchored` flag drives:
- The ✓ badge on the landing-page class chip
- The SetupScreen's preference for picking this class as the
  default for any game that supports its subject
- The footer "Class-anchored at HRS" roll-call on the landing page

## Step 5 — Author the content (the ~350-item target)

Default distribution per class:

| Game(s) | Bank file | Count | Notes |
|---|---|---|---|
| Quick Quiz + Buzzer Round | `src/data/banks/mcq.ts` | **200** | Shared MCQ pool. Tag every item with `unit: 1/2/3/4` for VCE classes. |
| Odd One Out | `src/data/banks/oddOneOut.ts` | **75** | 4 items, 1 outlier, explanation. |
| Two Truths and a Lie | `src/data/banks/misc.ts` | **75** | Three statements, exactly one false. Tag each item with `subject` AND `classId`. |
| | | **350** total | |

### 5a. ID prefix convention

Each class gets a short, unique ID prefix used across all banks:

| Class | Prefix | Example |
|---|---|---|
| VCE Software Development 3-4 | `ss-comp` | `ss-comp-42`, `ss-tl-comp-15` |
| VCE Methods 3-4 (hypothetical) | `ss-meth` | `ss-meth-1`, `ss-tl-meth-1` |
| Year 8 Science (hypothetical) | `y8-sci` | `y8-sci-1`, `y8-tl-sci-1` |

For VCE 3-4 classes use the `ss-` prefix (senior). For year-level
classes use the year prefix (`y8-`, `y9-`, `f2-`, etc.).

Number sequentially. Always grep for collisions before
inserting:

```bash
grep -c "id: 'ss-comp-" src/data/banks/mcq.ts
```

### 5b. MCQ authoring (`mcq.ts`)

1. **Insert a new `SENIOR_<NAME>: MCQ[]` constant** in `mcq.ts`,
   just before `export const MCQ_BANK`. Match the structure of
   `SENIOR_COMPUTING`.

2. **Register it** under `MCQ_BANK.byClass['<class-id>']`:
   ```ts
   byClass: {
     'vce-software-development-3-4': SENIOR_COMPUTING,
     'vce-methods-3-4': SENIOR_METHODS,  // new entry
   },
   ```

3. **Distribute the 200 across the 4 AOSs** (50 per AOS for VCE).
   Author in two batches:
   - **Batch 1 (items 1–100): foundational recall**. Mirrors the
     SD3-4 batch 1 style — direct knowledge checks.
   - **Batch 2 (items 101–200): exam-style scenarios**. Named
     characters (Maya, Devon, Frank, Ana Lucia — pick names not
     used in batch 1 or other classes), application-focused
     stems, distractors drawn from real misconceptions in the
     `_overview.md` §"Common misconceptions" section.

4. **Tag every senior item with `unit: 1 | 2 | 3 | 4`** matching
   the class's `legacyUnits`. The SetupScreen no longer offers a
   unit chip strip — narrowing happens via `pickFromClass()`.

### 5c. Odd One Out authoring (`oddOneOut.ts`)

Same `SENIOR_<NAME>: OddItem[]` pattern. Each item:
```ts
{ id: '<prefix>-1', items: ['a', 'b', 'c', 'd'], outlier: 2,
  explanation: 'why c is the misfit.' },
```

75 items, mix across all AOSs. Patterns that work:
- 3 OOP principles + 1 control structure
- 3 control structures + 1 OOP concept
- 3 sort/search algos + 1 unrelated
- 3 file formats + 1 image format
- 3 backup types + 1 unrelated
- 3 design tools + 1 ideation tool
- 3 cyber threats + 1 control
- 3 Acts + 1 standard

### 5d. Two Truths and a Lie authoring (`misc.ts`)

Append to `TRUTHS.senior_school` array (or appropriate stream
for non-VCE classes). Each item:
```ts
{ id: 'ss-tl-<prefix>-1', subject: '<subject>',
  classId: '<class-id>', statements: ['T', 'T', 'F'], lie: 2,
  explanation: 'why the lie is false.' },
```

**Both `subject` AND `classId` are required** so the
TwoTruthsLie filter logic can pick them up correctly. See
WORKLOG.md §3.5.

Verify: every item has EXACTLY ONE confidently false
statement. The other two MUST be confidently true. Avoid
ambiguous "actually all three are true" items (this happened
in `ms-tl-5` and is the cause of WORKLOG §5.5).

### 5e. Style anchors (the exam-faithful pattern)

If a VCAA exam exists for the discipline, mine it explicitly
for question shape — see `WORKLOG §6` and the SD3-4 commit
`224c32e` for a worked list of style anchors per exam question.

For each new batch-2 item, ask: **could VCAA write this exact
question?** If not, refactor toward more scenario, named
characters, and application.

## Step 6 — Verify

```bash
# Type-check
npx.cmd tsc --noEmit; echo "EXIT=$?"

# Count items per bank
grep -c "id: '<prefix>-" src/data/banks/mcq.ts
grep -c "id: '<prefix>-" src/data/banks/oddOneOut.ts
grep -c "id: 'ss-tl-<prefix>-" src/data/banks/misc.ts
```

Expected output: tsc exit 0, counts matching the target
distribution.

For a richer verification, **drive the app** with the `run`
skill — start the dev server, navigate to a game, pick the
new class, hit Start, screenshot the first round. Confirms
the class shows the ✓ badge, that the SetupScreen narrows to
its supported bands, and that real anchored content surfaces.

## Step 7 — Commit and push

Use small, related commits — don't bundle UI changes with
content authoring. Suggested commit sequence:

```
1. <class-name>: populate _overview.md + flip anchored
   (small — overview + classes.ts edit)
2. <class-name>: author 200 MCQs for Quick Quiz + Buzzer Round
3. <class-name>: author 75 Odd One Out items
4. <class-name>: author 75 Two Truths and a Lie items
```

Or, if it fits cleanly, one bigger commit for the content:

```
<class-name>: 350 items anchored to <study design + exam if applicable>

(...body explaining distribution and source anchoring...)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

Push after each commit so the user can pull and verify
incrementally.

## Step 8 — Update WORKLOG.md if anything new came up

If you hit a new gotcha, conventions evolved, or you made an
architectural decision worth remembering, log it in
`WORKLOG.md`:

- **§3** if it's a new convention
- **§5** if it's a mistake we shouldn't repeat
- **§7** if it's an open question or deferred decision

Keep the log honest. Future you will read it cold.

---

## Variations by class type

### Primary classes (F-2, 3-6)

- **No** unit tag on MCQ items (`unit` field omitted).
- **No** SAC/SAT framing in the _overview.md. Use AC V9
  language: assignment / task / rubric.
- "Common misconceptions" tend to be cognitive
  (number bond errors, spelling rules) rather than content
  (legal Acts).
- Distribution can scale down (e.g. 150 MCQ / 50 OOO / 50 TL =
  250 total) since primary subjects have less depth per band.
  Discuss target with user before committing.

### Year 7–10 classes

- **No** unit tag (units are VCE-specific).
- AC V9 assessment framing in _overview.md: tests, assignments,
  rubrics.
- Use the year-specific prefix (`y8-sci-`, `y9-eng-`, etc.).
- Be careful with HASS — primary humanities is integrated, but
  Y7-10 splits into history / geography / economics. The class
  registry chooses one as the dominant subject for chip colour.

### VCE Units 1–2 (Y11) classes

- Tag MCQ items with `unit: 1` or `unit: 2`.
- **Assessment language**: "outcome assessment tasks" — NOT
  SACs (SACs are Units 3-4 only).
- No VCAA external exam to anchor against; use the study
  design as the canonical source.

### VCE Units 3–4 (Y12) classes

- Tag MCQ items with `unit: 3` or `unit: 4`.
- Assessment language: SACs (worth 10% each per outcome) + SAT
  (30% across both units) + end-of-year exam (50%).
- Look for a VCAA exam PDF in the source-material folder. If
  present, mine it for question shape per §5e.
- This is the most natural class type for the full 350-item
  distribution.

---

## Common gotchas (read before authoring)

1. **PWA service worker.** After authoring, the user's browser
   may serve a cached old bundle. Tell them to hard-refresh
   (Ctrl+Shift+R) or use DevTools → Application → Clear site
   data. See WORKLOG §5.6. `vite.config.ts` is already
   hardened (commit `b2ce129`) but cached bundles persist.

2. **Read-before-edit.** The Edit tool requires a prior Read
   on the same file in the same session. Grep doesn't count.
   When batch-editing, Read each file explicitly first.
   WORKLOG §5.4.

3. **One confidently false statement per Two Truths item.**
   Two-truths-and-also-true items break the game. WORKLOG §5.5.

4. **Subject taxonomy stays in sync.** If you ever need to
   ADD a subject (e.g. introducing 'languages' as a new
   Subject), three files must change together:
   `src/games/types.ts`, `src/pages/BrainBreaks.tsx`, and
   `src/data/games.ts`. WORKLOG §3.1.

5. **The textbook is usually huge.** Don't read it
   sequentially. See Step 1 above. WORKLOG §5.3.

6. **Working directory.** First action of any fresh session:
   `pwd` + `ls`. If the folder is suspiciously empty, the real
   project is at `C:\Users\jack.galbraith\Code\hrs_teaching_tools`.
   The `Desktop\hrs_teaching_tools` folder is empty save for
   `.claude/`. WORKLOG §5.7.

7. **`gameId` on SetupScreen.** Every game's `<SetupScreen>`
   call passes `gameId="<game-id>"` so the picker restricts to
   bands the game supports. This is already wired for every
   game; only relevant if a NEW game is added. WORKLOG §3.6.

---

## Quick reference — file map for class onboarding

| Edit | Why |
|---|---|
| `source-material/<area>/<class>/_overview.md` | Fill in from PDFs |
| `src/data/classes.ts` | Flip `anchored: true` |
| `src/data/banks/mcq.ts` | Add `SENIOR_<NAME>` const + register under `byClass` |
| `src/data/banks/oddOneOut.ts` | Same pattern |
| `src/data/banks/misc.ts` | Append to `TRUTHS.<stream>` with `classId` |
| `WORKLOG.md` | Update if new conventions / gotchas emerged |

## Reference — the SD3-4 worked example

Commits in chronological order:
- `4b639ab` — initial 250 questions + `'computing'` subject
- `b306dd8` — class registry (P1)
- `f9fe8b5` — `Bank.byClass` + migration (P2)
- `c95ff68` — landing rework (P3)
- `6f338bc` — SetupScreen rework + legacy migration (P4+P5)
- `5b93fc6` — WORKLOG / PLAN sweep (P6)
- `9384878` — landing→game class carryover
- `b2ce129` — PWA cache hardening
- `224c32e` — +100 exam-style MCQs

Anything in the SD3-4 process not captured above is in those
commit messages or in `WORKLOG.md`. When in doubt, mirror what
worked there.
