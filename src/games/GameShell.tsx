import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Maximize2, Minimize2 } from 'lucide-react';
import { STREAMS, type Stream } from '../data/games';
import { SUBJECTS, SUBJECT_COLOURS, type Subject } from './types';
import { usePersistedState } from '../hooks/usePersistedState';
import { useEffect } from 'react';
import styles from './GameShell.module.css';
import common from '../tools/common.module.css';

interface GameShellProps {
  title: string;
  description: string;
  /** If a setup screen is being shown, pass a render fn; otherwise pass the playing UI. */
  children: ReactNode;
}

export function GameShell({ title, description, children }: GameShellProps) {
  const [isFs, setIsFs] = useState(false);

  useEffect(() => {
    function onChange() {
      setIsFs(!!document.fullscreenElement);
    }
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  function toggleFullscreen() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
    else document.exitFullscreen().catch(() => {});
  }

  return (
    <div className={styles.shell}>
      <div className={`container ${styles.bar}`}>
        <div className={styles.left}>
          <Link to="/brain-breaks" className={styles.back} aria-label="Back to brain breaks">
            <ArrowLeft size={14} />
            <span>Back to brain breaks</span>
          </Link>
          <div className={styles.titles}>
            <span className="eyebrow">Brain Break</span>
            <h1 className={`font-display ${styles.title}`}>{title}</h1>
            <p className={styles.description}>{description}</p>
          </div>
        </div>
        <div className={styles.actions}>
          <button type="button" className={common.btn} onClick={toggleFullscreen}>
            {isFs ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            {isFs ? 'Exit fullscreen' : 'Fullscreen'}
          </button>
        </div>
      </div>

      <main className={styles.stage}>{children}</main>
    </div>
  );
}

/** Setup screen — stream + subject pickers + start button. */
export interface SetupSelections {
  stream: Stream;
  subject: Subject | 'mix';
  count: number;
}

interface SetupScreenProps {
  storageKey: string;
  availableStreams?: Stream[];
  availableSubjects?: Subject[];
  countOptions?: number[];
  /** If false, hides the subject row (e.g. for word-only games). */
  showSubject?: boolean;
  onStart: (sel: SetupSelections) => void;
  /** Extra content rendered above the start button (e.g. game-specific options). */
  extra?: ReactNode;
}

export function SetupScreen({
  storageKey,
  availableStreams = ['lower_primary', 'upper_primary', 'middle_school', 'senior_school'],
  availableSubjects,
  countOptions = [5, 10, 15],
  showSubject = true,
  onStart,
  extra,
}: SetupScreenProps) {
  const [stream, setStream] = usePersistedState<Stream>(
    `${storageKey}.stream`,
    availableStreams[0]!,
  );
  const [subject, setSubject] = usePersistedState<Subject | 'mix'>(
    `${storageKey}.subject`,
    'mix',
  );
  const [count, setCount] = usePersistedState<number>(
    `${storageKey}.count`,
    countOptions[0]!,
  );

  const subjects = availableSubjects ?? SUBJECTS.map((s) => s.id);
  const streamObjs = STREAMS.filter((s) => availableStreams.includes(s.id));

  return (
    <div className={styles.setup}>
      <section className={styles.setupSection}>
        <p className="eyebrow">Stream</p>
        <div className={styles.choices}>
          {streamObjs.map((s) => (
            <button
              key={s.id}
              type="button"
              className={styles.choice}
              data-active={stream === s.id}
              onClick={() => setStream(s.id)}
            >
              <span className={styles.choiceLabel}>{s.label}</span>
              <span className={styles.choiceSub}>{s.years}</span>
            </button>
          ))}
        </div>
      </section>

      {showSubject && (
        <section className={styles.setupSection}>
          <p className="eyebrow">Subject</p>
          <div className={styles.choices}>
            <button
              type="button"
              className={styles.choice}
              data-active={subject === 'mix'}
              onClick={() => setSubject('mix')}
            >
              <span className={styles.choiceLabel}>Mixed</span>
              <span className={styles.choiceSub}>All subjects</span>
            </button>
            {subjects.map((sid) => {
              const sObj = SUBJECTS.find((s) => s.id === sid);
              if (!sObj) return null;
              return (
                <button
                  key={sid}
                  type="button"
                  className={styles.choice}
                  data-active={subject === sid}
                  onClick={() => setSubject(sid)}
                  style={{ ['--accent-tint' as string]: SUBJECT_COLOURS[sid] }}
                >
                  <span className={styles.choiceDot} style={{ background: SUBJECT_COLOURS[sid] }} />
                  <span className={styles.choiceLabel}>{sObj.label}</span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      <section className={styles.setupSection}>
        <p className="eyebrow">How many questions</p>
        <div className={styles.choices}>
          {countOptions.map((n) => (
            <button
              key={n}
              type="button"
              className={styles.choice}
              data-active={count === n}
              onClick={() => setCount(n)}
            >
              <span className={styles.choiceLabel}>{n}</span>
            </button>
          ))}
        </div>
      </section>

      {extra}

      <button
        type="button"
        className={`${common.btn} ${common.btnPrimary} ${styles.startBtn}`}
        onClick={() => onStart({ stream, subject, count })}
      >
        Start game
      </button>
    </div>
  );
}
