import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Gamepad2, Sparkles, X as XIcon } from 'lucide-react';
import {
  GAMES,
  GAME_GROUPS,
  STREAMS,
  type Game,
  type Stream,
} from '../data/games';
import { CategorySection } from '../components/CategorySection';
import { ToolCard } from '../components/ToolCard';
import { randomChoice } from '../tools/rng/util';
import { usePersistedState } from '../hooks/usePersistedState';
import common from '../tools/common.module.css';
import styles from './BrainBreaks.module.css';
import page from './Page.module.css';

type Subject = 'english' | 'maths' | 'history' | 'geography' | 'science' | 'computing' | 'general';

const SUBJECTS: { id: Subject; label: string; colour: string }[] = [
  { id: 'english', label: 'English', colour: '#E6007E' },
  { id: 'maths', label: 'Maths', colour: '#0EA5E9' },
  { id: 'history', label: 'History', colour: '#F59E0B' },
  { id: 'geography', label: 'Geography', colour: '#10B981' },
  { id: 'science', label: 'Science', colour: '#A855F7' },
  { id: 'computing', label: 'Computing', colour: '#14B8A6' },
  { id: 'general', label: 'General', colour: '#6B7280' },
];

const STREAM_SHORT: Record<Stream, string> = {
  lower_primary: 'Lower',
  upper_primary: 'Upper',
  middle_school: 'Middle',
  senior_school: 'Senior',
};

function matchesFilter(g: Game, streams: Stream[], subjects: Subject[]): boolean {
  if (streams.length > 0 && !g.streams.some((s) => streams.includes(s))) return false;
  if (subjects.length > 0 && !g.subjects.some((s) => subjects.includes(s as Subject))) return false;
  return true;
}

export function BrainBreaks() {
  const navigate = useNavigate();
  const [streams, setStreams] = usePersistedState<Stream[]>('brainbreaks.filters.streams', []);
  const [subjects, setSubjects] = usePersistedState<Subject[]>('brainbreaks.filters.subjects', []);

  const filtered = useMemo(
    () => GAMES.filter((g) => matchesFilter(g, streams, subjects)),
    [streams, subjects],
  );

  function toggleStream(s: Stream) {
    setStreams((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  }

  function toggleSubject(s: Subject) {
    setSubjects((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  }

  function clearFilters() {
    setStreams([]);
    setSubjects([]);
  }

  function surpriseMe() {
    const pool = filtered.length > 0 ? filtered : GAMES;
    const pick = randomChoice(pool);
    if (pick) navigate(`/brain-breaks/${pick.id}`);
  }

  const hasFilters = streams.length > 0 || subjects.length > 0;

  return (
    <div className={page.page}>
      <div className="container">
        <header className={page.hero}>
          <p className="eyebrow">Curriculum-aligned</p>
          <h1 className={`font-display ${page.heroTitle}`}>Brain Breaks</h1>
          <p className={page.heroSub}>
            {GAMES.length} games across English, Maths, History, Geography and Science.
            Streamed Foundation through Year 12 against AC V9 — projector-ready,
            no per-student devices required.
          </p>

          <div className={styles.heroActions}>
            <button
              type="button"
              className={`${common.btn} ${common.btnPrimary} ${styles.surpriseBtn}`}
              onClick={surpriseMe}
            >
              <Sparkles size={16} /> Surprise me
            </button>
            <span className={styles.heroCount}>
              {filtered.length} game{filtered.length === 1 ? '' : 's'} match
              {hasFilters ? ' your filters' : ''}
            </span>
          </div>
        </header>

        <section className={styles.filterBar} aria-label="Filter games">
          <div className={styles.filterCol}>
            <span className={styles.filterLabel}>Stream</span>
            <div className={styles.chipRow}>
              {STREAMS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={styles.chip}
                  data-active={streams.includes(s.id)}
                  onClick={() => toggleStream(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterCol}>
            <span className={styles.filterLabel}>Subject</span>
            <div className={styles.chipRow}>
              {SUBJECTS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={styles.chip}
                  data-active={subjects.includes(s.id)}
                  onClick={() => toggleSubject(s.id)}
                  style={{ ['--chip-colour' as string]: s.colour }}
                >
                  <span className={styles.chipDot} style={{ background: s.colour }} />
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {hasFilters && (
            <button type="button" className={styles.clearBtn} onClick={clearFilters}>
              <XIcon size={12} /> Clear filters
            </button>
          )}
        </section>

        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <p className="eyebrow">No matches</p>
            <h2 className={`font-display ${styles.emptyTitle}`}>
              No games match those filters.
            </h2>
            <p className={styles.emptyNote}>Try removing a stream or subject filter.</p>
            <button
              type="button"
              className={`${common.btn} ${common.btnPrimary}`}
              onClick={clearFilters}
            >
              Clear filters
            </button>
          </div>
        ) : (
          GAME_GROUPS.map((group) => {
            const games = filtered.filter((g) => g.group === group.id);
            if (games.length === 0) return null;
            return (
              <CategorySection
                key={group.id}
                icon={Gamepad2}
                title={group.label}
                description={group.description}
                count={games.length}
                unit="games"
              >
                {games.map((game) => (
                  <ToolCard
                    key={game.id}
                    id={game.id}
                    to={`/brain-breaks/${game.id}`}
                    name={game.name}
                    description={game.description}
                    icon={game.icon}
                    meta={
                      game.streams.length === 4
                        ? 'All streams'
                        : game.streams.map((s) => STREAM_SHORT[s]).join(' · ')
                    }
                  />
                ))}
              </CategorySection>
            );
          })
        )}

        {/* Footer: stream cheatsheet, kept from the original page */}
        <footer className={styles.footnote}>
          <span className={styles.footnoteLabel}>Streams aligned to AC V9</span>
          <div className={styles.footnoteList}>
            {STREAMS.map((s) => (
              <span key={s.id} className={styles.footnoteChip}>
                <strong>{s.label}</strong> · {s.years}
              </span>
            ))}
          </div>
          <p className={styles.footnoteHint}>
            Want a quick teacher walkthrough?{' '}
            <Link to="/about" className={styles.footnoteLink}>
              About this toolkit
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
