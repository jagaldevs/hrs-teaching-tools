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
    navigate('/dashboard');
  }

  function enterAndRemember() {
    localStorage.setItem(SKIP_KEY, '1');
    navigate('/dashboard');
  }

  return (
    <main className={styles.splash}>
      <div className={styles.inner}>
        <div className={styles.crest}>
          <Crest size={200} />
        </div>

        <p className={`eyebrow fade-in ${styles.eyebrow}`}>Teaching Toolkit</p>

        <h1 className={`font-display ${styles.title}`}>Teaching Tools</h1>

        <p className={styles.byline}>
          DIGITAL INNOVATION · INNOVATION CENTRE
        </p>

        <div className={styles.actions}>
          <button onClick={enter} className={styles.enter}>
            Enter
          </button>
          <button onClick={enterAndRemember} className={styles.skip}>
            Don&rsquo;t show this again
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
