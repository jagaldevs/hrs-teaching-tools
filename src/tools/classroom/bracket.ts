/**
 * Single-elimination bracket logic for the Tournaments tool.
 *
 * Bracket model: round 0 = first matches; final round has one match.
 * When the entrant count isn't a power of 2, some first-round matches are
 * byes (one entrant, auto-advanced). Byes are spread through the bracket so
 * no first-round match is ever empty — an empty match would leave its
 * next-round opponent waiting forever.
 * Winners propagate forward whenever a match resolves.
 */
export interface Match {
  /** Slot index within the round. */
  pos: number;
  /** Names of the two competitors, or null = bye / not yet resolved. */
  a: string | null;
  b: string | null;
  /** Index 0 = a wins, 1 = b wins, null = undecided. */
  winner: 0 | 1 | null;
}

function nextPow2(n: number): number {
  let p = 1;
  while (p < n) p *= 2;
  return Math.max(2, p);
}

export function buildInitialBracket(names: string[]): Match[][] {
  const size = nextPow2(Math.max(2, names.length));
  const matchCount = size / 2;
  // size is the next power of 2 ≥ names.length, so byes < matchCount and
  // every first-round match gets at least one entrant.
  const byes = size - names.length;
  const byeAt = new Set(Array.from({ length: byes }, (_, i) => Math.floor((i * matchCount) / byes)));

  const round0: Match[] = [];
  let next = 0;
  for (let pos = 0; pos < matchCount; pos++) {
    const a = names[next++] ?? null;
    const b = byeAt.has(pos) ? null : names[next++] ?? null;
    round0.push({ pos, a, b, winner: b === null ? 0 : null });
  }

  const rounds: Match[][] = [round0];
  let count = matchCount;
  while (count > 1) {
    count = count / 2;
    rounds.push(Array.from({ length: count }, (_, pos) => ({ pos, a: null, b: null, winner: null })));
  }

  return propagateWinners(rounds);
}

function winnerOf(m: Match): string | null {
  if (m.winner === 0) return m.a;
  if (m.winner === 1) return m.b;
  return null;
}

/**
 * Push each match's winner into the next round. A downstream result is
 * cleared when either of its competitors changes, so re-deciding an early
 * match never hands the old winner's later wins to the new one.
 */
export function propagateWinners(rounds: Match[][]): Match[][] {
  const out = rounds.map((r) => r.map((m) => ({ ...m })));

  // A slot is "dead" when nobody can ever arrive in it: an empty first-round
  // match, or a later match fed only by dead matches. Brackets saved before
  // byes were spread can contain these; treating them as byes un-sticks them.
  const dead = out.map((r) => r.map(() => false));
  out[0]!.forEach((m, p) => {
    dead[0]![p] = m.a === null && m.b === null;
  });

  for (let r = 0; r < out.length - 1; r++) {
    for (let p = 0; p < out[r]!.length; p++) {
      const next = out[r + 1]![Math.floor(p / 2)]!;
      const name = winnerOf(out[r]![p]!);
      const slot = p % 2 === 0 ? 'a' : 'b';
      if (next[slot] !== name) {
        next[slot] = name;
        next.winner = null;
      }
    }
    for (let p = 0; p < out[r + 1]!.length; p++) {
      const m = out[r + 1]![p]!;
      const deadA = dead[r]![p * 2]!;
      const deadB = dead[r]![p * 2 + 1]!;
      dead[r + 1]![p] = deadA && deadB;
      if (m.winner === null) {
        if (m.a !== null && deadB) m.winner = 0;
        else if (m.b !== null && deadA) m.winner = 1;
      }
    }
  }
  return out;
}

export function roundLabel(roundIdx: number, totalRounds: number): string {
  const distanceFromFinal = totalRounds - 1 - roundIdx;
  if (distanceFromFinal === 0) return 'Final';
  if (distanceFromFinal === 1) return 'Semi Final';
  if (distanceFromFinal === 2) return 'Quarter Final';
  return `Round of ${2 ** (distanceFromFinal + 1)}`;
}

export function championOf(rounds: Match[][]): string | null {
  const final = rounds[rounds.length - 1]?.[0];
  return final ? winnerOf(final) : null;
}
