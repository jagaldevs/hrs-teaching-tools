import { useEffect, useState } from 'react';

/**
 * Drop-in replacement for useState that persists to localStorage.
 * Used by every tool that needs to remember state between sessions.
 *
 * Keys are namespaced under `hrs:` so we never collide with other apps.
 */
export function usePersistedState<T>(key: string, initial: T): [T, (v: T | ((prev: T) => T)) => void] {
  const storageKey = `hrs:${key}`;

  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initial;
    try {
      const raw = window.localStorage.getItem(storageKey);
      return raw == null ? initial : (JSON.parse(raw) as T);
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(value));
    } catch {
      /* quota exceeded or private-browsing; silent fallback to in-memory */
    }
  }, [storageKey, value]);

  return [value, setValue];
}
