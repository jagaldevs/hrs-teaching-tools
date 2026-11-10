import { useEffect, useMemo, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Check,
  X as XIcon,
  Shuffle,
  RotateCcw,
  Volume2,
  Info,
  Circle,
} from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { usePersistedState } from '../../hooks/usePersistedState';
import { shuffle } from '../rng/util';
import common from '../common.module.css';
import styles from './SightWords.module.css';

type ListId = 'magic100' | 'magic200' | 'magic300';

/**
 * Magic Words sight-word lists (Lyn Stone, "Reading for Life").
 * Each list is de-duplicated, and a word appears in only its first list
 * (the raw 300 list repeated "because" and "world" from the 200).
 */
const RAW_LISTS: Record<ListId, string[]> = {
  magic100: [
    'the', 'and', 'a', 'I', 'to', 'said', 'in', 'he', 'it', 'was',
    'of', 'for', 'is', 'you', 'his', 'on', 'they', 'with', 'be', 'as',
    'at', 'one', 'had', 'have', 'not', 'this', 'are', 'but', 'or', 'her',
    'all', 'we', 'an', 'when', 'up', 'can', 'so', 'out', 'do', 'were',
    'what', 'your', 'how', 'if', 'about', 'will', 'each', 'them', 'then',
    'she', 'many', 'would', 'into', 'has', 'more', 'two', 'like', 'him', 'see',
    'time', 'could', 'no', 'make', 'than', 'first', 'water', 'been', 'who', 'oil',
    'its', 'now', 'find', 'long', 'down', 'day', 'did', 'get', 'come', 'made',
    'may', 'part', 'over', 'new', 'sound', 'take', 'only', 'little', 'work', 'know',
    'place', 'years', 'live', 'me', 'back', 'give', 'most', 'very', 'after', 'thing',
  ],
  magic200: [
    'our', 'just', 'name', 'good', 'sentence', 'man', 'think', 'say', 'great', 'where',
    'help', 'through', 'much', 'before', 'line', 'right', 'too', 'mean', 'old', 'any',
    'same', 'tell', 'boy', 'follow', 'came', 'want', 'show', 'also', 'around', 'form',
    'three', 'small', 'set', 'put', 'end', 'why', 'again', 'turn', 'here', 'off',
    'went', 'number', 'large', 'must', 'big', 'even', 'such', 'because', 'asked',
    'house', 'world', 'going', 'school', 'important', 'until', 'eyes', 'face', 'far',
    'something', 'few', 'head', 'above', 'kind', 'began', 'almost', 'sometimes',
    'mountain', 'cut', 'young', 'talk', 'soon', 'list', 'song', 'leave', 'family',
    'body', 'music', 'colour', 'stand', 'sun', 'questions', 'fish', 'area', 'mark',
    'dog', 'horse', 'birds', 'problem', 'complete', 'room', 'knew', 'since', 'ever',
    'piece', 'told', 'usually', 'paper', 'often', 'together',
  ],
  magic300: [
    'group', 'although', 'plant', 'last', 'father', 'keep', 'tree', 'never', 'started',
    'city', 'earth', 'light', 'thought', 'under', 'story', 'saw', 'left', 'while', 'along',
    'might', 'close', 'seem', 'next', 'hard', 'open', 'example', 'beginning', 'life',
    'always', 'those', 'both', 'got', 'children', 'side', 'feet', 'car', 'mile', 'night',
    'walked', 'white', 'sea', 'grow', 'took', 'river', 'four', 'carry', 'state', 'once',
    'book', 'hear', 'stop', 'without', 'second', 'later', 'miss', 'idea', 'enough', 'eat',
    'watch', 'really', 'let', 'girl', 'being', 'beautiful', 'every', 'laugh', 'people',
    'their', 'because', 'high', 'change', 'world', 'better', 'box', 'animal', 'building',
    'land', 'simple', 'plain', 'usual', 'bring', 'half', 'rock', 'order', 'red', 'fire',
    'south', 'door', 'product', 'black', 'short', 'numeral', 'class', 'wind', 'question',
    'happen', 'minute', 'strong',
  ],
};

function dedupe(words: string[], earlier: string[][]): string[] {
  const taken = new Set(earlier.flat());
  return Array.from(new Set(words)).filter((w) => !taken.has(w));
}

const WORDS_100 = dedupe(RAW_LISTS.magic100, []);
const WORDS_200 = dedupe(RAW_LISTS.magic200, [WORDS_100]);
const WORDS_300 = dedupe(RAW_LISTS.magic300, [WORDS_100, WORDS_200]);

const LISTS: Record<ListId, { label: string; words: string[] }> = {
  magic100: { label: 'Magic 100', words: WORDS_100 },
  magic200: { label: 'Magic 200', words: WORDS_200 },
  magic300: { label: 'Magic 300', words: WORDS_300 },
};

function speakWord(word: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(word);
  u.rate = 0.9;
  u.lang = 'en-AU';
  window.speechSynthesis.speak(u);
}

interface Progress {
  known: string[];
  unknown: string[];
}

type Status = 'unseen' | 'known' | 'unknown';

export function SightWords() {
  const [listId, setListId] = usePersistedState<ListId>('sightwords.list', 'magic100');
  const [order, setOrder] = useState<string[]>(LISTS[listId].words);
  const [idx, setIdx] = useState(0);
  const [progress, setProgress] = usePersistedState<Progress>('sightwords.progress', {
    known: [],
    unknown: [],
  });
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    setOrder(LISTS[listId].words);
    setIdx(0);
  }, [listId]);

  const current = order[idx];

  const status: Status = useMemo(() => {
    if (!current) return 'unseen';
    if (progress.known.includes(current)) return 'known';
    if (progress.unknown.includes(current)) return 'unknown';
    return 'unseen';
  }, [current, progress]);

  function go(delta: number) {
    setIdx((i) => Math.max(0, Math.min(order.length - 1, i + delta)));
  }

  function markKnown() {
    if (!current) return;
    setProgress((p) => ({
      known: [...new Set([...p.known, current])],
      unknown: p.unknown.filter((w) => w !== current),
    }));
    if (idx < order.length - 1) go(1);
  }

  function markUnknown() {
    if (!current) return;
    setProgress((p) => ({
      known: p.known.filter((w) => w !== current),
      unknown: [...new Set([...p.unknown, current])],
    }));
    if (idx < order.length - 1) go(1);
  }

  function reshuffle() {
    setOrder(shuffle(LISTS[listId].words));
    setIdx(0);
  }

  function resetProgress() {
    if (window.confirm('Clear all known/practice marks across all three lists?')) {
      setProgress({ known: [], unknown: [] });
    }
  }

  const totalKnownInList = order.filter((w) => progress.known.includes(w)).length;
  const totalPracticeInList = order.filter((w) => progress.unknown.includes(w)).length;
  const pct = order.length > 0 ? (totalKnownInList / order.length) * 100 : 0;

  return (
    <ToolShell
      eyebrow="Literacy"
      title="Sight Word Flashcards"
      description="Display sight words one at a time. Mark each as known or needs more practice."
      actions={
        <>
          <button type="button" className={common.btn} onClick={reshuffle}>
            <Shuffle size={14} /> Shuffle
          </button>
          <button type="button" className={common.btn} onClick={resetProgress}>
            <RotateCcw size={14} /> Reset progress
          </button>
        </>
      }
    >
      {/* List picker with info toggle */}
      <div className={styles.listPicker}>
        {(Object.keys(LISTS) as ListId[]).map((id) => (
          <button
            key={id}
            type="button"
            className={`${common.btn} ${styles.listBtn}`}
            data-active={listId === id}
            onClick={() => setListId(id)}
          >
            {LISTS[id].label}
          </button>
        ))}
        <button
          type="button"
          className={`${common.btn} ${styles.infoBtn}`}
          onClick={() => setShowInfo((s) => !s)}
          aria-expanded={showInfo}
        >
          <Info size={14} /> {showInfo ? 'Hide info' : "What's this?"}
        </button>
      </div>

      {showInfo && (
        <aside className={styles.infoCard}>
          <h3 className={`font-display ${styles.infoTitle}`}>About the Magic Words</h3>
          <p>
            The <strong>Magic 100, 200, and 300</strong> are the most common words children
            encounter in early reading material — approximately 50%, 65%, and 75% of all words
            on the page, respectively.
          </p>
          <p>
            They are taught as <em>sight words</em> — recognised instantly rather than sounded
            out letter-by-letter. Mastering all three lists is a key milestone in early
            literacy and a strong predictor of fluent reading.
          </p>
          <p className={styles.infoSource}>
            Lists compiled from Lyn Stone&rsquo;s <em>Reading for Life</em> programme.
          </p>
        </aside>
      )}

      {/* Progress strip — clear, scannable */}
      <div className={styles.progressStrip}>
        <span className={styles.progressLabel}>
          Word {idx + 1} of {order.length}
        </span>
        <div className={styles.progressBarWrap}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${pct}%` }} />
          </div>
          <span className={styles.progressPct}>{Math.round(pct)}% known</span>
        </div>
        <span className={styles.progressChip} data-kind="known">
          <Check size={12} /> Known · {totalKnownInList}
        </span>
        <span className={styles.progressChip} data-kind="practice">
          <Circle size={12} /> Practice · {totalPracticeInList}
        </span>
      </div>

      {/* Flashcard with status badge */}
      {current && (
        <article className={styles.card} data-status={status}>
          <span className={styles.statusBadge} data-status={status}>
            {status === 'known' && (
              <>
                <Check size={14} /> Marked as known
              </>
            )}
            {status === 'unknown' && (
              <>
                <Circle size={14} /> Marked for practice
              </>
            )}
            {status === 'unseen' && (
              <>
                <Circle size={14} /> Unseen
              </>
            )}
          </span>

          <span className={`font-display ${styles.word}`}>{current}</span>

          <button
            type="button"
            className={`${common.btn} ${styles.hearBtn}`}
            onClick={() => speakWord(current)}
          >
            <Volume2 size={16} /> Hear word
          </button>
        </article>
      )}

      {/* Marking actions — primary focus */}
      <section className={styles.markSection}>
        <p className={styles.markLabel}>How well do you know this word?</p>
        <div className={styles.markRow}>
          <button
            type="button"
            className={`${styles.markBtn} ${styles.markPractice}`}
            onClick={markUnknown}
            data-current={status === 'unknown'}
          >
            <XIcon size={18} /> Needs practice
          </button>
          <button
            type="button"
            className={`${styles.markBtn} ${styles.markKnown}`}
            onClick={markKnown}
            data-current={status === 'known'}
          >
            <Check size={18} /> I know this
          </button>
        </div>
        <p className={styles.markHint}>Marking moves you to the next word automatically.</p>
      </section>

      {/* Navigation — secondary */}
      <nav className={styles.navRow} aria-label="Card navigation">
        <button
          type="button"
          className={common.btn}
          onClick={() => go(-1)}
          disabled={idx === 0}
        >
          <ChevronLeft size={14} /> Previous
        </button>
        <button
          type="button"
          className={common.btn}
          onClick={() => go(1)}
          disabled={idx >= order.length - 1}
        >
          Next <ChevronRight size={14} />
        </button>
      </nav>
    </ToolShell>
  );
}
