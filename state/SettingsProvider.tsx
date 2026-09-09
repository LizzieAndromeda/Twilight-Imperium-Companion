"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import type { ExpansionGated, ExpansionId, ExpansionScoped } from "@/lib/types";
import { DEFAULT_ENABLED } from "@/lib/expansions";
import { usePersistentState } from "@/lib/storage";

interface SettingsValue {
  enabled: ExpansionId[];
  isEnabled: (id: ExpansionId) => boolean;
  toggle: (id: ExpansionId, on: boolean) => void;
  /** Narrow any expansion-tagged list down to the enabled products. */
  scope: <T extends ExpansionScoped>(items: T[]) => T[];
  /**
   * Whether every expansion in `needed` is on.
   *
   * For nested content with no expansion of its own — a ruling on a faction
   * sheet, whose own product is already implied by the sheet, but which is
   * about a leader that product did not contain.
   */
  allEnabled: (needed?: ExpansionId[]) => boolean;
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
      // `requires` names content the item talks about but does not come from,
      // so it is an additional condition rather than a replacement.
      scope: (items) =>
        items.filter(
          (i) =>
            isEnabled(i.expansion) &&
            ((i as ExpansionGated).requires ?? []).every(isEnabled),
        ),
      allEnabled: (needed) => (needed ?? []).every(isEnabled),
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
