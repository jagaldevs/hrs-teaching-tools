import { useState } from 'react';
import { WandSparkles, Copy, Check } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { randomChoice } from './util';
import { usePersistedState } from '../../hooks/usePersistedState';
import common from '../common.module.css';
import styles from './GroupNameGenerator.module.css';

type Stream = 'lower' | 'upper' | 'middle' | 'senior';

const ADJECTIVES: Record<Stream, string[]> = {
  lower: ['Happy', 'Sunny', 'Brave', 'Sparkly', 'Mighty', 'Wiggly', 'Friendly', 'Speedy', 'Curious', 'Cosy', 'Cheeky', 'Lucky'],
  upper: ['Cosmic', 'Stealthy', 'Mighty', 'Electric', 'Daring', 'Galactic', 'Stormy', 'Radiant', 'Fearless', 'Roaring', 'Blazing', 'Frosty'],
  middle: ['Quantum', 'Atomic', 'Phantom', 'Echo', 'Rogue', 'Apex', 'Vortex', 'Crimson', 'Iron', 'Shadow', 'Neon', 'Lunar'],
  senior: ['Stoic', 'Resolute', 'Vanguard', 'Sovereign', 'Tempest', 'Sentinel', 'Indomitable', 'Strategic', 'Pinnacle', 'Renegade', 'Arcane', 'Ascendant'],
};

const NOUNS: Record<Stream, string[]> = {
  lower: ['Pandas', 'Bunnies', 'Stars', 'Frogs', 'Penguins', 'Otters', 'Dragons', 'Robots', 'Lions', 'Bees', 'Owls', 'Foxes'],
  upper: ['Tigers', 'Hawks', 'Wolves', 'Falcons', 'Dragons', 'Eagles', 'Sharks', 'Comets', 'Mustangs', 'Jets', 'Titans', 'Bolts'],
  middle: ['Raptors', 'Hydras', 'Voyagers', 'Pioneers', 'Specters', 'Pulsars', 'Mavericks', 'Cyclones', 'Outlaws', 'Drifters', 'Knights', 'Cobras'],
  senior: ['Strategists', 'Architects', 'Pioneers', 'Theorists', 'Operators', 'Cartographers', 'Synthesists', 'Archons', 'Auteurs', 'Catalysts', 'Visionaries', 'Vanguards'],
};

const STREAMS: { id: Stream; label: string }[] = [
  { id: 'lower', label: 'Lower Primary' },
  { id: 'upper', label: 'Upper Primary' },
  { id: 'middle', label: 'Middle School' },
  { id: 'senior', label: 'Senior School' },
];

export function GroupNameGenerator() {
  const [stream, setStream] = usePersistedState<Stream>('groupname.stream', 'upper');
  const [names, setNames] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  function generate(n: number = 8) {
    const adjs = ADJECTIVES[stream];
    const nouns = NOUNS[stream];
    const set = new Set<string>();
    while (set.size < n) {
      set.add(`The ${randomChoice(adjs)} ${randomChoice(nouns)}`);
    }
    setNames([...set]);
  }

  async function copyName(name: string) {
    try {
      await navigator.clipboard.writeText(name);
      setCopied(name);
      window.setTimeout(() => setCopied(null), 1200);
    } catch {
      /* clipboard might be unavailable; ignore */
    }
  }

  return (
    <ToolShell
      eyebrow="Randomisers"
      title="Group Name Generator"
      description="Age-appropriate team names. Click any to copy."
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

      <div className={common.controlRow}>
        <button
          type="button"
          className={`${common.btn} ${common.btnPrimary}`}
          onClick={() => generate()}
        >
          <WandSparkles size={14} /> {names.length === 0 ? 'Generate names' : 'Regenerate'}
        </button>
      </div>

      {names.length > 0 && (
        <div className={styles.grid}>
          {names.map((n) => (
            <button
              key={n}
              type="button"
              className={styles.nameCard}
              onClick={() => copyName(n)}
              title="Click to copy"
            >
              <span className={`font-display ${styles.nameText}`}>{n}</span>
              <span className={styles.copyIcon}>
                {copied === n ? <Check size={14} /> : <Copy size={14} />}
              </span>
            </button>
          ))}
        </div>
      )}
    </ToolShell>
  );
}
