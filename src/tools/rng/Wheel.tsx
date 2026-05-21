import { useEffect, useRef, useState } from 'react';
import styles from './Wheel.module.css';

export interface WheelSegment {
  label: string;
  weight?: number;
  /** Override the segment colour; otherwise alternates with the palette. */
  colour?: string;
}

interface WheelProps {
  segments: WheelSegment[];
  /** Index of segment to land on. If null, wheel sits idle. */
  targetIndex: number | null;
  /** Called once when the spin animation completes. */
  onLanded?: (idx: number) => void;
  /** Pixel size (square). */
  size?: number;
  spinDurationMs?: number;
  /** Show labels inside each wedge. Off looks cleaner for many segments. */
  showLabels?: boolean;
}

const PALETTE = ['#E6007E', '#6B0F4C', '#1D4ED8', '#0EA5E9', '#10B981', '#F59E0B', '#A855F7', '#EC4899'];

export function Wheel({
  segments,
  targetIndex,
  onLanded,
  size = 360,
  spinDurationMs = 3600,
  showLabels = true,
}: WheelProps) {
  const [rotation, setRotation] = useState(0);
  const lastTargetRef = useRef<number | null>(null);
  const onLandedRef = useRef(onLanded);
  onLandedRef.current = onLanded;

  useEffect(() => {
    if (targetIndex == null || targetIndex === lastTargetRef.current) return;
    if (segments.length === 0) return;

    const total = segments.reduce((s, seg) => s + (seg.weight ?? 1), 0);
    // Sum weights up to (but not including) targetIndex to find segment start angle
    let cumStart = 0;
    for (let i = 0; i < targetIndex; i++) cumStart += segments[i]!.weight ?? 1;
    const segWeight = segments[targetIndex]!.weight ?? 1;

    const segStartFrac = cumStart / total;
    const segCentreFrac = segStartFrac + segWeight / total / 2;
    const centreDeg = segCentreFrac * 360;

    // Pointer is at the top (0deg). Wheel rotates clockwise. To land segment
    // centre under the pointer, we need rotation = -centreDeg (mod 360), plus
    // several full spins for drama.
    const fullSpins = 6;
    const baseRotation = fullSpins * 360 - centreDeg;
    // Keep direction monotonic for smoother CSS transitions
    const prev = rotation % 360;
    const delta = (baseRotation - prev + 720) % 360;
    const next = rotation + delta + fullSpins * 360;
    setRotation(next);
    lastTargetRef.current = targetIndex;

    const t = window.setTimeout(() => {
      onLandedRef.current?.(targetIndex);
    }, spinDurationMs + 50);

    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetIndex, segments, spinDurationMs]);

  // Build SVG paths for each segment
  const total = segments.reduce((s, seg) => s + (seg.weight ?? 1), 0);
  let cumulative = 0;
  const wedges = segments.map((seg, i) => {
    const w = seg.weight ?? 1;
    const startAngle = (cumulative / total) * 360;
    const endAngle = ((cumulative + w) / total) * 360;
    cumulative += w;

    const path = wedgePath(50, 50, 48, startAngle, endAngle);
    const labelAngle = (startAngle + endAngle) / 2;
    const labelPos = polar(50, 50, 30, labelAngle);
    const fill = seg.colour ?? PALETTE[i % PALETTE.length];

    return { i, path, label: seg.label, fill, labelAngle, labelPos };
  });

  return (
    <div className={styles.holder} style={{ width: size, height: size }}>
      <div className={styles.pointer} aria-hidden />
      <div
        className={styles.wheel}
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: `transform ${spinDurationMs}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        }}
      >
        <svg viewBox="0 0 100 100" width={size} height={size}>
          {wedges.map((w) => (
            <g key={w.i}>
              <path d={w.path} fill={w.fill} stroke="rgba(0,0,0,0.18)" strokeWidth={0.4} />
              {showLabels && segments.length <= 16 && (
                <text
                  x={w.labelPos.x}
                  y={w.labelPos.y}
                  className={styles.label}
                  textAnchor="middle"
                  dominantBaseline="central"
                  transform={`rotate(${w.labelAngle} ${w.labelPos.x} ${w.labelPos.y})`}
                >
                  {truncate(w.label, segments.length > 8 ? 10 : 18)}
                </text>
              )}
            </g>
          ))}
          <circle cx={50} cy={50} r={6} className={styles.hub} />
        </svg>
      </div>
    </div>
  );
}

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(angleRad), y: cy + r * Math.sin(angleRad) };
}

function wedgePath(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const start = polar(cx, cy, r, startDeg);
  const end = polar(cx, cy, r, endDeg);
  const largeArc = endDeg - startDeg <= 180 ? 0 : 1;
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
}

function truncate(s: string, n: number) {
  return s.length > n ? `${s.slice(0, n - 1)}…` : s;
}
