import { useMemo, useRef, useState } from 'react';
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

  const { lo, hi, segments, rangeMatchesWedges } = useMemo(() => {
    const lo = Math.min(min, max);
    const hi = Math.max(min, max);
    const rangeSize = hi - lo + 1;
    // Up to 24 wedges: each wedge = one number, the label is the result.
    // Beyond 24: wedges are evenly-spaced sample labels (purely visual); the
    // actual result is drawn uniformly across the full range.
    const count = Math.min(rangeSize, 24);
    const step = rangeSize / count;
    return {
      lo,
      hi,
      segments: Array.from({ length: count }, (_, i) => ({
        label: String(Math.round(lo + i * step)),
      })),
      rangeMatchesWedges: rangeSize <= 24,
    };
  }, [min, max]);

  function spin() {
    if (segments.length === 0) return;
    setLanded(null);
    setSpinning(true);
    if (rangeMatchesWedges) {
      // Each wedge IS a unique value: pick a wedge directly.
      setTarget(randomInt(segments.length));
    } else {
      // Decouple visual from result. Draw uniformly across the real range
      // and pick a roughly-corresponding wedge to land on for visual flavour.
      const pick = lo + randomInt(hi - lo + 1);
      const wedge = Math.min(
        segments.length - 1,
        Math.floor(((pick - lo) / (hi - lo + 1)) * segments.length),
      );
      // Stash the real result on the target object via a parallel state field.
      pendingResultRef.current = pick;
      setTarget(wedge);
    }
  }

  // Holds the "true" random pick for ranges larger than 24 wedges, so onLanded
  // can show the actual value rather than the wedge's representative label.
  const pendingResultRef = useRef<number | null>(null);

  function onLanded(idx: number) {
    if (rangeMatchesWedges) {
      setLanded(Number(segments[idx]!.label));
    } else if (pendingResultRef.current != null) {
      setLanded(pendingResultRef.current);
      pendingResultRef.current = null;
    }
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
