import { useEffect, useMemo, useState } from 'react';
import { Plus, Minus, RotateCcw, Trophy, Settings } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { chimeComplete, chimeTick } from '../chime';
import { usePersistedState } from '../../hooks/usePersistedState';
import { categorical } from '../../theme/palette';
import common from '../common.module.css';
import styles from './MarbleJar.module.css';


interface Marble {
  id: string;
  /** Legacy: older saves stored a hex colour. Marbles are now coloured by position. */
  colour?: string;
}

// Jar interior dimensions in viewBox units.
const JAR_X = 55;
const JAR_W = 90;
const JAR_TOP_Y = 60;
const JAR_BOTTOM_Y = 230;
const JAR_H = JAR_BOTTOM_Y - JAR_TOP_Y;

/**
 * Pick a marble radius + grid that lets `goal` marbles fill the jar nicely.
 * Bigger goal = smaller marbles, more rows / columns.
 */
function computeLayout(goal: number) {
  // Target packing: goal marbles fill ~80% of jar interior area.
  // π * r² * goal ≈ JAR_W * JAR_H * 0.8
  const ideal = Math.sqrt((JAR_W * JAR_H * 0.8) / (goal * Math.PI));
  const radius = Math.max(2.4, Math.min(10, ideal));
  const colSpacing = radius * 2.05;
  const rowSpacing = radius * 2.0;
  const cols = Math.max(1, Math.floor(JAR_W / colSpacing));
  // Centre the column grid horizontally
  const xPad = (JAR_W - cols * colSpacing) / 2 + colSpacing / 2;
  return { radius, cols, colSpacing, rowSpacing, xPad };
}

export function MarbleJar() {
  const [marbles, setMarbles] = usePersistedState<Marble[]>('jar.marbles', []);
  const [goal, setGoal] = usePersistedState<number>('jar.goal', 50);
  const [celebrating, setCelebrating] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const layout = useMemo(() => computeLayout(goal), [goal]);

  function addMarble() {
    if (marbles.length >= goal) return; // capped at the goal
    chimeTick();
    setMarbles((prev) => [
      ...prev,
      { id: crypto.randomUUID() },
    ]);
  }

  function removeMarble() {
    setMarbles((prev) => prev.slice(0, -1));
  }

  function reset() {
    setMarbles([]);
    setCelebrating(false);
  }

  useEffect(() => {
    if (marbles.length >= goal && goal > 0 && !celebrating) {
      setCelebrating(true);
      chimeComplete();
    }
    if (marbles.length < goal && celebrating) setCelebrating(false);
  }, [marbles.length, goal, celebrating]);

  // If the new goal is smaller than current marble count, trim the marbles down
  function applyGoal(next: number) {
    const n = Math.max(1, Math.min(500, Math.floor(next) || 1));
    setGoal(n);
    if (marbles.length > n) setMarbles((prev) => prev.slice(0, n));
  }

  const fillPct = goal > 0 ? Math.min(100, (marbles.length / goal) * 100) : 0;

  return (
    <ToolShell
      eyebrow="Classroom"
      title="Marble Jar Reward"
      description="Drop a marble for great behaviour. Hit the goal and the class earns a reward."
      actions={
        <button type="button" className={common.btn} onClick={() => setSettingsOpen((s) => !s)}>
          <Settings size={14} /> Goal
        </button>
      }
    >
      <div className={styles.layout}>
        <div className={styles.jarWrap}>
          <svg viewBox="0 0 200 240" className={styles.jar}>
            <defs>
              <clipPath id="jarClip">
                <path d="M 50 60 Q 50 50 60 50 L 140 50 Q 150 50 150 60 L 150 220 Q 150 230 140 230 L 60 230 Q 50 230 50 220 Z" />
              </clipPath>
            </defs>

            {/* Lid */}
            <rect x="55" y="40" width="90" height="12" rx="2" className={styles.lid} />

            {/* Jar outline */}
            <path
              d="M 50 60 Q 50 50 60 50 L 140 50 Q 150 50 150 60 L 150 220 Q 150 230 140 230 L 60 230 Q 50 230 50 220 Z"
              className={styles.jarBody}
            />

            {/* Marble pile — packed so `goal` marbles fill the jar */}
            <g clipPath="url(#jarClip)">
              {marbles.map((m, i) => {
                const row = Math.floor(i / layout.cols);
                const col = i % layout.cols;
                const cx = JAR_X + layout.xPad + col * layout.colSpacing;
                const cy =
                  JAR_BOTTOM_Y - layout.radius - row * layout.rowSpacing;
                return (
                  <circle
                    key={m.id}
                    cx={cx}
                    cy={cy}
                    r={layout.radius}
                    fill={categorical(i)}
                    className={styles.marble}
                    style={{ animationDelay: `${Math.min(400, (marbles.length - 1 - i) * 10)}ms` }}
                  />
                );
              })}
            </g>
          </svg>
        </div>

        <div className={styles.stats}>
          <div className={styles.bigCount}>
            <span className={`font-display ${styles.count}`}>{marbles.length}</span>
            <span className={styles.divider}>/</span>
            <span className={styles.goalNum}>{goal}</span>
          </div>
          <div className={styles.bar}>
            <div className={styles.barFill} style={{ width: `${fillPct}%` }} />
          </div>
          <p className={styles.pct}>{Math.round(fillPct)}% to goal</p>

          {celebrating && (
            <div className={styles.celebrate}>
              <Trophy size={28} />
              <span>Goal reached! 🎉</span>
            </div>
          )}

          <div className={common.controlRow}>
            <button
              type="button"
              className={`${common.btn} ${common.btnPrimary}`}
              onClick={addMarble}
              disabled={marbles.length >= goal}
            >
              <Plus size={14} /> Add marble
            </button>
            <button type="button" className={common.btn} onClick={removeMarble} disabled={marbles.length === 0}>
              <Minus size={14} /> Remove
            </button>
            <button type="button" className={common.btn} onClick={reset} disabled={marbles.length === 0}>
              <RotateCcw size={14} /> Reset
            </button>
          </div>
        </div>
      </div>

      {settingsOpen && (
        <section className={styles.settings}>
          <label className={styles.field}>
            <span className={common.labelText}>Marbles for reward</span>
            <input
              type="number"
              min={1}
              max={500}
              value={goal}
              onChange={(e) => applyGoal(Number(e.target.value))}
              className={common.numericInput}
            />
          </label>
          <div className={styles.presetRow}>
            <span className={common.labelText}>Quick set:</span>
            {[10, 20, 30, 50, 100, 200].map((g) => (
              <button
                key={g}
                type="button"
                className={`${common.btn} ${styles.presetBtn}`}
                data-active={goal === g}
                onClick={() => applyGoal(g)}
              >
                {g}
              </button>
            ))}
          </div>
        </section>
      )}
    </ToolShell>
  );
}
