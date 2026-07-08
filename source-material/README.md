# `source-material/`

This folder holds **HRS internal teaching documents** — SACs, scope &
sequence documents, unit overviews, textbook chapters — that Claude reads
when generating curriculum-anchored brain-break content.

The folder's **contents are gitignored**. Only this README,
`PROGRESS-LOG.md`, the `.gitkeep` files at the top level and inside each
subject folder, and the six HRS subject folders themselves are tracked
in git. Anything you drop inside any of those folders stays on your
machine.

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
| `technology/` | Currently unused — kept for future computing content |

See [`PROGRESS-LOG.md`](./PROGRESS-LOG.md) for the per-class tracker.

## Where to drop a file

Naming convention: **lowercase, hyphens not spaces, topical name**.

| You have… | Drop it in… |
|---|---|
| A Year 8 English SAC | `english/year-8/year-8-english-sac1-<topic>.md` |
| A Y10 Humanities scope & sequence | `humanities/year-10/y10-scope-and-sequence.md` |
| A Year 9 Science topic test | `science/year-9/y9-science-test-<topic>.pdf` |
| A Y7 HPE unit overview | `health-and-pe/year-7/y7-hpe-unit-overview.md` |

One file per logical unit — one SAC = one file. Don't jam multiple SACs
or topics into a single mega-file.

## Supported formats (best → workable)

| Format | Verdict | Notes |
|---|---|---|
| `.md` / `.txt` | **Best** | Instant read, easy to grep across folders. Default for copy-pasted content. |
| `.pdf` | Works | Claude reads in 20-page chunks. Scans get OCR'd automatically. |
| `.docx` | Works | Extracted via the docx skill. If copy-pasting, save as `.md` instead. |

## Workflow

1. **Audit your subjects** — confirm which HRS subjects are real for
   your cohort (e.g. some electives don't run every year, Senior
   subjects depend on enrolment).
2. **Drop material** — one subject + year at a time. Avoid the
   temptation to dump everything at once; we want to calibrate one
   batch before scaling.
3. **Tell Claude** in chat what you've added — e.g. *"I've dropped the
   Y8 Humanities Term 2 SAC and unit overview in
   `humanities/year-8/`"*.
4. **Claude reads, audits existing bank content, rewrites** the items
   that touch that subject + year, then commits the updated bank.
   Source files never get committed.
5. **You review** one round; we calibrate; next batch.
6. `PROGRESS-LOG.md` is updated each session with what was processed.

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
