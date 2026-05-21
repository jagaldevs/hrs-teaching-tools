import { useEffect, useRef, useState } from 'react';
import { Check, X as XIcon, Lightbulb, SkipForward } from 'lucide-react';
import { GameShell, SetupScreen, type SetupSelections } from './GameShell';
import { ResultScreen } from './ResultScreen';
import { pickWords, type WordEntry } from '../data/banks/words';
import { chimeTick } from '../tools/chime';
import common from '../tools/common.module.css';
import styles from './DefineIt.module.css';

type Phase = 'setup' | 'playing' | 'result';

interface Round {
  words: WordEntry[];
}

interface Result {
  word: string;
  solved: boolean;
  lettersRevealed: number;
}

export function DefineIt() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [setup, setSetup] = useState<SetupSelections | null>(null);
  const [round, setRound] = useState<Round | null>(null);
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<'idle' | 'right' | 'wrong'>('idle');
  const [lettersRevealed, setLettersRevealed] = useState(0);
  const [results, setResults] = useState<Result[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  function start(sel: SetupSelections) {
    // Only words with a definition can be used here
    const all = pickWords(sel.stream, sel.count * 3).filter((w) => w.hint);
    const slice = all.slice(0, sel.count);
    setSetup(sel);
    setRound({ words: slice });
    setIdx(0);
    setInput('');
    setFeedback('idle');
    setLettersRevealed(0);
    setResults([]);
    setPhase('playing');
    window.setTimeout(() => inputRef.current?.focus(), 30);
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
        { word: target, solved: true, lettersRevealed },
      ]);
      window.setTimeout(advance, 600);
    } else {
      setFeedback('wrong');
      window.setTimeout(() => setFeedback('idle'), 500);
    }
  }

  function revealLetter() {
    if (!round) return;
    const max = round.words[idx]!.word.length - 1;
    setLettersRevealed((n) => Math.min(max, n + 1));
  }

  function skip() {
    if (!round) return;
    setResults((prev) => [
      ...prev,
      { word: round.words[idx]!.word, solved: false, lettersRevealed },
    ]);
    advance();
  }

  function advance() {
    if (!round) return;
    if (idx + 1 >= round.words.length) {
      setPhase('result');
      return;
    }
    setIdx((i) => i + 1);
    setInput('');
    setFeedback('idle');
    setLettersRevealed(0);
    window.setTimeout(() => inputRef.current?.focus(), 30);
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') submit();
  }

  useEffect(() => {
    // initial focus
    inputRef.current?.focus();
  }, [phase]);

  const current = round?.words[idx];
  const score = results.reduce((s, r) => {
    if (!r.solved) return s;
    // Full point if no letters revealed, half if 1+, quarter if 3+
    if (r.lettersRevealed === 0) return s + 1;
    if (r.lettersRevealed <= 2) return s + 0.5;
    return s + 0.25;
  }, 0);

  return (
    <GameShell
      title="Define It"
      description="Guess the word from its definition. Reveal letters as hints — each one lowers your score."
    >
      {phase === 'setup' && <SetupScreen storageKey="defineit" showSubject={false} onStart={start} />}

      {phase === 'playing' && current && (
        <div className={styles.playing}>
          <div className={styles.header}>
            <span className={styles.chip}>
              Word {idx + 1} / {round!.words.length}
            </span>
            <span className={styles.chip}>Score · {score}</span>
            <span className={styles.chip}>
              {lettersRevealed > 0 ? `${lettersRevealed} letter${lettersRevealed > 1 ? 's' : ''} shown` : 'No hint'}
            </span>
          </div>

          <div className={styles.card} data-state={feedback}>
            <p className={styles.label}>Definition</p>
            <p className={`font-display ${styles.definition}`}>{current.hint}</p>

            {lettersRevealed > 0 && (
              <p className={styles.letters}>
                {current.word.split('').map((ch, i) => (
                  <span key={i} className={styles.letter} data-revealed={i < lettersRevealed}>
                    {i < lettersRevealed ? ch : '_'}
                  </span>
                ))}
              </p>
            )}

            <p className={styles.lengthHint}>
              <span>{current.word.length}</span> letters
            </p>
          </div>

          <div className={styles.inputRow}>
            <input
              ref={inputRef}
              type="text"
              className={styles.answer}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Your guess…"
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
            <button
              type="button"
              className={common.btn}
              onClick={revealLetter}
              disabled={feedback === 'right' || lettersRevealed >= current.word.length - 1}
            >
              <Lightbulb size={14} /> Reveal a letter
            </button>
            <button type="button" className={common.btn} onClick={skip} disabled={feedback === 'right'}>
              <SkipForward size={14} /> Skip
            </button>
          </div>
        </div>
      )}

      {phase === 'result' && setup && (
        <ResultScreen
          score={Math.round(score * 10) / 10}
          total={setup.count}
          onPlayAgain={() => setPhase('setup')}
          breakdown={[
            { label: 'Solved (no hint)', value: results.filter((r) => r.solved && r.lettersRevealed === 0).length },
            { label: 'Solved (with hint)', value: results.filter((r) => r.solved && r.lettersRevealed > 0).length },
            { label: 'Skipped', value: results.filter((r) => !r.solved).length },
          ]}
        />
      )}
    </GameShell>
  );
}
