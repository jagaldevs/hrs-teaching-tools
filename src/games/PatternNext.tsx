import { useState } from 'react';
import { Check, X as XIcon, ChevronRight } from 'lucide-react';
import { GameShell, SetupScreen, type SetupSelections } from './GameShell';
import { ResultScreen } from './ResultScreen';
import { randomInt, shuffle } from '../tools/rng/util';
import type { Stream } from '../data/games';
import common from '../tools/common.module.css';
import styles from './PatternNext.module.css';

type Phase = 'setup' | 'playing' | 'result';

interface Pattern {
  sequence: (number | string)[];
  answer: number | string;
  rule: string;
  /** Type controls display: number sequences vs shape patterns. */
  type: 'number' | 'shape';
}

const SHAPES = ['●', '■', '▲', '★', '◆', '✚'];

function generate(stream: Stream): Pattern {
  switch (stream) {
    case 'lower_primary':
      return generateLower();
    case 'upper_primary':
      return generateUpper();
    case 'middle_school':
      return generateMiddle();
    case 'senior_school':
      return generateSenior();
  }
}

function generateLower(): Pattern {
  const choice = randomInt(4);
  if (choice === 0) {
    // count by 1s
    const start = randomInt(8) + 1;
    const seq = [start, start + 1, start + 2, start + 3];
    return { sequence: seq, answer: start + 4, rule: 'Count up by 1', type: 'number' };
  }
  if (choice === 1) {
    // count by 2s
    const start = randomInt(10) + 2;
    const seq = [start, start + 2, start + 4, start + 6];
    return { sequence: seq, answer: start + 8, rule: 'Count up by 2', type: 'number' };
  }
  if (choice === 2) {
    // shape pattern AB
    const a = SHAPES[randomInt(SHAPES.length)]!;
    const b = SHAPES[randomInt(SHAPES.length)]!;
    return { sequence: [a, b, a, b], answer: a, rule: 'Repeating shape pattern', type: 'shape' };
  }
  // count down by 1
  const start = randomInt(8) + 5;
  return { sequence: [start, start - 1, start - 2, start - 3], answer: start - 4, rule: 'Count down by 1', type: 'number' };
}

function generateUpper(): Pattern {
  const choice = randomInt(5);
  if (choice === 0) {
    // skip by 3, 4, 5
    const step = randomInt(3) + 3;
    const start = randomInt(15) + 1;
    const seq = [start, start + step, start + step * 2, start + step * 3];
    return { sequence: seq, answer: start + step * 4, rule: `Add ${step}`, type: 'number' };
  }
  if (choice === 1) {
    // double each
    const start = randomInt(4) + 1;
    const seq = [start, start * 2, start * 4, start * 8];
    return { sequence: seq, answer: start * 16, rule: 'Double each', type: 'number' };
  }
  if (choice === 2) {
    // alternating add/sub
    const a = randomInt(15) + 5;
    const seq = [a, a + 3, a + 1, a + 4];
    return { sequence: seq, answer: a + 2, rule: '+3, −2, +3, −2…', type: 'number' };
  }
  if (choice === 3) {
    // ABBA shapes
    const a = SHAPES[randomInt(SHAPES.length)]!;
    const b = SHAPES[randomInt(SHAPES.length)]!;
    return { sequence: [a, b, b, a, a], answer: b, rule: 'ABBA pattern', type: 'shape' };
  }
  // squares 1, 4, 9, 16 — primary kids see the pattern as "add 3, 5, 7"
  return { sequence: [1, 4, 9, 16], answer: 25, rule: 'Square numbers (1², 2², 3²…)', type: 'number' };
}

function generateMiddle(): Pattern {
  const choice = randomInt(5);
  if (choice === 0) {
    // arithmetic
    const start = randomInt(20) + 5;
    const step = randomInt(7) + 3;
    const seq = [start, start + step, start + step * 2, start + step * 3];
    return { sequence: seq, answer: start + step * 4, rule: `Add ${step}`, type: 'number' };
  }
  if (choice === 1) {
    // geometric
    const start = randomInt(3) + 2;
    const r = randomInt(3) + 2;
    const seq = [start, start * r, start * r * r, start * r * r * r];
    return { sequence: seq, answer: start * r ** 4, rule: `Multiply by ${r}`, type: 'number' };
  }
  if (choice === 2) {
    // fibonacci-like
    const a = randomInt(6) + 1;
    const b = randomInt(8) + 2;
    const c = a + b;
    const d = b + c;
    const e = c + d;
    return { sequence: [a, b, c, d, e], answer: d + e, rule: 'Add the previous two', type: 'number' };
  }
  if (choice === 3) {
    // cubes 1 8 27 64
    return { sequence: [1, 8, 27, 64], answer: 125, rule: 'Cubes (1³, 2³, 3³…)', type: 'number' };
  }
  // square numbers
  return { sequence: [4, 9, 16, 25], answer: 36, rule: 'Square numbers', type: 'number' };
}

function generateSenior(): Pattern {
  const choice = randomInt(5);
  if (choice === 0) {
    // arithmetic harder
    const start = randomInt(40) + 10;
    const step = randomInt(15) + 5;
    const seq = [start, start + step, start + step * 2, start + step * 3];
    return { sequence: seq, answer: start + step * 4, rule: `Arithmetic +${step}`, type: 'number' };
  }
  if (choice === 1) {
    // geometric harder
    const start = randomInt(5) + 2;
    const r = randomInt(3) + 2;
    return {
      sequence: [start, start * r, start * r * r, start * r ** 3],
      answer: start * r ** 4,
      rule: `Geometric ×${r}`,
      type: 'number',
    };
  }
  if (choice === 2) {
    // fibonacci proper
    return { sequence: [1, 1, 2, 3, 5, 8], answer: 13, rule: 'Fibonacci', type: 'number' };
  }
  if (choice === 3) {
    // triangular
    return { sequence: [1, 3, 6, 10, 15], answer: 21, rule: 'Triangular numbers (1, 1+2, 1+2+3…)', type: 'number' };
  }
  // powers of 2
  return { sequence: [2, 4, 8, 16, 32], answer: 64, rule: 'Powers of 2', type: 'number' };
}

function buildChoices(p: Pattern): { value: number | string; isAnswer: boolean }[] {
  // Generate 3 distractors near the correct answer; for shape: pick 3 other shapes.
  const correct = p.answer;
  const set = new Set<number | string>([correct]);
  if (p.type === 'shape') {
    while (set.size < 4) {
      set.add(SHAPES[randomInt(SHAPES.length)]!);
    }
  } else {
    const c = correct as number;
    const offsets = [-2, -1, 1, 2, 3, -3, 5, -5];
    while (set.size < 4) {
      const off = offsets[randomInt(offsets.length)]!;
      const candidate = c + off;
      if (candidate >= 0 && !set.has(candidate)) set.add(candidate);
    }
  }
  return shuffle([...set]).map((v) => ({ value: v, isAnswer: v === correct }));
}

export function PatternNext() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [setup, setSetup] = useState<SetupSelections | null>(null);
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [choicesList, setChoicesList] = useState<ReturnType<typeof buildChoices>[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | string | null>(null);

  function start(sel: SetupSelections) {
    const pats = Array.from({ length: sel.count }, () => generate(sel.stream));
    setPatterns(pats);
    setChoicesList(pats.map((p) => buildChoices(p)));
    setSetup(sel);
    setCurrent(0);
    setScore(0);
    setPicked(null);
    setPhase('playing');
  }

  function answer(v: number | string) {
    if (picked !== null) return;
    setPicked(v);
    if (v === patterns[current]!.answer) setScore((s) => s + 1);
  }

  function next() {
    if (current + 1 >= patterns.length) {
      setPhase('result');
    } else {
      setCurrent((i) => i + 1);
      setPicked(null);
    }
  }

  return (
    <GameShell
      title="Pattern Next"
      description="Spot the rule and predict the next value or shape."
    >
      {phase === 'setup' && (
        <SetupScreen storageKey="patternnext" showSubject={false} onStart={start} />
      )}

      {phase === 'playing' && patterns[current] && (
        <Playing
          pattern={patterns[current]!}
          choices={choicesList[current]!}
          questionIndex={current}
          total={patterns.length}
          score={score}
          picked={picked}
          onAnswer={answer}
          onNext={next}
        />
      )}

      {phase === 'result' && setup && (
        <ResultScreen score={score} total={setup.count} onPlayAgain={() => setPhase('setup')} />
      )}
    </GameShell>
  );
}

interface PlayingProps {
  pattern: Pattern;
  choices: { value: number | string; isAnswer: boolean }[];
  questionIndex: number;
  total: number;
  score: number;
  picked: number | string | null;
  onAnswer: (v: number | string) => void;
  onNext: () => void;
}

function Playing({ pattern, choices, questionIndex, total, score, picked, onAnswer, onNext }: PlayingProps) {
  const revealed = picked !== null;
  const isRight = revealed && picked === pattern.answer;

  return (
    <div className={styles.playing}>
      <div className={styles.header}>
        <span className={styles.chip}>
          Round {questionIndex + 1} / {total}
        </span>
        <span className={styles.chip}>Score · {score}</span>
      </div>

      <h2 className={`font-display ${styles.prompt}`}>What comes next?</h2>

      <div className={styles.sequence} data-type={pattern.type}>
        {pattern.sequence.map((v, i) => (
          <span key={i} className={styles.term}>
            {v}
          </span>
        ))}
        <span className={styles.term} data-mystery={!revealed} data-revealed={revealed}>
          {revealed ? pattern.answer : '?'}
        </span>
      </div>

      <div className={styles.choices} data-type={pattern.type}>
        {choices.map((c, i) => {
          const isPicked = picked === c.value;
          const state = !revealed ? 'idle' : c.isAnswer ? 'correct' : isPicked ? 'wrong' : 'idle';
          return (
            <button
              key={i}
              type="button"
              className={styles.choice}
              data-state={state}
              data-type={pattern.type}
              onClick={() => onAnswer(c.value)}
              disabled={revealed}
            >
              {c.value}
              {revealed && c.isAnswer && <Check size={16} className={styles.choiceIcon} />}
              {revealed && isPicked && !c.isAnswer && <XIcon size={16} className={styles.choiceIcon} />}
            </button>
          );
        })}
      </div>

      {revealed && (
        <div className={styles.feedback} data-correct={isRight}>
          <span>{isRight ? 'Correct!' : 'Incorrect.'}</span>
          <span className={styles.rule}>The rule was: {pattern.rule}</span>
          <button
            type="button"
            className={`${common.btn} ${common.btnPrimary} ${styles.nextBtn}`}
            onClick={onNext}
            autoFocus
          >
            {questionIndex + 1 >= total ? 'See results' : 'Next pattern'}
            <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
