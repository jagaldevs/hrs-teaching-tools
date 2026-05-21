import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Check, X as XIcon, Shuffle, RotateCcw, Volume2 } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { usePersistedState } from '../../hooks/usePersistedState';
import { shuffle } from '../rng/util';
import common from '../common.module.css';
import styles from './SightWords.module.css';

type ListId = 'magic100' | 'magic200' | 'magic300';

const LISTS: Record<ListId, { label: string; words: string[] }> = {
  magic100: {
    label: 'Magic 100',
    // Most common ~100 English words. Order follows the Magic Words list (Lyn Stone).
    words: [
      'the', 'and', 'a', 'I', 'to', 'said', 'in', 'he', 'it', 'was',
      'of', 'for', 'is', 'you', 'his', 'on', 'they', 'with', 'be', 'as',
      'at', 'one', 'had', 'have', 'not', 'this', 'are', 'but', 'or', 'her',
      'all', 'we', 'an', 'when', 'up', 'can', 'so', 'out', 'do', 'were',
      'what', 'your', 'how', 'said', 'if', 'about', 'will', 'each', 'them', 'then',
      'she', 'many', 'would', 'into', 'has', 'more', 'two', 'like', 'him', 'see',
      'time', 'could', 'no', 'make', 'than', 'first', 'water', 'been', 'who', 'oil',
      'its', 'now', 'find', 'long', 'down', 'day', 'did', 'get', 'come', 'made',
      'may', 'part', 'over', 'new', 'sound', 'take', 'only', 'little', 'work', 'know',
      'place', 'years', 'live', 'me', 'back', 'give', 'most', 'very', 'after', 'thing',
    ],
  },
  magic200: {
    label: 'Magic 200',
    words: [
      'our', 'just', 'name', 'good', 'sentence', 'man', 'think', 'say', 'great', 'where',
      'help', 'through', 'much', 'before', 'line', 'right', 'too', 'mean', 'old', 'any',
      'same', 'tell', 'boy', 'follow', 'came', 'want', 'show', 'also', 'around', 'form',
      'three', 'small', 'set', 'put', 'end', 'why', 'again', 'turn', 'here', 'off',
      'went', 'number', 'large', 'must', 'big', 'even', 'such', 'because', 'turn', 'asked',
      'house', 'world', 'going', 'school', 'important', 'until', 'eyes', 'face', 'far', 'something',
      'few', 'head', 'above', 'kind', 'began', 'almost', 'sometimes', 'mountain', 'cut', 'young',
      'talk', 'soon', 'list', 'song', 'leave', 'family', 'body', 'music', 'colour', 'stand',
      'sun', 'questions', 'fish', 'area', 'mark', 'dog', 'horse', 'birds', 'problem', 'complete',
      'room', 'knew', 'since', 'ever', 'piece', 'told', 'usually', 'paper', 'often', 'together',
    ],
  },
  magic300: {
    label: 'Magic 300',
    words: [
      'group', 'although', 'plant', 'last', 'school', 'father', 'keep', 'tree', 'never', 'started',
      'city', 'earth', 'eyes', 'light', 'thought', 'head', 'under', 'story', 'saw', 'left',
      'few', 'while', 'along', 'might', 'close', 'something', 'seem', 'next', 'hard', 'open',
      'example', 'beginning', 'life', 'always', 'those', 'both', 'paper', 'together', 'got', 'often',
      'until', 'children', 'side', 'feet', 'car', 'mile', 'night', 'walked', 'white', 'sea',
      'began', 'grow', 'took', 'river', 'four', 'carry', 'state', 'once', 'book', 'hear',
      'stop', 'without', 'second', 'later', 'miss', 'idea', 'enough', 'eat', 'face', 'watch',
      'far', 'Indian', 'really', 'almost', 'let', 'above', 'girl', 'sometimes', 'mountain', 'cut',
      'young', 'talk', 'soon', 'list', 'song', 'being', 'leave', 'family', 'body', 'music',
      'colour', 'stand', 'questions', 'mark', 'horse', 'birds', 'problem', 'complete', 'room', 'knew',
    ],
  },
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

export function SightWords() {
  const [listId, setListId] = usePersistedState<ListId>('sightwords.list', 'magic100');
  const [shuffled, setShuffled] = useState<string[]>(LISTS[listId].words);
  const [idx, setIdx] = useState(0);
  const [progress, setProgress] = usePersistedState<Progress>('sightwords.progress', {
    known: [],
    unknown: [],
  });

  useEffect(() => {
    setShuffled(LISTS[listId].words);
    setIdx(0);
  }, [listId]);

  const current = shuffled[idx];

  function go(delta: number) {
    setIdx((i) => {
      const next = i + delta;
      if (next < 0) return 0;
      if (next >= shuffled.length) return shuffled.length - 1;
      return next;
    });
  }

  function markKnown() {
    if (!current) return;
    setProgress((p) => ({
      known: [...new Set([...p.known, current])],
      unknown: p.unknown.filter((w) => w !== current),
    }));
    if (idx < shuffled.length - 1) go(1);
  }

  function markUnknown() {
    if (!current) return;
    setProgress((p) => ({
      known: p.known.filter((w) => w !== current),
      unknown: [...new Set([...p.unknown, current])],
    }));
    if (idx < shuffled.length - 1) go(1);
  }

  function reshuffle() {
    setShuffled(shuffle(LISTS[listId].words));
    setIdx(0);
  }

  function resetProgress() {
    setProgress({ known: [], unknown: [] });
  }

  const status = current
    ? progress.known.includes(current)
      ? 'known'
      : progress.unknown.includes(current)
        ? 'unknown'
        : 'unseen'
    : 'unseen';

  return (
    <ToolShell
      eyebrow="Literacy"
      title="Sight Word Flashcards"
      description="Magic 100, 200 and 300 word lists. Click the speaker to hear the word. Mark each as known or needs practice."
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
      </div>

      <div className={styles.progressRow}>
        <span className={styles.chip}>
          {idx + 1} / {shuffled.length}
        </span>
        <span className={styles.chipKnown}>
          <Check size={12} /> Known · {progress.known.length}
        </span>
        <span className={styles.chipUnknown}>
          <XIcon size={12} /> Practice · {progress.unknown.length}
        </span>
      </div>

      {current && (
        <div className={styles.card} data-status={status}>
          <button
            type="button"
            className={styles.speakerBtn}
            onClick={() => speakWord(current)}
            aria-label="Hear word"
          >
            <Volume2 size={20} />
          </button>
          <span className={`font-display ${styles.word}`}>{current}</span>
        </div>
      )}

      <div className={common.controlRow}>
        <button type="button" className={common.btn} onClick={() => go(-1)} disabled={idx === 0}>
          <ChevronLeft size={14} /> Previous
        </button>
        <button type="button" className={`${common.btn} ${styles.unknownBtn}`} onClick={markUnknown}>
          <XIcon size={14} /> Needs practice
        </button>
        <button type="button" className={`${common.btn} ${styles.knownBtn}`} onClick={markKnown}>
          <Check size={14} /> Known
        </button>
        <button type="button" className={common.btn} onClick={() => go(1)} disabled={idx >= shuffled.length - 1}>
          Next <ChevronRight size={14} />
        </button>
      </div>
    </ToolShell>
  );
}
