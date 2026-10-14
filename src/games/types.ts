import type { Stream } from '../data/games';

export type Subject = 'english' | 'maths' | 'history' | 'geography' | 'science' | 'general';

export interface Bank<Q> {
  /**
   * Legacy AC V9 lookup. Generic items live here and are reached when a
   * class picker selection has no anchored content (see pickFromClass()
   * for the backfill rule).
   */
  byStreamSubject: Partial<Record<Stream, Partial<Record<Subject, Q[]>>>>;
  /**
   * HRS-anchored content keyed by HrsClass id (see src/data/classes.ts).
   * When set for a class, this takes precedence over byStreamSubject in
   * the new class picker model.
   */
  byClass?: Partial<Record<string, Q[]>>;
}

/** Single multiple-choice question. */
export interface MCQ {
  id: string;
  q: string;
  choices: string[];
  /** Index of correct answer (0-based). */
  answer: number;
  explanation?: string;
  /** Australian Curriculum V9 code, e.g. "AC9M5N04". */
  acCode?: string;
}

/** Odd-one-out item: four candidates, one outlier. */
export interface OddItem {
  id: string;
  items: [string, string, string, string];
  /** Index of the odd one (0–3). */
  outlier: number;
  explanation?: string;
  acCode?: string;
}

export const SUBJECTS: { id: Subject; label: string }[] = [
  { id: 'english', label: 'English' },
  { id: 'maths', label: 'Maths' },
  { id: 'history', label: 'History' },
  { id: 'geography', label: 'Geography' },
  { id: 'science', label: 'Science' },
];

export const SUBJECT_COLOURS: Record<Subject, string> = {
  english: '#E6007E',
  maths: '#0EA5E9',
  history: '#F59E0B',
  geography: '#10B981',
  science: '#A855F7',
  general: '#6B7280',
};
