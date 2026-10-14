import { useState } from 'react';
import { Check, X as XIcon, ChevronRight, Hand } from 'lucide-react';
import { GameShell, SetupScreen, type SetupSelections } from './GameShell';
import { ResultScreen } from './ResultScreen';
import { TRUTHS, type TruthsLieItem } from '../data/banks/misc';
import { findClass } from '../data/classes';
import { shuffleOptions } from './bankUtils';
import { shuffle } from '../tools/rng/util';
import common from '../tools/common.module.css';
import styles from './TwoTruthsLie.module.css';
import quickStyles from './QuickQuiz.module.css';

type Phase = 'setup' | 'playing' | 'result';

interface Round {
  items: TruthsLieItem[];
  /** Class name when the round is generic-only (class has no TL items). */
  generalFor: string | null;
}

/**
 * Reveal-state values:
 *  - 'idle'        Before any pick.
 *  - 'correct-pick'  User picked this AND it was the lie. (You got it right.)
 *  - 'wrong-pick'   User picked this AND it was a truth.  (Your guess was wrong.)
 *  - 'lie-unpicked' The actual lie when the user picked something else. (The right answer.)
 *  - 'truth'        A truth the user didn't pick.
 *
 * Crucially this distinguishes "the lie the user found" from "the lie the user missed",
 * and "the user's wrong guess" from "the actual lie" — both used to share red.
 */
type CellState = 'idle' | 'correct-pick' | 'wrong-pick' | 'lie-unpicked' | 'truth';

function cellState(picked: number | null, lie: number, i: number): CellState {
  if (picked === null) return 'idle';
  const isLie = i === lie;
  const isPicked = picked === i;
  if (isPicked && isLie) return 'correct-pick';
  if (isPicked && !isLie) return 'wrong-pick';
  if (!isPicked && isLie) return 'lie-unpicked';
  return 'truth';
}

export function TwoTruthsLie() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [setup, setSetup] = useState<SetupSelections | null>(null);
  const [round, setRound] = useState<Round | null>(null);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [startError, setStartError] = useState<string | null>(null);

  function start(sel: SetupSelections) {
    setStartError(null);
    // Class-anchored items first — items tagged with this classId.
    const streamPool = TRUTHS[sel.stream] ?? [];
    const anchored = streamPool.filter((t) => t.classId === sel.classId);
    // Backfill: any items at this stream WITHOUT a classId (generic AC V9).
    const generic = streamPool.filter((t) => !t.classId);
    const narrowed = anchored.length >= sel.count
      ? anchored
      : [...anchored, ...generic];

    if (narrowed.length === 0) {
      setStartError('No Two Truths items found for that class. Try a different class.');
      return;
    }
    const list = shuffle(narrowed).slice(0, sel.count).map((t): TruthsLieItem => {
      const s = shuffleOptions(t.statements, t.lie);
      return { ...t, statements: s.options as TruthsLieItem['statements'], lie: s.correct as TruthsLieItem['lie'] };
    });
    // Generic items are untagged mixed general knowledge, so they can't be
    // narrowed to the class's subject. Say so on screen rather than letting
    // "Year 9 Maths" quietly serve Shakespeare trivia.
    const generalFor = anchored.length === 0 ? (findClass(sel.classId)?.name ?? null) : null;
    setSetup(sel);
    setRound({ items: list, generalFor });
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
  const wasCorrect = picked !== null && current && picked === current.lie;

  return (
    <GameShell
      title="Two Truths and a Lie"
      description="Three statements appear. Two are true; one is a lie. Spot the lie."
    >
      {phase === 'setup' && (
        <>
          {startError && <p className={quickStyles.startError}>{startError}</p>}
          <SetupScreen gameId="two-truths-one-lie" storageKey="twotruths" onStart={start} />
        </>
      )}

      {phase === 'playing' && current && (
        <div className={styles.playing}>
          <div className={styles.header}>
            <span className={styles.chip}>Round {idx + 1} / {round!.items.length}</span>
            <span className={styles.chip}>Score · {score}</span>
            {round!.generalFor && (
              <span className={styles.chip} title={`${round!.generalFor} has no Two Truths items of its own yet`}>
                General knowledge · no {round!.generalFor} items yet
              </span>
            )}
          </div>

          <div className={styles.stack}>
            {current.statements.map((s, i) => {
              const state = cellState(picked, current.lie, i);
              const isLie = i === current.lie;
              const isPicked = picked === i;
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

                  {/* Right-side annotations after a pick */}
                  {picked !== null && (
                    <span className={styles.tagRow}>
                      {isPicked && (
                        <span className={styles.tagYourPick}>
                          <Hand size={12} /> Your pick
                        </span>
                      )}
                      {isLie ? (
                        <span className={styles.tagLie}>
                          <XIcon size={12} /> The lie
                        </span>
                      ) : (
                        <span className={styles.tagTruth}>
                          <Check size={12} /> True
                        </span>
                      )}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {picked !== null && (
            <div className={styles.feedback} data-correct={wasCorrect}>
              <p className={styles.verdict}>
                {wasCorrect ? 'Correct!' : 'Not quite.'}
              </p>
              <p className={styles.lieLine}>
                <span className={styles.lieLabel}>The lie was</span>
                <strong className={styles.lieText}>
                  {String.fromCharCode(65 + current.lie)}. {current.statements[current.lie]}
                </strong>
              </p>
              {!wasCorrect && picked !== null && (
                <p className={styles.yourPickLine}>
                  You picked <strong>{String.fromCharCode(65 + picked)}</strong> — that was actually true.
                </p>
              )}
              <p className={styles.explanation}>{current.explanation}</p>
              <button
                type="button"
                className={`${common.btn} ${common.btnPrimary} ${styles.nextBtn}`}
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
