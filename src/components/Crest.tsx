/**
 * Renders the official Haileybury Rendall School lockup
 * (heraldic crest + HAILEYBURY wordmark + RENDALL SCHOOL subtitle).
 *
 * `size` is the rendered HEIGHT in px. The lockup keeps its natural aspect ratio.
 *
 * In dark mode the magenta artwork sits on a near-black background; in light mode
 * it sits on cream. Both work directly — the burgundy reads strongly on both.
 */
interface CrestProps {
  /** Height in px. Width scales proportionally. */
  size?: number;
  className?: string;
  /**
   * Kept for backwards compatibility — the lockup always includes the wordmark,
   * so this prop currently has no effect, but tools / pages can still pass it.
   */
  withWordmark?: boolean;
}

export function Crest({ size = 56, className }: CrestProps) {
  return (
    <img
      src="/1660004439-haileybury-rendall.png"
      alt="Haileybury Rendall School"
      style={{ height: size, width: 'auto', display: 'block' }}
      className={className}
      draggable={false}
    />
  );
}
