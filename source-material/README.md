# `source-material/`

This folder holds **HRS internal teaching documents** — SACs, scope &
sequence documents, unit overviews, textbook chapters — that Claude reads
when generating curriculum-anchored brain-break content.

The folder's contents are **gitignored**. Only this README and `.gitkeep`
are tracked. Nothing dropped in here ever leaves your machine.

## How to use

1. Drop source documents in here, organised by subject. Suggested layout:

   ```
   source-material/
   ├── README.md                       (this file, committed)
   ├── .gitkeep                        (committed)
   ├── senior-english-units-1-2/
   │   ├── sac-1-creative-response.pdf
   │   ├── sac-2-analytical-response.docx
   │   └── unit-overview.md
   ├── senior-english-units-3-4/
   │   └── ...
   ├── senior-methods-units-3-4/
   │   └── ...
   └── y9-science/
       └── ...
   ```

2. Mention the folder in chat — e.g. *"I've added the Senior English
   Units 1–2 SACs to `source-material/senior-english-units-1-2/`"* — and
   Claude will read them via the Read tool.

3. Supported formats:
   - `.md` / `.txt` — easiest, read directly
   - `.pdf` — read in page ranges (max 20 pages per request, chunkable)
   - `.docx` — read via the docx skill

## What Claude does with these files

Claude uses them as authoritative source material to:

- Rewrite existing brain-break items so vocabulary and difficulty match
  what HRS students have actually encountered
- Generate new items that reference the specific texts, periods,
  experiments or concepts being assessed at HRS
- Tag items with the matching AC V9 descriptor where possible

Claude never modifies the source files. They're read-only inputs.

## What Claude does NOT do with these files

- Does not commit them
- Does not include verbatim quotes in committed code or bank files
- Does not push them anywhere

The content in brain-break banks should be **inspired by** the source
material (curriculum-aligned, pitched correctly) but never a copy-paste
of a teacher's question or text excerpt.
