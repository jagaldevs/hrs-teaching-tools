import type { Stream } from '../data/games';
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
 * Returns up to `count` items, shuffled, paired with their subject tag.
 */
export function pickFromBank<Q>(
  bank: Bank<Q>,
  stream: Stream,
  subject: Subject | 'mix',
  count: number,
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

  const shuffled = shuffle(tagged);
  const slice = shuffled.slice(0, count);
  return {
    items: slice.map((t) => t.item),
    subjects: slice.map((t) => t.subject),
  };
}
