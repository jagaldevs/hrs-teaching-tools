import { useSyncExternalStore } from 'react';

/**
 * Shared class lists ("My classes" in the UI) used by Name Picker, Group
 * Maker, Tournaments and Custom Spinner. Called rosters in code so they're
 * never confused with the curriculum classes in data/classes.ts.
 *
 * One store for every tool: usePersistedState keeps a copy per component,
 * which can't share edits between tools on the same page. This module
 * holds the single copy, saves it to localStorage and notifies every
 * subscriber, including other tabs via the `storage` event.
 *
 * Names never leave the device.
 */

export interface Student {
  /** Stable id, so two students with the same name stay distinct. */
  id: string;
  name: string;
}

export interface Roster {
  id: string;
  name: string;
  students: Student[];
}

export interface RosterState {
  version: 1;
  rosters: Roster[];
  /** The class every tool opens on; the last one picked anywhere. */
  activeId: string | null;
}

/** Students marked away. Only counts for the day it was set. */
interface Absences {
  date: string;
  ids: string[];
}

const ROSTERS_KEY = 'hrs:rosters';
const ABSENT_KEY = 'hrs:rosters.absent';
/** Pre-class-list rosters, carried over once (and left in place). */
const LEGACY_KEYS = [
  { key: 'hrs:namepicker.roster', label: 'Name Picker' },
  { key: 'hrs:groups.roster', label: 'Group Maker' },
];

const EMPTY: RosterState = { version: 1, rosters: [], activeId: null };
const NO_ABSENCES: Absences = { date: '', ids: [] };

// ------------------------------------------------------------------
//  Pure helpers
// ------------------------------------------------------------------

export function newId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function today(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/**
 * Names as shown on screen: a repeated name gets a number ("Jack",
 * "Jack (2)") so students can be told apart. Keyed by student id.
 */
export function displayNames(students: readonly Student[]): Map<string, string> {
  const seen = new Map<string, number>();
  const out = new Map<string, string>();
  for (const s of students) {
    const n = (seen.get(s.name) ?? 0) + 1;
    seen.set(s.name, n);
    out.set(s.id, n === 1 ? s.name : `${s.name} (${n})`);
  }
  return out;
}

/** One name per line, for editing in a textarea. */
export function studentsToText(students: readonly Student[]): string {
  return students.map((s) => s.name).join('\n');
}

/**
 * Turn edited text back into students, keeping ids for names that are
 * still there (matched in order), so a student's place in fair mode or
 * a saved group survives an edit to someone else's name.
 */
export function reconcileStudents(previous: readonly Student[], text: string): Student[] {
  const names = parseRosterNames(text);
  const pool = new Map<string, Student[]>();
  for (const s of previous) pool.set(s.name, [...(pool.get(s.name) ?? []), s]);
  return names.map((name) => {
    const match = pool.get(name)?.shift();
    return match ?? { id: newId(), name };
  });
}

function isStudent(x: unknown): x is Student {
  return !!x && typeof (x as Student).id === 'string' && typeof (x as Student).name === 'string';
}

function isRoster(x: unknown): x is Roster {
  const r = x as Roster;
  return !!r && typeof r.id === 'string' && typeof r.name === 'string' && Array.isArray(r.students) && r.students.every(isStudent);
}

function readJson(key: string): unknown {
  try {
    const raw = localStorage.getItem(key);
    return raw == null ? undefined : JSON.parse(raw);
  } catch {
    return undefined;
  }
}

/**
 * Build the first class list from the rosters typed into Name Picker and
 * Group Maker before classes existed. Identical lists become one class.
 */
export function migrateLegacy(read: (key: string) => unknown = readJson): RosterState {
  const rosters: Roster[] = [];
  const seenLists = new Set<string>();
  for (const { key } of LEGACY_KEYS) {
    const text = read(key);
    if (typeof text !== 'string') continue;
    const names = parseRosterNames(text);
    if (names.length === 0) continue;
    const signature = names.join('\n');
    if (seenLists.has(signature)) continue;
    seenLists.add(signature);
    rosters.push({
      id: newId(),
      name: `Class ${rosters.length + 1}`,
      students: names.map((name) => ({ id: newId(), name })),
    });
  }
  return { version: 1, rosters, activeId: rosters[0]?.id ?? null };
}

/** Plain names from roster text (no "(2)" numbering — ids keep repeats apart). */
function parseRosterNames(text: string): string[] {
  return text
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

// ------------------------------------------------------------------
//  Store
// ------------------------------------------------------------------

let state: RosterState | null = null;
let absences: Absences | null = null;
const listeners = new Set<() => void>();

function load(): RosterState {
  if (state) return state;
  const saved = readJson(ROSTERS_KEY) as RosterState | undefined;
  if (saved && saved.version === 1 && Array.isArray(saved.rosters)) {
    const rosters = saved.rosters.filter(isRoster);
    const activeId = rosters.some((r) => r.id === saved.activeId) ? saved.activeId : rosters[0]?.id ?? null;
    state = { version: 1, rosters, activeId };
  } else {
    state = migrateLegacy();
    persist(ROSTERS_KEY, state);
  }
  return state;
}

function loadAbsences(): Absences {
  if (absences && absences.date === today()) return absences;
  const saved = readJson(ABSENT_KEY) as Absences | undefined;
  absences =
    saved && saved.date === today() && Array.isArray(saved.ids)
      ? { date: saved.date, ids: saved.ids.filter((id) => typeof id === 'string') }
      : { date: today(), ids: [] };
  return absences;
}

function persist(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage blocked or full; the class list still works for this visit */
  }
}

function emit() {
  for (const l of listeners) l();
}

function setState(next: RosterState) {
  state = next;
  persist(ROSTERS_KEY, next);
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  function onStorage(e: StorageEvent) {
    if (e.key === ROSTERS_KEY) state = null;
    else if (e.key === ABSENT_KEY) absences = null;
    else return;
    emit();
  }
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

/** Test hook: forget the in-memory copy so the next read comes from storage. */
export function resetRosterStoreForTests() {
  state = null;
  absences = null;
}

// ------------------------------------------------------------------
//  Hooks
// ------------------------------------------------------------------

export function useRosterState(): RosterState {
  return useSyncExternalStore(subscribe, load, () => EMPTY);
}

export function useActiveRoster(): Roster | null {
  const s = useRosterState();
  return s.rosters.find((r) => r.id === s.activeId) ?? null;
}

/** Ids of students marked away today. */
export function useAbsentIds(): ReadonlySet<string> {
  const a = useSyncExternalStore(subscribe, loadAbsences, () => NO_ABSENCES);
  return new Set(a.ids);
}

/** The active class's students who are in today, with display names. */
export function usePresentStudents(): { roster: Roster | null; present: { id: string; name: string }[] } {
  const roster = useActiveRoster();
  const absent = useAbsentIds();
  if (!roster) return { roster, present: [] };
  const names = displayNames(roster.students);
  return {
    roster,
    present: roster.students.filter((s) => !absent.has(s.id)).map((s) => ({ id: s.id, name: names.get(s.id)! })),
  };
}

// ------------------------------------------------------------------
//  Actions
// ------------------------------------------------------------------

export function addRoster(name: string, text: string): string {
  const s = load();
  const roster: Roster = {
    id: newId(),
    name: name.trim() || `Class ${s.rosters.length + 1}`,
    students: reconcileStudents([], text),
  };
  setState({ ...s, rosters: [...s.rosters, roster], activeId: roster.id });
  return roster.id;
}

export function updateRoster(id: string, patch: { name?: string; text?: string }) {
  const s = load();
  setState({
    ...s,
    rosters: s.rosters.map((r) =>
      r.id !== id
        ? r
        : {
            ...r,
            name: patch.name !== undefined ? patch.name.trim() || r.name : r.name,
            students: patch.text !== undefined ? reconcileStudents(r.students, patch.text) : r.students,
          },
    ),
  });
}

export function deleteRoster(id: string) {
  const s = load();
  const rosters = s.rosters.filter((r) => r.id !== id);
  setState({ ...s, rosters, activeId: s.activeId === id ? rosters[0]?.id ?? null : s.activeId });
}

export function setActiveRoster(id: string) {
  const s = load();
  if (s.activeId === id || !s.rosters.some((r) => r.id === id)) return;
  setState({ ...s, activeId: id });
}

export function toggleAbsent(studentId: string) {
  const a = loadAbsences();
  const ids = a.ids.includes(studentId) ? a.ids.filter((x) => x !== studentId) : [...a.ids, studentId];
  absences = { date: a.date, ids };
  persist(ABSENT_KEY, absences);
  emit();
}

export function clearAbsent(studentIds: readonly string[]) {
  const a = loadAbsences();
  const drop = new Set(studentIds);
  absences = { date: a.date, ids: a.ids.filter((x) => !drop.has(x)) };
  persist(ABSENT_KEY, absences);
  emit();
}

// ------------------------------------------------------------------
//  Backup
// ------------------------------------------------------------------

const BACKUP_KIND = 'hrs-teaching-tools/classes';

export function exportRosters(): string {
  const s = load();
  return JSON.stringify({ kind: BACKUP_KIND, version: 1, exportedAt: new Date().toISOString(), rosters: s.rosters }, null, 2);
}

/**
 * Add the classes from a backup file. Classes already here (same id) are
 * replaced by the backup's copy; the rest are added. Returns how many
 * classes were imported, or throws with a message for the teacher.
 */
export function importRosters(json: string): number {
  let data: unknown;
  try {
    data = JSON.parse(json);
  } catch {
    throw new Error('That file isn’t a class backup (it isn’t valid JSON).');
  }
  const d = data as { kind?: unknown; rosters?: unknown };
  if (d.kind !== BACKUP_KIND || !Array.isArray(d.rosters)) {
    throw new Error('That file isn’t a class backup from HRS Teaching Tools.');
  }
  const incoming = d.rosters.filter(isRoster);
  if (incoming.length === 0) throw new Error('That backup has no classes in it.');
  const s = load();
  const byId = new Map(incoming.map((r) => [r.id, r]));
  const rosters = [...s.rosters.map((r) => byId.get(r.id) ?? r), ...incoming.filter((r) => !s.rosters.some((x) => x.id === r.id))];
  setState({ ...s, rosters, activeId: s.activeId ?? rosters[0]?.id ?? null });
  return incoming.length;
}
