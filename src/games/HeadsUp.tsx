import { useEffect, useState } from 'react';
import { Check, X as XIcon, Play, RotateCcw } from 'lucide-react';
import { GameShell } from './GameShell';
import { HEADS_UP, type HeadsUpCategory } from '../data/banks/misc';
import { shuffle } from '../tools/rng/util';
import { useTimer, formatClock } from '../tools/useTimer';
import { chimeTick, chimeComplete } from '../tools/chime';
import { usePersistedState } from '../hooks/usePersistedState';
import common from '../tools/common.module.css';
import styles from './HeadsUp.module.css';

type Phase = 'pick' | 'briefing' | 'playing' | 'over';

const ROUND_TIME_MS = 60_000;

interface ResultMark {
  word: string;
  correct: boolean;
}

export function HeadsUp() {
  const [phase, setPhase] = useState<Phase>('pick');
  const [category, setCategory] = usePersistedState<HeadsUpCategory>('headsup.cat', HEADS_UP[0]!);
  const [words, setWords] = useState<string[]>([]);
  const [idx, setIdx] = useState(0);
  const [results, setResults] = useState<ResultMark[]>([]);

  const timer = useTimer({
    durationMs: ROUND_TIME_MS,
    mode: 'down',
    onComplete: () => {
      chimeComplete();
      setPhase('over');
    },
  });

  function pickCategory(c: HeadsUpCategory) {
    setCategory(c);
    setPhase('briefing');
  }

  function start() {
    setWords(shuffle(category.words));
    setIdx(0);
    setResults([]);
    setPhase('playing');
    timer.reset(ROUND_TIME_MS);
    window.setTimeout(() => timer.start(), 80);
  }

  function mark(correct: boolean) {
    if (idx >= words.length) return;
    setResults((r) => [...r, { word: words[idx]!, correct }]);
    if (correct) chimeTick();
    setIdx((i) => i + 1);
    if (idx + 1 >= words.length) {
      timer.pause();
      chimeComplete();
      setPhase('over');
    }
  }

  useEffect(() => {
    return () => timer.pause();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const correctCount = results.filter((r) => r.correct).length;
  const current = words[idx];

  return (
    <GameShell
      title="Heads Up"
      description="Hold the screen on your forehead. The class gives clues until you guess. Tilt down (or just press) Got it / Pass."
    >
      {phase === 'pick' && (
        <div className={styles.pickGrid}>
          {HEADS_UP.map((c) => (
            <button
              key={c.id}
              type="button"
              className={styles.catBtn}
              data-active={c.id === category.id}
              onClick={() => pickCategory(c)}
            >
              <span className={`font-display ${styles.catName}`}>{c.name}</span>
              <span className={styles.catCount}>{c.words.length} words</span>
            </button>
          ))}
        </div>
      )}

      {phase === 'briefing' && (
        <div className={styles.brief}>
          <p className="eyebrow">{category.name}</p>
          <h2 className={`font-display ${styles.briefTitle}`}>Ready?</h2>
          <p className={styles.briefNote}>
            Hold the screen so others can see, but not you. They give clues; press
            <strong> Got it</strong> when you guess, or <strong>Pass</strong> to skip.
          </p>
          <div className={common.controlRow}>
            <button type="button" className={common.btn} onClick={() => setPhase('pick')}>
              Change category
            </button>
            <button type="button" className={`${common.btn} ${common.btnPrimary}`} onClick={start}>
              <Play size={14} /> Start 60s
            </button>
          </div>
        </div>
      )}

      {phase === 'playing' && current && (
        <div className={styles.playing}>
          <div className={styles.header}>
            <span className={styles.chip}>{category.name}</span>
            <span className={styles.chip} data-warning={timer.remainingMs < 10000}>
              {formatClock(timer.remainingMs, { showHours: 'never' })}
            </span>
            <span className={styles.chip}>Got · {correctCount}</span>
          </div>

          <div className={styles.wordCard}>
            <span className={`font-display ${styles.bigWord}`}>{current}</span>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.passBtn} onClick={() => mark(false)}>
              <XIcon size={28} /> Pass
            </button>
            <button type="button" className={styles.gotItBtn} onClick={() => mark(true)}>
              <Check size={28} /> Got it
            </button>
          </div>
        </div>
      )}

      {phase === 'over' && (
        <div className={styles.over}>
          <p className="eyebrow">Round over</p>
          <span className={`font-display ${styles.overNum}`}>{correctCount}</span>
          <p className={styles.overNote}>
            {category.name} · {results.length} total
          </p>

          <ul className={styles.recap}>
            {results.map((r, i) => (
              <li key={i} data-correct={r.correct}>
                {r.correct ? <Check size={14} /> : <XIcon size={14} />}
                <span>{r.word}</span>
              </li>
            ))}
          </ul>

          <div className={common.controlRow}>
            <button type="button" className={common.btn} onClick={() => setPhase('pick')}>
              Change category
            </button>
            <button type="button" className={`${common.btn} ${common.btnPrimary}`} onClick={() => setPhase('briefing')}>
              <RotateCcw size={14} /> Play again
            </button>
          </div>
        </div>
      )}
    </GameShell>
  );
}
