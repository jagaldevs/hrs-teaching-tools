# `source-material/`

This folder holds **HRS internal teaching documents** — SACs, scope &
sequence documents, unit overviews, textbook chapters — that Claude reads
when generating curriculum-anchored brain-break content.

The folder's **contents are gitignored**. Only this README, the top-level
`.gitkeep`, the five subject folders, and each subject's `.gitkeep` are
tracked. Nothing you drop inside the subject folders ever leaves your
machine.

## Structure

```
source-material/
├── README.md                  ← committed
├── .gitkeep                   ← committed
│
├── english/                   ← committed (5 subject roots are tracked)
│   ├── .gitkeep
│   ├── f-2/                   ← local-only, gitignored
│   ├── 3-6/
│   ├── 7-9/
│   ├── year-10/
│   ├── units-1-2/             ← VCE Y11 English
│   ├── units-3-4/             ← VCE Y12 English
│   ├── literature-1-2/        ← VCE Y11 Literature
│   ├── literature-3-4/
│   ├── eal-1-2/               ← VCE Y11 English as Additional Language
│   └── eal-3-4/
│
├── maths/
│   ├── .gitkeep
│   ├── f-2/
│   ├── 3-6/
│   ├── 7-9/
│   ├── year-10/
│   ├── methods-1-2/           ← VCE Mathematical Methods Y11
│   ├── methods-3-4/
│   ├── general-1-2/           ← VCE General Maths Y11
│   ├── general-3-4/
│   ├── specialist-1-2/        ← VCE Specialist Maths Y11
│   ├── specialist-3-4/
│   ├── foundation-1-2/        ← VCE Foundation Maths Y11
│   └── foundation-3-4/
│
├── science/
│   ├── .gitkeep
│   ├── f-6/
│   ├── 7-10/
│   ├── biology-1-2/           ← VCE Biology Y11
│   ├── biology-3-4/
│   ├── chemistry-1-2/
│   ├── chemistry-3-4/
│   ├── physics-1-2/
│   ├── physics-3-4/
│   ├── psychology-1-2/
│   └── psychology-3-4/
│
├── history/
│   ├── .gitkeep
│   ├── f-6/
│   ├── 7-10/
│   ├── modern-1-2/            ← VCE Modern History Y11
│   ├── modern-3-4/
│   ├── ancient-1-2/           ← VCE Ancient History Y11
│   ├── ancient-3-4/
│   ├── revolutions-3-4/       ← VCE History: Revolutions Y12
│   ├── australian-1-2/        ← VCE Australian History Y11
│   └── australian-3-4/
│
└── geography/
    ├── .gitkeep
    ├── f-6/
    ├── 7-10/
    ├── units-1-2/             ← VCE Geography Y11
    └── units-3-4/             ← VCE Geography Y12
```

Year subfolders are pre-created on this machine for convenience, but
they are **gitignored** — they won't appear after a fresh clone until you
recreate them.

## How to use

1. **Drop files** into the right subject + year subfolder.
2. **Naming convention** — lowercase, hyphens not spaces, topical name:
   - `senior-english-units-3-4-sac1-creative-response.md`
   - `y9-science-evolution-and-natural-selection.pdf`
   - `methods-3-4-functions-and-graphs-unit-overview.md`
3. **One file per logical unit** — one SAC = one file. Don't jam multiple
   SACs or topics into a single mega-file.
4. **Tell Claude in chat** what you've added — e.g. *"I've dropped a
   Senior English Units 1-2 SAC in `source-material/english/units-1-2/`"*.

## Supported formats (best → workable)

| Format | Verdict | Notes |
|---|---|---|
| `.md` / `.txt` | **Best** | Instant read, easy to grep across folders. Default for copy-pasted content. |
| `.pdf` | Works | Claude reads in 20-page chunks. Scans get OCR'd automatically (multimodal). |
| `.docx` | Works | Extracted via the docx skill, slight overhead. If copy-pasting, save as `.md` instead. |

## What Claude does with these files

- **Inspired by, never copy-paste verbatim.** Brain-break items are
  written in the game's voice, calibrated to the SAC's depth and
  terminology, but never lift a teacher's question word-for-word.
- **AC V9 tagging** — keep the existing `acCode` tags on generated items
  where possible.
- **Progress tracked** in `CONTENT_UPGRADE_PROGRESS.md` (Phase 7 matrix)
  so any future session knows which subjects are still on
  training-knowledge content vs which have had a SAC-anchored pass.

## What Claude does NOT do

- Does not commit source files to git.
- Does not include verbatim quotes in committed code.
- Does not push these files anywhere.
- Does not modify the source files (read-only inputs).
