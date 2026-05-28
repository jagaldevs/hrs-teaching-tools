import { useParams, Link, useLocation } from 'react-router-dom';
import { findTool } from '../data/tools';
import { findGame, STREAMS } from '../data/games';
import { ArrowLeft } from 'lucide-react';
import styles from './Page.module.css';

export function ToolPlaceholder() {
  const { id } = useParams();
  const location = useLocation();
  const isGame = location.pathname.startsWith('/brain-breaks');

  const tool = id ? findTool(id) : undefined;
  const game = id ? findGame(id) : undefined;
  const item = tool ?? game;
  const backTo = isGame ? '/brain-breaks' : '/dashboard';
  const backLabel = isGame ? 'Back to brain breaks' : 'Back to tools';

  if (!item) {
    return (
      <div className={styles.page}>
        <div className="container">
          <div className={styles.placeholderWrap}>
            <p className={`eyebrow ${styles.placeholderEyebrow}`}>Not found</p>
            <h1 className={`font-display ${styles.placeholderTitle}`}>Unknown tool</h1>
            <p className={styles.placeholderDesc}>
              We couldn&rsquo;t locate &ldquo;{id}&rdquo;. Head back to the Teacher Tools list.
            </p>
            <Link to="/tools" className={styles.placeholderBack}>
              <ArrowLeft size={14} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
              Back to Teacher Tools
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const Icon = item.icon;

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.placeholderWrap}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 56,
                height: 56,
                borderRadius: 12,
                border: '1.5px solid var(--accent)',
                color: 'var(--accent)',
                background: 'var(--accent-soft)',
              }}
            >
              <Icon size={26} strokeWidth={1.4} />
            </span>
          </div>

          <p className={`eyebrow ${styles.placeholderEyebrow}`}>Coming soon</p>
          <h1 className={`font-display ${styles.placeholderTitle}`}>{item.name}</h1>
          <p className={styles.placeholderDesc}>{item.description}</p>

          {game && (
            <div className={styles.streamRow}>
              {STREAMS.filter((s) => game.streams.includes(s.id)).map((s) => (
                <span key={s.id} className={styles.streamChip}>
                  {s.label}
                </span>
              ))}
            </div>
          )}

          <div style={{ marginTop: 32 }}>
            <Link to={backTo} className={styles.placeholderBack}>
              <ArrowLeft size={14} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
              {backLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
