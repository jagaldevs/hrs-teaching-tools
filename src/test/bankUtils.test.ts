import { describe, expect, it } from 'vitest';
import { shuffleOptions } from '../games/bankUtils';

describe('shuffleOptions', () => {
  const options = ['right', 'wrong 1', 'wrong 2', 'wrong 3'];

  it('keeps every option and tracks the correct one', () => {
    for (let n = 0; n < 200; n++) {
      const correct = n % 4;
      const s = shuffleOptions(options, correct);
      expect([...s.options].sort()).toEqual([...options].sort());
      expect(s.options[s.correct]).toBe(options[correct]);
    }
  });

  it('spreads the correct answer across every slot', () => {
    const slots = [0, 0, 0, 0];
    for (let n = 0; n < 2000; n++) slots[shuffleOptions(options, 0).correct]!++;
    // Expect ~500 each; 350 is far outside chance for a fair shuffle.
    for (const count of slots) expect(count).toBeGreaterThan(350);
  });

  it('does not mutate the input', () => {
    const copy = [...options];
    shuffleOptions(options, 2);
    expect(options).toEqual(copy);
  });
});
