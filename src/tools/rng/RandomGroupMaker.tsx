import { useMemo, useState } from 'react';
import { UsersRound, RotateCw, Settings } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { shuffle, parseRoster, intoGroupsOfCount, intoGroupsOfSize } from './util';
import { usePersistedState } from '../../hooks/usePersistedState';
import common from '../common.module.css';
import styles from './RandomGroupMaker.module.css';

type Mode = 'byCount' | 'bySize';

export function RandomGroupMaker() {
  const [roster, setRoster] = usePersistedState<string>('groups.roster', '');
  const [mode, setMode] = usePersistedState<Mode>('groups.mode', 'byCount');
  const [count, setCount] = usePersistedState<number>('groups.count', 4);
  const [size, setSize] = usePersistedState<number>('groups.size', 4);
  const [groups, setGroups] = useState<string[][]>([]);
  const [settingsOpen, setSettingsOpen] = useState(true);

  const names = useMemo(() => parseRoster(roster), [roster]);

  function generate() {
    const shuffled = shuffle(names);
    const result =
      mode === 'byCount' ? intoGroupsOfCount(shuffled, count) : intoGroupsOfSize(shuffled, size);
    setGroups(result);
    setSettingsOpen(false);
  }

  return (
    <ToolShell
      eyebrow="Classroom"
      title="Random Group Maker"
      description="Fair groups from your class roster — by number of groups or group size."
      actions={
        <button
          type="button"
          className={common.btn}
          onClick={() => setSettingsOpen((s) => !s)}
        >
          <Settings size={14} /> Roster
        </button>
      }
    >
      {groups.length > 0 && (
        <div className={styles.grid}>
          {groups.map((g, i) => (
            <div key={i} className={styles.group}>
              <header className={styles.groupHeader}>
                <span className={common.labelText}>Group {i + 1}</span>
                <span className={styles.groupCount}>{g.length}</span>
              </header>
              <ul className={styles.groupList}>
                {g.map((n) => (
                  <li key={n} className={styles.groupName}>
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <div className={common.controlRow}>
        <button
          type="button"
          className={`${common.btn} ${common.btnPrimary}`}
          onClick={generate}
          disabled={names.length === 0}
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
      </div>

      {settingsOpen && (
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

          {mode === 'byCount' ? (
            <label className={styles.field}>
              <span className={common.labelText}>Number of groups</span>
              <input
                type="number"
                min={1}
                max={20}
                value={count}
                onChange={(e) => setCount(Math.max(1, Math.min(20, Number(e.target.value) || 1)))}
                className={common.numericInput}
              />
            </label>
          ) : (
            <label className={styles.field}>
              <span className={common.labelText}>Students per group</span>
              <input
                type="number"
                min={1}
                max={20}
                value={size}
                onChange={(e) => setSize(Math.max(1, Math.min(20, Number(e.target.value) || 1)))}
                className={common.numericInput}
              />
            </label>
          )}

          <div className={styles.rosterArea}>
            <p className={common.labelText}>Class roster · {names.length} names</p>
            <textarea
              className={styles.textarea}
              value={roster}
              onChange={(e) => setRoster(e.target.value)}
              placeholder={'One name per line, or comma-separated.'}
              rows={8}
            />
          </div>
        </section>
      )}
    </ToolShell>
  );
}
