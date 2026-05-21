import { useEffect, useRef, useState } from 'react';
import { X as XIcon, Trophy, Link2 } from 'lucide-react';
import { GameShell, SetupScreen, type SetupSelections } from './GameShell';
import { pickWords } from '../data/banks/words';
import { useTimer, formatClock } from '../tools/useTimer';
import { chimeTick, chimeComplete } from '../tools/chime';
import common from '../tools/common.module.css';
import styles from './WordChain.module.css';

type Phase = 'setup' | 'playing' | 'gameover';

const TURN_TIME_MS = 12_000;

export function WordChain() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [chain, setChain] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<'idle' | 'wrong'>('idle');
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const timer = useTimer({
    durationMs: TURN_TIME_MS,
    mode: 'down',
    onComplete: () => {
      setError('Time’s up!');
      setFeedback('wrong');
      window.setTimeout(end, 600);
    },
  });

  function start(sel: SetupSelections) {
    // Seed with one word from the appropriate stream
    const seed = pickWords(sel.stream, 1)[0]?.word ?? 'apple';
    setChain([seed.toLowerCase()]);
    setInput('');
    setFeedback('idle');
    setError(null);
    setPhase('playing');
    timer.reset(TURN_TIME_MS);
    window.setTimeout(() => {
      timer.start();
      inputRef.current?.focus();
    }, 80);
  }

  function submit() {
    if (feedback !== 'idle' || chain.length === 0) return;
    const last = chain[chain.length - 1]!;
    const requiredFirst = last[last.length - 1]!.toLowerCase();
    const guess = input.trim().toLowerCase();

    if (guess.length < 2) {
      setError('Word must be at least 2 letters.');
      setFeedback('wrong');
      window.setTimeout(() => {
        setFeedback('idle');
        setError(null);
      }, 1200);
      return;
    }
    if (!/^[a-zA-Z]+$/.test(guess)) {
      setError('Letters only please.');
      setFeedback('wrong');
      window.setTimeout(() => {
        setFeedback('idle');
        setError(null);
      }, 1200);
      return;
    }
    if (guess[0] !== requiredFirst) {
      setError(`Must start with "${requiredFirst.toUpperCase()}".`);
      setFeedback('wrong');
      window.setTimeout(() => {
        setFeedback('idle');
        setError(null);
      }, 1200);
      return;
    }
    if (chain.includes(guess)) {
      setError(`"${guess}" was already used.`);
      setFeedback('wrong');
      window.setTimeout(() => {
        setFeedback('idle');
        setError(null);
      }, 1200);
      return;
    }
    // Accepted
    setChain((prev) => [...prev, guess]);
    setInput('');
    setFeedback('idle');
    setError(null);
    chimeTick();
    timer.reset(TURN_TIME_MS);
    timer.start();
    inputRef.current?.focus();
  }

  function end() {
    timer.pause();
    chimeComplete();
    setPhase('gameover');
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') submit();
  }

  useEffect(() => {
    return () => {
      timer.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const last = chain[chain.length - 1] ?? '';
  const requiredLetter = last ? last[last.length - 1]!.toUpperCase() : '';
  const score = Math.max(0, chain.length - 1); // seed word doesn't count

  return (
    <GameShell
      title="Word Chain"
      description="Each new word must start with the last letter of the previous. No repeats. 12 seconds per turn."
    >
      {phase === 'setup' && (
        <SetupScreen storageKey="wordchain" showSubject={false} countOptions={[10]} onStart={start} />
      )}

      {phase === 'playing' && (
        <div className={styles.playing}>
          <div className={styles.header}>
            <span className={styles.chip}>Chain · {chain.length}</span>
            <span className={styles.chip}>Score · {score}</span>
            <span className={styles.chip} data-warning={timer.remainingMs < 3000}>
              {formatClock(timer.remainingMs, { showHours: 'never' })}
            </span>
          </div>

          <div className={styles.timeBar}>
            <div
              className={styles.timeBarFill}
              style={{ width: `${(timer.remainingMs / TURN_TIME_MS) * 100}%` }}
              data-warning={timer.remainingMs < 3000}
            />
          </div>

          <div className={styles.lastCard}>
            <span className={styles.lastLabel}>Last word</span>
            <span className={`font-display ${styles.lastWord}`}>{last}</span>
            <span className={styles.nextHint}>
              Next word starts with <strong>{requiredLetter}</strong>
            </span>
          </div>

          <div className={styles.inputRow} data-state={feedback}>
            <input
              ref={inputRef}
              type="text"
              className={styles.answer}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder={`Type a word starting with ${requiredLetter}…`}
              autoFocus
            />
            {feedback === 'wrong' && <XIcon size={20} className={styles.iconWrong} />}
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <div className={common.controlRow}>
            <button
              type="button"
              className={`${common.btn} ${common.btnPrimary}`}
              onClick={submit}
              disabled={input === ''}
            >
              <Link2 size={14} /> Submit
            </button>
            <button type="button" className={common.btn} onClick={end}>
              End chain
            </button>
          </div>

          {chain.length > 1 && (
            <div className={styles.chainStrip}>
              {chain.map((w, i) => (
                <span key={i} className={styles.chainItem} data-seed={i === 0}>
                  {w}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {phase === 'gameover' && (
        <div className={styles.gameover}>
          <Trophy size={36} className={styles.gameoverTrophy} />
          <p className="eyebrow">Chain ended</p>
          <span className={`font-display ${styles.gameoverNum}`}>{score}</span>
          <p className={styles.gameoverNote}>links in your chain</p>
          {chain.length > 1 && (
            <p className={styles.gameoverChain}>{chain.join(' → ')}</p>
          )}
          <button
            type="button"
            className={`${common.btn} ${common.btnPrimary}`}
            onClick={() => setPhase('setup')}
          >
            Try again
          </button>
        </div>
      )}
    </GameShell>
  );
}
