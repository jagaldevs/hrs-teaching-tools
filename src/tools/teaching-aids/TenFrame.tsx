import { useState } from 'react';
import { RotateCcw, Plus, Minus } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { usePersistedState } from '../../hooks/usePersistedState';
import common from '../common.module.css';
import styles from './TenFrame.module.css';

type Mode = 'ten-frame' | 'rekenrek';

export function TenFrame() {
  const [mode, setMode] = usePersistedState<Mode>('tf.mode', 'ten-frame');

  // Ten frame: 0-20 (two frames)
  const [tfCount, setTfCount] = useState(0);
  const [tfFrames, setTfFrames] = usePersistedState<1 | 2>('tf.frames', 1);
  const tfMax = tfFrames * 10;

  // Rekenrek: top bar + bottom bar, each up to 10 beads (left/right split)
  const [topLeft, setTopLeft] = useState(0);
  const [botLeft, setBotLeft] = useState(0);

  function reset() {
    setTfCount(0);
    setTopLeft(0);
    setBotLeft(0);
  }

  return (
    <ToolShell
      eyebrow="Teaching Aids"
      title="Ten Frame & Rekenrek"
      description="Lower-Primary number sense: counters in 10-frames, plus rekenrek bead bars."
      actions={
        <button type="button" className={common.btn} onClick={reset}>
          <RotateCcw size={14} /> Reset
        </button>
      }
    >
      <div className={styles.modeRow}>
        <button
          type="button"
          className={`${common.btn} ${styles.modeBtn}`}
          data-active={mode === 'ten-frame'}
          onClick={() => setMode('ten-frame')}
        >
          Ten Frame
        </button>
        <button
          type="button"
          className={`${common.btn} ${styles.modeBtn}`}
          data-active={mode === 'rekenrek'}
          onClick={() => setMode('rekenrek')}
        >
          Rekenrek
        </button>
      </div>

      {mode === 'ten-frame' && (
        <>
          <div className={styles.framesToggle}>
            <span className={common.labelText}>Frames</span>
            <button
              type="button"
              className={`${common.btn} ${styles.frameBtn}`}
              data-active={tfFrames === 1}
              onClick={() => { setTfFrames(1); setTfCount((c) => Math.min(c, 10)); }}
            >
              One (0–10)
            </button>
            <button
              type="button"
              className={`${common.btn} ${styles.frameBtn}`}
              data-active={tfFrames === 2}
              onClick={() => setTfFrames(2)}
            >
              Two (0–20)
            </button>
          </div>

          <div className={styles.tfStack}>
            {Array.from({ length: tfFrames }).map((_, f) => (
              <div key={f} className={styles.frame}>
                {Array.from({ length: 10 }).map((_, i) => {
                  const idx = f * 10 + i;
                  const filled = idx < tfCount;
                  return (
                    <button
                      key={i}
                      type="button"
                      className={styles.cell}
                      data-filled={filled}
                      onClick={() => setTfCount(filled ? idx : idx + 1)}
                    >
                      {filled && <span className={styles.counter} />}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          <div className={styles.tfControls}>
            <button
              type="button"
              className={common.btn}
              onClick={() => setTfCount((c) => Math.max(0, c - 1))}
              disabled={tfCount === 0}
            >
              <Minus size={14} />
            </button>
            <span className={`font-display ${styles.bigNum}`}>{tfCount}</span>
            <button
              type="button"
              className={common.btn}
              onClick={() => setTfCount((c) => Math.min(tfMax, c + 1))}
              disabled={tfCount === tfMax}
            >
              <Plus size={14} />
            </button>
          </div>
        </>
      )}

      {mode === 'rekenrek' && (
        <>
          <div className={styles.rekStack}>
            <Bar leftCount={topLeft} onChange={setTopLeft} colour="#E6007E" altColour="#fff" />
            <Bar leftCount={botLeft} onChange={setBotLeft} colour="#fff" altColour="#E6007E" />
          </div>

          <div className={styles.tfControls}>
            <span className={`font-display ${styles.bigNum}`}>{topLeft + botLeft}</span>
            <span className={common.labelText}>
              {topLeft} + {botLeft}
            </span>
          </div>

          <p className={styles.hint}>
            Click a bead to slide all the beads at or below it to the left.
            The number on the left is the count.
          </p>
        </>
      )}
    </ToolShell>
  );
}

interface BarProps {
  leftCount: number;
  onChange: (n: number) => void;
  colour: string;
  altColour: string;
}

function Bar({ leftCount, onChange, colour, altColour }: BarProps) {
  // Beads: first 5 on the left half, next 5 on the right half — classic rekenrek colouring
  return (
    <div className={styles.bar}>
      <div className={styles.barLeft}>
        {Array.from({ length: leftCount }).map((_, i) => (
          <button
            key={i}
            type="button"
            className={styles.bead}
            style={{ background: i < 5 ? colour : altColour, borderColor: '#222' }}
            onClick={() => onChange(i)}
            aria-label={`Move beads back`}
          />
        ))}
      </div>
      <div className={styles.barRod} />
      <div className={styles.barRight}>
        {Array.from({ length: 10 - leftCount }).map((_, i) => {
          const beadIdx = leftCount + i;
          return (
            <button
              key={beadIdx}
              type="button"
              className={styles.bead}
              style={{ background: beadIdx < 5 ? colour : altColour, borderColor: '#222' }}
              onClick={() => onChange(beadIdx + 1)}
              aria-label="Move beads to left"
            />
          );
        })}
      </div>
    </div>
  );
}
