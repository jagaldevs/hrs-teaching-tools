# Source Material Progress Log

Tracks SAC- and unit-anchored brain-break content work per subject ×
year level. Every session that processes new HRS material updates this
file so future sessions know exactly what's been done.

---

## HRS curriculum at a glance

### Middle School (Y7 – Y9)
**Core subjects taught at all levels:** English · Mathematics · Science ·
Humanities · Languages (Chinese OR French) · Health and Physical
Education.

**Electives** — different per year:

- **Year 8:** Drama · Food Technology · Forensic Science ·
  Game Development · Mechatronics · Media · Music · Sports Performance ·
  The Power of Words · Visual Art · Visual Communication and Design ·
  Woodwork
- **Year 9:** CodeCraft · Drama · Entrepreneurship and Commerce ·
  Food Technology · Literature · Media · Music · Politics · Recreational
  Studies · Visual Art · Visual Communication and Design · Woodwork
- **Year 7:** _pending — share when ready_

### Year 10
Mandatory: English · Mathematics or General Mathematics · Science ·
Humanities. PLUS **any two** subjects from the Year 10 Elective list OR
from the VCE Units 1 and 2 list. Year 10 electives are all VCE
Units 1–2 offerings (so a Y10 student doing Biology drops files in
`science/biology-1-2/`, not in a separate Y10 folder).

### Senior (VCE, Y11 – Y12)

Full HRS senior offering (as shared 2026-05-26):

| Subject | Units | Folder |
|---|---|---|
| English | 1–4 | `english/units-1-2`, `english/units-3-4` |
| Literature | 1–2 only | `english/literature-1-2` |
| Mathematical Methods | 1–4 | `maths/methods-1-2`, `maths/methods-3-4` |
| Specialist Mathematics (with Methods) | 1–4 | `maths/specialist-1-2`, `maths/specialist-3-4` |
| General Mathematics | 1–4 | `maths/general-1-2`, `maths/general-3-4` |
| Foundation Mathematics | 1–4 | `maths/foundation-1-2`, `maths/foundation-3-4` |
| Biology | 1–4 | `science/biology-1-2`, `science/biology-3-4` |
| Chemistry | 1–4 | `science/chemistry-1-2`, `science/chemistry-3-4` |
| Physics | 1–4 | `science/physics-1-2`, `science/physics-3-4` |
| Psychology | 1–4 | `science/psychology-1-2`, `science/psychology-3-4` |
| History | 1–4 | `humanities/history-1-2`, `humanities/history-3-4` |
| Geography | 1–4 | `humanities/geography-1-2`, `humanities/geography-3-4` |
| Economics | 1–4 | `humanities/economics-1-2`, `humanities/economics-3-4` |
| Legal Studies | 1–4 | `humanities/legal-studies-1-2`, `humanities/legal-studies-3-4` |
| Politics | 1–2 only | `humanities/politics-1-2` |
| Sociology | 1–4 | `humanities/sociology-1-2`, `humanities/sociology-3-4` |
| Accounting | 1–4 | `humanities/accounting-1-2`, `humanities/accounting-3-4` |
| Business Management | 1–4 | `humanities/business-management-1-2`, `humanities/business-management-3-4` |
| Art Making and Exhibiting | 1–4 | `arts/art-making-1-2`, `arts/art-making-3-4` |
| Visual Communication Design | 1–4 | `arts/visual-communication-design-1-2`, `arts/visual-communication-design-3-4` |
| Music | 1–4 | `arts/music-1-2`, `arts/music-3-4` |
| Media | 1–2 only | `arts/media-1-2` |
| Theatre Studies | 1–2 only | `arts/theatre-studies-1-2` |
| Applied Computing | 1–2 only | `technology/applied-computing-1-2` |
| Software Development | 3–4 only | `technology/software-development-3-4` |
| Chinese as a First Language | 1–4 | `languages/chinese/chinese-first-language-1-2`, `…-3-4` |
| Health and Human Development | 1–4 | `health-and-pe/health-and-human-development-1-2`, `…-3-4` |
| Physical Education | 1–4 | `health-and-pe/physical-education-1-2`, `…-3-4` |
| Outdoor and Environmental Studies | 1–4 | `health-and-pe/outdoor-and-environmental-studies-1-2`, `…-3-4` |

**Not offered at HRS** (folders removed): English EAL · Literature 3–4 ·
Modern History / Ancient History / Revolutions / Australian History as
separate subjects (HRS uses one combined "History 1–4").

---

## HRS subjects → brain-break app mapping

The brain-break app currently surfaces **five subjects**:
`english`, `maths`, `science`, `history`, `geography`.

| HRS subject | Maps to bank(s) | App support |
|---|---|---|
| English | `english` | ✅ ready |
| Literature (VCE) | `english` | ✅ feeds English bank |
| Mathematics + variants | `maths` | ✅ ready |
| Science (junior) | `science` | ✅ ready |
| Biology / Chemistry / Physics / Psychology | `science` | ✅ feeds Science bank |
| Humanities (Y7–10) | `history` + `geography` | ✅ ready |
| History / Geography (VCE) | `history` / `geography` | ✅ ready |
| Economics / Legal Studies / Politics / Sociology / Accounting / Business Management | — | ⚠️ partial — needs app extension or feeds humanities loosely |
| Arts (Art Making, VCD, Music, Media, Theatre Studies) | — | ❌ no app subject yet |
| Technology (Applied Computing, Software Development) | — | ❌ no app subject yet |
| Languages (Chinese, French) | — | ❌ no app subject yet |
| Health and PE / HHD / Outdoor & Env Studies | — | ❌ no app subject yet |
| Year-level electives (Drama, Food Tech, etc.) | varies — see per-elective | ⚠️ most pending |

---

## Per-subject content status

Initial baseline (Phases 1–5 of the AC V9 upgrade): all bank content
generated from Claude's training-time knowledge of AC V9. No HRS SAC or
unit-overview anchoring yet.

> Status values: **training-knowledge** (Claude default) ·
> **SAC-anchored** (HRS material processed) ·
> **n/a** (subject not offered at HRS for that level).

### English

| Year level | Status | Material received | Bank update commit |
|---|---|---|---|
| Y7 | training-knowledge | — | — |
| Y8 | training-knowledge | — | — |
| Y9 | training-knowledge | — | — |
| Y10 | training-knowledge | — | — |
| VCE English 1–2 | training-knowledge | — | — |
| VCE English 3–4 | training-knowledge | — | — |
| VCE Literature 1–2 | training-knowledge | — | — |

### Mathematics

| Year level | Status | Material received | Bank update commit |
|---|---|---|---|
| Y7 | training-knowledge | — | — |
| Y8 | training-knowledge | — | — |
| Y9 | training-knowledge | — | — |
| Y10 | training-knowledge | — | — |
| Methods 1–2 | training-knowledge | — | — |
| Methods 3–4 | training-knowledge | — | — |
| Specialist 1–2 | training-knowledge | — | — |
| Specialist 3–4 | training-knowledge | — | — |
| General 1–2 | training-knowledge | — | — |
| General 3–4 | training-knowledge | — | — |
| Foundation 1–2 | training-knowledge | — | — |
| Foundation 3–4 | training-knowledge | — | — |

### Science

| Year level | Status | Material received | Bank update commit |
|---|---|---|---|
| Y7 | training-knowledge | — | — |
| Y8 | training-knowledge | — | — |
| Y9 | training-knowledge | — | — |
| Y10 | training-knowledge | — | — |
| Biology 1–2 | training-knowledge | — | — |
| Biology 3–4 | training-knowledge | — | — |
| Chemistry 1–2 | training-knowledge | — | — |
| Chemistry 3–4 | training-knowledge | — | — |
| Physics 1–2 | training-knowledge | — | — |
| Physics 3–4 | training-knowledge | — | — |
| Psychology 1–2 | training-knowledge | — | — |
| Psychology 3–4 | training-knowledge | — | — |

### Humanities

(Feeds `history` + `geography` banks. Senior subjects map differently —
see mapping table above.)

| Year level | Status | Material received | Bank update commit |
|---|---|---|---|
| Y7 | training-knowledge | — | — |
| Y8 | training-knowledge | — | — |
| Y9 | training-knowledge | — | — |
| Y10 | training-knowledge | — | — |
| History 1–2 | training-knowledge | — | — |
| History 3–4 | training-knowledge | — | — |
| Geography 1–2 | training-knowledge | — | — |
| Geography 3–4 | training-knowledge | — | — |
| Economics 1–2 | training-knowledge | — | — |
| Economics 3–4 | training-knowledge | — | — |
| Legal Studies 1–2 | training-knowledge | — | — |
| Legal Studies 3–4 | training-knowledge | — | — |
| Politics 1–2 | training-knowledge | — | — |
| Sociology 1–2 | training-knowledge | — | — |
| Sociology 3–4 | training-knowledge | — | — |
| Accounting 1–2 | training-knowledge | — | — |
| Accounting 3–4 | training-knowledge | — | — |
| Business Management 1–2 | training-knowledge | — | — |
| Business Management 3–4 | training-knowledge | — | — |

### Arts

(Awaiting app support. Folder collects material now.)

| Subject | Material received |
|---|---|
| Art Making and Exhibiting 1–2 | — |
| Art Making and Exhibiting 3–4 | — |
| Visual Communication Design 1–2 | — |
| Visual Communication Design 3–4 | — |
| Music 1–2 | — |
| Music 3–4 | — |
| Media 1–2 | — |
| Theatre Studies 1–2 | — |

### Technology

(Awaiting app support.)

| Subject | Material received |
|---|---|
| Applied Computing 1–2 | — |
| Software Development 3–4 | — |

### Languages

(Awaiting app support.)

| Subject | Year levels covered | Material received |
|---|---|---|
| Chinese (Y7–9 elective) | Y7 / Y8 / Y9 | — |
| Chinese as a First Language 1–2 | VCE Y11 | — |
| Chinese as a First Language 3–4 | VCE Y12 | — |
| French (Y7–9 elective) | Y7 / Y8 / Y9 | — |

### Health and PE

(Awaiting app support.)

| Subject | Material received |
|---|---|
| Y7 HPE | — |
| Y8 HPE | — |
| Y9 HPE | — |
| Y10 HPE | — |
| Health and Human Development 1–2 | — |
| Health and Human Development 3–4 | — |
| Physical Education 1–2 | — |
| Physical Education 3–4 | — |
| Outdoor and Environmental Studies 1–2 | — |
| Outdoor and Environmental Studies 3–4 | — |

### Electives — Year 8

| Elective | Likely bank | Material received |
|---|---|---|
| Drama | — | — |
| Food Technology | — | — |
| Forensic Science | `science` | — |
| Game Development | `maths` | — |
| Mechatronics | `maths` + `science` | — |
| Media | `english` | — |
| Music | — | — |
| Sports Performance | — | — |
| The Power of Words | `english` | — |
| Visual Art | — | — |
| Visual Communication and Design | — | — |
| Woodwork | — | — |

### Electives — Year 9

| Elective | Likely bank | Material received |
|---|---|---|
| CodeCraft | `maths` (logic) | — |
| Drama | — | — |
| Entrepreneurship and Commerce | `humanities` (business) | — |
| Food Technology | — | — |
| Literature | `english` | — |
| Media | `english` | — |
| Music | — | — |
| Politics | `humanities` | — |
| Recreational Studies | — | — |
| Visual Art | — | — |
| Visual Communication and Design | — | — |
| Woodwork | — | — |

---

## Session log

### 2026-05-26 — Folder scaffolding (HRS-aligned)
- Restructured `source-material/` to mirror HRS subject organisation
  (replaced raw `history/` + `geography/` with `humanities/`; added
  `languages/`, `health-and-pe/`, `electives/year-8/`).
- Confirmed Year 8 elective list (12 electives).

### 2026-05-26 — Y9 electives + full HRS senior alignment
- **Year 9 electives created** (12) in `electives/year-9/` —
  CodeCraft, Drama, Entrepreneurship and Commerce, Food Technology,
  Literature, Media, Music, Politics, Recreational Studies, Visual Art,
  Visual Communication and Design, Woodwork.
- **Year 10 mapping documented** above (Y10s drop content into the
  relevant VCE Units 1–2 folder when they're enrolled in VCE early).
- **Full HRS senior list integrated**:
  - Removed non-HRS folders: `english/eal-1-2`, `english/eal-3-4`,
    `english/literature-3-4`, and all the
    Modern/Ancient/Revolutions/Australian History variants under
    `humanities/`.
  - Added HRS-offered VCE humanities subjects (`history-1-2`,
    `history-3-4`, `politics-1-2`, `sociology-1-2`, `sociology-3-4`,
    `accounting-1-2`, `accounting-3-4`, `business-management-1-2`,
    `business-management-3-4`).
  - Added new top-level **`arts/`** folder with art-making, visual
    communication design, music, media, and theatre studies (HRS-only
    unit coverage).
  - Added new top-level **`technology/`** folder with
    `applied-computing-1-2` and `software-development-3-4` (HRS-only
    unit coverage — Software Development is genuinely 3–4 only at VCE).
  - Added `chinese-first-language-1-2/3-4` under `languages/chinese/`.
  - Added the three VCE HPE subjects under `health-and-pe/`
    (Health and Human Development, Physical Education, Outdoor and
    Environmental Studies).
- `.gitignore` updated with two new top-level subject roots
  (`arts/`, `technology/`).
- `PROGRESS-LOG.md` and `README.md` updated with the complete HRS
  catalog.
- Year 7 electives pending — user will share when ready.
- No source material received yet. No bank content updated yet.
