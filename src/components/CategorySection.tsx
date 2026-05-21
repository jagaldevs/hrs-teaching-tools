import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import styles from './CategorySection.module.css';

interface CategorySectionProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  count: number;
  unit?: string;
  children: ReactNode;
}

export function CategorySection({
  icon: Icon,
  title,
  description,
  count,
  unit = 'tools',
  children,
}: CategorySectionProps) {
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <span className={styles.iconWrap}>
            <Icon size={16} strokeWidth={1.6} />
          </span>
          <h2 className={`font-display ${styles.title}`}>{title}</h2>
        </div>
        <span className={styles.count}>
          {count} {unit}
        </span>
      </header>

      {description && <p className={styles.description}>{description}</p>}

      <div className={styles.divider} />

      <div className={styles.grid}>{children}</div>
    </section>
  );
}
