import { useCallback, useEffect, useState } from 'react';

function read<T>(storageKey: string, initial: T): T {
  if (typeof window === 'undefined') return initial;
  try {
    const raw = window.localStorage.getItem(storageKey);
    return raw == null ? initial : (JSON.parse(raw) as T);
  } catch {
    return initial;
  }
}

/**
 * Drop-in replacement for useState that persists to localStorage.
 * Used by every tool that needs to remember state between sessions.
 *
 * Keys are namespaced under `hrs:` so we never collide with other apps.
 *
 * The key may change between renders (e.g. per-class state keyed by class
 * id): the value is then re-read for the new key in the same render, so
 * one key's value is never written under another.
 */
export function usePersistedState<T>(key: string, initial: T): [T, (v: T | ((prev: T) => T)) => void] {
  const storageKey = `hrs:${key}`;

  const [entry, setEntry] = useState<{ key: string; value: T }>(() => ({
    key: storageKey,
    value: read(storageKey, initial),
  }));

  let current = entry;
  if (entry.key !== storageKey) {
    current = { key: storageKey, value: read(storageKey, initial) };
    setEntry(current);
  }

  useEffect(() => {
    try {
      window.localStorage.setItem(current.key, JSON.stringify(current.value));
    } catch {
      /* quota exceeded or private-browsing; silent fallback to in-memory */
    }
  }, [current.key, current.value]);

  const setValue = useCallback((v: T | ((prev: T) => T)) => {
    setEntry((prev) => ({
      key: prev.key,
      value: typeof v === 'function' ? (v as (prev: T) => T)(prev.value) : v,
    }));
  }, []);

  return [current.value, setValue];
}
