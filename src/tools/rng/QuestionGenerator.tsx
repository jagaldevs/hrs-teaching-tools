import { useMemo, useState } from 'react';
import { Shuffle, Eye, EyeOff, Check } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { MCQ_BANK } from '../../data/banks/mcq';
import { YEAR_BANDS, findClass } from '../../data/classes';
import { classPool } from '../../games/bankUtils';
import { ClassPicker, useClassSelection } from '../../games/ClassPicker';
import { SUBJECTS, SUBJECT_COLOURS, type MCQ, type Subject } from '../../games/types';
import { randomChoice } from './util';
import common from '../common.module.css';
import styles from './QuestionGenerator.module.css';

interface Drawn {
  q: MCQ;
  subject: Subject;
}

const ALL_BANDS = YEAR_BANDS.map((b) => b.id);

export function QuestionGenerator() {
  const [classId, setClassId] = useClassSelection('qgen', ALL_BANDS);
  const [drawn, setDrawn] = useState<Drawn | null>(null);
  const [revealed, setRevealed] = useState(false);

  const pool = useMemo(() => classPool(MCQ_BANK, classId), [classId]);
  const anchored = !!findClass(classId)?.anchored;

  function changeClass(id: string) {
    setClassId(id);
    setDrawn(null);
  }

  function draw() {
    // Avoid serving the same question twice in a row when we can.
    const options = pool.length > 1 ? pool.filter((p) => p.item.id !== drawn?.q.id) : pool;
    const pick = randomChoice(options);
    if (!pick) {
      setDrawn(null);
      return;
    }
    setDrawn({ q: pick.item, subject: pick.subject });
    setRevealed(false);
  }

  return (
    <ToolShell
      eyebrow="Randomisers"
      title="Question Generator"
      description="Pull a random multiple-choice question for your class. Useful as a quick brain-break filler."
      actions={
        <button
          type="button"
          className={`${common.btn} ${common.btnPrimary}`}
          onClick={draw}
          disabled={pool.length === 0}
        >
          <Shuffle size={14} /> {drawn ? 'New question' : 'Draw question'}
        </button>
      }
    >
      <section className={styles.filters}>
        <ClassPicker bands={ALL_BANDS} classId={classId} onChange={changeClass} />
        <p className={styles.bankSize}>
          {pool.length} {anchored ? 'HRS-anchored' : 'generic'} questions for this class
        </p>
      </section>

      {drawn ? (
        <article className={styles.card}>
          <header className={styles.cardHeader}>
            <span
              className={styles.subjectChip}
              style={{ color: SUBJECT_COLOURS[drawn.subject], borderColor: SUBJECT_COLOURS[drawn.subject] }}
            >
              <span className={styles.dot} style={{ background: SUBJECT_COLOURS[drawn.subject] }} />
              {SUBJECTS.find((s) => s.id === drawn.subject)?.label ?? drawn.subject}
            </span>
            {drawn.q.acCode && <span className={styles.acCode}>{drawn.q.acCode}</span>}
          </header>

          <h2 className={`font-display ${styles.question}`}>{drawn.q.q}</h2>

          <ol className={styles.choicesList}>
            {drawn.q.choices.map((choice, i) => {
              const isCorrect = i === drawn.q.answer;
              return (
                <li
                  key={i}
                  className={styles.choiceItem}
                  data-correct={revealed && isCorrect}
                >
                  <span className={styles.choiceLetter}>{String.fromCharCode(65 + i)}</span>
                  <span>{choice}</span>
                  {revealed && isCorrect && <Check size={16} className={styles.checkIcon} />}
                </li>
              );
            })}
          </ol>

          <div className={common.controlRow}>
            <button
              type="button"
              className={`${common.btn} ${revealed ? '' : common.btnPrimary}`}
              onClick={() => setRevealed(!revealed)}
            >
              {revealed ? <EyeOff size={14} /> : <Eye size={14} />}
              {revealed ? 'Hide answer' : 'Reveal answer'}
            </button>
            <button type="button" className={common.btn} onClick={draw}>
              <Shuffle size={14} /> Another
            </button>
          </div>

          {revealed && drawn.q.explanation && (
            <p className={styles.explanation}>{drawn.q.explanation}</p>
          )}
        </article>
      ) : (
        <div className={styles.empty}>
          <p>Press <strong>Draw question</strong> to pull one for your class.</p>
        </div>
      )}
    </ToolShell>
  );
}
