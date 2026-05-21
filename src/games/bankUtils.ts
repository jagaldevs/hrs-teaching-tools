import type { Stream } from '../data/games';
import type { Bank, Subject } from './types';
import { shuffle } from '../tools/rng/util';

/**
 * Pull questions from a bank for a given stream + subject choice ("mix" means all subjects).
 * Returns up to `count` questions, shuffled.
 */
export function pickFromBank<Q>(
  bank: Bank<Q>,
  stream: Stream,
  subject: Subject | 'mix',
  count: number,
): { items: Q[]; subjects: Subject[] } {
  const streamData = bank.byStreamSubject[stream] ?? {};
  const subjects = subject === 'mix'
    ? (Object.keys(streamData) as Subject[])
    : [subject];

  // Track which subject each item came from (for breakdown display).
  const tagged: { item: Q; subject: Subject }[] = [];
  for (const s of subjects) {
    const list = streamData[s];
    if (!list) continue;
    for (const item of list) tagged.push({ item, subject: s });
  }

  const shuffled = shuffle(tagged);
  const slice = shuffled.slice(0, count);
  return {
    items: slice.map((t) => t.item),
    subjects: slice.map((t) => t.subject),
  };
}
