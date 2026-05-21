import { useCallback, useEffect, useRef } from 'react';
import { Ruler, Triangle, RotateCw, Eye, EyeOff } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { usePersistedState } from '../../hooks/usePersistedState';
import common from '../common.module.css';
import styles from './RulerProtractor.module.css';

/**
 * Draggable on-screen ruler + protractor. Designed to be projected over a worksheet
 * or diagram. Each instrument can be dragged anywhere, rotated, and toggled.
 *
 * The "stage" is a fixed-aspect surface (1100×700) that scales to the viewport.
 * Coordinates are stored in stage units, not pixels.
 */

interface InstrumentState {
  /** Centre x in stage units. */
  cx: number;
  cy: number;
  rotation: number;
  visible: boolean;
}

const STAGE_W = 1100;
const STAGE_H = 700;

// 1 stage-unit = 1mm. Ruler is 200mm long.
const RULER_LEN_MM = 200;
const RULER_HEIGHT_MM = 40;

// Protractor radius in mm.
const PROTRACTOR_R = 130;

export function RulerProtractor() {
  const [ruler, setRuler] = usePersistedState<InstrumentState>('rp.ruler', {
    cx: 250,
    cy: 280,
    rotation: 0,
    visible: true,
  });
  const [protractor, setProtractor] = usePersistedState<InstrumentState>('rp.protractor', {
    cx: 750,
    cy: 380,
    rotation: 0,
    visible: true,
  });
  const stageRef = useRef<HTMLDivElement>(null);

  return (
    <ToolShell
      eyebrow="Teaching Aids"
      title="Ruler & Protractor"
      description="Drag, rotate and overlay measuring instruments. Useful with a projected diagram or worksheet."
      actions={
        <>
          <button
            type="button"
            className={common.btn}
            onClick={() => setRuler((r) => ({ ...r, visible: !r.visible }))}
          >
            {ruler.visible ? <EyeOff size={14} /> : <Eye size={14} />} Ruler
          </button>
          <button
            type="button"
            className={common.btn}
            onClick={() => setProtractor((p) => ({ ...p, visible: !p.visible }))}
          >
            {protractor.visible ? <EyeOff size={14} /> : <Eye size={14} />} Protractor
          </button>
        </>
      }
    >
      <p className={styles.hint}>
        Drag the body to move • Drag the handle <RotateCw size={12} /> to rotate
      </p>

      <div className={styles.stageWrap}>
        <div ref={stageRef} className={styles.stage}>
          <svg
            viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
            preserveAspectRatio="xMidYMid meet"
            className={styles.stageSvg}
          >
            {/* Faint grid backdrop so instruments have something to align against */}
            <defs>
              <pattern id="rp-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
              </pattern>
            </defs>
            <rect width={STAGE_W} height={STAGE_H} fill="url(#rp-grid)" className={styles.gridBg} />

            {ruler.visible && (
              <RulerInstrument state={ruler} setState={setRuler} stageRef={stageRef} />
            )}
            {protractor.visible && (
              <ProtractorInstrument state={protractor} setState={setProtractor} stageRef={stageRef} />
            )}
          </svg>
        </div>
      </div>

      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <Ruler size={14} /> Ruler — 0–200 mm with 1 mm ticks
        </span>
        <span className={styles.legendItem}>
          <Triangle size={14} /> Protractor — 0–180° with 1° ticks
        </span>
      </div>
    </ToolShell>
  );
}

/** Shared drag-handle helper — converts pointer events into stage coordinates. */
function useDragHandlers(
  state: InstrumentState,
  setState: (updater: (prev: InstrumentState) => InstrumentState) => void,
  stageRef: React.RefObject<HTMLDivElement>,
) {
  const dragMode = useRef<'move' | 'rotate' | null>(null);
  const startCoords = useRef<{ x: number; y: number } | null>(null);
  const startState = useRef<InstrumentState | null>(null);

  function clientToStage(clientX: number, clientY: number) {
    const stage = stageRef.current;
    if (!stage) return { x: 0, y: 0 };
    const rect = stage.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * STAGE_W,
      y: ((clientY - rect.top) / rect.height) * STAGE_H,
    };
  }

  const onMove = useCallback(
    (e: PointerEvent) => {
      if (!dragMode.current || !startCoords.current || !startState.current) return;
      const cur = clientToStage(e.clientX, e.clientY);
      if (dragMode.current === 'move') {
        const dx = cur.x - startCoords.current.x;
        const dy = cur.y - startCoords.current.y;
        setState(() => ({
          ...startState.current!,
          cx: startState.current!.cx + dx,
          cy: startState.current!.cy + dy,
        }));
      } else {
        // rotate
        const dx = cur.x - startState.current.cx;
        const dy = cur.y - startState.current.cy;
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        setState(() => ({ ...startState.current!, rotation: angle }));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setState],
  );

  const onUp = useCallback(() => {
    dragMode.current = null;
    startCoords.current = null;
    startState.current = null;
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
  }, [onMove]);

  function beginDrag(e: React.PointerEvent, mode: 'move' | 'rotate') {
    e.stopPropagation();
    dragMode.current = mode;
    startCoords.current = clientToStage(e.clientX, e.clientY);
    startState.current = state;
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }

  useEffect(() => {
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [onMove, onUp]);

  return { beginDrag };
}

interface InstrumentProps {
  state: InstrumentState;
  setState: (updater: (prev: InstrumentState) => InstrumentState) => void;
  stageRef: React.RefObject<HTMLDivElement>;
}

function RulerInstrument({ state, setState, stageRef }: InstrumentProps) {
  const { beginDrag } = useDragHandlers(state, setState, stageRef);

  // Ruler drawn horizontally centred on (0,0) before rotation.
  const halfL = RULER_LEN_MM / 2;
  const halfH = RULER_HEIGHT_MM / 2;

  return (
    <g
      transform={`translate(${state.cx} ${state.cy}) rotate(${state.rotation})`}
      className={styles.rulerGroup}
    >
      {/* Body — drag to move */}
      <rect
        x={-halfL}
        y={-halfH}
        width={RULER_LEN_MM}
        height={RULER_HEIGHT_MM}
        className={styles.rulerBody}
        onPointerDown={(e) => beginDrag(e, 'move')}
      />

      {/* mm ticks (every 1mm) — short. 5mm marks medium. 10mm marks tall + labelled */}
      {Array.from({ length: RULER_LEN_MM + 1 }).map((_, i) => {
        const isTen = i % 10 === 0;
        const isFive = i % 5 === 0;
        const x = -halfL + i;
        const tickH = isTen ? 14 : isFive ? 9 : 5;
        return (
          <line
            key={i}
            x1={x}
            y1={-halfH}
            x2={x}
            y2={-halfH + tickH}
            className={styles.tick}
          />
        );
      })}

      {/* cm labels */}
      {Array.from({ length: RULER_LEN_MM / 10 + 1 }).map((_, i) => {
        const x = -halfL + i * 10;
        return (
          <text
            key={i}
            x={x}
            y={-halfH + 26}
            textAnchor="middle"
            className={styles.rulerLabel}
          >
            {i}
          </text>
        );
      })}

      {/* Unit label */}
      <text x={halfL - 14} y={halfH - 5} textAnchor="end" className={styles.unitLabel}>
        cm
      </text>

      {/* Rotation handle */}
      <g
        transform={`translate(${halfL + 14}, 0)`}
        onPointerDown={(e) => beginDrag(e, 'rotate')}
        className={styles.handle}
      >
        <circle r={9} className={styles.handleCircle} />
        <path d="M -3 -1.5 L 0 -4.5 L 3 -1.5 M 0 -4.5 L 0 4.5 M -3 1.5 L 0 4.5 L 3 1.5" className={styles.handleIcon} />
      </g>
    </g>
  );
}

function ProtractorInstrument({ state, setState, stageRef }: InstrumentProps) {
  const { beginDrag } = useDragHandlers(state, setState, stageRef);

  const r = PROTRACTOR_R;

  return (
    <g
      transform={`translate(${state.cx} ${state.cy}) rotate(${state.rotation})`}
      className={styles.protractorGroup}
    >
      {/* Body — semicircle facing up */}
      <path
        d={`M ${-r} 0 A ${r} ${r} 0 0 1 ${r} 0 L ${-r} 0 Z`}
        className={styles.protractorBody}
        onPointerDown={(e) => beginDrag(e, 'move')}
      />

      {/* Inner cutout for "transparency" feel */}
      <path
        d={`M ${-r + 18} 0 A ${r - 18} ${r - 18} 0 0 1 ${r - 18} 0 L ${-r + 18} 0 Z`}
        className={styles.protractorInner}
      />

      {/* Degree ticks every 1° */}
      {Array.from({ length: 181 }).map((_, deg) => {
        const a = (deg * Math.PI) / 180;
        const x1 = Math.cos(Math.PI - a) * r;
        const y1 = -Math.sin(Math.PI - a) * r;
        const isTen = deg % 10 === 0;
        const isFive = deg % 5 === 0;
        const tickL = isTen ? 10 : isFive ? 6 : 3;
        const x2 = Math.cos(Math.PI - a) * (r - tickL);
        const y2 = -Math.sin(Math.PI - a) * (r - tickL);
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} className={styles.tick} />;
      })}

      {/* Degree labels every 10° */}
      {Array.from({ length: 19 }).map((_, i) => {
        const deg = i * 10;
        const a = (deg * Math.PI) / 180;
        const lx = Math.cos(Math.PI - a) * (r - 22);
        const ly = -Math.sin(Math.PI - a) * (r - 22);
        return (
          <text
            key={i}
            x={lx}
            y={ly + 3}
            textAnchor="middle"
            className={styles.protractorLabel}
          >
            {deg}
          </text>
        );
      })}

      {/* Centre cross */}
      <line x1={-5} y1={0} x2={5} y2={0} className={styles.centreMark} />
      <line x1={0} y1={-5} x2={0} y2={5} className={styles.centreMark} />
      <circle cx={0} cy={0} r={3} className={styles.centreDot} />

      {/* Baseline */}
      <line x1={-r} y1={0} x2={r} y2={0} className={styles.baseline} />

      {/* Rotation handle below the baseline */}
      <g
        transform={`translate(0, 18)`}
        onPointerDown={(e) => beginDrag(e, 'rotate')}
        className={styles.handle}
      >
        <circle r={9} className={styles.handleCircle} />
        <path d="M -3 -1.5 L 0 -4.5 L 3 -1.5 M 0 -4.5 L 0 4.5 M -3 1.5 L 0 4.5 L 3 1.5" className={styles.handleIcon} />
      </g>
    </g>
  );
}
