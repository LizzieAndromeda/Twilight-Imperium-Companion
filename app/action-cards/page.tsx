"use client";

import { Suspense, useMemo, useState } from "react";
import type { ActionCard, ActionCardPhase } from "@/lib/types";
import { ACTION_CARDS, ACTION_CARD_PHASES } from "@/data/actionCards";
import { EXPANSION_BY_ID } from "@/lib/expansions";
import { useUrlQuery } from "@/lib/useUrlQuery";
import { useSettings } from "@/state/SettingsProvider";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge, Card, EmptyState, ErratumNote, SearchInput, Toggle } from "@/components/ui";
import { BookIcon } from "@/components/ui/icons";
import styles from "./actionCards.module.css";

const ALL = "all" as const;

/** Timing colour, so the deck reads by phase at a glance. */
const PHASE_COLOR: Record<ActionCardPhase, string> = {
  Strategy: "var(--cyan)",
  Action: "var(--accent)",
  Status: "var(--success)",
  Agenda: "var(--plasma)",
  Any: "var(--text-dim)",
};

export default function ActionCardsPage() {
  // Suspense so a search result arriving with ?q= can seed the box below.
  return (
    <Suspense fallback={null}>
      <ActionCardsView />
    </Suspense>
  );
}

function ActionCardsView() {
  const { scope, hydrated } = useSettings();
  const { q } = useUrlQuery();
  const [query, setQuery] = useState(q);
  const [phase, setPhase] = useState<ActionCardPhase | typeof ALL>(ALL);
  const [notesOnly, setNotesOnly] = useState(false);

  const available = useMemo(() => {
    const inScope = scope(ACTION_CARDS);
    // A Thunder's Edge Omega card replaces its Codex I original, so hide the
    // original whenever both products are switched on.
    const replaced = new Set(
      inScope.map((c) => c.supersedes).filter((id): id is string => Boolean(id)),
    );
    return inScope.filter((c) => !replaced.has(c.id));
  }, [scope]);

  // Only offer timings that survive the expansion filter.
  const phases = useMemo(
    () => ACTION_CARD_PHASES.filter((p) => available.some((c) => c.phase === p)),
    [available],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return available.filter((card) => {
      if (phase !== ALL && card.phase !== phase) return false;
      if (notesOnly && !card.note && !card.faq?.length) return false;
      if (!q) return true;
      return [card.name, card.window, card.text, card.note ?? "", ...(card.faq ?? [])]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [available, query, phase, notesOnly]);

  const noteCount = available.filter((c) => c.note || c.faq?.length).length;
  const copies = available.reduce((n, c) => n + c.copies, 0);

  return (
    <>
      <PageHeader
        eyebrow="Action cards"
        title="The whole deck, searchable"
        lede="Every action card from your enabled products, with its timing window and the rules clarifications the community has had to settle."
      />

      <p className={styles.provenance}>
        Card text comes from the{" "}
        <a
          href="https://github.com/AsyncTI4/TI4_map_generator_bot"
          target="_blank"
          rel="noreferrer noopener"
        >
          AsyncTI4 map generator bot
        </a>{" "}
        (public domain) and the{" "}
        <a
          href="https://twilight-imperium.fandom.com/wiki/Action_Cards"
          target="_blank"
          rel="noreferrer noopener"
        >
          Twilight Imperium wiki
        </a>
        , which also supplies the official FAQ rulings. {noteCount} of the{" "}
        {available.length} cards shown carry a clarification; the rest have no
        recorded interaction to settle, and nothing has been invented to fill the
        gap.
      </p>

      <div className={styles.controls}>
        <div className={styles.searchRow}>
          <SearchInput
            value={query}
            onValueChange={setQuery}
            placeholder="Search card names, timing and text…"
            aria-label="Search action cards"
          />
          <span className={styles.count}>
            {results.length} of {available.length} · {copies} in deck
          </span>
        </div>

        <div className={styles.chips}>
          <button
            type="button"
            className={[styles.chip, phase === ALL && styles.chipOn]
              .filter(Boolean)
              .join(" ")}
            onClick={() => setPhase(ALL)}
            aria-pressed={phase === ALL}
          >
            All timings
          </button>
          {phases.map((p) => (
            <button
              key={p}
              type="button"
              className={[styles.chip, phase === p && styles.chipOn]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setPhase(p)}
              aria-pressed={phase === p}
            >
              {p}
            </button>
          ))}

          <span className={styles.chipDivider} />

          <Toggle
            checked={notesOnly}
            onCheckedChange={setNotesOnly}
            label="Show only cards with a clarification or FAQ ruling"
          />
          <span className={styles.count}>Clarifications only ({noteCount})</span>
        </div>
      </div>

      {results.length === 0 && hydrated ? (
        <EmptyState icon={<BookIcon size={26} />} title="No cards match">
          Nothing here fits that filter. Prophecy of Kings and Codex I add another
          34 cards between them — enable them from the top bar.
        </EmptyState>
      ) : (
        <div className={styles.grid}>
          {results.map((card) => (
            <ActionCardTile key={card.id} card={card} />
          ))}
        </div>
      )}
    </>
  );
}

function ActionCardTile({ card }: { card: ActionCard }) {
  return (
    <Card
      className={styles.card}
      style={{ ["--phase-color" as string]: PHASE_COLOR[card.phase] }}
    >
      <div className={styles.cardTop}>
        <h3 className={styles.name}>{card.name}</h3>
        {card.copies > 1 ? (
          <span className={styles.copies}>×{card.copies}</span>
        ) : null}
      </div>

      <p className={styles.window}>{card.window || card.phase}</p>

      <p className={styles.text}>{card.text}</p>

      <ErratumNote name={card.name} kind="action-card" />

      {card.note ? (
        <div className={styles.note}>
          <span className={styles.noteLabel}>Note</span>
          <span>{card.note}</span>
        </div>
      ) : null}

      {card.faq?.map((ruling, i) => (
        <div key={i} className={[styles.note, styles.faq].join(" ")}>
          <span className={[styles.noteLabel, styles.faqLabel].join(" ")}>FAQ</span>
          <span>{ruling}</span>
        </div>
      ))}

      {card.flavor ? <p className={styles.flavor}>{card.flavor}</p> : null}

      <div className={styles.cardFoot}>
        <Badge tone={card.expansion === "base" ? "neutral" : "plasma"}>
          {EXPANSION_BY_ID[card.expansion].shortName}
        </Badge>
        <Badge>{card.phase} phase</Badge>
        {card.supersedes ? <Badge tone="accent">Replaces Codex I</Badge> : null}
      </div>
    </Card>
  );
}
