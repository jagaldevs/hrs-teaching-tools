import { useEffect, useState } from 'react';
import { Check, RotateCcw, SkipForward, Volume2 } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { SENTENCES } from '../../data/banks/sentences';
import { shuffle } from '../rng/util';
import { usePersistedState } from '../../hooks/usePersistedState';
import type { Stream } from '../../data/games';
import common from '../common.module.css';
import styles from './SentenceBuilder.module.css';

interface Token {
  id: string;
  text: string;
}

const STREAMS: { id: Stream; label: string }[] = [
  { id: 'lower_primary', label: 'Lower Primary' },
  { id: 'upper_primary', label: 'Upper Primary' },
  { id: 'middle_school', label: 'Middle School' },
  { id: 'senior_school', label: 'Senior School' },
];

function tokenise(sentence: string): Token[] {
  return sentence.split(/\s+/).map((word, i) => ({ id: `${word}-${i}`, text: word }));
}

function speak(text: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.9;
  u.lang = 'en-AU';
  window.speechSynthesis.speak(u);
}

export function SentenceBuilder() {
  const [stream, setStream] = usePersistedState<Stream>('sbuild.stream', 'lower_primary');
  const [pool, setPool] = useState<string[]>(() => shuffle(SENTENCES[stream]));
  const [idx, setIdx] = useState(0);
  const [tray, setTray] = useState<Token[]>([]);
  const [built, setBuilt] = useState<Token[]>([]);
  const [solved, setSolved] = useState(false);

  const targetSentence = pool[idx];
  const targetTokens = targetSentence ? tokenise(targetSentence) : [];

  useEffect(() => {
    if (!targetSentence) return;
    setTray(shuffle(tokenise(targetSentence)));
    setBuilt([]);
    setSolved(false);
  }, [targetSentence]);

  useEffect(() => {
    setPool(shuffle(SENTENCES[stream]));
    setIdx(0);
  }, [stream]);

  function placeWord(t: Token) {
    if (solved) return;
    setTray((prev) => prev.filter((p) => p.id !== t.id));
    setBuilt((prev) => [...prev, t]);
  }

  function removeWord(t: Token) {
    if (solved) return;
    setBuilt((prev) => prev.filter((p) => p.id !== t.id));
    setTray((prev) => [...prev, t]);
  }

  function clearBuilt() {
    if (solved) return;
    setTray((prev) => shuffle([...prev, ...built]));
    setBuilt([]);
  }

  function check() {
    const builtText = built.map((t) => t.text).join(' ');
    if (builtText === targetSentence) {
      setSolved(true);
      speak(targetSentence!);
    }
  }

  function nextSentence() {
    if (idx + 1 >= pool.length) {
      setPool(shuffle(SENTENCES[stream]));
      setIdx(0);
    } else {
      setIdx((i) => i + 1);
    }
  }

  // Auto-check when all words are placed
  useEffect(() => {
    if (!targetSentence) return;
    if (built.length > 0 && built.length === targetTokens.length) {
      check();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [built]);

  if (!targetSentence) {
    return (
      <ToolShell title="Sentence Builder" eyebrow="Literacy" description="">
        <p>No sentences available for this stream.</p>
      </ToolShell>
    );
  }

  return (
    <ToolShell
      eyebrow="Literacy"
      title="Sentence Builder"
      description="Drag-free sentence construction. Click word cards in order. Auto-checks when complete."
      actions={
        solved && (
          <button
            type="button"
            className={common.btn}
            onClick={() => speak(targetSentence)}
          >
            <Volume2 size={14} /> Hear sentence
          </button>
        )
      }
    >
      <div className={styles.streamRow}>
        {STREAMS.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`${common.btn} ${styles.streamBtn}`}
            data-active={stream === s.id}
            onClick={() => setStream(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className={styles.builtArea} data-solved={solved}>
        {built.length === 0 ? (
          <p className={styles.builtPlaceholder}>
            Tap word cards below to build the sentence here.
          </p>
        ) : (
          built.map((t) => (
            <button
              key={t.id}
              type="button"
              className={styles.builtWord}
              onClick={() => removeWord(t)}
              disabled={solved}
            >
              {t.text}
            </button>
          ))
        )}
        {solved && <Check size={26} className={styles.solvedIcon} />}
      </div>

      <div className={styles.tray}>
        {tray.length === 0 ? (
          <p className={styles.trayPlaceholder}>All words placed.</p>
        ) : (
          tray.map((t) => (
            <button
              key={t.id}
              type="button"
              className={styles.trayWord}
              onClick={() => placeWord(t)}
            >
              {t.text}
            </button>
          ))
        )}
      </div>

      <div className={common.controlRow}>
        <button type="button" className={common.btn} onClick={clearBuilt} disabled={solved || built.length === 0}>
          <RotateCcw size={14} /> Clear
        </button>
        <button
          type="button"
          className={`${common.btn} ${common.btnPrimary}`}
          onClick={nextSentence}
        >
          <SkipForward size={14} /> {solved ? 'Next sentence' : 'Skip sentence'}
        </button>
      </div>
    </ToolShell>
  );
}
