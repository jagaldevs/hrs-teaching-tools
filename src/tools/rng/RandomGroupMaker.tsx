import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { RotateCw, Trophy, UsersRound } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { shuffle, intoGroupsOfCount, intoGroupsOfSize } from './util';
import { usePersistedState } from '../../hooks/usePersistedState';
import { RosterBar } from '../classes/RosterBar';
import { displayNames, usePresentStudents } from '../classes/rosters';
import { MAX_TEAMS, sendTeamsToScoreBoard } from '../classroom/scoreBoardTeams';
import common from '../common.module.css';
import styles from './RandomGroupMaker.module.css';

type Mode = 'byCount' | 'bySize';

export function RandomGroupMaker() {
  const navigate = useNavigate();
  const { roster, present } = usePresentStudents();
  const [mode, setMode] = usePersistedState<Mode>('groups.mode', 'byCount');
  const [count, setCount] = usePersistedState<number>('groups.count', 4);
  const [size, setSize] = usePersistedState<number>('groups.size', 4);
  // Last groups made for each class, as student ids.
  const [savedGroups, setGroups] = usePersistedState<string[][]>(`groups.last.${roster?.id ?? 'none'}`, []);

  const names = useMemo(() => (roster ? displayNames(roster.students) : new Map<string, string>()), [roster]);
  // Drop anyone since removed from the class (and any group left empty).
  const groups = savedGroups.map((g) => g.filter((id) => names.has(id))).filter((g) => g.length > 0);

  function generate() {
    const ids = shuffle(present.map((s) => s.id));
    setGroups(mode === 'byCount' ? intoGroupsOfCount(ids, count) : intoGroupsOfSize(ids, size));
  }

  function sendToScoreBoard() {
    const sent = sendTeamsToScoreBoard(
      groups.map((g, i) => ({ name: `Group ${i + 1}`, members: g.map((id) => names.get(id)!) })),
    );
    if (sent) navigate('/tool/group-score-board');
  }

  return (
    <ToolShell
      eyebrow="Classroom"
      title="Random Group Maker"
      description="Fair groups from your class — by number of groups or group size. Anyone marked away is left out."
    >
      <RosterBar />

      {roster && (
        <section className={styles.settings}>
          <div className={styles.modeRow}>
            <button
              type="button"
              className={`${common.btn} ${styles.modeBtn}`}
              data-active={mode === 'byCount'}
              onClick={() => setMode('byCount')}
            >
              By number of groups
            </button>
            <button
              type="button"
              className={`${common.btn} ${styles.modeBtn}`}
              data-active={mode === 'bySize'}
              onClick={() => setMode('bySize')}
            >
              By group size
            </button>
          </div>
          <label className={styles.field}>
            <span className={common.labelText}>{mode === 'byCount' ? 'Number of groups' : 'Students per group'}</span>
            <input
              type="number"
              min={1}
              max={20}
              value={mode === 'byCount' ? count : size}
              onChange={(e) => {
                const n = Math.max(1, Math.min(20, Number(e.target.value) || 1));
                if (mode === 'byCount') setCount(n);
                else setSize(n);
              }}
              className={common.numericInput}
            />
          </label>
        </section>
      )}

      {roster && (
        <div className={common.controlRow}>
          <button
            type="button"
            className={`${common.btn} ${common.btnPrimary}`}
            onClick={generate}
            disabled={present.length === 0}
          >
            {groups.length === 0 ? (
              <>
                <UsersRound size={14} /> Make groups
              </>
            ) : (
              <>
                <RotateCw size={14} /> Reshuffle
              </>
            )}
          </button>
          {groups.length > 0 && (
            <button
              type="button"
              className={common.btn}
              onClick={sendToScoreBoard}
              disabled={groups.length > MAX_TEAMS}
              title={groups.length > MAX_TEAMS ? `The Score Board holds up to ${MAX_TEAMS} teams` : undefined}
            >
              <Trophy size={14} /> Send to Score Board
            </button>
          )}
        </div>
      )}

      {groups.length > 0 && (
        <div className={styles.grid}>
          {groups.map((g, i) => (
            <div key={i} className={styles.group}>
              <header className={styles.groupHeader}>
                <span className={common.labelText}>Group {i + 1}</span>
                <span className={styles.groupCount}>{g.length}</span>
              </header>
              <ul className={styles.groupList}>
                {g.map((id) => (
                  <li key={id} className={styles.groupName}>
                    {names.get(id)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </ToolShell>
  );
}
