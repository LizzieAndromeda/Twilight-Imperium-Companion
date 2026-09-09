"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import type { ExpansionId, ExpansionScoped } from "@/lib/types";
import { DEFAULT_ENABLED } from "@/lib/expansions";
import { usePersistentState } from "@/lib/storage";

interface SettingsValue {
  enabled: ExpansionId[];
  isEnabled: (id: ExpansionId) => boolean;
  toggle: (id: ExpansionId, on: boolean) => void;
  /** Narrow any expansion-tagged list down to the enabled products. */
  scope: <T extends ExpansionScoped>(items: T[]) => T[];
  /** False until localStorage has been read — used to avoid content flicker. */
  hydrated: boolean;
}

const SettingsContext = createContext<SettingsValue | null>(null);

const STORAGE_KEY = "tic:expansions";

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled, hydrated] = usePersistentState<ExpansionId[]>(
    STORAGE_KEY,
    DEFAULT_ENABLED,
  );

  const toggle = useCallback(
    (id: ExpansionId, on: boolean) => {
      setEnabled((prev) => {
        const next = prev.filter((e) => e !== id);
        if (on) next.push(id);
        // The base game is never removable, whatever the caller asks for.
        if (!next.includes("base")) next.push("base");
        return next;
      });
    },
    [setEnabled],
  );

  const value = useMemo<SettingsValue>(() => {
    const isEnabled = (id: ExpansionId) => enabled.includes(id);
    return {
      enabled,
      isEnabled,
      toggle,
      scope: (items) => items.filter((i) => isEnabled(i.expansion)),
      hydrated,
    };
  }, [enabled, toggle, hydrated]);

  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  );
}

export function useSettings(): SettingsValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used inside <SettingsProvider>");
  return ctx;
}
