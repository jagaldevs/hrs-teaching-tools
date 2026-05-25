import { useState } from 'react';
import { Eye, EyeOff, Check, X as XIcon, RotateCcw, Trophy, Shuffle } from 'lucide-react';
import { GameShell } from './GameShell';
import { TWENTY_Q, type TwentyQItem } from '../data/banks/misc';
import { randomChoice } from '../tools/rng/util';
import { chimeComplete } from '../tools/chime';
import common from '../tools/common.module.css';
import styles from './TwentyQuestions.module.css';

type Phase = 'idle' | 'playing' | 'over';

interface QuestionLog {
  text: string;
  answer: 'yes' | 'no' | 'sometimes';
}

export function TwentyQuestions() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [target, setTarget] = useState<TwentyQItem | null>(null);
  const [questionsLeft, setQuestionsLeft] = useState(20);
  const [hidden, setHidden] = useState(true);
  const [log, setLog] = useState<QuestionLog[]>([]);
  const [solved, setSolved] = useState(false);

  function start() {
    const item = randomChoice(TWENTY_Q) ?? TWENTY_Q[0]!;
    setTarget(item);
    setQuestionsLeft(20);
    setHidden(true);
    setLog([]);
    setSolved(false);
    setPhase('playing');
  }

  function recordAnswer(answer: QuestionLog['answer']) {
    if (questionsLeft <= 0) return;
    // Just tally the answer; no prompt. The class hears the question — the
    // log gives a running count of how many of each answer type came up.
    setLog((l) => [...l, { text: `Question ${l.length + 1}`, answer }]);
    setQuestionsLeft((n) => n - 1);
  }

  function solveSuccess() {
    chimeComplete();
    setSolved(true);
    setPhase('over');
  }

  function giveUp() {
    setSolved(false);
    setPhase('over');
  }

  return (
    <GameShell
      title="20 Questions"
      description="Teacher sees a hidden item. Class asks yes/no questions to narrow it down. Twenty tries to guess it."
    >
      {phase === 'idle' && (
        <div className={styles.startCard}>
          <p className="eyebrow">Ready?</p>
          <h2 className={`font-display ${styles.startTitle}`}>20 Questions</h2>
          <p className={styles.startNote}>
            A hidden item will appear for the teacher only. The class asks yes/no questions; the
            teacher answers using the buttons below. Win by guessing within 20 questions.
          </p>
          <button type="button" className={`${common.btn} ${common.btnPrimary}`} onClick={start}>
            Start round
          </button>
        </div>
      )}

      {phase === 'playing' && target && (
        <div className={styles.playing}>
          <div className={styles.header}>
            <span className={styles.chip} data-warning={questionsLeft <= 5}>
              Questions left · {questionsLeft}
            </span>
            <button type="button" className={common.btn} onClick={() => setHidden(!hidden)}>
              {hidden ? <Eye size={14} /> : <EyeOff size={14} />}
              {hidden ? 'Reveal to teacher' : 'Hide answer'}
            </button>
          </div>

          <div className={styles.targetCard} data-hidden={hidden}>
            <p className={styles.label}>{target.category}</p>
            {hidden ? (
              <span className={styles.placeholder}>(hidden — teacher only)</span>
            ) : (
              <span className={`font-display ${styles.targetName}`}>{target.item}</span>
            )}
          </div>

          <p className={styles.hint}>Class asks a question. Teacher records the answer:</p>

          <div className={styles.answerRow}>
            <button type="button" className={`${styles.ansBtn} ${styles.yes}`} onClick={() => recordAnswer('yes')} disabled={questionsLeft <= 0}>
              <Check size={18} /> Yes
            </button>
            <button type="button" className={`${styles.ansBtn} ${styles.maybe}`} onClick={() => recordAnswer('sometimes')} disabled={questionsLeft <= 0}>
              Sometimes
            </button>
            <button type="button" className={`${styles.ansBtn} ${styles.no}`} onClick={() => recordAnswer('no')} disabled={questionsLeft <= 0}>
              <XIcon size={18} /> No
            </button>
          </div>

          <div className={common.controlRow}>
            <button type="button" className={common.btn} onClick={giveUp}>
              <XIcon size={14} /> Give up
            </button>
            <button type="button" className={`${common.btn} ${common.btnPrimary}`} onClick={solveSuccess}>
              <Trophy size={14} /> Class guessed it
            </button>
          </div>

          {log.length > 0 && (
            <ul className={styles.log}>
              {log.map((q, i) => (
                <li key={i} className={styles.logItem} data-answer={q.answer}>
                  <span className={styles.logNum}>Q{i + 1}</span>
                  <span className={styles.logText}>{q.text}</span>
                  <span className={styles.logAns}>{q.answer}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {phase === 'over' && target && (
        <div className={styles.over} data-solved={solved}>
          <p className="eyebrow">{solved ? 'Class wins!' : 'Item was…'}</p>
          <span className={`font-display ${styles.overName}`}>{target.item}</span>
          <p className={styles.overNote}>
            {solved
              ? `Solved with ${log.length} of 20 questions used`
              : `${log.length} questions used`}
          </p>
          <div className={common.controlRow}>
            <button type="button" className={`${common.btn} ${common.btnPrimary}`} onClick={start}>
              <Shuffle size={14} /> New round
            </button>
            <button type="button" className={common.btn} onClick={() => setPhase('idle')}>
              <RotateCcw size={14} /> Reset
            </button>
          </div>
        </div>
      )}
    </GameShell>
  );
}
