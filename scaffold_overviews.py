"""Create an _overview.md template in each in-scope class folder.

Scope is Year 7-10 x the five HRS subjects (20 classes, matching the
Y7-10 entries in src/data/classes.ts). Missing folders are created;
existing _overview.md files are never touched. Cross-class reference
material lives in source-material/_reference/ and gets no template.

    py scaffold_overviews.py        (Windows)
    python3 scaffold_overviews.py   (macOS)
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent / 'source-material'

SUBJECTS = {
    'english': 'English',
    'maths': 'Maths',
    'science': 'Science',
    'humanities': 'Humanities',
    'health-and-pe': 'Health and PE',
}
YEARS = range(7, 11)

TEMPLATE_BODY = '''
> Drop this class's materials in this folder (unit plans, term planners,
> topic tests with solutions, assignment briefs, rubrics, textbook
> chapters, revision sheets). Claude drafts this overview from them, and
> also reads source-material/_reference/ (AC V9, HRS scope & sequences,
> VCE study designs for pathway context). You review it, especially the
> misconceptions list, before any questions are written.

## Scope this year

[1-2 sentences on the big picture.]

## Topic sequence

[Topics in teaching order with approximate timing.]

1. **[Topic name]** (Term 1, weeks 1-N)
   - Key concepts:
   - Vocabulary students should know by the end:
   - AC V9 codes: [e.g. AC9M8N01]
   - Source files: [which files in this folder cover it]

## Assessment style

[How tasks are structured at HRS: tests, assignments, rubrics, the kind
of questions students meet.]

## Depth expectations

- **Fluent recall:** [list]
- **Recognise but not produce:** [list]
- **Out of scope:** [list, including anything that belongs in VCE]

## Common misconceptions

[The single biggest quality lever: these become the wrong answers in
Quick Quiz and the lies in Two Truths.]

- [misconception]

## Notes for question generation

[Tone, texts to reference, local (NT / Darwin) examples, things to avoid.]

---

_Last updated: [DATE]_
'''


def main() -> None:
    created = 0
    for slug, label in SUBJECTS.items():
        for year in YEARS:
            folder = ROOT / slug / f'year-{year}'
            folder.mkdir(parents=True, exist_ok=True)
            overview = folder / '_overview.md'
            if overview.exists():
                continue
            overview.write_text(f'# Year {year} {label}\n{TEMPLATE_BODY}', encoding='utf-8')
            created += 1
            print(f'Created: source-material/{slug}/year-{year}/_overview.md')
    print(f'\nDone. Created {created} templates; existing overviews left as they were.')


if __name__ == '__main__':
    main()
