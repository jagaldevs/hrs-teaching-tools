import { useCallback, useEffect, useRef, useState } from 'react';

export type TimerMode = 'down' | 'up';

interface UseTimerOptions {
  /** For count-down timers, the duration in milliseconds. Ignored for count-up. */
  durationMs?: number;
  mode?: TimerMode;
  /** Called once when a count-down reaches zero. */
  onComplete?: () => void;
  /** Tick interval. Defaults to 100ms (good for 0.1s precision without jank). */
  tickMs?: number;
}

interface TimerApi {
  remainingMs: number;
  elapsedMs: number;
  isRunning: boolean;
  isFinished: boolean;
  start: () => void;
  pause: () => void;
  reset: (durationMs?: number) => void;
  setDuration: (ms: number) => void;
}

/**
 * Single-source-of-truth timer driven by performance.now() rather than setInterval drift.
 * Used by Countdown, Stopwatch, Exam Clock, Lesson Stage Timer, Mental Maths Sprint, etc.
 */
export function useTimer({
  durationMs = 0,
  mode = 'down',
  onComplete,
  tickMs = 100,
}: UseTimerOptions = {}): TimerApi {
  const [duration, setDurationState] = useState(durationMs);
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const startedAtRef = useRef<number | null>(null);
  const baseElapsedRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTickRef = useRef(0);
  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const tick = useCallback(() => {
    if (startedAtRef.current == null) return;
    const now = performance.now();
    const totalElapsed = baseElapsedRef.current + (now - startedAtRef.current);

    if (mode === 'down' && totalElapsed >= duration) {
      setElapsed(duration);
      setIsRunning(false);
      startedAtRef.current = null;
      baseElapsedRef.current = duration;
      if (!completedRef.current) {
        completedRef.current = true;
        onCompleteRef.current?.();
      }
      return;
    }

    if (now - lastTickRef.current >= tickMs) {
      setElapsed(totalElapsed);
      lastTickRef.current = now;
    }
    rafRef.current = requestAnimationFrame(tick);
  }, [duration, mode, tickMs]);

  const start = useCallback(() => {
    if (isRunning) return;
    if (mode === 'down' && baseElapsedRef.current >= duration) return;
    startedAtRef.current = performance.now();
    lastTickRef.current = startedAtRef.current;
    setIsRunning(true);
    completedRef.current = mode === 'down' ? baseElapsedRef.current >= duration : false;
    rafRef.current = requestAnimationFrame(tick);
  }, [duration, isRunning, mode, tick]);

  const pause = useCallback(() => {
    if (!isRunning) return;
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    if (startedAtRef.current != null) {
      baseElapsedRef.current += performance.now() - startedAtRef.current;
      setElapsed(baseElapsedRef.current);
    }
    startedAtRef.current = null;
    setIsRunning(false);
  }, [isRunning]);

  const reset = useCallback(
    (newDuration?: number) => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      startedAtRef.current = null;
      baseElapsedRef.current = 0;
      lastTickRef.current = 0;
      completedRef.current = false;
      setElapsed(0);
      setIsRunning(false);
      if (newDuration != null) setDurationState(newDuration);
    },
    [],
  );

  const setDuration = useCallback((ms: number) => {
    setDurationState(ms);
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const remaining = mode === 'down' ? Math.max(0, duration - elapsed) : elapsed;
  const isFinished = mode === 'down' && elapsed >= duration && duration > 0;

  return {
    remainingMs: mode === 'down' ? remaining : 0,
    elapsedMs: mode === 'up' ? elapsed : elapsed,
    isRunning,
    isFinished,
    start,
    pause,
    reset,
    setDuration,
  };
}

/** Format milliseconds → "MM:SS" or "HH:MM:SS" if hours > 0. */
export function formatClock(ms: number, opts: { showHours?: 'auto' | 'always' | 'never'; showMs?: boolean } = {}) {
  const { showHours = 'auto', showMs = false } = opts;
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const tenths = Math.floor((ms % 1000) / 100);

  const mm = String(minutes).padStart(2, '0');
  const ss = String(seconds).padStart(2, '0');

  const needsHours = showHours === 'always' || (showHours === 'auto' && hours > 0);
  const base = needsHours ? `${String(hours).padStart(2, '0')}:${mm}:${ss}` : `${mm}:${ss}`;
  return showMs ? `${base}.${tenths}` : base;
}
