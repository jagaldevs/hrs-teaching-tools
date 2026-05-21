import { useEffect, useRef, useState } from 'react';
import { Check, X as XIcon, Volume2, ChevronRight, SkipForward, Lightbulb } from 'lucide-react';
import { GameShell, SetupScreen, type SetupSelections } from './GameShell';
import { ResultScreen } from './ResultScreen';
import { pickWords, type WordEntry } from '../data/banks/words';
import { chimeTick } from '../tools/chime';
import common from '../tools/common.module.css';
import styles from './SpellingBee.module.css';

type Phase = 'setup' | 'playing' | 'result';

interface Round {
  words: WordEntry[];
}

interface SpellResult {
  word: string;
  solved: boolean;
  hintUsed: boolean;
}

/** Speak a word aloud using the browser's Web Speech API. */
function speak(text: string, rate = 0.9) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = rate;
  u.pitch = 1;
  u.lang = 'en-AU';
  window.speechSynthesis.speak(u);
}

export function SpellingBee() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [setup, setSetup] = useState<SetupSelections | null>(null);
  const [round, setRound] = useState<Round | null>(null);
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<'idle' | 'right' | 'wrong'>('idle');
  const [revealed, setRevealed] = useState(false);
  const [results, setResults] = useState<SpellResult[]>([]);
  const [ttsAvailable, setTtsAvailable] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTtsAvailable(typeof window !== 'undefined' && !!window.speechSynthesis);
  }, []);

  function start(sel: SetupSelections) {
    const words = pickWords(sel.stream, sel.count);
    setSetup(sel);
    setRound({ words });
    setIdx(0);
    setInput('');
    setFeedback('idle');
    setRevealed(false);
    setResults([]);
    setPhase('playing');
    window.setTimeout(() => {
      inputRef.current?.focus();
      if (words[0]) speak(words[0].word);
    }, 200);
  }

  function submit() {
    if (!round || feedback !== 'idle' || revealed) return;
    const target = round.words[idx]!.word.toLowerCase();
    const guess = input.trim().toLowerCase();
    if (guess === target) {
      setFeedback('right');
      chimeTick();
      setResults((prev) => [
        ...prev,
        { word: target, solved: true, hintUsed: revealed },
      ]);
      window.setTimeout(advance, 700);
    } else {
      setFeedback('wrong');
      window.setTimeout(() => setFeedback('idle'), 500);
    }
  }

  function reveal() {
    if (!round) return;
    setRevealed(true);
    setResults((prev) => [
      ...prev,
      { word: round.words[idx]!.word, solved: false, hintUsed: true },
    ]);
  }

  function skip() {
    if (!round) return;
    setResults((prev) => [
      ...prev,
      { word: round.words[idx]!.word, solved: false, hintUsed: revealed },
    ]);
    advance();
  }

  function advance() {
    if (!round) return;
    if (idx + 1 >= round.words.length) {
      setPhase('result');
      window.speechSynthesis?.cancel();
      return;
    }
    setIdx((i) => i + 1);
    setInput('');
    setFeedback('idle');
    setRevealed(false);
    window.setTimeout(() => {
      inputRef.current?.focus();
      if (round.words[idx + 1]) speak(round.words[idx + 1]!.word);
    }, 150);
  }

  function repeat() {
    if (!round) return;
    speak(round.words[idx]!.word);
  }

  function spellSlowly() {
    if (!round) return;
    // Speak each letter
    speak(round.words[idx]!.word.split('').join(' '), 0.7);
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') submit();
  }

  const current = round?.words[idx];

  return (
    <GameShell
      title="Spelling Bee"
      description="Listen to each word, then type how it's spelled. The browser reads it aloud."
    >
      {phase === 'setup' && (
        <>
          {!ttsAvailable && (
            <div className={styles.warning}>
              Your browser doesn’t support speech synthesis. Try Chrome, Edge or Safari for the
              full experience.
            </div>
          )}
          <SetupScreen storageKey="spelling" showSubject={false} onStart={start} />
        </>
      )}

      {phase === 'playing' && current && (
        <div className={styles.playing}>
          <div className={styles.header}>
            <span className={styles.chip}>
              Word {idx + 1} / {round!.words.length}
            </span>
            <span className={styles.chip}>
              Solved · {results.filter((r) => r.solved).length}
            </span>
          </div>

          <div className={styles.card} data-state={feedback}>
            {!revealed ? (
              <>
                <p className={styles.label}>Listen carefully</p>
                <div className={styles.speakerRow}>
                  <button
                    type="button"
                    className={`${common.btn} ${common.btnPrimary} ${styles.speakerBtn}`}
                    onClick={repeat}
                    aria-label="Repeat word"
                  >
                    <Volume2 size={22} />
                    Repeat
                  </button>
                  <button
                    type="button"
                    className={`${common.btn} ${styles.speakerBtn}`}
                    onClick={spellSlowly}
                  >
                    Spell slowly
                  </button>
                </div>
                {current.hint && (
                  <p className={styles.hint}>
                    <em>{current.hint}</em>
                  </p>
                )}
              </>
            ) : (
              <>
                <p className={styles.label}>The word was</p>
                <span className={`font-display ${styles.revealed}`}>{current.word}</span>
                {current.hint && <p className={styles.hint}><em>{current.hint}</em></p>}
              </>
            )}
          </div>

          <div className={styles.inputRow} data-state={feedback}>
            <input
              ref={inputRef}
              type="text"
              className={styles.answer}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Type the spelling…"
              autoFocus
              disabled={revealed}
            />
            {feedback === 'right' && <Check size={20} className={styles.iconRight} />}
            {feedback === 'wrong' && <XIcon size={20} className={styles.iconWrong} />}
          </div>

          <div className={common.controlRow}>
            {!revealed ? (
              <>
                <button
                  type="button"
                  className={`${common.btn} ${common.btnPrimary}`}
                  onClick={submit}
                  disabled={input === ''}
                >
                  Submit
                </button>
                <button type="button" className={common.btn} onClick={reveal}>
                  <Lightbulb size={14} /> Show answer
                </button>
                <button type="button" className={common.btn} onClick={skip}>
                  <SkipForward size={14} /> Skip
                </button>
              </>
            ) : (
              <button
                type="button"
                className={`${common.btn} ${common.btnPrimary}`}
                onClick={advance}
                autoFocus
              >
                Next word <ChevronRight size={14} />
              </button>
            )}
          </div>
        </div>
      )}

      {phase === 'result' && setup && (
        <ResultScreen
          score={results.filter((r) => r.solved).length}
          total={setup.count}
          onPlayAgain={() => setPhase('setup')}
          breakdown={[
            { label: 'Spelled correctly', value: results.filter((r) => r.solved).length },
            { label: 'Revealed / skipped', value: results.filter((r) => !r.solved).length },
          ]}
        />
      )}
    </GameShell>
  );
}
