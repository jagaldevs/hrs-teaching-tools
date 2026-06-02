import type { Stream } from './games';
import type { Subject } from '../games/types';

/**
 * HRS class registry.
 *
 * Replaces the AC V9 stream + subject filter model with per-class targeting.
 * Each class corresponds (loosely) to a leaf folder under `source-material/`
 * — e.g. `technology/software-development-3-4/` ↔ class id
 * `vce-software-development-3-4`.
 *
 * Anchored classes have ≥ 1 question bank populated with class-specific
 * items via `Bank<Q>.byClass[id]`. Unanchored classes still appear in the
 * picker but their content is backfilled from the legacy
 * `byStreamSubject[legacyStream][subject]` pool, narrowed by `legacyUnits`
 * when set.
 *
 * See PLAN-CLASS-FILTER.md for the data-model rationale and rollout phases.
 */

// ============================================================
//  Year bands (the top-level picker on landing + SetupScreen)
// ============================================================

export type YearBand =
  | 'f-2' | '3-6' | 'y7' | 'y8' | 'y9' | 'y10'
  | 'vce-1-2' | 'vce-3-4';

export interface YearBandDef {
  id: YearBand;
  label: string;
  shortLabel: string;
  /** Sort order in the chip strip (low → high, left → right). */
  ordering: number;
}

export const YEAR_BANDS: YearBandDef[] = [
  { id: 'f-2',     label: 'Foundation – Year 2', shortLabel: 'F–2',  ordering: 1 },
  { id: '3-6',     label: 'Years 3–6',           shortLabel: '3–6',  ordering: 2 },
  { id: 'y7',      label: 'Year 7',              shortLabel: 'Y7',   ordering: 3 },
  { id: 'y8',      label: 'Year 8',              shortLabel: 'Y8',   ordering: 4 },
  { id: 'y9',      label: 'Year 9',              shortLabel: 'Y9',   ordering: 5 },
  { id: 'y10',     label: 'Year 10',             shortLabel: 'Y10',  ordering: 6 },
  { id: 'vce-1-2', label: 'VCE Units 1–2 (Year 11)', shortLabel: 'VCE 1–2', ordering: 7 },
  { id: 'vce-3-4', label: 'VCE Units 3–4 (Year 12)', shortLabel: 'VCE 3–4', ordering: 8 },
];

// ============================================================
//  HrsClass — the per-class registry entry
// ============================================================

export interface HrsClass {
  /** Stable kebab-case id. Used as the bank key for anchored content. */
  id: string;
  yearBand: YearBand;
  /**
   * Display name — full form per PLAN Q1, e.g.
   *   "VCE Software Development 3-4"
   *   "Year 8 Science"
   *   "Lower Primary English"
   */
  name: string;
  /** Used for chip colour and broad categorisation. */
  subject: Subject;
  /** Path within source-material/ for human reference. */
  sourcePath?: string;
  /**
   * `true` when this class has populated source material AND at least one
   * bank carries class-specific items in `byClass[id]`. Manual flag —
   * I'll bump it as classes graduate from generic-backfill to anchored.
   */
  anchored?: boolean;
  /** Used by pickFromClass() to backfill from generic AC V9 pool. */
  legacyStream?: Stream;
  /** For VCE classes: narrow legacy MCQ pool to these unit tags. */
  legacyUnits?: (1 | 2 | 3 | 4)[];
}

// Helpers for building entries with sensible defaults --------------------

function f2(id: string, name: string, subject: Subject, sourcePath: string): HrsClass {
  return { id, yearBand: 'f-2', name, subject, sourcePath, legacyStream: 'lower_primary' };
}
function p36(id: string, name: string, subject: Subject, sourcePath: string): HrsClass {
  return { id, yearBand: '3-6', name, subject, sourcePath, legacyStream: 'upper_primary' };
}
function y7(id: string, name: string, subject: Subject, sourcePath: string): HrsClass {
  return { id, yearBand: 'y7', name, subject, sourcePath, legacyStream: 'middle_school' };
}
function y8(id: string, name: string, subject: Subject, sourcePath: string): HrsClass {
  return { id, yearBand: 'y8', name, subject, sourcePath, legacyStream: 'middle_school' };
}
function y9(id: string, name: string, subject: Subject, sourcePath: string): HrsClass {
  return { id, yearBand: 'y9', name, subject, sourcePath, legacyStream: 'middle_school' };
}
function y10(id: string, name: string, subject: Subject, sourcePath: string): HrsClass {
  return { id, yearBand: 'y10', name, subject, sourcePath, legacyStream: 'senior_school' };
}
function vce12(id: string, name: string, subject: Subject, sourcePath: string): HrsClass {
  return { id, yearBand: 'vce-1-2', name, subject, sourcePath, legacyStream: 'senior_school', legacyUnits: [1, 2] };
}
function vce34(id: string, name: string, subject: Subject, sourcePath: string, anchored = false): HrsClass {
  return { id, yearBand: 'vce-3-4', name, subject, sourcePath, anchored, legacyStream: 'senior_school', legacyUnits: [3, 4] };
}

// ============================================================
//  The classes themselves
// ============================================================
//
// Note on the 'general' subject:
//   Languages, electives, the arts and Health & PE don't map cleanly to
//   the six current Subject options. They're tagged `general` for chip-
//   colour purposes; once those classes get anchored we may introduce
//   new Subject entries (`languages`, `arts`, `health-pe`).
//
// Note on primary humanities:
//   F-2 and 3-6 HASS is integrated (history + geography + economics).
//   We tag those classes as `history` since it's the dominant strand
//   and the chip colour fits.
//
// Note on Y7-9 cores:
//   Core subjects are repeated per year level so a teacher targeting
//   "Year 8 Science" never accidentally pulls Y7 or Y9 content. They
//   share the same `middle_school` legacy stream for backfill until
//   year-specific items are authored.
//

export const HRS_CLASSES: HrsClass[] = [
  // -- F-2 (Foundation – Year 2) -------------------------------
  f2('f2-english',    'Lower Primary English',    'english', 'english/f-2'),
  f2('f2-maths',      'Lower Primary Maths',      'maths',   'maths/f-2'),
  f2('f2-science',    'Lower Primary Science',    'science', 'science/f-2'),
  f2('f2-humanities', 'Lower Primary Humanities', 'history', 'humanities/f-2'),

  // -- 3-6 (Years 3–6) -----------------------------------------
  p36('3-6-english',    'Upper Primary English',    'english', 'english/3-6'),
  p36('3-6-maths',      'Upper Primary Maths',      'maths',   'maths/3-6'),
  p36('3-6-science',    'Upper Primary Science',    'science', 'science/3-6'),
  p36('3-6-humanities', 'Upper Primary Humanities', 'history', 'humanities/3-6'),

  // -- Year 7 --------------------------------------------------
  y7('y7-english',      'Year 7 English',      'english', 'english/year-7'),
  y7('y7-maths',        'Year 7 Maths',        'maths',   'maths/year-7'),
  y7('y7-science',      'Year 7 Science',      'science', 'science/year-7'),
  y7('y7-humanities',   'Year 7 Humanities',   'history', 'humanities/year-7'),
  y7('y7-chinese',      'Year 7 Chinese',      'general', 'languages/chinese/year-7'),
  y7('y7-french',       'Year 7 French',       'general', 'languages/french/year-7'),
  y7('y7-health-pe',    'Year 7 Health & PE',  'general', 'health-and-pe/year-7'),

  // -- Year 8 core ---------------------------------------------
  y8('y8-english',      'Year 8 English',      'english', 'english/year-8'),
  y8('y8-maths',        'Year 8 Maths',        'maths',   'maths/year-8'),
  y8('y8-science',      'Year 8 Science',      'science', 'science/year-8'),
  y8('y8-humanities',   'Year 8 Humanities',   'history', 'humanities/year-8'),
  y8('y8-chinese',      'Year 8 Chinese',      'general', 'languages/chinese/year-8'),
  y8('y8-french',       'Year 8 French',       'general', 'languages/french/year-8'),
  y8('y8-health-pe',    'Year 8 Health & PE',  'general', 'health-and-pe/year-8'),
  // -- Year 8 electives ----------------------------------------
  y8('y8-drama',                       'Year 8 Drama (elective)',                            'general', 'electives/year-8/drama'),
  y8('y8-food-technology',             'Year 8 Food Technology (elective)',                  'general', 'electives/year-8/food-technology'),
  y8('y8-forensic-science',            'Year 8 Forensic Science (elective)',                 'science', 'electives/year-8/forensic-science'),
  y8('y8-game-development',            'Year 8 Game Development (elective)',                 'computing','electives/year-8/game-development'),
  y8('y8-mechatronics',                'Year 8 Mechatronics (elective)',                     'general', 'electives/year-8/mechatronics'),
  y8('y8-media',                       'Year 8 Media (elective)',                            'general', 'electives/year-8/media'),
  y8('y8-music',                       'Year 8 Music (elective)',                            'general', 'electives/year-8/music'),
  y8('y8-sports-performance',          'Year 8 Sports Performance (elective)',               'general', 'electives/year-8/sports-performance'),
  y8('y8-the-power-of-words',          'Year 8 The Power of Words (elective)',               'english', 'electives/year-8/the-power-of-words'),
  y8('y8-visual-art',                  'Year 8 Visual Art (elective)',                       'general', 'electives/year-8/visual-art'),
  y8('y8-visual-comm-design',          'Year 8 Visual Communication and Design (elective)',  'general', 'electives/year-8/visual-communication-and-design'),
  y8('y8-woodwork',                    'Year 8 Woodwork (elective)',                         'general', 'electives/year-8/woodwork'),

  // -- Year 9 core ---------------------------------------------
  y9('y9-english',      'Year 9 English',      'english', 'english/year-9'),
  y9('y9-maths',        'Year 9 Maths',        'maths',   'maths/year-9'),
  y9('y9-science',      'Year 9 Science',      'science', 'science/year-9'),
  y9('y9-humanities',   'Year 9 Humanities',   'history', 'humanities/year-9'),
  y9('y9-chinese',      'Year 9 Chinese',      'general', 'languages/chinese/year-9'),
  y9('y9-french',       'Year 9 French',       'general', 'languages/french/year-9'),
  y9('y9-health-pe',    'Year 9 Health & PE',  'general', 'health-and-pe/year-9'),
  // -- Year 9 electives ----------------------------------------
  y9('y9-codecraft',                   'Year 9 CodeCraft (elective)',                        'computing','electives/year-9/codecraft'),
  y9('y9-drama',                       'Year 9 Drama (elective)',                            'general', 'electives/year-9/drama'),
  y9('y9-entrepreneurship-commerce',   'Year 9 Entrepreneurship and Commerce (elective)',    'general', 'electives/year-9/entrepreneurship-and-commerce'),
  y9('y9-food-technology',             'Year 9 Food Technology (elective)',                  'general', 'electives/year-9/food-technology'),
  y9('y9-literature',                  'Year 9 Literature (elective)',                       'english', 'electives/year-9/literature'),
  y9('y9-media',                       'Year 9 Media (elective)',                            'general', 'electives/year-9/media'),
  y9('y9-music',                       'Year 9 Music (elective)',                            'general', 'electives/year-9/music'),
  y9('y9-politics',                    'Year 9 Politics (elective)',                         'history', 'electives/year-9/politics'),
  y9('y9-recreational-studies',        'Year 9 Recreational Studies (elective)',             'general', 'electives/year-9/recreational-studies'),
  y9('y9-visual-art',                  'Year 9 Visual Art (elective)',                       'general', 'electives/year-9/visual-art'),
  y9('y9-visual-comm-design',          'Year 9 Visual Communication and Design (elective)',  'general', 'electives/year-9/visual-communication-and-design'),
  y9('y9-woodwork',                    'Year 9 Woodwork (elective)',                         'general', 'electives/year-9/woodwork'),

  // -- Year 10 -------------------------------------------------
  y10('y10-english',     'Year 10 English',     'english', 'english/year-10'),
  y10('y10-maths',       'Year 10 Maths',       'maths',   'maths/year-10'),
  y10('y10-science',     'Year 10 Science',     'science', 'science/year-10'),
  y10('y10-humanities',  'Year 10 Humanities',  'history', 'humanities/year-10'),
  y10('y10-chinese',     'Year 10 Chinese',     'general', 'languages/chinese/year-10'),
  y10('y10-french',      'Year 10 French',      'general', 'languages/french/year-10'),
  y10('y10-health-pe',   'Year 10 Health & PE', 'general', 'health-and-pe/year-10'),

  // -- VCE Units 1–2 (Year 11) ---------------------------------
  // English
  vce12('vce-english-1-2',              'VCE English 1-2',                       'english', 'english/units-1-2'),
  vce12('vce-literature-1-2',           'VCE Literature 1-2',                    'english', 'english/literature-1-2'),
  // Maths
  vce12('vce-methods-1-2',              'VCE Mathematical Methods 1-2',          'maths',   'maths/methods-1-2'),
  vce12('vce-general-maths-1-2',        'VCE General Mathematics 1-2',           'maths',   'maths/general-1-2'),
  vce12('vce-specialist-1-2',           'VCE Specialist Mathematics 1-2',        'maths',   'maths/specialist-1-2'),
  vce12('vce-foundation-1-2',           'VCE Foundation Mathematics 1-2',        'maths',   'maths/foundation-1-2'),
  // Science
  vce12('vce-biology-1-2',              'VCE Biology 1-2',                       'science', 'science/biology-1-2'),
  vce12('vce-chemistry-1-2',            'VCE Chemistry 1-2',                     'science', 'science/chemistry-1-2'),
  vce12('vce-physics-1-2',              'VCE Physics 1-2',                       'science', 'science/physics-1-2'),
  vce12('vce-psychology-1-2',           'VCE Psychology 1-2',                    'science', 'science/psychology-1-2'),
  // Humanities
  vce12('vce-history-1-2',              'VCE History 1-2',                       'history',   'humanities/history-1-2'),
  vce12('vce-geography-1-2',            'VCE Geography 1-2',                     'geography', 'humanities/geography-1-2'),
  vce12('vce-economics-1-2',            'VCE Economics 1-2',                     'history',   'humanities/economics-1-2'),
  vce12('vce-legal-studies-1-2',        'VCE Legal Studies 1-2',                 'history',   'humanities/legal-studies-1-2'),
  vce12('vce-politics-1-2',             'VCE Politics 1-2',                      'history',   'humanities/politics-1-2'),
  vce12('vce-sociology-1-2',            'VCE Sociology 1-2',                     'history',   'humanities/sociology-1-2'),
  vce12('vce-accounting-1-2',           'VCE Accounting 1-2',                    'history',   'humanities/accounting-1-2'),
  vce12('vce-business-management-1-2',  'VCE Business Management 1-2',           'history',   'humanities/business-management-1-2'),
  // Arts
  vce12('vce-art-making-1-2',           'VCE Art Making and Exhibiting 1-2',     'general', 'arts/art-making-1-2'),
  vce12('vce-visual-comm-design-1-2',   'VCE Visual Communication Design 1-2',   'general', 'arts/visual-communication-design-1-2'),
  vce12('vce-music-1-2',                'VCE Music 1-2',                         'general', 'arts/music-1-2'),
  vce12('vce-media-1-2',                'VCE Media 1-2',                         'general', 'arts/media-1-2'),
  vce12('vce-theatre-studies-1-2',      'VCE Theatre Studies 1-2',               'general', 'arts/theatre-studies-1-2'),
  // Technology
  vce12('vce-applied-computing-1-2',    'VCE Applied Computing 1-2',             'computing','technology/applied-computing-1-2'),
  // Languages
  vce12('vce-chinese-1-2',              'VCE Chinese 1-2',                       'general', 'languages/chinese'),
  vce12('vce-chinese-first-lang-1-2',   'VCE Chinese as a First Language 1-2',   'general', 'languages/chinese/chinese-first-language-1-2'),
  // Health & PE
  vce12('vce-hhd-1-2',                  'VCE Health and Human Development 1-2',  'general', 'health-and-pe/health-and-human-development-1-2'),
  vce12('vce-oes-1-2',                  'VCE Outdoor and Environmental Studies 1-2', 'general', 'health-and-pe/outdoor-and-environmental-studies-1-2'),
  vce12('vce-pe-1-2',                   'VCE Physical Education 1-2',            'general', 'health-and-pe/physical-education-1-2'),

  // -- VCE Units 3–4 (Year 12) ---------------------------------
  // English
  vce34('vce-english-3-4',              'VCE English 3-4',                       'english', 'english/units-3-4'),
  // Maths
  vce34('vce-methods-3-4',              'VCE Mathematical Methods 3-4',          'maths',   'maths/methods-3-4'),
  vce34('vce-general-maths-3-4',        'VCE General Mathematics 3-4',           'maths',   'maths/general-3-4'),
  vce34('vce-specialist-3-4',           'VCE Specialist Mathematics 3-4',        'maths',   'maths/specialist-3-4'),
  vce34('vce-foundation-3-4',           'VCE Foundation Mathematics 3-4',        'maths',   'maths/foundation-3-4'),
  // Science
  vce34('vce-biology-3-4',              'VCE Biology 3-4',                       'science', 'science/biology-3-4'),
  vce34('vce-chemistry-3-4',            'VCE Chemistry 3-4',                     'science', 'science/chemistry-3-4'),
  vce34('vce-physics-3-4',              'VCE Physics 3-4',                       'science', 'science/physics-3-4'),
  vce34('vce-psychology-3-4',           'VCE Psychology 3-4',                    'science', 'science/psychology-3-4'),
  // Humanities
  vce34('vce-history-3-4',              'VCE History 3-4',                       'history',   'humanities/history-3-4'),
  vce34('vce-geography-3-4',            'VCE Geography 3-4',                     'geography', 'humanities/geography-3-4'),
  vce34('vce-economics-3-4',            'VCE Economics 3-4',                     'history',   'humanities/economics-3-4'),
  vce34('vce-legal-studies-3-4',        'VCE Legal Studies 3-4',                 'history',   'humanities/legal-studies-3-4'),
  vce34('vce-sociology-3-4',            'VCE Sociology 3-4',                     'history',   'humanities/sociology-3-4'),
  vce34('vce-accounting-3-4',           'VCE Accounting 3-4',                    'history',   'humanities/accounting-3-4'),
  vce34('vce-business-management-3-4',  'VCE Business Management 3-4',           'history',   'humanities/business-management-3-4'),
  // Arts
  vce34('vce-art-making-3-4',           'VCE Art Making and Exhibiting 3-4',     'general', 'arts/art-making-3-4'),
  vce34('vce-visual-comm-design-3-4',   'VCE Visual Communication Design 3-4',   'general', 'arts/visual-communication-design-3-4'),
  vce34('vce-music-3-4',                'VCE Music 3-4',                         'general', 'arts/music-3-4'),
  // Technology — the ONE anchored class so far (250 items)
  vce34('vce-software-development-3-4', 'VCE Software Development 3-4',          'computing','technology/software-development-3-4', /* anchored */ true),
  // Languages
  vce34('vce-chinese-3-4',              'VCE Chinese 3-4',                       'general', 'languages/chinese'),
  vce34('vce-chinese-first-lang-3-4',   'VCE Chinese as a First Language 3-4',   'general', 'languages/chinese/chinese-first-language-3-4'),
  // Health & PE
  vce34('vce-hhd-3-4',                  'VCE Health and Human Development 3-4',  'general', 'health-and-pe/health-and-human-development-3-4'),
  vce34('vce-oes-3-4',                  'VCE Outdoor and Environmental Studies 3-4', 'general', 'health-and-pe/outdoor-and-environmental-studies-3-4'),
  vce34('vce-pe-3-4',                   'VCE Physical Education 3-4',            'general', 'health-and-pe/physical-education-3-4'),
];

// ============================================================
//  Helpers
// ============================================================

export function classesForBand(band: YearBand): HrsClass[] {
  return HRS_CLASSES.filter((c) => c.yearBand === band);
}

export function classesForBands(bands: YearBand[]): HrsClass[] {
  if (bands.length === 0) return HRS_CLASSES;
  return HRS_CLASSES.filter((c) => bands.includes(c.yearBand));
}

export function classesForSubject(subject: Subject): HrsClass[] {
  return HRS_CLASSES.filter((c) => c.subject === subject);
}

export function findClass(id: string): HrsClass | undefined {
  return HRS_CLASSES.find((c) => c.id === id);
}

export function anchoredClasses(): HrsClass[] {
  return HRS_CLASSES.filter((c) => c.anchored);
}

export function findYearBand(id: YearBand): YearBandDef | undefined {
  return YEAR_BANDS.find((b) => b.id === id);
}
