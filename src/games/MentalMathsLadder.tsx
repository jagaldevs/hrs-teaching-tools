import { useEffect, useRef, useState } from 'react';
import { Check, X as XIcon, Trophy } from 'lucide-react';
import { GameShell, SetupScreen, type SetupSelections } from './GameShell';
import { useTimer, formatClock } from '../tools/useTimer';
import { chimeTick, chimeComplete } from '../tools/chime';
import { randomInt } from '../tools/rng/util';
import type { Stream } from '../data/games';
import common from '../tools/common.module.css';
import styles from './MentalMathsLadder.module.css';

type Phase = 'setup' | 'playing' | 'gameover';

interface Q {
  prompt: string;
  answer: number;
  /** Difficulty rung (1+). */
  level: number;
}

const QUESTION_TIME_MS = 12000;

function generate(stream: Stream, level: number): Q {
  // Difficulty grows with level. Stream sets the question style.
  switch (stream) {
    case 'lower_primary':
      return generateLower(level);
    case 'upper_primary':
      return generateUpper(level);
    case 'middle_school':
      return generateMiddle(level);
    case 'senior_school':
      return generateSenior(level);
  }
}

function generateLower(level: number): Q {
  // Levels 1-3: a+b within 10; 4-6: a+b within 20; 7-9: a-b; 10+: doubles.
  if (level <= 3) {
    const a = randomInt(8) + 1;
    const b = randomInt(8) + 1;
    return { prompt: `${a} + ${b}`, answer: a + b, level };
  }
  if (level <= 6) {
    const a = randomInt(15) + 3;
    const b = randomInt(15) + 3;
    return { prompt: `${a} + ${b}`, answer: a + b, level };
  }
  if (level <= 9) {
    const a = randomInt(15) + 5;
    const b = randomInt(a);
    return { prompt: `${a} − ${b}`, answer: a - b, level };
  }
  const a = randomInt(10) + 1;
  return { prompt: `Double ${a}`, answer: a * 2, level };
}

function generateUpper(level: number): Q {
  // Times tables up to 12, halves, percents of 100, simple division.
  if (level <= 3) {
    const a = randomInt(9) + 2;
    const b = randomInt(9) + 2;
    return { prompt: `${a} × ${b}`, answer: a * b, level };
  }
  if (level <= 6) {
    const a = randomInt(11) + 2;
    const b = randomInt(11) + 2;
    return { prompt: `${a} × ${b}`, answer: a * b, level };
  }
  if (level <= 9) {
    // halves of even numbers
    const a = (randomInt(20) + 1) * 2;
    return { prompt: `Half of ${a}`, answer: a / 2, level };
  }
  if (level <= 12) {
    // percent of 100
    const pct = (randomInt(9) + 1) * 10;
    return { prompt: `${pct}% of 100`, answer: pct, level };
  }
  // division
  const b = randomInt(8) + 2;
  const result = randomInt(11) + 2;
  const a = b * result;
  return { prompt: `${a} ÷ ${b}`, answer: result, level };
}

function generateMiddle(level: number): Q {
  // Negatives, percentages, simple algebra, squares.
  if (level <= 3) {
    // larger × tables
    const a = randomInt(12) + 3;
    const b = randomInt(12) + 3;
    return { prompt: `${a} × ${b}`, answer: a * b, level };
  }
  if (level <= 6) {
    // negatives
    const a = -(randomInt(12) + 1);
    const b = -(randomInt(12) + 1);
    return { prompt: `(${a}) × (${b})`, answer: a * b, level };
  }
  if (level <= 9) {
    // percentages
    const total = (randomInt(9) + 2) * 10;
    const pct = [10, 20, 25, 50, 75][randomInt(5)]!;
    return { prompt: `${pct}% of ${total}`, answer: Math.round((total * pct) / 100), level };
  }
  if (level <= 12) {
    // squares
    const a = randomInt(11) + 3;
    return { prompt: `${a}²`, answer: a * a, level };
  }
  // simple linear equations: solve x in ax + b = c
  const x = randomInt(9) + 1;
  const a = randomInt(8) + 2;
  const b = randomInt(15) + 1;
  return { prompt: `Solve: ${a}x + ${b} = ${a * x + b}`, answer: x, level };
}

function generateSenior(level: number): Q {
  // Powers, sqrts, larger %, simple trig values, algebra.
  if (level <= 3) {
    const a = randomInt(12) + 5;
    return { prompt: `${a}²`, answer: a * a, level };
  }
  if (level <= 6) {
    const a = (randomInt(8) + 4) ** 2;
    return { prompt: `√${a}`, answer: Math.sqrt(a), level };
  }
  if (level <= 9) {
    // cube
    const a = randomInt(7) + 3;
    return { prompt: `${a}³`, answer: a * a * a, level };
  }
  if (level <= 12) {
    // percentage of larger numbers
    const total = (randomInt(20) + 5) * 20;
    const pct = [5, 15, 25, 40, 60][randomInt(5)]!;
    return { prompt: `${pct}% of ${total}`, answer: Math.round((total * pct) / 100), level };
  }
  if (level <= 15) {
    // trig common values
    const items: { p: string; a: number }[] = [
      { p: 'sin(30°) × 2', a: 1 },
      { p: 'cos(60°) × 2', a: 1 },
      { p: 'tan(45°)', a: 1 },
      { p: 'sin(90°)', a: 1 },
      { p: 'cos(0°)', a: 1 },
      { p: 'sin(0°)', a: 0 },
    ];
    const pick = items[randomInt(items.length)]!;
    return { prompt: pick.p, answer: pick.a, level };
  }
  // harder linear: solve ax + b = c
  const x = randomInt(15) + 1;
  const a = randomInt(10) + 3;
  const b = randomInt(30) + 5;
  return { prompt: `Solve: ${a}x + ${b} = ${a * x + b}`, answer: x, level };
}

export function MentalMathsLadder() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [stream, setStream] = useState<Stream>('upper_primary');
  const [q, setQ] = useState<Q | null>(null);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<'idle' | 'right' | 'wrong'>('idle');
  const inputRef = useRef<HTMLInputElement>(null);

  const timer = useTimer({
    durationMs: QUESTION_TIME_MS,
    mode: 'down',
    onComplete: () => {
      // Ran out of time = wrong
      setFeedback('wrong');
      window.setTimeout(() => endGame(), 800);
    },
  });

  function start(sel: SetupSelections) {
    setStream(sel.stream);
    setScore(0);
    setLevel(1);
    setInput('');
    setFeedback('idle');
    setQ(generate(sel.stream, 1));
    timer.reset(QUESTION_TIME_MS);
    setPhase('playing');
    window.setTimeout(() => {
      timer.start();
      inputRef.current?.focus();
    }, 80);
  }

  function endGame() {
    timer.pause();
    setPhase('gameover');
    chimeComplete();
  }

  function submit() {
    if (!q || feedback !== 'idle') return;
    const v = Number(input.replace(',', '.').trim());
    if (Number.isNaN(v)) return;
    if (Math.abs(v - q.answer) < 1e-6) {
      setFeedback('right');
      chimeTick();
      window.setTimeout(() => {
        const nextLevel = level + 1;
        setLevel(nextLevel);
        setScore((s) => s + 1);
        setQ(generate(stream, nextLevel));
        setInput('');
        setFeedback('idle');
        timer.reset(QUESTION_TIME_MS);
        timer.start();
        inputRef.current?.focus();
      }, 600);
    } else {
      setFeedback('wrong');
      window.setTimeout(() => endGame(), 900);
    }
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') submit();
  }

  useEffect(() => {
    return () => {
      timer.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GameShell
      title="Mental Maths Ladder"
      description="Climb as high as you can. Each rung gets harder. One wrong answer ends the climb."
    >
      {phase === 'setup' && (
        <SetupScreen
          gameId="mental-maths-ladder"
          storageKey="mml"
          showSubject={false}
          countOptions={[10]}
          onStart={start}
        />
      )}

      {phase === 'playing' && q && (
        <div className={styles.playing}>
          <div className={styles.header}>
            <span className={styles.rung}>Rung {level}</span>
            <span className={styles.streak}>Streak · {score}</span>
            <span className={styles.timer}>{formatClock(timer.remainingMs, { showHours: 'never' })}</span>
          </div>

          <div className={styles.timeBar}>
            <div
              className={styles.timeBarFill}
              style={{ width: `${(timer.remainingMs / QUESTION_TIME_MS) * 100}%` }}
              data-warning={timer.remainingMs < 3000}
            />
          </div>

          <div className={styles.questionCard} data-state={feedback}>
            <span className={`font-display ${styles.prompt}`}>{q.prompt}</span>
            <span className={styles.equals}>=</span>
            <input
              ref={inputRef}
              type="text"
              inputMode="decimal"
              className={styles.answer}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              disabled={feedback !== 'idle'}
              autoFocus
            />
            {feedback === 'right' && <Check size={28} className={styles.icon} />}
            {feedback === 'wrong' && <XIcon size={28} className={styles.icon} />}
          </div>

          <div className={common.controlRow}>
            <button
              type="button"
              className={`${common.btn} ${common.btnPrimary}`}
              onClick={submit}
              disabled={feedback !== 'idle' || input === ''}
            >
              Submit
            </button>
            <button type="button" className={common.btn} onClick={endGame}>
              End climb
            </button>
          </div>
        </div>
      )}

      {phase === 'gameover' && q && (
        <div className={styles.gameover}>
          <Trophy size={36} className={styles.gameoverTrophy} />
          <p className="eyebrow">Highest rung</p>
          <span className={`font-display ${styles.gameoverNum}`}>{score}</span>
          <p className={styles.gameoverNote}>
            Stopped on: <strong>{q.prompt}</strong> = {q.answer}
          </p>
          <div className={common.controlRow}>
            <button
              type="button"
              className={`${common.btn} ${common.btnPrimary}`}
              onClick={() => setPhase('setup')}
            >
              Climb again
            </button>
          </div>
        </div>
      )}
    </GameShell>
  );
}
