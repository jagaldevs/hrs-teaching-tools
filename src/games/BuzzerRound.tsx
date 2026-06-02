import { useCallback, useEffect, useState } from 'react';
import { Check, X as XIcon, ChevronRight, Eye, EyeOff, Trophy } from 'lucide-react';
import { GameShell, SetupScreen, type SetupSelections } from './GameShell';
import { MCQ_BANK } from '../data/banks/mcq';
import { pickFromBank, unitFilterFor } from './bankUtils';
import { SUBJECTS, SUBJECT_COLOURS, type MCQ, type Subject } from './types';
import { chimeTick, chimeComplete } from '../tools/chime';
import { usePersistedState } from '../hooks/usePersistedState';
import common from '../tools/common.module.css';
import styles from './BuzzerRound.module.css';

type Phase = 'setup' | 'playing' | 'result';

interface Team {
  id: string;
  name: string;
  colour: string;
  hotkey: string;
  score: number;
}

const COLOURS = ['#E6007E', '#0EA5E9', '#10B981', '#F59E0B', '#A855F7', '#EF4444'];
const HOTKEYS = ['1', '2', '3', '4', '5', '6'];

function defaultTeams(n: number): Team[] {
  return Array.from({ length: n }, (_, i) => ({
    id: crypto.randomUUID(),
    name: `Team ${i + 1}`,
    colour: COLOURS[i % COLOURS.length]!,
    hotkey: HOTKEYS[i] ?? '',
    score: 0,
  }));
}

interface Round {
  questions: MCQ[];
  subjects: Subject[];
}

export function BuzzerRound() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [round, setRound] = useState<Round | null>(null);
  const [current, setCurrent] = useState(0);
  const [teams, setTeams] = usePersistedState<Team[]>('buzzround.teams', defaultTeams(3));
  const [buzzed, setBuzzed] = useState<string | null>(null);
  const [answerShown, setAnswerShown] = useState(false);
  // Teams that have been "locked out" for this question by getting it wrong
  const [lockedTeams, setLockedTeams] = useState<Set<string>>(new Set());
  const [startError, setStartError] = useState<string | null>(null);

  function start(sel: SetupSelections) {
    setStartError(null);
    const unitFilter = unitFilterFor(sel);
    const pulled = pickFromBank(MCQ_BANK, sel.stream, sel.subject, sel.count, unitFilter);
    if (pulled.items.length === 0) {
      setStartError(
        'No questions found for that stream and subject. Try a different subject, or hard-refresh (Ctrl+Shift+R) to pick up the latest content.',
      );
      return;
    }
    setRound({ questions: pulled.items, subjects: pulled.subjects });
    setCurrent(0);
    setBuzzed(null);
    setAnswerShown(false);
    setLockedTeams(new Set());
    setTeams((prev) => prev.map((t) => ({ ...t, score: 0 })));
    setPhase('playing');
  }

  const buzz = useCallback(
    (teamId: string) => {
      if (buzzed !== null || lockedTeams.has(teamId) || answerShown) return;
      setBuzzed(teamId);
      chimeTick();
    },
    [buzzed, lockedTeams, answerShown],
  );

  function award(correct: boolean) {
    if (!buzzed) return;
    if (correct) {
      setTeams((prev) =>
        prev.map((t) => (t.id === buzzed ? { ...t, score: t.score + 1 } : t)),
      );
      setAnswerShown(true);
    } else {
      // wrong: lock this team out for the rest of the question, others can still buzz
      setLockedTeams((prev) => new Set(prev).add(buzzed));
      setBuzzed(null);
    }
  }

  function reveal() {
    setAnswerShown(true);
  }

  function nextQuestion() {
    if (!round) return;
    if (current + 1 >= round.questions.length) {
      chimeComplete();
      setPhase('result');
    } else {
      setCurrent((i) => i + 1);
      setBuzzed(null);
      setAnswerShown(false);
      setLockedTeams(new Set());
    }
  }

  function addTeam() {
    if (teams.length >= 6) return;
    setTeams((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: `Team ${prev.length + 1}`,
        colour: COLOURS[prev.length % COLOURS.length]!,
        hotkey: HOTKEYS[prev.length] ?? '',
        score: 0,
      },
    ]);
  }

  function removeTeam() {
    if (teams.length <= 2) return;
    setTeams((prev) => prev.slice(0, -1));
  }

  function renameTeam(id: string, name: string) {
    setTeams((prev) => prev.map((t) => (t.id === id ? { ...t, name } : t)));
  }

  // Keyboard hotkeys for buzzers (1–6) + space to clear
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.repeat) return;
      if (phase !== 'playing') return;
      const t = teams.find((t) => t.hotkey === e.key);
      if (t) buzz(t.id);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [teams, buzz, phase]);

  return (
    <GameShell
      title="Buzzer Round"
      description="Teacher-led quiz with team buzzers. First team to buzz answers; correct = point, wrong = locked out, others may buzz."
    >
      {phase === 'setup' && startError && (
        <p className={styles.startError}>{startError}</p>
      )}
      {phase === 'setup' && (
        <SetupScreen
          gameId="buzzer-round"
          storageKey="buzzround"
          onStart={start}
          showSeniorUnits
          extra={
            <section className={styles.teamSetup}>
              <p className="eyebrow">Teams · {teams.length}</p>
              <div className={styles.teamChips}>
                {teams.map((t) => (
                  <input
                    key={t.id}
                    className={styles.teamChip}
                    style={{ borderColor: t.colour, color: t.colour }}
                    value={t.name}
                    onChange={(e) => renameTeam(t.id, e.target.value)}
                  />
                ))}
              </div>
              <div className={styles.teamControls}>
                <button type="button" className={common.btn} onClick={removeTeam} disabled={teams.length <= 2}>
                  − Remove team
                </button>
                <button type="button" className={common.btn} onClick={addTeam} disabled={teams.length >= 6}>
                  + Add team
                </button>
              </div>
            </section>
          }
        />
      )}

      {phase === 'playing' && round && (
        <Playing
          q={round.questions[current]!}
          subject={round.subjects[current]!}
          questionIndex={current}
          total={round.questions.length}
          teams={teams}
          buzzed={buzzed}
          lockedTeams={lockedTeams}
          answerShown={answerShown}
          onBuzz={buzz}
          onAward={award}
          onReveal={reveal}
          onNext={nextQuestion}
        />
      )}

      {phase === 'result' && (
        <ResultBoard teams={teams} onPlayAgain={() => setPhase('setup')} />
      )}
    </GameShell>
  );
}

interface PlayingProps {
  q: MCQ;
  subject: Subject;
  questionIndex: number;
  total: number;
  teams: Team[];
  buzzed: string | null;
  lockedTeams: Set<string>;
  answerShown: boolean;
  onBuzz: (id: string) => void;
  onAward: (correct: boolean) => void;
  onReveal: () => void;
  onNext: () => void;
}

function Playing({
  q,
  subject,
  questionIndex,
  total,
  teams,
  buzzed,
  lockedTeams,
  answerShown,
  onBuzz,
  onAward,
  onReveal,
  onNext,
}: PlayingProps) {
  const subjLabel = SUBJECTS.find((s) => s.id === subject)?.label ?? subject;
  const subjColour = SUBJECT_COLOURS[subject];
  const buzzedTeam = teams.find((t) => t.id === buzzed) ?? null;
  const allLocked = teams.every((t) => lockedTeams.has(t.id));

  return (
    <div className={styles.playing}>
      <div className={styles.header}>
        <div className={styles.subjectChip} style={{ color: subjColour, borderColor: subjColour }}>
          <span style={{ background: subjColour }} className={styles.subjectDot} />
          {subjLabel}
        </div>
        <span className={styles.progress}>
          Question {questionIndex + 1} / {total}
        </span>
      </div>

      <h2 className={`font-display ${styles.question}`}>{q.q}</h2>

      <div className={styles.choices}>
        {q.choices.map((c, i) => (
          <div key={i} className={styles.choice} data-correct={answerShown && i === q.answer}>
            <span className={styles.choiceLetter}>{String.fromCharCode(65 + i)}</span>
            <span>{c}</span>
            {answerShown && i === q.answer && <Check size={16} />}
          </div>
        ))}
      </div>

      {buzzedTeam && !answerShown && (
        <div className={styles.buzzBanner} style={{ background: buzzedTeam.colour }}>
          <span className="eyebrow" style={{ color: '#fff', opacity: 0.7 }}>
            Buzzed first
          </span>
          <span className={`font-display ${styles.buzzName}`}>{buzzedTeam.name}</span>
          <div className={styles.buzzActions}>
            <button
              type="button"
              className={`${common.btn} ${styles.awardBtn}`}
              onClick={() => onAward(true)}
            >
              <Check size={16} /> Correct (+1)
            </button>
            <button
              type="button"
              className={`${common.btn} ${styles.awardBtn}`}
              onClick={() => onAward(false)}
            >
              <XIcon size={16} /> Wrong (lock out)
            </button>
          </div>
        </div>
      )}

      <div className={styles.teamsRow}>
        {teams.map((t) => {
          const isLocked = lockedTeams.has(t.id);
          const isBuzzed = buzzed === t.id;
          return (
            <button
              key={t.id}
              type="button"
              className={styles.buzzer}
              style={{
                background: t.colour,
                opacity: isLocked ? 0.35 : 1,
              }}
              onClick={() => onBuzz(t.id)}
              disabled={buzzed !== null || isLocked || answerShown}
              data-buzzed={isBuzzed}
            >
              <span className={styles.hotkey}>{t.hotkey}</span>
              <span className={`font-display ${styles.buzzerName}`}>{t.name}</span>
              <span className={styles.buzzerScore}>{t.score}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.bottomControls}>
        {allLocked && !answerShown && (
          <button type="button" className={`${common.btn} ${common.btnPrimary}`} onClick={onReveal}>
            <Eye size={14} /> All teams locked — reveal answer
          </button>
        )}
        {!answerShown && !buzzed && !allLocked && (
          <button type="button" className={common.btn} onClick={onReveal}>
            <EyeOff size={14} /> Skip — reveal answer
          </button>
        )}
        {answerShown && (
          <button
            type="button"
            className={`${common.btn} ${common.btnPrimary}`}
            onClick={onNext}
            autoFocus
          >
            {questionIndex + 1 >= total ? 'See final scores' : 'Next question'}
            <ChevronRight size={14} />
          </button>
        )}
      </div>

      <p className={styles.hint}>Press number keys (1–{teams.length}) for remote buzzing.</p>
    </div>
  );
}

function ResultBoard({ teams, onPlayAgain }: { teams: Team[]; onPlayAgain: () => void }) {
  const sorted = [...teams].sort((a, b) => b.score - a.score);
  const top = sorted[0];
  const winners = top ? sorted.filter((t) => t.score === top.score) : [];
  const maxScore = Math.max(1, ...teams.map((t) => t.score));

  return (
    <div className={styles.resultBoard}>
      <div className={styles.resultCrown}>
        <Trophy size={36} />
      </div>
      <p className="eyebrow">Final standings</p>
      <h2 className={`font-display ${styles.resultTitle}`}>
        {winners.length === 1
          ? `${winners[0]!.name} wins!`
          : winners.length > 1
            ? 'It’s a tie!'
            : 'Round over'}
      </h2>

      <ul className={styles.resultList}>
        {sorted.map((t, i) => (
          <li key={t.id} className={styles.resultRow} style={{ ['--team-colour' as string]: t.colour }}>
            <span className={styles.resultRank}>{i + 1}</span>
            <span className={styles.resultDot} style={{ background: t.colour }} />
            <span className={styles.resultName}>{t.name}</span>
            <div className={styles.resultBar}>
              <div
                className={styles.resultFill}
                style={{ width: `${(t.score / maxScore) * 100}%`, background: t.colour }}
              />
            </div>
            <span className={styles.resultScore}>{t.score}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={`${common.btn} ${common.btnPrimary}`}
        onClick={onPlayAgain}
      >
        Play again
      </button>
    </div>
  );
}
