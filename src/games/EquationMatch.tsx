import { useState } from 'react';
import { Equal, Trophy, RotateCcw } from 'lucide-react';
import { GameShell, SetupScreen, type SetupSelections } from './GameShell';
import { useTimer, formatClock } from '../tools/useTimer';
import { randomInt, shuffle } from '../tools/rng/util';
import { chimeTick, chimeComplete } from '../tools/chime';
import type { Stream } from '../data/games';
import common from '../tools/common.module.css';
import styles from './EquationMatch.module.css';

type Phase = 'setup' | 'playing' | 'result';

interface Pair {
  id: string;
  expr: string;
  result: number;
}

const ROUND_TIME_MS = 90_000;

function generatePairs(stream: Stream, n: number): Pair[] {
  const pairs: Pair[] = [];
  const seen = new Set<number>();
  while (pairs.length < n) {
    const p = generateOne(stream);
    if (seen.has(p.result)) continue;
    seen.add(p.result);
    pairs.push({ ...p, id: crypto.randomUUID() });
  }
  return pairs;
}

function generateOne(stream: Stream): { expr: string; result: number } {
  switch (stream) {
    case 'lower_primary': {
      // a + b within 20
      const a = randomInt(10) + 1;
      const b = randomInt(10) + 1;
      return { expr: `${a} + ${b}`, result: a + b };
    }
    case 'upper_primary': {
      const op = randomInt(3);
      if (op === 0) {
        const a = randomInt(11) + 2;
        const b = randomInt(11) + 2;
        return { expr: `${a} × ${b}`, result: a * b };
      }
      if (op === 1) {
        const a = randomInt(80) + 20;
        const b = randomInt(20) + 5;
        return { expr: `${a} − ${b}`, result: a - b };
      }
      const b = randomInt(8) + 2;
      const q = randomInt(11) + 2;
      return { expr: `${b * q} ÷ ${b}`, result: q };
    }
    case 'middle_school': {
      const op = randomInt(4);
      if (op === 0) {
        const a = randomInt(15) + 5;
        return { expr: `${a}²`, result: a * a };
      }
      if (op === 1) {
        const a = -(randomInt(12) + 1);
        const b = -(randomInt(12) + 1);
        return { expr: `(${a}) × (${b})`, result: a * b };
      }
      if (op === 2) {
        const t = (randomInt(9) + 2) * 10;
        const p = [10, 20, 25, 50][randomInt(4)]!;
        return { expr: `${p}% of ${t}`, result: Math.round((t * p) / 100) };
      }
      // simple linear solve
      const x = randomInt(9) + 1;
      const a = randomInt(7) + 2;
      const c = a * x;
      return { expr: `Solve ${a}x = ${c}`, result: x };
    }
    case 'senior_school': {
      const op = randomInt(4);
      if (op === 0) {
        const a = (randomInt(8) + 4) ** 2;
        return { expr: `√${a}`, result: Math.sqrt(a) };
      }
      if (op === 1) {
        const a = randomInt(7) + 3;
        return { expr: `${a}³`, result: a * a * a };
      }
      if (op === 2) {
        const t = (randomInt(15) + 5) * 20;
        const p = [5, 15, 25, 40][randomInt(4)]!;
        return { expr: `${p}% of ${t}`, result: Math.round((t * p) / 100) };
      }
      const x = randomInt(15) + 1;
      const a = randomInt(8) + 3;
      const b = randomInt(20) + 5;
      return { expr: `Solve ${a}x + ${b} = ${a * x + b}`, result: x };
    }
  }
}

export function EquationMatch() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [pairs, setPairs] = useState<Pair[]>([]);
  const [shuffledResults, setShuffledResults] = useState<Pair[]>([]);
  const [selectedExpr, setSelectedExpr] = useState<string | null>(null);
  const [solvedIds, setSolvedIds] = useState<Set<string>>(new Set());
  const [wrongFlash, setWrongFlash] = useState<string | null>(null);

  const timer = useTimer({
    durationMs: ROUND_TIME_MS,
    mode: 'down',
    onComplete: () => {
      chimeComplete();
      setPhase('result');
    },
  });

  function start(sel: SetupSelections) {
    const p = generatePairs(sel.stream, 6);
    setPairs(p);
    setShuffledResults(shuffle(p));
    setSelectedExpr(null);
    setSolvedIds(new Set());
    setWrongFlash(null);
    timer.reset(ROUND_TIME_MS);
    setPhase('playing');
    window.setTimeout(() => timer.start(), 80);
  }

  function pickExpr(id: string) {
    if (solvedIds.has(id)) return;
    setSelectedExpr(selectedExpr === id ? null : id);
  }

  function pickResult(resultPair: Pair) {
    if (!selectedExpr) return;
    if (solvedIds.has(resultPair.id)) return;
    if (resultPair.id === selectedExpr) {
      setSolvedIds((prev) => {
        const next = new Set(prev);
        next.add(resultPair.id);
        return next;
      });
      setSelectedExpr(null);
      chimeTick();
      if (solvedIds.size + 1 === pairs.length) {
        timer.pause();
        chimeComplete();
        window.setTimeout(() => setPhase('result'), 600);
      }
    } else {
      setWrongFlash(resultPair.id);
      window.setTimeout(() => setWrongFlash(null), 400);
    }
  }

  const score = solvedIds.size;

  return (
    <GameShell
      title="Equation Match"
      description="Pair every expression with its correct result. Faster = better."
    >
      {phase === 'setup' && (
        <SetupScreen
          storageKey="eqmatch"
          showSubject={false}
          countOptions={[6]}
          onStart={start}
        />
      )}

      {phase === 'playing' && (
        <div className={styles.playing}>
          <div className={styles.header}>
            <span className={styles.chip}>Solved · {score} / {pairs.length}</span>
            <span className={styles.chip} data-warning={timer.remainingMs < 15000}>
              {formatClock(timer.remainingMs, { showHours: 'never' })}
            </span>
          </div>

          <div className={styles.board}>
            <div className={styles.column}>
              <p className={styles.colLabel}>Expression</p>
              {pairs.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={styles.tile}
                  data-selected={selectedExpr === p.id}
                  data-solved={solvedIds.has(p.id)}
                  onClick={() => pickExpr(p.id)}
                  disabled={solvedIds.has(p.id)}
                >
                  {p.expr}
                </button>
              ))}
            </div>
            <Equal size={28} className={styles.equalIcon} />
            <div className={styles.column}>
              <p className={styles.colLabel}>Result</p>
              {shuffledResults.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={styles.tile}
                  data-solved={solvedIds.has(p.id)}
                  data-wrong={wrongFlash === p.id}
                  onClick={() => pickResult(p)}
                  disabled={solvedIds.has(p.id) || !selectedExpr}
                >
                  {Number.isInteger(p.result) ? p.result : p.result.toFixed(2)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {phase === 'result' && (
        <div className={styles.result}>
          <Trophy size={36} className={styles.resultTrophy} />
          <p className="eyebrow">Round complete</p>
          <span className={`font-display ${styles.resultNum}`}>{score} / {pairs.length}</span>
          <p className={styles.resultNote}>
            {timer.remainingMs > 0
              ? `Finished with ${formatClock(timer.remainingMs, { showHours: 'never' })} to spare`
              : 'Time’s up'}
          </p>
          <button
            type="button"
            className={`${common.btn} ${common.btnPrimary}`}
            onClick={() => setPhase('setup')}
          >
            <RotateCcw size={14} /> Play again
          </button>
        </div>
      )}
    </GameShell>
  );
}
