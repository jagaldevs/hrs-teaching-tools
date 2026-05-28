import { useMemo, useRef, useState } from 'react';
import { Trash2, RotateCcw, Spline, Pencil } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { usePersistedState } from '../../hooks/usePersistedState';
import common from '../common.module.css';
import styles from './CartesianPlane.module.css';

/**
 * Cartesian Plane — click to plot points; toggle "lines" mode to connect them in order.
 *  - Configurable ranges via presets.
 *  - Snap toggle (off = pixel-precise, on = snap to integer grid).
 *  - Points get a colour rotation so each is distinct.
 */

interface Point {
  id: string;
  x: number;
  y: number;
  colour: string;
}

const PALETTE = ['#A2235F', '#0EA5E9', '#10B981', '#F59E0B', '#A855F7', '#EF4444', '#FB7185', '#22D3EE'];

const PRESETS: { id: string; label: string; min: number; max: number }[] = [
  { id: '5', label: '−5 to 5', min: -5, max: 5 },
  { id: '10', label: '−10 to 10', min: -10, max: 10 },
  { id: '20', label: '−20 to 20', min: -20, max: 20 },
  { id: 'q1', label: 'Quadrant 1 (0–10)', min: 0, max: 10 },
];

type Mode = 'plot' | 'lines';

const SIZE = 540;

export function CartesianPlane() {
  const [presetId, setPresetId] = usePersistedState<string>('cart.preset', '10');
  const [snap, setSnap] = usePersistedState<boolean>('cart.snap', true);
  const [mode, setMode] = usePersistedState<Mode>('cart.mode', 'plot');
  const [points, setPoints] = useState<Point[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);

  const preset = PRESETS.find((p) => p.id === presetId) ?? PRESETS[1]!;
  const { min, max } = preset;

  /** Convert chart coords → SVG viewBox coords. */
  function toSvg(x: number, y: number): { sx: number; sy: number } {
    const fx = (x - min) / (max - min);
    const fy = (y - min) / (max - min);
    return { sx: fx * SIZE, sy: SIZE - fy * SIZE };
  }

  /** Convert pointer event → chart coords. */
  function fromEvent(e: React.MouseEvent<SVGSVGElement>): { x: number; y: number } {
    const svg = e.currentTarget;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const local = pt.matrixTransform(ctm.inverse());
    const fx = local.x / SIZE;
    const fy = 1 - local.y / SIZE;
    let x = min + fx * (max - min);
    let y = min + fy * (max - min);
    if (snap) {
      x = Math.round(x);
      y = Math.round(y);
    } else {
      x = Math.round(x * 100) / 100;
      y = Math.round(y * 100) / 100;
    }
    return { x, y };
  }

  function addPoint(e: React.MouseEvent<SVGSVGElement>) {
    const { x, y } = fromEvent(e);
    if (x < min || x > max || y < min || y > max) return;
    setPoints((prev) => [
      ...prev,
      { id: crypto.randomUUID(), x, y, colour: PALETTE[prev.length % PALETTE.length]! },
    ]);
  }

  function removePoint(id: string) {
    setPoints((prev) => prev.filter((p) => p.id !== id));
  }

  function clearAll() {
    setPoints([]);
  }

  // Grid ticks — integer marks every 1 (or every 2 if range > 20)
  const tickStep = (max - min) > 24 ? 2 : 1;
  const ticks = useMemo(() => {
    const out: number[] = [];
    for (let v = Math.ceil(min); v <= Math.floor(max); v += tickStep) out.push(v);
    return out;
  }, [min, max, tickStep]);

  return (
    <ToolShell
      eyebrow="Teaching Aids"
      title="Cartesian Plane"
      description="Click to plot points. Toggle Lines mode to connect them in the order they were added."
      actions={
        <button type="button" className={common.btn} onClick={clearAll} disabled={points.length === 0}>
          <RotateCcw size={14} /> Clear
        </button>
      }
    >
      <div className={styles.toolbar}>
        <div className={styles.tools}>
          <button
            type="button"
            className={`${common.btn} ${styles.toolBtn}`}
            data-active={mode === 'plot'}
            onClick={() => setMode('plot')}
          >
            <Pencil size={14} /> Plot
          </button>
          <button
            type="button"
            className={`${common.btn} ${styles.toolBtn}`}
            data-active={mode === 'lines'}
            onClick={() => setMode('lines')}
          >
            <Spline size={14} /> Lines
          </button>
        </div>

        <div className={styles.presets}>
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`${common.btn} ${styles.presetBtn}`}
              data-active={presetId === p.id}
              onClick={() => setPresetId(p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>

        <label className={styles.snapToggle}>
          <input type="checkbox" checked={snap} onChange={(e) => setSnap(e.target.checked)} />
          Snap to integers
        </label>
      </div>

      <div className={styles.planeWrap}>
        <svg
          ref={svgRef}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className={styles.plane}
          onClick={addPoint}
        >
          {/* Grid lines */}
          {ticks.map((v) => {
            const { sx } = toSvg(v, 0);
            return (
              <line
                key={`vg-${v}`}
                x1={sx}
                y1={0}
                x2={sx}
                y2={SIZE}
                className={v === 0 ? styles.axis : styles.gridLine}
              />
            );
          })}
          {ticks.map((v) => {
            const { sy } = toSvg(0, v);
            return (
              <line
                key={`hg-${v}`}
                x1={0}
                y1={sy}
                x2={SIZE}
                y2={sy}
                className={v === 0 ? styles.axis : styles.gridLine}
              />
            );
          })}

          {/* Axis tick labels */}
          {ticks.map((v) => {
            if (v === 0) return null;
            const { sx } = toSvg(v, 0);
            const { sy } = toSvg(0, 0);
            return (
              <text key={`lx-${v}`} x={sx} y={sy + 14} className={styles.tickLabel} textAnchor="middle">
                {v}
              </text>
            );
          })}
          {ticks.map((v) => {
            if (v === 0) return null;
            const { sy } = toSvg(0, v);
            const { sx } = toSvg(0, 0);
            return (
              <text key={`ly-${v}`} x={sx - 8} y={sy + 4} className={styles.tickLabel} textAnchor="end">
                {v}
              </text>
            );
          })}

          {/* Origin label */}
          {(() => {
            const { sx, sy } = toSvg(0, 0);
            if (sx < 0 || sx > SIZE || sy < 0 || sy > SIZE) return null;
            return (
              <text x={sx - 8} y={sy + 14} className={styles.tickLabel} textAnchor="end">
                0
              </text>
            );
          })()}

          {/* Lines between points */}
          {mode === 'lines' && points.length >= 2 && (
            <polyline
              points={points
                .map((p) => {
                  const { sx, sy } = toSvg(p.x, p.y);
                  return `${sx},${sy}`;
                })
                .join(' ')}
              className={styles.pathLine}
            />
          )}

          {/* Points */}
          {points.map((p) => {
            const { sx, sy } = toSvg(p.x, p.y);
            return (
              <g
                key={p.id}
                className={styles.pointGroup}
                onClick={(e) => {
                  e.stopPropagation();
                  removePoint(p.id);
                }}
              >
                <circle cx={sx} cy={sy} r={6} fill={p.colour} stroke="#fff" strokeWidth={1.5} />
                <text x={sx + 9} y={sy - 7} className={styles.pointLabel}>
                  ({p.x}, {p.y})
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {points.length > 0 && (
        <div className={styles.pointsList}>
          {points.map((p, i) => (
            <span
              key={p.id}
              className={styles.pointChip}
              style={{ borderColor: p.colour, color: p.colour }}
            >
              <span className={styles.pointDot} style={{ background: p.colour }} />
              P{i + 1}: ({p.x}, {p.y})
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => removePoint(p.id)}
                aria-label="Remove point"
              >
                <Trash2 size={10} />
              </button>
            </span>
          ))}
        </div>
      )}
    </ToolShell>
  );
}
