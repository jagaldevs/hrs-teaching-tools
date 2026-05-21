import { useState } from 'react';
import { Check, X as XIcon, ChevronRight } from 'lucide-react';
import { GameShell, SetupScreen, type SetupSelections } from './GameShell';
import { ResultScreen } from './ResultScreen';
import { TRUTHS, type TruthsLieItem } from '../data/banks/misc';
import { shuffle } from '../tools/rng/util';
import common from '../tools/common.module.css';
import styles from './TwoTruthsLie.module.css';

type Phase = 'setup' | 'playing' | 'result';

interface Round {
  items: TruthsLieItem[];
}

export function TwoTruthsLie() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [setup, setSetup] = useState<SetupSelections | null>(null);
  const [round, setRound] = useState<Round | null>(null);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  function start(sel: SetupSelections) {
    const list = shuffle(TRUTHS[sel.stream] ?? []).slice(0, sel.count);
    setSetup(sel);
    setRound({ items: list });
    setIdx(0);
    setPicked(null);
    setScore(0);
    setPhase('playing');
  }

  function answer(i: number) {
    if (picked !== null || !round) return;
    setPicked(i);
    if (i === round.items[idx]!.lie) setScore((s) => s + 1);
  }

  function next() {
    if (!round) return;
    if (idx + 1 >= round.items.length) setPhase('result');
    else {
      setIdx((i) => i + 1);
      setPicked(null);
    }
  }

  const current = round?.items[idx];

  return (
    <GameShell
      title="Two Truths and a Lie"
      description="Three statements appear. Spot the falsehood."
    >
      {phase === 'setup' && (
        <SetupScreen storageKey="twotruths" showSubject={false} onStart={start} />
      )}

      {phase === 'playing' && current && (
        <div className={styles.playing}>
          <div className={styles.header}>
            <span className={styles.chip}>Round {idx + 1} / {round!.items.length}</span>
            <span className={styles.chip}>Score · {score}</span>
          </div>

          <div className={styles.stack}>
            {current.statements.map((s, i) => {
              const isLie = i === current.lie;
              const isPicked = picked === i;
              const state = picked === null ? 'idle' : isLie ? 'lie' : isPicked ? 'wrong' : 'truth';
              return (
                <button
                  key={i}
                  type="button"
                  className={styles.statement}
                  data-state={state}
                  onClick={() => answer(i)}
                  disabled={picked !== null}
                >
                  <span className={styles.statementLetter}>{String.fromCharCode(65 + i)}</span>
                  <span className={styles.statementText}>{s}</span>
                  {picked !== null && isLie && <XIcon size={18} />}
                  {picked !== null && !isLie && <Check size={18} />}
                </button>
              );
            })}
          </div>

          {picked !== null && (
            <div className={styles.feedback} data-correct={picked === current.lie}>
              <span>{picked === current.lie ? 'Correct — that was the lie!' : 'Nope, that was true.'}</span>
              <span className={styles.explanation}>{current.explanation}</span>
              <button
                type="button"
                className={`${common.btn} ${common.btnPrimary}`}
                onClick={next}
                autoFocus
              >
                {idx + 1 >= round!.items.length ? 'See results' : 'Next round'}
                <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>
      )}

      {phase === 'result' && setup && (
        <ResultScreen
          score={score}
          total={round!.items.length}
          onPlayAgain={() => setPhase('setup')}
        />
      )}
    </GameShell>
  );
}
