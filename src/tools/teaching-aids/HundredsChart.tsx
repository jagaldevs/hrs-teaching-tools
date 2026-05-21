import { useMemo, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { usePersistedState } from '../../hooks/usePersistedState';
import common from '../common.module.css';
import styles from './HundredsChart.module.css';

type Mode = 'free' | 'multiples' | 'primes' | 'evens' | 'odds';

const MODES: { id: Mode; label: string }[] = [
  { id: 'free', label: 'Free click' },
  { id: 'multiples', label: 'Multiples of…' },
  { id: 'primes', label: 'Prime numbers' },
  { id: 'evens', label: 'Even numbers' },
  { id: 'odds', label: 'Odd numbers' },
];

function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n < 4) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i * i <= n; i += 2) if (n % i === 0) return false;
  return true;
}

export function HundredsChart() {
  const [mode, setMode] = usePersistedState<Mode>('hc.mode', 'free');
  const [multBase, setMultBase] = usePersistedState<number>('hc.mult', 2);
  const [freeMarks, setFreeMarks] = useState<Set<number>>(new Set());

  const auto = useMemo(() => {
    const set = new Set<number>();
    for (let n = 1; n <= 100; n++) {
      switch (mode) {
        case 'multiples':
          if (multBase > 0 && n % multBase === 0) set.add(n);
          break;
        case 'primes':
          if (isPrime(n)) set.add(n);
          break;
        case 'evens':
          if (n % 2 === 0) set.add(n);
          break;
        case 'odds':
          if (n % 2 === 1) set.add(n);
          break;
      }
    }
    return set;
  }, [mode, multBase]);

  function toggleCell(n: number) {
    if (mode !== 'free') return;
    setFreeMarks((prev) => {
      const next = new Set(prev);
      if (next.has(n)) next.delete(n);
      else next.add(n);
      return next;
    });
  }

  function clearMarks() {
    setFreeMarks(new Set());
  }

  return (
    <ToolShell
      eyebrow="Teaching Aids"
      title="Hundreds Chart"
      description="1–100 grid. Click cells in free mode, or highlight patterns automatically."
      actions={
        mode === 'free' ? (
          <button type="button" className={common.btn} onClick={clearMarks} disabled={freeMarks.size === 0}>
            <RotateCcw size={14} /> Clear
          </button>
        ) : null
      }
    >
      <div className={styles.modeRow}>
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            className={`${common.btn} ${styles.modeBtn}`}
            data-active={mode === m.id}
            onClick={() => setMode(m.id)}
          >
            {m.label}
          </button>
        ))}
        {mode === 'multiples' && (
          <label className={styles.multField}>
            <span className={common.labelText}>×</span>
            <input
              type="number"
              min={2}
              max={20}
              value={multBase}
              onChange={(e) => setMultBase(Math.max(2, Math.min(20, Number(e.target.value) || 2)))}
              className={common.numericInput}
            />
          </label>
        )}
      </div>

      <div className={styles.grid}>
        {Array.from({ length: 100 }, (_, i) => {
          const n = i + 1;
          const highlighted = mode === 'free' ? freeMarks.has(n) : auto.has(n);
          return (
            <button
              key={n}
              type="button"
              className={styles.cell}
              data-on={highlighted}
              onClick={() => toggleCell(n)}
              disabled={mode !== 'free'}
            >
              {n}
            </button>
          );
        })}
      </div>

      <p className={styles.count}>
        {mode === 'free'
          ? `${freeMarks.size} cell${freeMarks.size === 1 ? '' : 's'} marked`
          : `${auto.size} match${auto.size === 1 ? '' : 'es'}`}
      </p>
    </ToolShell>
  );
}
