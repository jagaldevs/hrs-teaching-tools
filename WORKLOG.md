# Work Log

A living record of decisions, conventions and mistakes-not-to-repeat for
the HRS Brain Breaks codebase. **Read this before you start changing
filter logic, banks, or the SetupScreen.** Update it when you make a
decision worth remembering.

---

## 1. Project orientation (the 30-second version)

- React 18 + Vite + TypeScript PWA, dark-first, offline-capable.
- Two products in one app:
  - **Brain Breaks** (headline, at `/`) — 17 projector-ready games.
  - **Teacher Tools** (secondary, at `/tools`) — 25 classroom utilities.
- Content is **all in `src/data/banks/`**, never fetched. Each game
  pulls from one or more banks.
- Source material (HRS PDFs, study designs, term planners) lives in
  `source-material/` — **gitignored** except for the README and
  PROGRESS-LOG. Never paste verbatim source material into bank files.
- The end-game is that every HRS class has a populated `_overview.md`
  and a corresponding chunk of class-specific brain-break content.
  We are currently 1/100ish of the way there (VCE Software Dev 3-4
  done; everything else still on generic AC V9 training-knowledge).

## 2. Where things live

| Path | What |
|---|---|
| `src/data/games.ts` | Game catalogue (id, name, group, streams, subjects, durationMin). Single source of truth for what each game declares. |
| `src/data/banks/mcq.ts` | MCQ items. Powers Quick Quiz **and** Buzzer Round. |
| `src/data/banks/oddOneOut.ts` | Odd-One-Out items. |
| `src/data/banks/misc.ts` | Estimate It + Two Truths and a Lie + Synonym/Antonym + Would You Rather. Mixed bag because they're all smaller-format. |
| `src/data/banks/words.ts`, `sentences.ts`, `stories.ts`, `hass.ts`, `sightWords.ts` | Other specialised banks. |
| `src/games/types.ts` | `Subject` union, `SUBJECTS` list, `SUBJECT_COLOURS`, `Bank<Q>`, `MCQ`, `OddItem`. |
| `src/games/GameShell.tsx` | `<GameShell>` wrapper + `<SetupScreen>` (the stream/subject/count picker). |
| `src/games/bankUtils.ts` | `pickFromBank()` (filters stream/subject) and `unitFilterFor()` (filters by senior unit group). |
| `src/games/<Game>.tsx` | Each game file. |
| `src/pages/BrainBreaks.tsx` | The landing page with the filter chip strip. **Has its own `Subject` union and SUBJECTS list — keep them in sync with `types.ts`.** |
| `scaffold_overviews.py` | One-off script that drops `_overview.md` templates into every leaf folder under `source-material/`. |
| `source-material/` | Gitignored. HRS-specific content. Hierarchy: subject → year/unit → `_overview.md` + optional PDFs. |

## 3. Conventions

### 3.1 Subject taxonomy

Defined in three places that must stay in sync:

1. `src/games/types.ts` — `Subject` union, `SUBJECTS` list, `SUBJECT_COLOURS`.
2. `src/pages/BrainBreaks.tsx` — local `Subject` union + `SUBJECTS` list (used by the landing-page filter chips).
3. `src/data/games.ts` — `Game.subjects` union in the `Game` interface, and each game's `subjects: [...]` array.

Current subjects + colours:

| Subject | Colour | Used in |
|---|---|---|
| english | `#E6007E` (HRS pink) | English-stream games |
| maths | `#0EA5E9` (sky blue) | Maths games |
| history | `#F59E0B` (amber) | HASS games |
| geography | `#10B981` (emerald) | HASS games |
| science | `#A855F7` (violet) | Science games |
| computing | `#14B8A6` (teal) | VCE Software Dev 3-4 (added Jun 2026) |
| general | `#6B7280` (slate) | Whole-class items with no subject home |

### 3.2 Class taxonomy (current model)

The project switched from AC V9 streams to per-HRS-class targeting
on 2026-06-02 (commits b306dd8 → 6f338bc). See `src/data/classes.ts`.

- **Year bands** (`YearBand`): `f-2 | 3-6 | y7 | y8 | y9 | y10 | vce-1-2 | vce-3-4`.
- **HRS classes** (`HRS_CLASSES`): 114 entries, one per leaf under
  `source-material/`. Each carries id, name, subject, sourcePath,
  optional `anchored` flag, `legacyStream` (for backfill), and
  `legacyUnits` (for VCE classes — narrows the MCQ legacy pool to
  the right unit tags).
- The **legacy `Stream` type** still exists on `Game.streams` and
  inside `Bank.byStreamSubject` for backfill — it's not user-facing.

User-facing pickers (landing page + SetupScreen):
- **Year band** (single-select on SetupScreen, multi-select on landing)
- **Class** (single-select on SetupScreen, multi-select on landing)
- The Subject chip strip is gone — class implicitly carries subject.

### 3.3 Senior unit tagging (still relevant)

MCQ items can carry `unit: 1 | 2 | 3 | 4`. The narrowing now happens
implicitly via the `HrsClass.legacyUnits` field — when a teacher
picks a `vce-3-4` class, `pickFromClass` filters legacy backfill to
items with `unit: 3` or `4`. The "Senior cohort" chip strip on
SetupScreen is gone (`showSeniorUnits` prop removed).

### 3.4 ID naming for bank items

Existing convention (don't fight it without reason):

- Stream prefix: `lp` / `up` / `ms` / `ss`
- Subject letter: `e`/`m`/`h`/`g`/`s` (or full word for new subjects, e.g. `comp`)
- Game prefix where the bank is multi-game: `tl` (truths-lie), `est` (estimate), `sa` (syn-ant), `wyr` (would-you-rather)
- Sequential number

Examples in the wild:
- `lp-e-7` — Lower Primary English MCQ #7
- `ss-comp-42` — Senior Computing MCQ #42 (added Jun 2026)
- `ms-tl-3` — Middle School Truths-Lie item #3
- `ss-tl-comp-15` — Senior Truths-Lie item, computing-flavoured, #15

When you add a new class-specific batch, **use a discriminator in the
id** (like `comp-`) so they're easy to grep and update later.

### 3.5 Bank entry shapes

```ts
// MCQ (mcq.ts) — serves Quick Quiz, Buzzer Round, Question Generator
{ id, q, choices: [4], answer: 0..3, explanation, acCode?, unit?: 1|2|3|4 }

// OddItem (oddOneOut.ts)
{ id, items: [4], outlier: 0..3, explanation, acCode? }

// TruthsLieItem (misc.ts) — Two Truths and a Lie
{ id, statements: [3], lie: 0|1|2, explanation, subject?: Subject, classId?: string }
```

Bank<Q> has two indices:
- `byStreamSubject` — legacy AC V9 pool (used as backfill).
- `byClass` — HRS-anchored content keyed by `HrsClass.id`. Preferred
  source when the user picks a specific class.

`pickFromClass(bank, classId, count)` is the canonical lookup — it
pulls anchored items first, tops up from legacy via the class's
`legacyStream` + `subject` + `legacyUnits`.

`TruthsLieItem` carries the class tag on the item itself (rather
than living in `Bank.byClass`) because TRUTHS is a
`Record<Stream, TruthsLieItem[]>`. The TwoTruthsLie game filters
items by `classId` at start-time.

### 3.6 SetupScreen prop wiring

Every game's `<SetupScreen>` call **must pass `gameId={"..."}`** so
the year-band picker narrows to the bands the game supports (via
`Game.streams` → year-band mapping). Forgetting this prop falls back
to all 8 bands and all 114 classes.

`SetupSelections` is `{ classId, stream, count }` — `stream` is a
derived convenience field (from `findClass(classId).legacyStream`).
Games that only ever needed `sel.stream` keep working unchanged.

Removed props (don't pass these — they're gone):
- `showSubject` — there's no Subject row any more
- `showSeniorUnits` — Senior cohort is folded into year band

### 3.7 Commit messages

- Subject line ≤72 chars, imperative ("Add X", "Fix Y", not "Adding X").
- Body explains **why**, not just what — especially for behavioural changes.
- Always include `Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>` when Claude wrote the code.

### 3.8 Markdown template strings

`scaffold_overviews.py` uses an en-dash (`–`) in headings. The print
statement uses `->` (ASCII) to avoid Windows console
`UnicodeEncodeError`. **Keep file content as en-dash; keep terminal
output as ASCII.**

## 4. Architectural decisions worth remembering

### 4.1 Why MCQ_BANK serves both Quick Quiz and Buzzer Round

Same content shape (4-choice question + correct answer + explanation),
same filtering (stream + subject + senior unit), different presentation
(self-paced vs team buzzer). Splitting the bank would double the
maintenance burden for the same items. If you ever need
buzzer-specific items, add a `buzzerOnly?: boolean` tag rather than
forking the bank.

### 4.2 Why TruthsLieItem has `subject` as a property, but MCQ doesn't

The TRUTHS export is `Record<Stream, TruthsLieItem[]>` — keyed only
by stream. Adding subject filtering meant tagging items individually
rather than restructuring the whole bank into `Record<Stream, Record<Subject, []>>`.
The structural approach (used by `MCQ_BANK` and `ODD_BANK`) is
cleaner long-term — consider migrating TRUTHS if class-specific
filtering grows.

### 4.3 Why the silent fallback in `pickFromBank` exists

When a teacher selects English at a stream that has no English items,
`pickFromBank` falls back to "mix" so the start button doesn't silently
do nothing. Good UX for the "mix" path. **Bad UX when the user
specifically wanted a subject and got something else** — see §5.2.

### 4.4 Why we read the VCAA study design instead of the textbook

The 371MB Software Development textbook PDF (`Software Development VCE
Units 3&4 2025.pdf`) was skipped during the SD3-4 question authoring.
The 800KB study design alone is canonical and exhaustive for the
examinable scope; the textbook just elaborates with examples. For
brain-break-level questions (recall + recognition), the study design
is enough. **Only reach for the textbook when a specific item needs
elaboration the study design doesn't cover.**

### 4.5 Why `gameId` instead of a per-game `availableStreams` prop

Each game already declares its supported streams + subjects in
`games.ts`. Duplicating them in the SetupScreen call sites would
create two sources of truth that drift. `gameId` lets SetupScreen
look up the canonical definition from the registry.

### 4.6 Why we removed games (Higher or Lower, Spelling Bee, Categories, Equation Match, Map Pin, Landmark Snap)

All six were removed in 2026 based on teacher feedback at HRS. Some
were confusing (Higher or Lower converted out-of-context metrics);
some needed engines we didn't have (Map Pin's SVG renderer); some
relied on assets we couldn't source (Landmark Snap's photo bank).
**Do not re-add these without checking with Jack first.**

## 5. Mistakes we made — don't repeat

### 5.1 Forgetting to pass `gameId` to SetupScreen (Jun 2026)

**Symptom:** Two Truths and a Lie showed Lower Primary content
(`lp-tl-5`: "Kangaroos hop / Snowmen / Rain is made of milk") when
the teacher had selected the Computing filter and clicked into the
game.

**Cause:** `<SetupScreen>` defaulted `availableStreams` to all four
streams regardless of what the game declared in `games.ts`. Persisted
state from a previous session (or just the default first option)
served Lower Primary. With no Computing-tagged items at Lower Primary
and a silent fallback, the game served all the Lower Primary truths.

**Fix:** Added `gameId` prop to SetupScreen that pulls streams +
subjects from the game registry. Wired it on all 16 game call sites.

**Lesson:** When you add a new game OR a new subject, double-check
that:
1. The Game entry in `games.ts` lists every applicable stream + subject.
2. The SetupScreen call passes `gameId="..."`.
3. The bank actually contains items for every (stream × subject) combo the Game declares.

### 5.2 Silent fallback hiding wrong-content surprises (Jun 2026)

**Symptom:** Same as 5.1 — user picked Computing, got Lower Primary
animal trivia.

**Cause:** Both `pickFromBank` (for MCQ/Odd) and the inline filter in
TwoTruthsLie used a "fall back to the unfiltered pool if subject yields
zero" pattern. Friendly for "mix" but misleading for specific picks.

**Fix:** TwoTruthsLie now refuses to start and shows a `startError`
when a specific subject yields zero items (matching QuickQuiz's
pattern). `pickFromBank` still has the silent fallback — that's
acceptable for Quick Quiz / Buzzer Round / Odd One Out because
QuickQuiz already surfaces an empty pool as an error.

**Lesson:** **Silent fallbacks should only kick in for "mix" selections.**
For specific subject picks, surface the empty state explicitly.

### 5.3 The textbook PDF is 371MB (Jun 2026)

**Symptom:** Almost tried to read it page-by-page.

**Cause:** No size sanity check before opening a source-material PDF.

**Lesson:** Run `ls -la` on the source-material folder first. Anything
over ~5MB probably needs the study design first, with the textbook as
a fallback for specific gaps. Reading large PDFs sequentially burns
context for no benefit when the study design is canonical anyway.

### 5.4 Editing a file without reading it first (Jun 2026)

**Symptom:** Repeated `InputValidationError`-style errors when sending
a batch of 13 Edits across game files. Only the files I'd Read in the
same session went through.

**Cause:** Grep doesn't count as a Read for the Edit tool's tracking.

**Lesson:** Either Read each file before editing, or batch Reads
explicitly in the same message as the Edits. Don't rely on Grep to
satisfy the Read prerequisite.

### 5.5 Ambiguous Two Truths item in the original middle-school batch

**Symptom:** `ms-tl-5` has a comment in the code noting "all three are
true — replace when authoring further".

**Cause:** Authoring drift — the "Cleopatra closer to Moon landing than
Pyramid" gotcha is true, making it not a lie at all.

**Lesson:** Every TruthsLieItem needs **exactly one** confidently
false statement. Verify each one before committing. Two-and-a-Truth
or All-Three-True items break the game.

### 5.6 Class-filter rework: PWA cache made the previous fix appear broken (Jun 2026)

**Symptom:** After commit 9a9fec9 ("SetupScreen: derive streams +
subjects from game registry"), Jack screenshotted Two Truths still
showing Lower Primary chips with full bell. The code on main was
correct.

**Cause:** Vite PWA service worker served the previously-cached
bundle. Hard-refresh / SW unregister required to see the new code.

**Lesson:** When confirming a UI change, always check whether the
running bundle is the latest. Tell the user how to bypass the SW:
hard-refresh (Ctrl+Shift+R), DevTools → Application → Service
Workers → Unregister, or open in incognito. The fix isn't "do the
change again differently" — it's "force the browser to load the
new bundle".

### 5.8 The "skip textbooks >5MB" rule has a nuance (Jun 2026)

**Symptom:** During VCE Sociology 3-4 onboarding, I skipped the 19MB
textbook per Step 1 of the onboard-class skill ("Skip unless < 5MB").
Jack asked "did you use the textbook at all?" — I had to admit no.
The first 200-item batch was anchored only to the study design + two
exams, and missed specific case-study detail (K'gari, Australian
Men's Shed, Keysborough CFA, Sunrise Movement) that the textbook
elaborates richly.

**Cause:** The size rule treats "can't be cleanly Read" as "shouldn't
be consulted at all". For revision-style brain-break content, the
study design IS canonical for scope; the textbook adds named case
studies that make MCQ stems vivid and exam-faithful. Worth the cost.

**Fix:** Used `py -m pip install pypdf` then a one-liner to extract
the whole PDF to a `textbook-extracted.txt` file in the same folder
(gitignored). After that, Grep + targeted Reads gave fast access to
exactly the sections needed (revision questions per AOS, then the
named case studies). Authored a second batch of 100 MCQs anchored to
that specific detail, bringing Sociology to 450 items total.

**Lesson:** If a textbook PDF is too big for Read, **don't skip it —
extract it**. The pypdf workaround:

```powershell
py -c "import pypdf; r = pypdf.PdfReader(r'<path>.pdf'); open(r'<same-folder>\textbook-extracted.txt','w',encoding='utf-8').write('\n'.join(f'=== PAGE {i+1} ===\n' + p.extract_text() for i,p in enumerate(r.pages)))"
```

Then Grep the extracted text for terms, Read the matching offsets.
The skill's Step 1 now points at this workaround.

### 5.9 Class onboarding "second batch" is now a deliberate pattern (Jun 2026)

**What:** The full anchored class pool is now:
- Batch 1: 200 MCQ from study design + exams (study-design-faithful)
- Batch 2: 100 MCQ from textbook case studies (case-study-anchored)
- 75 OOO + 75 TL alongside
- Total: **450 items per anchored class**

SD3-4 and Sociology 3-4 are both at this distribution. Use it as the
default for future VCE 3-4 classes — see SKILL §5b for the workflow.

### 5.7 Lost the working directory between sessions

**Symptom:** Tried to work from `C:\Users\jack.galbraith\OneDrive –
Haileybury\Desktop\hrs_teaching_tools` (only contains .claude/) instead
of `C:\Users\jack.galbraith\Code\hrs_teaching_tools` (the actual repo).

**Cause:** Stale CWD assumption.

**Lesson:** First action of any fresh session: `pwd` + `ls`. If the
folder is suspiciously empty, the real project is at
`C:\Users\jack.galbraith\Code\hrs_teaching_tools`.

## 6. Recipe: adding a new HRS-class subject end-to-end

> **There is a project skill for this.** Read
> `.claude/skills/onboard-class/SKILL.md` first — it captures the
> SD3-4 playbook in full and triggers automatically when the user
> asks to onboard a new class. The summary below is a quick
> pointer; the skill is the source of truth.

(Tested against the VCE Software Development 3-4 rollout, Jun 2026.)

### Step 1: Decide the subject id and surface

- Pick a short, lowercase id (`computing`, `methods`, `biology`).
- Pick a colour from the Tailwind 500 range that doesn't clash with existing chips.

### Step 2: Wire the subject into the type system

1. `src/games/types.ts`:
   - Add to `Subject` union.
   - Add to `SUBJECTS` list (label).
   - Add to `SUBJECT_COLOURS`.
2. `src/pages/BrainBreaks.tsx`:
   - Add to local `Subject` union.
   - Add to local `SUBJECTS` list (with colour).
3. `src/data/games.ts`:
   - Add to `Game.subjects` union in the `Game` interface.
   - Add the new subject to the `subjects: [...]` array of every game that should serve it. Be conservative — only games whose banks will actually contain items for this subject at this stream.

### Step 3: Drop source material

1. Put PDFs in `source-material/<area>/<class>/`.
2. Run `py scaffold_overviews.py` if the folder doesn't have an `_overview.md` yet.
3. Open the `_overview.md` and fill it in from the source PDFs. The
   overview drives all subsequent content authoring — invest here.

### Step 4: Author the content

For each game type:

- **Quick Quiz + Buzzer Round** (`mcq.ts`): add a `SENIOR_<NAME>: MCQ[] = [...]` constant; register it in `MCQ_BANK.byStreamSubject.<stream>.<subject>`.
- **Odd One Out** (`oddOneOut.ts`): same pattern, `ODD_BANK`.
- **Two Truths** (`misc.ts`): append to `TRUTHS.<stream>` array, each item tagged with `subject: '<your-subject>'`.

Tag every item with the appropriate `unit: 1|2|3|4` if it's a senior VCE item.

### Step 5: Verify

```powershell
npx tsc --noEmit
grep -c "id: '<your-id-prefix>" src/data/banks/mcq.ts src/data/banks/oddOneOut.ts
```

### Step 6: Commit + push

One commit for type/UI wiring + first batch of content. Use the
template from §3.7.

### Step 7: Update this worklog

If you hit something new or surprising, document it in §5.

## 7. Open questions / deferred decisions

### ~~7.1 The big one: stream taxonomy is too coarse~~ ✅ RESOLVED 2026-06-02

Resolved by the class-filter rework (`PLAN-CLASS-FILTER.md` →
commits b306dd8 through 6f338bc). The four AC V9 streams are gone
from user-facing UI; `src/data/classes.ts` is the single source of
truth with 114 HRS classes. See §3.2 for the current model.

### 7.2 Question Generator still uses the legacy stream/subject UI

`src/tools/rng/QuestionGenerator.tsx` (a Teacher Tool, not a Brain
Break game) still renders Stream + Subject + Unit-group pickers and
calls `pickFromBank` directly. It works because the legacy
`byStreamSubject` index is still populated for generic content,
but it doesn't know about the new `byClass` index — so the 250
SD3-4 items are invisible to it. Migrate to `pickFromClass` and
a year-band + class UI when it next needs a touch.

### 7.3 Many class folders still have empty `_overview.md`s

114 classes × 1 overview each = 114 overview files. Currently 1 is
filled in (vce-software-development-3-4). The other 113 still
contain the template. Per-class authoring is the long-term work —
see §6 recipe.

### 7.4 Next class to onboard

Two classes are now HRS-anchored at the full 450-item distribution:
- VCE Software Development 3-4 (350 items + 100 exam-style batch 2 = 450)
- VCE Sociology 3-4 (200 + 100 textbook + 75 OOO + 75 TL = 450)

The other 112 entries in `HRS_CLASSES` still rely on generic AC V9
backfill. **No specific class is queued next** — confirm the target
with Jack at the start of any new onboarding session. Likely
candidates based on what teaching staff have asked for so far: other
VCE 3-4 classes (Methods, Biology, English), or the Y9 electives
that have study material in `source-material/`.

### 7.5 Source material progress log

`source-material/PROGRESS-LOG.md` was set up to track which subjects
have been HRS-anchored. It still uses the old "SAC-anchored" status
label and is missing rows for the primary humanities + primary science
splits that were added Jun 2026. Update before next subject onboarding.
The new way to track anchoring is the `anchored: true` flag in
`HRS_CLASSES` — could be auto-generated from that going forward.

---

_Last updated: 2026-06-02 by Claude (Opus 4.7) at the end of the VCE
Sociology 3-4 rollout (450 items). Append, don't overwrite — and date
new entries so future readers know what's fresh._

**Session handoff (2026-06-02, end of context):** Both anchored
classes are at 450 items. The onboard-class skill is the source of
truth for adding the next one — it has been refreshed with the pypdf
workaround and the 200+100+75+75 distribution. The next session
should start by asking Jack which class to onboard next (see §7.4).
