import { useMemo, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { usePersistedState } from '../../hooks/usePersistedState';
import common from '../common.module.css';
import styles from './Abacus.module.css';

/**
 * Soroban-style abacus.
 * Each rod has 1 heaven bead (value 5) above the reckoning bar, and 4 earth beads (value 1) below.
 *  - Heaven bead "active" = pushed DOWN to the bar.
 *  - Earth beads "active" = pushed UP to the bar.
 * Click a bead to toggle that bead and its adjacent beads on the same side.
 */
interface Rod {
  /** Active heaven bead (0 or 1). */
  heaven: number;
  /** Number of active earth beads (0–4). */
  earth: number;
}

const PRESET_LENGTHS: { id: string; label: string; rods: number }[] = [
  { id: '3', label: '3 rods (0–999)', rods: 3 },
  { id: '5', label: '5 rods (0–99,999)', rods: 5 },
  { id: '7', label: '7 rods (0–9,999,999)', rods: 7 },
];

function blankRod(): Rod {
  return { heaven: 0, earth: 0 };
}

export function Abacus() {
  const [rodCount, setRodCount] = usePersistedState<number>('aba.rods', 5);
  const [rods, setRods] = useState<Rod[]>(() => Array.from({ length: rodCount }, () => blankRod()));

  // Resize rods when rodCount changes
  useMemo(() => {
    setRods((prev) => {
      if (prev.length === rodCount) return prev;
      if (prev.length < rodCount) {
        // Pad on the left (higher place values)
        return [...Array.from({ length: rodCount - prev.length }, () => blankRod()), ...prev];
      }
      // Trim from the left (drop highest place values)
      return prev.slice(prev.length - rodCount);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rodCount]);

  function toggleHeaven(rodIdx: number) {
    setRods((prev) =>
      prev.map((r, i) => (i === rodIdx ? { ...r, heaven: r.heaven === 1 ? 0 : 1 } : r)),
    );
  }

  function setEarth(rodIdx: number, count: number) {
    setRods((prev) =>
      prev.map((r, i) => (i === rodIdx ? { ...r, earth: count } : r)),
    );
  }

  function reset() {
    setRods(Array.from({ length: rodCount }, () => blankRod()));
  }

  // Compute total value (leftmost rod is highest power)
  const total = rods.reduce((sum, r, i) => {
    const power = rodCount - 1 - i;
    const value = (r.heaven * 5 + r.earth) * Math.pow(10, power);
    return sum + value;
  }, 0);

  return (
    <ToolShell
      eyebrow="Teaching Aids"
      title="Abacus"
      description="Soroban-style abacus. Top bead = 5; bottom beads = 1 each. Push beads toward the bar to count."
      actions={
        <button type="button" className={common.btn} onClick={reset}>
          <RotateCcw size={14} /> Reset
        </button>
      }
    >
      <div className={styles.preset}>
        {PRESET_LENGTHS.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`${common.btn} ${styles.presetBtn}`}
            data-active={rodCount === p.rods}
            onClick={() => setRodCount(p.rods)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className={styles.totalDisplay}>
        <span className={`font-display ${styles.totalNum}`}>{total.toLocaleString()}</span>
      </div>

      <div className={styles.frame}>
        <div className={styles.rods}>
          {rods.map((r, rodIdx) => {
            const power = rodCount - 1 - rodIdx;
            const placeValue = Math.pow(10, power);
            return (
              <div key={rodIdx} className={styles.rod}>
                {/* Heaven zone (top) */}
                <div className={styles.heaven}>
                  <button
                    type="button"
                    className={styles.bead}
                    data-active={r.heaven === 1}
                    data-pos="heaven"
                    onClick={() => toggleHeaven(rodIdx)}
                    aria-label="Heaven bead"
                  />
                </div>

                {/* Reckoning bar */}
                <div className={styles.bar} />

                {/* Earth zone (bottom) */}
                <div className={styles.earth}>
                  {[0, 1, 2, 3].map((i) => {
                    const active = i < r.earth;
                    return (
                      <button
                        key={i}
                        type="button"
                        className={styles.bead}
                        data-active={active}
                        data-pos="earth"
                        onClick={() => {
                          // Clicking bead i activates beads 0..i (so the bead at i becomes active),
                          // unless it's already active and is the topmost — then deactivate it and above.
                          if (active && i === r.earth - 1) {
                            setEarth(rodIdx, i);
                          } else {
                            setEarth(rodIdx, i + 1);
                          }
                        }}
                        aria-label={`Earth bead ${i + 1}`}
                      />
                    );
                  })}
                </div>

                <span className={styles.rodLabel}>
                  10<sup>{power}</sup> ·{' '}
                  <span className={styles.rodValue}>{(r.heaven * 5 + r.earth) * placeValue}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <p className={styles.hint}>
        Click the top bead to add 5; click any bottom bead to set that count of ones.
      </p>
    </ToolShell>
  );
}
