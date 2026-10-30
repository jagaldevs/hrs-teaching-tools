/** Crypto-strong random integer in [0, n). */
export function randomInt(n: number): number {
  if (n <= 0) return 0;
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    // Avoid modulo bias with rejection sampling
    const max = Math.floor(0xffffffff / n) * n;
    const buf = new Uint32Array(1);
    do {
      crypto.getRandomValues(buf);
    } while (buf[0] >= max);
    return buf[0] % n;
  }
  return Math.floor(Math.random() * n);
}

export function randomChoice<T>(arr: readonly T[]): T | undefined {
  if (arr.length === 0) return undefined;
  return arr[randomInt(arr.length)];
}

/** Fisher–Yates shuffle (non-mutating). */
export function shuffle<T>(arr: readonly T[]): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

/**
 * Split an array into groups as close to `groupSize` as possible. The
 * remainder is spread across groups rather than left as a straggler:
 * 25 students in 4s → five groups of 4 and one of 5, never a group of 1.
 */
export function intoGroupsOfSize<T>(arr: readonly T[], groupSize: number): T[][] {
  if (groupSize <= 0 || arr.length === 0) return [];
  const groupCount = Math.max(1, Math.round(arr.length / groupSize));
  return intoGroupsOfCount(arr, groupCount);
}

/** Split an array into a fixed number of groups, as evenly as possible. */
export function intoGroupsOfCount<T>(arr: readonly T[], groupCount: number): T[][] {
  if (groupCount <= 0) return [];
  const out: T[][] = Array.from({ length: groupCount }, () => []);
  for (let i = 0; i < arr.length; i++) {
    out[i % groupCount]!.push(arr[i]!);
  }
  return out;
}

/**
 * Parse a roster from textarea — accepts newline or comma-separated names.
 * Repeated names get a number ("Jack", "Jack (2)") so every student stays
 * distinct in fair-mode picking, groups and brackets.
 */
export function parseRoster(text: string): string[] {
  const seen = new Map<string, number>();
  return text
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .map((name) => {
      const n = (seen.get(name) ?? 0) + 1;
      seen.set(name, n);
      return n === 1 ? name : `${name} (${n})`;
    });
}

/**
 * Weighted random index: weight 3 is three times as likely as weight 1.
 * Weights are rounded to whole numbers (min 1) so the crypto-strong
 * randomInt can draw exactly.
 */
export function weightedIndex(weights: readonly number[]): number {
  if (weights.length === 0) return -1;
  const ws = weights.map((w) => Math.max(1, Math.round(w)));
  let target = randomInt(ws.reduce((s, w) => s + w, 0));
  for (let i = 0; i < ws.length; i++) {
    target -= ws[i]!;
    if (target < 0) return i;
  }
  return ws.length - 1;
}

/** Weighted pick: items with `weight` field; defaults to 1 if missing. */
export function weightedChoice<T extends { weight?: number }>(items: readonly T[]): T | undefined {
  if (items.length === 0) return undefined;
  return items[weightedIndex(items.map((it) => it.weight ?? 1))];
}
