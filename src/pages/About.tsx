import { Link } from 'react-router-dom';
import { TOOLS } from '../data/tools';
import { GAMES } from '../data/games';
import { ArrowLeft } from 'lucide-react';
import styles from './Page.module.css';

export function About() {
  return (
    <div className={styles.page}>
      <div className="container">
        <header className={styles.hero}>
          <p className="eyebrow">Innovation Centre</p>
          <h1 className={`font-display ${styles.heroTitle}`}>About</h1>
          <p className={styles.heroSub}>
            A teaching toolkit built for Haileybury Rendall School by the Digital Innovation team.
            {GAMES.length} brain-break games and {TOOLS.length} teacher tools, Foundation to Year 10.
          </p>
        </header>

        <div
          className={styles.placeholderWrap}
          style={{ textAlign: 'left', maxWidth: 720 }}
        >
          <h2 className="font-display" style={{ fontSize: '1.5rem', marginBottom: 12 }}>
            Privacy
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 18 }}>
            Everything you do here stays on this device. Rolls, seating plans, scoreboards and
            preferences live in your browser&rsquo;s local storage. No accounts, no servers, no
            student data ever leaves the classroom.
          </p>

          <h2 className="font-display" style={{ fontSize: '1.5rem', marginBottom: 12, marginTop: 24 }}>
            Offline
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 18 }}>
            After your first visit, every tool works without an internet connection. Install to
            your home screen from the browser menu for a full-screen, app-like experience.
          </p>

          <h2 className="font-display" style={{ fontSize: '1.5rem', marginBottom: 12, marginTop: 24 }}>
            Credits
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Presented by Jack Galbraith — Head of Digital Innovation, Haileybury Rendall School.
          </p>

          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <Link to="/" className={styles.placeholderBack}>
              <ArrowLeft size={14} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
              Back to Brain Breaks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
