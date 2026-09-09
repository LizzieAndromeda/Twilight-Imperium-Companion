"use client";

import { useCallback, useState, useSyncExternalStore } from "react";

/**
 * A tiny localStorage-backed store exposed through `useSyncExternalStore`.
 *
 * Reading storage in an effect and calling setState works, but it causes a
 * cascading render on every mount and reads as a React anti-pattern. Treating
 * localStorage as what it is — an external store — gives us server-safe
 * hydration for free and keeps every component reading the same key in sync,
 * including across browser tabs.
 */

type Listener = () => void;

const listeners = new Map<string, Set<Listener>>();

/**
 * `getSnapshot` must return a referentially stable value between changes or
 * React will loop, so parsed values are cached against the raw string they
 * came from.
 */
const cache = new Map<string, { raw: string | null; value: unknown }>();

function readRaw(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    // Private mode or storage disabled by policy.
    return null;
  }
}

function getSnapshot<T>(key: string): T | undefined {
  const raw = readRaw(key);
  const cached = cache.get(key);
  if (cached && cached.raw === raw) return cached.value as T | undefined;

  let value: unknown;
  try {
    value = raw === null ? undefined : JSON.parse(raw);
  } catch {
    // Corrupt JSON — behave as if nothing was stored.
    value = undefined;
  }
  cache.set(key, { raw, value });
  return value as T | undefined;
}

function subscribe(key: string, listener: Listener): () => void {
  let set = listeners.get(key);
  if (!set) {
    set = new Set();
    listeners.set(key, set);
  }
  set.add(listener);

  // Writes from another tab arrive as a storage event.
  const onStorage = (event: StorageEvent) => {
    if (event.key === key || event.key === null) {
      cache.delete(key);
      listener();
    }
  };
  window.addEventListener("storage", onStorage);

  return () => {
    set.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function write(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Quota exceeded or storage blocked; the in-memory cache still updates so
    // the session keeps working, it just will not survive a refresh.
  }
  cache.delete(key);
  listeners.get(key)?.forEach((listener) => listener());
}

/** Server and first-hydration render: nothing is stored yet. */
const serverSnapshot = () => undefined;

/** Never fires — used only to flip `hydrated` after the first client render. */
const neverSubscribe = () => () => {};
const onClient = () => true;
const onServer = () => false;

/**
 * State that survives a refresh, kept in sync across every component and tab
 * reading the same key.
 *
 * Returns `hydrated` so callers can hold off rendering storage-dependent UI
 * until the real value is known, rather than flashing the default.
 */
export function usePersistentState<T>(
  key: string,
  initial: T,
): [T, (next: T | ((prev: T) => T)) => void, boolean] {
  // Captured once so a caller passing a fresh literal cannot destabilise the
  // setter below.
  const [fallback] = useState(initial);

  const subscribeToKey = useCallback((listener: Listener) => subscribe(key, listener), [key]);

  const stored = useSyncExternalStore<T | undefined>(
    subscribeToKey,
    () => getSnapshot<T>(key),
    serverSnapshot,
  );

  const hydrated = useSyncExternalStore(neverSubscribe, onClient, onServer);

  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      const current = getSnapshot<T>(key) ?? fallback;
      const resolved =
        typeof next === "function" ? (next as (p: T) => T)(current) : next;
      write(key, resolved);
    },
    [key, fallback],
  );

  return [stored === undefined ? fallback : stored, set, hydrated];
}

/** Short, collision-resistant enough id for client-side records. */
export function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}
