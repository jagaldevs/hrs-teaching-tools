import styles from './AustraliaMap.module.css';

export type AusRegion = 'NSW' | 'VIC' | 'QLD' | 'SA' | 'WA' | 'TAS' | 'NT' | 'ACT';

interface AustraliaMapProps {
  highlighted: AusRegion | null;
  /** The actual correct region (revealed after a guess). */
  correctRegion: AusRegion | null;
  /** When hint is active, this region pulses. */
  hint: AusRegion | null;
  onPick: (r: AusRegion) => void;
  disabled?: boolean;
}

/**
 * Stylised Australia map. Geometry is approximate — designed to be clearly
 * recognisable and clickable, not cartographically perfect.
 *
 * viewBox is 800 × 700. Regions are simple polygons covering the right rough
 * areas of the continent + Tasmania to the south.
 */
const REGIONS: { id: AusRegion; label: string; path: string; labelXY: [number, number] }[] = [
  // Western Australia — large western slab
  {
    id: 'WA',
    label: 'WA',
    path: 'M 90 200 L 90 460 L 230 530 L 380 510 L 380 360 L 360 220 L 290 140 L 200 140 L 130 150 Z',
    labelXY: [220, 360],
  },
  // Northern Territory — top-centre rectangle-ish
  {
    id: 'NT',
    label: 'NT',
    path: 'M 380 110 L 540 110 L 540 360 L 380 360 Z',
    labelXY: [460, 220],
  },
  // South Australia — south-centre wedge
  {
    id: 'SA',
    label: 'SA',
    path: 'M 380 360 L 540 360 L 580 480 L 460 530 L 380 510 Z',
    labelXY: [470, 440],
  },
  // Queensland — north-east
  {
    id: 'QLD',
    label: 'QLD',
    path: 'M 540 110 L 720 130 L 740 340 L 680 380 L 600 400 L 540 360 Z',
    labelXY: [630, 240],
  },
  // New South Wales — middle east
  {
    id: 'NSW',
    label: 'NSW',
    path: 'M 540 360 L 600 400 L 680 380 L 700 460 L 600 490 L 540 470 Z',
    labelXY: [620, 430],
  },
  // ACT — small enclave inside NSW
  {
    id: 'ACT',
    label: 'ACT',
    path: 'M 645 450 L 668 450 L 668 472 L 645 472 Z',
    labelXY: [657, 504],
  },
  // Victoria — south-east coast
  {
    id: 'VIC',
    label: 'VIC',
    path: 'M 540 470 L 600 490 L 700 460 L 680 540 L 560 540 Z',
    labelXY: [620, 510],
  },
  // Tasmania — island in the south
  {
    id: 'TAS',
    label: 'TAS',
    path: 'M 600 600 L 660 600 L 670 650 L 615 660 L 595 635 Z',
    labelXY: [630, 630],
  },
];

export function AustraliaMap({ highlighted, correctRegion, hint, onPick, disabled }: AustraliaMapProps) {
  return (
    <div className={styles.wrap}>
      <svg viewBox="0 0 800 700" className={styles.svg} role="img" aria-label="Map of Australia">
        {REGIONS.map((r) => {
          const isHighlight = highlighted === r.id;
          const isCorrect = correctRegion === r.id;
          const isWrong = highlighted === r.id && correctRegion !== null && correctRegion !== r.id;
          const isHint = hint === r.id;
          const state = isCorrect ? 'correct' : isWrong ? 'wrong' : isHighlight ? 'picked' : 'idle';
          return (
            <g key={r.id}>
              <path
                d={r.path}
                className={styles.region}
                data-state={state}
                data-hint={isHint}
                onClick={() => !disabled && onPick(r.id)}
                tabIndex={disabled ? -1 : 0}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && !disabled) onPick(r.id);
                }}
                aria-label={r.id}
                role="button"
              />
              <text
                x={r.labelXY[0]}
                y={r.labelXY[1]}
                className={styles.regionLabel}
                textAnchor="middle"
                pointerEvents="none"
              >
                {r.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
