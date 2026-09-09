"use client";

import { useMemo, useState } from "react";
import type { FaqAuthority, FaqEntry } from "@/lib/types";
import { FAQ } from "@/data/faq.generated";
import { FACTION_BY_ID } from "@/data/factions";
import { useSettings } from "@/state/SettingsProvider";
import {
  Badge,
  EmptyState,
  FactionSymbol,
  SearchInput,
  Segmented,
} from "@/components/ui";
import { BookIcon } from "@/components/ui/icons";
import styles from "./rules.module.css";

const ALL = "all" as const;

/**
 * The FAQ's three tiers of authority, strongest first. This is the page's own
 * distinction and it decides how much a ruling is worth at the table.
 */
const AUTHORITY: Record<
  FaqAuthority,
  { label: string; short: string; color: string; tone: "success" | "cyan" | "danger" }
> = {
  "living-rules": {
    label: "In the Living Rules Reference",
    short: "Living Rules",
    color: "var(--success)",
    tone: "success",
  },
  designer: {
    label: "Official answer, not yet in the reference",
    short: "Designer",
    color: "var(--cyan)",
    tone: "cyan",
  },
  community: {
    label: "Community interpretation — never answered by FFG",
    short: "Community",
    color: "var(--danger)",
    tone: "danger",
  },
};

export function FaqBrowser() {
  const { scope, hydrated } = useSettings();
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<string>(ALL);
  const [authority, setAuthority] = useState<FaqAuthority | typeof ALL>(ALL);

  const available = useMemo(() => scope(FAQ), [scope]);

  const topics = useMemo(
    () => Array.from(new Set(available.map((e) => e.topic))),
    [available],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return available.filter((entry) => {
      if (topic !== ALL && entry.topic !== topic) return false;
      if (authority !== ALL && entry.authority !== authority) return false;
      if (!q) return true;
      return `${entry.question} ${entry.answer} ${entry.subtopic ?? ""}`
        .toLowerCase()
        .includes(q);
    });
  }, [available, query, topic, authority]);

  /** Grouped by topic, then by the subtopic the wiki files them under. */
  const groups = useMemo(() => {
    const byTopic = new Map<string, FaqEntry[]>();
    for (const entry of results) {
      const list = byTopic.get(entry.topic) ?? [];
      list.push(entry);
      byTopic.set(entry.topic, list);
    }
    return topics
      .filter((t) => byTopic.has(t))
      .map((t) => ({ topic: t, entries: byTopic.get(t) ?? [] }));
  }, [results, topics]);

  const livingRules = available.filter((e) => e.authority === "living-rules").length;

  return (
    <>
      <p className={styles.faqNote}>
        Answers confirmed by Fantasy Flight Games and the game&apos;s designer.
        The badge on each one matters: {livingRules} of these are printed in the
        Living Rules Reference, most of the rest are official answers that have
        not reached the reference yet, and anything marked Community is the
        community&apos;s reading of a question FFG has never answered.
      </p>

      <div className={styles.controls}>
        <div className={styles.searchRow}>
          <SearchInput
            value={query}
            onValueChange={setQuery}
            placeholder="Search questions and answers…"
            aria-label="Search the FAQ"
          />
          <span className={styles.count}>
            {results.length} of {available.length}
          </span>
        </div>

        <div className={styles.chips}>
          <button
            type="button"
            className={[styles.chip, topic === ALL && styles.chipOn]
              .filter(Boolean)
              .join(" ")}
            onClick={() => setTopic(ALL)}
            aria-pressed={topic === ALL}
          >
            All topics
          </button>
          {topics.map((t) => (
            <button
              key={t}
              type="button"
              className={[styles.chip, topic === t && styles.chipOn]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setTopic(t)}
              aria-pressed={topic === t}
            >
              {t}
            </button>
          ))}
        </div>

        <Segmented
          label="Filter by how authoritative the ruling is"
          value={authority}
          onValueChange={setAuthority}
          options={[
            { value: ALL, label: "Any source" },
            { value: "living-rules", label: "Living Rules" },
            { value: "designer", label: "Designer" },
            { value: "community", label: "Community" },
          ]}
        />
      </div>

      {results.length === 0 && hydrated ? (
        <EmptyState icon={<BookIcon size={26} />} title="Nothing matches">
          No ruling matches that search. Faction rulings for factions you have
          not enabled are hidden.
        </EmptyState>
      ) : (
        groups.map((group) => (
          <section key={group.topic} className={styles.faqGroup}>
            <h2 className={styles.faqGroupHead}>
              {group.topic} · {group.entries.length}
            </h2>
            <div className={styles.faqList}>
              {group.entries.map((entry) => (
                <FaqItem key={entry.id} entry={entry} />
              ))}
            </div>
          </section>
        ))
      )}
    </>
  );
}

function FaqItem({ entry }: { entry: FaqEntry }) {
  const authority = AUTHORITY[entry.authority];
  const faction = entry.faction ? FACTION_BY_ID.get(entry.faction) : null;

  return (
    <article
      className={styles.faqItem}
      style={{ ["--authority-color" as string]: authority.color }}
    >
      <p className={styles.faqQ}>
        <span className={[styles.qaMark, styles.qMark].join(" ")}>Q</span>
        <span>{entry.question}</span>
      </p>
      <p className={styles.faqA}>
        <span className={[styles.qaMark, styles.aMark].join(" ")}>A</span>
        <span>{entry.answer}</span>
      </p>
      <div className={styles.faqFoot}>
        <Badge tone={authority.tone} title={authority.label}>
          {authority.short}
        </Badge>
        {faction ? (
          <span className={styles.owner}>
            <FactionSymbol src={faction.symbol} name={faction.name} size={18} />
            <span className={styles.faqSub}>{faction.shortName}</span>
          </span>
        ) : entry.subtopic ? (
          <span className={styles.faqSub}>{entry.subtopic}</span>
        ) : null}
      </div>
    </article>
  );
}
