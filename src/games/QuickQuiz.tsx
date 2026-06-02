import { useState } from 'react';
import { Check, X as XIcon, ChevronRight } from 'lucide-react';
import { GameShell, SetupScreen, type SetupSelections } from './GameShell';
import { ResultScreen } from './ResultScreen';
import { MCQ_BANK } from '../data/banks/mcq';
import { pickFromClass } from './bankUtils';
import { SUBJECT_COLOURS, SUBJECTS, type MCQ, type Subject } from './types';
import common from '../tools/common.module.css';
import styles from './QuickQuiz.module.css';

type Phase = 'setup' | 'playing' | 'result';

interface Round {
  questions: MCQ[];
  subjects: Subject[];
}

export function QuickQuiz() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [setup, setSetup] = useState<SetupSelections | null>(null);
  const [round, setRound] = useState<Round | null>(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [bySubject, setBySubject] = useState<Partial<Record<Subject, { right: number; total: number }>>>({});
  const [startError, setStartError] = useState<string | null>(null);

  function start(sel: SetupSelections) {
    setStartError(null);
    const pulled = pickFromClass(MCQ_BANK, sel.classId, sel.count);
    if (pulled.items.length === 0) {
      setStartError(
        'No questions found for that class. Try a different class, or hard-refresh the page (Ctrl+Shift+R) to pick up the latest content.',
      );
      return;
    }
    setSetup(sel);
    setRound({ questions: pulled.items, subjects: pulled.subjects });
    setCurrent(0);
    setScore(0);
    setPicked(null);
    setRevealed(false);
    setBySubject({});
    setPhase('playing');
  }

  function answer(choice: number) {
    if (revealed || !round) return;
    setPicked(choice);
    setRevealed(true);
    const q = round.questions[current]!;
    const subj = round.subjects[current]!;
    const correct = choice === q.answer;
    if (correct) setScore((s) => s + 1);
    setBySubject((prev) => {
      const entry = prev[subj] ?? { right: 0, total: 0 };
      return {
        ...prev,
        [subj]: { right: entry.right + (correct ? 1 : 0), total: entry.total + 1 },
      };
    });
  }

  function next() {
    if (!round) return;
    if (current + 1 >= round.questions.length) {
      setPhase('result');
    } else {
      setCurrent((i) => i + 1);
      setPicked(null);
      setRevealed(false);
    }
  }

  const description = 'Multiple-choice questions across English, Maths, History, Geography and Science. AC V9-aligned.';

  return (
    <GameShell title="Quick Quiz" description={description}>
      {phase === 'setup' && (
        <>
          {startError && <p className={styles.startError}>{startError}</p>}
          <SetupScreen gameId="quick-quiz" storageKey="quickquiz" onStart={start} />
        </>
      )}

      {phase === 'playing' && round && (
        <PlayingScreen
          q={round.questions[current]!}
          subject={round.subjects[current]!}
          questionIndex={current}
          totalQuestions={round.questions.length}
          score={score}
          picked={picked}
          revealed={revealed}
          onAnswer={answer}
          onNext={next}
        />
      )}

      {phase === 'result' && setup && (
        <ResultScreen
          score={score}
          total={setup.count}
          onPlayAgain={() => setPhase('setup')}
          breakdown={SUBJECTS.filter((s) => bySubject[s.id]).map((s) => ({
            label: s.label,
            value: `${bySubject[s.id]!.right} / ${bySubject[s.id]!.total}`,
          }))}
        />
      )}
    </GameShell>
  );
}

interface PlayingProps {
  q: MCQ;
  subject: Subject;
  questionIndex: number;
  totalQuestions: number;
  score: number;
  picked: number | null;
  revealed: boolean;
  onAnswer: (choice: number) => void;
  onNext: () => void;
}

function PlayingScreen({
  q,
  subject,
  questionIndex,
  totalQuestions,
  score,
  picked,
  revealed,
  onAnswer,
  onNext,
}: PlayingProps) {
  const subjLabel = SUBJECTS.find((s) => s.id === subject)?.label ?? subject;
  const subjColour = SUBJECT_COLOURS[subject];
  const isRight = revealed && picked === q.answer;

  return (
    <div className={styles.playing}>
      <div className={styles.header}>
        <div className={styles.subjectChip} style={{ color: subjColour, borderColor: subjColour }}>
          <span style={{ background: subjColour }} className={styles.subjectDot} />
          {subjLabel}
        </div>
        <div className={styles.progress}>
          <span>
            Question {questionIndex + 1} / {totalQuestions}
          </span>
          <span className={styles.scoreBadge}>Score · {score}</span>
        </div>
      </div>

      <h2 className={`font-display ${styles.question}`}>{q.q}</h2>

      <div className={styles.choices}>
        {q.choices.map((choice, i) => {
          const isPicked = picked === i;
          const isCorrect = i === q.answer;
          const state = revealed
            ? isCorrect
              ? 'correct'
              : isPicked
                ? 'wrong'
                : 'idle'
            : 'idle';
          return (
            <button
              key={i}
              type="button"
              className={styles.choice}
              data-state={state}
              onClick={() => onAnswer(i)}
              disabled={revealed}
            >
              <span className={styles.choiceLetter}>{String.fromCharCode(65 + i)}</span>
              <span className={styles.choiceText}>{choice}</span>
              {revealed && isCorrect && <Check size={18} className={styles.choiceIcon} />}
              {revealed && isPicked && !isCorrect && <XIcon size={18} className={styles.choiceIcon} />}
            </button>
          );
        })}
      </div>

      {revealed && (
        <div className={styles.feedback} data-correct={isRight}>
          <span className={styles.verdict}>{isRight ? 'Correct!' : 'Not quite.'}</span>
          {!isRight && (
            <span className={styles.answerLine}>
              The answer was <strong>{String.fromCharCode(65 + q.answer)}: {q.choices[q.answer]}</strong>
            </span>
          )}
          {!isRight && picked !== null && (
            <span className={styles.pickLine}>
              You picked <strong>{String.fromCharCode(65 + picked)}: {q.choices[picked]}</strong>
            </span>
          )}
          {q.explanation && <span className={styles.explanation}>{q.explanation}</span>}
          <button
            type="button"
            className={`${common.btn} ${common.btnPrimary} ${styles.nextBtn}`}
            onClick={onNext}
            autoFocus
          >
            {questionIndex + 1 >= totalQuestions ? 'See results' : 'Next question'}
            <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
