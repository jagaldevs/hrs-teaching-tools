import { NavLink, Link } from 'react-router-dom';
import { Info } from 'lucide-react';
import { Crest } from './Crest';
import { ThemeToggle } from './ThemeToggle';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Link to="/dashboard" className={styles.brand} aria-label="Haileybury Rendall School — Home">
          <Crest size={56} />
        </Link>

        <nav className={styles.tabs} aria-label="Primary">
          <NavLink to="/dashboard" className={({ isActive }) => `${styles.tab} ${isActive ? styles.tabActive : ''}`}>
            Teacher Tools
          </NavLink>
          <NavLink to="/brain-breaks" className={({ isActive }) => `${styles.tab} ${isActive ? styles.tabActive : ''}`}>
            Brain Breaks
          </NavLink>
        </nav>

        <div className={styles.actions}>
          <Link to="/about" className={styles.iconBtn} aria-label="About">
            <Info size={16} />
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
