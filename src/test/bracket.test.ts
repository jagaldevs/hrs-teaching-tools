import { describe, expect, it } from 'vitest';
import { buildInitialBracket, championOf, propagateWinners, roundLabel, type Match } from '../tools/classroom/bracket';

const entrants = (n: number) => Array.from({ length: n }, (_, i) => `P${i + 1}`);

/** Decide every playable match (always the top competitor) until none are left. */
function playOut(rounds: Match[][]): Match[][] {
  let current = rounds;
  for (;;) {
    const r = current.findIndex((round) => round.some((m) => m.winner === null && m.a !== null && m.b !== null));
    if (r === -1) return current;
    const p = current[r]!.findIndex((m) => m.winner === null && m.a !== null && m.b !== null);
    const next = current.map((round) => round.map((m) => ({ ...m })));
    next[r]![p]!.winner = 0;
    current = propagateWinners(next);
  }
}

describe('tournament bracket', () => {
  it('reaches a champion for every entrant count from 2 to 40', () => {
    // 5, 6 and 9–14 entrants used to stall: an empty first-round match left
    // its next-round opponent waiting forever.
    for (let n = 2; n <= 40; n++) {
      expect(championOf(playOut(buildInitialBracket(entrants(n)))), `${n} entrants`).not.toBeNull();
    }
  });

  it('gives every first-round match at least one entrant and seats everyone once', () => {
    for (let n = 2; n <= 40; n++) {
      const round0 = buildInitialBracket(entrants(n))[0]!;
      expect(round0.every((m) => m.a !== null || m.b !== null)).toBe(true);
      const seated = round0.flatMap((m) => [m.a, m.b]).filter((x) => x !== null);
      expect(seated.sort()).toEqual(entrants(n).sort());
    }
  });

  it('clears later results when an earlier match is re-decided', () => {
    let rounds = buildInitialBracket(entrants(4));
    const decide = (r: number, p: number, w: 0 | 1) => {
      const next = rounds.map((round) => round.map((m) => ({ ...m })));
      next[r]![p]!.winner = w;
      rounds = propagateWinners(next);
    };
    decide(0, 0, 0); // P1 beats P2
    decide(0, 1, 0); // P3 beats P4
    decide(1, 0, 0); // P1 wins the final
    expect(championOf(rounds)).toBe('P1');

    decide(0, 0, 1); // actually P2 beat P1
    expect(rounds[1]![0]!.a).toBe('P2');
    expect(championOf(rounds)).toBeNull(); // P2 must not inherit P1's final win
  });

  it('un-sticks brackets saved with an empty first-round match', () => {
    // Shape the old builder produced for 5 entrants.
    const legacy: Match[][] = [
      [
        { pos: 0, a: 'P1', b: 'P2', winner: null },
        { pos: 1, a: 'P3', b: 'P4', winner: null },
        { pos: 2, a: 'P5', b: null, winner: 0 },
        { pos: 3, a: null, b: null, winner: null },
      ],
      [
        { pos: 0, a: null, b: null, winner: null },
        { pos: 1, a: null, b: null, winner: null },
      ],
      [{ pos: 0, a: null, b: null, winner: null }],
    ];
    const fixed = propagateWinners(legacy);
    expect(fixed[1]![1]!).toMatchObject({ a: 'P5', winner: 0 });
    expect(championOf(playOut(fixed))).not.toBeNull();
  });

  it('labels rounds by how many competitors are left', () => {
    expect([0, 1, 2, 3, 4].map((r) => roundLabel(r, 5))).toEqual([
      'Round of 32',
      'Round of 16',
      'Quarter Final',
      'Semi Final',
      'Final',
    ]);
  });
});
