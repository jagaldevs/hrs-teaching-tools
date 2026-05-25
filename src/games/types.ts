import type { Stream } from '../data/games';

export type Subject = 'english' | 'maths' | 'history' | 'geography' | 'science' | 'general';

export interface Bank<Q> {
  /** Questions grouped by stream then subject. */
  byStreamSubject: Partial<Record<Stream, Partial<Record<Subject, Q[]>>>>;
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

/** Higher-or-lower item: a value with a comparison-friendly label. */
export interface HoLItem {
  id: string;
  /** What this represents: "Population of Darwin", "Year of Federation". */
  label: string;
  value: number;
  /** Unit suffix shown on screen: "", "km", "$" etc. */
  unit?: string;
  /** Optional context tooltip. */
  context?: string;
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
