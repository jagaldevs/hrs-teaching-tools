import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Maximize2, Minimize2 } from 'lucide-react';
import { findGame, type Stream } from '../data/games';
import { SUBJECT_COLOURS } from './types';
import {
  YEAR_BANDS,
  classesForBand,
  findClass,
  HRS_CLASSES,
  type YearBand,
} from '../data/classes';
import { usePersistedState } from '../hooks/usePersistedState';
import { useEffect, useMemo } from 'react';
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

const BAND_TO_STREAM: Record<YearBand, Stream> = {
  'f-2': 'lower_primary',
  '3-6': 'upper_primary',
  y7: 'middle_school',
  y8: 'middle_school',
  y9: 'middle_school',
  y10: 'senior_school',
};

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
  // Only Quick & Energetic games have class-anchored banks (Sociology,
  // Software Dev, etc.). For every other group, the user chooses a
  // year band only — a default classId is still derived internally so
  // SetupSelections stays valid for downstream callers.
  const showClassPicker = !game || game.group === 'rapid';

  // Year bands the game supports → derived from game.streams.
  const supportedBands = useMemo<YearBand[]>(() => {
    if (!game) return YEAR_BANDS.map((b) => b.id);
    const supported = new Set<Stream>(game.streams);
    return YEAR_BANDS.filter((b) => supported.has(BAND_TO_STREAM[b.id])).map((b) => b.id);
  }, [game]);

  // Default class — picked in priority order:
  //   1. Legacy-key migration (pre-rework localStorage values)
  //   2. Landing-page hint: the last class the teacher toggled on the
  //      Brain Breaks landing filter (so clicking a game card after
  //      filtering "feels" like navigation, not a reset).
  //   3. ANY anchored class in supported bands — scanned across all
  //      supportedBands FIRST, so we don't fall back to F-2 English
  //      when an anchored VCE class exists higher up the list.
  //   4. First class in the first supported band (last-resort default).
  const defaultClassId = useMemo(() => {
    const migrated = migrateLegacySelection(storageKey, supportedBands);
    if (migrated) return migrated;

    const landingHint = readLs('brainbreaks.lastClass');
    if (landingHint) {
      const klass = findClass(landingHint);
      if (
        klass &&
        supportedBands.includes(klass.yearBand) &&
        (game?.subjects.includes(klass.subject) ?? true)
      ) {
        return klass.id;
      }
    }

    // First pass: any anchored class whose subject the game supports.
    for (const band of supportedBands) {
      const classes = classesForBand(band);
      const anchored = classes.find(
        (c) => c.anchored && (game?.subjects.includes(c.subject) ?? true),
      );
      if (anchored) return anchored.id;
    }

    // Second pass: first available class in any supported band.
    for (const band of supportedBands) {
      const classes = classesForBand(band);
      if (classes[0]) return classes[0].id;
    }
    return HRS_CLASSES[0]?.id ?? '';
  }, [storageKey, supportedBands, game]);

  const [classId, setClassId] = usePersistedState<string>(
    `${storageKey}.classId`,
    defaultClassId,
  );
  const [count, setCount] = usePersistedState<number>(
    `${storageKey}.count`,
    countOptions[0]!,
  );

  // Defensive snap: if persisted classId is no longer offered, reset.
  useEffect(() => {
    const klass = findClass(classId);
    if (!klass || !supportedBands.includes(klass.yearBand)) {
      setClassId(defaultClassId);
    }
  }, [classId, defaultClassId, supportedBands, setClassId]);

  const currentClass = findClass(classId);
  const currentBand = currentClass?.yearBand ?? supportedBands[0]!;

  function pickBand(band: YearBand) {
    const classes = classesForBand(band);
    if (classes.length === 0) return;
    // Try to keep the same subject if the new band has it.
    const sameSubject = classes.find((c) => c.subject === currentClass?.subject);
    setClassId((sameSubject ?? classes[0]!).id);
  }

  function pickClass(id: string) {
    setClassId(id);
  }

  function handleStart() {
    const klass = findClass(classId);
    if (!klass) return;
    onStart({
      classId: klass.id,
      stream: klass.legacyStream ?? BAND_TO_STREAM[klass.yearBand],
      count,
    });
  }

  const yearBandObjs = YEAR_BANDS.filter((b) => supportedBands.includes(b.id));
  const classesInBand = classesForBand(currentBand);
  // Anchored classes pinned to the top of the dropdown.
  const anchoredClasses = classesInBand.filter((c) => c.anchored);
  const otherClasses = classesInBand.filter((c) => !c.anchored);

  return (
    <div className={styles.setup}>
      <section className={styles.setupSection}>
        <p className="eyebrow">Year level</p>
        <div className={styles.choices}>
          {yearBandObjs.map((b) => (
            <button
              key={b.id}
              type="button"
              className={styles.choice}
              data-active={currentBand === b.id}
              onClick={() => pickBand(b.id)}
            >
              <span className={styles.choiceLabel}>{b.shortLabel}</span>
              <span className={styles.choiceSub}>{b.label}</span>
            </button>
          ))}
        </div>
      </section>

      {showClassPicker && (
        <section className={styles.setupSection}>
          <p className="eyebrow">
            Class · {classesInBand.length}
            {currentClass?.anchored && (
              <span className={styles.eyebrowBadge}> · HRS-anchored ✓</span>
            )}
          </p>
          <div className={styles.classSelectRow}>
            <span
              className={styles.classSelectDot}
              style={{
                background: currentClass
                  ? SUBJECT_COLOURS[currentClass.subject]
                  : 'transparent',
              }}
              aria-hidden="true"
            />
            <select
              className={styles.classSelect}
              value={classId}
              onChange={(e) => pickClass(e.target.value)}
              aria-label="Select class"
            >
              {anchoredClasses.length > 0 && (
                <optgroup label="HRS-anchored ✓">
                  {anchoredClasses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </optgroup>
              )}
              {otherClasses.length > 0 && (
                <optgroup label={anchoredClasses.length > 0 ? 'Other classes' : 'Classes'}>
                  {otherClasses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
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
        onClick={handleStart}
      >
        Start game
      </button>
    </div>
  );
}

/**
 * One-shot migration of legacy persisted selections.
 *
 * Before the class-filter rework each game persisted
 *   <storageKey>.stream    : Stream
 *   <storageKey>.subject   : Subject | 'mix'
 *   <storageKey>.unitGroup : 'any' | 'units_1_2' | 'units_3_4'
 *
 * After the rework only <storageKey>.classId matters. If a teacher's
 * old keys exist but new ones don't, derive a sensible classId so the
 * picker opens roughly where they left off.
 *
 * Returns undefined if nothing useful can be inferred — caller falls
 * back to the anchored-default logic. Reads localStorage directly to
 * avoid React state-init dependencies.
 */
function migrateLegacySelection(
  storageKey: string,
  supportedBands: YearBand[],
): string | undefined {
  if (typeof window === 'undefined' || !window.localStorage) return undefined;
  // If a classId is already set, we're past migration.
  const existingClass = readLs(`${storageKey}.classId`);
  if (existingClass) return undefined;

  const oldStream = readLs(`${storageKey}.stream`) as Stream | null;
  const oldSubject = readLs(`${storageKey}.subject`);
  if (!oldStream) return undefined;

  // Pick the year band that best matches old stream + unit group.
  let targetBand: YearBand | undefined;
  if (oldStream === 'lower_primary') targetBand = 'f-2';
  else if (oldStream === 'upper_primary') targetBand = '3-6';
  else if (oldStream === 'middle_school') targetBand = 'y8'; // middle: default to Y8
  else if (oldStream === 'senior_school') targetBand = 'y10';
  if (!targetBand || !supportedBands.includes(targetBand)) return undefined;

  const classes = classesForBand(targetBand);
  if (classes.length === 0) return undefined;

  // Prefer a class whose subject matches the old subject pick.
  if (oldSubject && oldSubject !== 'mix' && oldSubject !== '"mix"') {
    const stripped = oldSubject.replace(/"/g, '');
    const match = classes.find((c) => c.subject === stripped);
    if (match) return match.id;
  }
  // Otherwise, the first anchored class in the band, else the first class.
  const anchored = classes.find((c) => c.anchored);
  return (anchored ?? classes[0]).id;
}

function readLs(key: string): string | null {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return null;
    // usePersistedState stores JSON strings — strip quotes for plain strings.
    if (raw.startsWith('"') && raw.endsWith('"')) return raw.slice(1, -1);
    return raw;
  } catch {
    return null;
  }
}

