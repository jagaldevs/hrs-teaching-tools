import { CATEGORIES } from '../data/categories';
import { TOOLS, toolsByCategory } from '../data/tools';
import { CategorySection } from '../components/CategorySection';
import { ToolCard } from '../components/ToolCard';
import styles from './Page.module.css';

export function Dashboard() {
  return (
    <div className={styles.page}>
      <div className="container">
        <header className={styles.hero}>
          <p className="eyebrow">Teaching Toolkit</p>
          <h1 className={`font-display ${styles.heroTitle}`}>Teacher Tools</h1>
          <p className={styles.heroSub}>
            Everything you need to manage and inspire your classroom.
            <br />
            <span className={styles.heroNote}>
              {TOOLS.length} tools · works offline · saves to this device only
            </span>
          </p>
        </header>

        {CATEGORIES.map((cat) => {
          const tools = toolsByCategory(cat.id);
          if (tools.length === 0) return null;
          return (
            <CategorySection
              key={cat.id}
              icon={cat.icon}
              title={cat.name}
              description={cat.description}
              count={tools.length}
            >
              {tools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  id={tool.id}
                  to={`/tool/${tool.id}`}
                  name={tool.name}
                  description={tool.description}
                  icon={tool.icon}
                />
              ))}
            </CategorySection>
          );
        })}
      </div>
    </div>
  );
}
