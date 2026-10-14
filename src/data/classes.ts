import type { Stream } from './games';
import type { Subject } from '../games/types';

/**
 * HRS class registry.
 *
 * Replaces the AC V9 stream + subject filter model with per-class targeting.
 * Each class corresponds (loosely) to a leaf folder under `source-material/`
 * — e.g. `maths/year-10/` ↔ class id `y10-maths`.
 *
 * Anchored classes have ≥ 1 question bank populated with class-specific
 * items via `Bank<Q>.byClass[id]`. Unanchored classes appear in the
 * picker only when a generic pool exists for their subject (see
 * isSelectable); their content is backfilled from the legacy
 * `byStreamSubject[legacyStream][backfillSubjects ?? subject]` pool.
 */

// ============================================================
//  Year bands (the top-level picker on landing + SetupScreen)
// ============================================================

export type YearBand =
  | 'f-2' | '3-6' | 'y7' | 'y8' | 'y9' | 'y10';

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
];

/**
 * The legacy AC V9 stream each year band falls under. Games declare
 * support via `Game.streams`; this maps that back to year bands.
 */
export const BAND_TO_STREAM: Record<YearBand, Stream> = {
  'f-2': 'lower_primary',
  '3-6': 'upper_primary',
  y7: 'middle_school',
  y8: 'middle_school',
  y9: 'middle_school',
  y10: 'senior_school',
};

// ============================================================
//  HrsClass — the per-class registry entry
// ============================================================

export interface HrsClass {
  /** Stable kebab-case id. Used as the bank key for anchored content. */
  id: string;
  yearBand: YearBand;
  /** Display name, full form, e.g. "Year 8 Science", "Lower Primary English". */
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
  /**
   * Generic-pool subjects to backfill from, when broader than `subject`.
   * Humanities classes are tagged `history` for colour but should top up
   * from history AND geography items. Defaults to `[subject]`.
   */
  backfillSubjects?: Subject[];
}

// Helpers for building entries with sensible defaults --------------------
// `extra` overrides or adds fields, e.g. `{ anchored: true }`.

type Extra = Partial<HrsClass>;

function f2(id: string, name: string, subject: Subject, sourcePath: string, extra: Extra = {}): HrsClass {
  return { id, yearBand: 'f-2', name, subject, sourcePath, legacyStream: 'lower_primary', ...extra };
}
function p36(id: string, name: string, subject: Subject, sourcePath: string, extra: Extra = {}): HrsClass {
  return { id, yearBand: '3-6', name, subject, sourcePath, legacyStream: 'upper_primary', ...extra };
}
function y7(id: string, name: string, subject: Subject, sourcePath: string, extra: Extra = {}): HrsClass {
  return { id, yearBand: 'y7', name, subject, sourcePath, legacyStream: 'middle_school', ...extra };
}
function y8(id: string, name: string, subject: Subject, sourcePath: string, extra: Extra = {}): HrsClass {
  return { id, yearBand: 'y8', name, subject, sourcePath, legacyStream: 'middle_school', ...extra };
}
function y9(id: string, name: string, subject: Subject, sourcePath: string, extra: Extra = {}): HrsClass {
  return { id, yearBand: 'y9', name, subject, sourcePath, legacyStream: 'middle_school', ...extra };
}
function y10(id: string, name: string, subject: Subject, sourcePath: string, extra: Extra = {}): HrsClass {
  return { id, yearBand: 'y10', name, subject, sourcePath, legacyStream: 'senior_school', ...extra };
}

/** Integrated humanities: backfill from both history and geography. */
const HUM: Extra = { backfillSubjects: ['history', 'geography'] };

// ============================================================
//  The classes themselves
// ============================================================
//
// Note on the 'general' subject:
//   Health & PE doesn't map cleanly to the current Subject options.
//   Those classes are tagged `general` for chip-colour purposes. There's
//   no generic `general` content, so they stay hidden from the pickers
//   (see isSelectable) until they're anchored; at that point we may
//   introduce a `health-pe` Subject entry.
//   (Languages and electives were removed 2026-07-08 with the Y7-10
//   scope decision — restore from git history if they ever return.)
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
  f2('f2-humanities', 'Lower Primary Humanities', 'history', 'humanities/f-2', HUM),

  // -- 3-6 (Years 3–6) -----------------------------------------
  p36('3-6-english',    'Upper Primary English',    'english', 'english/3-6'),
  p36('3-6-maths',      'Upper Primary Maths',      'maths',   'maths/3-6'),
  p36('3-6-science',    'Upper Primary Science',    'science', 'science/3-6'),
  p36('3-6-humanities', 'Upper Primary Humanities', 'history', 'humanities/3-6', HUM),

  // -- Year 7 --------------------------------------------------
  y7('y7-english',      'Year 7 English',      'english', 'english/year-7'),
  y7('y7-maths',        'Year 7 Maths',        'maths',   'maths/year-7'),
  y7('y7-science',      'Year 7 Science',      'science', 'science/year-7'),
  y7('y7-humanities',   'Year 7 Humanities',   'history', 'humanities/year-7', { ...HUM, anchored: true }),
  y7('y7-health-pe',    'Year 7 Health & PE',  'general', 'health-and-pe/year-7'),

  // -- Year 8 --------------------------------------------------
  y8('y8-english',      'Year 8 English',      'english', 'english/year-8'),
  y8('y8-maths',        'Year 8 Maths',        'maths',   'maths/year-8'),
  y8('y8-science',      'Year 8 Science',      'science', 'science/year-8'),
  y8('y8-humanities',   'Year 8 Humanities',   'history', 'humanities/year-8', { ...HUM, anchored: true }),
  y8('y8-health-pe',    'Year 8 Health & PE',  'general', 'health-and-pe/year-8'),

  // -- Year 9 --------------------------------------------------
  y9('y9-english',      'Year 9 English',      'english', 'english/year-9'),
  y9('y9-maths',        'Year 9 Maths',        'maths',   'maths/year-9'),
  y9('y9-science',      'Year 9 Science',      'science', 'science/year-9'),
  y9('y9-humanities',   'Year 9 Humanities',   'history', 'humanities/year-9', HUM),
  y9('y9-health-pe',    'Year 9 Health & PE',  'general', 'health-and-pe/year-9'),

  // -- Year 10 -------------------------------------------------
  y10('y10-english',     'Year 10 English',     'english', 'english/year-10'),
  y10('y10-maths',       'Year 10 Maths',       'maths',   'maths/year-10', { anchored: true }),
  y10('y10-science',     'Year 10 Science',     'science', 'science/year-10'),
  y10('y10-humanities',  'Year 10 Humanities',  'history', 'humanities/year-10', HUM),
  y10('y10-health-pe',   'Year 10 Health & PE', 'general', 'health-and-pe/year-10'),
];

// ============================================================
//  Helpers
// ============================================================

/**
 * Subjects the generic (legacy) banks carry items for. A class whose
 * subject isn't in this list and isn't anchored has nothing on-subject
 * to serve — pickFromBank would silently fall back to a random mix
 * (e.g. Health & PE serving science questions). Keep in sync with the
 * byStreamSubject keys in the MCQ / Odd One Out banks.
 */
const GENERIC_SUBJECTS: readonly Subject[] = ['english', 'maths', 'history', 'geography', 'science'];

/**
 * True when the class has content to serve: either its own anchored
 * bank, or a generic pool for its subject. Unselectable classes are
 * hidden from the pickers until they're anchored.
 */
export function isSelectable(c: HrsClass): boolean {
  return !!c.anchored || GENERIC_SUBJECTS.includes(c.subject);
}

/** Selectable classes in a year band — what the class picker offers. */
export function classesForBand(band: YearBand): HrsClass[] {
  return HRS_CLASSES.filter((c) => c.yearBand === band && isSelectable(c));
}

export function findClass(id: string): HrsClass | undefined {
  return HRS_CLASSES.find((c) => c.id === id);
}
