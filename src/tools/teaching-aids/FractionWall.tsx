import { useState } from 'react';
import { Eye, EyeOff, RotateCcw } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { usePersistedState } from '../../hooks/usePersistedState';
import common from '../common.module.css';
import styles from './FractionWall.module.css';

const DEFAULT_ROWS = [1, 2, 3, 4, 5, 6, 8, 10, 12];

// One row colour per denominator
const COLOURS: Record<number, string> = {
  1: '#E6007E',
  2: '#0EA5E9',
  3: '#10B981',
  4: '#F59E0B',
  5: '#A855F7',
  6: '#EF4444',
  8: '#22D3EE',
  10: '#FB7185',
  12: '#84CC16',
};

function gcd(a: number, b: number): number {
  while (b) [a, b] = [b, a % b];
  return Math.abs(a) || 1;
}

interface Selection {
  denom: number;
  /** Which cells in this row are selected (0..denom-1). */
  cells: number[];
}

export function FractionWall() {
  const [visibleRows, setVisibleRows] = usePersistedState<number[]>('fwall.rows', DEFAULT_ROWS);
  const [selection, setSelection] = useState<Selection | null>(null);

  function toggleRow(d: number) {
    setVisibleRows((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d].sort((a, b) => a - b),
    );
  }

  function selectCell(denom: number, idx: number) {
    setSelection((prev) => {
      if (!prev || prev.denom !== denom) {
        return { denom, cells: [idx] };
      }
      // Same row — toggle cell
      const cells = prev.cells.includes(idx)
        ? prev.cells.filter((c) => c !== idx)
        : [...prev.cells, idx].sort((a, b) => a - b);
      if (cells.length === 0) return null;
      return { denom, cells };
    });
  }

  function clearSelection() {
    setSelection(null);
  }

  const decimal = selection ? selection.cells.length / selection.denom : 0;
  let simpleFrac = '';
  if (selection) {
    const num = selection.cells.length;
    const den = selection.denom;
    const g = gcd(num, den);
    simpleFrac = den / g === 1 ? `${num / g}` : `${num / g}/${den / g}`;
  }

  return (
    <ToolShell
      eyebrow="Teaching Aids"
      title="Fraction Wall"
      description="Stacked fraction strips for comparing and finding equivalents. Click cells to highlight."
      actions={
        <button type="button" className={common.btn} onClick={clearSelection} disabled={!selection}>
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
            style={{ ['--row-colour' as string]: COLOURS[d] ?? '#888' }}
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
              {Array.from({ length: d }).map((_, i) => {
                const selected = selection?.denom === d && selection.cells.includes(i);
                return (
                  <button
                    key={i}
                    type="button"
                    className={styles.cell}
                    data-selected={selected}
                    style={{
                      background: selected ? COLOURS[d] : 'transparent',
                      borderColor: COLOURS[d] ?? 'var(--border-strong)',
                      color: selected ? '#fff' : 'var(--text)',
                    }}
                    onClick={() => selectCell(d, i)}
                  >
                    {d <= 6 ? (d === 1 ? '1' : `1/${d}`) : ''}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {selection && (
        <div className={styles.selectionCard}>
          <div className={styles.selCol}>
            <span className={common.labelText}>Selected</span>
            <span className={`font-display ${styles.selFrac}`}>
              {selection.cells.length}/{selection.denom}
            </span>
          </div>
          <div className={styles.selCol}>
            <span className={common.labelText}>Simplified</span>
            <span className={`font-display ${styles.selFrac}`}>{simpleFrac}</span>
          </div>
          <div className={styles.selCol}>
            <span className={common.labelText}>Decimal</span>
            <span className={`font-display ${styles.selFrac}`}>
              {Math.round(decimal * 10000) / 10000}
            </span>
          </div>
          <div className={styles.selCol}>
            <span className={common.labelText}>Percent</span>
            <span className={`font-display ${styles.selFrac}`}>
              {Math.round(decimal * 10000) / 100}%
            </span>
          </div>
        </div>
      )}
    </ToolShell>
  );
}
