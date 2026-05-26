import type { Stream } from '../data/games';
import type { Bank, MCQ, Subject } from './types';
import { shuffle } from '../tools/rng/util';
import type { SetupSelections } from './GameShell';

/**
 * Build a predicate for filtering MCQs by the Senior unit group chosen on
 * SetupScreen. Returns `undefined` when no narrowing should apply
 * (non-senior stream or unitGroup === 'any').
 */
export function unitFilterFor(sel: SetupSelections): ((q: MCQ) => boolean) | undefined {
  if (sel.stream !== 'senior_school') return undefined;
  if (sel.unitGroup === 'units_1_2') {
    return (q) => q.unit === 1 || q.unit === 2;
  }
  if (sel.unitGroup === 'units_3_4') {
    return (q) => q.unit === 3 || q.unit === 4;
  }
  return undefined;
}

/**
 * Pull questions from a bank for a given stream + subject choice.
 *
 *   "mix" → all subjects in the stream.
 *   <subject> → just that subject. If the subject yields zero items
 *               (e.g. a stale service-worker bundle predates new content),
 *               we automatically fall back to "mix" so the user isn't left
 *               with a button that silently does nothing.
 *
 * The optional `filter` predicate runs AFTER subject selection and before
 * the slice, letting callers narrow the pool (e.g. by Senior `unit` tag on
 * MCQ items). If the filter drops every item we silently retry without it
 * — better to serve a slightly wider round than a no-op start button.
 *
 * Returns up to `count` items, shuffled, paired with their subject tag.
 */
export function pickFromBank<Q>(
  bank: Bank<Q>,
  stream: Stream,
  subject: Subject | 'mix',
  count: number,
  filter?: (item: Q) => boolean,
): { items: Q[]; subjects: Subject[] } {
  const streamData = bank.byStreamSubject[stream] ?? {};

  function gather(s: Subject | 'mix'): { item: Q; subject: Subject }[] {
    const subjectKeys = s === 'mix'
      ? (Object.keys(streamData) as Subject[])
      : [s];
    const out: { item: Q; subject: Subject }[] = [];
    for (const key of subjectKeys) {
      const list = streamData[key];
      if (!list) continue;
      for (const item of list) out.push({ item, subject: key });
    }
    return out;
  }

  let tagged = gather(subject);
  // Fall back to mix if a specific subject turned up nothing.
  if (tagged.length === 0 && subject !== 'mix') {
    tagged = gather('mix');
  }

  if (filter) {
    const filtered = tagged.filter((t) => filter(t.item));
    if (filtered.length > 0) tagged = filtered;
    // else: keep the unfiltered pool — better than zero items.
  }

  const shuffled = shuffle(tagged);
  const slice = shuffled.slice(0, count);
  return {
    items: slice.map((t) => t.item),
    subjects: slice.map((t) => t.subject),
  };
}
