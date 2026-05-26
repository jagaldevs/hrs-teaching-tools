import { useMemo, useState } from 'react';
import { Shuffle, Eye, EyeOff, Check } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { MCQ_BANK } from '../../data/banks/mcq';
import { pickFromBank } from '../../games/bankUtils';
import { SUBJECTS, SUBJECT_COLOURS, type MCQ, type Subject } from '../../games/types';
import { STREAMS, type Stream } from '../../data/games';
import { usePersistedState } from '../../hooks/usePersistedState';
import common from '../common.module.css';
import styles from './QuestionGenerator.module.css';

interface Drawn {
  q: MCQ;
  subject: Subject;
}

type UnitGroup = 'any' | 'units_1_2' | 'units_3_4';

const SENIOR_UNIT_GROUPS: { id: UnitGroup; label: string; sub: string }[] = [
  { id: 'any', label: 'Any', sub: 'All senior content' },
  { id: 'units_1_2', label: 'Y11', sub: 'Units 1 & 2' },
  { id: 'units_3_4', label: 'Y12', sub: 'Units 3 & 4' },
];

export function QuestionGenerator() {
  const [stream, setStream] = usePersistedState<Stream>('qgen.stream', 'upper_primary');
  const [subject, setSubject] = usePersistedState<Subject | 'mix'>('qgen.subject', 'mix');
  const [unitGroup, setUnitGroup] = usePersistedState<UnitGroup>('qgen.unitGroup', 'any');
  const [drawn, setDrawn] = useState<Drawn | null>(null);
  const [revealed, setRevealed] = useState(false);

  const showUnits = stream === 'senior_school';

  const unitFilter = useMemo<((q: MCQ) => boolean) | undefined>(() => {
    if (!showUnits || unitGroup === 'any') return undefined;
    if (unitGroup === 'units_1_2') return (q) => q.unit === 1 || q.unit === 2;
    return (q) => q.unit === 3 || q.unit === 4;
  }, [showUnits, unitGroup]);

  const bankSize = useMemo(() => {
    const streamData = MCQ_BANK.byStreamSubject[stream] ?? {};
    const subjectLists = subject === 'mix'
      ? (Object.values(streamData) as (MCQ[] | undefined)[])
      : [streamData[subject]];
    let total = 0;
    for (const list of subjectLists) {
      if (!list) continue;
      total += unitFilter ? list.filter(unitFilter).length : list.length;
    }
    return total;
  }, [stream, subject, unitFilter]);

  function draw() {
    const picked = pickFromBank(MCQ_BANK, stream, subject, 1, unitFilter);
    if (picked.items.length === 0) {
      setDrawn(null);
      return;
    }
    setDrawn({ q: picked.items[0]!, subject: picked.subjects[0]! });
    setRevealed(false);
  }

  return (
    <ToolShell
      eyebrow="Randomisers"
      title="Question Generator"
      description="Pull a random multiple-choice question from the AC V9 bank. Useful as a quick brain-break filler."
      actions={
        <button
          type="button"
          className={`${common.btn} ${common.btnPrimary}`}
          onClick={draw}
          disabled={bankSize === 0}
        >
          <Shuffle size={14} /> {drawn ? 'New question' : 'Draw question'}
        </button>
      }
    >
      <section className={styles.filters}>
        <div className={styles.filterRow}>
          <p className={common.labelText}>Stream</p>
          <div className={styles.choices}>
            {STREAMS.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`${common.btn} ${styles.choice}`}
                data-active={stream === s.id}
                onClick={() => setStream(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.filterRow}>
          <p className={common.labelText}>Subject</p>
          <div className={styles.choices}>
            <button
              type="button"
              className={`${common.btn} ${styles.choice}`}
              data-active={subject === 'mix'}
              onClick={() => setSubject('mix')}
            >
              Mixed
            </button>
            {SUBJECTS.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`${common.btn} ${styles.choice}`}
                data-active={subject === s.id}
                onClick={() => setSubject(s.id)}
                style={{ ['--accent-tint' as string]: SUBJECT_COLOURS[s.id] }}
              >
                <span className={styles.dot} style={{ background: SUBJECT_COLOURS[s.id] }} />
                {s.label}
              </button>
            ))}
          </div>
        </div>
        {showUnits && (
          <div className={styles.filterRow}>
            <p className={common.labelText}>Senior cohort</p>
            <div className={styles.choices}>
              {SENIOR_UNIT_GROUPS.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  className={`${common.btn} ${styles.choice}`}
                  data-active={unitGroup === g.id}
                  onClick={() => setUnitGroup(g.id)}
                  title={g.sub}
                >
                  {g.label} · {g.sub}
                </button>
              ))}
            </div>
          </div>
        )}
        <p className={styles.bankSize}>{bankSize} questions in this bank</p>
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
          <p>Press <strong>Draw question</strong> to pull one from the bank.</p>
        </div>
      )}
    </ToolShell>
  );
}
