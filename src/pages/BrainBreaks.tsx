import { Link, useNavigate } from 'react-router-dom';
import { Gamepad2, Sparkles } from 'lucide-react';
import { GAMES, GAME_GROUPS, type Game } from '../data/games';
import { YEAR_BANDS, BAND_TO_STREAM, HRS_CLASSES, isSelectable } from '../data/classes';
import { CategorySection } from '../components/CategorySection';
import { ToolCard } from '../components/ToolCard';
import { randomChoice } from '../tools/rng/util';
import common from '../tools/common.module.css';
import styles from './BrainBreaks.module.css';
import page from './Page.module.css';

export function BrainBreaks() {
  const navigate = useNavigate();

  function surpriseMe() {
    const pick = randomChoice(GAMES);
    if (pick) navigate(`/brain-breaks/${pick.id}`);
  }

  return (
    <div className={page.page}>
      <div className="container">
        <header className={page.hero}>
          <p className="eyebrow">Curriculum-aligned</p>
          <h1 className={`font-display ${page.heroTitle}`}>Brain Breaks</h1>
          <p className={page.heroSub}>
            {GAMES.length} projector-ready games. Pick one — then choose your
            class on the next screen.
          </p>

          <div className={styles.heroActions}>
            <button
              type="button"
              className={`${common.btn} ${common.btnPrimary} ${styles.surpriseBtn}`}
              onClick={surpriseMe}
            >
              <Sparkles size={16} /> Surprise me
            </button>
          </div>
        </header>

        {GAME_GROUPS.map((group) => {
          const games = GAMES.filter((g) => g.group === group.id);
          if (games.length === 0) return null;
          return (
            <CategorySection
              key={group.id}
              icon={Gamepad2}
              title={group.label}
              description={group.description}
              count={games.length}
              unit={games.length === 1 ? 'game' : 'games'}
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
        })}

        <footer className={styles.footnote}>
          <span className={styles.footnoteLabel}>Class-anchored at HRS</span>
          <div className={styles.footnoteList}>
            {HRS_CLASSES.filter((c) => c.anchored).map((c) => (
              <span key={c.id} className={styles.footnoteChip} title="HRS-anchored content available">
                <strong>{c.name}</strong> · ✓
              </span>
            ))}
            <span className={styles.footnoteChip}>
              {HRS_CLASSES.filter((c) => !c.anchored && isSelectable(c)).length} other classes use
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
