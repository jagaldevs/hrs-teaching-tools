import type { Stream } from '../data/games';
import { findClass } from '../data/classes';
import type { Bank, Subject } from './types';
import { shuffle } from '../tools/rng/util';

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
  subject: Subject | Subject[] | 'mix',
  count: number,
  filter?: (item: Q) => boolean,
): { items: Q[]; subjects: Subject[] } {
  const streamData = bank.byStreamSubject[stream] ?? {};

  function gather(s: Subject | Subject[] | 'mix'): { item: Q; subject: Subject }[] {
    const subjectKeys = s === 'mix'
      ? (Object.keys(streamData) as Subject[])
      : Array.isArray(s) ? s : [s];
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

/**
 * Every item a class can draw from, paired with its subject: the class's
 * anchored items when it has any, otherwise its generic backfill pool
 * (`legacyStream` × `backfillSubjects ?? subject`). Unlike pickFromBank
 * there's no fall-back to a random mix — an empty pool stays empty.
 */
export function classPool<Q>(bank: Bank<Q>, classId: string): { item: Q; subject: Subject }[] {
  const klass = findClass(classId);
  if (!klass) return [];
  const anchored = bank.byClass?.[classId] ?? [];
  if (anchored.length > 0) return anchored.map((item) => ({ item, subject: klass.subject }));
  if (!klass.legacyStream) return [];
  const streamData = bank.byStreamSubject[klass.legacyStream] ?? {};
  return (klass.backfillSubjects ?? [klass.subject]).flatMap((s) =>
    (streamData[s] ?? []).map((item) => ({ item, subject: s })),
  );
}

/**
 * Pull questions from a bank for a given HRS class.
 *
 *   - If the class has anchored content (`bank.byClass[classId]`) and at
 *     least `count` items, returns a shuffled slice of those.
 *   - Otherwise tops up from the legacy generic pool via `pickFromBank`,
 *     keyed by the class's `legacyStream` + `backfillSubjects` (falling
 *     back to `subject`).
 *   - If neither yields anything, returns an empty result.
 *
 * The `subjects` array is filled with the class's declared subject for
 * every returned item — anchored items don't carry their own subject
 * (the class owns it).
 */
export function pickFromClass<Q>(
  bank: Bank<Q>,
  classId: string,
  count: number,
): { items: Q[]; subjects: Subject[]; classId: string } {
  const klass = findClass(classId);
  if (!klass) return { items: [], subjects: [], classId };

  const anchored = bank.byClass?.[classId] ?? [];
  if (anchored.length >= count) {
    const items = shuffle(anchored).slice(0, count);
    return {
      items,
      subjects: items.map(() => klass.subject),
      classId,
    };
  }

  // Need more — top up from legacy.
  const need = count - anchored.length;
  if (klass.legacyStream) {
    const legacy = pickFromBank(bank, klass.legacyStream, klass.backfillSubjects ?? klass.subject, need);
    const combined = shuffle([
      ...anchored.map((item) => ({ item, subject: klass.subject as Subject })),
      ...legacy.items.map((item, i) => ({ item, subject: legacy.subjects[i]! })),
    ]).slice(0, count);
    return {
      items: combined.map((t) => t.item),
      subjects: combined.map((t) => t.subject),
      classId,
    };
  }

  // No legacy backfill — just return whatever's anchored.
  const items = shuffle(anchored).slice(0, count);
  return {
    items,
    subjects: items.map(() => klass.subject),
    classId,
  };
}
