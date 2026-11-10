/**
 * Categorical fills for things that need telling apart — teams, wheel
 * wedges, plotted points, marbles. Values live in styles/tokens.css
 * (--cat-1 … --cat-10); tools pick from this list rather than hard-coding
 * hex so the whole app stays on one muted palette.
 */
export const CATEGORICAL: readonly string[] = Array.from(
  { length: 10 },
  (_, i) => `var(--cat-${i + 1})`,
);

/** The i-th categorical fill, cycling when there are more items than colours. */
export function categorical(i: number): string {
  return CATEGORICAL[((i % CATEGORICAL.length) + CATEGORICAL.length) % CATEGORICAL.length]!;
}
