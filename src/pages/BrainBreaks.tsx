import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Gamepad2, Sparkles, X as XIcon } from 'lucide-react';
import {
  GAMES,
  GAME_GROUPS,
  type Game,
  type Stream,
} from '../data/games';
import {
  YEAR_BANDS,
  HRS_CLASSES,
  classesForBands,
  findClass,
  type YearBand,
  type HrsClass,
} from '../data/classes';
import { SUBJECT_COLOURS } from '../games/types';
import { CategorySection } from '../components/CategorySection';
import { ToolCard } from '../components/ToolCard';
import { randomChoice } from '../tools/rng/util';
import { usePersistedState } from '../hooks/usePersistedState';
import common from '../tools/common.module.css';
import styles from './BrainBreaks.module.css';
import page from './Page.module.css';

/**
 * Map a YearBand to the legacy `Stream` it falls under. Used to decide
 * which games show up when a year band is selected (each game's
 * `game.streams` still references the legacy 4 streams).
 *
 * If we later refactor `Game.streams` → `Game.yearBands`, this helper
 * goes away.
 */
const BAND_TO_STREAM: Record<YearBand, Stream> = {
  'f-2': 'lower_primary',
  '3-6': 'upper_primary',
  y7: 'middle_school',
  y8: 'middle_school',
  y9: 'middle_school',
  y10: 'senior_school',
  'vce-1-2': 'senior_school',
  'vce-3-4': 'senior_school',
};

function gameMatchesFilters(
  g: Game,
  selectedBands: YearBand[],
  selectedClassIds: string[],
): boolean {
  // No filters → show every game (preserves the pre-filter landing experience).
  if (selectedBands.length === 0 && selectedClassIds.length === 0) return true;

  // Year-band filter: keep games whose declared streams cover any of the
  // selected bands.
  if (selectedBands.length > 0) {
    const wantedStreams = new Set(selectedBands.map((b) => BAND_TO_STREAM[b]));
    if (!g.streams.some((s) => wantedStreams.has(s))) return false;
  }

  // Class filter (Q5: cards aren't filtered out, just colour-coded). However,
  // we DO narrow by subject mapping so a class chip narrows visibly. A game
  // shows if it can serve any selected class's subject.
  if (selectedClassIds.length > 0) {
    const wantedSubjects = new Set(
      selectedClassIds.map((id) => findClass(id)?.subject).filter(Boolean),
    );
    if (!g.subjects.some((s) => wantedSubjects.has(s))) return false;
  }

  return true;
}

export function BrainBreaks() {
  const navigate = useNavigate();
  const [yearBands, setYearBands] = usePersistedState<YearBand[]>(
    'brainbreaks.filters.yearBands',
    [],
  );
  const [classIds, setClassIds] = usePersistedState<string[]>(
    'brainbreaks.filters.classes',
    [],
  );

  const visibleClasses = useMemo<HrsClass[]>(
    () => (yearBands.length === 0 ? [] : classesForBands(yearBands)),
    [yearBands],
  );

  const filtered = useMemo(
    () => GAMES.filter((g) => gameMatchesFilters(g, yearBands, classIds)),
    [yearBands, classIds],
  );

  function toggleBand(b: YearBand) {
    setYearBands((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]));
    // When changing bands, prune class selections that no longer fit any selected band.
    setClassIds((prev) => {
      const nextBands = yearBands.includes(b)
        ? yearBands.filter((x) => x !== b)
        : [...yearBands, b];
      if (nextBands.length === 0) return prev;
      return prev.filter((id) => {
        const klass = findClass(id);
        return klass ? nextBands.includes(klass.yearBand) : false;
      });
    });
  }

  function toggleClass(id: string) {
    setClassIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      // Hint for game SetupScreens — the most recently turned-on class
      // pre-fills the picker when the teacher clicks into a game.
      if (typeof window !== 'undefined') {
        try {
          if (!prev.includes(id)) {
            window.localStorage.setItem('brainbreaks.lastClass', JSON.stringify(id));
          } else if (next.length === 0) {
            window.localStorage.removeItem('brainbreaks.lastClass');
          }
        } catch {
          /* ignore */
        }
      }
      return next;
    });
  }

  function clearFilters() {
    setYearBands([]);
    setClassIds([]);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem('brainbreaks.lastClass');
      } catch {
        /* ignore */
      }
    }
  }

  function surpriseMe() {
    const pool = filtered.length > 0 ? filtered : GAMES;
    const pick = randomChoice(pool);
    if (pick) navigate(`/brain-breaks/${pick.id}`);
  }

  const hasFilters = yearBands.length > 0 || classIds.length > 0;

  return (
    <div className={page.page}>
      <div className="container">
        <header className={page.hero}>
          <p className="eyebrow">Curriculum-aligned</p>
          <h1 className={`font-display ${page.heroTitle}`}>Brain Breaks</h1>
          <p className={page.heroSub}>
            {GAMES.length} projector-ready games. Filter by your class — from
            Foundation through Year 12 and the full VCE Unit 1–4 spread.
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
            <span className={styles.filterLabel}>Year level</span>
            <div className={styles.chipRow}>
              {YEAR_BANDS.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  className={styles.chip}
                  data-active={yearBands.includes(b.id)}
                  onClick={() => toggleBand(b.id)}
                  title={b.label}
                >
                  {b.shortLabel}
                </button>
              ))}
            </div>
          </div>

          {yearBands.length > 0 && (
            <div className={styles.filterCol}>
              <span className={styles.filterLabel}>
                Class {visibleClasses.length > 0 && `· ${visibleClasses.length}`}
              </span>
              <div className={styles.chipRow}>
                {visibleClasses.map((c) => {
                  const colour = SUBJECT_COLOURS[c.subject];
                  const active = classIds.includes(c.id);
                  return (
                    <button
                      key={c.id}
                      type="button"
                      className={styles.chip}
                      data-active={active}
                      onClick={() => toggleClass(c.id)}
                      style={{ ['--chip-colour' as string]: colour }}
                      title={c.anchored ? 'HRS-anchored content available' : 'Generic AC V9 content'}
                    >
                      <span className={styles.chipDot} style={{ background: colour }} />
                      {c.name}
                      {c.anchored && <span className={styles.chipBadge}>✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

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
            <p className={styles.emptyNote}>Try removing a year band or class filter.</p>
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
                    meta={gameMeta(game)}
                  />
                ))}
              </CategorySection>
            );
          })
        )}

        <footer className={styles.footnote}>
          <span className={styles.footnoteLabel}>Class-anchored at HRS</span>
          <div className={styles.footnoteList}>
            {HRS_CLASSES.filter((c) => c.anchored).map((c) => (
              <span key={c.id} className={styles.footnoteChip} title="HRS-anchored content available">
                <strong>{c.name}</strong> · ✓
              </span>
            ))}
            <span className={styles.footnoteChip}>
              {HRS_CLASSES.length - HRS_CLASSES.filter((c) => c.anchored).length} other classes use
              generic AC V9 content
            </span>
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

function gameMeta(game: Game): string {
  // Map the game's declared streams back to year-band shorthand.
  const bandsForGame = new Set<string>();
  for (const stream of game.streams) {
    for (const band of YEAR_BANDS) {
      if (BAND_TO_STREAM[band.id] === stream) bandsForGame.add(band.shortLabel);
    }
  }
  const labels = Array.from(bandsForGame);
  if (labels.length === YEAR_BANDS.length) return 'All year levels';
  return labels.join(' · ');
}
