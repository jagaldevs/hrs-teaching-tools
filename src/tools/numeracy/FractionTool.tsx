import { Plus, Minus } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { usePersistedState } from '../../hooks/usePersistedState';
import common from '../common.module.css';
import styles from './FractionTool.module.css';

function gcd(a: number, b: number): number {
  while (b) [a, b] = [b, a % b];
  return Math.abs(a) || 1;
}

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number): string {
  if (endDeg - startDeg >= 360 - 1e-9) {
    // full circle
    return `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx} ${cy + r} A ${r} ${r} 0 1 1 ${cx} ${cy - r} Z`;
  }
  const start = polar(cx, cy, r, startDeg);
  const end = polar(cx, cy, r, endDeg);
  const largeArc = endDeg - startDeg <= 180 ? 0 : 1;
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
}

/** Largest denominator drawn (more slices than this are unreadable). */
const MAX_DEN = 20;
/** Improper fractions are drawn up to this many wholes. */
const MAX_WHOLES = 3;

export function FractionTool() {
  const [numerator, setNumerator] = usePersistedState<number>('fract.num', 3);
  const [denominator, setDenominator] = usePersistedState<number>('fract.den', 4);

  const safeDen = Math.max(1, Math.min(MAX_DEN, denominator));
  const maxNum = safeDen * MAX_WHOLES;
  const safeNum = Math.max(0, Math.min(numerator, maxNum));

  const wholePart = Math.floor(safeNum / safeDen);
  const fracPart = safeNum % safeDen;
  const isImproper = safeNum > safeDen;

  const decimal = safeNum / safeDen;
  const percent = decimal * 100;

  const g = gcd(safeNum, safeDen);
  const simplified = safeDen / g === 1 ? `${safeNum / g}` : `${safeNum / g}/${safeDen / g}`;
  const mixed = isImproper && fracPart > 0 ? `${wholePart} ${fracPart}/${safeDen}` : null;

  function setNum(n: number) {
    setNumerator(Math.max(0, Math.min(maxNum, n)));
  }

  function setDen(d: number) {
    const next = Math.max(1, Math.min(MAX_DEN, d));
    setDenominator(next);
    if (safeNum > next * MAX_WHOLES) setNumerator(next * MAX_WHOLES);
  }

  // For circle visualization: if improper, we draw one circle per whole
  const circles = Math.ceil(safeNum / safeDen);

  // For bar visualization: one bar per whole
  const bars = Math.max(1, Math.ceil(safeNum / safeDen));

  // Number line: 0 to next-whole-up
  const lineMax = Math.max(1, Math.ceil(safeNum / safeDen));
  const linePct = (decimal / lineMax) * 100;

  return (
    <ToolShell
      eyebrow="Teaching Aids"
      title="Fraction Tool"
      description="See any fraction as a circle, bar and on a number line — all at once."
    >
      <div className={styles.controls}>
        <div className={styles.stepper}>
          <button type="button" className={styles.stepBtn} onClick={() => setNum(safeNum - 1)} disabled={safeNum === 0} aria-label="Decrease numerator">
            <Minus size={14} />
          </button>
          <input
            type="text"
            inputMode="numeric"
            value={safeNum}
            onChange={(e) => setNum(Number(e.target.value) || 0)}
            className={styles.numInput}
            aria-label="Numerator"
          />
          <button type="button" className={styles.stepBtn} onClick={() => setNum(safeNum + 1)} disabled={safeNum >= maxNum} aria-label="Increase numerator">
            <Plus size={14} />
          </button>
        </div>
        <span className={styles.fracBar} />
        <div className={styles.stepper}>
          <button type="button" className={styles.stepBtn} onClick={() => setDen(safeDen - 1)} disabled={safeDen <= 1} aria-label="Decrease denominator">
            <Minus size={14} />
          </button>
          <input
            type="text"
            inputMode="numeric"
            value={safeDen}
            onChange={(e) => setDen(Number(e.target.value) || 1)}
            className={styles.numInput}
            aria-label="Denominator"
          />
          <button type="button" className={styles.stepBtn} onClick={() => setDen(safeDen + 1)} disabled={safeDen >= MAX_DEN} aria-label="Increase denominator">
            <Plus size={14} />
          </button>
        </div>
      </div>
      <p className={styles.limits}>
        Denominator 1–{MAX_DEN} · improper fractions up to {MAX_WHOLES} wholes
      </p>

      <div className={styles.summary}>
        <Card label="Decimal" value={Math.round(decimal * 10000) / 10000} />
        <Card label="Percent" value={`${Math.round(percent * 100) / 100}%`} />
        <Card label="Simplified" value={simplified} />
        {mixed && <Card label="Mixed number" value={mixed} />}
      </div>

      <h3 className={styles.vizTitle}>Circle</h3>
      <div className={styles.circleRow}>
        {Array.from({ length: circles }).map((_, ci) => {
          const slicesThisCircle = ci === circles - 1 ? safeNum - safeDen * ci : safeDen;
          const filledFraction = Math.min(1, slicesThisCircle / safeDen);
          return (
            <svg key={ci} viewBox="0 0 100 100" className={styles.circle}>
              {/* slice borders */}
              {Array.from({ length: safeDen }).map((_, i) => {
                const startDeg = (i / safeDen) * 360;
                const endDeg = ((i + 1) / safeDen) * 360;
                const filled = i < slicesThisCircle;
                return (
                  <path
                    key={i}
                    d={arcPath(50, 50, 48, startDeg, endDeg)}
                    className={filled ? styles.sliceFilled : styles.sliceEmpty}
                  />
                );
              })}
              <circle cx={50} cy={50} r={48} className={styles.circleOutline} />
              <text x={50} y={54} textAnchor="middle" className={styles.circleLabel}>
                {Math.round(filledFraction * safeDen)}/{safeDen}
              </text>
            </svg>
          );
        })}
      </div>

      <h3 className={styles.vizTitle}>Bar</h3>
      <div className={styles.barWrap}>
        {Array.from({ length: bars }).map((_, bi) => {
          const slicesThisBar = bi === bars - 1 ? safeNum - safeDen * bi : safeDen;
          return (
            <div key={bi} className={styles.bar}>
              {Array.from({ length: safeDen }).map((_, i) => (
                <div key={i} className={i < slicesThisBar ? styles.barCellFilled : styles.barCellEmpty} />
              ))}
            </div>
          );
        })}
      </div>

      <h3 className={styles.vizTitle}>Number line (0 to {lineMax})</h3>
      <div className={styles.lineWrap}>
        <div className={styles.line}>
          <div className={styles.lineBar} />
          {Array.from({ length: lineMax * safeDen + 1 }).map((_, i) => {
            const value = i / safeDen;
            const pct = (value / lineMax) * 100;
            const isWhole = i % safeDen === 0;
            return (
              <div
                key={i}
                className={styles.tick}
                style={{ left: `${pct}%` }}
              >
                <div className={isWhole ? styles.tickWhole : styles.tickSmall} />
                {isWhole && <span className={styles.tickLabel}>{value}</span>}
              </div>
            );
          })}
          <div
            className={styles.marker}
            style={{ left: `${linePct}%` }}
            title={simplified}
          >
            <span className={styles.markerLabel}>{simplified}</span>
          </div>
        </div>
      </div>
    </ToolShell>
  );
}

function Card({ label, value }: { label: string; value: string | number }) {
  return (
    <div className={styles.summaryCard}>
      <span className={common.labelText}>{label}</span>
      <span className={`font-display ${styles.summaryValue}`}>{value}</span>
    </div>
  );
}
