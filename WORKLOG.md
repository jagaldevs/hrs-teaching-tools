# Work Log

A living record of decisions, conventions and mistakes-not-to-repeat for
the HRS Brain Breaks codebase. **Read this before you start changing
filter logic, banks, or the SetupScreen.** Update it when you make a
decision worth remembering.

---

## 1. Project orientation (the 30-second version)

- React 18 + Vite + TypeScript PWA, dark-first, offline-capable.
- Two products in one app:
  - **Brain Breaks** (headline, at `/`) — 15 projector-ready games.
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
| `src/data/banks/mcq.ts` | MCQ items. Powers Quick Quiz (and the Question Generator tool). |
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
- Always include a `Co-Authored-By: Claude <model> <noreply@anthropic.com>`
  trailer naming whichever Claude model wrote the code (Opus 4.7
  historically; Fable 5 as of Jul 2026).

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

**Update 2026-07-09:** Buzzer Round was removed at Jack's direction
(see §4.6). No content was lost — the bank now powers Quick Quiz and
the Question Generator tool, and the shared-bank rationale stands
for any future MCQ-driven game.

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

**Update 2026-07-09: Buzzer Round and Memory Sequence also removed**
at Jack's direction (17 → 15 games). Buzzer Round cost no content —
it shared MCQ_BANK with Quick Quiz. Memory Sequence was fully
self-contained (inline TILES). The Quick & Energetic group is now
three games (Quick Quiz, Odd One Out, Two Truths and a Lie). Same
rule applies: do not re-add without Jack.

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

### 5.10 The "obvious-answer" anti-pattern audit (Jun 2026)

**Symptom:** Jack asked "I'm concerned about the rigour... many
answers are just obvious." Audit found ~60+ items across Sociology
AND SD3-4 with one or more obvious-answer tells.

**Root anti-patterns:**
1. **"Only X" distractors** — the correct option was always the
   non-"Only" one (e.g. ss-comp-45's "Only the user interface"
   alongside the only comprehensive option)
2. **Em-dash explanations on the correct option only** — the right
   answer carried " — explanation" that distractors did not
   (rampant in the Sunrise textbook-anchored batch)
3. **Joke distractors** — e.g. ss-soc-291 originally had
   "Coca-Cola and Pepsi" as a Sunrise-funder distractor; ss-comp-51
   had "Programmer jokes" as a data-dictionary contents distractor
4. **Telegraphed stems** — "as the textbook quotes:" with only one
   quoted option (ss-soc-290)

**Fix:** Established a 6-point rigour checklist in SKILL §5g. Did
two rewrite passes:
- Sociology: 44 items rewritten (commit `dceb249`)
- SD3-4: ~13 worst offenders rewritten (commit pending)

**Lesson:** Apply the checklist on the way IN. The grep commands
in SKILL §5g (looking for `'Only `, `'Just `, em-dash patterns)
find most failures in seconds. Don't ship a batch without running
them.

### 5.11 OCR workflow for scanned textbooks (Jun 2026)

**Symptom:** The SD3-4 "textbook" PDF is 371MB and pypdf extracted
zero text from any page. Turned out to be an image-only scanned PDF.
Tried Read tool — refused (100MB limit, file is 371MB).

**Fix:** Installed the OCR toolchain via:
```powershell
winget install -e --id UB-Mannheim.TesseractOCR --silent
py -m pip install pytesseract PyMuPDF --quiet
```

Tesseract installs to `%LOCALAPPDATA%\Programs\Tesseract-OCR\` — no
admin/UAC needed for the UB-Mannheim build. PyMuPDF (fitz) handles
PDF rasterisation without needing Poppler.

OCR script (using fitz + pytesseract at 200 DPI):

```python
import fitz, pytesseract, io
from PIL import Image
pytesseract.pytesseract.tesseract_cmd = r'%LOCALAPPDATA%\Programs\Tesseract-OCR\tesseract.exe'
doc = fitz.open('input.pdf')
with open('textbook-extracted.txt', 'w', encoding='utf-8') as f:
    for i, page in enumerate(doc):
        pix = page.get_pixmap(dpi=200)
        img = Image.open(io.BytesIO(pix.tobytes('png')))
        f.write(f'=== PAGE {i+1} ===\n{pytesseract.image_to_string(img, lang="eng")}\n')
```

Performance: ~3-5 sec per page on this machine (334 pages → ~25 min).
Quality: clean prose; tables and code blocks get some OCR noise but
remain Greppable. Output for SD3-4: 24,368 lines from 334 pages.

**Lesson:** Before assuming a textbook is unreadable, check whether
it's image-only or text-embedded. The pypdf one-liner from §5.8 is
fast; if it produces empty pages, switch to the OCR pipeline above.

### 5.12 The 5-commit rigour audit (Jun 3 2026)

**Symptom:** Jack pushed back on bank quality with "many answers are
just obvious" and asked for a full rigour pass. §5.10 captured the
first two commits (57 items). This entry covers the full picture
after the complete audit landed.

**Anti-patterns swept for (full list):**
1. `'Only X'` / `'Just X'` distractors (the "rule out the verbose
   short option" tell)
2. Em-dash explanations exclusively on the correct option
3. Joke distractors (Coca-Cola as a Sunrise funder, "Stock market
   trading" as a Sunrise School subject, "Programmer jokes" as data
   dictionary contents)
4. Telegraphed stems ("as the textbook quotes:" with only one
   quoted option)
5. **Length asymmetry — correct option more than 2.5x the longest
   distractor.** This is the one easy greps don't find; needs a
   script.

**Quantification script (lives nowhere — re-run as needed):**

```python
import re
with open('src/data/banks/mcq.ts', 'r', encoding='utf-8') as f:
    src = f.read()
pat = re.compile(r"\{ id: '(ss-(?:soc|comp)-\d+)', q: '[^']+', choices: \[((?:'[^']+', ?){3}'[^']+')\], answer: (\d)")
for m in pat.finditer(src):
    id_, choices_str, ans = m.group(1), m.group(2), int(m.group(3))
    choices = re.findall(r"'([^']+)'", choices_str)
    if len(choices) != 4: continue
    correct = choices[ans]
    wrong_max = max(len(c) for i, c in enumerate(choices) if i != ans)
    ratio = len(correct) / max(wrong_max, 1)
    if ratio > 2.5:
        print(f'{id_}: {ratio:.1f}x ({len(correct)}c vs {wrong_max}c)')
```

**Commits (6 total this session):**
- `ba3326f` — Sociology textbook batch 2 (+100 items)
- `da761d2` — WORKLOG + SKILL refresh
- `dceb249` — Sociology rigour pass #1 (44 items, "Only X" + em-dash)
- `aa527c7` — SD3-4 rigour pass #1 (13 items, joke distractors)
- `cb97519` — Cross-cutting pass (23 items, mixed)
- `69ef07d`, `fc4c553`, `051e129` — Length-asymmetry passes (72 items
  across three commits, all >2.5x violations)
- `76c6529` — Landing filter removal

**Total rewritten this session: ~152 of 500 anchored MCQs.**

**Final audit state (post commit `051e129`):**
- 0 items at >3.0x length asymmetry
- 0 items at >2.5x length asymmetry
- 5 remaining `'Only X'` hits, all manually verified as legitimate
  technical claims (e.g. `'Only the class that declares it'` IS
  the correct answer for `private` access modifier)
- ~120 items at 1.5–2.5x soft asymmetry remain. Not telegraphing
  (distractors are plausible misconceptions) but technically still
  visible to a length-counting student. Acceptable.

**Lesson:** Three-tier audit discipline. (1) Grep for `'Only ` and
`'Just ` distractors. (2) Grep for em-dash patterns in choices.
(3) Run the Python length-asymmetry script above. The first two
catch ~30% of failures fast; the script is the only way to find
the rest. **Bake the script into SKILL §5g** (TODO this session —
done in commit pending).

### 5.13 Landing filter removed (Jun 3 2026)

**Symptom:** Jack: "The filter section on the home page needs to
go, it doesn't really achieve anything due to the fact the selecting
an activity means you need to filter a second time."

**Cause:** The landing-page year-band + class chip strip was added
during the class-filter rework (commit `c95ff68`, see §3.2) on the
assumption it would narrow the visible game cards AND pre-seed the
SetupScreen for the chosen game. The first part worked but mostly
just hid cards the teacher wasn't choosing from anyway; the second
part was redundant because SetupScreen already has its own picker
with sensible defaults.

**Fix:** Commit `76c6529` removes the entire filter section
(year-band chips, class chips, clear button, empty state, the
"X games match" counter). The Surprise Me button now picks from
all 17 games. Subhead updated to "Pick one — then choose your
class on the next screen."

**Orphaned localStorage keys** (harmless, no migration needed):
- `brainbreaks.filters.yearBands`
- `brainbreaks.filters.classes`
- `brainbreaks.lastClass` — was a hint from landing to SetupScreen;
  the read path in `GameShell.tsx:143` still exists as dead-but-safe
  code. SetupScreen falls back to its other defaults (per-game
  persisted key → anchored-class scan → first available).

**Lesson:** When a UI element exists to reduce clicks, check whether
the destination it routes to actually USES the choice. If the next
screen makes you re-decide, the earlier picker isn't saving work —
it's adding it.

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

**Update 2026-07-02:** the project moved to Jack's Mac. The real
project is now `~/Desktop/hrs-teaching-tools-main`; the `C:\...`
paths above are historical.

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
2. Run `python3 scaffold_overviews.py` (`py` on Windows) if the folder doesn't have an `_overview.md` yet.
3. Open the `_overview.md` and fill it in from the source PDFs. The
   overview drives all subsequent content authoring — invest here.

### Step 4: Author the content

For each game type:

- **Quick Quiz + Buzzer Round** (`mcq.ts`): add a `SENIOR_<NAME>: MCQ[] = [...]` constant; register it in `MCQ_BANK.byStreamSubject.<stream>.<subject>`.
- **Odd One Out** (`oddOneOut.ts`): same pattern, `ODD_BANK`.
- **Two Truths** (`misc.ts`): append to `TRUTHS.<stream>` array, each item tagged with `subject: '<your-subject>'`.

Tag every item with the appropriate `unit: 1|2|3|4` if it's a senior VCE item.

### Step 5: Verify

```bash
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
but it doesn't know about the new `byClass` index — so anchored
items (Y10 Maths) are invisible to it. Migrate to `pickFromClass`
and a year-band + class UI when it next needs a touch.

**Update 2026-07-08:** its "Senior cohort" Y11/Y12 picker is
**actively broken** post-VCE-removal — it filters on the MCQ `unit`
tag, which no longer exists on any item, so selecting Y11 or Y12
yields 0 questions. Jack chose to leave Teacher Tools entirely
alone in the Y7–10 scope cleanup, so this is a KNOWN ISSUE, not an
oversight. Fold the fix into the eventual pickFromClass migration.

### 7.3 Many class folders still have empty `_overview.md`s

114 classes × 1 overview each = 114 overview files. Currently 1 is
filled in (vce-software-development-3-4). The other 113 still
contain the template. Per-class authoring is the long-term work —
see §6 recipe.

### 7.4 Next class to onboard

**Scope reduction 2026-06-03 (commit `3cd12b7`)**: VCE Units 1-2 and
3-4 were removed entirely. Project scope is now Foundation – Year 10.
SD3-4 and Sociology 3-4 content (~700 items) were deleted along with
the VCE classes, year bands, and `vce12()`/`vce34()` helpers. Their
historical authoring is preserved in the §5/§5.x entries above as
project record but no longer ships.

**One class is HRS-anchored** at the full 450-item distribution:
- **Year 10 Maths** (302 MCQ + 75 OOO + 75 TL = 452, commit `17ae225`)
  — uses `y10-math-N` ID prefix, no `unit` tag per SKILL §6,
  Unicode-for-symbols-ASCII-for-fractions notation matching existing
  `ms-m-*` / `lp-m-*` items.

The remaining ~75 entries in `HRS_CLASSES` (down from 114 after the
scope reduction) rely on generic AC V9 backfill. **No specific class
is queued next** — confirm the target with Jack at the start of any
new onboarding session. Likely candidates based on teaching-staff
interest: other Y10 subjects (English, Science, Humanities), Y9
electives (CodeCraft has a `subject: 'computing'` tag that needs
content authoring), or Y7-9 cores.

### 7.6 Out-of-scope follow-ups identified Jun 3 2026

The rigour audit (§5.12) and textbook OCR (§5.11) opened up three
adjacent work streams that did NOT get done this session:

1. ~~**SD3-4 textbook-anchored batch 2.**~~ ✅ DONE 2026-06-03
   (commit `93734a5`). Authored `ss-comp-201..300` from the OCR'd
   textbook (`source-material/technology/software-development-3-4/textbook-extracted.txt`),
   25 items per AOS, anchored to specific named case studies
   (WannaCry, Apache Subversion, Adem's gym brief, Jane persona,
   GitHub Copilot/Codex, Essential Eight) and page-referenced
   textbook facts. Three-tier rigour audit (§5g) clean: 0 hits on
   Only/Just, 1 em-dash hit found + fixed, 0 length-asymmetry
   violations >2.5x. SD3-4 now matches Sociology at 450 items.

2. ~~**Non-anchored bank rigour audit.**~~ ✅ DONE 2026-06-03.
   Ran SKILL §5g three-tier audit against all non-anchored MCQs
   (filtering out ss-comp-, ss-soc-, y10-math- prefixes). Found
   15 Tier 1 hits (Only/Just distractors, especially the triple-
   "Only" anti-pattern where 3 distractors all start with "Only"
   and the correct answer is the comprehensive option), 0 Tier 2
   hits (em-dash), and 23 Tier 3 hits (length asymmetry >2.5×).
   With overlap: **35 unique items rewritten**. After the pass:
   0 hits on all three tiers across the entire non-anchored pool.
   The triple-"Only" pattern was the most common across primary
   science and senior geography items.

3. ~~**Formal OOO + Two Truths audit.**~~ ✅ DONE 2026-06-03.
   - **OOO**: ran length-asymmetry script against `oddOneOut.ts`.
     22 items flagged, but all are **false positives** — the
     length differences reflect the natural vocabulary of each
     category (e.g. "photo" vs "great-grandparent" in a family
     OOO; "Prime Minister" vs ancient titles "Pope/Pharaoh").
     Students answer based on meaning, not length. No rewrites.
   - **TL**: ran two checks against `misc.ts` — (a) absolute-
     language tells (always/never/only/all/every/none in lie
     but not truths), (b) length asymmetry >2.5×. **0 hits on
     both checks** across the entire TL bank. The bank is clean.

### 7.5 Source material progress log

`source-material/PROGRESS-LOG.md` was set up to track which subjects
have been HRS-anchored. It still uses the old "SAC-anchored" status
label and is missing rows for the primary humanities + primary science
splits that were added Jun 2026. Update before next subject onboarding.
The new way to track anchoring is the `anchored: true` flag in
`HRS_CLASSES` — could be auto-generated from that going forward.

---

_Last updated: 2026-07-12 by Claude (Fable 5) after the Year 7
Humanities onboarding-checkpoint session. Append, don't overwrite —
and date new entries so future readers know what's fresh._

**Session handoff (2026-07-12, Year 7 Humanities — Deep Time checkpoint):**
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
