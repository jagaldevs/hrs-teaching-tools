import { useState } from 'react';
import { Eye, EyeOff, RotateCcw } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { usePersistedState } from '../../hooks/usePersistedState';
import common from '../common.module.css';
import styles from './FractionWall.module.css';

const DEFAULT_ROWS = [1, 2, 3, 4, 5, 6, 8, 10, 12];

function gcd(a: number, b: number): number {
  while (b) [a, b] = [b, a % b];
  return Math.abs(a) || 1;
}

function fracLabel(num: number, den: number): string {
  return den === 1 ? `${num}` : `${num}/${den}`;
}

/** Selected cells per row, keyed by denominator. Rows are independent so
 *  several can be highlighted at once to compare (e.g. 1/2 against 2/4). */
type Selection = Record<number, number[]>;

interface Picked {
  den: number;
  num: number;
  value: number;
  simplified: string;
}

export function FractionWall() {
  const [visibleRows, setVisibleRows] = usePersistedState<number[]>('fwall.rows', DEFAULT_ROWS);
  const [selection, setSelection] = useState<Selection>({});

  function toggleRow(d: number) {
    setVisibleRows((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d].sort((a, b) => a - b),
    );
  }

  function selectCell(denom: number, idx: number) {
    setSelection((prev) => {
      const cells = prev[denom] ?? [];
      const nextCells = cells.includes(idx)
        ? cells.filter((c) => c !== idx)
        : [...cells, idx].sort((a, b) => a - b);
      const next = { ...prev };
      if (nextCells.length === 0) delete next[denom];
      else next[denom] = nextCells;
      return next;
    });
  }

  function clearSelection() {
    setSelection({});
  }

  const picked: Picked[] = visibleRows
    .filter((d) => (selection[d]?.length ?? 0) > 0)
    .map((den) => {
      const num = selection[den]!.length;
      const g = gcd(num, den);
      return { den, num, value: num / den, simplified: fracLabel(num / g, den / g) };
    });

  // With two or more rows highlighted, say how they compare.
  let comparison: string | null = null;
  if (picked.length >= 2) {
    const sorted = [...picked].sort((a, b) => a.value - b.value);
    comparison = sorted
      .map((p, i) => {
        const label = fracLabel(p.num, p.den);
        if (i === 0) return label;
        const sign = Math.abs(p.value - sorted[i - 1]!.value) < 1e-9 ? '=' : '<';
        return `${sign} ${label}`;
      })
      .join(' ');
  }

  return (
    <ToolShell
      eyebrow="Teaching Aids"
      title="Fraction Wall"
      description="Stacked fraction strips. Highlight cells in several rows to compare fractions and find equivalents."
      actions={
        <button type="button" className={common.btn} onClick={clearSelection} disabled={picked.length === 0}>
          <RotateCcw size={14} /> Clear selection
        </button>
      }
    >
      <div className={styles.rowToggle}>
        <span className={common.labelText}>Show rows:</span>
        {DEFAULT_ROWS.map((d) => (
          <button
            key={d}
            type="button"
            className={styles.rowToggleBtn}
            data-active={visibleRows.includes(d)}
            onClick={() => toggleRow(d)}
          >
            {visibleRows.includes(d) ? <Eye size={12} /> : <EyeOff size={12} />}
            {d === 1 ? '1' : `1/${d}`}
          </button>
        ))}
      </div>

      <div className={styles.wall}>
        {visibleRows.map((d) => (
          <div key={d} className={styles.row}>
            <span className={styles.rowLabel}>
              {d === 1 ? '1' : `1/${d}`}
            </span>
            <div className={styles.strip}>
              {Array.from({ length: d }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={styles.cell}
                  data-selected={selection[d]?.includes(i) ?? false}
                  onClick={() => selectCell(d, i)}
                  aria-label={`${d === 1 ? 'One whole' : `1/${d}`}, piece ${i + 1}`}
                >
                  {d <= 6 ? (d === 1 ? '1' : `1/${d}`) : ''}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {picked.length > 0 && (
        <div className={styles.selectionCard}>
          <table className={styles.selTable}>
            <thead>
              <tr>
                <th>Selected</th>
                <th>Simplified</th>
                <th>Decimal</th>
                <th>Percent</th>
              </tr>
            </thead>
            <tbody>
              {picked.map((p) => (
                <tr key={p.den}>
                  <td className={`font-display ${styles.selFrac}`}>{fracLabel(p.num, p.den)}</td>
                  <td className={`font-display ${styles.selFrac}`}>{p.simplified}</td>
                  <td>{Math.round(p.value * 10000) / 10000}</td>
                  <td>{Math.round(p.value * 10000) / 100}%</td>
                </tr>
              ))}
            </tbody>
          </table>
          {comparison && <p className={`font-display ${styles.comparison}`}>{comparison}</p>}
        </div>
      )}
    </ToolShell>
  );
}
