import { useMemo, useState } from 'react';
import { RotateCcw, Plus, Minus } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { usePersistedState } from '../../hooks/usePersistedState';
import common from '../common.module.css';
import styles from './NumberLine.module.css';

const PRESETS: { id: string; label: string; min: number; max: number; step: number }[] = [
  { id: '0-10', label: '0 – 10', min: 0, max: 10, step: 1 },
  { id: '0-20', label: '0 – 20', min: 0, max: 20, step: 1 },
  { id: '0-100', label: '0 – 100', min: 0, max: 100, step: 10 },
  { id: 'neg', label: '−10 – 10', min: -10, max: 10, step: 1 },
  { id: 'dec', label: '0 – 1 (0.1)', min: 0, max: 1, step: 0.1 },
];

const PALETTE = ['#E6007E', '#0EA5E9', '#10B981', '#F59E0B', '#A855F7'];

interface Marker {
  id: string;
  value: number;
  colour: string;
}

function nearestStep(value: number, min: number, step: number): number {
  const offset = value - min;
  const snapped = Math.round(offset / step) * step + min;
  return Math.round(snapped * 1e6) / 1e6; // de-noise floats
}

function fmt(v: number): string {
  if (Number.isInteger(v)) return String(v);
  return (Math.round(v * 1000) / 1000).toString();
}

export function NumberLine() {
  const [presetId, setPresetId] = usePersistedState<string>('nl.preset', '0-10');
  const [markers, setMarkers] = useState<Marker[]>([]);

  const preset = PRESETS.find((p) => p.id === presetId) ?? PRESETS[0]!;
  const { min, max, step } = preset;

  const ticks = useMemo(() => {
    const out: number[] = [];
    for (let v = min; v <= max + 1e-9; v += step) {
      out.push(Math.round(v * 1e6) / 1e6);
    }
    return out;
  }, [min, max, step]);

  function addMarker(value: number) {
    const snap = nearestStep(value, min, step);
    if (snap < min || snap > max) return;
    const colour = PALETTE[markers.length % PALETTE.length]!;
    setMarkers((prev) => [...prev, { id: crypto.randomUUID(), value: snap, colour }]);
  }

  function handleLineClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    const value = min + pct * (max - min);
    addMarker(value);
  }

  function clearMarkers() {
    setMarkers([]);
  }

  function removeMarker(id: string) {
    setMarkers((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <ToolShell
      eyebrow="Teaching Aids"
      title="Number Line"
      description="Configurable range. Click on the line to drop a marker — they snap to the nearest tick."
      actions={
        <button type="button" className={common.btn} onClick={clearMarkers} disabled={markers.length === 0}>
          <RotateCcw size={14} /> Clear markers
        </button>
      }
    >
      <div className={styles.presetRow}>
        {PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`${common.btn} ${styles.presetBtn}`}
            data-active={presetId === p.id}
            onClick={() => { setPresetId(p.id); clearMarkers(); }}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className={styles.lineWrap}>
        <div className={styles.line} onClick={handleLineClick}>
          <div className={styles.lineBar} />
          {ticks.map((v) => {
            const pct = ((v - min) / (max - min)) * 100;
            return (
              <div key={v} className={styles.tick} style={{ left: `${pct}%` }}>
                <div className={styles.tickMark} />
                <span className={styles.tickLabel}>{fmt(v)}</span>
              </div>
            );
          })}
          {markers.map((m) => {
            const pct = ((m.value - min) / (max - min)) * 100;
            return (
              <button
                key={m.id}
                type="button"
                className={styles.marker}
                style={{ left: `${pct}%`, background: m.colour, borderColor: m.colour }}
                onClick={(e) => {
                  e.stopPropagation();
                  removeMarker(m.id);
                }}
                title={`Remove ${fmt(m.value)}`}
              >
                <span className={styles.markerLabel}>{fmt(m.value)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {markers.length > 0 && (
        <div className={styles.markersList}>
          {markers.map((m) => (
            <span key={m.id} className={styles.markerChip} style={{ borderColor: m.colour, color: m.colour }}>
              <span className={styles.markerDot} style={{ background: m.colour }} />
              {fmt(m.value)}
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => removeMarker(m.id)}
                aria-label="Remove marker"
              >
                <Minus size={10} />
              </button>
            </span>
          ))}
        </div>
      )}

      <p className={styles.hint}>
        <Plus size={12} /> Click anywhere on the line to add a marker. Click a marker to remove it.
      </p>
    </ToolShell>
  );
}
