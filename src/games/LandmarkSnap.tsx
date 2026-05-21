import { useState } from 'react';
import { Check, X as XIcon, ChevronRight } from 'lucide-react';
import { GameShell, SetupScreen, type SetupSelections } from './GameShell';
import { ResultScreen } from './ResultScreen';
import { LANDMARKS, type LandmarkItem } from '../data/banks/hass';
import { shuffle } from '../tools/rng/util';
import { chimeTick } from '../tools/chime';
import common from '../tools/common.module.css';
import styles from './LandmarkSnap.module.css';

type Phase = 'setup' | 'playing' | 'result';

interface Question {
  item: LandmarkItem;
  choices: string[];
  answer: number;
}

function buildQuestion(item: LandmarkItem): Question {
  const all = [item.name, ...item.distractors];
  const shuffled = shuffle(all);
  return { item, choices: shuffled, answer: shuffled.indexOf(item.name) };
}

export function LandmarkSnap() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [setup, setSetup] = useState<SetupSelections | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  function start(sel: SetupSelections) {
    const list = shuffle(LANDMARKS[sel.stream] ?? LANDMARKS.upper_primary).slice(0, sel.count);
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
      title="Landmark Snap"
      description="Identify the landmark from a description."
    >
      {phase === 'setup' && (
        <SetupScreen storageKey="landmarks" showSubject={false} onStart={start} />
      )}

      {phase === 'playing' && current && (
        <div className={styles.playing}>
          <div className={styles.header}>
            <span className={styles.chip}>{idx + 1} / {questions.length}</span>
            <span className={styles.chip}>Score · {score}</span>
          </div>

          <div className={styles.card}>
            <span className={styles.emoji}>{current.item.emoji}</span>
            <p className={`font-display ${styles.description}`}>{current.item.description}</p>
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

          {picked !== null && (
            <button type="button" className={`${common.btn} ${common.btnPrimary}`} onClick={next} autoFocus>
              {idx + 1 >= questions.length ? 'See results' : 'Next landmark'}
              <ChevronRight size={14} />
            </button>
          )}
        </div>
      )}

      {phase === 'result' && setup && (
        <ResultScreen score={score} total={questions.length} onPlayAgain={() => setPhase('setup')} />
      )}
    </GameShell>
  );
}
