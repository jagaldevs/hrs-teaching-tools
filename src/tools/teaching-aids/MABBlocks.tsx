import { useMemo, useState } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { usePersistedState } from '../../hooks/usePersistedState';
import common from '../common.module.css';
import styles from './MABBlocks.module.css';

/**
 * MAB (Multibase Arithmetic Blocks) — base-10 blocks.
 *  - unit: 1
 *  - long: 10  (a row of 10 unit cubes)
 *  - flat: 100 (a 10×10 face)
 *  - cube: 1000 (a 10×10×10 block)
 *
 * Two modes:
 *  - Build: tap +/− buttons to add/remove each block type.
 *  - Decompose: type a number, see how it breaks into blocks automatically.
 */

type Mode = 'build' | 'decompose';

interface Counts {
  units: number;
  longs: number;
  flats: number;
  cubes: number;
}

const VALUES = { units: 1, longs: 10, flats: 100, cubes: 1000 } as const;
const BLOCK_LABELS = {
  units: 'Units',
  longs: 'Longs',
  flats: 'Flats',
  cubes: 'Cubes',
} as const;

const MAX_PER_TYPE = 30;

export function MABBlocks() {
  const [mode, setMode] = usePersistedState<Mode>('mab.mode', 'build');
  const [counts, setCounts] = useState<Counts>({ units: 0, longs: 0, flats: 0, cubes: 0 });
  const [typedNumber, setTypedNumber] = useState('123');

  const decomposed: Counts = useMemo(() => {
    if (mode !== 'decompose') return counts;
    const n = Math.max(0, Math.min(9999, Math.floor(Number(typedNumber) || 0)));
    const cubes = Math.floor(n / 1000);
    const flats = Math.floor((n % 1000) / 100);
    const longs = Math.floor((n % 100) / 10);
    const units = n % 10;
    return { cubes, flats, longs, units };
  }, [mode, counts, typedNumber]);

  const active = mode === 'build' ? counts : decomposed;

  const total =
    active.units * VALUES.units +
    active.longs * VALUES.longs +
    active.flats * VALUES.flats +
    active.cubes * VALUES.cubes;

  function bump(key: keyof Counts, delta: number) {
    setCounts((prev) => ({
      ...prev,
      [key]: Math.max(0, Math.min(MAX_PER_TYPE, prev[key] + delta)),
    }));
  }

  function resetAll() {
    setCounts({ units: 0, longs: 0, flats: 0, cubes: 0 });
    setTypedNumber('123');
  }

  return (
    <ToolShell
      eyebrow="Teaching Aids"
      title="MAB Blocks"
      description="Base-10 blocks for modelling place value and operations."
      actions={
        <button type="button" className={common.btn} onClick={resetAll}>
          <RotateCcw size={14} /> Reset
        </button>
      }
    >
      <div className={styles.modeRow}>
        <button
          type="button"
          className={`${common.btn} ${styles.modeBtn}`}
          data-active={mode === 'build'}
          onClick={() => setMode('build')}
        >
          Build mode
        </button>
        <button
          type="button"
          className={`${common.btn} ${styles.modeBtn}`}
          data-active={mode === 'decompose'}
          onClick={() => setMode('decompose')}
        >
          Decompose a number
        </button>
      </div>

      {mode === 'decompose' && (
        <div className={styles.decomposeRow}>
          <span className={common.labelText}>Number</span>
          <input
            type="text"
            inputMode="numeric"
            value={typedNumber}
            onChange={(e) => setTypedNumber(e.target.value.replace(/[^0-9]/g, ''))}
            className={styles.numInput}
            placeholder="0–9999"
            maxLength={4}
          />
        </div>
      )}

      <div className={styles.totalCard}>
        <span className={common.labelText}>Total</span>
        <span className={`font-display ${styles.totalNum}`}>{total.toLocaleString()}</span>
        <span className={styles.breakdown}>
          {active.cubes > 0 && `${active.cubes} × 1000`}
          {active.cubes > 0 && (active.flats > 0 || active.longs > 0 || active.units > 0) && ' + '}
          {active.flats > 0 && `${active.flats} × 100`}
          {active.flats > 0 && (active.longs > 0 || active.units > 0) && ' + '}
          {active.longs > 0 && `${active.longs} × 10`}
          {active.longs > 0 && active.units > 0 && ' + '}
          {active.units > 0 && `${active.units} × 1`}
          {total === 0 && '—'}
        </span>
      </div>

      <div className={styles.workspace}>
        {(['cubes', 'flats', 'longs', 'units'] as (keyof Counts)[]).map((key) => (
          <section key={key} className={styles.column}>
            <header className={styles.columnHeader}>
              <span className={styles.columnLabel}>{BLOCK_LABELS[key]}</span>
              <span className={styles.columnValue}>{VALUES[key]}</span>
            </header>

            <div className={styles.blockGrid}>
              {Array.from({ length: active[key] }).map((_, i) => (
                <Block key={i} type={key} />
              ))}
              {active[key] === 0 && <span className={styles.emptyMsg}>—</span>}
            </div>

            {mode === 'build' && (
              <div className={styles.bumpRow}>
                <button
                  type="button"
                  className={styles.bumpBtn}
                  onClick={() => bump(key, -1)}
                  disabled={counts[key] === 0}
                >
                  <Minus size={14} />
                </button>
                <span className={styles.bumpCount}>{counts[key]}</span>
                <button
                  type="button"
                  className={styles.bumpBtn}
                  onClick={() => bump(key, 1)}
                  disabled={counts[key] >= MAX_PER_TYPE}
                >
                  <Plus size={14} />
                </button>
              </div>
            )}
          </section>
        ))}
      </div>
    </ToolShell>
  );
}

/** SVG block rendered at scale appropriate for its place value. */
function Block({ type }: { type: keyof Counts }) {
  if (type === 'units') {
    return (
      <svg viewBox="0 0 10 10" className={styles.unitBlock} aria-label="unit">
        <rect x="0.5" y="0.5" width="9" height="9" />
      </svg>
    );
  }
  if (type === 'longs') {
    return (
      <svg viewBox="0 0 100 10" className={styles.longBlock} aria-label="long">
        {Array.from({ length: 10 }).map((_, i) => (
          <rect key={i} x={i * 10 + 0.4} y="0.4" width="9.2" height="9.2" />
        ))}
      </svg>
    );
  }
  if (type === 'flats') {
    return (
      <svg viewBox="0 0 100 100" className={styles.flatBlock} aria-label="flat">
        {Array.from({ length: 10 }).map((_, row) =>
          Array.from({ length: 10 }).map((__, col) => (
            <rect
              key={`${row}-${col}`}
              x={col * 10 + 0.4}
              y={row * 10 + 0.4}
              width="9.2"
              height="9.2"
            />
          )),
        )}
      </svg>
    );
  }
  // Cube — show as isometric stack
  return (
    <svg viewBox="0 0 120 120" className={styles.cubeBlock} aria-label="cube">
      {/* Top face (parallelogram) */}
      <path d="M 20 30 L 80 30 L 100 10 L 40 10 Z" className={styles.cubeFaceTop} />
      {/* Right face */}
      <path d="M 80 30 L 80 100 L 100 80 L 100 10 Z" className={styles.cubeFaceRight} />
      {/* Front face */}
      <path d="M 20 30 L 80 30 L 80 100 L 20 100 Z" className={styles.cubeFaceFront} />
      {/* Inner grid lines on front face */}
      {Array.from({ length: 11 }).map((_, i) => (
        <line
          key={`vf-${i}`}
          x1={20 + i * 6}
          y1="30"
          x2={20 + i * 6}
          y2="100"
          className={styles.cubeLine}
        />
      ))}
      {Array.from({ length: 11 }).map((_, i) => (
        <line
          key={`hf-${i}`}
          x1="20"
          y1={30 + i * 7}
          x2="80"
          y2={30 + i * 7}
          className={styles.cubeLine}
        />
      ))}
    </svg>
  );
}
