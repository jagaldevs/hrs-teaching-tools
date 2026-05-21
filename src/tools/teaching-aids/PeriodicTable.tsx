import { useState } from 'react';
import { X as XIcon } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import {
  ELEMENTS,
  CATEGORY_LABELS,
  CATEGORY_COLOURS,
  type ElementInfo,
  type ElementCategory,
} from '../../data/elements';
import { usePersistedState } from '../../hooks/usePersistedState';
import styles from './PeriodicTable.module.css';

const CATEGORIES = Object.keys(CATEGORY_LABELS) as ElementCategory[];

export function PeriodicTable() {
  const [selected, setSelected] = useState<ElementInfo | null>(null);
  const [highlightCategory, setHighlightCategory] = usePersistedState<ElementCategory | 'all'>(
    'pt.highlight',
    'all',
  );

  // Split into main grid and the lanthanide/actinide auxiliary rows
  const mainGrid = ELEMENTS.filter((e) => e.group !== 'la' && e.group !== 'ac');
  const lanthanides = ELEMENTS.filter((e) => e.group === 'la');
  const actinides = ELEMENTS.filter((e) => e.group === 'ac');

  function cellOpacity(e: ElementInfo): number {
    if (highlightCategory === 'all') return 1;
    return e.category === highlightCategory ? 1 : 0.18;
  }

  return (
    <ToolShell
      eyebrow="Teaching Aids"
      title="Periodic Table"
      description="Click any element for details. Filter by category to highlight a family."
    >
      <div className={styles.legend}>
        <button
          type="button"
          className={styles.legendChip}
          data-active={highlightCategory === 'all'}
          onClick={() => setHighlightCategory('all')}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            className={styles.legendChip}
            data-active={highlightCategory === c}
            onClick={() => setHighlightCategory(c)}
            style={{
              ['--chip-colour' as string]: CATEGORY_COLOURS[c],
            }}
          >
            <span className={styles.legendDot} style={{ background: CATEGORY_COLOURS[c] }} />
            {CATEGORY_LABELS[c]}
          </button>
        ))}
      </div>

      <div className={styles.tableWrap}>
        <div className={styles.table}>
          {mainGrid.map((e) => (
            <button
              key={e.number}
              type="button"
              className={styles.cell}
              style={{
                gridRow: e.period,
                gridColumn: e.group as number,
                background: CATEGORY_COLOURS[e.category],
                opacity: cellOpacity(e),
              }}
              onClick={() => setSelected(e)}
              data-selected={selected?.number === e.number}
            >
              <span className={styles.cellNum}>{e.number}</span>
              <span className={styles.cellSym}>{e.symbol}</span>
              <span className={styles.cellMass}>{e.mass}</span>
            </button>
          ))}
        </div>

        <div className={styles.subTable}>
          <div className={styles.subRow}>
            <span className={styles.subLabel}>57–71</span>
            {lanthanides.map((e) => (
              <button
                key={e.number}
                type="button"
                className={styles.cell}
                style={{
                  background: CATEGORY_COLOURS[e.category],
                  opacity: cellOpacity(e),
                }}
                onClick={() => setSelected(e)}
                data-selected={selected?.number === e.number}
              >
                <span className={styles.cellNum}>{e.number}</span>
                <span className={styles.cellSym}>{e.symbol}</span>
                <span className={styles.cellMass}>{e.mass}</span>
              </button>
            ))}
          </div>
          <div className={styles.subRow}>
            <span className={styles.subLabel}>89–103</span>
            {actinides.map((e) => (
              <button
                key={e.number}
                type="button"
                className={styles.cell}
                style={{
                  background: CATEGORY_COLOURS[e.category],
                  opacity: cellOpacity(e),
                }}
                onClick={() => setSelected(e)}
                data-selected={selected?.number === e.number}
              >
                <span className={styles.cellNum}>{e.number}</span>
                <span className={styles.cellSym}>{e.symbol}</span>
                <span className={styles.cellMass}>{e.mass}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {selected && (
        <aside className={styles.detail} style={{ borderColor: CATEGORY_COLOURS[selected.category] }}>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => setSelected(null)}
            aria-label="Close details"
          >
            <XIcon size={14} />
          </button>
          <div className={styles.detailHeader}>
            <span className={styles.detailNum}>{selected.number}</span>
            <span
              className={`font-display ${styles.detailSym}`}
              style={{ color: CATEGORY_COLOURS[selected.category] }}
            >
              {selected.symbol}
            </span>
            <span className={`font-display ${styles.detailName}`}>{selected.name}</span>
          </div>
          <dl className={styles.detailList}>
            <div>
              <dt>Atomic mass</dt>
              <dd>{selected.mass}</dd>
            </div>
            <div>
              <dt>Category</dt>
              <dd>{CATEGORY_LABELS[selected.category]}</dd>
            </div>
            <div>
              <dt>Period</dt>
              <dd>{selected.period}</dd>
            </div>
            <div>
              <dt>Group</dt>
              <dd>
                {selected.group === 'la' ? 'Lanthanide' : selected.group === 'ac' ? 'Actinide' : selected.group}
              </dd>
            </div>
            <div className={styles.fullRow}>
              <dt>Electron configuration</dt>
              <dd className={styles.config}>{selected.config}</dd>
            </div>
          </dl>
        </aside>
      )}
    </ToolShell>
  );
}
