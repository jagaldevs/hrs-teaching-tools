import { useMemo, useState } from 'react';
import { Shuffle, Copy, Check } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { STORY_STARTERS, GENRES, type StoryGenre, type StoryStarter } from '../../data/banks/stories';
import { randomChoice } from '../rng/util';
import { usePersistedState } from '../../hooks/usePersistedState';
import common from '../common.module.css';
import styles from './StoryStarters.module.css';

type Band = 'primary' | 'secondary' | 'all';

export function StoryStarters() {
  const [band, setBand] = usePersistedState<Band>('story.band', 'all');
  const [activeGenres, setActiveGenres] = usePersistedState<StoryGenre[]>(
    'story.genres',
    GENRES.map((g) => g.id),
  );
  const [current, setCurrent] = useState<StoryStarter | null>(null);
  const [copied, setCopied] = useState(false);

  const pool = useMemo(() => {
    return STORY_STARTERS.filter((s) => {
      if (band !== 'all' && s.band !== band) return false;
      if (activeGenres.length === 0) return false;
      return activeGenres.includes(s.genre);
    });
  }, [band, activeGenres]);

  function roll() {
    if (pool.length === 0) return;
    let next = randomChoice(pool);
    // Avoid showing the same prompt twice in a row when possible
    let tries = 0;
    while (next && current && next.id === current.id && tries < 6 && pool.length > 1) {
      next = randomChoice(pool);
      tries++;
    }
    setCurrent(next ?? null);
    setCopied(false);
  }

  function toggleGenre(g: StoryGenre) {
    setActiveGenres((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g],
    );
  }

  async function copyPrompt() {
    if (!current) return;
    try {
      await navigator.clipboard.writeText(current.text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  }

  return (
    <ToolShell
      eyebrow="Literacy"
      title="Story Starters"
      description="Genre-tagged narrative prompts for any year level."
      actions={
        <button
          type="button"
          className={`${common.btn} ${common.btnPrimary}`}
          onClick={roll}
          disabled={pool.length === 0}
        >
          <Shuffle size={14} /> {current ? 'Another' : 'Generate'}
        </button>
      }
    >
      <section className={styles.filters}>
        <div className={styles.filterRow}>
          <p className={common.labelText}>Band</p>
          <div className={styles.bandRow}>
            {(['all', 'primary', 'secondary'] as Band[]).map((b) => (
              <button
                key={b}
                type="button"
                className={`${common.btn} ${styles.bandBtn}`}
                data-active={band === b}
                onClick={() => setBand(b)}
              >
                {b === 'all' ? 'All' : b === 'primary' ? 'Primary' : 'Secondary'}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.filterRow}>
          <p className={common.labelText}>Genres</p>
          <div className={styles.genreRow}>
            {GENRES.map((g) => (
              <button
                key={g.id}
                type="button"
                className={styles.genreChip}
                data-active={activeGenres.includes(g.id)}
                onClick={() => toggleGenre(g.id)}
              >
                <span className={styles.genreEmoji}>{g.emoji}</span>
                {g.label}
              </button>
            ))}
          </div>
        </div>

        <p className={styles.poolSize}>{pool.length} prompts in this pool</p>
      </section>

      {current ? (
        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardGenre}>
              {GENRES.find((g) => g.id === current.genre)?.emoji}{' '}
              {GENRES.find((g) => g.id === current.genre)?.label}
            </span>
            <button
              type="button"
              className={styles.copyBtn}
              onClick={copyPrompt}
              aria-label="Copy prompt"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <p className={`font-display ${styles.cardText}`}>{current.text}</p>
        </article>
      ) : (
        <div className={styles.empty}>
          <p>Press <strong>Generate</strong> to pull a story starter.</p>
        </div>
      )}
    </ToolShell>
  );
}
