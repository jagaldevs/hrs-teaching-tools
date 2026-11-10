import { useEffect, useRef, useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, RotateCcw, Settings, Mic } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { usePersistedState } from '../../hooks/usePersistedState';
import common from '../common.module.css';
import styles from './SpellingTest.module.css';

type Phase = 'setup' | 'running' | 'done';

/**
 * speechSynthesis voices load asynchronously. We listen to `voiceschanged`
 * and keep an up-to-date list. Filter to English voices to keep the picker
 * useful for primary-school spelling.
 */
function useVoices(): SpeechSynthesisVoice[] {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    function refresh() {
      setVoices(window.speechSynthesis.getVoices().filter((v) => v.lang.startsWith('en')));
    }
    refresh();
    window.speechSynthesis.addEventListener('voiceschanged', refresh);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', refresh);
  }, []);
  return voices;
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
  const [voiceURI, setVoiceURI] = usePersistedState<string | null>('spelling.voice', null);
  const [phase, setPhase] = useState<Phase>('setup');
  const [idx, setIdx] = useState(0);
  const [running, setRunning] = useState(false);
  const [tick, setTick] = useState(intervalSec);
  const timerRef = useRef<number | null>(null);

  const voices = useVoices();
  const selectedVoice = voices.find((v) => v.voiceURI === voiceURI) ?? null;

  const words = list
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean);

  function speak(text: string, rate = 0.85) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = rate;
    u.pitch = 1;
    if (selectedVoice) {
      u.voice = selectedVoice;
      u.lang = selectedVoice.lang;
    } else {
      u.lang = 'en-AU';
    }
    window.speechSynthesis.speak(u);
  }

  function speakLetters(text: string) {
    speak(text.split('').join('  '), 0.7);
  }

  function previewVoice() {
    speak('Hello — this is how this voice sounds.');
  }

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

  // Auto-advance ticker. The interval only counts down; moving to the next
  // word happens in the effect below. (Calling nextWord() inside the setTick
  // updater ran it twice under StrictMode and skipped words.)
  useEffect(() => {
    if (!running || phase !== 'running') return;
    timerRef.current = window.setInterval(() => {
      setTick((t) => t - 1);
    }, 1000);
    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, phase, idx, intervalSec]);

  useEffect(() => {
    if (running && phase === 'running' && tick <= 0) nextWord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);

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

          <div className={styles.optionsRow}>
            <div className={styles.optionField}>
              <p className={common.labelText}>Seconds between words</p>
              <input
                type="number"
                min={5}
                max={60}
                value={intervalSec}
                onChange={(e) =>
                  setIntervalSec(Math.max(5, Math.min(60, Number(e.target.value) || 12)))
                }
                className={common.numericInput}
              />
            </div>

            <div className={styles.optionField}>
              <p className={common.labelText}>
                <Mic size={12} style={{ verticalAlign: '-2px', marginRight: 4 }} />
                Voice
              </p>
              <div className={styles.voicePickerRow}>
                <select
                  className={styles.voiceSelect}
                  value={voiceURI ?? ''}
                  onChange={(e) => setVoiceURI(e.target.value || null)}
                >
                  <option value="">System default</option>
                  {voices.map((v) => (
                    <option key={v.voiceURI} value={v.voiceURI}>
                      {v.name} — {v.lang}
                      {v.default ? ' (default)' : ''}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className={`${common.btn} ${styles.previewBtn}`}
                  onClick={previewVoice}
                  disabled={!ttsAvailable}
                  title="Preview voice"
                >
                  <Volume2 size={14} /> Preview
                </button>
              </div>
              {voices.length === 0 && ttsAvailable && (
                <p className={styles.voiceHint}>
                  Loading available voices… (may take a moment after page load)
                </p>
              )}
              {voices.length > 0 && (
                <p className={styles.voiceHint}>
                  {voices.length} English {voices.length === 1 ? 'voice' : 'voices'} available on
                  this device.
                </p>
              )}
            </div>
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
            <span className={common.labelText}>
              Word {idx + 1} of {words.length}
            </span>
            <span className={styles.tick}>{tick}s</span>
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${((idx + 1) / words.length) * 100}%` }}
            />
          </div>

          <div className={styles.card}>
            <p className={common.labelText}>Now reading</p>
            <span className={`font-display ${styles.placeholder}`}>● ● ● ● ●</span>
            <p className={styles.hint}>Word hidden — only audio plays.</p>
            {selectedVoice && (
              <p className={styles.voiceTag}>
                <Mic size={12} /> {selectedVoice.name}
              </p>
            )}
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
