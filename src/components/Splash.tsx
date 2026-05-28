import { useNavigate } from 'react-router-dom';
import { Crest } from './Crest';
import styles from './Splash.module.css';

const SKIP_KEY = 'hrs-skip-splash';

export function shouldSkipSplash(): boolean {
  return localStorage.getItem(SKIP_KEY) === '1';
}

export function Splash() {
  const navigate = useNavigate();

  function enter() {
    // Set the skip flag so we don't bounce back here on every page load.
    // Users can clear localStorage to see this again.
    localStorage.setItem(SKIP_KEY, '1');
    navigate('/');
  }

  return (
    <main className={styles.splash}>
      <div className={styles.inner}>
        <div className={styles.crest}>
          <Crest size={200} />
        </div>

        <p className={`eyebrow fade-in ${styles.eyebrow}`}>AC V9 brain-break games · projector-ready</p>

        <h1 className={`font-display ${styles.title}`}>Brain Breaks</h1>

        <p className={styles.byline}>
          DIGITAL INNOVATION · INNOVATION CENTRE
        </p>

        <div className={styles.actions}>
          <button onClick={enter} className={styles.enter}>
            Enter
          </button>
        </div>
      </div>

      <footer className={styles.footer}>
        <span>Innovation Centre · Haileybury Rendall School</span>
        <span>Works offline · Saves locally</span>
      </footer>
    </main>
  );
}
