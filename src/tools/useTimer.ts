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

  // start / pause / reset read and write these refs, not render-time state,
  // so a handler captured in an earlier render still works. Games call
  // reset() then start() back-to-back from a click handler or timeout; with
  // state, start() saw the stale `isRunning === true` and did nothing, so
  // the countdown silently stopped after the first correct answer.
  const runningRef = useRef(false);
  const durationRef = useRef(durationMs);
  const startedAtRef = useRef<number | null>(null);
  const baseElapsedRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTickRef = useRef(0);
  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const modeRef = useRef(mode);
  modeRef.current = mode;
  const tickMsRef = useRef(tickMs);
  tickMsRef.current = tickMs;

  const tick = useCallback(function tick() {
    if (startedAtRef.current == null) return;
    const now = performance.now();
    const totalElapsed = baseElapsedRef.current + (now - startedAtRef.current);
    const duration = durationRef.current;

    if (modeRef.current === 'down' && totalElapsed >= duration) {
      setElapsed(duration);
      runningRef.current = false;
      setIsRunning(false);
      startedAtRef.current = null;
      baseElapsedRef.current = duration;
      if (!completedRef.current) {
        completedRef.current = true;
        onCompleteRef.current?.();
      }
      return;
    }

    if (now - lastTickRef.current >= tickMsRef.current) {
      setElapsed(totalElapsed);
      lastTickRef.current = now;
    }
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const start = useCallback(() => {
    if (runningRef.current) return;
    const isDown = modeRef.current === 'down';
    if (isDown && baseElapsedRef.current >= durationRef.current) return;
    startedAtRef.current = performance.now();
    lastTickRef.current = startedAtRef.current;
    runningRef.current = true;
    setIsRunning(true);
    completedRef.current = false;
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const pause = useCallback(() => {
    if (!runningRef.current) return;
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    if (startedAtRef.current != null) {
      baseElapsedRef.current += performance.now() - startedAtRef.current;
      setElapsed(baseElapsedRef.current);
    }
    startedAtRef.current = null;
    runningRef.current = false;
    setIsRunning(false);
  }, []);

  const reset = useCallback(
    (newDuration?: number) => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      startedAtRef.current = null;
      baseElapsedRef.current = 0;
      lastTickRef.current = 0;
      completedRef.current = false;
      runningRef.current = false;
      setElapsed(0);
      setIsRunning(false);
      if (newDuration != null) {
        durationRef.current = newDuration;
        setDurationState(newDuration);
      }
    },
    [],
  );

  const setDuration = useCallback((ms: number) => {
    durationRef.current = ms;
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
    elapsedMs: elapsed,
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
