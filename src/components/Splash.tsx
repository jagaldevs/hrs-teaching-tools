import { useNavigate } from 'react-router-dom';
import { Crest } from './Crest';
import styles from './Splash.module.css';

const SKIP_KEY = 'hrs-skip-splash';

// localStorage can throw (blocked storage, some embedded browsers); the
// splash must never take the whole app down with it.
export function shouldSkipSplash(): boolean {
  try {
    return localStorage.getItem(SKIP_KEY) === '1';
  } catch {
    return true;
  }
}

export function Splash() {
  const navigate = useNavigate();

  function enter() {
    // Set the skip flag so we don't bounce back here on every page load.
    // Users can clear localStorage to see this again.
    try {
      localStorage.setItem(SKIP_KEY, '1');
    } catch {
      /* storage blocked; shouldSkipSplash() already falls back to skipping */
    }
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
