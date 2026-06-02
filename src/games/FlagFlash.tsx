import { useState } from 'react';
import { Check, X as XIcon, ChevronRight } from 'lucide-react';
import { GameShell, SetupScreen, type SetupSelections } from './GameShell';
import { ResultScreen } from './ResultScreen';
import { FLAGS, type FlagItem } from '../data/banks/hass';
import { shuffle } from '../tools/rng/util';
import { chimeTick } from '../tools/chime';
import common from '../tools/common.module.css';
import styles from './FlagFlash.module.css';

type Phase = 'setup' | 'playing' | 'result';

interface Question {
  flag: FlagItem;
  choices: string[];
  answer: number;
}

function buildQuestion(flag: FlagItem): Question {
  const all = [flag.name, ...flag.distractors];
  const shuffled = shuffle(all);
  return { flag, choices: shuffled, answer: shuffled.indexOf(flag.name) };
}

export function FlagFlash() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [setup, setSetup] = useState<SetupSelections | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  function start(sel: SetupSelections) {
    const list = shuffle(FLAGS[sel.stream] ?? FLAGS.upper_primary).slice(0, sel.count);
    setQuestions(list.map(buildQuestion));
    setSetup(sel);
    setIdx(0);
    setPicked(null);
    setScore(0);
    setPhase('playing');
  }

  function answer(i: number) {
    if (picked !== null) return;
    setPicked(i);
    if (i === questions[idx]!.answer) {
      setScore((s) => s + 1);
      chimeTick();
    }
  }

  function next() {
    if (idx + 1 >= questions.length) setPhase('result');
    else {
      setIdx((i) => i + 1);
      setPicked(null);
    }
  }

  const current = questions[idx];

  return (
    <GameShell
      title="Flag Flash"
      description="Identify the flag. Streams scale from Australian neighbours to global geopolitics."
    >
      {phase === 'setup' && (
        <SetupScreen gameId="flag-flash" storageKey="flags" onStart={start} />
      )}

      {phase === 'playing' && current && (
        <div className={styles.playing}>
          <div className={styles.header}>
            <span className={styles.chip}>Flag {idx + 1} / {questions.length}</span>
            <span className={styles.chip}>Score · {score}</span>
          </div>

          <div className={styles.flagCard}>
            <span className={styles.flag}>{current.flag.flag}</span>
          </div>

          <div className={styles.choices}>
            {current.choices.map((c, i) => {
              const isCorrect = i === current.answer;
              const isPicked = picked === i;
              const state = picked === null ? 'idle' : isCorrect ? 'right' : isPicked ? 'wrong' : 'idle';
              return (
                <button
                  key={i}
                  type="button"
                  className={styles.choice}
                  data-state={state}
                  onClick={() => answer(i)}
                  disabled={picked !== null}
                >
                  <span>{c}</span>
                  {picked !== null && isCorrect && <Check size={14} />}
                  {picked !== null && isPicked && !isCorrect && <XIcon size={14} />}
                </button>
              );
            })}
          </div>

          {picked !== null && (() => {
            const isRight = picked === current.answer;
            return (
              <div className={styles.feedback} data-correct={isRight}>
                <span className={styles.verdict}>{isRight ? 'Correct!' : 'Not quite.'}</span>
                {!isRight && (
                  <span className={styles.answerLine}>
                    The flag was <strong>{current.flag.flag} {current.choices[current.answer]}</strong>
                  </span>
                )}
                {!isRight && (
                  <span className={styles.pickLine}>
                    You picked <strong>{current.choices[picked]}</strong>
                  </span>
                )}
                <button
                  type="button"
                  className={`${common.btn} ${common.btnPrimary} ${styles.nextBtn}`}
                  onClick={next}
                  autoFocus
                >
                  {idx + 1 >= questions.length ? 'See results' : 'Next flag'}
                  <ChevronRight size={14} />
                </button>
              </div>
            );
          })()}
        </div>
      )}

      {phase === 'result' && setup && (
        <ResultScreen score={score} total={questions.length} onPlayAgain={() => setPhase('setup')} />
      )}
    </GameShell>
  );
}
