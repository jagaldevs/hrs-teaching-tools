import { useEffect, useRef, useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, RotateCcw, Settings } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { usePersistedState } from '../../hooks/usePersistedState';
import common from '../common.module.css';
import styles from './SpellingTest.module.css';

type Phase = 'setup' | 'running' | 'done';

function speak(text: string, rate = 0.85) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = rate;
  u.pitch = 1;
  u.lang = 'en-AU';
  window.speechSynthesis.speak(u);
}

function speakLetters(text: string) {
  speak(text.split('').join('  '), 0.7);
}

const DEFAULT_LIST = `because
beautiful
every
laugh
people
their
through
together
weather
write`;

export function SpellingTest() {
  const [list, setList] = usePersistedState<string>('spelling.list', DEFAULT_LIST);
  const [intervalSec, setIntervalSec] = usePersistedState<number>('spelling.interval', 12);
  const [phase, setPhase] = useState<Phase>('setup');
  const [idx, setIdx] = useState(0);
  const [running, setRunning] = useState(false);
  const [tick, setTick] = useState(intervalSec);
  const timerRef = useRef<number | null>(null);

  const words = list
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean);

  function clearTimer() {
    if (timerRef.current != null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  function start() {
    if (words.length === 0) return;
    setPhase('running');
    setIdx(0);
    setTick(intervalSec);
    setRunning(true);
    window.setTimeout(() => speak(words[0]!), 200);
  }

  function pause() {
    setRunning(false);
    clearTimer();
    window.speechSynthesis?.cancel();
  }

  function resume() {
    setRunning(true);
    speak(words[idx]!);
  }

  function nextWord() {
    if (idx + 1 >= words.length) {
      setPhase('done');
      setRunning(false);
      clearTimer();
      window.speechSynthesis?.cancel();
      return;
    }
    setIdx((i) => i + 1);
    setTick(intervalSec);
    speak(words[idx + 1]!);
  }

  function prevWord() {
    if (idx === 0) return;
    setIdx((i) => i - 1);
    setTick(intervalSec);
    speak(words[idx - 1]!);
  }

  function repeat() {
    speak(words[idx]!);
    setTick(intervalSec);
  }

  function spellOut() {
    speakLetters(words[idx]!);
  }

  function resetAll() {
    clearTimer();
    setPhase('setup');
    setIdx(0);
    setTick(intervalSec);
    setRunning(false);
    window.speechSynthesis?.cancel();
  }

  // Auto-advance ticker
  useEffect(() => {
    if (!running || phase !== 'running') return;
    timerRef.current = window.setInterval(() => {
      setTick((t) => {
        if (t <= 1) {
          // advance
          nextWord();
          return intervalSec;
        }
        return t - 1;
      });
    }, 1000);
    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, phase, idx, intervalSec]);

  useEffect(() => {
    return () => {
      clearTimer();
      window.speechSynthesis?.cancel();
    };
  }, []);

  const ttsAvailable = typeof window !== 'undefined' && !!window.speechSynthesis;

  return (
    <ToolShell
      eyebrow="Literacy"
      title="Spelling Test Runner"
      description="Reads each word aloud at a set pace. Students write or type their answers."
      actions={
        phase !== 'setup' ? (
          <button type="button" className={common.btn} onClick={resetAll}>
            <Settings size={14} /> Edit list
          </button>
        ) : null
      }
    >
      {!ttsAvailable && (
        <div className={styles.warning}>
          Your browser doesn’t support speech synthesis. Try Chrome, Edge or Safari.
        </div>
      )}

      {phase === 'setup' && (
        <section className={styles.setup}>
          <div className={styles.field}>
            <p className={common.labelText}>Word list · one per line</p>
            <textarea
              className={styles.textarea}
              value={list}
              onChange={(e) => setList(e.target.value)}
              rows={10}
              placeholder={DEFAULT_LIST}
            />
            <p className={styles.count}>{words.length} words</p>
          </div>

          <div className={styles.intervalField}>
            <p className={common.labelText}>Seconds between words</p>
            <input
              type="number"
              min={5}
              max={60}
              value={intervalSec}
              onChange={(e) => setIntervalSec(Math.max(5, Math.min(60, Number(e.target.value) || 12)))}
              className={common.numericInput}
            />
          </div>

          <button
            type="button"
            className={`${common.btn} ${common.btnPrimary} ${styles.startBtn}`}
            onClick={start}
            disabled={words.length === 0}
          >
            <Play size={14} /> Start test
          </button>
        </section>
      )}

      {phase === 'running' && (
        <section className={styles.running}>
          <div className={styles.progressRow}>
            <span className={common.labelText}>Word {idx + 1} of {words.length}</span>
            <span className={styles.tick}>{tick}s</span>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${((idx + 1) / words.length) * 100}%` }} />
          </div>

          <div className={styles.card}>
            <p className={common.labelText}>Now reading</p>
            <span className={`font-display ${styles.placeholder}`}>● ● ● ● ●</span>
            <p className={styles.hint}>Word hidden — only audio plays.</p>
          </div>

          <div className={common.controlRow}>
            <button type="button" className={common.btn} onClick={prevWord} disabled={idx === 0}>
              <SkipBack size={14} /> Previous
            </button>
            {running ? (
              <button type="button" className={common.btn} onClick={pause}>
                <Pause size={14} /> Pause
              </button>
            ) : (
              <button type="button" className={`${common.btn} ${common.btnPrimary}`} onClick={resume}>
                <Play size={14} /> Resume
              </button>
            )}
            <button type="button" className={`${common.btn} ${common.btnPrimary}`} onClick={repeat}>
              <Volume2 size={14} /> Repeat
            </button>
            <button type="button" className={common.btn} onClick={spellOut}>
              Spell slowly
            </button>
            <button type="button" className={common.btn} onClick={nextWord}>
              <SkipForward size={14} /> Next
            </button>
          </div>
        </section>
      )}

      {phase === 'done' && (
        <section className={styles.done}>
          <p className="eyebrow">Test complete</p>
          <h2 className={`font-display ${styles.doneTitle}`}>All {words.length} words read.</h2>

          <details className={styles.answerKey}>
            <summary>Show answer key</summary>
            <ol className={styles.answerList}>
              {words.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ol>
          </details>

          <div className={common.controlRow}>
            <button type="button" className={`${common.btn} ${common.btnPrimary}`} onClick={start}>
              <RotateCcw size={14} /> Run again
            </button>
            <button type="button" className={common.btn} onClick={resetAll}>
              <Settings size={14} /> Edit list
            </button>
          </div>
        </section>
      )}
    </ToolShell>
  );
}
