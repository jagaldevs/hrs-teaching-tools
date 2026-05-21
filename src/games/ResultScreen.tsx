import { Link } from 'react-router-dom';
import { RotateCcw, Trophy } from 'lucide-react';
import styles from './ResultScreen.module.css';
import common from '../tools/common.module.css';

interface ResultScreenProps {
  score: number;
  total: number;
  onPlayAgain: () => void;
  /** Optional richer breakdown (e.g. by subject). */
  breakdown?: { label: string; value: string | number }[];
}

export function ResultScreen({ score, total, onPlayAgain, breakdown }: ResultScreenProps) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const tier =
    pct >= 90 ? 'Outstanding' : pct >= 75 ? 'Great work' : pct >= 50 ? 'Good effort' : 'Try again';

  return (
    <div className={styles.card}>
      <Trophy size={36} className={styles.trophy} />
      <p className="eyebrow">{tier}</p>
      <div className={styles.score}>
        <span className={`font-display ${styles.scoreNum}`}>{score}</span>
        <span className={styles.scoreDivider}>/</span>
        <span className={styles.scoreTotal}>{total}</span>
      </div>
      <div className={styles.bar}>
        <div className={styles.barFill} style={{ width: `${pct}%` }} />
      </div>
      <p className={styles.pct}>{pct}%</p>

      {breakdown && breakdown.length > 0 && (
        <ul className={styles.breakdown}>
          {breakdown.map((b) => (
            <li key={b.label}>
              <span>{b.label}</span>
              <strong>{b.value}</strong>
            </li>
          ))}
        </ul>
      )}

      <div className={styles.actions}>
        <button
          type="button"
          className={`${common.btn} ${common.btnPrimary}`}
          onClick={onPlayAgain}
        >
          <RotateCcw size={14} /> Play again
        </button>
        <Link to="/brain-breaks" className={common.btn}>
          More games
        </Link>
      </div>
    </div>
  );
}
