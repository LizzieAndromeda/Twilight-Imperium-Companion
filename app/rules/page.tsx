"use client";

import { useCallback, useMemo, useState } from "react";
import type { Rule, RuleCategory } from "@/lib/types";
import { RULES, RULE_BY_ID } from "@/data/rules";
import { EXPANSION_BY_ID } from "@/lib/expansions";
import { useSettings } from "@/state/SettingsProvider";
import { PageHeader } from "@/components/layout/PageHeader";
import { Accordion, Badge, EmptyState, SearchInput } from "@/components/ui";
import type { AccordionItem } from "@/components/ui";
import { BookIcon } from "@/components/ui/icons";
import styles from "./rules.module.css";

const ALL = "all" as const;

/** Everything the search box looks at, joined once per rule. */
function haystack(rule: Rule): string {
  return [rule.term, rule.summary, rule.category, ...rule.clauses, rule.gotcha ?? ""]
    .join(" ")
    .toLowerCase();
}

export default function RulesPage() {
  const { scope, hydrated } = useSettings();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<RuleCategory | typeof ALL>(ALL);
  const [open, setOpen] = useState<string[]>([]);

  const available = useMemo(() => scope(RULES), [scope]);

  // Related links must not point at rules the expansion filter has hidden.
  const availableIds = useMemo(
    () => new Set(available.map((r) => r.id)),
    [available],
  );

  // Only offer categories that survive the current expansion filter.
  const categories = useMemo(
    () => Array.from(new Set(available.map((r) => r.category))),
    [available],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return available.filter((rule) => {
      if (category !== ALL && rule.category !== category) return false;
      if (!q) return true;
      return haystack(rule).includes(q);
    });
  }, [available, query, category]);

  /** Open a related rule and bring it into view. */
  const jumpTo = useCallback(
    (id: string) => {
      // Clear filters that might be hiding the target before opening it.
      setQuery("");
      setCategory(ALL);
      setOpen((prev) => (prev.includes(id) ? prev : [...prev, id]));
      requestAnimationFrame(() => {
        document
          .getElementById(`rule-${id}`)
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    },
    [],
  );

  const items: AccordionItem[] = results.map((rule) => ({
    value: rule.id,
    id: `rule-${rule.id}`,
    header: (
      <span className={styles.rowHead}>
        <span className={styles.term}>{rule.term}</span>
        <span className={styles.rowSummary}>{rule.summary}</span>
        <span className={styles.rowBadges}>
          {rule.expansion !== "base" ? (
            <Badge tone="plasma">{EXPANSION_BY_ID[rule.expansion].shortName}</Badge>
          ) : null}
          <Badge>{rule.category}</Badge>
        </span>
      </span>
    ),
    content: (
      <RuleBody rule={rule} onJump={jumpTo} availableIds={availableIds} />
    ),
  }));

  return (
    <>
      <PageHeader
        eyebrow="Rules reference"
        title="Look it up, keep playing"
        lede="The rules that actually stop a game, written as ordered steps rather than prose. Entries from expansions you have not enabled are hidden."
      />

      <div className={styles.controls}>
        <div className={styles.searchRow}>
          <SearchInput
            value={query}
            onValueChange={setQuery}
            placeholder="Search rules — try 'retreat', 'production', 'bombardment'…"
            aria-label="Search rules"
          />
          <span className={styles.count}>
            {results.length} of {available.length}
          </span>
        </div>

        <div className={styles.chips}>
          <button
            type="button"
            className={[styles.chip, category === ALL && styles.chipOn]
              .filter(Boolean)
              .join(" ")}
            onClick={() => setCategory(ALL)}
            aria-pressed={category === ALL}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className={[styles.chip, category === c && styles.chipOn]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {results.length === 0 && hydrated ? (
        <EmptyState icon={<BookIcon size={26} />} title="Nothing matches">
          No rule matches “{query}” in this category. Try a broader search, or
          enable more expansions from the top bar.
        </EmptyState>
      ) : (
        <Accordion items={items} value={open} onValueChange={setOpen} />
      )}
    </>
  );
}

function RuleBody({
  rule,
  onJump,
  availableIds,
}: {
  rule: Rule;
  onJump: (id: string) => void;
  availableIds: Set<string>;
}) {
  return (
    <div>
      <p className={styles.summary}>{rule.summary}</p>

      <ul className={styles.clauses}>
        {rule.clauses.map((clause, i) => (
          <li key={i} className={styles.clause}>
            <span className={styles.bullet} />
            <span>{clause}</span>
          </li>
        ))}
      </ul>

      {rule.gotcha ? (
        <div className={styles.gotcha}>
          <span className={styles.gotchaLabel}>Watch out</span>
          <span>{rule.gotcha}</span>
        </div>
      ) : null}

      {rule.related?.length ? (
        <div className={styles.related}>
          <span className={styles.relatedLabel}>See also</span>
          {rule.related.map((id) => {
            const target = RULE_BY_ID.get(id);
            if (!target || !availableIds.has(id)) return null;
            return (
              <button
                key={id}
                type="button"
                className={styles.relatedBtn}
                onClick={() => onJump(id)}
              >
                {target.term}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
