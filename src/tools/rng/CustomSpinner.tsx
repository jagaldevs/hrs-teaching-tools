import { useMemo, useState } from 'react';
import { Loader, Plus, Trash2, Settings, X } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { Wheel } from './Wheel';
import { randomInt } from './util';
import { usePersistedState } from '../../hooks/usePersistedState';
import common from '../common.module.css';
import styles from './CustomSpinner.module.css';

interface Wedge {
  id: string;
  label: string;
  weight: number;
}

const DEFAULT_WEDGES: Wedge[] = [
  { id: '1', label: 'Ava', weight: 1 },
  { id: '2', label: 'Noah', weight: 1 },
  { id: '3', label: 'Liam', weight: 1 },
  { id: '4', label: 'Mia', weight: 1 },
  { id: '5', label: 'Zoe', weight: 1 },
  { id: '6', label: 'Ethan', weight: 1 },
];

export function CustomSpinner() {
  const [wedges, setWedges] = usePersistedState<Wedge[]>('cspinner.wedges', DEFAULT_WEDGES);
  const [removeOnLand, setRemoveOnLand] = usePersistedState<boolean>('cspinner.removeOnLand', false);
  const [target, setTarget] = useState<number | null>(null);
  const [landedLabel, setLandedLabel] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const segments = useMemo(
    () => wedges.map((w) => ({ label: w.label, weight: w.weight })),
    [wedges],
  );

  function spin() {
    if (segments.length === 0) return;
    setLandedLabel(null);
    setSpinning(true);
    setTarget(randomInt(segments.length));
  }

  function onLanded(idx: number) {
    const landed = wedges[idx];
    setLandedLabel(landed?.label ?? null);
    setSpinning(false);
    if (removeOnLand && landed) {
      setWedges((prev) => prev.filter((w) => w.id !== landed.id));
      setTarget(null);
    }
  }

  function addWedge() {
    setWedges((prev) => [
      ...prev,
      { id: crypto.randomUUID(), label: `Option ${prev.length + 1}`, weight: 1 },
    ]);
  }

  function update(id: string, patch: Partial<Wedge>) {
    setWedges((prev) => prev.map((w) => (w.id === id ? { ...w, ...patch } : w)));
  }

  function remove(id: string) {
    setWedges((prev) => prev.filter((w) => w.id !== id));
  }

  return (
    <ToolShell
      eyebrow="Randomisers"
      title="Custom Spinner"
      description="Define your own wedges with weighted segments. Great for decisions, picks and probability."
      actions={
        <button
          type="button"
          className={`${common.btn} ${editOpen ? '' : common.btnPrimary}`}
          onClick={() => setEditOpen((o) => !o)}
        >
          {editOpen ? <X size={14} /> : <Settings size={14} />}
          {editOpen ? 'Done editing' : 'Edit wedges'}
        </button>
      }
    >
      {wedges.length === 0 ? (
        <p className={styles.empty}>Add some wedges to get started.</p>
      ) : (
        <>
          <Wheel segments={segments} targetIndex={target} onLanded={onLanded} size={420} />

          <div className={styles.result}>
            {landedLabel ? (
              <span className={`font-display ${styles.resultLabel}`}>{landedLabel}</span>
            ) : (
              <span className={styles.placeholder}>Press spin</span>
            )}
          </div>
        </>
      )}

      <div className={common.controlRow}>
        <button
          type="button"
          className={`${common.btn} ${common.btnPrimary}`}
          onClick={spin}
          disabled={spinning || wedges.length === 0}
        >
          {spinning ? <Loader size={14} className={styles.spinIcon} /> : null}
          {spinning ? 'Spinning…' : 'Spin'}
        </button>
        <label className={styles.removeToggle}>
          <input
            type="checkbox"
            checked={removeOnLand}
            onChange={(e) => setRemoveOnLand(e.target.checked)}
          />
          <span>Remove on land</span>
        </label>
      </div>

      {editOpen && (
        <section className={styles.editor}>
          <header className={styles.editorHeader}>
            <p className={common.labelText}>Wedges · {wedges.length}</p>
            <button type="button" className={common.btn} onClick={addWedge}>
              <Plus size={14} /> Add
            </button>
          </header>
          <ul className={styles.editorList}>
            {wedges.map((w) => (
              <li key={w.id} className={styles.editorRow}>
                <input
                  className={styles.labelInput}
                  value={w.label}
                  onChange={(e) => update(w.id, { label: e.target.value })}
                />
                <label className={styles.weightField}>
                  <span>Weight</span>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={w.weight}
                    onChange={(e) => update(w.id, { weight: Math.max(1, Number(e.target.value) || 1) })}
                  />
                </label>
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => remove(w.id)}
                  aria-label="Remove wedge"
                >
                  <Trash2 size={14} />
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </ToolShell>
  );
}
