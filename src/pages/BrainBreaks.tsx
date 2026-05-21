import { GAMES, GAME_GROUPS, gamesByGroup, STREAMS } from '../data/games';
import { CategorySection } from '../components/CategorySection';
import { ToolCard } from '../components/ToolCard';
import { Gamepad2 } from 'lucide-react';
import styles from './Page.module.css';

const STREAM_LABEL: Record<string, string> = {
  lower_primary: 'Lower Primary',
  upper_primary: 'Upper Primary',
  middle_school: 'Middle School',
  senior_school: 'Senior School',
};

export function BrainBreaks() {
  return (
    <div className={styles.page}>
      <div className="container">
        <header className={styles.hero}>
          <p className="eyebrow">Curriculum-aligned</p>
          <h1 className={`font-display ${styles.heroTitle}`}>Brain Breaks</h1>
          <p className={styles.heroSub}>
            {GAMES.length} games across English, Maths, History and Geography. Streamed to
            Foundation through Year 12 against the Australian Curriculum V9.
          </p>

          <div className={styles.streamRow}>
            {STREAMS.map((s) => (
              <span key={s.id} className={styles.streamChip}>
                {s.label} · {s.years}
              </span>
            ))}
          </div>
        </header>

        {GAME_GROUPS.map((group) => {
          const games = gamesByGroup(group.id);
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
                  meta={game.streams.length === 4 ? 'All streams' : game.streams.map((s) => STREAM_LABEL[s].split(' ')[0]).join(' · ')}
                />
              ))}
            </CategorySection>
          );
        })}
      </div>
    </div>
  );
}
