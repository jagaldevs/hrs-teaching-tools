import { useState } from 'react';
import { Check, X as XIcon, ChevronRight } from 'lucide-react';
import { GameShell, SetupScreen, type SetupSelections } from './GameShell';
import { ResultScreen } from './ResultScreen';
import { ODD_BANK } from '../data/banks/oddOneOut';
import { pickFromBank } from './bankUtils';
import { SUBJECT_COLOURS, SUBJECTS, type OddItem, type Subject } from './types';
import common from '../tools/common.module.css';
import styles from './OddOneOut.module.css';

type Phase = 'setup' | 'playing' | 'result';

interface Round {
  items: OddItem[];
  subjects: Subject[];
}

export function OddOneOut() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [setup, setSetup] = useState<SetupSelections | null>(null);
  const [round, setRound] = useState<Round | null>(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [startError, setStartError] = useState<string | null>(null);

  function start(sel: SetupSelections) {
    setStartError(null);
    const pulled = pickFromBank(ODD_BANK, sel.stream, sel.subject, sel.count);
    if (pulled.items.length === 0) {
      setStartError(
        'No items found for that stream and subject. Try a different subject, or hard-refresh (Ctrl+Shift+R) to pick up the latest content.',
      );
      return;
    }
    setSetup(sel);
    setRound({ items: pulled.items, subjects: pulled.subjects });
    setCurrent(0);
    setScore(0);
    setPicked(null);
    setPhase('playing');
  }

  function answer(choice: number) {
    if (picked !== null || !round) return;
    setPicked(choice);
    if (choice === round.items[current]!.outlier) setScore((s) => s + 1);
  }

  function next() {
    if (!round) return;
    if (current + 1 >= round.items.length) {
      setPhase('result');
    } else {
      setCurrent((i) => i + 1);
      setPicked(null);
    }
  }

  return (
    <GameShell
      title="Odd One Out"
      description="Four items — three belong together, one doesn’t. Pick the misfit and justify why."
    >
      {phase === 'setup' && (
        <>
          {startError && <p className={styles.startError}>{startError}</p>}
          <SetupScreen storageKey="oddone" onStart={start} />
        </>
      )}

      {phase === 'playing' && round && (
        <Playing
          item={round.items[current]!}
          subject={round.subjects[current]!}
          questionIndex={current}
          total={round.items.length}
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
  item: OddItem;
  subject: Subject;
  questionIndex: number;
  total: number;
  score: number;
  picked: number | null;
  onAnswer: (i: number) => void;
  onNext: () => void;
}

function Playing({ item, subject, questionIndex, total, score, picked, onAnswer, onNext }: PlayingProps) {
  const subjLabel = SUBJECTS.find((s) => s.id === subject)?.label ?? subject;
  const subjColour = SUBJECT_COLOURS[subject];
  const revealed = picked !== null;
  const isRight = revealed && picked === item.outlier;

  return (
    <div className={styles.playing}>
      <div className={styles.header}>
        <div className={styles.subjectChip} style={{ color: subjColour, borderColor: subjColour }}>
          <span style={{ background: subjColour }} className={styles.subjectDot} />
          {subjLabel}
        </div>
        <div className={styles.progress}>
          <span>
            Round {questionIndex + 1} / {total}
          </span>
          <span className={styles.scoreBadge}>Score · {score}</span>
        </div>
      </div>

      <h2 className={`font-display ${styles.prompt}`}>Which one doesn’t belong?</h2>

      <div className={styles.grid}>
        {item.items.map((label, i) => {
          const isOutlier = i === item.outlier;
          const isPicked = i === picked;
          const state = !revealed
            ? 'idle'
            : isOutlier
              ? 'correct'
              : isPicked
                ? 'wrong'
                : 'idle';
          return (
            <button
              key={i}
              type="button"
              className={styles.tile}
              data-state={state}
              onClick={() => onAnswer(i)}
              disabled={revealed}
            >
              <span className={styles.tileLetter}>{String.fromCharCode(65 + i)}</span>
              <span className={`font-display ${styles.tileText}`}>{label}</span>
              {revealed && isOutlier && <Check size={20} className={styles.tileIcon} />}
              {revealed && isPicked && !isOutlier && <XIcon size={20} className={styles.tileIcon} />}
            </button>
          );
        })}
      </div>

      {revealed && (
        <div className={styles.feedback} data-correct={isRight}>
          <span className={styles.verdict}>{isRight ? 'Correct!' : 'Not quite.'}</span>
          {!isRight && (
            <span className={styles.answerLine}>
              The odd one out was <strong>{String.fromCharCode(65 + item.outlier)}: {item.items[item.outlier]}</strong>
            </span>
          )}
          {!isRight && picked !== null && (
            <span className={styles.pickLine}>
              You picked <strong>{String.fromCharCode(65 + picked)}: {item.items[picked]}</strong>
            </span>
          )}
          {item.explanation && <span className={styles.explanation}>{item.explanation}</span>}
          <button
            type="button"
            className={`${common.btn} ${common.btnPrimary} ${styles.nextBtn}`}
            onClick={onNext}
            autoFocus
          >
            {questionIndex + 1 >= total ? 'See results' : 'Next round'}
            <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
