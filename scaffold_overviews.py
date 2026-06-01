"""One-off script: create _overview.md templates in every leaf folder
under source-material/. Pre-fills a sensible heading per folder."""

from pathlib import Path

ROOT = Path(__file__).resolve().parent / 'source-material'

# Subjects when shown after a "Year N " prefix
SUBJECT_LABELS = {
    'english': 'English',
    'maths': 'Maths',
    'science': 'Science',
    'humanities': 'Humanities',
    'health-and-pe': 'Health and PE',
}

# Display names for VCE senior variants and electives where folder name
# would otherwise title-case awkwardly.
DISPLAY_NAMES = {
    # English
    'units': 'English',                     # english/units-1-2 → "VCE English Units 1-2"
    'literature': 'Literature',
    # Maths
    'methods': 'Mathematical Methods',
    'general': 'General Mathematics',
    'specialist': 'Specialist Mathematics',
    'foundation': 'Foundation Mathematics',
    # Science
    'biology': 'Biology',
    'chemistry': 'Chemistry',
    'physics': 'Physics',
    'psychology': 'Psychology',
    # Humanities (VCE)
    'history': 'History',
    'geography': 'Geography',
    'economics': 'Economics',
    'legal-studies': 'Legal Studies',
    'politics': 'Politics',
    'sociology': 'Sociology',
    'accounting': 'Accounting',
    'business-management': 'Business Management',
    # Arts
    'art-making': 'Art Making and Exhibiting',
    'visual-communication-design': 'Visual Communication Design',
    'music': 'Music',
    'media': 'Media',
    'theatre-studies': 'Theatre Studies',
    # Technology
    'applied-computing': 'Applied Computing',
    'software-development': 'Software Development',
    # Languages
    'chinese-first-language': 'Chinese as a First Language',
    # Health & PE
    'health-and-human-development': 'Health and Human Development',
    'physical-education': 'Physical Education',
    'outdoor-and-environmental-studies': 'Outdoor and Environmental Studies',
    # Y8 electives
    'drama': 'Drama',
    'food-technology': 'Food Technology',
    'forensic-science': 'Forensic Science',
    'game-development': 'Game Development',
    'mechatronics': 'Mechatronics',
    'sports-performance': 'Sports Performance',
    'the-power-of-words': 'The Power of Words',
    'visual-art': 'Visual Art',
    'visual-communication-and-design': 'Visual Communication and Design',
    'woodwork': 'Woodwork',
    # Y9 electives
    'codecraft': 'CodeCraft',
    'entrepreneurship-and-commerce': 'Entrepreneurship and Commerce',
    'recreational-studies': 'Recreational Studies',
}

SMALL_WORDS = {'and', 'or', 'the', 'of', 'in', 'on', 'a', 'as'}


def title_case(s: str) -> str:
    """Hyphen-separated to space-separated title case, lower-casing 'and' etc."""
    words = s.split('-')
    out = []
    for i, w in enumerate(words):
        if i > 0 and w in SMALL_WORDS:
            out.append(w)
        else:
            out.append(w.capitalize())
    return ' '.join(out)


def display(slug: str) -> str:
    return DISPLAY_NAMES.get(slug, title_case(slug))


PRIMARY_BANDS = {
    'f-2': 'Lower Primary (F–Year 2)',
    '3-6': 'Upper Primary (Years 3–6)',
    'f-6': 'Primary (Foundation–Year 6)',
}


def derive_heading(rel: Path) -> str:
    parts = rel.parts

    # subject/<primary-band>
    if len(parts) == 2 and parts[1] in PRIMARY_BANDS:
        subj = SUBJECT_LABELS.get(parts[0], title_case(parts[0]))
        return f'{PRIMARY_BANDS[parts[1]]} {subj}'

    # subject/year-N (core year-level)
    if len(parts) == 2 and parts[1].startswith('year-'):
        year_no = parts[1].split('-', 1)[1]
        subj = SUBJECT_LABELS.get(parts[0], title_case(parts[0]))
        return f'Year {year_no} {subj}'

    # subject/<variant>-1-2 or -3-4 (VCE senior unit)
    if len(parts) == 2 and (parts[1].endswith('-1-2') or parts[1].endswith('-3-4')):
        units = '1-2' if parts[1].endswith('-1-2') else '3-4'
        variant = parts[1][:-4]
        return f'VCE {display(variant)} Units {units}'

    # electives/year-N/<elective>
    if len(parts) == 3 and parts[0] == 'electives':
        year_no = parts[1].split('-', 1)[1]
        return f'Year {year_no} {display(parts[2])} (elective)'

    # languages/<lang>/year-N
    if len(parts) == 3 and parts[0] == 'languages' and parts[2].startswith('year-'):
        year_no = parts[2].split('-', 1)[1]
        lang = parts[1].capitalize()
        return f'Year {year_no} {lang}'

    # languages/<lang>/<variant>-1-2 or -3-4 (e.g. chinese-first-language-3-4)
    if len(parts) == 3 and parts[0] == 'languages' and (
        parts[2].endswith('-1-2') or parts[2].endswith('-3-4')
    ):
        units = '1-2' if parts[2].endswith('-1-2') else '3-4'
        variant = parts[2][:-4]
        return f'VCE {display(variant)} Units {units}'

    # Fallback
    return ' / '.join(parts)


TEMPLATE_BODY = '''
> Paste your content into the sections below. You don't need to fill in
> every section — anything you give me is better than nothing. The more
> detail, the more curriculum-anchored my brain-break questions become.
> Delete this note when you're done.
>
> Sources that work well here (use whatever you have):
>   - Y7–10: unit overviews, term planners, assignment briefs, rubrics
>   - Y11 (Units 1–2): unit overviews, outcome assessment tasks
>   - Y12 (Units 3–4): SACs, unit outlines, practice exams

## Scope this year/unit

[1–2 sentences on the big picture. Example: "Students develop close
reading skills with focus on persuasive language analysis and short
narrative writing."]

## Topic sequence

[List topics in teaching order with approximate timing. Each topic gets
key concepts, vocabulary, and AC V9 codes if known.]

1. **[Topic 1 name]** (Term 1, weeks 1–N)
   - Key concepts:
     - [concept]
   - Vocabulary students should know by end:
     - [term, term, term]
   - AC V9 codes (if known): [e.g. AC9E8LA01]

2. **[Topic 2 name]** (Term 1, weeks N–N)
   - Key concepts:
   - Vocabulary:
   - AC V9 codes:

[Add as many topics as you teach. Skip sections you don't have time for.]

## Assessment style

[How are tasks structured at HRS? Examples: "Short-answer + extended
paragraph response", "Source analysis with quote integration",
"Multi-step problem-solving with working shown", "Practical lab report
with hypothesis / method / conclusion". For Units 3–4, describe SAC
formats. For Y7–10, describe the assignment / test format students
encounter.]

## Depth expectations

- **Fluent recall** — things students should know off the top of their head: [list]
- **Recognise but not produce** — things they should identify but not generate: [list]
- **Out of scope** — things NOT to ask about: [list]

## Common misconceptions

[Errors teachers regularly correct. These make great MCQ distractors.]

- [misconception]
- [sticking point]

## Notes for question generation

[Anything else? Tone, specific texts to reference, regional flavour,
things to avoid. Even one sentence is valuable.]

---

_Last updated: [DATE]_
_Other files in this folder: [list any PDFs or supporting files you've added]_
'''


def is_leaf(path: Path) -> bool:
    return path.is_dir() and not any(p.is_dir() for p in path.iterdir())


def main() -> None:
    created = 0
    skipped = 0
    for path in sorted(ROOT.rglob('*')):
        if not is_leaf(path):
            continue
        rel = path.relative_to(ROOT)
        overview = path / '_overview.md'
        if overview.exists():
            skipped += 1
            continue
        heading = derive_heading(rel)
        overview.write_text(f'# {heading}\n{TEMPLATE_BODY}', encoding='utf-8')
        created += 1
        print(f'Created: source-material/{rel}/_overview.md  ->  "{heading}"')
    print(f'\nDone. Created {created} templates, skipped {skipped} existing.')


if __name__ == '__main__':
    main()
