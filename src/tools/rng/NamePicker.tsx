import { useMemo, useState } from 'react';
import { Sparkles, RotateCcw, Settings } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { randomInt, parseRoster } from './util';
import { usePersistedState } from '../../hooks/usePersistedState';
import common from '../common.module.css';
import styles from './NamePicker.module.css';

export function NamePicker() {
  const [roster, setRoster] = usePersistedState<string>('namepicker.roster', '');
  const [fairMode, setFairMode] = usePersistedState<boolean>('namepicker.fair', true);
  const [picked, setPicked] = useState<string[]>([]);
  const [current, setCurrent] = useState<string | null>(null);
  const [animating, setAnimating] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const names = useMemo(() => parseRoster(roster), [roster]);

  const remaining = useMemo(() => {
    if (!fairMode) return names;
    return names.filter((n) => !picked.includes(n));
  }, [names, picked, fairMode]);

  function pick() {
    if (remaining.length === 0) return;
    setAnimating(true);
    // Quick churn for drama
    let ticks = 0;
    const id = window.setInterval(() => {
      setCurrent(remaining[randomInt(remaining.length)] ?? null);
      ticks++;
      if (ticks > 16) {
        window.clearInterval(id);
        const chosen = remaining[randomInt(remaining.length)] ?? null;
        setCurrent(chosen);
        if (chosen) setPicked((p) => [chosen, ...p]);
        setAnimating(false);
      }
    }, 70);
  }

  function resetCycle() {
    setPicked([]);
    setCurrent(null);
  }

  const showFairExhausted = fairMode && remaining.length === 0 && names.length > 0;

  return (
    <ToolShell
      eyebrow="Randomisers"
      title="Name Picker"
      description="Random student selector. Fair mode never repeats a name until the whole class has had a turn."
      actions={
        <button
          type="button"
          className={common.btn}
          onClick={() => setSettingsOpen((s) => !s)}
        >
          <Settings size={14} /> {settingsOpen ? 'Close' : 'Roster'}
        </button>
      }
    >
      <div className={styles.stage}>
        {names.length === 0 ? (
          <p className={styles.empty}>Add names below to get started.</p>
        ) : showFairExhausted ? (
          <>
            <p className={styles.exhausted}>Everyone has had a turn.</p>
            <button type="button" className={`${common.btn} ${common.btnPrimary}`} onClick={resetCycle}>
              <RotateCcw size={14} /> New round
            </button>
          </>
        ) : (
          <>
            <span
              className={`font-display ${styles.name}`}
              data-animating={animating}
            >
              {current ?? 'Press pick'}
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
              {picked.length > 0 && (
                <button type="button" className={common.btn} onClick={resetCycle}>
                  <RotateCcw size={14} /> Reset
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {picked.length > 0 && (
        <section className={styles.history}>
          <p className={common.labelText}>
            Picked so far · {picked.length}/{names.length}
          </p>
          <ul className={styles.historyList}>
            {picked.map((n, i) => (
              <li key={`${n}-${i}`} className={styles.historyItem}>
                {n}
              </li>
            ))}
          </ul>
        </section>
      )}

      {settingsOpen && (
        <section className={styles.settings}>
          <header className={styles.settingsHeader}>
            <p className={common.labelText}>Class roster</p>
            <label className={styles.fairToggle}>
              <input
                type="checkbox"
                checked={fairMode}
                onChange={(e) => setFairMode(e.target.checked)}
              />
              <span>Fair mode (no repeats until full class)</span>
            </label>
          </header>
          <textarea
            className={styles.textarea}
            value={roster}
            onChange={(e) => setRoster(e.target.value)}
            placeholder={'One name per line, or comma-separated.\nE.g.\nAva\nNoah\nLiam, Mia, Zoe'}
            rows={10}
          />
          <p className={styles.count}>{names.length} names</p>
        </section>
      )}
    </ToolShell>
  );
}
