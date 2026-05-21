import { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { usePersistedState } from '../../hooks/usePersistedState';
import common from '../common.module.css';
import styles from './PhonicsSoundWall.module.css';

interface Phoneme {
  ipa: string;
  /** Common graphemes (spellings) for this sound. */
  graphemes: string[];
  example: string;
  /** What to send to TTS — usually the example word, not the phoneme symbol. */
  spoken: string;
}

interface Group {
  id: string;
  name: string;
  phonemes: Phoneme[];
}

/**
 * AC V9 phonics — Foundation–Year 2 phoneme set.
 * Grouped by short vowels, long vowels, consonants, digraphs and r-controlled.
 */
const GROUPS: Group[] = [
  {
    id: 'short-vowels',
    name: 'Short Vowels',
    phonemes: [
      { ipa: '/a/', graphemes: ['a'], example: 'apple', spoken: 'apple' },
      { ipa: '/e/', graphemes: ['e'], example: 'egg', spoken: 'egg' },
      { ipa: '/i/', graphemes: ['i'], example: 'igloo', spoken: 'igloo' },
      { ipa: '/o/', graphemes: ['o'], example: 'octopus', spoken: 'octopus' },
      { ipa: '/u/', graphemes: ['u'], example: 'umbrella', spoken: 'umbrella' },
    ],
  },
  {
    id: 'long-vowels',
    name: 'Long Vowels',
    phonemes: [
      { ipa: '/ay/', graphemes: ['a_e', 'ai', 'ay'], example: 'cake', spoken: 'cake' },
      { ipa: '/ee/', graphemes: ['ee', 'ea', 'e_e'], example: 'tree', spoken: 'tree' },
      { ipa: '/igh/', graphemes: ['i_e', 'igh', 'y'], example: 'kite', spoken: 'kite' },
      { ipa: '/oh/', graphemes: ['o_e', 'oa', 'ow'], example: 'boat', spoken: 'boat' },
      { ipa: '/oo/', graphemes: ['u_e', 'oo', 'ew'], example: 'moon', spoken: 'moon' },
    ],
  },
  {
    id: 'consonants',
    name: 'Consonants',
    phonemes: [
      { ipa: '/b/', graphemes: ['b'], example: 'ball', spoken: 'ball' },
      { ipa: '/k/', graphemes: ['c', 'k', 'ck'], example: 'cat', spoken: 'cat' },
      { ipa: '/d/', graphemes: ['d'], example: 'dog', spoken: 'dog' },
      { ipa: '/f/', graphemes: ['f', 'ph'], example: 'fish', spoken: 'fish' },
      { ipa: '/g/', graphemes: ['g'], example: 'goat', spoken: 'goat' },
      { ipa: '/h/', graphemes: ['h'], example: 'hat', spoken: 'hat' },
      { ipa: '/j/', graphemes: ['j', 'g'], example: 'jam', spoken: 'jam' },
      { ipa: '/l/', graphemes: ['l'], example: 'lion', spoken: 'lion' },
      { ipa: '/m/', graphemes: ['m'], example: 'moon', spoken: 'moon' },
      { ipa: '/n/', graphemes: ['n'], example: 'net', spoken: 'net' },
      { ipa: '/p/', graphemes: ['p'], example: 'pig', spoken: 'pig' },
      { ipa: '/r/', graphemes: ['r'], example: 'red', spoken: 'red' },
      { ipa: '/s/', graphemes: ['s', 'ss'], example: 'sun', spoken: 'sun' },
      { ipa: '/t/', graphemes: ['t'], example: 'top', spoken: 'top' },
      { ipa: '/v/', graphemes: ['v'], example: 'van', spoken: 'van' },
      { ipa: '/w/', graphemes: ['w'], example: 'wig', spoken: 'wig' },
      { ipa: '/y/', graphemes: ['y'], example: 'yes', spoken: 'yes' },
      { ipa: '/z/', graphemes: ['z', 'zz', 's'], example: 'zebra', spoken: 'zebra' },
    ],
  },
  {
    id: 'digraphs',
    name: 'Digraphs',
    phonemes: [
      { ipa: '/sh/', graphemes: ['sh'], example: 'ship', spoken: 'ship' },
      { ipa: '/ch/', graphemes: ['ch', 'tch'], example: 'chip', spoken: 'chip' },
      { ipa: '/th/', graphemes: ['th'], example: 'thin', spoken: 'thin' },
      { ipa: '/wh/', graphemes: ['wh'], example: 'whale', spoken: 'whale' },
      { ipa: '/ng/', graphemes: ['ng'], example: 'ring', spoken: 'ring' },
      { ipa: '/qu/', graphemes: ['qu'], example: 'queen', spoken: 'queen' },
    ],
  },
  {
    id: 'r-controlled',
    name: 'R-controlled & Other Vowels',
    phonemes: [
      { ipa: '/ar/', graphemes: ['ar'], example: 'car', spoken: 'car' },
      { ipa: '/or/', graphemes: ['or'], example: 'fork', spoken: 'fork' },
      { ipa: '/er/', graphemes: ['er', 'ir', 'ur'], example: 'bird', spoken: 'bird' },
      { ipa: '/ow/', graphemes: ['ow', 'ou'], example: 'cow', spoken: 'cow' },
      { ipa: '/oy/', graphemes: ['oy', 'oi'], example: 'boy', spoken: 'boy' },
      { ipa: '/air/', graphemes: ['air', 'are'], example: 'chair', spoken: 'chair' },
    ],
  },
];

function speakWord(word: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(word);
  u.rate = 0.85;
  u.lang = 'en-AU';
  window.speechSynthesis.speak(u);
}

function speakStretched(word: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  // Speak letters slowly: "c... a... t"
  const u = new SpeechSynthesisUtterance(word.split('').join(' '));
  u.rate = 0.55;
  u.lang = 'en-AU';
  window.speechSynthesis.speak(u);
}

export function PhonicsSoundWall() {
  const [activeGroup, setActiveGroup] = usePersistedState<string>('phonics.group', GROUPS[0]!.id);
  const [stretch, setStretch] = useState(false);

  const group = GROUPS.find((g) => g.id === activeGroup) ?? GROUPS[0]!;

  function play(p: Phoneme) {
    if (stretch) speakStretched(p.spoken);
    else speakWord(p.spoken);
  }

  return (
    <ToolShell
      eyebrow="Literacy"
      title="Phonics Sound Wall"
      description="Click a sound to hear an example word. AC V9 phonics for Foundation–Year 2."
      actions={
        <button
          type="button"
          className={`${common.btn} ${stretch ? common.btnPrimary : ''}`}
          onClick={() => setStretch(!stretch)}
        >
          {stretch ? 'Stretched mode on' : 'Stretched mode off'}
        </button>
      }
    >
      <nav className={styles.tabs}>
        {GROUPS.map((g) => (
          <button
            key={g.id}
            type="button"
            className={styles.tab}
            data-active={g.id === activeGroup}
            onClick={() => setActiveGroup(g.id)}
          >
            {g.name}
          </button>
        ))}
      </nav>

      <h2 className={`font-display ${styles.groupTitle}`}>{group.name}</h2>

      <div className={styles.grid}>
        {group.phonemes.map((p) => (
          <button
            key={p.ipa}
            type="button"
            className={styles.tile}
            onClick={() => play(p)}
            aria-label={`Play ${p.example}`}
          >
            <span className={`font-display ${styles.ipa}`}>{p.ipa}</span>
            <span className={styles.graphemes}>{p.graphemes.join(' · ')}</span>
            <span className={styles.example}>{p.example}</span>
            <Volume2 size={14} className={styles.speakerIcon} />
          </button>
        ))}
      </div>
    </ToolShell>
  );
}
