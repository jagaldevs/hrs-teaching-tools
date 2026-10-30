import { describe, expect, it } from 'vitest';
import { intoGroupsOfSize, parseRoster, weightedIndex } from '../tools/rng/util';

describe('intoGroupsOfSize', () => {
  const names = (n: number) => Array.from({ length: n }, (_, i) => `S${i + 1}`);

  it('never leaves a straggler group', () => {
    // 25 in 4s used to give six groups of 4 and a group of 1.
    const groups = intoGroupsOfSize(names(25), 4);
    expect(groups.map((g) => g.length).sort()).toEqual([4, 4, 4, 4, 4, 5]);
  });

  it('keeps every group within one of each other and every student placed', () => {
    for (let n = 1; n <= 40; n++) {
      for (let size = 2; size <= 6; size++) {
        const groups = intoGroupsOfSize(names(n), size);
        const sizes = groups.map((g) => g.length);
        expect(sizes.reduce((a, b) => a + b, 0)).toBe(n);
        expect(Math.max(...sizes) - Math.min(...sizes)).toBeLessThanOrEqual(1);
      }
    }
  });
});

describe('parseRoster', () => {
  it('splits on newlines and commas and trims', () => {
    expect(parseRoster(' Ava \nNoah, Liam\n\n')).toEqual(['Ava', 'Noah', 'Liam']);
  });

  it('numbers repeated names so every student is distinct', () => {
    expect(parseRoster('Jack\nMia\nJack\nJack')).toEqual(['Jack', 'Mia', 'Jack (2)', 'Jack (3)']);
  });
});

describe('weightedIndex', () => {
  it('picks in proportion to weight', () => {
    const counts = [0, 0];
    const draws = 20_000;
    for (let i = 0; i < draws; i++) counts[weightedIndex([1, 3])]!++;
    // Expect 25% / 75%; ±3% is far outside chance at this sample size.
    expect(counts[0]! / draws).toBeGreaterThan(0.22);
    expect(counts[0]! / draws).toBeLessThan(0.28);
  });

  it('can return every index', () => {
    const seen = new Set<number>();
    for (let i = 0; i < 2000; i++) seen.add(weightedIndex([1, 1, 1, 1]));
    expect([...seen].sort()).toEqual([0, 1, 2, 3]);
  });
});
