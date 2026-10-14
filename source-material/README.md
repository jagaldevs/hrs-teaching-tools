# `source-material/`

This folder holds **HRS internal teaching documents** — SACs, scope &
sequence documents, unit overviews, textbook chapters — that Claude reads
when generating curriculum-anchored brain-break content.

The folder's **contents are gitignored**. Only this README,
`PROGRESS-LOG.md`, the `.gitkeep` files, the five subject folders and the
`_reference/` skeleton are tracked in git. Anything you drop inside stays
on your machine — **so back it up** (git won't).

> See [`PROGRESS-LOG.md`](./PROGRESS-LOG.md) for the running list of
> what's been processed per subject × year.

## HRS subjects represented

**Scope: Year 7–10 classes only** (decision 2026-07-08). The `arts/`,
`electives/` and `languages/` folders were removed with that scope
change; VCE folders were removed earlier (2026-06-03).

| Folder | What it covers |
|---|---|
| `english/` | English Y7–10 |
| `maths/` | Mathematics Y7–10 |
| `science/` | Science Y7–10 |
| `humanities/` | Humanities Y7–10 |
| `health-and-pe/` | Health & PE Y7–10 |
| `_reference/` | Cross-class reference: AC V9, VCE study designs (reference only), HRS scope & sequences — see [`_reference/README.md`](./_reference/README.md) |

Each subject has `year-7/` … `year-10/` class folders with an
`_overview.md` template (`py scaffold_overviews.py` recreates any that
are missing).

See [`PROGRESS-LOG.md`](./PROGRESS-LOG.md) for the per-class tracker.

## Where to drop a file

Naming convention: **lowercase, hyphens not spaces, topical name**.

| You have… | Drop it in… |
|---|---|
| A Year 8 English SAC | `english/year-8/year-8-english-sac1-<topic>.md` |
| A Y10 Humanities scope & sequence | `humanities/year-10/y10-scope-and-sequence.md` |
| A Year 9 Science topic test | `science/year-9/y9-science-test-<topic>.pdf` |
| A Y7 HPE unit overview | `health-and-pe/year-7/y7-hpe-unit-overview.md` |
| AC V9 Science content descriptions | `_reference/ac-v9/science/` |
| A Y7–10 Maths scope & sequence | `_reference/hrs/maths/` |
| The VCE Biology study design | `_reference/vce/biology/` |

One file per logical unit — one SAC = one file. Don't jam multiple SACs
or topics into a single mega-file.

## Supported formats (best → workable)

| Format | Verdict | Notes |
|---|---|---|
| `.md` / `.txt` | **Best** | Instant read, easy to search across folders. |
| `.pdf` | Works | Extracted to text with pypdf; scans are OCR'd. |
| `.docx` | Works | Extracted with python-docx — which drops equations, so save maths-heavy documents as PDF. |
| `.pptx` | Works | Extracted with python-pptx, including slide notes. |

## Workflow

1. **Drop material** — bulk-drop freely. Class-specific files go in the
   class folder; anything spanning classes goes in `_reference/`.
2. **Start a session** with the bootstrap message in `JACK-NOTES.md`
   and name the class to onboard (one class per session).
3. **Claude drafts the class `_overview.md`** from the materials and
   `_reference/`, then stops for you to review the misconceptions list.
4. **Claude authors the class bank** (302 Quick Quiz + 75 Odd One Out +
   75 Two Truths), runs `npm test` and `npm run audit:content`, checks it
   in the app, updates `PROGRESS-LOG.md`, commits and pushes. The
   workflow is `.claude/skills/onboard-class/SKILL.md`. Source files
   never get committed.

## What Claude does

- **Inspired by, never copy-paste verbatim.** Brain-break items are
  written in the game's voice, calibrated to the SAC's depth and
  terminology, but never lift a teacher's question word-for-word.
- **AC V9 tagging** preserved — keep the existing `acCode` tags on
  generated items where possible.
- **Progress tracked** in `PROGRESS-LOG.md`.

## What Claude does NOT do

- Does not commit source files to git.
- Does not include verbatim quotes in committed code.
- Does not push these files anywhere.
- Does not modify the source files (read-only inputs).
