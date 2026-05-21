import { useState } from 'react';
import { X as XIcon } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { usePersistedState } from '../../hooks/usePersistedState';
import common from '../common.module.css';
import styles from './WorldMap.module.css';

/**
 * World Map — stylised clickable continents.
 *
 * Geometry is intentionally schematic, not cartographic. The viewBox is 1000×500;
 * each continent is a single polygon roughly positioned where it belongs. Designed
 * to be recognisable and clickable at any size, not survey-accurate.
 */

type Continent = 'NA' | 'SA' | 'EU' | 'AF' | 'AS' | 'OC' | 'AN';

interface ContinentInfo {
  id: Continent;
  name: string;
  /** Area in km², rounded to nearest 10,000. */
  areaKm2: number;
  /** Population in millions (approx. 2024). */
  populationM: number;
  countries: number;
  /** Highest peak. */
  highestPeak: string;
  /** A short interesting fact. */
  fact: string;
  /** SVG polygon path. */
  path: string;
  /** Centroid for text label, in viewBox coords. */
  labelXY: [number, number];
  colour: string;
}

const CONTINENTS: ContinentInfo[] = [
  {
    id: 'NA',
    name: 'North America',
    areaKm2: 24_710_000,
    populationM: 593,
    countries: 23,
    highestPeak: 'Denali, USA (6,190 m)',
    fact: 'Home to the Great Lakes — the largest freshwater system on Earth.',
    colour: '#E6007E',
    path: 'M 60 60 L 220 50 L 280 80 L 290 140 L 250 200 L 200 220 L 170 250 L 130 250 L 90 200 L 70 140 Z',
    labelXY: [165, 145],
  },
  {
    id: 'SA',
    name: 'South America',
    areaKm2: 17_840_000,
    populationM: 442,
    countries: 12,
    highestPeak: 'Aconcagua, Argentina (6,961 m)',
    fact: 'Contains the Amazon — the largest tropical rainforest on Earth.',
    colour: '#10B981',
    path: 'M 200 270 L 270 270 L 290 320 L 280 390 L 240 440 L 210 460 L 180 420 L 175 350 Z',
    labelXY: [230, 360],
  },
  {
    id: 'EU',
    name: 'Europe',
    areaKm2: 10_180_000,
    populationM: 745,
    countries: 44,
    highestPeak: 'Mt Elbrus, Russia (5,642 m)',
    fact: 'The smallest continent by land area apart from Australia/Oceania.',
    colour: '#0EA5E9',
    path: 'M 470 80 L 590 70 L 620 110 L 595 165 L 540 175 L 490 165 L 460 130 Z',
    labelXY: [535, 125],
  },
  {
    id: 'AF',
    name: 'Africa',
    areaKm2: 30_370_000,
    populationM: 1450,
    countries: 54,
    highestPeak: 'Kilimanjaro, Tanzania (5,895 m)',
    fact: 'The Sahara is the world’s largest hot desert — about the size of the USA.',
    colour: '#F59E0B',
    path: 'M 480 200 L 600 200 L 640 260 L 620 360 L 555 430 L 500 410 L 475 320 L 470 240 Z',
    labelXY: [550, 310],
  },
  {
    id: 'AS',
    name: 'Asia',
    areaKm2: 44_580_000,
    populationM: 4750,
    countries: 49,
    highestPeak: 'Mt Everest, Nepal/China (8,849 m)',
    fact: 'The largest continent — home to roughly 60% of the world’s people.',
    colour: '#A855F7',
    path: 'M 620 60 L 880 60 L 920 130 L 895 220 L 800 240 L 720 220 L 660 200 L 640 130 Z',
    labelXY: [780, 145],
  },
  {
    id: 'OC',
    name: 'Oceania',
    areaKm2: 8_510_000,
    populationM: 46,
    countries: 14,
    highestPeak: 'Puncak Jaya, Indonesia (4,884 m)',
    fact: 'Australia is both a country and a continent — the only place with that distinction.',
    colour: '#FB7185',
    path: 'M 800 320 L 920 320 L 940 380 L 880 420 L 810 410 L 790 370 Z',
    labelXY: [865, 370],
  },
  {
    id: 'AN',
    name: 'Antarctica',
    areaKm2: 14_200_000,
    populationM: 0,
    countries: 0,
    highestPeak: 'Vinson Massif (4,892 m)',
    fact: 'No permanent population — only research stations from around 30 nations.',
    colour: '#22D3EE',
    path: 'M 100 470 L 900 470 L 880 490 L 120 490 Z',
    labelXY: [500, 482],
  },
];

const FILTERS: { id: 'all' | keyof Pick<ContinentInfo, 'populationM' | 'areaKm2' | 'countries'>; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'populationM', label: 'Sort by population' },
  { id: 'areaKm2', label: 'Sort by area' },
  { id: 'countries', label: 'Sort by # countries' },
];

export function WorldMap() {
  const [selected, setSelected] = useState<Continent | null>(null);
  const [sortBy, setSortBy] = usePersistedState<(typeof FILTERS)[number]['id']>(
    'worldmap.sort',
    'all',
  );

  const ranked = (() => {
    if (sortBy === 'all') return [...CONTINENTS];
    return [...CONTINENTS].sort((a, b) => (b[sortBy] as number) - (a[sortBy] as number));
  })();

  const sel = selected ? CONTINENTS.find((c) => c.id === selected) ?? null : null;

  return (
    <ToolShell
      eyebrow="Teaching Aids"
      title="World Map"
      description="Click a continent for facts. Schematic, not cartographic — designed for clarity."
    >
      <div className={styles.filters}>
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            className={`${common.btn} ${styles.filterBtn}`}
            data-active={sortBy === f.id}
            onClick={() => setSortBy(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className={styles.mapWrap}>
        <svg viewBox="0 0 1000 500" className={styles.map}>
          {/* Ocean backdrop */}
          <rect width={1000} height={500} className={styles.ocean} />

          {CONTINENTS.map((c) => {
            const isSelected = selected === c.id;
            return (
              <g key={c.id}>
                <path
                  d={c.path}
                  className={styles.continent}
                  data-selected={isSelected}
                  style={{ fill: c.colour }}
                  onClick={() => setSelected(c.id)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setSelected(c.id);
                  }}
                  aria-label={c.name}
                  role="button"
                />
                <text
                  x={c.labelXY[0]}
                  y={c.labelXY[1]}
                  className={styles.continentLabel}
                  textAnchor="middle"
                  pointerEvents="none"
                >
                  {c.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {sel && (
        <aside className={styles.detail} style={{ borderColor: sel.colour }}>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => setSelected(null)}
            aria-label="Close details"
          >
            <XIcon size={14} />
          </button>
          <h2 className={`font-display ${styles.detailTitle}`} style={{ color: sel.colour }}>
            {sel.name}
          </h2>
          <dl className={styles.statGrid}>
            <div className={styles.statCell}>
              <dt>Area</dt>
              <dd>{(sel.areaKm2 / 1_000_000).toFixed(2)} M km²</dd>
            </div>
            <div className={styles.statCell}>
              <dt>Population</dt>
              <dd>{sel.populationM === 0 ? 'No permanent population' : `~ ${sel.populationM.toLocaleString()} M`}</dd>
            </div>
            <div className={styles.statCell}>
              <dt>Countries</dt>
              <dd>{sel.countries === 0 ? '—' : sel.countries}</dd>
            </div>
            <div className={styles.statCell}>
              <dt>Highest peak</dt>
              <dd>{sel.highestPeak}</dd>
            </div>
          </dl>
          <p className={styles.fact}>{sel.fact}</p>
        </aside>
      )}

      <section className={styles.rank}>
        <h3 className={styles.rankTitle}>
          {sortBy === 'all'
            ? 'Continents at a glance'
            : sortBy === 'populationM'
              ? 'Largest by population'
              : sortBy === 'areaKm2'
                ? 'Largest by area'
                : 'Most countries'}
        </h3>
        <ol className={styles.rankList}>
          {ranked.map((c, i) => (
            <li
              key={c.id}
              className={styles.rankRow}
              onClick={() => setSelected(c.id)}
              data-selected={selected === c.id}
              style={{ ['--row-colour' as string]: c.colour }}
            >
              <span className={styles.rankNum}>{i + 1}</span>
              <span className={styles.rankDot} style={{ background: c.colour }} />
              <span className={styles.rankName}>{c.name}</span>
              <span className={styles.rankValue}>
                {sortBy === 'populationM' && (c.populationM === 0 ? '—' : `${c.populationM.toLocaleString()} M`)}
                {sortBy === 'areaKm2' && `${(c.areaKm2 / 1_000_000).toFixed(2)} M km²`}
                {sortBy === 'countries' && (c.countries === 0 ? '—' : c.countries)}
                {sortBy === 'all' && c.countries + ' countries'}
              </span>
            </li>
          ))}
        </ol>
      </section>
    </ToolShell>
  );
}
