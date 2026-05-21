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

/** Split an array into groups of approximately equal size. */
export function intoGroupsOfSize<T>(arr: readonly T[], groupSize: number): T[][] {
  if (groupSize <= 0) return [];
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += groupSize) {
    out.push(arr.slice(i, i + groupSize));
  }
  return out;
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

/** Parse a roster from textarea — accepts newline or comma-separated names. */
export function parseRoster(text: string): string[] {
  return text
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

/** Weighted pick: items with `weight` field; defaults to 1 if missing. */
export function weightedChoice<T extends { weight?: number }>(items: readonly T[]): T | undefined {
  if (items.length === 0) return undefined;
  const totalWeight = items.reduce((s, it) => s + (it.weight ?? 1), 0);
  if (totalWeight <= 0) return items[randomInt(items.length)];
  const target = Math.random() * totalWeight;
  let acc = 0;
  for (const it of items) {
    acc += it.weight ?? 1;
    if (target < acc) return it;
  }
  return items[items.length - 1];
}
