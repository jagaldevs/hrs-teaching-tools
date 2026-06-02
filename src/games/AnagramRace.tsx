import { useEffect, useRef, useState } from 'react';
import { Check, X as XIcon, SkipForward, Lightbulb, Trophy } from 'lucide-react';
import { GameShell, SetupScreen, type SetupSelections } from './GameShell';
import { pickWords, type WordEntry } from '../data/banks/words';
import { shuffle } from '../tools/rng/util';
import { useTimer, formatClock } from '../tools/useTimer';
import { chimeTick, chimeComplete } from '../tools/chime';
import common from '../tools/common.module.css';
import styles from './AnagramRace.module.css';

type Phase = 'setup' | 'playing' | 'result';

const ROUND_TIME_MS = 60_000;

function scramble(word: string): string {
  // Ensure the scrambled version doesn't equal the original
  let s = shuffle(word.split('')).join('');
  let tries = 0;
  while (s === word && tries < 8) {
    s = shuffle(word.split('')).join('');
    tries++;
  }
  return s;
}

interface Round {
  words: WordEntry[];
  scrambled: string[];
}

interface SolveResult {
  word: string;
  solved: boolean;
  skipped: boolean;
  hintUsed: boolean;
}

export function AnagramRace() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [round, setRound] = useState<Round | null>(null);
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<'idle' | 'right' | 'wrong'>('idle');
  const [hintShown, setHintShown] = useState(false);
  const [results, setResults] = useState<SolveResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const timer = useTimer({
    durationMs: ROUND_TIME_MS,
    mode: 'down',
    onComplete: () => {
      // Time's up
      chimeComplete();
      setPhase('result');
    },
  });

  function start(sel: SetupSelections) {
    const words = pickWords(sel.stream, Math.max(20, sel.count + 5));
    setRound({ words, scrambled: words.map((w) => scramble(w.word)) });
    setIdx(0);
    setInput('');
    setFeedback('idle');
    setHintShown(false);
    setResults([]);
    timer.reset(ROUND_TIME_MS);
    setPhase('playing');
    window.setTimeout(() => {
      timer.start();
      inputRef.current?.focus();
    }, 80);
  }

  function submit() {
    if (!round || feedback !== 'idle') return;
    const guess = input.trim().toLowerCase();
    const target = round.words[idx]!.word.toLowerCase();
    if (guess === target) {
      setFeedback('right');
      chimeTick();
      setResults((prev) => [
        ...prev,
        { word: target, solved: true, skipped: false, hintUsed: hintShown },
      ]);
      window.setTimeout(advance, 500);
    } else {
      setFeedback('wrong');
      window.setTimeout(() => setFeedback('idle'), 600);
    }
  }

  function skip() {
    if (!round || feedback !== 'idle') return;
    setResults((prev) => [
      ...prev,
      { word: round.words[idx]!.word, solved: false, skipped: true, hintUsed: hintShown },
    ]);
    advance();
  }

  function advance() {
    if (!round) return;
    if (idx + 1 >= round.words.length) {
      timer.pause();
      setPhase('result');
      return;
    }
    setIdx((i) => i + 1);
    setInput('');
    setFeedback('idle');
    setHintShown(false);
    window.setTimeout(() => inputRef.current?.focus(), 30);
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

  const solved = results.filter((r) => r.solved).length;
  const skipped = results.filter((r) => r.skipped).length;
  const pureSolved = results.filter((r) => r.solved && !r.hintUsed).length;
  const score = pureSolved + Math.floor((solved - pureSolved) * 0.5);

  const current = round?.words[idx];
  const scrambledCurrent = round?.scrambled[idx];

  return (
    <GameShell
      title="Anagram Race"
      description="Unscramble as many words as you can in 60 seconds. Hints cost half a point."
    >
      {phase === 'setup' && (
        <SetupScreen
          gameId="anagram-race"
          storageKey="anagram"
          showSubject={false}
          countOptions={[10, 15, 20]}
          onStart={start}
        />
      )}

      {phase === 'playing' && current && scrambledCurrent && (
        <div className={styles.playing}>
          <div className={styles.header}>
            <span className={styles.chip}>Word {idx + 1}</span>
            <span className={styles.chip}>Solved · {solved}</span>
            <span className={styles.chip} data-warning={timer.remainingMs < 10000}>
              {formatClock(timer.remainingMs, { showHours: 'never' })}
            </span>
          </div>

          <div className={styles.timeBar}>
            <div
              className={styles.timeBarFill}
              style={{ width: `${(timer.remainingMs / ROUND_TIME_MS) * 100}%` }}
              data-warning={timer.remainingMs < 10000}
            />
          </div>

          <div className={styles.scrambleCard} data-state={feedback}>
            <p className={styles.scrambleLabel}>Unscramble</p>
            <span className={`font-display ${styles.scramble}`}>
              {scrambledCurrent.toUpperCase().split('').join(' ')}
            </span>
            {hintShown && current.hint && (
              <span className={styles.hint}>
                <Lightbulb size={14} /> {current.hint}
              </span>
            )}
          </div>

          <div className={styles.inputRow}>
            <input
              ref={inputRef}
              type="text"
              className={styles.answer}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Your answer…"
              autoFocus
              disabled={feedback === 'right'}
            />
            {feedback === 'right' && <Check size={20} className={styles.iconRight} />}
            {feedback === 'wrong' && <XIcon size={20} className={styles.iconWrong} />}
          </div>

          <div className={common.controlRow}>
            <button
              type="button"
              className={`${common.btn} ${common.btnPrimary}`}
              onClick={submit}
              disabled={input === '' || feedback === 'right'}
            >
              Submit
            </button>
            {!hintShown && current.hint && (
              <button
                type="button"
                className={common.btn}
                onClick={() => setHintShown(true)}
              >
                <Lightbulb size={14} /> Hint (½ point)
              </button>
            )}
            <button type="button" className={common.btn} onClick={skip}>
              <SkipForward size={14} /> Skip
            </button>
          </div>
        </div>
      )}

      {phase === 'result' && (
        <div className={styles.result}>
          <Trophy size={36} className={styles.resultTrophy} />
          <p className="eyebrow">Time’s up</p>
          <span className={`font-display ${styles.resultNum}`}>{score}</span>
          <p className={styles.resultNote}>
            Solved {solved} · Skipped {skipped} · Hints used{' '}
            {results.filter((r) => r.hintUsed).length}
          </p>

          <ul className={styles.wordList}>
            {results.map((r, i) => (
              <li key={i} className={styles.wordItem} data-state={r.solved ? 'right' : 'wrong'}>
                {r.solved ? <Check size={14} /> : <XIcon size={14} />}
                <span className={styles.wordItemText}>{r.word}</span>
                {r.hintUsed && r.solved && <span className={styles.hintTag}>hint</span>}
              </li>
            ))}
          </ul>

          <button
            type="button"
            className={`${common.btn} ${common.btnPrimary}`}
            onClick={() => setPhase('setup')}
          >
            Play again
          </button>
        </div>
      )}
    </GameShell>
  );
}
