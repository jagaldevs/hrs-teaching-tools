import { useEffect, useRef, useState } from 'react';
import { Check, X as XIcon, Lightbulb, KeyRound, SkipForward } from 'lucide-react';
import { GameShell, SetupScreen, type SetupSelections } from './GameShell';
import { ResultScreen } from './ResultScreen';
import { randomChoice, randomInt } from '../tools/rng/util';
import { chimeTick } from '../tools/chime';
import type { Stream } from '../data/games';
import common from '../tools/common.module.css';
import styles from './Codebreaker.module.css';

type Phase = 'setup' | 'playing' | 'result';

interface Puzzle {
  plain: string;
  shift: number;
  encoded: string;
}

const PHRASES: Record<Stream, string[]> = {
  lower_primary: ['CAT', 'SUN', 'DOG', 'STAR', 'TREE', 'FISH', 'MOON', 'CAKE', 'BIRD', 'PLAY'],
  upper_primary: ['HELLO WORLD', 'OPEN BOOK', 'GO FORTH', 'BRIGHT IDEA', 'QUIET PLEASE', 'WELL DONE', 'GOOD LUCK', 'TIME FLIES'],
  middle_school: ['KNOWLEDGE IS POWER', 'TIME WAITS FOR NO ONE', 'PRACTICE MAKES PERFECT', 'THE EARLY BIRD CATCHES THE WORM', 'CARPE DIEM', 'EUREKA MOMENT'],
  senior_school: ['VENI VIDI VICI', 'COGITO ERGO SUM', 'MEMENTO MORI', 'SAPERE AUDE', 'AD ASTRA PER ASPERA', 'EXPERIENCE IS THE BEST TEACHER', 'THE PEN IS MIGHTIER THAN THE SWORD'],
};

function caesar(text: string, shift: number): string {
  const A = 65;
  return text
    .toUpperCase()
    .split('')
    .map((c) => {
      const code = c.charCodeAt(0);
      if (code >= A && code <= A + 25) {
        return String.fromCharCode(((code - A + shift + 26) % 26) + A);
      }
      return c;
    })
    .join('');
}

function generatePuzzle(stream: Stream): Puzzle {
  const phrase = randomChoice(PHRASES[stream]) ?? 'HELLO';
  // Lower primary: shift 1-3; Upper: 2-7; Middle: 3-15; Senior: 4-25
  const maxShift =
    stream === 'lower_primary' ? 3 : stream === 'upper_primary' ? 7 : stream === 'middle_school' ? 15 : 25;
  const minShift = stream === 'lower_primary' ? 1 : 2;
  const shift = minShift + randomInt(maxShift - minShift + 1);
  return { plain: phrase, shift, encoded: caesar(phrase, shift) };
}

export function Codebreaker() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [setup, setSetup] = useState<SetupSelections | null>(null);
  const [puzzles, setPuzzles] = useState<Puzzle[]>([]);
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<'idle' | 'right' | 'wrong'>('idle');
  const [score, setScore] = useState(0);
  const [hint, setHint] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function start(sel: SetupSelections) {
    const ps = Array.from({ length: sel.count }, () => generatePuzzle(sel.stream));
    setPuzzles(ps);
    setSetup(sel);
    setIdx(0);
    setInput('');
    setScore(0);
    setFeedback('idle');
    setHint(false);
    setPhase('playing');
    window.setTimeout(() => inputRef.current?.focus(), 30);
  }

  function submit() {
    if (feedback !== 'idle') return;
    const target = puzzles[idx]!.plain.toLowerCase().replace(/\s+/g, ' ').trim();
    const guess = input.toLowerCase().replace(/\s+/g, ' ').trim();
    if (guess === target) {
      setFeedback('right');
      chimeTick();
      setScore((s) => s + (hint ? 0.5 : 1));
      window.setTimeout(advance, 700);
    } else {
      setFeedback('wrong');
      window.setTimeout(() => setFeedback('idle'), 500);
    }
  }

  function skip() {
    advance();
  }

  function advance() {
    if (idx + 1 >= puzzles.length) {
      setPhase('result');
    } else {
      setIdx((i) => i + 1);
      setInput('');
      setFeedback('idle');
      setHint(false);
      window.setTimeout(() => inputRef.current?.focus(), 30);
    }
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') submit();
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, [phase, idx]);

  const current = puzzles[idx];

  return (
    <GameShell
      title="Codebreaker"
      description="Each letter has been shifted forward in the alphabet. Crack the code."
    >
      {phase === 'setup' && (
        <SetupScreen storageKey="codebreaker" showSubject={false} onStart={start} />
      )}

      {phase === 'playing' && current && (
        <div className={styles.playing}>
          <div className={styles.header}>
            <span className={styles.chip}>Puzzle {idx + 1} / {puzzles.length}</span>
            <span className={styles.chip}>Score · {score}</span>
            {hint && <span className={styles.chip}>Shift: {current.shift}</span>}
          </div>

          <div className={styles.card} data-state={feedback}>
            <p className={styles.label}>Encoded</p>
            <span className={`font-display ${styles.code}`}>{current.encoded}</span>
            <p className={styles.hint}>
              <KeyRound size={12} /> Caesar cipher (each letter shifted forward by a hidden number)
            </p>
          </div>

          <div className={styles.inputRow} data-state={feedback}>
            <input
              ref={inputRef}
              type="text"
              className={styles.answer}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Decoded message…"
              autoFocus
              disabled={feedback === 'right'}
            />
            {feedback === 'right' && <Check size={20} className={styles.iconRight} />}
            {feedback === 'wrong' && <XIcon size={20} className={styles.iconWrong} />}
          </div>

          <div className={common.controlRow}>
            <button type="button" className={`${common.btn} ${common.btnPrimary}`} onClick={submit} disabled={input === '' || feedback === 'right'}>
              Submit
            </button>
            {!hint && (
              <button type="button" className={common.btn} onClick={() => setHint(true)}>
                <Lightbulb size={14} /> Show shift (½ pt)
              </button>
            )}
            <button type="button" className={common.btn} onClick={skip}>
              <SkipForward size={14} /> Skip
            </button>
          </div>
        </div>
      )}

      {phase === 'result' && setup && (
        <ResultScreen score={Math.round(score * 10) / 10} total={setup.count} onPlayAgain={() => setPhase('setup')} />
      )}
    </GameShell>
  );
}
