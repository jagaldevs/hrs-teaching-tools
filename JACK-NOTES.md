# Jack's Notes — HRS Brain Breaks

A personal reference for picking the project back up between sessions.
Not the engineering log (see `WORKLOG.md`) and not the onboarding
playbook (see `.claude/skills/onboard-class/SKILL.md`) — this is the
quick-glance "what is this and how do I drive it" doc for you.

_Last updated: 2026-07-02 (migrated to the Mac —
`~/Desktop/hrs-teaching-tools-main`; toolchain reinstalled, docs
de-Windowsed. Scope remains Foundation–Year 10; VCE content was
removed 2026-06-03.)_

---

## What this is

A React 18 + Vite + TypeScript PWA, dark-first, offline-capable,
deployed at the repo root.

Two products in one app:

- **Brain Breaks** (`/`) — 17 projector-ready games for the
  classroom. The Quick & Energetic 4 (Quick Quiz, Buzzer Round, Odd
  One Out, Two Truths and a Lie) are the ones with class-anchored
  content.
- **Teacher Tools** (`/tools`) — ~25 classroom utilities (RNG,
  manipulatives, classroom management).

Anchored class = one whose `_overview.md` is filled in AND has a
populated content bank keyed to that class. Currently anchored:

- **Year 10 Maths** (452 items)

Everything else uses generic AC V9 fallback content.

**Scope**: **Year 7 – 10 only** for brain-break targeting (narrowed
2026-07-08; was F–Y10). 20 in-scope classes: Y7–10 English, Maths,
Science, Humanities, Health & PE. Arts / electives / languages
source folders removed. VCE was removed earlier (2026-06-03).
Note: F–2 and 3–6 year bands, elective/language class entries and
the lp-/up- generic bank items are still in the code — a code-level
reduction is pending your call on delete vs hide.

---

## Where things live (quick map)

| Path | What |
|---|---|
| `src/data/games.ts` | Game registry — id, group, streams, subjects, duration |
| `src/data/classes.ts` | HRS class registry — 114 classes, `anchored` flag |
| `src/data/banks/mcq.ts` | All MCQ items (Quick Quiz + Buzzer Round) |
| `src/data/banks/oddOneOut.ts` | All Odd One Out items |
| `src/data/banks/misc.ts` | Two Truths + Estimate + Synonym + Would You Rather |
| `src/data/banks/*.ts` | Other small banks (words, sentences, stories, etc.) |
| `src/games/GameShell.tsx` | The SetupScreen all games share — year-band picker + class dropdown |
| `src/games/<Game>.tsx` | Each game file |
| `src/pages/BrainBreaks.tsx` | Landing page (game grid) |
| `source-material/<area>/<class>/` | HRS-specific source PDFs/docs (gitignored — drop freely) |
| `source-material/<area>/<class>/_overview.md` | Your spec file (drives my authoring) |
| `WORKLOG.md` | Engineering log — every decision and mistake-not-to-repeat |
| `.claude/skills/onboard-class/SKILL.md` | My workflow for onboarding a new class |

---

## To onboard a new subject — your prep checklist

The big-payoff actions in order. Skipping later items just means
lower-quality output, not failure.

- [ ] **Pick the class.** Plain English name, e.g. "VCE Methods 3-4".
- [ ] **Find the matching folder** under `source-material/`. It
  almost certainly already exists.
- [ ] **Drop everything you have** into that folder: textbook PDFs,
  revision tasks, chapter NOTES, past tests, SOLUTIONS pairs.
  Whatever's on your drive. The folder is gitignored, so drop freely.
- [ ] **Fill in `_overview.md`** in the same folder. The template is
  already there. Use your Y10 Maths `_overview.md` as the gold
  standard — that one was 905 lines and made the run smooth. Key
  sections (skip what you don't have, but the misconceptions list
  is the single biggest quality lever):
  - Scope (1–2 paragraphs)
  - Topic sequence (per topic: key concepts, vocabulary, chapter
    refs, possible MCQ focus, source-file map, curriculum codes)
  - Assessment style
  - Depth expectations (fluent recall / recognise / out of scope)
  - **Common misconceptions** ← biggest quality lever, these become
    distractors
  - Question-generation notes (target count, cognitive spread)
  - Resource inventory mapping source files to topics
- [ ] **If any .docx files contain math equations**, save them as
  PDF first — python-docx loses equations on extract, but pypdf
  preserves them.
- [ ] **Open a fresh Claude Code session** in the project directory
  and paste the bootstrap message below.

---

## The bootstrap message (copy-paste this)

Open Claude Code in `~/Desktop/hrs-teaching-tools-main` (this Mac),
then paste:

```
Read @WORKLOG.md and @.claude/skills/onboard-class/SKILL.md to load
the project context.

We're onboarding [CLASS NAME] today. Materials are dropped in
source-material/[path], and _overview.md is filled in.

Run the full onboard-class workflow:
1. Phase 0 setup (extract docx/pdf, flip anchored:true in classes.ts)
2. Phase 1 author 302 MCQ + 75 OOO + 75 TL = 452 items per the overview
3. Phase 2 SKILL §5g three-tier rigour audit
4. Phase 3 verify in the app, update WORKLOG §7.4 + handoff, commit and push

Mega-batch pacing — no checkpoints, push everything at the end.
```

Replace `[CLASS NAME]` and `[path]` with the real values.

**Pacing options**: keep "mega-batch pacing" for a single-shot run
(what we did for Y10 Maths). Replace with "stop after the first
topic for review" if you want a checkpoint before the full sweep.

---

## Key conventions I follow automatically

| Convention | Detail |
|---|---|
| **ID prefix** | `y<year>-<subject>-N` (e.g. `y10-math-`, `y8-sci-`) for Y7–Y10; `lp-` / `up-` / `ms-` prefixes for primary/middle generic items |
| **TL items** | Same prefix + `-tl-` infix (e.g. `y10-tl-math-N`) |
| **`unit` tag** | No longer used post-scope-reduction. Field still exists on the MCQ type for back-compatibility. |
| **Math notation** | Unicode for symbols (`²`, `√`, `÷`, `×`, `−`, `π`), ASCII slash for fractions (`1/2`) |
| **TL `classId` tag** | Required when item belongs to a specific HRS class |
| **Anchored class default** | 302 MCQ + 75 OOO + 75 TL = 452 items |
| **Cognitive spread** | 25% recall / 35% procedural / 25% interpretation / 15% misconception |
| **Rigour checklist** | No `'Only X'`/`'Just X'` distractors; no em-dash on correct option only; length parity within 2.5× ratio |

---

## Important pitfalls

These are the ones I burn cycles on if I don't watch for them.
Full list in `WORKLOG.md §5`.

- **PWA cache** — after content changes, the browser may serve a
  cached old bundle. Hard-refresh (Ctrl+Shift+R) or DevTools →
  Application → Service Workers → Unregister.
- **Working directory** — first thing every session: confirm I'm in
  `~/Desktop/hrs-teaching-tools-main` (this Mac since 2026-07-02).
  The `C:\...` paths in historical WORKLOG entries no longer exist.
- **This machine is macOS** — use `python3`, not the Windows `py`
  launcher, and read winget/PowerShell snippets in older docs as
  historical. README has the macOS equivalents.
- **Math equations in .docx** — python-docx loses them on extract.
  PDF preserves them via pypdf.
- **Two Truths items** — every item must have exactly ONE
  confidently false statement. Verify before shipping.
- **Helpers vs literal HrsClass** — the `y10()`, `y8()`, `f2()` etc.
  helpers don't take an `anchored` parameter. To set
  `anchored: true` on a Y7–Y10 class, switch to a literal HrsClass
  object (already done for y10-maths; reference if needed).
- **Computing subject without fallback** — Y8 Game Development and
  Y9 CodeCraft electives carry `subject: 'computing'` but neither
  is anchored AND there's no generic computing content. They'll
  fail to start until they get anchored. Fix when onboarding the
  first of those classes (just author a small computing bank
  during onboarding).

---

## Doing the rigour audit yourself

If you ever want to spot-check the banks without my help, the
SKILL §5g three-tier audit is reproducible with:

**Tier 1 — Only/Just distractors:**
```bash
grep -nE "'(Only |Just )[A-Za-z]" src/data/banks/mcq.ts
```

**Tier 2 — em-dash on correct option:**
```bash
grep -nE "', '[^']* — " src/data/banks/mcq.ts
```

**Tier 3 — length asymmetry (Python script):**
```python
import re
with open('src/data/banks/mcq.ts', 'r', encoding='utf-8') as f:
    src = f.read()
pat = re.compile(r"\{ id: '([a-z0-9-]+)', q: '[^']+', choices: \[((?:'[^']+', ?){3}'[^']+')\], answer: (\d)")
for m in pat.finditer(src):
    id_ = m.group(1)
    choices = re.findall(r"'([^']+)'", m.group(2))
    if len(choices) != 4: continue
    correct = choices[int(m.group(3))]
    wrong_max = max(len(c) for i, c in enumerate(choices) if i != int(m.group(3)))
    ratio = len(correct) / max(wrong_max, 1)
    if ratio > 2.5:
        print(f'{id_}: {ratio:.2f}x')
```

Target: zero hits on all three tiers per anchored class.

---

## Deeper references (when you want the details)

- **`WORKLOG.md`** — engineering log, every decision and pitfall
  documented. Read §1 for project orientation, §3 for conventions,
  §5 for mistakes-not-to-repeat, §7 for open questions.
- **`.claude/skills/onboard-class/SKILL.md`** — the onboarding
  workflow I follow step-by-step. Read this if you want to know
  exactly what I'll do in each phase.
- **`PLAN-CLASS-FILTER.md`** — historical plan for the class-filter
  rework. Mostly of historical interest now.
- **`README.md`** — the public-facing project README.

---

## Audit + content status (snapshot as of 2026-06-03)

- **All MCQ banks audit-clean** — both anchored (~600 items) and
  non-anchored (~1500 items). 0 hits on Only/Just, em-dash, or
  length-asymmetry >2.5×.
- **OOO bank** — 22 length-flagged items reviewed, all false
  positives (length differences reflect natural vocabulary).
- **TL bank** — 0 hits on language tells or length asymmetry.
- **No queued follow-ups** from previous WORKLOG sessions. Clean
  slate.

---

## Side note on GitHub privacy

The repo is **private** (`jagaldevs/hrs-teaching-tools`, confirmed
2026-07-02 — it was public when this note was first written; keep
this in mind if you ever flip it back). It contains your full name
in `About.tsx`
(intentional) and references your local Windows username and
OneDrive path in `WORKLOG.md` and the SKILL doc (incidental, in
historical context). No credentials, no secrets, `.env` is
gitignored. If you ever want those path leaks scrubbed, ask in a
new session — it's a 1-commit job to replace with `<username>`
placeholders in current files.
