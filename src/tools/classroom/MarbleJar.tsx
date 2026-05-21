import { useEffect, useState } from 'react';
import { Plus, Minus, RotateCcw, Trophy, Settings } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { chimeComplete, chimeTick } from '../chime';
import { usePersistedState } from '../../hooks/usePersistedState';
import common from '../common.module.css';
import styles from './MarbleJar.module.css';

const MARBLE_COLOURS = ['#E6007E', '#0EA5E9', '#10B981', '#F59E0B', '#A855F7', '#EF4444', '#FB7185'];

interface Marble {
  id: string;
  colour: string;
}

export function MarbleJar() {
  const [marbles, setMarbles] = usePersistedState<Marble[]>('jar.marbles', []);
  const [goal, setGoal] = usePersistedState<number>('jar.goal', 50);
  const [celebrating, setCelebrating] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  function addMarble() {
    chimeTick();
    setMarbles((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        colour: MARBLE_COLOURS[prev.length % MARBLE_COLOURS.length]!,
      },
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

            {/* Marble pile (clipped to jar shape) */}
            <g clipPath="url(#jarClip)">
              {marbles.map((m, i) => {
                const row = Math.floor(i / 8);
                const col = i % 8;
                const cx = 60 + col * 10.5 + (row % 2) * 5.25;
                const cy = 222 - row * 9;
                return (
                  <circle
                    key={m.id}
                    cx={cx}
                    cy={cy}
                    r={5}
                    fill={m.colour}
                    className={styles.marble}
                    style={{ animationDelay: `${(marbles.length - 1 - i) * 12}ms` }}
                  />
                );
              })}
            </g>

            {/* Goal line */}
            {goal > 0 && (
              <line
                x1="50"
                y1={230 - Math.min(170, (goal / 60) * 170)}
                x2="150"
                y2={230 - Math.min(170, (goal / 60) * 170)}
                className={styles.goalLine}
                strokeDasharray="3 3"
              />
            )}
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
              onChange={(e) => setGoal(Math.max(1, Number(e.target.value) || 1))}
              className={common.numericInput}
            />
          </label>
        </section>
      )}
    </ToolShell>
  );
}
