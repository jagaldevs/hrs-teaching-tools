import { useMemo, useState } from 'react';
import { ChevronUp, ChevronDown, RotateCcw } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { usePersistedState } from '../../hooks/usePersistedState';
import common from '../common.module.css';
import styles from './PlaceValueChart.module.css';

interface Column {
  /** Power of 10 (e.g. 3 = thousands, -2 = hundredths). */
  power: number;
  label: string;
  short: string;
}

const ALL_COLUMNS: Column[] = [
  { power: 6, label: 'Millions', short: 'M' },
  { power: 5, label: 'Hundred-thousands', short: 'HTh' },
  { power: 4, label: 'Ten-thousands', short: 'TTh' },
  { power: 3, label: 'Thousands', short: 'Th' },
  { power: 2, label: 'Hundreds', short: 'H' },
  { power: 1, label: 'Tens', short: 'T' },
  { power: 0, label: 'Ones', short: 'O' },
  { power: -1, label: 'Tenths', short: 't' },
  { power: -2, label: 'Hundredths', short: 'h' },
  { power: -3, label: 'Thousandths', short: 'th' },
];

type Scope = 'thousands' | 'millions' | 'decimals' | 'all';

const SCOPES: { id: Scope; label: string; range: [number, number] }[] = [
  { id: 'thousands', label: 'Up to thousands', range: [3, 0] },
  { id: 'millions', label: 'Up to millions', range: [6, 0] },
  { id: 'decimals', label: 'Decimals (Th → th)', range: [3, -3] },
  { id: 'all', label: 'Full (M → th)', range: [6, -3] },
];

export function PlaceValueChart() {
  const [scope, setScope] = usePersistedState<Scope>('pvc.scope', 'thousands');
  const scopeDef = SCOPES.find((s) => s.id === scope) ?? SCOPES[0]!;
  const cols = useMemo(
    () => ALL_COLUMNS.filter((c) => c.power <= scopeDef.range[0] && c.power >= scopeDef.range[1]),
    [scopeDef],
  );

  const [digits, setDigits] = useState<Record<number, number>>({});

  function bump(power: number, delta: number) {
    setDigits((prev) => {
      const cur = prev[power] ?? 0;
      const next = ((cur + delta) % 10 + 10) % 10;
      return { ...prev, [power]: next };
    });
  }

  function setDigit(power: number, value: number) {
    setDigits((prev) => ({ ...prev, [power]: ((value % 10) + 10) % 10 }));
  }

  function reset() {
    setDigits({});
  }

  // Compute the value of the number based on current digits
  const numericValue = cols.reduce((acc, col) => {
    const d = digits[col.power] ?? 0;
    return acc + d * Math.pow(10, col.power);
  }, 0);

  // Format for display: combine integer and decimal parts
  const integerPart = cols
    .filter((c) => c.power >= 0)
    .sort((a, b) => b.power - a.power)
    .map((c) => digits[c.power] ?? 0);
  const decimalPart = cols
    .filter((c) => c.power < 0)
    .sort((a, b) => b.power - a.power)
    .map((c) => digits[c.power] ?? 0);

  const intStr = integerPart.length > 0 ? integerPart.join('') : '0';
  const decStr = decimalPart.length > 0 ? decimalPart.join('') : '';

  const displayStr = decStr ? `${intStr}.${decStr}` : intStr;

  return (
    <ToolShell
      eyebrow="Teaching Aids"
      title="Place Value Chart"
      description="Set each column's digit with the arrows or by typing. See the full number update live."
      actions={
        <button type="button" className={common.btn} onClick={reset}>
          <RotateCcw size={14} /> Reset
        </button>
      }
    >
      <div className={styles.scopeRow}>
        {SCOPES.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`${common.btn} ${styles.scopeBtn}`}
            data-active={scope === s.id}
            onClick={() => setScope(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className={styles.bigDisplay}>
        <span className={`font-display ${styles.bigNum}`}>{displayStr}</span>
        <span className={styles.bigName}>
          {Number.isInteger(numericValue)
            ? numericValue.toLocaleString()
            : (Math.round(numericValue * 1000) / 1000).toLocaleString()}
        </span>
      </div>

      <div className={styles.chart}>
        {cols.map((col) => {
          const d = digits[col.power] ?? 0;
          const isDecimal = col.power < 0;
          return (
            <div key={col.power} className={styles.col} data-decimal={isDecimal}>
              <span className={styles.colLabel}>{col.label}</span>
              <span className={styles.colShort}>{col.short}</span>
              <button
                type="button"
                className={styles.arrow}
                onClick={() => bump(col.power, 1)}
                aria-label={`Increase ${col.label}`}
              >
                <ChevronUp size={20} />
              </button>
              <input
                type="text"
                inputMode="numeric"
                value={d}
                onChange={(e) => {
                  const v = Number(e.target.value.slice(-1));
                  if (!Number.isNaN(v)) setDigit(col.power, v);
                }}
                className={styles.digit}
              />
              <button
                type="button"
                className={styles.arrow}
                onClick={() => bump(col.power, -1)}
                aria-label={`Decrease ${col.label}`}
              >
                <ChevronDown size={20} />
              </button>
              <span className={styles.colValue}>{d * Math.pow(10, col.power)}</span>
            </div>
          );
        })}
      </div>
    </ToolShell>
  );
}
