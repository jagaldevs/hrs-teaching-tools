import { useMemo, useState } from 'react';
import { Settings, RotateCcw, Crown, Shuffle, Play } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { usePersistedState } from '../../hooks/usePersistedState';
import { shuffle, parseRoster } from '../rng/util';
import { buildInitialBracket, championOf, propagateWinners, roundLabel, type Match } from './bracket';
import common from '../common.module.css';
import styles from './Tournaments.module.css';

export function Tournaments() {
  const [roster, setRoster] = usePersistedState<string>('tourney.roster', '');
  const [savedRounds, setRounds] = usePersistedState<Match[][] | null>('tourney.bracket', null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  // Re-propagate on load so brackets saved by older versions (which could
  // contain empty first-round matches) advance their stuck byes.
  const rounds = useMemo(() => savedRounds && propagateWinners(savedRounds), [savedRounds]);

  const names = useMemo(() => parseRoster(roster), [roster]);

  function generate(opts: { shuffleSeed?: boolean } = {}) {
    if (names.length < 2) return;
    const ordered = opts.shuffleSeed ? shuffle(names) : names;
    setRounds(buildInitialBracket(ordered));
    setSettingsOpen(false);
  }

  function pickWinner(roundIdx: number, matchIdx: number, choice: 0 | 1) {
    if (!rounds) return;
    const next = rounds.map((r) => r.map((m) => ({ ...m })));
    next[roundIdx]![matchIdx]!.winner = choice;
    setRounds(propagateWinners(next));
  }

  function reset() {
    setRounds(null);
  }

  const champion = rounds ? championOf(rounds) : null;

  return (
    <ToolShell
      eyebrow="Classroom"
      title="Tournaments"
      description="Single-elimination brackets. Add participants and tap the winner of each match to advance."
      actions={
        <>
          <button type="button" className={common.btn} onClick={() => setSettingsOpen((s) => !s)}>
            <Settings size={14} /> Roster
          </button>
          {rounds && (
            <button type="button" className={common.btn} onClick={reset}>
              <RotateCcw size={14} /> New tournament
            </button>
          )}
        </>
      }
    >
      {!rounds ? (
        <div className={styles.startCard}>
          <p className={common.labelText}>Participants</p>
          <textarea
            className={styles.textarea}
            value={roster}
            onChange={(e) => setRoster(e.target.value)}
            placeholder={'One participant per line, or comma-separated.\nE.g.\nAva\nNoah\nLiam, Mia, Zoe'}
            rows={10}
          />
          <p className={styles.count}>{names.length} participants</p>
          <div className={styles.controlRow}>
            <button
              type="button"
              className={`${common.btn} ${common.btnPrimary}`}
              onClick={() => generate({ shuffleSeed: false })}
              disabled={names.length < 2}
            >
              <Play size={14} /> Start tournament
            </button>
            <button
              type="button"
              className={common.btn}
              onClick={() => generate({ shuffleSeed: true })}
              disabled={names.length < 2}
            >
              <Shuffle size={14} /> Shuffle &amp; start
            </button>
          </div>
        </div>
      ) : (
        <>
          {champion && (
            <div className={styles.championBanner}>
              <Crown size={28} />
              <span className="eyebrow" style={{ color: 'var(--accent)' }}>
                Champion
              </span>
              <span className={`font-display ${styles.championName}`}>{champion}</span>
            </div>
          )}

          <div className={styles.bracket}>
            {rounds.map((round, ri) => (
              <div key={ri} className={styles.round}>
                <p className={styles.roundLabel}>{roundLabel(ri, rounds.length)}</p>
                <div className={styles.matches}>
                  {round.map((m, mi) => (
                    <div key={mi} className={styles.match}>
                      <Slot
                        name={m.a}
                        winning={m.winner === 0}
                        losing={m.winner === 1}
                        canClick={m.a !== null && m.b !== null}
                        onClick={() => pickWinner(ri, mi, 0)}
                      />
                      <span className={styles.vs}>vs</span>
                      <Slot
                        name={m.b}
                        winning={m.winner === 1}
                        losing={m.winner === 0}
                        canClick={m.a !== null && m.b !== null}
                        onClick={() => pickWinner(ri, mi, 1)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {settingsOpen && (
            <section className={styles.settings}>
              <p className={common.labelText}>Edit roster &amp; restart</p>
              <textarea
                className={styles.textarea}
                value={roster}
                onChange={(e) => setRoster(e.target.value)}
                rows={6}
              />
              <button
                type="button"
                className={`${common.btn} ${common.btnPrimary}`}
                onClick={() => generate({ shuffleSeed: false })}
              >
                Rebuild bracket
              </button>
            </section>
          )}
        </>
      )}
    </ToolShell>
  );
}


interface SlotProps {
  name: string | null;
  winning: boolean;
  losing: boolean;
  canClick: boolean;
  onClick: () => void;
}

function Slot({ name, winning, losing, canClick, onClick }: SlotProps) {
  return (
    <button
      type="button"
      className={styles.slot}
      data-winning={winning}
      data-losing={losing}
      data-empty={name === null}
      disabled={!canClick || name === null}
      onClick={onClick}
    >
      {name ?? '—'}
    </button>
  );
}
