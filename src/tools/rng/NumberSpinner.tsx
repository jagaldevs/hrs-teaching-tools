import { useMemo, useState } from 'react';
import { Loader, Repeat } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { Wheel } from './Wheel';
import { randomInt } from './util';
import { usePersistedState } from '../../hooks/usePersistedState';
import common from '../common.module.css';
import styles from './NumberSpinner.module.css';

export function NumberSpinner() {
  const [min, setMin] = usePersistedState<number>('numspin.min', 1);
  const [max, setMax] = usePersistedState<number>('numspin.max', 10);
  const [target, setTarget] = useState<number | null>(null);
  const [landed, setLanded] = useState<number | null>(null);
  const [spinning, setSpinning] = useState(false);

  const segments = useMemo(() => {
    const lo = Math.min(min, max);
    const hi = Math.max(min, max);
    const count = Math.min(hi - lo + 1, 24); // cap for readability
    const step = (hi - lo + 1) / count;
    return Array.from({ length: count }, (_, i) => ({
      label: String(Math.round(lo + i * step)),
    }));
  }, [min, max]);

  function spin() {
    if (segments.length === 0) return;
    const t = randomInt(segments.length);
    setLanded(null);
    setSpinning(true);
    setTarget(t);
  }

  function onLanded(idx: number) {
    setLanded(Number(segments[idx]!.label));
    setSpinning(false);
  }

  return (
    <ToolShell
      eyebrow="Randomisers"
      title="Number Spinner"
      description="Spin a wheel of numbers within any range. Crypto-strong randomness."
    >
      <Wheel segments={segments} targetIndex={target} onLanded={onLanded} size={Math.min(420, 80 * Math.min(segments.length, 6))} />

      <div className={styles.result}>
        {landed != null ? (
          <span className={`font-display ${styles.resultNum}`}>{landed}</span>
        ) : (
          <span className={styles.placeholder}>Press spin</span>
        )}
      </div>

      <div className={common.controlRow}>
        <button
          type="button"
          className={`${common.btn} ${common.btnPrimary}`}
          onClick={spin}
          disabled={spinning}
        >
          {spinning ? <Loader size={14} className={styles.spinIcon} /> : <Repeat size={14} />}
          {spinning ? 'Spinning…' : 'Spin'}
        </button>
      </div>

      <section className={styles.range}>
        <label className={styles.field}>
          <span className={common.labelText}>Min</span>
          <input
            className={common.numericInput}
            type="number"
            value={min}
            onChange={(e) => setMin(Number(e.target.value) || 0)}
            disabled={spinning}
          />
        </label>
        <label className={styles.field}>
          <span className={common.labelText}>Max</span>
          <input
            className={common.numericInput}
            type="number"
            value={max}
            onChange={(e) => setMax(Number(e.target.value) || 0)}
            disabled={spinning}
          />
        </label>
      </section>
    </ToolShell>
  );
}
