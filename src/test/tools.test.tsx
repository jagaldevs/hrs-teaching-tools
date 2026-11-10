// @vitest-environment jsdom
import { act, fireEvent, render, renderHook, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import * as rng from '../tools/rng/util';
import { useTimer } from '../tools/useTimer';
import { NumberSpinner } from '../tools/rng/NumberSpinner';
import { FractionWall } from '../tools/numeracy/FractionWall';

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
  localStorage.clear();
  document.body.innerHTML = '';
});

describe('useTimer', () => {
  it('restarts when reset() and start() come from a render where it was running', () => {
    // Mental Maths Ladder and Word Chain do exactly this after a correct
    // answer; start() used to see the stale isRunning and do nothing.
    const { result } = renderHook(() => useTimer({ durationMs: 12_000, mode: 'down' }));
    act(() => result.current.start());
    expect(result.current.isRunning).toBe(true);

    const captured = result.current;
    act(() => {
      captured.reset(12_000);
      captured.start();
    });
    expect(result.current.isRunning).toBe(true);
  });
});

describe('Number Spinner', () => {
  it('still lands when the same number comes up twice in a row', async () => {
    vi.useFakeTimers();
    vi.spyOn(rng, 'randomInt').mockReturnValue(3);
    render(
      <MemoryRouter>
        <NumberSpinner />
      </MemoryRouter>,
    );
    const button = () => screen.getByRole('button', { name: /spin/i }) as HTMLButtonElement;

    for (let spin = 1; spin <= 2; spin++) {
      fireEvent.click(button());
      expect(button().disabled).toBe(true);
      await act(async () => {
        vi.advanceTimersByTime(5000);
      });
      expect(button().disabled, `spin ${spin}`).toBe(false);
    }
  });
});

describe('Fraction Wall', () => {
  it('compares selections across rows', () => {
    render(
      <MemoryRouter>
        <FractionWall />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByRole('button', { name: '1/2, piece 1' }));
    fireEvent.click(screen.getByRole('button', { name: '1/4, piece 1' }));
    fireEvent.click(screen.getByRole('button', { name: '1/4, piece 2' }));
    expect(screen.getByText('1/2 = 2/4')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: '1/3, piece 1' }));
    expect(screen.getByText('1/3 < 1/2 = 2/4')).toBeTruthy();
  });
});
