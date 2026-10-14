import { useEffect, useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { GameShell, SetupScreen, type SetupSelections } from './GameShell';
import { ResultScreen } from './ResultScreen';
import { ESTIMATE, type EstimateItem } from '../data/banks/misc';
import { shuffle } from '../tools/rng/util';
import { chimeTick } from '../tools/chime';
import common from '../tools/common.module.css';
import styles from './EstimateIt.module.css';

type Phase = 'setup' | 'playing' | 'result';

interface Round {
  items: EstimateItem[];
}

function score(actual: number, guess: number): number {
  if (actual === 0 || guess === actual) return guess === actual ? 100 : 50;
  const pctOff = Math.abs(actual - guess) / Math.abs(actual);
  if (pctOff < 0.02) return 100;
  if (pctOff < 0.05) return 80;
  if (pctOff < 0.1) return 60;
  if (pctOff < 0.25) return 40;
  if (pctOff < 0.5) return 20;
  if (pctOff < 1.0) return 10;
  return 0;
}

export function EstimateIt() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [setup, setSetup] = useState<SetupSelections | null>(null);
  const [round, setRound] = useState<Round | null>(null);
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [points, setPoints] = useState<number[]>([]);
  const [revealed, setRevealed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function start(sel: SetupSelections) {
    const available = ESTIMATE[sel.stream] ?? [];
    const items = shuffle(available).slice(0, sel.count);
    setRound({ items });
    setSetup(sel);
    setIdx(0);
    setInput('');
    setPoints([]);
    setRevealed(false);
    setPhase('playing');
    window.setTimeout(() => inputRef.current?.focus(), 30);
  }

  function submit() {
    if (!round || revealed) return;
    const guess = Number(input.replace(',', '.').trim());
    if (Number.isNaN(guess)) return;
    const item = round.items[idx]!;
    const p = score(item.answer, guess);
    setPoints((prev) => [...prev, p]);
    setRevealed(true);
    if (p >= 80) chimeTick();
  }

  function next() {
    if (!round) return;
    if (idx + 1 >= round.items.length) {
      setPhase('result');
    } else {
      setIdx((i) => i + 1);
      setInput('');
      setRevealed(false);
      window.setTimeout(() => inputRef.current?.focus(), 30);
    }
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      if (revealed) next();
      else submit();
    }
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, [idx]);

  const current = round?.items[idx];
  const lastPoint = points[points.length - 1];
  const totalPoints = points.reduce((s, p) => s + p, 0);

  return (
    <GameShell
      title="Estimate It"
      description="The closer to the real answer, the more points. Up to 100 per round."
    >
      {phase === 'setup' && (
        <SetupScreen gameId="estimate-it" storageKey="estimate" onStart={start} />
      )}

      {phase === 'playing' && current && (
        <div className={styles.playing}>
          <div className={styles.header}>
            <span className={styles.chip}>Round {idx + 1} / {round!.items.length}</span>
            <span className={styles.chip}>Total · {totalPoints}</span>
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Estimate</p>
            <h2 className={`font-display ${styles.question}`}>{current.question}</h2>
            {current.context && <p className={styles.context}>{current.context}</p>}
          </div>

          <div className={styles.inputRow}>
            <input
              ref={inputRef}
              type="text"
              inputMode="decimal"
              className={styles.answer}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Your guess…"
              autoFocus
              disabled={revealed}
            />
            {current.unit && <span className={styles.unit}>{current.unit}</span>}
          </div>

          {revealed && lastPoint != null && (
            <div className={styles.feedback}>
              <p className={styles.feedbackHeader}>Actual answer</p>
              <span className={`font-display ${styles.actualNum}`}>
                {current.answer.toLocaleString()}{current.unit ? ` ${current.unit}` : ''}
              </span>
              <p className={styles.scoreLine}>
                You scored <strong>{lastPoint}</strong> / 100
              </p>
              <div className={styles.scoreBar}>
                <div className={styles.scoreFill} style={{ width: `${lastPoint}%` }} />
              </div>
            </div>
          )}

          <div className={common.controlRow}>
            {!revealed ? (
              <button type="button" className={`${common.btn} ${common.btnPrimary}`} onClick={submit} disabled={input === ''}>
                Submit guess
              </button>
            ) : (
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
        </div>
      )}

      {phase === 'result' && setup && (
        <ResultScreen
          score={totalPoints}
          total={(round?.items.length ?? setup.count) * 100}
          onPlayAgain={() => setPhase('setup')}
          breakdown={[
            { label: 'Perfect or near (≥80)', value: points.filter((p) => p >= 80).length },
            { label: 'Close (40–79)', value: points.filter((p) => p >= 40 && p < 80).length },
            { label: 'Off (<40)', value: points.filter((p) => p < 40).length },
          ]}
        />
      )}
    </GameShell>
  );
}
