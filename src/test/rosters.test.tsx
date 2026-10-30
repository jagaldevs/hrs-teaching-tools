// @vitest-environment jsdom
import { act, fireEvent, render, renderHook, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  addRoster,
  deleteRoster,
  displayNames,
  exportRosters,
  importRosters,
  migrateLegacy,
  reconcileStudents,
  resetRosterStoreForTests,
  setActiveRoster,
  toggleAbsent,
  updateRoster,
  useAbsentIds,
  useRosterState,
} from '../tools/classes/rosters';
import { usePersistedState } from '../hooks/usePersistedState';
import { NamePicker } from '../tools/rng/NamePicker';
import { RandomGroupMaker } from '../tools/rng/RandomGroupMaker';
import { Tournaments } from '../tools/classroom/Tournaments';

beforeEach(() => {
  localStorage.clear();
  resetRosterStoreForTests();
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  document.body.innerHTML = '';
});

function state() {
  return renderHook(() => useRosterState()).result.current;
}

describe('roster helpers', () => {
  it('numbers repeated names for display, keyed by id', () => {
    const names = displayNames([
      { id: 'a', name: 'Jack' },
      { id: 'b', name: 'Mia' },
      { id: 'c', name: 'Jack' },
    ]);
    expect([...names.values()]).toEqual(['Jack', 'Mia', 'Jack (2)']);
  });

  it('keeps student ids through an edit', () => {
    const before = reconcileStudents([], 'Ava\nNoah\nLiam');
    const after = reconcileStudents(before, 'Ava\nNoah Smith\nLiam\nZoe');
    expect(after[0]!.id).toBe(before[0]!.id);
    expect(after[2]!.id).toBe(before[2]!.id);
    expect(after[1]!.id).not.toBe(before[1]!.id);
    expect(after.map((s) => s.name)).toEqual(['Ava', 'Noah Smith', 'Liam', 'Zoe']);
  });

  it('carries Name Picker and Group Maker lists over, merging identical ones', () => {
    const saved: Record<string, unknown> = {
      'hrs:namepicker.roster': 'Ava\nNoah',
      'hrs:groups.roster': 'Ava, Noah',
    };
    const migrated = migrateLegacy((k) => saved[k]);
    expect(migrated.rosters).toHaveLength(1);
    expect(migrated.rosters[0]!.students.map((s) => s.name)).toEqual(['Ava', 'Noah']);
    expect(migrated.activeId).toBe(migrated.rosters[0]!.id);

    saved['hrs:groups.roster'] = 'Liam\nMia';
    expect(migrateLegacy((k) => saved[k]).rosters.map((r) => r.name)).toEqual(['Class 1', 'Class 2']);
  });

  it('migrates on first load and leaves the old keys alone', () => {
    localStorage.setItem('hrs:namepicker.roster', JSON.stringify('Ava\nNoah'));
    expect(state().rosters.map((r) => r.students.length)).toEqual([2]);
    expect(localStorage.getItem('hrs:namepicker.roster')).toBe(JSON.stringify('Ava\nNoah'));
  });
});

describe('roster store', () => {
  it('adds, edits, switches and deletes classes', () => {
    const a = addRoster('8B', 'Ava\nNoah');
    const b = addRoster('9C', 'Liam');
    expect(state().activeId).toBe(b);

    setActiveRoster(a);
    updateRoster(a, { name: '8B Humanities', text: 'Ava\nNoah\nZoe' });
    const s = state();
    expect(s.activeId).toBe(a);
    expect(s.rosters.find((r) => r.id === a)).toMatchObject({ name: '8B Humanities' });
    expect(s.rosters.find((r) => r.id === a)!.students).toHaveLength(3);

    deleteRoster(a);
    expect(state().activeId).toBe(b);
    expect(JSON.parse(localStorage.getItem('hrs:rosters')!).rosters).toHaveLength(1);
  });

  it('forgets absences the next day', () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date(2026, 9, 30, 9));
    addRoster('8B', 'Ava\nNoah');
    const ava = state().rosters[0]!.students[0]!.id;
    toggleAbsent(ava);
    expect(renderHook(() => useAbsentIds()).result.current.has(ava)).toBe(true);

    vi.setSystemTime(new Date(2026, 9, 31, 9));
    resetRosterStoreForTests();
    expect(renderHook(() => useAbsentIds()).result.current.has(ava)).toBe(false);
  });

  it('round-trips a backup and rejects other files', () => {
    addRoster('8B', 'Ava\nNoah');
    const backup = exportRosters();

    localStorage.clear();
    resetRosterStoreForTests();
    expect(importRosters(backup)).toBe(1);
    expect(state().rosters[0]).toMatchObject({ name: '8B' });
    // Importing again replaces rather than duplicates.
    importRosters(backup);
    expect(state().rosters).toHaveLength(1);

    expect(() => importRosters('not json')).toThrow(/isn’t a class backup/);
    expect(() => importRosters('{"rosters": []}')).toThrow(/isn’t a class backup/);
  });
});

describe('usePersistedState', () => {
  it('re-reads when the key changes and never writes one key’s value under another', () => {
    localStorage.setItem('hrs:k.a', JSON.stringify(['x']));
    const { result, rerender } = renderHook(({ k }) => usePersistedState<string[]>(k, []), {
      initialProps: { k: 'k.a' },
    });
    expect(result.current[0]).toEqual(['x']);
    rerender({ k: 'k.b' });
    expect(result.current[0]).toEqual([]);
    expect(localStorage.getItem('hrs:k.b')).toBe('[]');
    act(() => result.current[1](['y']));
    rerender({ k: 'k.a' });
    expect(result.current[0]).toEqual(['x']);
  });
});

describe('tools use the selected class', () => {
  const inRouter = (ui: React.ReactElement) => render(<MemoryRouter>{ui}</MemoryRouter>);

  it('Name Picker never picks someone marked away', async () => {
    vi.useFakeTimers();
    addRoster('8B', 'Ava\nNoah');
    const noah = state().rosters[0]!.students[1]!.id;
    toggleAbsent(noah);
    inRouter(<NamePicker />);
    for (let i = 0; i < 5; i++) {
      fireEvent.click(screen.getByRole('button', { name: /pick a name/i }));
      await act(async () => {
        vi.advanceTimersByTime(2000);
      });
      expect(screen.queryByText('Noah')).toBeNull();
      // Fair mode: after Ava's turn the round is over.
      if (screen.queryByText('Everyone has had a turn.')) break;
    }
    expect(screen.getByText('Everyone has had a turn.')).toBeTruthy();
  });

  it('Group Maker groups only the students who are in', () => {
    addRoster('8B', 'Ava\nNoah\nLiam\nMia\nZoe');
    toggleAbsent(state().rosters[0]!.students[4]!.id); // Zoe away
    inRouter(<RandomGroupMaker />);
    fireEvent.click(screen.getByRole('button', { name: /make groups/i }));
    expect(screen.getAllByRole('listitem').map((li) => li.textContent).sort()).toEqual(['Ava', 'Liam', 'Mia', 'Noah']);
  });

  it('Tournaments enters the class by default', () => {
    addRoster('8B', 'Ava\nNoah\nLiam');
    inRouter(<Tournaments />);
    expect(screen.getByText('3 entrants')).toBeTruthy();
  });

  it('Tournaments keeps a list typed before classes existed', () => {
    localStorage.setItem('hrs:tourney.roster', JSON.stringify('Red\nBlue'));
    inRouter(<Tournaments />);
    expect(screen.getByText('2 entrants')).toBeTruthy();
  });
});
