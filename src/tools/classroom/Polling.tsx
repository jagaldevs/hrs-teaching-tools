import { useState } from 'react';
import { Plus, RotateCcw, Edit3, BarChart3, Trophy } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { usePersistedState } from '../../hooks/usePersistedState';
import common from '../common.module.css';
import styles from './Polling.module.css';

interface Option {
  letter: string;
  label: string;
  count: number;
}

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

const DEFAULT_OPTIONS: Option[] = [
  { letter: 'A', label: 'Option A', count: 0 },
  { letter: 'B', label: 'Option B', count: 0 },
  { letter: 'C', label: 'Option C', count: 0 },
  { letter: 'D', label: 'Option D', count: 0 },
];

export function Polling() {
  const [question, setQuestion] = usePersistedState<string>('poll.question', 'Which answer is correct?');
  const [options, setOptions] = usePersistedState<Option[]>('poll.options', DEFAULT_OPTIONS);
  const [revealed, setRevealed] = useState(false);
  const [editing, setEditing] = useState(false);

  const total = options.reduce((s, o) => s + o.count, 0);
  const maxCount = Math.max(0, ...options.map((o) => o.count));
  const winners = maxCount > 0 ? options.filter((o) => o.count === maxCount) : [];

  function tally(letter: string, delta: number) {
    setOptions((prev) =>
      prev.map((o) => (o.letter === letter ? { ...o, count: Math.max(0, o.count + delta) } : o)),
    );
  }

  function reset() {
    setOptions((prev) => prev.map((o) => ({ ...o, count: 0 })));
    setRevealed(false);
  }

  function updateLabel(letter: string, label: string) {
    setOptions((prev) => prev.map((o) => (o.letter === letter ? { ...o, label } : o)));
  }

  function addOption() {
    if (options.length >= 6) return;
    setOptions((prev) => [...prev, { letter: LETTERS[prev.length]!, label: `Option ${LETTERS[prev.length]}`, count: 0 }]);
  }

  function removeOption() {
    if (options.length <= 2) return;
    setOptions((prev) => prev.slice(0, -1));
  }

  return (
    <ToolShell
      eyebrow="Classroom"
      title="Polling / Voting"
      description="Show A/B/C/D. Tally responses by show of hands. Reveal the winner with a single click."
      actions={
        <>
          <button type="button" className={common.btn} onClick={() => setEditing((e) => !e)}>
            <Edit3 size={14} /> {editing ? 'Done' : 'Edit'}
          </button>
          <button
            type="button"
            className={`${common.btn} ${revealed ? common.btnPrimary : ''}`}
            onClick={() => setRevealed((r) => !r)}
            disabled={total === 0}
          >
            <BarChart3 size={14} /> {revealed ? 'Hide results' : 'Reveal results'}
          </button>
          <button type="button" className={common.btn} onClick={reset}>
            <RotateCcw size={14} /> Reset
          </button>
        </>
      }
    >
      {editing ? (
        <textarea
          className={styles.questionEdit}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={2}
          autoFocus
        />
      ) : (
        <h2 className={`font-display ${styles.question}`}>{question}</h2>
      )}

      <div className={styles.grid}>
        {options.map((o) => {
          const pct = total > 0 ? (o.count / total) * 100 : 0;
          const isWinner = revealed && winners.some((w) => w.letter === o.letter) && total > 0;
          return (
            <div key={o.letter} className={styles.card} data-winner={isWinner}>
              <div className={styles.letterBadge}>{o.letter}</div>
              {editing ? (
                <input
                  className={styles.labelInput}
                  value={o.label}
                  onChange={(e) => updateLabel(o.letter, e.target.value)}
                />
              ) : (
                <span className={`font-display ${styles.labelText}`}>{o.label}</span>
              )}

              {revealed && (
                <>
                  <div className={styles.barWrap}>
                    <div className={styles.bar}>
                      <div className={styles.barFill} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  <div className={styles.metrics}>
                    <span className={styles.count}>{o.count}</span>
                    <span className={styles.pct}>{Math.round(pct)}%</span>
                  </div>
                </>
              )}

              {isWinner && <Trophy className={styles.trophy} size={20} />}

              <div className={styles.controls}>
                <button type="button" className={common.btn} onClick={() => tally(o.letter, -1)}>
                  −1
                </button>
                <button
                  type="button"
                  className={`${common.btn} ${common.btnPrimary}`}
                  onClick={() => tally(o.letter, 1)}
                >
                  +1
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {editing && (
        <div className={common.controlRow}>
          {options.length < 6 && (
            <button type="button" className={common.btn} onClick={addOption}>
              <Plus size={14} /> Add option
            </button>
          )}
          {options.length > 2 && (
            <button type="button" className={common.btn} onClick={removeOption}>
              Remove last
            </button>
          )}
        </div>
      )}

      <p className={styles.totalLine}>
        Total votes: <strong>{total}</strong>
      </p>
    </ToolShell>
  );
}
