import { useEffect, useState } from 'react';
import { Check, RotateCcw, SkipForward, Volume2, Lightbulb } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { WORDS, pickWordsFiltered, type WordEntry } from '../../data/banks/words';
import { shuffle } from '../rng/util';
import { usePersistedState } from '../../hooks/usePersistedState';
import type { Stream } from '../../data/games';
import { SUBJECTS, type Subject } from '../../games/types';
import common from '../common.module.css';
import styles from './WordBuilder.module.css';

interface Tile {
  id: string;
  letter: string;
}

interface Slot {
  tile: Tile | null;
}

function makeTiles(word: string): Tile[] {
  return shuffle(
    word
      .toLowerCase()
      .split('')
      .map((ch, i) => ({ id: `${ch}-${i}`, letter: ch })),
  );
}

function speakWord(word: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(word);
  u.rate = 0.9;
  u.lang = 'en-AU';
  window.speechSynthesis.speak(u);
}

function speakStretched(word: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(word.split('').join(' '));
  u.rate = 0.55;
  u.lang = 'en-AU';
  window.speechSynthesis.speak(u);
}

const STREAMS: { id: Stream; label: string }[] = [
  { id: 'lower_primary', label: 'Lower Primary' },
  { id: 'upper_primary', label: 'Upper Primary' },
  { id: 'middle_school', label: 'Middle School' },
  { id: 'senior_school', label: 'Senior School' },
];

function pickPool(stream: Stream, subjects: Subject[]): WordEntry[] {
  if (subjects.length === 0) {
    // No filter → use the full bank for this stream
    return shuffle(WORDS[stream] ?? []);
  }
  // Filter → pull the whole filtered set (large count) and shuffle
  return shuffle(pickWordsFiltered(stream, subjects, 999));
}

export function WordBuilder() {
  const [stream, setStream] = usePersistedState<Stream>('wbuild.stream', 'lower_primary');
  const [subjects, setSubjects] = usePersistedState<Subject[]>('wbuild.subjects', []);
  const [pool, setPool] = useState<WordEntry[]>(() => pickPool(stream, subjects));
  const [idx, setIdx] = useState(0);
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [solved, setSolved] = useState(false);

  const current = pool[idx];

  // Build tray + slots whenever the current word changes
  useEffect(() => {
    if (!current) return;
    const word = current.word.toLowerCase();
    setTiles(makeTiles(word));
    setSlots(Array.from({ length: word.length }, () => ({ tile: null })));
    setSolved(false);
    setShowHint(false);
  }, [current?.word]);

  // Re-shuffle pool when stream or subject filter changes
  useEffect(() => {
    setPool(pickPool(stream, subjects));
    setIdx(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stream, subjects.join('|')]);

  function toggleSubject(s: Subject) {
    setSubjects((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  }

  function placeTile(tile: Tile) {
    if (solved) return;
    const firstEmpty = slots.findIndex((s) => s.tile == null);
    if (firstEmpty === -1) return;
    setSlots((prev) =>
      prev.map((s, i) => (i === firstEmpty ? { tile } : s)),
    );
    setTiles((prev) => prev.filter((t) => t.id !== tile.id));
  }

  function removeTile(slotIdx: number) {
    if (solved) return;
    const slot = slots[slotIdx];
    if (!slot || !slot.tile) return;
    setTiles((prev) => [...prev, slot.tile!]);
    setSlots((prev) => prev.map((s, i) => (i === slotIdx ? { tile: null } : s)));
  }

  function clearSlots() {
    if (solved) return;
    const placed = slots.map((s) => s.tile).filter((t): t is Tile => t != null);
    setTiles((prev) => shuffle([...prev, ...placed]));
    setSlots((prev) => prev.map(() => ({ tile: null })));
  }

  function check() {
    if (!current) return;
    const built = slots.map((s) => s.tile?.letter ?? '').join('');
    if (built === current.word.toLowerCase()) {
      setSolved(true);
      speakWord(current.word);
    }
  }

  function nextWord() {
    if (idx + 1 >= pool.length) {
      // Re-shuffle and start over
      setPool(shuffle(WORDS[stream]));
      setIdx(0);
    } else {
      setIdx((i) => i + 1);
    }
  }

  // Auto-check when all slots are filled
  useEffect(() => {
    if (!current) return;
    if (slots.length === 0) return;
    if (slots.every((s) => s.tile != null)) {
      check();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slots]);

  return (
    <ToolShell
      eyebrow="Literacy"
      title="Word Builder"
      description="Drag-free word building. Click letters to fill the slots. Auto-checks when all slots are full."
      actions={
        current ? (
          <>
            <button
              type="button"
              className={common.btn}
              onClick={() => speakWord(current.word)}
              aria-label="Hear word"
            >
              <Volume2 size={14} /> Hear
            </button>
            <button
              type="button"
              className={common.btn}
              onClick={() => speakStretched(current.word)}
            >
              Stretch
            </button>
          </>
        ) : null
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

      <div className={styles.subjectRow} aria-label="Filter by subject">
        <span className={styles.subjectLabel}>Subject</span>
        {SUBJECTS.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`${common.btn} ${styles.subjectChip}`}
            data-active={subjects.includes(s.id)}
            onClick={() => toggleSubject(s.id)}
          >
            {s.label}
          </button>
        ))}
        {subjects.length > 0 && (
          <button
            type="button"
            className={styles.subjectClear}
            onClick={() => setSubjects([])}
          >
            Clear
          </button>
        )}
      </div>

      {!current ? (
        <p className={styles.emptyNote}>
          No words match the current subject filter for this stream. Try clearing the
          filter or switching streams.
        </p>
      ) : (
        <>

      {current.hint && (
        <div className={styles.hintRow}>
          {showHint ? (
            <button
              type="button"
              className={styles.hintRevealed}
              onClick={() => setShowHint(false)}
              aria-label="Hide meaning"
              title="Tap to hide"
            >
              <Lightbulb size={16} />
              <span className={`font-display ${styles.hintText}`}>{current.hint}</span>
            </button>
          ) : (
            <button
              type="button"
              className={styles.hintToggle}
              onClick={() => setShowHint(true)}
            >
              <Lightbulb size={16} /> Show meaning
            </button>
          )}
        </div>
      )}

      <div className={styles.slotRow} data-solved={solved}>
        {slots.map((s, i) => (
          <button
            key={i}
            type="button"
            className={styles.slot}
            data-filled={s.tile != null}
            onClick={() => removeTile(i)}
            aria-label={s.tile ? `Remove ${s.tile.letter}` : 'Empty slot'}
          >
            {s.tile?.letter ?? ''}
          </button>
        ))}
        {solved && <Check size={26} className={styles.solvedIcon} />}
      </div>

      <div className={styles.tray}>
        {tiles.map((t) => (
          <button
            key={t.id}
            type="button"
            className={styles.tile}
            onClick={() => placeTile(t)}
            disabled={solved}
          >
            {t.letter}
          </button>
        ))}
      </div>

      <div className={common.controlRow}>
        <button type="button" className={common.btn} onClick={clearSlots} disabled={solved}>
          <RotateCcw size={14} /> Clear
        </button>
        <button
          type="button"
          className={`${common.btn} ${common.btnPrimary}`}
          onClick={nextWord}
        >
          <SkipForward size={14} /> {solved ? 'Next word' : 'Skip word'}
        </button>
      </div>
        </>
      )}
    </ToolShell>
  );
}
