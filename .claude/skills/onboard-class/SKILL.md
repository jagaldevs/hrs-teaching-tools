---
name: onboard-class
description: Use whenever Jack wants to anchor a Year 7-10 HRS class with its own question bank — phrasings like "onboard Year 8 Science", "anchor this class", "I've dropped the Y9 English materials", "do the same for Year 10 Humanities". Reads the class's source-material folder plus source-material/_reference/ (AC V9, HRS scope & sequences, VCE study designs), drafts the class _overview.md for Jack's review, flips the class to anchored, authors 302 MCQ + 75 Odd One Out + 75 Two Truths items, runs npm test and the content audit, verifies in the app, updates the progress log and WORKLOG, commits and pushes.
---

# Onboard a Year 7–10 class

Takes one HRS class from generic AC V9 content to its own 452-item bank.
One class per session. The worked examples are Year 10 Maths (`17ae225`),
Year 7 Humanities (`2961f8e`) and Year 8 Humanities (`1674155`) — when
in doubt, copy what they did.

**Scope.** The app's classes are Foundation–Year 10; onboarding work
targets the 20 Year 7–10 classes (English, Maths, Science, Humanities,
Health & PE × Years 7–10). VCE material is reference only — never add
VCE classes or VCE-only content.

## 0. Orient

1. Work in the repo, `C:\Users\jack.galbraith\Code\hrs_teaching_tools`.
   The OneDrive `Desktop\hrs_teaching_tools` folder is only a `.claude`
   stub. Run `git pull` first.
2. Read `JACK-NOTES.md` and the latest handoff in `WORKLOG.md`.
3. Confirm the class with Jack and find it in `src/data/classes.ts`
   (e.g. `y8('y8-science', 'Year 8 Science', 'science', 'science/year-8')`).
   Its `sourcePath` is the folder under `source-material/`.

## 1. Inventory and extract

Read from two places:

| Where | What | Role |
|---|---|---|
| `source-material/<sourcePath>/` | This class's unit plans, tests, slides, key-terms lists, textbook chapters | The primary anchor: what HRS actually teaches this class |
| `source-material/_reference/ac-v9/<learning-area>/` | AC V9 content descriptions for the year | Scope check and `acCode` tags |
| `source-material/_reference/hrs/` | HRS scope & sequences, frameworks | HRS sequencing and terminology (beats AC V9 when they differ) |
| `source-material/_reference/vce/` | VCAA study designs | Pathway context only — and the list of what is *out* of scope for Year 7–10 |

Run `ls -la` before opening anything large. Extract every PDF, DOCX and
PPTX to a `.extracted.txt` beside it (gitignored), then search and read
the extractions instead of the originals:

```bash
py -m pip install pypdf python-docx python-pptx --quiet   # python3 on macOS
```

- **PDF:** `pypdf`. If pages come back empty it's a scan; OCR it with
  PyMuPDF + pytesseract (Tesseract lives in
  `%LOCALAPPDATA%\Programs\Tesseract-OCR\`). See WORKLOG §5.11.
- **DOCX:** `python-docx`. It drops equations, so ask Jack for a PDF of
  any maths-heavy document.
- **PPTX:** `python-pptx`, including slide notes and tables.
- Don't skip `name (1).pptx`-style files unless a non-suffixed twin
  exists (WORKLOG, Y8 Humanities handoff).
- Big textbooks: extract, don't skip. Their named case studies make the
  best questions (WORKLOG §5.8).

## 2. Draft `_overview.md` — then stop for review

Fill `source-material/<sourcePath>/_overview.md` (create the template
with `py scaffold_overviews.py` if missing). Sections: scope, topic
sequence (key concepts, vocabulary, AC V9 codes and source files per
topic), assessment style, depth expectations, **common misconceptions**,
notes for question generation. Year 10 Maths' 905-line overview is the
gold standard.

- Anchor every line to the materials. Mark anything you inferred
  `[CONFIRM]`.
- Put VCE-only content (from `_reference/vce/`) under **Out of scope**.
- **Checkpoint:** show Jack the misconceptions list and the
  `[CONFIRM]` flags and wait. Misconceptions become the wrong answers;
  this is the biggest quality lever. For the first class in a new
  subject, also offer a one-unit calibration batch before the full run.

## 3. Flip the class to anchored

In `src/data/classes.ts`, pass `extra` to the helper:

```ts
y8('y8-science', 'Year 8 Science', 'science', 'science/year-8', { anchored: true }),
y9('y9-humanities', 'Year 9 Humanities', 'history', 'humanities/year-9', { ...HUM, anchored: true }),
```

`npm test` checks that the `anchored` flag and `MCQ_BANK.byClass` agree,
so flip it in the same change as the content. Health & PE classes are
hidden until they're anchored; anchoring one makes it appear.

## 4. Author 452 items

| Game | File | Count | Where | ID pattern |
|---|---|---|---|---|
| Quick Quiz (+ Question Generator) | `src/data/banks/mcq.ts` | 302 | New `const Y8_SCIENCE: MCQ[]` before `MCQ_BANK`, registered in `MCQ_BANK.byClass['y8-science']` | `y8-sci-1…302` |
| Odd One Out | `src/data/banks/oddOneOut.ts` | 75 | Same pattern in `ODD_BANK.byClass` | `y8-sci-1…75` |
| Two Truths and a Lie | `src/data/banks/misc.ts` | 75 | Append to `TRUTHS.<legacyStream>` with `subject` **and** `classId: 'y8-science'` | `y8-tl-sci-1…75` |

**Write in unit-sized chunks** against a sentinel comment
(`// Y8_SCI_MCQ_END`), and run `npx tsc -b` after each. One giant insert
once truncated `mcq.ts` mid-string. If a run is interrupted, compare
`grep -c "id: 'y8-sci-"` counts and `git status` against the plan, then
carry on.

**Spread across topics** in proportion to teaching time. Cognitive mix:
about 25% recall, 35% procedural, 25% interpretation, 15% misconception.
**Maths notation:** Unicode symbols (`²`, `√`, `×`, `÷`, `−`, `π`) and
ASCII fractions (`1/2`).

### Rigour rules (every item)

1. **Plausible distractors** drawn from the overview's misconceptions.
   No joke options.
2. **No give-away length.** The correct option shouldn't stand out as
   the longest or most detailed. The audit flags anything over 2.5× the
   longest distractor.
3. **No "Only X" / "Just X" distractors**, in any capitalisation.
4. **No em-dash gloss on the correct option only.**
5. **No telegraphed stems** (the stem shouldn't echo the answer's
   wording).
6. **Two Truths:** exactly one confidently false statement. The lie
   shouldn't be the only statement with always/never/only/all/every.
7. **Explanations must not refer to option order** ("respectively",
   "option B", "statement 2"). The games shuffle options at round start,
   so you don't need to balance answer positions, but positional
   references will be wrong.
8. **Inspired by, never copied from** the source documents.
9. **Cross-topic distractors** work well for survey classes (e.g. a
   Japan answer as a Medieval Europe distractor).

## 5. Verify

```bash
npm test                                      # integrity + per-class wiring
npm run audit:content -- --class y8-science   # rigour heuristics
npm run build
```

- `npm test` must pass.
- Audit findings: fix them, or justify each one to Jack (e.g. a genuine
  numeric answer that happens to be long).
- **Check it in the app:** start the `vite` preview, pick the class in
  Quick Quiz, Odd One Out and Two Truths, and play a round of each. Also
  draw a few questions in Teacher Tools → Question Generator. Tell Jack
  to hard-refresh (Ctrl+Shift+R) if his browser shows old content (PWA
  cache, WORKLOG §5.6).

## 6. Record and ship

1. `source-material/PROGRESS-LOG.md`: tick Materials → Overview →
   Anchored → Audited for the class, with the commit hash.
2. `WORKLOG.md`: a dated session handoff at the top, covering what
   landed, any new gotcha, and any open `[CONFIRM]` flags.
3. Commit (content and anchored flag together; docs separately), ending
   with the co-author trailer from the session's instructions. Push.

## Gotchas

- **Read before Edit:** the Edit tool needs a Read of the file in the
  same session. Grep doesn't count.
- **Git Bash on this PC:** `npm`/`npx` can fail silently there. Use
  PowerShell or `npm.cmd` / `npx.cmd`.
- **Stale dev-server modules:** if the app throws `X is not defined`
  right after an edit that `tsc` accepts, restart the dev server. HMR
  can keep an old lazy-chunk URL in `registry.ts`.
- **Source material isn't in git.** `source-material/` contents exist
  only on this machine, so remind Jack to back them up.
