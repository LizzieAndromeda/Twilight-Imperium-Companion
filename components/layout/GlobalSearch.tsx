"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { hrefFor, searchAll } from "@/lib/search";
import type { SearchEntry } from "@/lib/search";
import { EXPANSION_BY_ID } from "@/lib/expansions";
import { useSettings } from "@/state/SettingsProvider";
import { Badge, Modal, SearchInput } from "@/components/ui";
import styles from "./GlobalSearch.module.css";

/**
 * Search over everything at once.
 *
 * Mid-game you know the name of the thing and not which page it is on — is
 * "Sabotage" an action card, a rule or an FAQ entry? This searches all thirteen
 * datasets together and sends you to the right page with the query already
 * applied.
 */
export function GlobalSearch({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      wide
      title="Search everything"
      description="Rules, FAQ rulings, cards, technologies, factions, agendas, objectives, relics — filtered to the expansions you have enabled."
    >
      {/* Mounted only while open so the query resets each time it is opened. */}
      {open ? <SearchBody onNavigate={() => onOpenChange(false)} /> : null}
    </Modal>
  );
}

function SearchBody({ onNavigate }: { onNavigate: () => void }) {
  const router = useRouter();
  const { isEnabled } = useSettings();
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);

  const results = useMemo(
    () => searchAll(query, isEnabled),
    [query, isEnabled],
  );

  // Keep the keyboard cursor inside the current result set.
  const active = results.length ? Math.min(cursor, results.length - 1) : 0;

  function go(entry: SearchEntry) {
    router.push(hrefFor(entry, query));
    onNavigate();
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setCursor((c) => Math.min(c + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (event.key === "Enter" && results[active]) {
      event.preventDefault();
      go(results[active]);
    }
  }

  return (
    <div onKeyDown={onKeyDown}>
      <div className={styles.field}>
        <SearchInput
          value={query}
          onValueChange={(next) => {
            setQuery(next);
            setCursor(0);
          }}
          placeholder="Search everything — a card, a rule, a faction, a ruling…"
          aria-label="Search everything"
        />
      </div>

      <p className={styles.hintRow}>
        <span>
          <span className={styles.kbd}>↑</span>{" "}
          <span className={styles.kbd}>↓</span> to move,{" "}
          <span className={styles.kbd}>↵</span> to open
        </span>
        {query.trim().length >= 2 ? (
          <span className={styles.count}>{results.length} results</span>
        ) : null}
      </p>

      {query.trim().length < 2 ? (
        <p className={styles.empty}>
          Type at least two characters. Everything is searched at once — rules,
          the FAQ, action cards, technologies, units, factions, agendas,
          objectives, strategy cards, galactic events, exploration, relics and
          promissory notes.
        </p>
      ) : results.length === 0 ? (
        <p className={styles.empty}>
          Nothing matches “{query.trim()}”. Content from expansions you have not
          enabled is not searched — try switching more on from the top bar.
        </p>
      ) : (
        <div className={styles.results}>
          {results.map((entry, i) => (
            <button
              key={entry.id}
              type="button"
              className={[styles.result, i === active && styles.active]
                .filter(Boolean)
                .join(" ")}
              onClick={() => go(entry)}
              onMouseEnter={() => setCursor(i)}
            >
              <span className={styles.body}>
                <span className={styles.name}>{entry.name}</span>
                {entry.detail ? (
                  <span className={styles.detail}>{entry.detail}</span>
                ) : null}
              </span>
              <span className={styles.meta}>
                <Badge tone="accent">{entry.kind}</Badge>
                {entry.expansion !== "base" ? (
                  <Badge tone="plasma">
                    {EXPANSION_BY_ID[entry.expansion].shortName}
                  </Badge>
                ) : null}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Opens search on "/" or Cmd/Ctrl-K from anywhere, as long as the user is not
 * already typing into a field.
 */
export function useGlobalSearchShortcut(onOpen: () => void) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const isSlash = event.key === "/" && !event.metaKey && !event.ctrlKey;
      const isCmdK = event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey);
      if (!isSlash && !isCmdK) return;

      const target = event.target as HTMLElement | null;
      if (
        isSlash &&
        target &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
      ) {
        return;
      }
      event.preventDefault();
      onOpen();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onOpen]);
}
