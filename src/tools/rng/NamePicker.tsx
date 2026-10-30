import { useEffect, useMemo, useRef, useState } from 'react';
import { Sparkles, RotateCcw } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { randomInt } from './util';
import { usePersistedState } from '../../hooks/usePersistedState';
import { RosterBar } from '../classes/RosterBar';
import { displayNames, usePresentStudents } from '../classes/rosters';
import common from '../common.module.css';
import styles from './NamePicker.module.css';

export function NamePicker() {
  const { roster, present } = usePresentStudents();
  const [fairMode, setFairMode] = usePersistedState<boolean>('namepicker.fair', true);
  // Who's had a turn, per class, by student id — survives a page reload.
  const [picked, setPicked] = usePersistedState<string[]>(`namepicker.picked.${roster?.id ?? 'none'}`, []);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [animating, setAnimating] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (intervalRef.current != null) window.clearInterval(intervalRef.current);
  }, []);

  // A different class shows a fresh stage.
  useEffect(() => setCurrentId(null), [roster?.id]);

  const names = useMemo(() => (roster ? displayNames(roster.students) : new Map<string, string>()), [roster]);
  const pickedHere = picked.filter((id) => names.has(id));
  const remaining = fairMode ? present.filter((s) => !pickedHere.includes(s.id)) : present;

  function pick() {
    if (remaining.length === 0) return;
    const pool = remaining;
    setAnimating(true);
    let ticks = 0;
    intervalRef.current = window.setInterval(() => {
      setCurrentId(pool[randomInt(pool.length)]!.id);
      ticks++;
      if (ticks > 16) {
        window.clearInterval(intervalRef.current!);
        intervalRef.current = null;
        const chosen = pool[randomInt(pool.length)]!.id;
        setCurrentId(chosen);
        setPicked((p) => [chosen, ...p.filter((id) => id !== chosen)]);
        setAnimating(false);
      }
    }, 70);
  }

  function resetCycle() {
    setPicked([]);
    setCurrentId(null);
  }

  const showFairExhausted = fairMode && remaining.length === 0 && present.length > 0;

  return (
    <ToolShell
      eyebrow="Randomisers"
      title="Name Picker"
      description="Random student selector. Fair mode never repeats a name until the whole class has had a turn."
      actions={
        <label className={styles.fairToggle}>
          <input type="checkbox" checked={fairMode} onChange={(e) => setFairMode(e.target.checked)} />
          <span>Fair mode</span>
        </label>
      }
    >
      <RosterBar />

      {roster && (
        <div className={styles.stage}>
          {present.length === 0 ? (
            <p className={styles.empty}>
              {roster.students.length === 0
                ? 'This class has no names yet. Add them in Manage classes.'
                : 'Everyone in this class is marked away.'}
            </p>
          ) : showFairExhausted ? (
            <>
              <p className={styles.exhausted}>Everyone has had a turn.</p>
              <button type="button" className={`${common.btn} ${common.btnPrimary}`} onClick={resetCycle}>
                <RotateCcw size={14} /> New round
              </button>
            </>
          ) : (
            <>
              <span className={`font-display ${styles.name}`} data-animating={animating}>
                {currentId ? names.get(currentId) : 'Press pick'}
              </span>
              <div className={common.controlRow}>
                <button
                  type="button"
                  className={`${common.btn} ${common.btnPrimary}`}
                  onClick={pick}
                  disabled={animating}
                >
                  <Sparkles size={14} /> Pick a name
                </button>
                {pickedHere.length > 0 && (
                  <button type="button" className={common.btn} onClick={resetCycle}>
                    <RotateCcw size={14} /> Reset
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {pickedHere.length > 0 && (
        <section className={styles.history}>
          <p className={common.labelText}>
            Picked so far · {present.filter((s) => pickedHere.includes(s.id)).length}/{present.length} in today
          </p>
          <ul className={styles.historyList}>
            {pickedHere.map((id) => (
              <li key={id} className={styles.historyItem}>
                {names.get(id)}
              </li>
            ))}
          </ul>
        </section>
      )}
    </ToolShell>
  );
}
