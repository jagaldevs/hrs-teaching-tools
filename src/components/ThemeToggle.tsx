import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../theme/ThemeProvider';
import styles from './ThemeToggle.module.css';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span className={styles.iconWrap} data-active={isDark}>
        <Moon size={16} />
      </span>
      <span className={styles.iconWrap} data-active={!isDark}>
        <Sun size={16} />
      </span>
      <span className={styles.thumb} data-side={isDark ? 'left' : 'right'} />
    </button>
  );
}
