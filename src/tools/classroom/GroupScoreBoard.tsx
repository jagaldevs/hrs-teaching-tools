import { Plus, Minus, Trash2, RotateCcw, UserPlus, Crown } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { usePersistedState } from '../../hooks/usePersistedState';
import { categorical } from '../../theme/palette';
import { MAX_TEAMS, SCOREBOARD_KEY, type Team } from './scoreBoardTeams';
import common from '../common.module.css';
import styles from './GroupScoreBoard.module.css';

const DEFAULT_TEAMS: Team[] = [
  { id: '1', name: 'Team 1', score: 0 },
  { id: '2', name: 'Team 2', score: 0 },
  { id: '3', name: 'Team 3', score: 0 },
];

export function GroupScoreBoard() {
  const [teams, setTeams] = usePersistedState<Team[]>(SCOREBOARD_KEY, DEFAULT_TEAMS);

  function addTeam() {
    if (teams.length >= MAX_TEAMS) return;
    setTeams((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: `Team ${prev.length + 1}`,
        score: 0,
      },
    ]);
  }

  function remove(id: string) {
    setTeams((prev) => prev.filter((t) => t.id !== id));
  }

  function update(id: string, patch: Partial<Team>) {
    setTeams((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }

  function award(id: string, delta: number) {
    setTeams((prev) =>
      prev.map((t) => (t.id === id ? { ...t, score: Math.max(0, t.score + delta) } : t)),
    );
  }

  function resetAll() {
    setTeams((prev) => prev.map((t) => ({ ...t, score: 0 })));
  }

  const maxScore = Math.max(1, ...teams.map((t) => t.score));
  const winningScore = Math.max(0, ...teams.map((t) => t.score));
  const winners = teams.filter((t) => t.score === winningScore && winningScore > 0);

  return (
    <ToolShell
      eyebrow="Classroom"
      title="Group Score Board"
      description="Live points board for team activities. Animated bars, persisted across reloads."
      actions={
        <>
          <button type="button" className={common.btn} onClick={addTeam} disabled={teams.length >= MAX_TEAMS}>
            <UserPlus size={14} /> Add team
          </button>
          <button type="button" className={common.btn} onClick={resetAll}>
            <RotateCcw size={14} /> Reset scores
          </button>
        </>
      }
    >
      <div className={styles.board}>
        {teams.map((t, i) => {
          const pct = (t.score / maxScore) * 100;
          const isWinner = winners.length === 1 && winners[0]?.id === t.id;
          return (
            <div key={t.id} className={styles.team} data-winner={isWinner}>
              <div className={styles.colourSwatch} style={{ background: categorical(i) }}>
                {isWinner && <Crown size={20} className={styles.crown} />}
              </div>
              <div className={styles.nameWrap}>
                <input
                  className={styles.nameInput}
                  value={t.name}
                  onChange={(e) => update(t.id, { name: e.target.value })}
                />
                {t.members && t.members.length > 0 && (
                  <span className={styles.members}>{t.members.join(', ')}</span>
                )}
                <div className={styles.bar}>
                  <div
                    className={styles.barFill}
                    style={{ width: `${pct}%`, background: categorical(i) }}
                  />
                </div>
              </div>
              <div className={styles.score}>
                <span className={`font-display ${styles.scoreNum}`}>{t.score}</span>
              </div>
              <div className={styles.controls}>
                <button
                  type="button"
                  className={`${common.btn} ${styles.scoreBtn}`}
                  onClick={() => award(t.id, -1)}
                  aria-label="Subtract point"
                >
                  <Minus size={16} />
                </button>
                <button
                  type="button"
                  className={`${common.btn} ${styles.scoreBtn}`}
                  onClick={() => award(t.id, 1)}
                  aria-label="Add point"
                >
                  <Plus size={16} />
                </button>
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => remove(t.id)}
                  aria-label="Remove team"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}

        {teams.length === 0 && (
          <p className={styles.empty}>No teams yet. Press &ldquo;Add team&rdquo; to begin.</p>
        )}
      </div>
    </ToolShell>
  );
}
