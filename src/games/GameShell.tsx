import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Maximize2, Minimize2 } from 'lucide-react';
import { findGame, type Stream } from '../data/games';
import { YEAR_BANDS, BAND_TO_STREAM, findClass, type YearBand } from '../data/classes';
import { usePersistedState } from '../hooks/usePersistedState';
import { ClassPicker, useClassSelection } from './ClassPicker';
import styles from './GameShell.module.css';
import common from '../tools/common.module.css';

interface GameShellProps {
  title: string;
  description: string;
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
          <Link to="/" className={styles.back} aria-label="Back to Brain Breaks">
            <ArrowLeft size={14} />
            <span>Back to Brain Breaks</span>
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

// ============================================================
//  SetupScreen — year band + class picker
// ============================================================

/**
 * Selections returned by the SetupScreen on Start.
 *
 * `classId` is the primary key — everything else (stream, subject) is
 * derived from it via findClass(). The derived fields are present for
 * convenience so games that only ever needed a stream don't have to
 * call findClass() themselves.
 */
export interface SetupSelections {
  /** HRS class id from src/data/classes.ts. */
  classId: string;
  /** Derived from findClass(classId).legacyStream. */
  stream: Stream;
  count: number;
}

interface SetupScreenProps {
  storageKey: string;
  /**
   * Looks up the matching Game in the registry and restricts the year-
   * band + class picker to bands whose mapped stream is in
   * `game.streams`. Without `gameId`, all bands and classes are
   * available.
   */
  gameId?: string;
  countOptions?: number[];
  onStart: (sel: SetupSelections) => void;
  /** Extra content rendered above the start button. */
  extra?: ReactNode;
}

export function SetupScreen({
  storageKey,
  gameId,
  countOptions = [5, 10, 15],
  onStart,
  extra,
}: SetupScreenProps) {
  const game = gameId ? findGame(gameId) : undefined;
  // Only Quick & Energetic games have class-anchored banks. For every
  // other group, the user chooses a year band only — a default classId
  // is still derived internally so SetupSelections stays valid for
  // downstream callers.
  const showClassPicker = !game || game.group === 'rapid';

  // Year bands the game supports → derived from game.streams.
  const supportedBands = useMemo<YearBand[]>(() => {
    if (!game) return YEAR_BANDS.map((b) => b.id);
    const supported = new Set<Stream>(game.streams);
    return YEAR_BANDS.filter((b) => supported.has(BAND_TO_STREAM[b.id])).map((b) => b.id);
  }, [game]);

  const [classId, setClassId] = useClassSelection(storageKey, supportedBands, game?.subjects);
  const [count, setCount] = usePersistedState<number>(
    `${storageKey}.count`,
    countOptions[0]!,
  );

  function handleStart() {
    const klass = findClass(classId);
    if (!klass) return;
    onStart({
      classId: klass.id,
      stream: klass.legacyStream ?? BAND_TO_STREAM[klass.yearBand],
      count,
    });
  }

  return (
    <div className={styles.setup}>
      <ClassPicker
        bands={supportedBands}
        classId={classId}
        onChange={setClassId}
        showClassSelect={showClassPicker}
      />

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
        onClick={handleStart}
      >
        Start game
      </button>
    </div>
  );
}
