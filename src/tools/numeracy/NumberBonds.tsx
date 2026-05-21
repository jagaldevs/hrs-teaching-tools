import { useEffect, useRef, useState } from 'react';
import { Check, X as XIcon, RotateCcw, Trophy } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { randomInt } from '../rng/util';
import { chimeTick, chimeComplete } from '../chime';
import { usePersistedState } from '../../hooks/usePersistedState';
import common from '../common.module.css';
import styles from './NumberBonds.module.css';

type Bond = 10 | 20 | 50 | 100;
const BONDS: Bond[] = [10, 20, 50, 100];

interface Question {
  total: Bond;
  /** Shown part. */
  known: number;
  /** Missing part — the answer. */
  missing: number;
  /** Which slot is missing: 'left' = "? + known = total"; 'right' = "known + ? = total"; */
  slot: 'left' | 'right';
}

function generate(total: Bond): Question {
  const known = randomInt(total + 1); // 0..total
  const missing = total - known;
  const slot: 'left' | 'right' = randomInt(2) === 0 ? 'left' : 'right';
  return { total, known, missing, slot };
}

export function NumberBonds() {
  const [bond, setBond] = usePersistedState<Bond>('bonds.bond', 10);
  const [question, setQuestion] = useState<Question>(() => generate(10));
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<'idle' | 'right' | 'wrong'>('idle');
  const [correct, setCorrect] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = usePersistedState<number>('bonds.best', 0);
  const inputRef = useRef<HTMLInputElement>(null);

  // When the bond size changes, generate a fresh question
  useEffect(() => {
    setQuestion(generate(bond));
    setInput('');
    setFeedback('idle');
    setStreak(0);
    inputRef.current?.focus();
  }, [bond]);

  function submit() {
    if (feedback !== 'idle') return;
    const v = Number(input.trim());
    if (Number.isNaN(v)) return;
    setAttempts((a) => a + 1);
    if (v === question.missing) {
      chimeTick();
      setFeedback('right');
      setCorrect((c) => c + 1);
      setStreak((s) => {
        const next = s + 1;
        if (next > bestStreak) setBestStreak(next);
        return next;
      });
      window.setTimeout(() => {
        setQuestion(generate(bond));
        setInput('');
        setFeedback('idle');
        inputRef.current?.focus();
      }, 500);
    } else {
      setFeedback('wrong');
      setStreak(0);
      window.setTimeout(() => setFeedback('idle'), 700);
    }
  }

  function resetStats() {
    setCorrect(0);
    setAttempts(0);
    setStreak(0);
    setQuestion(generate(bond));
    setInput('');
    setFeedback('idle');
    chimeComplete();
    inputRef.current?.focus();
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') submit();
  }

  const pct = attempts > 0 ? Math.round((correct / attempts) * 100) : 0;

  return (
    <ToolShell
      eyebrow="Numeracy"
      title="Number Bonds"
      description="Friends of 10, 20, 50 and 100. Type the missing number to complete each bond."
      actions={
        <button type="button" className={common.btn} onClick={resetStats}>
          <RotateCcw size={14} /> Reset stats
        </button>
      }
    >
      <div className={styles.bondPicker}>
        {BONDS.map((b) => (
          <button
            key={b}
            type="button"
            className={`${common.btn} ${styles.bondBtn}`}
            data-active={bond === b}
            onClick={() => setBond(b)}
          >
            Friends of {b}
          </button>
        ))}
      </div>

      <div className={styles.equation} data-state={feedback}>
        {question.slot === 'left' ? (
          <>
            <input
              ref={inputRef}
              type="text"
              inputMode="numeric"
              className={styles.slot}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              disabled={feedback === 'right'}
              autoFocus
            />
            <span className={styles.op}>+</span>
            <span className={styles.fixed}>{question.known}</span>
          </>
        ) : (
          <>
            <span className={styles.fixed}>{question.known}</span>
            <span className={styles.op}>+</span>
            <input
              ref={inputRef}
              type="text"
              inputMode="numeric"
              className={styles.slot}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              disabled={feedback === 'right'}
              autoFocus
            />
          </>
        )}
        <span className={styles.op}>=</span>
        <span className={styles.total}>{question.total}</span>
        {feedback === 'right' && <Check size={28} className={styles.iconRight} />}
        {feedback === 'wrong' && <XIcon size={28} className={styles.iconWrong} />}
      </div>

      <div className={common.controlRow}>
        <button
          type="button"
          className={`${common.btn} ${common.btnPrimary}`}
          onClick={submit}
          disabled={input === '' || feedback === 'right'}
        >
          Submit
        </button>
      </div>

      <section className={styles.stats}>
        <div className={styles.stat}>
          <span className={common.labelText}>Correct</span>
          <span className={styles.statNum}>{correct}</span>
        </div>
        <div className={styles.stat}>
          <span className={common.labelText}>Attempts</span>
          <span className={styles.statNum}>{attempts}</span>
        </div>
        <div className={styles.stat}>
          <span className={common.labelText}>Accuracy</span>
          <span className={styles.statNum}>{pct}%</span>
        </div>
        <div className={styles.stat}>
          <span className={common.labelText}>Streak</span>
          <span className={styles.statNum}>{streak}</span>
        </div>
        <div className={styles.stat}>
          <span className={common.labelText}>Best</span>
          <span className={styles.statNum}>
            <Trophy size={16} /> {bestStreak}
          </span>
        </div>
      </section>
    </ToolShell>
  );
}
