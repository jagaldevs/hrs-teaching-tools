import { useMemo } from 'react';
import { RotateCcw, Crown, Shuffle, Play } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { usePersistedState } from '../../hooks/usePersistedState';
import { shuffle, parseRoster } from '../rng/util';
import { RosterBar } from '../classes/RosterBar';
import { usePresentStudents } from '../classes/rosters';
import { buildInitialBracket, championOf, propagateWinners, roundLabel, type Match } from './bracket';
import common from '../common.module.css';
import styles from './Tournaments.module.css';

type Source = 'class' | 'custom';

/** Teachers who'd already typed entrants before classes existed keep that list. */
function defaultSource(): Source {
  try {
    const saved = JSON.parse(localStorage.getItem('hrs:tourney.roster') ?? '""') as unknown;
    return typeof saved === 'string' && saved.trim() ? 'custom' : 'class';
  } catch {
    return 'class';
  }
}

export function Tournaments() {
  const { roster, present } = usePresentStudents();
  const initialSource = useMemo(defaultSource, []);
  const [source, setSource] = usePersistedState<Source>('tourney.source', initialSource);
  // The typed list — for teams, houses, or anything that isn't a class.
  const [customText, setCustomText] = usePersistedState<string>('tourney.roster', '');
  // One bracket per class, plus one for the typed list (its pre-class key).
  const bracketKey = source === 'class' ? `tourney.bracket.${roster?.id ?? 'none'}` : 'tourney.bracket';
  const [savedRounds, setRounds] = usePersistedState<Match[][] | null>(bracketKey, null);
  // Re-propagate on load so brackets saved by older versions (which could
  // contain empty first-round matches) advance their stuck byes.
  const rounds = useMemo(() => savedRounds && propagateWinners(savedRounds), [savedRounds]);

  const customNames = useMemo(() => parseRoster(customText), [customText]);
  const names = source === 'class' ? present.map((s) => s.name) : customNames;

  function generate(opts: { shuffleSeed?: boolean } = {}) {
    if (names.length < 2) return;
    const ordered = opts.shuffleSeed ? shuffle(names) : names;
    setRounds(buildInitialBracket(ordered));
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
      description="Single-elimination brackets. Use a class or type your own entrants, then tap the winner of each match to advance."
      actions={
        rounds && (
          <button type="button" className={common.btn} onClick={reset}>
            <RotateCcw size={14} /> New tournament
          </button>
        )
      }
    >
      <div className={styles.sourceRow} role="group" aria-label="Entrants">
        <button
          type="button"
          className={`${common.btn} ${styles.sourceBtn}`}
          data-active={source === 'class'}
          onClick={() => setSource('class')}
        >
          A class
        </button>
        <button
          type="button"
          className={`${common.btn} ${styles.sourceBtn}`}
          data-active={source === 'custom'}
          onClick={() => setSource('custom')}
        >
          Typed list
        </button>
      </div>

      {source === 'class' && <RosterBar />}

      {!rounds ? (
        <div className={styles.startCard}>
          {source === 'custom' ? (
            <>
              <p className={common.labelText}>Entrants</p>
              <textarea
                className={styles.textarea}
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder={'One entrant per line, or comma-separated.\nTeams, houses, students — anything.'}
                rows={10}
              />
            </>
          ) : (
            <p className={styles.classNote}>
              {roster
                ? 'Everyone in the class who isn’t marked away is entered.'
                : 'Add a class to run a tournament from it, or switch to a typed list.'}
            </p>
          )}
          <p className={styles.count}>{names.length} entrants</p>
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
