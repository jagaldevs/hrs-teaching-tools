import { useEffect, useRef, useState } from 'react';
import { Check, X as XIcon, Lightbulb, SkipForward, Trophy } from 'lucide-react';
import { GameShell, SetupScreen, type SetupSelections } from './GameShell';
import { ResultScreen } from './ResultScreen';
import { WHO_AM_I, type WhoAmIFigure } from '../data/banks/hass';
import { shuffle } from '../tools/rng/util';
import { chimeTick } from '../tools/chime';
import common from '../tools/common.module.css';
import styles from './WhoAmI.module.css';

type Phase = 'setup' | 'playing' | 'result';

interface Round { items: WhoAmIFigure[]; }
interface RoundResult { id: string; solvedAt: number | null; }

function normalise(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9 ]+/g, '').trim();
}

export function WhoAmI() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [setup, setSetup] = useState<SetupSelections | null>(null);
  const [round, setRound] = useState<Round | null>(null);
  const [idx, setIdx] = useState(0);
  const [cluesRevealed, setCluesRevealed] = useState(1);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<'idle' | 'right' | 'wrong'>('idle');
  const [results, setResults] = useState<RoundResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  function start(sel: SetupSelections) {
    const pool = WHO_AM_I[sel.stream] ?? WHO_AM_I.upper_primary;
    const items = shuffle(pool).slice(0, Math.min(sel.count, pool.length));
    setSetup(sel);
    setRound({ items });
    setIdx(0);
    setCluesRevealed(1);
    setInput('');
    setFeedback('idle');
    setResults([]);
    setPhase('playing');
    window.setTimeout(() => inputRef.current?.focus(), 30);
  }

  function submit() {
    if (!round || feedback !== 'idle') return;
    const figure = round.items[idx]!;
    const targets = [figure.name, ...(figure.alternateNames ?? [])].map(normalise);
    const guess = normalise(input);
    if (targets.includes(guess) || targets.some((t) => t.endsWith(' ' + guess) || guess.endsWith(' ' + t.split(' ').pop()!))) {
      setFeedback('right');
      chimeTick();
      setResults((prev) => [...prev, { id: figure.id, solvedAt: cluesRevealed }]);
      window.setTimeout(advance, 700);
    } else {
      setFeedback('wrong');
      window.setTimeout(() => setFeedback('idle'), 500);
    }
  }

  function revealMore() {
    if (!round) return;
    const figure = round.items[idx]!;
    setCluesRevealed((n) => Math.min(figure.clues.length, n + 1));
  }

  function skip() {
    if (!round) return;
    setResults((prev) => [...prev, { id: round.items[idx]!.id, solvedAt: null }]);
    advance();
  }

  function advance() {
    if (!round) return;
    if (idx + 1 >= round.items.length) {
      setPhase('result');
    } else {
      setIdx((i) => i + 1);
      setCluesRevealed(1);
      setInput('');
      setFeedback('idle');
      window.setTimeout(() => inputRef.current?.focus(), 30);
    }
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') submit();
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, [idx]);

  const score = results.reduce((s, r) => {
    if (r.solvedAt == null) return s;
    // 5 points if guessed on first clue, 4 on second, etc. Min 1.
    return s + Math.max(1, 6 - r.solvedAt);
  }, 0);

  const current = round?.items[idx];

  return (
    <GameShell
      title="Who Am I?"
      description="Five clues reveal one at a time. Guess earlier for more points."
    >
      {phase === 'setup' && (
        <SetupScreen gameId="who-am-i" storageKey="whoami" countOptions={[3, 5]} onStart={start} />
      )}

      {phase === 'playing' && current && (
        <div className={styles.playing}>
          <div className={styles.header}>
            <span className={styles.chip}>Figure {idx + 1} / {round!.items.length}</span>
            <span className={styles.chip}>Score · {score}</span>
            <span className={styles.chip}>Clue {cluesRevealed} / {current.clues.length}</span>
          </div>

          <ul className={styles.clueList}>
            {current.clues.slice(0, cluesRevealed).map((c, i) => (
              <li key={i} className={styles.clueItem}>
                <span className={styles.clueNum}>{i + 1}</span>
                <span className={styles.clueText}>{c}</span>
              </li>
            ))}
          </ul>

          <div className={styles.inputRow} data-state={feedback}>
            <input
              ref={inputRef}
              type="text"
              className={styles.answer}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Who am I?"
              disabled={feedback === 'right'}
              autoFocus
            />
            {feedback === 'right' && <Check size={20} className={styles.iconRight} />}
            {feedback === 'wrong' && <XIcon size={20} className={styles.iconWrong} />}
          </div>

          <div className={common.controlRow}>
            <button type="button" className={`${common.btn} ${common.btnPrimary}`} onClick={submit} disabled={input === '' || feedback === 'right'}>
              Guess
            </button>
            <button
              type="button"
              className={common.btn}
              onClick={revealMore}
              disabled={cluesRevealed >= current.clues.length || feedback === 'right'}
            >
              <Lightbulb size={14} /> Next clue
            </button>
            <button type="button" className={common.btn} onClick={skip} disabled={feedback === 'right'}>
              <SkipForward size={14} /> Skip
            </button>
          </div>

          {feedback === 'right' && (
            <div className={styles.solvedBanner}>
              <Trophy size={20} /> Correct! It was <strong>{current.name}</strong>.
            </div>
          )}
        </div>
      )}

      {phase === 'result' && setup && (
        <ResultScreen
          score={score}
          total={(round?.items.length ?? 0) * 5}
          onPlayAgain={() => setPhase('setup')}
          breakdown={[
            { label: 'Solved on 1st clue', value: results.filter((r) => r.solvedAt === 1).length },
            { label: 'Solved on 2nd–3rd', value: results.filter((r) => r.solvedAt && r.solvedAt > 1 && r.solvedAt <= 3).length },
            { label: 'Solved on 4th–5th', value: results.filter((r) => r.solvedAt && r.solvedAt > 3).length },
            { label: 'Skipped', value: results.filter((r) => r.solvedAt == null).length },
          ]}
        />
      )}
    </GameShell>
  );
}
