import { useMemo, useState } from 'react';
import { Plus, Trash2, RotateCcw, Bookmark } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import { usePersistedState } from '../../hooks/usePersistedState';
import common from '../common.module.css';
import styles from './TimelineBuilder.module.css';

/**
 * Timeline Builder — events plotted on a horizontal scale.
 *
 * Teacher adds events (label + year + optional note). Range start/end set the
 * horizontal scale. Events stack vertically along the timeline to avoid overlap.
 * Everything persists to localStorage so a timeline survives reloads.
 */

interface EventItem {
  id: string;
  year: number;
  label: string;
  note?: string;
}

interface TimelineState {
  rangeStart: number;
  rangeEnd: number;
  events: EventItem[];
}

const PALETTE = ['#A2235F', '#0EA5E9', '#10B981', '#F59E0B', '#A855F7', '#EF4444', '#FB7185', '#22D3EE'];

interface Preset {
  id: string;
  label: string;
  state: TimelineState;
}

const PRESETS: Preset[] = [
  {
    id: 'aus',
    label: 'Australian history',
    state: {
      rangeStart: 1700,
      rangeEnd: 2025,
      events: [
        { id: 'p-1', year: 1770, label: 'Cook reaches Botany Bay' },
        { id: 'p-2', year: 1788, label: 'First Fleet arrives' },
        { id: 'p-3', year: 1851, label: 'Gold discovered' },
        { id: 'p-4', year: 1854, label: 'Eureka Stockade' },
        { id: 'p-5', year: 1901, label: 'Federation' },
        { id: 'p-6', year: 1915, label: 'Gallipoli landing' },
        { id: 'p-7', year: 1967, label: '1967 Referendum' },
        { id: 'p-8', year: 1992, label: 'Mabo decision' },
        { id: 'p-9', year: 2008, label: 'Apology to Stolen Generations' },
      ],
    },
  },
  {
    id: 'ancient',
    label: 'Ancient civilisations',
    state: {
      rangeStart: -3500,
      rangeEnd: 500,
      events: [
        { id: 'a-1', year: -3100, label: 'Pyramids of Giza era begins' },
        { id: 'a-2', year: -1750, label: 'Code of Hammurabi' },
        { id: 'a-3', year: -776, label: 'First Olympic Games' },
        { id: 'a-4', year: -509, label: 'Roman Republic founded' },
        { id: 'a-5', year: -221, label: 'Qin unifies China' },
        { id: 'a-6', year: -44, label: 'Julius Caesar assassinated' },
        { id: 'a-7', year: 79, label: 'Pompeii destroyed' },
        { id: 'a-8', year: 476, label: 'Fall of Western Rome' },
      ],
    },
  },
  {
    id: 'c20',
    label: 'The 20th century',
    state: {
      rangeStart: 1900,
      rangeEnd: 2000,
      events: [
        { id: 'c-1', year: 1914, label: 'WWI begins' },
        { id: 'c-2', year: 1918, label: 'WWI ends' },
        { id: 'c-3', year: 1929, label: 'Great Depression' },
        { id: 'c-4', year: 1939, label: 'WWII begins' },
        { id: 'c-5', year: 1945, label: 'WWII ends' },
        { id: 'c-6', year: 1962, label: 'Cuban Missile Crisis' },
        { id: 'c-7', year: 1969, label: 'Apollo 11 moon landing' },
        { id: 'c-8', year: 1989, label: 'Berlin Wall falls' },
        { id: 'c-9', year: 1991, label: 'Apartheid ends' },
      ],
    },
  },
  {
    id: 'blank',
    label: 'Blank timeline',
    state: {
      rangeStart: 0,
      rangeEnd: 2025,
      events: [],
    },
  },
];

const STORAGE_KEY = 'timeline.state';

export function TimelineBuilder() {
  const [state, setState] = usePersistedState<TimelineState>(STORAGE_KEY, PRESETS[0]!.state);

  // Sort events for display
  const sorted = useMemo(() => [...state.events].sort((a, b) => a.year - b.year), [state.events]);

  function applyPreset(p: Preset) {
    setState(p.state);
  }

  function addEvent(year: number, label: string, note: string) {
    const trimmed = label.trim();
    if (!trimmed) return;
    if (Number.isNaN(year)) return;
    setState((prev) => ({
      ...prev,
      events: [
        ...prev.events,
        { id: crypto.randomUUID(), year, label: trimmed, note: note.trim() || undefined },
      ],
    }));
  }

  function removeEvent(id: string) {
    setState((prev) => ({ ...prev, events: prev.events.filter((e) => e.id !== id) }));
  }

  function clearEvents() {
    setState((prev) => ({ ...prev, events: [] }));
  }

  function updateRange(start: number, end: number) {
    if (end <= start) return;
    setState((prev) => ({ ...prev, rangeStart: start, rangeEnd: end }));
  }

  return (
    <ToolShell
      eyebrow="Teaching Aids"
      title="Timeline Builder"
      description="Drop events onto a horizontal timeline. Pick a preset or build your own. Saved on this device."
      actions={
        <button type="button" className={common.btn} onClick={clearEvents} disabled={state.events.length === 0}>
          <RotateCcw size={14} /> Clear events
        </button>
      }
    >
      <PresetRow onPick={applyPreset} />

      <Timeline state={state} sorted={sorted} onRemove={removeEvent} />

      <RangeControls
        start={state.rangeStart}
        end={state.rangeEnd}
        onChange={updateRange}
      />

      <AddForm onAdd={addEvent} />

      {sorted.length > 0 && <EventList events={sorted} onRemove={removeEvent} />}
    </ToolShell>
  );
}

function PresetRow({ onPick }: { onPick: (p: Preset) => void }) {
  return (
    <div className={styles.presetRow}>
      <Bookmark size={14} className={styles.presetIcon} />
      <span className={common.labelText}>Load preset:</span>
      {PRESETS.map((p) => (
        <button
          key={p.id}
          type="button"
          className={`${common.btn} ${styles.presetBtn}`}
          onClick={() => onPick(p)}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}

function Timeline({
  state,
  sorted,
  onRemove,
}: {
  state: TimelineState;
  sorted: EventItem[];
  onRemove: (id: string) => void;
}) {
  const { rangeStart, rangeEnd } = state;
  const span = Math.max(1, rangeEnd - rangeStart);

  // Compute lanes so labels don't overlap (greedy: first lane that fits)
  const LANE_MIN_PCT_GAP = 6.5; // events within this percentage need different lanes
  const events = useMemo(() => {
    const out: { e: EventItem; pct: number; lane: number; colour: string }[] = [];
    sorted.forEach((e, idx) => {
      const pct = ((e.year - rangeStart) / span) * 100;
      let lane = 0;
      while (true) {
        const conflict = out.some((o) => o.lane === lane && Math.abs(o.pct - pct) < LANE_MIN_PCT_GAP);
        if (!conflict) break;
        lane++;
      }
      out.push({ e, pct, lane, colour: PALETTE[idx % PALETTE.length]! });
    });
    return out;
  }, [sorted, rangeStart, span]);

  const maxLane = events.reduce((m, x) => Math.max(m, x.lane), 0);
  const stripHeight = 110 + maxLane * 36;

  // Tick marks: aim for ~8 evenly spaced ticks
  const tickCount = 8;
  const tickStep = Math.max(1, Math.round(span / tickCount));
  // round to a nice number
  function niceStep(s: number) {
    const exp = Math.floor(Math.log10(s));
    const base = Math.pow(10, exp);
    const f = s / base;
    if (f < 1.5) return base;
    if (f < 3) return 2 * base;
    if (f < 7.5) return 5 * base;
    return 10 * base;
  }
  const step = niceStep(tickStep);
  const firstTick = Math.ceil(rangeStart / step) * step;
  const ticks: number[] = [];
  for (let v = firstTick; v <= rangeEnd; v += step) ticks.push(v);

  function fmt(year: number) {
    if (year < 0) return `${Math.abs(year)} BCE`;
    return `${year}`;
  }

  return (
    <div className={styles.timelineWrap} style={{ height: stripHeight }}>
      {/* Tick marks below the bar */}
      {ticks.map((v) => {
        const pct = ((v - rangeStart) / span) * 100;
        return (
          <div key={v} className={styles.tick} style={{ left: `${pct}%` }}>
            <div className={styles.tickMark} />
            <span className={styles.tickLabel}>{fmt(v)}</span>
          </div>
        );
      })}

      {/* Horizontal bar */}
      <div className={styles.bar} />

      {/* Events stacked into lanes */}
      {events.map(({ e, pct, lane, colour }) => (
        <button
          key={e.id}
          type="button"
          className={styles.event}
          style={{
            left: `${pct}%`,
            top: 18 + lane * 36,
            color: colour,
          }}
          onClick={() => onRemove(e.id)}
          title={`Click to remove • ${e.note ?? ''}`}
        >
          <span className={styles.eventDot} style={{ background: colour }} />
          <span className={styles.eventStem} style={{ background: colour }} />
          <span className={styles.eventLabel} style={{ borderColor: colour }}>
            <span className={styles.eventYear}>{fmt(e.year)}</span>
            <span className={styles.eventTitle}>{e.label}</span>
          </span>
        </button>
      ))}

      {sorted.length === 0 && (
        <p className={styles.emptyMsg}>Add an event below or pick a preset above.</p>
      )}
    </div>
  );
}

function RangeControls({
  start,
  end,
  onChange,
}: {
  start: number;
  end: number;
  onChange: (s: number, e: number) => void;
}) {
  const [s, setS] = useState(String(start));
  const [e, setE] = useState(String(end));

  function commit() {
    const ns = Number(s);
    const ne = Number(e);
    if (Number.isFinite(ns) && Number.isFinite(ne) && ne > ns) onChange(ns, ne);
  }

  return (
    <div className={styles.rangeRow}>
      <span className={common.labelText}>Range:</span>
      <label className={styles.rangeField}>
        <span>Start</span>
        <input
          type="number"
          value={s}
          onChange={(ev) => setS(ev.target.value)}
          onBlur={commit}
          onKeyDown={(ev) => ev.key === 'Enter' && commit()}
          className={styles.numInput}
        />
      </label>
      <label className={styles.rangeField}>
        <span>End</span>
        <input
          type="number"
          value={e}
          onChange={(ev) => setE(ev.target.value)}
          onBlur={commit}
          onKeyDown={(ev) => ev.key === 'Enter' && commit()}
          className={styles.numInput}
        />
      </label>
    </div>
  );
}

function AddForm({ onAdd }: { onAdd: (year: number, label: string, note: string) => void }) {
  const [year, setYear] = useState('');
  const [label, setLabel] = useState('');
  const [note, setNote] = useState('');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const y = Number(year);
    if (Number.isNaN(y)) return;
    onAdd(y, label, note);
    setYear('');
    setLabel('');
    setNote('');
  }

  return (
    <form className={styles.addForm} onSubmit={submit}>
      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className={styles.yearInput}
        required
      />
      <input
        type="text"
        placeholder="Event label…"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        className={styles.labelInput}
        required
      />
      <input
        type="text"
        placeholder="Note (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className={styles.noteInput}
      />
      <button type="submit" className={`${common.btn} ${common.btnPrimary}`}>
        <Plus size={14} /> Add
      </button>
    </form>
  );
}

function EventList({ events, onRemove }: { events: EventItem[]; onRemove: (id: string) => void }) {
  return (
    <ul className={styles.list}>
      {events.map((e) => (
        <li key={e.id} className={styles.listItem}>
          <span className={styles.listYear}>{e.year < 0 ? `${Math.abs(e.year)} BCE` : e.year}</span>
          <span className={styles.listLabel}>{e.label}</span>
          {e.note && <span className={styles.listNote}>{e.note}</span>}
          <button
            type="button"
            className={styles.listRemove}
            onClick={() => onRemove(e.id)}
            aria-label="Remove"
          >
            <Trash2 size={14} />
          </button>
        </li>
      ))}
    </ul>
  );
}
