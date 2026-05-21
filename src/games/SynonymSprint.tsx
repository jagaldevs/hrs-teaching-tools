import { useEffect, useState } from 'react';
import { Check, X as XIcon, ChevronRight, Timer as TimerIcon } from 'lucide-react';
import { GameShell, SetupScreen, type SetupSelections } from './GameShell';
import { ResultScreen } from './ResultScreen';
import { SYN_ANT, type SynAntItem } from '../data/banks/misc';
import { shuffle } from '../tools/rng/util';
import { useTimer, formatClock } from '../tools/useTimer';
import { chimeTick } from '../tools/chime';
import common from '../tools/common.module.css';
import styles from './SynonymSprint.module.css';

type Phase = 'setup' | 'playing' | 'result';

const PER_Q_MS = 8000;

interface Round {
  items: SynAntItem[];
}

export function SynonymSprint() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [setup, setSetup] = useState<SetupSelections | null>(null);
  const [round, setRound] = useState<Round | null>(null);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const timer = useTimer({
    durationMs: PER_Q_MS,
    mode: 'down',
    onComplete: () => {
      if (picked === null) setPicked(-1); // timeout = wrong
    },
  });

  function start(sel: SetupSelections) {
    const items = shuffle(SYN_ANT[sel.stream] ?? []).slice(0, sel.count);
    setSetup(sel);
    setRound({ items });
    setIdx(0);
    setPicked(null);
    setScore(0);
    setPhase('playing');
    timer.reset(PER_Q_MS);
    window.setTimeout(() => timer.start(), 80);
  }

  function answer(i: number) {
    if (picked !== null || !round) return;
    setPicked(i);
    timer.pause();
    if (i === round.items[idx]!.answer) {
      setScore((s) => s + 1);
      chimeTick();
    }
  }

  function next() {
    if (!round) return;
    if (idx + 1 >= round.items.length) {
      setPhase('result');
    } else {
      setIdx((i) => i + 1);
      setPicked(null);
      timer.reset(PER_Q_MS);
      timer.start();
    }
  }

  useEffect(() => {
    return () => timer.pause();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const current = round?.items[idx];

  return (
    <GameShell
      title="Synonym & Antonym Sprint"
      description="Pick the matching synonym or antonym before the timer runs out."
    >
      {phase === 'setup' && (
        <SetupScreen storageKey="synant" showSubject={false} onStart={start} />
      )}

      {phase === 'playing' && current && (
        <div className={styles.playing}>
          <div className={styles.header}>
            <span className={styles.chip}>{idx + 1} / {round!.items.length}</span>
            <span className={styles.chip}>Score · {score}</span>
            <span className={styles.chip} data-warning={timer.remainingMs < 2500}>
              <TimerIcon size={12} /> {formatClock(timer.remainingMs, { showHours: 'never' })}
            </span>
          </div>

          <div className={styles.timeBar}>
            <div
              className={styles.timeBarFill}
              style={{ width: `${(timer.remainingMs / PER_Q_MS) * 100}%` }}
              data-warning={timer.remainingMs < 2500}
            />
          </div>

          <div className={styles.card}>
            <p className={styles.modeLabel}>
              {current.mode === 'synonym' ? 'Pick a synonym for' : 'Pick an antonym for'}
            </p>
            <h2 className={`font-display ${styles.word}`}>{current.word}</h2>
          </div>

          <div className={styles.choices}>
            {current.choices.map((c, i) => {
              const isCorrect = i === current.answer;
              const isPicked = picked === i;
              const state = picked === null ? 'idle' : isCorrect ? 'right' : isPicked ? 'wrong' : 'idle';
              return (
                <button
                  key={i}
                  type="button"
                  className={styles.choice}
                  data-state={state}
                  onClick={() => answer(i)}
                  disabled={picked !== null}
                >
                  <span>{c}</span>
                  {picked !== null && isCorrect && <Check size={16} />}
                  {picked !== null && isPicked && !isCorrect && <XIcon size={16} />}
                </button>
              );
            })}
          </div>

          {picked !== null && (
            <button
              type="button"
              className={`${common.btn} ${common.btnPrimary}`}
              onClick={next}
              autoFocus
            >
              {idx + 1 >= round!.items.length ? 'See results' : 'Next'}
              <ChevronRight size={14} />
            </button>
          )}
        </div>
      )}

      {phase === 'result' && setup && (
        <ResultScreen
          score={score}
          total={setup.count}
          onPlayAgain={() => setPhase('setup')}
        />
      )}
    </GameShell>
  );
}
