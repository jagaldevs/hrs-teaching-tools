import { Link } from 'react-router-dom';
import { ArrowUpRight, type LucideIcon } from 'lucide-react';
import styles from './ToolCard.module.css';

interface ToolCardProps {
  id: string;
  to: string;
  name: string;
  description: string;
  icon: LucideIcon;
  meta?: string;
}

export function ToolCard({ to, name, description, icon: Icon, meta }: ToolCardProps) {
  return (
    <Link to={to} className={styles.card} aria-label={name}>
      <div className={styles.iconWrap}>
        <Icon size={20} strokeWidth={1.5} />
      </div>

      <div className={styles.body}>
        <h3 className={`font-display ${styles.name}`}>{name}</h3>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.footer}>
        {meta && <span className={styles.meta}>{meta}</span>}
        <span className={styles.cta} aria-hidden>
          <span>Open</span>
          <ArrowUpRight size={14} />
        </span>
      </div>
    </Link>
  );
}
