import { useMemo, useState } from 'react';
import { Settings, RotateCcw, Crown, Shuffle, Play } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { usePersistedState } from '../../hooks/usePersistedState';
import { shuffle, parseRoster } from '../rng/util';
import common from '../common.module.css';
import styles from './Tournaments.module.css';

/**
 * Single-elimination tournament.
 *
 * Bracket model: round 0 = first matches; final round has one match.
 * Padding with `null` slots gives auto-advance byes for non-power-of-2 entries.
 * Winners propagate forward whenever a match resolves.
 */
interface Match {
  /** Slot index within the round. */
  pos: number;
  /** Names of the two competitors, or null = bye / not yet resolved. */
  a: string | null;
  b: string | null;
  /** Index 0 = a wins, 1 = b wins, null = undecided. */
  winner: 0 | 1 | null;
}

function nextPow2(n: number): number {
  let p = 1;
  while (p < n) p *= 2;
  return Math.max(2, p);
}

function buildInitialBracket(names: string[]): Match[][] {
  const size = nextPow2(Math.max(2, names.length));
  const padded: (string | null)[] = [...names];
  while (padded.length < size) padded.push(null);

  // First round matches: pair (0,1), (2,3), ...
  const round0: Match[] = [];
  for (let i = 0; i < size; i += 2) {
    const a = padded[i] ?? null;
    const b = padded[i + 1] ?? null;
    let winner: 0 | 1 | null = null;
    if (a && !b) winner = 0; // bye
    if (!a && b) winner = 1; // bye
    round0.push({ pos: i / 2, a, b, winner });
  }

  const rounds: Match[][] = [round0];
  let count = round0.length;
  while (count > 1) {
    count = count / 2;
    const round: Match[] = [];
    for (let p = 0; p < count; p++) {
      round.push({ pos: p, a: null, b: null, winner: null });
    }
    rounds.push(round);
  }

  return propagateWinners(rounds);
}

function propagateWinners(rounds: Match[][]): Match[][] {
  const out = rounds.map((r) => r.map((m) => ({ ...m })));
  for (let r = 0; r < out.length - 1; r++) {
    for (let p = 0; p < out[r]!.length; p++) {
      const m = out[r]![p]!;
      const next = out[r + 1]![Math.floor(p / 2)]!;
      const winnerName = m.winner === 0 ? m.a : m.winner === 1 ? m.b : null;
      // pos 0/2/4 → 'a' slot; 1/3/5 → 'b' slot of next match
      if (p % 2 === 0) next.a = winnerName;
      else next.b = winnerName;
      // Clear downstream winner if its inputs changed
      if (next.winner !== null) {
        const stillValid =
          (next.winner === 0 && next.a !== null) || (next.winner === 1 && next.b !== null);
        if (!stillValid) next.winner = null;
      }
    }
  }
  return out;
}

const ROUND_NAMES = ['First Round', 'Round of 16', 'Quarter Final', 'Semi Final', 'Final'];

function roundLabel(roundIdx: number, totalRounds: number): string {
  const distanceFromFinal = totalRounds - 1 - roundIdx;
  if (distanceFromFinal === 0) return 'Final';
  if (distanceFromFinal === 1) return 'Semi Final';
  if (distanceFromFinal === 2) return 'Quarter Final';
  return ROUND_NAMES[roundIdx] ?? `Round ${roundIdx + 1}`;
}

export function Tournaments() {
  const [roster, setRoster] = usePersistedState<string>('tourney.roster', '');
  const [rounds, setRounds] = usePersistedState<Match[][] | null>('tourney.bracket', null);
  const [settingsOpen, setSettingsOpen] = useState(false);

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

  const champion =
    rounds && rounds.length > 0 ? winnerName(rounds[rounds.length - 1]![0]!) : null;

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

function winnerName(m: Match): string | null {
  if (m.winner === 0) return m.a;
  if (m.winner === 1) return m.b;
  return null;
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
