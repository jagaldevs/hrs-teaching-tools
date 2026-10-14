import { useEffect, useMemo } from 'react';
import { SUBJECT_COLOURS, type Subject } from './types';
import {
  YEAR_BANDS,
  HRS_CLASSES,
  classesForBand,
  findClass,
  isSelectable,
  type YearBand,
} from '../data/classes';
import { usePersistedState } from '../hooks/usePersistedState';
import styles from './GameShell.module.css';

/**
 * Persisted class selection for a picker, with a sensible default and a
 * self-heal when the stored class is no longer offered (removed, hidden
 * for lack of content, or outside `bands`).
 *
 * Default: the first anchored class (whose subject is in `subjects`, if
 * given) across `bands`, else the first selectable class.
 */
export function useClassSelection(
  storageKey: string,
  bands: YearBand[],
  subjects?: readonly Subject[],
): [string, (id: string) => void] {
  const defaultClassId = useMemo(() => {
    for (const band of bands) {
      const anchored = classesForBand(band).find(
        (c) => c.anchored && (subjects?.includes(c.subject) ?? true),
      );
      if (anchored) return anchored.id;
    }
    for (const band of bands) {
      const first = classesForBand(band)[0];
      if (first) return first.id;
    }
    return HRS_CLASSES.find(isSelectable)?.id ?? '';
  }, [bands, subjects]);

  const [classId, setClassId] = usePersistedState<string>(`${storageKey}.classId`, defaultClassId);

  useEffect(() => {
    const klass = findClass(classId);
    if (!klass || !isSelectable(klass) || !bands.includes(klass.yearBand)) {
      setClassId(defaultClassId);
    }
  }, [classId, defaultClassId, bands, setClassId]);

  return [classId, setClassId];
}

interface ClassPickerProps {
  /** Year bands to offer, in YEAR_BANDS order. */
  bands: YearBand[];
  /** Currently selected HRS class id. */
  classId: string;
  onChange: (classId: string) => void;
  /**
   * Show the class dropdown. When false only the year-band row renders;
   * changing band still picks a sensible class so `classId` stays valid.
   */
  showClassSelect?: boolean;
}

/**
 * Year-band chips + class dropdown, shared by the brain-break SetupScreen
 * and the Question Generator tool. Only selectable classes are offered
 * (see isSelectable in data/classes.ts); anchored classes are pinned to
 * the top of the dropdown.
 */
export function ClassPicker({ bands, classId, onChange, showClassSelect = true }: ClassPickerProps) {
  const currentClass = findClass(classId);
  const currentBand = currentClass?.yearBand ?? bands[0]!;

  function pickBand(band: YearBand) {
    const classes = classesForBand(band);
    if (classes.length === 0) return;
    // Try to keep the same subject if the new band has it.
    const sameSubject = classes.find((c) => c.subject === currentClass?.subject);
    onChange((sameSubject ?? classes[0]!).id);
  }

  const yearBandObjs = YEAR_BANDS.filter((b) => bands.includes(b.id));
  const classesInBand = classesForBand(currentBand);
  const anchoredClasses = classesInBand.filter((c) => c.anchored);
  const otherClasses = classesInBand.filter((c) => !c.anchored);

  return (
    <>
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

      {showClassSelect && (
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
              onChange={(e) => onChange(e.target.value)}
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
    </>
  );
}
