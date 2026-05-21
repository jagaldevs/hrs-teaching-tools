import { useMemo, useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { usePersistedState } from '../../hooks/usePersistedState';
import common from '../common.module.css';
import styles from './FDPConverter.module.css';

type Mode = 'decimal' | 'fraction' | 'percent';

const PRESETS: { label: string; value: number }[] = [
  { label: '1/2', value: 0.5 },
  { label: '1/3', value: 1 / 3 },
  { label: '2/3', value: 2 / 3 },
  { label: '1/4', value: 0.25 },
  { label: '3/4', value: 0.75 },
  { label: '1/5', value: 0.2 },
  { label: '1/8', value: 0.125 },
  { label: '1/10', value: 0.1 },
];

/** Greatest common divisor (Euclidean). */
function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a || 1;
}

/** Convert a decimal to a simple fraction by scanning denominators up to 1000. */
function decimalToFraction(d: number): { num: number; den: number; exact: boolean } {
  if (d === 0) return { num: 0, den: 1, exact: true };
  if (Number.isInteger(d)) return { num: d, den: 1, exact: true };

  // Try common denominators first for cleaner results (2..100)
  for (let den = 1; den <= 1000; den++) {
    const num = d * den;
    if (Math.abs(num - Math.round(num)) < 1e-9) {
      const g = gcd(Math.round(num), den);
      return { num: Math.round(num) / g, den: den / g, exact: true };
    }
  }
  // Fallback: continued-fraction approximation
  const den = 10000;
  const num = Math.round(d * den);
  const g = gcd(num, den);
  return { num: num / g, den: den / g, exact: false };
}

function parseFraction(s: string): number | null {
  const m = s.trim().match(/^(-?\d+)\s*\/\s*(\d+)$/);
  if (!m) return null;
  const num = Number(m[1]);
  const den = Number(m[2]);
  if (den === 0) return null;
  return num / den;
}

export function FDPConverter() {
  const [mode, setMode] = usePersistedState<Mode>('fdp.mode', 'fraction');
  const [input, setInput] = useState('1/2');
  const [error, setError] = useState<string | null>(null);

  const value: number | null = useMemo(() => {
    setError(null);
    const trimmed = input.trim();
    if (trimmed === '') return null;
    if (mode === 'fraction') {
      const v = parseFraction(trimmed);
      if (v == null) {
        setError('Use format like "3/4".');
        return null;
      }
      return v;
    }
    const cleaned = trimmed.replace(/[%,]/g, '');
    const n = Number(cleaned);
    if (Number.isNaN(n)) {
      setError('Enter a number.');
      return null;
    }
    return mode === 'percent' ? n / 100 : n;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, mode]);

  const frac = value == null ? null : decimalToFraction(value);
  const decimal = value == null ? null : value;
  const percent = value == null ? null : value * 100;

  function applyPreset(v: number) {
    if (mode === 'fraction') {
      const f = decimalToFraction(v);
      setInput(`${f.num}/${f.den}`);
    } else if (mode === 'percent') {
      setInput(`${Math.round(v * 1000) / 10}`);
    } else {
      setInput(`${Math.round(v * 10000) / 10000}`);
    }
  }

  function cycleMode() {
    const order: Mode[] = ['fraction', 'decimal', 'percent'];
    const next = order[(order.indexOf(mode) + 1) % order.length]!;
    if (value != null) {
      // Convert current value into the new mode's representation
      if (next === 'fraction') {
        const f = decimalToFraction(value);
        setInput(`${f.num}/${f.den}`);
      } else if (next === 'percent') {
        setInput(`${Math.round(value * 1000) / 10}`);
      } else {
        setInput(`${Math.round(value * 10000) / 10000}`);
      }
    }
    setMode(next);
  }

  return (
    <ToolShell
      eyebrow="Numeracy"
      title="Fraction · Decimal · Percent"
      description="Type any value in any form and see all three representations side-by-side."
      actions={
        <button type="button" className={common.btn} onClick={cycleMode}>
          <ArrowLeftRight size={14} /> Input as: {mode}
        </button>
      }
    >
      <div className={styles.inputRow}>
        <label className={styles.inputLabel}>
          <span className={common.labelText}>Enter as {mode}</span>
          <input
            className={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'fraction' ? '3/4' : mode === 'percent' ? '75' : '0.75'}
            autoFocus
          />
        </label>
        {error && <p className={styles.error}>{error}</p>}
      </div>

      <section className={styles.outputs}>
        <Card label="Fraction" value={frac ? `${frac.num}/${frac.den}` : '—'} hint={frac && !frac.exact ? '(approximation)' : undefined} />
        <Card label="Decimal" value={decimal == null ? '—' : Math.round(decimal * 10000) / 10000} />
        <Card label="Percent" value={percent == null ? '—' : `${Math.round(percent * 100) / 100}%`} />
      </section>

      <section className={styles.presets}>
        <p className={common.labelText}>Common values</p>
        <div className={styles.presetRow}>
          {PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              className={`${common.btn} ${styles.presetBtn}`}
              onClick={() => applyPreset(p.value)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </section>
    </ToolShell>
  );
}

function Card({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <div className={styles.card}>
      <span className={common.labelText}>{label}</span>
      <span className={`font-display ${styles.cardValue}`}>{value}</span>
      {hint && <span className={styles.cardHint}>{hint}</span>}
    </div>
  );
}
