import { useCallback, useEffect, useState } from 'react';
import { RotateCcw, Plus, Minus } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { chimeTick } from '../chime';
import { usePersistedState } from '../../hooks/usePersistedState';
import common from '../common.module.css';
import styles from './TeamBuzzers.module.css';

interface Team {
  id: string;
  name: string;
  colour: string;
  hotkey: string;
  score: number;
}

const COLOURS = ['#E6007E', '#0EA5E9', '#10B981', '#F59E0B', '#A855F7', '#EF4444'];
const HOTKEYS = ['1', '2', '3', '4', '5', '6'];

function defaultTeams(n: number): Team[] {
  return Array.from({ length: n }, (_, i) => ({
    id: crypto.randomUUID(),
    name: `Team ${i + 1}`,
    colour: COLOURS[i % COLOURS.length]!,
    hotkey: HOTKEYS[i] ?? '',
    score: 0,
  }));
}

export function TeamBuzzers() {
  const [teams, setTeams] = usePersistedState<Team[]>('buzzers.teams', defaultTeams(4));
  const [buzzed, setBuzzed] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);

  const buzz = useCallback(
    (id: string) => {
      if (locked) return;
      setBuzzed(id);
      setLocked(true);
      chimeTick();
    },
    [locked],
  );

  function clearBuzz() {
    setBuzzed(null);
    setLocked(false);
  }

  function award(id: string, delta: number) {
    setTeams((prev) => prev.map((t) => (t.id === id ? { ...t, score: Math.max(0, t.score + delta) } : t)));
  }

  function resetScores() {
    setTeams((prev) => prev.map((t) => ({ ...t, score: 0 })));
    clearBuzz();
  }

  function addTeam() {
    if (teams.length >= 6) return;
    setTeams((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: `Team ${prev.length + 1}`,
        colour: COLOURS[prev.length % COLOURS.length]!,
        hotkey: HOTKEYS[prev.length] ?? '',
        score: 0,
      },
    ]);
  }

  function removeTeam() {
    if (teams.length <= 2) return;
    setTeams((prev) => prev.slice(0, -1));
  }

  function renameTeam(id: string, name: string) {
    setTeams((prev) => prev.map((t) => (t.id === id ? { ...t, name } : t)));
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.repeat) return;
      const t = teams.find((t) => t.hotkey === e.key);
      if (t) buzz(t.id);
      if (e.key === ' ') {
        e.preventDefault();
        clearBuzz();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [teams, buzz]);

  const buzzedTeam = teams.find((t) => t.id === buzzed) ?? null;

  return (
    <ToolShell
      eyebrow="Randomisers"
      title="Team Buzzers"
      description="Press a team button (or use the number key) to buzz. First press locks out the others until you clear."
      actions={
        <>
          <button type="button" className={common.btn} onClick={removeTeam} disabled={teams.length <= 2}>
            <Minus size={14} />
          </button>
          <button type="button" className={common.btn} onClick={addTeam} disabled={teams.length >= 6}>
            <Plus size={14} />
          </button>
          <button type="button" className={common.btn} onClick={resetScores}>
            <RotateCcw size={14} /> Reset scores
          </button>
        </>
      }
    >
      {buzzedTeam ? (
        <div className={styles.banner} style={{ background: buzzedTeam.colour }}>
          <span className="eyebrow" style={{ color: '#fff', opacity: 0.7 }}>
            Buzzed first
          </span>
          <span className={`font-display ${styles.bannerName}`}>{buzzedTeam.name}</span>
          <div className={styles.bannerActions}>
            <button
              type="button"
              className={`${common.btn} ${styles.awardBtn}`}
              onClick={() => {
                award(buzzedTeam.id, 1);
                clearBuzz();
              }}
            >
              ✓ Correct (+1)
            </button>
            <button
              type="button"
              className={`${common.btn} ${styles.awardBtn}`}
              onClick={clearBuzz}
            >
              ✗ Pass / Clear
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.ready}>
          <span className={common.labelText}>Ready</span>
          <span className={styles.readyText}>Tap a team or press its number key</span>
        </div>
      )}

      <div className={styles.grid}>
        {teams.map((t) => (
          <div key={t.id} className={styles.team}>
            <button
              type="button"
              className={styles.buzzer}
              style={{ background: t.colour, opacity: locked && buzzed !== t.id ? 0.35 : 1 }}
              onClick={() => buzz(t.id)}
              disabled={locked && buzzed !== t.id}
            >
              <span className={styles.hotkey}>{t.hotkey}</span>
              <input
                value={t.name}
                onChange={(e) => renameTeam(t.id, e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className={styles.nameInput}
              />
              <span className={styles.score}>{t.score}</span>
            </button>
            <div className={styles.scoreActions}>
              <button type="button" className={common.btn} onClick={() => award(t.id, -1)}>
                <Minus size={12} />
              </button>
              <button type="button" className={common.btn} onClick={() => award(t.id, 1)}>
                <Plus size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className={styles.hint}>Spacebar clears the buzz. Number keys (1–{teams.length}) act as remote buzzers.</p>
    </ToolShell>
  );
}
