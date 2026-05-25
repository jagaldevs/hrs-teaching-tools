import { useState } from 'react';
import { Play, Pause, Shuffle } from 'lucide-react';
import { GameShell } from './GameShell';
import { CATEGORY_LISTS } from '../data/banks/misc';
import { shuffle, randomInt } from '../tools/rng/util';
import { useTimer, formatClock } from '../tools/useTimer';
import { chimeTransition } from '../tools/chime';
import common from '../tools/common.module.css';
import styles from './Categories.module.css';

type Phase = 'idle' | 'playing' | 'over';

const ROUND_TIME_MS = 60_000;
const LETTERS = 'ABCDEFGHJKLMNOPRSTUW'.split(''); // exclude tough letters

export function Categories() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [letter, setLetter] = useState<string>('A');
  const [categories, setCategories] = useState<typeof CATEGORY_LISTS>([]);

  const timer = useTimer({
    durationMs: ROUND_TIME_MS,
    mode: 'down',
    onComplete: () => {
      chimeTransition();
      setPhase('over');
    },
  });

  function start() {
    setLetter(LETTERS[randomInt(LETTERS.length)]!);
    setCategories(shuffle(CATEGORY_LISTS).slice(0, 5));
    setPhase('playing');
    timer.reset(ROUND_TIME_MS);
    window.setTimeout(() => timer.start(), 80);
  }

  function reshuffle() {
    setLetter(LETTERS[randomInt(LETTERS.length)]!);
    setCategories(shuffle(CATEGORY_LISTS).slice(0, 5));
  }

  function stop() {
    timer.pause();
    setPhase('over');
  }

  return (
    <GameShell
      title="Categories"
      description="One letter, five categories, 60 seconds. List one item per category, starting with the letter."
    >
      {(phase === 'idle' || phase === 'over') && (
        <div className={styles.startCard}>
          <p className="eyebrow">{phase === 'over' ? 'Time’s up' : 'Ready?'}</p>
          <h2 className={`font-display ${styles.startTitle}`}>
            {phase === 'over' ? 'Round complete' : 'Categories'}
          </h2>
          <p className={styles.startNote}>
            When the round starts, a random letter and five categories appear. Race to write or
            shout one item per category that begins with that letter.
          </p>
          <button type="button" className={`${common.btn} ${common.btnPrimary}`} onClick={start}>
            <Play size={14} /> {phase === 'over' ? 'New round' : 'Start round'}
          </button>
        </div>
      )}

      {phase === 'playing' && (
        <div className={styles.playing}>
          <div className={styles.header}>
            <span className={styles.chip} data-warning={timer.remainingMs < 10000}>
              {formatClock(timer.remainingMs, { showHours: 'never' })}
            </span>
            <button type="button" className={common.btn} onClick={reshuffle}>
              <Shuffle size={14} /> Reshuffle
            </button>
            <button type="button" className={common.btn} onClick={stop}>
              <Pause size={14} /> End round
            </button>
          </div>

          <div className={styles.letterCard}>
            <p className={styles.letterLabel}>Letter</p>
            <span className={`font-display ${styles.bigLetter}`}>{letter}</span>
          </div>

          <ul className={styles.categories}>
            {categories.map((c) => (
              <li key={c.id} className={styles.category}>
                {c.label}
              </li>
            ))}
          </ul>
        </div>
      )}

    </GameShell>
  );
}
