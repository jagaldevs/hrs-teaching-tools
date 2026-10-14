# `source-material/_reference/`

Curriculum and school-wide documents that apply **across classes**. Claude
reads these alongside a class's own folder when drafting its
`_overview.md` and authoring questions. Like everything under
`source-material/`, the documents are gitignored — only this README and
the folder skeleton are tracked.

| Folder | Drop here | Used for |
|---|---|---|
| `ac-v9/` | Australian Curriculum V9 content descriptions, achievement standards and scope & sequence charts. One subfolder per learning area: `english/`, `maths/`, `science/`, `hass/`, `hpe/`. | The canonical "what's in scope at this year level". `acCode` tags on bank items come from here. |
| `vce/` | VCAA study designs (and past exams if useful). One subfolder per study, e.g. `vce/mathematical-methods/`. | **Reference only** — the app stops at Year 10. Used to check Year 10 questions lead sensibly into VCE and to keep VCE-only content *out* of Year 7–10 banks. |
| `hrs/` | HRS-wide documents: whole-school or whole-subject scope & sequences, assessment policies, literacy/numeracy frameworks. Subfolder per subject when it helps, e.g. `hrs/maths/`. | HRS's own sequencing and terminology, which take priority over AC V9 defaults when they differ. |

## What goes where

- **Specific to one class** (a Year 8 Science unit plan, a Year 10 Maths
  test) → that class's folder, e.g. `../science/year-8/`.
- **Spans several year levels or classes** (a Y7–10 Science scope &
  sequence, AC V9 Maths) → here.
- Not sure? Put it here and say so when you start a session.

## Formats

PDF, DOCX, PPTX, MD and TXT all work. Claude extracts large files to a
`.extracted.txt` next to the original (also gitignored) so they can be
searched quickly. Save equation-heavy DOCX files as PDF first —
python-docx drops equations; pypdf keeps them.

## Naming

Lowercase, hyphens, and say what it is and which years it covers:
`ac-v9-maths-f-10-content-descriptions.pdf`,
`hrs-science-y7-10-scope-and-sequence.docx`,
`vce-maths-methods-study-design-2023-2027.pdf`.
