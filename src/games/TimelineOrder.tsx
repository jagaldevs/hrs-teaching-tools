import { useState } from 'react';
import { Check, X as XIcon, ArrowUp, ArrowDown, ChevronRight } from 'lucide-react';
import { GameShell, SetupScreen, type SetupSelections } from './GameShell';
import { ResultScreen } from './ResultScreen';
import { TIMELINE, type TimelineEvent } from '../data/banks/hass';
import { shuffle } from '../tools/rng/util';
import { chimeTick } from '../tools/chime';
import common from '../tools/common.module.css';
import styles from './TimelineOrder.module.css';

type Phase = 'setup' | 'playing' | 'result';

interface Round {
  rounds: TimelineEvent[][]; // each subset is 5 events
}

const EVENTS_PER_ROUND = 5;

export function TimelineOrder() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [setup, setSetup] = useState<SetupSelections | null>(null);
  const [round, setRound] = useState<Round | null>(null);
  const [idx, setIdx] = useState(0);
  const [order, setOrder] = useState<TimelineEvent[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);

  function start(sel: SetupSelections) {
    const pool = shuffle(TIMELINE[sel.stream] ?? TIMELINE.upper_primary);
    const rounds: TimelineEvent[][] = [];
    for (let i = 0; i < sel.count; i++) {
      const start = i * EVENTS_PER_ROUND;
      const slice = pool.slice(start, start + EVENTS_PER_ROUND);
      if (slice.length < EVENTS_PER_ROUND) {
        // wrap-around if pool runs out
        rounds.push(shuffle(pool).slice(0, EVENTS_PER_ROUND));
      } else {
        rounds.push(slice);
      }
    }
    setRound({ rounds });
    setSetup(sel);
    setIdx(0);
    setOrder(shuffle(rounds[0]!));
    setRevealed(false);
    setScore(0);
    setPhase('playing');
  }

  function move(idxInList: number, dir: -1 | 1) {
    if (revealed) return;
    setOrder((prev) => {
      const next = [...prev];
      const target = idxInList + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[idxInList], next[target]] = [next[target]!, next[idxInList]!];
      return next;
    });
  }

  function reveal() {
    const correctOrder = [...order].sort((a, b) => a.year - b.year);
    const matches = order.filter((e, i) => e.id === correctOrder[i]!.id).length;
    setScore((s) => s + matches);
    setRevealed(true);
    if (matches === order.length) chimeTick();
  }

  function next() {
    if (!round) return;
    if (idx + 1 >= round.rounds.length) {
      setPhase('result');
    } else {
      setIdx((i) => i + 1);
      setOrder(shuffle(round.rounds[idx + 1]!));
      setRevealed(false);
    }
  }

  const correctOrder = revealed ? [...order].sort((a, b) => a.year - b.year) : [];

  return (
    <GameShell
      title="Timeline Order"
      description="Five events. Drag-free reordering with the up/down arrows. Get them in chronological order."
    >
      {phase === 'setup' && (
        <SetupScreen gameId="timeline-order" storageKey="timeline" showSubject={false} countOptions={[3, 5]} onStart={start} />
      )}

      {phase === 'playing' && round && (
        <div className={styles.playing}>
          <div className={styles.header}>
            <span className={styles.chip}>Round {idx + 1} / {round.rounds.length}</span>
            <span className={styles.chip}>Score · {score}</span>
          </div>

          <p className={styles.instruction}>
            {revealed ? 'Here’s the correct order:' : 'Order the events from earliest to latest.'}
          </p>

          <ol className={styles.list}>
            {(revealed ? correctOrder : order).map((e, i) => {
              const yourIdx = order.findIndex((o) => o.id === e.id);
              const wasCorrect = revealed && yourIdx === i;
              return (
                <li key={e.id} className={styles.row} data-state={revealed ? (wasCorrect ? 'right' : 'wrong') : 'idle'}>
                  <span className={styles.rank}>{i + 1}</span>
                  <span className={styles.eventText}>{e.event}</span>
                  {revealed && (
                    <span className={styles.year}>
                      {e.year < 0 ? `${Math.abs(e.year).toLocaleString()} BCE` : e.year}
                    </span>
                  )}
                  {!revealed ? (
                    <div className={styles.arrows}>
                      <button type="button" className={styles.arrowBtn} onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">
                        <ArrowUp size={14} />
                      </button>
                      <button type="button" className={styles.arrowBtn} onClick={() => move(i, 1)} disabled={i === order.length - 1} aria-label="Move down">
                        <ArrowDown size={14} />
                      </button>
                    </div>
                  ) : wasCorrect ? (
                    <Check size={16} className={styles.markRight} />
                  ) : (
                    <XIcon size={16} className={styles.markWrong} />
                  )}
                </li>
              );
            })}
          </ol>

          <div className={common.controlRow}>
            {!revealed ? (
              <button type="button" className={`${common.btn} ${common.btnPrimary}`} onClick={reveal}>
                Lock in order
              </button>
            ) : (
              <button type="button" className={`${common.btn} ${common.btnPrimary}`} onClick={next}>
                {idx + 1 >= round.rounds.length ? 'See results' : 'Next round'}
                <ChevronRight size={14} />
              </button>
            )}
          </div>
        </div>
      )}

      {phase === 'result' && setup && (
        <ResultScreen
          score={score}
          total={EVENTS_PER_ROUND * (round?.rounds.length ?? setup.count)}
          onPlayAgain={() => setPhase('setup')}
        />
      )}
    </GameShell>
  );
}
