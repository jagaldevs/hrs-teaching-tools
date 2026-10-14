import { findClass, type HrsClass } from '../data/classes';
import type { Bank, Subject } from './types';
import { shuffle } from '../tools/rng/util';

type Tagged<Q> = { item: Q; subject: Subject };

/**
 * Shuffle an item's options and return the correct option's new index.
 * Games call this at round start so the on-screen position of the answer
 * is random — the banks were authored with heavy position bias (Y10 Maths
 * Odd One Out had 72/75 outliers in slot D), so "always pick D" won.
 */
export function shuffleOptions<T>(options: readonly T[], correct: number): { options: T[]; correct: number } {
  const order = shuffle(options.map((_, i) => i));
  return { options: order.map((i) => options[i]!), correct: order.indexOf(correct) };
}

/**
 * A class's generic backfill pool: `byStreamSubject[legacyStream]` for
 * each of `backfillSubjects ?? [subject]`. Never falls back to other
 * subjects — an empty pool stays empty (classes with no generic pool are
 * hidden from the pickers; see isSelectable in data/classes.ts).
 */
function genericPool<Q>(bank: Bank<Q>, klass: HrsClass): Tagged<Q>[] {
  if (!klass.legacyStream) return [];
  const streamData = bank.byStreamSubject[klass.legacyStream] ?? {};
  return (klass.backfillSubjects ?? [klass.subject]).flatMap((s) =>
    (streamData[s] ?? []).map((item) => ({ item, subject: s })),
  );
}

/**
 * Every item a class can draw from, paired with its subject: the class's
 * anchored items when it has any, otherwise its generic backfill pool.
 */
export function classPool<Q>(bank: Bank<Q>, classId: string): Tagged<Q>[] {
  const klass = findClass(classId);
  if (!klass) return [];
  const anchored = bank.byClass?.[classId] ?? [];
  if (anchored.length > 0) return anchored.map((item) => ({ item, subject: klass.subject }));
  return genericPool(bank, klass);
}

/**
 * Pull up to `count` shuffled questions for an HRS class: anchored items
 * (`bank.byClass[classId]`) first, topped up from the generic backfill
 * pool when the class has fewer than `count`.
 *
 * Anchored items don't carry their own subject (the class owns it), so
 * they're reported under the class's `subject`.
 */
export function pickFromClass<Q>(
  bank: Bank<Q>,
  classId: string,
  count: number,
): { items: Q[]; subjects: Subject[]; classId: string } {
  const klass = findClass(classId);
  if (!klass) return { items: [], subjects: [], classId };

  const anchored: Tagged<Q>[] = (bank.byClass?.[classId] ?? []).map((item) => ({
    item,
    subject: klass.subject,
  }));
  const picked = anchored.length >= count
    ? shuffle(anchored).slice(0, count)
    : shuffle([...anchored, ...shuffle(genericPool(bank, klass)).slice(0, count - anchored.length)]);

  return {
    items: picked.map((t) => t.item),
    subjects: picked.map((t) => t.subject),
    classId,
  };
}
