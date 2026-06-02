# PLAN — Per-class filter rework

**Status:** Draft. Awaiting sign-off from Jack before any code changes.
**Author:** Claude (Opus 4.7), 2026-06-02.
**Supersedes:** the stream+subject filter model described in
`WORKLOG.md` §3.2 and §7.1.

---

## 1. What we're changing and why

### 1.1 The problem
The current model filters content by **AC V9 stream** (Lower Primary /
Upper Primary / Middle School / Senior School) + **subject** (English /
Maths / etc.). That made sense when every item was generic AC V9
training-knowledge. Now that we're authoring per-HRS-class content
(VCE Software Dev 3-4 done; VCE Methods 1-2, Year 8 Science, etc. to
follow), the stream abstraction is too coarse:

- A Year 8 Science teacher and a Year 10 Science teacher both pull
  from the same `middle_school + science` pool, which is wrong for
  both of them.
- "VCE Software Dev 3-4" content lives alongside generic "Senior
  Computing" items with no way to distinguish.
- The teacher has to mentally map their actual class
  ("I teach Year 8 Science period 3") to the abstraction
  ("Middle School + Science").

### 1.2 The fix
Replace stream+subject filtering with a **two-step class picker**
that maps directly to the HRS class structure already encoded in
`source-material/`:

- **Step 1:** Pick a year band (F-2 / 3-6 / Y7 / Y8 / Y9 / Y10 / VCE 1-2 / VCE 3-4).
- **Step 2:** Pick a specific class within that band (e.g. "Year 8 Science", "VCE Software Development 3-4").

### 1.3 Decisions already locked in (per Jack, 2026-06-02)
1. **Picker shape:** Two-step (year → class).
2. **Existing AC V9 content:** Bucket under "Generic Year X" classes —
   they still surface, but HRS-anchored classes take precedence when
   populated.
3. **VCE units:** "VCE English 1-2" and "VCE English 3-4" are separate
   classes (not "VCE English" with a unit sub-filter).
4. **Rollout:** Plan first → sign-off → build. This document is the plan.

## 2. The class taxonomy

### 2.1 Year bands (Step 1 picker)

| ID | Display | Source-material parent |
|---|---|---|
| `f-2` | Foundation – Year 2 | `*/f-2/` |
| `3-6` | Years 3–6 | `*/3-6/` |
| `y7` | Year 7 | `*/year-7/` |
| `y8` | Year 8 | `*/year-8/` |
| `y9` | Year 9 | `*/year-9/` |
| `y10` | Year 10 | `*/year-10/` |
| `vce-1-2` | VCE Units 1–2 (Year 11) | `*/<subject>-1-2/`, `*/<subject>/` for languages |
| `vce-3-4` | VCE Units 3–4 (Year 12) | `*/<subject>-3-4/` |

### 2.2 Classes (Step 2, derived from source-material folders)

Each class is an entry in a new `HRS_CLASSES` registry. Excerpt
(full list lives in `src/data/classes.ts` once we build):

```ts
{
  id: 'vce-software-development-3-4',
  yearBand: 'vce-3-4',
  name: 'VCE Software Development',
  unitSuffix: 'Units 3–4',           // optional, shown next to name
  subject: 'computing',              // for chip colour
  sourcePath: 'technology/software-development-3-4',
  anchored: true,                    // has populated source material + content
  legacyStream: 'senior_school',     // for backfill from generic items
  legacyUnits: [3, 4],               // narrow legacy MCQ pool to these units
}
```

**Class count (counted from `source-material/` folders, 2026-06-02):**

| Band | Class count | Examples |
|---|---|---|
| F-2 | 4 | English, Maths, Science, Humanities |
| 3-6 | 4 | English, Maths, Science, Humanities |
| Y7 | 7 | English, Maths, Science, Humanities, Chinese, French, Health & PE |
| Y8 | 19 | Core (7) + 11 electives + 1 (Y9 elective overlap) |
| Y9 | 19 | Core (7) + 11 electives + 1 |
| Y10 | 7 | English, Maths, Science, Humanities, Chinese, French, Health & PE |
| VCE 1-2 | ~25 | All VCE Year 11 subjects across all faculties |
| VCE 3-4 | ~22 | All VCE Year 12 subjects, including HRS's offerings |
| **Total** | **~107** | |

A full table of every class is included in **Appendix A** at the end
of this plan.

### 2.3 Generic backfill classes

The existing ~500 AC V9-tagged items in the banks aren't class-specific.
Rather than dropping them or duplicating them per class, they stay
accessible via **automatic backfill**:

- A class picker entry exists for every HRS class (anchored or not).
- When the user picks an **unanchored** class, the game pulls from the
  legacy `byStreamSubject[stream][subject]` pool — using `legacyStream`
  and `subject` from the class record as the lookup keys.
- When the user picks an **anchored** class, the game pulls from
  `byClass[classId]`. If that pool is too small (< sel.count), the
  game **tops up** from the legacy backfill, prioritising class-specific
  items.

This means: a Y8 Science teacher and a Y10 Science teacher (both
unanchored today) get the same `middle_school + science` content — which
matches today's behaviour. As classes get anchored, the experience
diverges naturally.

## 3. Data model changes

### 3.1 New file: `src/data/classes.ts`

```ts
import type { Stream, Subject } from './games';   // or 'types'

export type YearBand =
  | 'f-2' | '3-6' | 'y7' | 'y8' | 'y9' | 'y10'
  | 'vce-1-2' | 'vce-3-4';

export interface YearBandDef {
  id: YearBand;
  label: string;
  shortLabel: string;
  ordering: number;
}

export const YEAR_BANDS: YearBandDef[] = [
  { id: 'f-2',     label: 'Foundation – Year 2', shortLabel: 'F–2',  ordering: 1 },
  { id: '3-6',     label: 'Years 3–6',           shortLabel: '3–6',  ordering: 2 },
  { id: 'y7',      label: 'Year 7',              shortLabel: 'Y7',   ordering: 3 },
  { id: 'y8',      label: 'Year 8',              shortLabel: 'Y8',   ordering: 4 },
  { id: 'y9',      label: 'Year 9',              shortLabel: 'Y9',   ordering: 5 },
  { id: 'y10',     label: 'Year 10',             shortLabel: 'Y10',  ordering: 6 },
  { id: 'vce-1-2', label: 'VCE Units 1–2 (Y11)', shortLabel: 'V1-2', ordering: 7 },
  { id: 'vce-3-4', label: 'VCE Units 3–4 (Y12)', shortLabel: 'V3-4', ordering: 8 },
];

export interface HrsClass {
  /** Stable id, kebab-case. Used as the bank key for anchored content. */
  id: string;
  yearBand: YearBand;
  /** Display name. e.g. "Software Development", "Year 8 Science". */
  name: string;
  /** Optional unit suffix shown after the name, e.g. "Units 3–4". */
  unitSuffix?: string;
  /** Used for chip colour and broad categorisation. */
  subject: Subject;
  /** Path within source-material/ for human reference. */
  sourcePath?: string;
  /** Has populated source material + ≥ ~20 anchored items in at least one bank. */
  anchored?: boolean;
  /** For generic content backfill. e.g. 'senior_school' + 'computing' for VCE SD. */
  legacyStream?: Stream;
  /** For senior items: narrow legacy MCQ pool to these units. */
  legacyUnits?: (1 | 2 | 3 | 4)[];
}

export const HRS_CLASSES: HrsClass[] = [
  // ... full list, ~107 entries
];

export function classesForBand(band: YearBand): HrsClass[] { ... }
export function findClass(id: string): HrsClass | undefined { ... }
```

### 3.2 Extend `Bank<Q>` in `src/games/types.ts`

```ts
export interface Bank<Q> {
  /** Existing stream-subject lookup. Keep for backwards compat + backfill. */
  byStreamSubject: Partial<Record<Stream, Partial<Record<Subject, Q[]>>>>;
  /** New: anchored content keyed by HRS class id. */
  byClass?: Partial<Record<string, Q[]>>;
}
```

Existing banks need no item-level changes — we just add the optional
`byClass` index. The 100 SD3-4 MCQs currently in
`MCQ_BANK.byStreamSubject.senior_school.computing` get **moved** to
`MCQ_BANK.byClass['vce-software-development-3-4']`. Same items, new
index — no content rewriting.

### 3.3 Update `bankUtils.ts`

```ts
export interface ClassSelection {
  classId: string;
  count: number;
}

export function pickFromClass<Q>(
  bank: Bank<Q>,
  classId: string,
  count: number,
  topUpFromLegacy = true,
): { items: Q[]; classId: string } {
  const klass = findClass(classId);
  if (!klass) return { items: [], classId };

  const anchored = bank.byClass?.[classId] ?? [];
  if (anchored.length >= count) {
    return { items: shuffle(anchored).slice(0, count), classId };
  }

  // Top up from legacy stream+subject pool.
  if (topUpFromLegacy && klass.legacyStream) {
    const legacyFiltered = pickFromBank(
      bank,
      klass.legacyStream,
      klass.subject,
      count - anchored.length,
      klass.legacyUnits ? (q: any) => klass.legacyUnits!.includes(q.unit) : undefined,
    );
    return {
      items: shuffle([...anchored, ...legacyFiltered.items]).slice(0, count),
      classId,
    };
  }

  return { items: shuffle(anchored).slice(0, count), classId };
}
```

Existing `pickFromBank()` stays as-is for backwards compatibility and
internal use by `pickFromClass()`.

### 3.4 TruthsLieItem class tagging

`TruthsLieItem` currently has optional `subject?: Subject`. Add an
optional `classId?: string` alongside it. TwoTruthsLie filters by
classId when one is set on the class record's id matches.

### 3.5 `SetupSelections` shape changes

```ts
export interface SetupSelections {
  classId: string;       // new: replaces stream + subject + unitGroup
  count: number;
  // Deprecated, kept for one release for backwards-compatible localStorage migration:
  stream?: Stream;
  subject?: Subject | 'mix';
  unitGroup?: 'any' | 'units_1_2' | 'units_3_4';
}
```

## 4. UI changes

### 4.1 BrainBreaks landing page (`src/pages/BrainBreaks.tsx`)

**Today:** Two filter rows — Stream chips + Subject chips.

**Tomorrow:** Two filter rows — Year band chips + Class search/picker.

- **Year band row:** 8 chips (F-2 / 3-6 / Y7 / Y8 / Y9 / Y10 / V1-2 / V3-4). Multi-select.
- **Class row:** A condensed list/dropdown that appears once one or more year bands are selected. Shows all classes for the selected bands. Multi-select. Anchored classes get a small ✓ badge.

The game card filter logic: a game card is shown if any selected
class has ≥ 1 anchored item OR generic backfill available, in at
least one of the game's banks. (Less strict in V1 — just show all
games if any class is selected.)

### 4.2 Game SetupScreen (`GameShell.tsx`)

**Today:** Stream chips + Subject chips + (optional) Senior unit chips + Count chips + Start.

**Tomorrow:** Year band chips + Class chips + Count chips + Start.

The class chip strip is populated based on the game's class support:
- For games that don't bother with class specificity (Anagram Race,
  Word Chain, Estimate It, etc.), the picker shows broad classes
  ("Year 7 — All", "Year 8 — All") that map to the legacy stream pool.
- For games with class-specific banks (Quick Quiz, Odd One Out,
  Two Truths, Buzzer Round), the picker shows every class that has
  content available — including anchored + unanchored backfill.

The Senior unit chip strip goes away entirely — Y11/Y12 selection is
now baked into the year band picker.

### 4.3 Game card subject colour

Each Game still declares `subjects: Subject[]` in `games.ts`. The
landing page colour-chips a game based on its declared subjects (same
as today). No change here.

## 5. Migration strategy

### 5.1 Content migration (one-time, scripted)

A small script (or manual one-shot edit) moves the existing 250 SD3-4
items from `byStreamSubject.senior_school.computing` →
`byClass['vce-software-development-3-4']` in mcq.ts, oddOneOut.ts and
misc.ts (truths-lie items already have `subject: 'computing'`).

No other content moves. The existing ~500 generic AC V9 items stay in
`byStreamSubject` and are reached via the backfill logic.

### 5.2 localStorage migration (graceful)

Existing teachers have persisted `<game>.stream`, `<game>.subject`,
`<game>.unitGroup` keys. On first load after the rework:

- A small migration helper reads the old keys, maps them to the
  nearest equivalent `classId`, and writes a new `<game>.classId` key.
- e.g. `quickquiz.stream='senior_school' + quickquiz.subject='computing' + quickquiz.unitGroup='units_3_4'`
  → `quickquiz.classId='vce-software-development-3-4'`.
- The old keys are not deleted (in case the user reverts), just
  superseded.

### 5.3 Code migration phasing

This is the rollout schedule. **Each phase ends in a working app
deployed to main.** No long-lived branches.

| Phase | Scope | Risk |
|---|---|---|
| **P1: Class registry** | Add `classes.ts` with full ~107-class list. No UI changes yet. | None — pure addition. |
| **P2: Bank extension** | Add `byClass` to `Bank<Q>`. Add `pickFromClass()` in bankUtils. Migrate the 250 SD3-4 items to `byClass`. Verify legacy `pickFromBank` still works. | Low — additive change. |
| **P3: BrainBreaks landing rework** | Replace stream+subject chip rows with year band + class. Old filter logic deleted. | Medium — UI surface change. |
| **P4: SetupScreen rework** | Replace stream/subject pickers with year band + class. Old logic deleted. Update all 16 game call sites (the `gameId` plumbing makes this lighter — most games keep the same prop). | Medium — affects every game. |
| **P5: localStorage migration** | One-shot migration of old persisted keys to new `classId` keys. | Low — runs once per user. |
| **P6: Cleanup** | Remove `Stream` from `Game.streams` if unused, deprecate `byStreamSubject` where `byClass` fully covers, update WORKLOG with new conventions. | Low — sweep. |

Each phase is one or two commits. Phases can ship independently.

## 6. What's explicitly out of scope (V1)

- **Search box on the class picker.** Year band as primary filter is
  expected to keep the picker short enough; we can add search later
  if it gets unwieldy.
- **Class-content authoring tools.** We're not building a CMS — Jack
  still drops PDFs into source-material/ and Claude authors content
  into the bank files.
- **Cross-class question reuse.** Each item belongs to exactly one
  class id (or no class id, for generic). No multi-class tagging in V1.
- **Anchored-class progress dashboard.** A "which classes have
  content" overview is nice-to-have for later; for now the ✓ badge on
  classes that are anchored is enough.
- **Teacher accounts.** No login, no per-teacher persistence. All
  state stays in localStorage as today.
- **Sub-class topic filters** (e.g. "Year 12 SD — Unit 3 AOS 1 only").
  All anchored items at a class are pooled together. Granular filters
  can come later if needed.

## 7. Open questions for sign-off

Before I touch a single file, please confirm or correct each of these:

### Q1 — Class display naming
Do you want classes displayed with explicit year prefix or without?

- **A:** "VCE Software Development 3-4" / "Year 8 Science" (current proposal)
- **B:** "Software Development" / "Science" (rely on year-band context above)
- **C:** Mixed — primary/secondary use full names, VCE strips the "VCE" prefix

### Q2 — Multi-band selection on the landing page
Should teachers be able to select multiple year bands at once (e.g.
both Y8 and Y9 to find content suitable for either)?

- **A:** Yes, multi-select (current proposal)
- **B:** Single-select only, simpler

### Q3 — Class picker depth on the SetupScreen
When a teacher is inside Quick Quiz and goes to setup, should the
SetupScreen show:

- **A:** All ~107 classes flat, grouped visually by year band (long but searchable by scroll)
- **B:** Same two-step (year band first, then classes), repeating the landing-page pattern (current proposal)
- **C:** Only classes the game has content for (anchored + backfilled), filtered to the band the user came in from (most opinionated)

### Q4 — Anchored badge
What should "anchored" mean exactly?

- **A:** "Has any items in `byClass[classId]`" — even 5 items counts
- **B:** "Has ≥ 20 items in `byClass[classId]`" — only meaningfully populated
- **C:** "Has _overview.md filled in AND ≥ 20 bank items" — semantic + quantitative
- **D:** Manual flag in `HRS_CLASSES` — Jack decides which counts

(Current proposal in §3.1 is D — explicit `anchored?: boolean` per class.)

### Q5 — Game card visibility on the landing page
When the user selects a class, which game cards should appear?

- **A:** All games that work for that class's year band (per existing `game.streams` mapping). Some might serve generic backfill only.
- **B:** Only games with anchored content for that class.
- **C:** All games always; the filter just colour-codes them.

### Q6 — Removing the existing Subject chip strip
Drop the subject chips on the landing page entirely (since year band
+ class implicitly carries subject), or keep them as a secondary
filter for cross-class browsing?

- **A:** Drop entirely (current proposal)
- **B:** Keep as a secondary "find all Science classes across years" filter

### Q7 — Languages, electives, Health & PE
Should Year 7 Chinese, Year 8 Drama (elective), Year 9 Health & PE
each appear as their own class in the picker, or should we hide them
in V1 since no banks currently carry their content?

- **A:** Include all ~107 classes in the picker, even unanchored ones
- **B:** Only show classes that map to existing legacy content (core
  English/Maths/Science/Humanities) for V1, expand later
- **C:** Include all but visually mute unanchored classes

## 8. Estimated effort

(Once Q1–Q7 are answered.)

- P1 (registry): ~1 hour to author the 107-class list.
- P2 (bank extension): ~30 min code + migration.
- P3 (landing page): ~1 hour.
- P4 (SetupScreen + 16 game sites): ~1.5 hours.
- P5 (localStorage migration): ~30 min.
- P6 (cleanup): ~30 min.

Total: ~5 hours of focused work. Best done in one or two sessions to
keep context.

## 9. Appendix A — full class list

(Derived from `source-material/` folders, 2026-06-02. Anchored = ✓.)

### F-2 (Foundation – Year 2)
- Lower Primary English
- Lower Primary Maths
- Lower Primary Science
- Lower Primary Humanities

### 3-6 (Years 3–6)
- Upper Primary English
- Upper Primary Maths
- Upper Primary Science
- Upper Primary Humanities

### Year 7
- Year 7 English, Year 7 Maths, Year 7 Science, Year 7 Humanities
- Year 7 Chinese, Year 7 French
- Year 7 Health & PE

### Year 8
- Core: Year 8 English, Maths, Science, Humanities, Chinese, French, Health & PE
- Electives: Drama, Food Technology, Forensic Science, Game Development,
  Mechatronics, Media, Music, Sports Performance, The Power of Words,
  Visual Art, Visual Communication and Design, Woodwork

### Year 9
- Core: Year 9 English, Maths, Science, Humanities, Chinese, French, Health & PE
- Electives: CodeCraft, Drama, Entrepreneurship and Commerce, Food
  Technology, Literature, Media, Music, Politics, Recreational Studies,
  Visual Art, Visual Communication and Design, Woodwork

### Year 10
- Year 10 English, Maths, Science, Humanities, Chinese, French, Health & PE

### VCE Units 1–2 (Year 11)
- English, Literature
- Mathematical Methods, General Mathematics, Specialist Mathematics, Foundation Mathematics
- Biology, Chemistry, Physics, Psychology
- History, Geography, Economics, Legal Studies, Politics, Sociology, Accounting, Business Management
- Art Making and Exhibiting, Visual Communication Design, Music, Media, Theatre Studies
- Applied Computing
- Chinese as a First Language, Chinese
- Health and Human Development, Outdoor and Environmental Studies, Physical Education

### VCE Units 3–4 (Year 12)
- English
- Mathematical Methods, General Mathematics, Specialist Mathematics, Foundation Mathematics
- Biology, Chemistry, Physics, Psychology
- History, Geography, Economics, Legal Studies, Sociology, Accounting, Business Management
- Art Making and Exhibiting, Visual Communication Design, Music
- **Software Development** ✓ (anchored — 250 items)
- Chinese as a First Language, Chinese
- Health and Human Development, Outdoor and Environmental Studies, Physical Education

---

## Awaiting sign-off

Please respond inline with answers to Q1–Q7 in §7 (or just "all
recommended" if you're happy with the current proposals throughout).
Once that's locked in, I'll start P1 and we'll ship through the
phases.

If anything in §1–§6 is wrong or needs rethinking, flag it now —
much cheaper to revise the plan than to revert built code.
