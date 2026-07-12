# Source Material Progress Log

The **per-class content tracker** for the Brain Breaks onboarding
campaign. Scope: **Year 7–10 classes only** (decision 2026-07-08).

Update this file every session that receives materials or advances a
class through the pipeline. The machine-readable source of truth for
the final state is the `anchored: true` flag in `src/data/classes.ts`;
this file tracks the human-visible journey to get there.

> The pre-2026-07-08 version of this file (full VCE-era HRS catalog,
> electives, languages) is preserved in git history.

---

## The pipeline

Each class moves through four stages:

| Stage | Meaning |
|---|---|
| **Materials** | Teaching documents dropped in `source-material/<folder>/` |
| **Overview** | `_overview.md` filled in (drives all authoring — misconceptions list is the biggest quality lever) |
| **Anchored** | `anchored: true` in classes.ts + full bank authored (default: 302 MCQ + 75 OOO + 75 TL = 452 items) |
| **Audited** | SKILL §5g three-tier rigour audit clean (Only/Just, em-dash, length asymmetry) |

Onboarding runs as a session per class — see
`.claude/skills/onboard-class/SKILL.md` and the bootstrap message in
`JACK-NOTES.md`.

---

## Tracker — 20 in-scope classes

### English

| Class | Folder | Materials | Overview | Anchored | Audited | Commit |
|---|---|---|---|---|---|---|
| Year 7 English | `english/year-7/` | — | — | — | — | — |
| Year 8 English | `english/year-8/` | — | — | — | — | — |
| Year 9 English | `english/year-9/` | — | — | — | — | — |
| Year 10 English | `english/year-10/` | — | — | — | — | — |

### Maths

| Class | Folder | Materials | Overview | Anchored | Audited | Commit |
|---|---|---|---|---|---|---|
| Year 7 Maths | `maths/year-7/` | — | — | — | — | — |
| Year 8 Maths | `maths/year-8/` | — | — | — | — | — |
| Year 9 Maths | `maths/year-9/` | — | — | — | — | — |
| Year 10 Maths | `maths/year-10/` | ✅ 2026-06-03 | ✅ (905-line gold standard) | ✅ 452 items | ✅ | `17ae225` |

> Y10 Maths was onboarded on the old Windows machine; its source files
> and overview were not migrated to the Mac (not needed — class
> complete). Use its WORKLOG record (§7.4, 2026-06-03 handoff) as the
> reference for future onboardings.

### Science

| Class | Folder | Materials | Overview | Anchored | Audited | Commit |
|---|---|---|---|---|---|---|
| Year 7 Science | `science/year-7/` | — | — | — | — | — |
| Year 8 Science | `science/year-8/` | — | — | — | — | — |
| Year 9 Science | `science/year-9/` | — | — | — | — | — |
| Year 10 Science | `science/year-10/` | — | — | — | — | — |

### Humanities

| Class | Folder | Materials | Overview | Anchored | Audited | Commit |
|---|---|---|---|---|---|---|
| Year 7 Humanities | `humanities/year-7/` | ✅ 2026-07-12 (9 unit PDFs) | ✅ 2026-07-12 | ✅ 452 items (302 MCQ + 75 OOO + 75 TL) | ✅ all tiers clean | pending |
| Year 8 Humanities | `humanities/year-8/` | — | — | — | — | — |
| Year 9 Humanities | `humanities/year-9/` | — | — | — | — | — |
| Year 10 Humanities | `humanities/year-10/` | — | — | — | — | — |

### Health & PE

| Class | Folder | Materials | Overview | Anchored | Audited | Commit |
|---|---|---|---|---|---|---|
| Year 7 Health & PE | `health-and-pe/year-7/` | — | — | — | — | — |
| Year 8 Health & PE | `health-and-pe/year-8/` | — | — | — | — | — |
| Year 9 Health & PE | `health-and-pe/year-9/` | — | — | — | — | — |
| Year 10 Health & PE | `health-and-pe/year-10/` | — | — | — | — | — |

**Progress: 2 / 20 classes anchored (Y10 Maths, Y7 Humanities — both at the full 452-item distribution).**

---

## Out of scope

| What | Since | Notes |
|---|---|---|
| VCE Units 1–2 and 3–4 | 2026-06-03 | Classes, year bands and ~700 content items removed (commit `3cd12b7`) |
| Foundation–Year 6 | 2026-07-08 | No content development — but the F–2 / 3–6 bands, primary classes and generic items **stay in the app by design** (Jack's call): teachers of younger cohorts keep the generic experience |
| Arts / Electives / Languages | 2026-07-08 | Source folders removed; the 32 class entries (24 electives + 8 Chinese/French) and the `computing` subject removed from the app same day |

---

## Session log

- **2026-05-26** — folder scaffolding aligned to the full HRS catalog
  (Middle School + VCE senior offerings, electives, languages). Details
  in git history of this file.
- **2026-07-08** — rebuilt as the Y7–10 per-class tracker following the
  scope-narrowing decision. Arts/electives/languages folders removed.
