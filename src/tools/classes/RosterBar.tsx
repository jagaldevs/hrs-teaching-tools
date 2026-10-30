import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Settings, UserX } from 'lucide-react';
import {
  clearAbsent,
  displayNames,
  setActiveRoster,
  toggleAbsent,
  useAbsentIds,
  useRosterState,
} from './rosters';
import common from '../common.module.css';
import styles from './RosterBar.module.css';

export const MY_CLASSES_PATH = '/tool/my-classes';

/**
 * Class switcher shown at the top of the tools that work from a class
 * list. Switching here switches every tool. "Away today" marks students
 * absent so picks, groups and brackets leave them out until tomorrow.
 */
export function RosterBar() {
  const { rosters, activeId } = useRosterState();
  const absent = useAbsentIds();
  const [awayOpen, setAwayOpen] = useState(false);
  const roster = rosters.find((r) => r.id === activeId) ?? null;

  if (!roster) {
    return (
      <div className={styles.bar}>
        <span className={styles.empty}>No classes yet.</span>
        <Link to={MY_CLASSES_PATH} className={`${common.btn} ${common.btnPrimary}`}>
          Add a class
        </Link>
      </div>
    );
  }

  const names = displayNames(roster.students);
  const awayHere = roster.students.filter((s) => absent.has(s.id));

  return (
    <div className={styles.wrap}>
      <div className={styles.bar}>
        <label className={styles.picker}>
          <span className={common.labelText}>Class</span>
          <select
            className={styles.select}
            value={roster.id}
            onChange={(e) => {
              setActiveRoster(e.target.value);
              setAwayOpen(false);
            }}
          >
            {rosters.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name} ({r.students.length})
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          className={common.btn}
          onClick={() => setAwayOpen((o) => !o)}
          aria-expanded={awayOpen}
          disabled={roster.students.length === 0}
        >
          <UserX size={14} />
          Away today{awayHere.length > 0 ? ` · ${awayHere.length}` : ''}
          {awayOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        <Link to={MY_CLASSES_PATH} className={`${common.btn} ${common.btnGhost}`}>
          <Settings size={14} /> Manage classes
        </Link>
      </div>

      {awayOpen && (
        <div className={styles.awayPanel}>
          <p className={styles.awayHint}>
            Tap anyone who&rsquo;s away. They&rsquo;re left out of picks, groups and brackets until tomorrow.
          </p>
          <div className={styles.chips}>
            {roster.students.map((s) => (
              <button
                key={s.id}
                type="button"
                className={styles.chip}
                data-away={absent.has(s.id)}
                aria-pressed={absent.has(s.id)}
                onClick={() => toggleAbsent(s.id)}
              >
                {names.get(s.id)}
              </button>
            ))}
          </div>
          {awayHere.length > 0 && (
            <button
              type="button"
              className={`${common.btn} ${common.btnGhost}`}
              onClick={() => clearAbsent(awayHere.map((s) => s.id))}
            >
              Everyone&rsquo;s here
            </button>
          )}
        </div>
      )}
    </div>
  );
}
