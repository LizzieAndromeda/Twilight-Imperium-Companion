"use client";

import { useMemo, useState } from "react";
import type {
  AgendaKind,
  ExplorationDeck,
  ObjectiveStage,
  SecretObjectivePhase,
} from "@/lib/types";
import { STRATEGY_CARDS } from "@/data/strategyCards";
import {
  PUBLIC_OBJECTIVES,
  SECRET_OBJECTIVES,
  STAGE_POINTS,
} from "@/data/objectives";
import { GALACTIC_EVENTS } from "@/data/galacticEvents.generated";
import { AGENDAS } from "@/data/agendas.generated";
import {
  EXPLORATION_CARDS,
  EXPLORATION_DECKS,
  RELICS,
} from "@/data/exploration.generated";
import { EXPANSION_BY_ID } from "@/lib/expansions";
import { useSettings } from "@/state/SettingsProvider";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  Badge,
  Card,
  EmptyState,
  ErratumNote,
  SearchInput,
  Segmented,
  Tabs,
} from "@/components/ui";
import { TargetIcon } from "@/components/ui/icons";
import styles from "./reference.module.css";

export default function ReferencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Reference tables"
        title="The cards you keep re-reading"
        lede="Both abilities on every strategy card, the objective decks, the full agenda deck, and the galactic events that rewrite the rules before a game even starts."
      />
      <Tabs
        label="Reference sections"
        items={[
          { value: "strategy", label: "Strategy cards", content: <StrategyCards /> },
          { value: "objectives", label: "Public objectives", content: <Objectives /> },
          { value: "secrets", label: "Secret objectives", content: <Secrets /> },
          { value: "agendas", label: "Agendas", content: <Agendas /> },
          { value: "exploration", label: "Exploration", content: <Exploration /> },
          { value: "events", label: "Galactic events", content: <Events /> },
        ]}
      />
    </>
  );
}

function StrategyCards() {
  const { scope } = useSettings();

  const cards = useMemo(() => {
    const inScope = scope(STRATEGY_CARDS);
    // A Thunder's Edge Omega revision replaces the card it supersedes.
    const replaced = new Set(
      inScope.map((c) => c.supersedes).filter((n): n is number => n !== undefined),
    );
    return inScope
      .filter((c) => c.supersedes !== undefined || !replaced.has(c.initiative))
      .sort((a, b) => a.initiative - b.initiative);
  }, [scope]);

  return (
    <div className={styles.cards}>
      {cards.map((card) => (
        <Card key={`${card.expansion}-${card.initiative}`} className={styles.card}>
          <div className={styles.initiative} aria-label={`Initiative ${card.initiative}`}>
            {card.initiative}
          </div>
          <div className={styles.cardBody}>
            <h3 className={styles.cardName}>{card.name}</h3>

            <div className={styles.abilityBlock}>
              <p className={styles.abilityLabel}>Primary</p>
              <p className={styles.abilityText}>{card.primary}</p>
            </div>

            <div className={styles.abilityBlock}>
              <p className={styles.abilityLabel}>
                Secondary
                <span className={styles.cost}>{card.secondaryCost}</span>
              </p>
              <p className={styles.abilityText}>{card.secondary}</p>
              <ErratumNote name={card.name} kind="strategy-card" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

/** Colour by how far the event bends the rules. */
const COMPLEXITY_COLOR = ["var(--cyan)", "var(--accent)", "var(--danger)"];
const COMPLEXITY_LABEL = ["Light touch", "Moderate", "Rewrites the game"];

function Events() {
  const { scope, hydrated } = useSettings();
  const [query, setQuery] = useState("");

  const available = useMemo(() => scope(GALACTIC_EVENTS), [scope]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return available;
    return available.filter((event) =>
      `${event.name} ${event.effect.join(" ")}`.toLowerCase().includes(q),
    );
  }, [available, query]);

  return (
    <>
      <p className={styles.note}>
        Galactic events are optional cards chosen during setup that change the
        rules for the whole game. Draw one at random, agree on one in advance, or
        stack several. Codex IV introduced them and Thunder&apos;s Edge added
        sixteen more — enable those products to see them here.
      </p>

      {available.length === 0 && hydrated ? (
        <EmptyState icon={<TargetIcon size={26} />} title="No galactic events">
          Galactic events come from Codex IV and Thunder&apos;s Edge. Enable
          either from the top bar.
        </EmptyState>
      ) : (
        <>
          <div className={styles.objControls}>
            <SearchInput
              value={query}
              onValueChange={setQuery}
              placeholder="Search galactic events…"
              aria-label="Search galactic events"
            />
            <span className={styles.count}>
              {results.length} of {available.length}
            </span>
          </div>

          <div className={styles.eventList}>
            {results.map((event) => {
              const color =
                COMPLEXITY_COLOR[event.complexity - 1] ?? "var(--line-strong)";
              return (
                <Card
                  key={event.id}
                  className={styles.event}
                  style={{ ["--complexity-color" as string]: color }}
                >
                  <div className={styles.eventTop}>
                    <h4 className={styles.eventName}>{event.name}</h4>
                  </div>
                  <ul className={styles.eventEffect}>
                    {event.effect.map((line, i) => (
                      <li key={i}>
                        <span className={styles.eventBullet} />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                  <div className={styles.eventFoot}>
                    <Badge tone={event.complexity >= 3 ? "danger" : "accent"}>
                      Complexity {event.complexity}
                    </Badge>
                    <span className={styles.count}>
                      {COMPLEXITY_LABEL[event.complexity - 1]}
                    </span>
                    <Badge tone="plasma">
                      {EXPANSION_BY_ID[event.expansion].shortName}
                    </Badge>
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

/** Deck colours, matched to the planet traits they correspond to. */
const DECK_COLOR: Record<ExplorationDeck, string> = {
  Cultural: "var(--p-blue)",
  Industrial: "var(--success)",
  Hazardous: "var(--danger)",
  Frontier: "var(--plasma)",
};

function Exploration() {
  const { scope, isEnabled, hydrated } = useSettings();
  const [query, setQuery] = useState("");

  const cards = useMemo(() => scope(EXPLORATION_CARDS), [scope]);
  const relics = useMemo(() => scope(RELICS), [scope]);

  const q = query.trim().toLowerCase();
  const match = (...fields: string[]) =>
    !q || fields.join(" ").toLowerCase().includes(q);

  const shownCards = cards.filter((c) => match(c.name, c.text, c.deck));
  const shownRelics = relics.filter((r) => match(r.name, r.text));

  if (!cards.length && !relics.length && hydrated) {
    return (
      <EmptyState icon={<TargetIcon size={26} />} title="No exploration content">
        Exploration and relics arrived with Prophecy of Kings. Enable it from the
        top bar.
      </EmptyState>
    );
  }

  return (
    <>
      <p className={styles.note}>
        Taking a planet for the first time draws from the deck matching its
        trait; a ship on a frontier token draws from the frontier deck. Purge
        three matching relic fragments to take a relic.
      </p>

      <div className={styles.objControls}>
        <SearchInput
          value={query}
          onValueChange={setQuery}
          placeholder="Search exploration cards and relics…"
          aria-label="Search exploration cards and relics"
        />
        <span className={styles.count}>
          {shownCards.length + shownRelics.length} of {cards.length + relics.length}
        </span>
      </div>

      {EXPLORATION_DECKS.map((deck) => {
        const items = shownCards.filter((c) => c.deck === deck);
        if (!items.length) return null;
        const physical = items.reduce((n, c) => n + c.copies, 0);
        return (
          <section key={deck} className={styles.explSection}>
            <h3 className={styles.abilityLabel}>
              {deck} deck — {items.length} cards, {physical} in the deck
            </h3>
            <div className={styles.explList}>
              {items.map((card) => (
                <article
                  key={card.id}
                  className={styles.expl}
                  style={{ ["--deck-color" as string]: DECK_COLOR[card.deck] }}
                >
                  <div className={styles.explTop}>
                    <h4 className={styles.explName}>{card.name}</h4>
                    {card.copies > 1 ? (
                      <span className={styles.explCopies}>×{card.copies}</span>
                    ) : null}
                  </div>
                  <p className={styles.explText}>{card.text}</p>
                  {card.fragment || card.expansion !== "pok" ? (
                    <div className={styles.explFoot}>
                      {card.fragment ? (
                        <Badge tone="accent">Relic fragment</Badge>
                      ) : null}
                      {card.expansion !== "pok" ? (
                        <Badge tone="plasma">
                          {EXPANSION_BY_ID[card.expansion].shortName}
                        </Badge>
                      ) : null}
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        );
      })}

      {shownRelics.length ? (
        <section className={styles.explSection}>
          <h3 className={styles.abilityLabel}>Relics — {shownRelics.length}</h3>
          <div className={styles.explList}>
            {shownRelics.map((relic) => (
              <article
                key={relic.id}
                className={styles.expl}
                style={{ ["--deck-color" as string]: "var(--accent)" }}
              >
                <div className={styles.explTop}>
                  <h4 className={styles.explName}>{relic.name}</h4>
                </div>
                <p className={styles.explText}>{relic.text}</p>
                {/* A later product can reprint a relic with new wording. */}
                {relic.revisions
                  ?.filter((rev) => isEnabled(rev.expansion))
                  .map((rev, i) => (
                    <p key={i} className={styles.relicRevision}>
                      <span className={styles.relicRevisionTag}>
                        {EXPANSION_BY_ID[rev.expansion].shortName}
                      </span>
                      <span>{rev.text}</span>
                    </p>
                  ))}
                <div className={styles.explFoot}>
                  <Badge tone="plasma">
                    {EXPANSION_BY_ID[relic.expansion].shortName}
                  </Badge>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}

type AgendaFilter = "all" | AgendaKind;

const AGENDA_COLOR: Record<AgendaKind, string> = {
  Law: "var(--plasma)",
  Directive: "var(--cyan)",
};

function Agendas() {
  const { scope, isEnabled, hydrated } = useSettings();
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<AgendaFilter>("all");

  const available = useMemo(() => {
    // Prophecy of Kings takes 13 base agendas out of the deck and replaces
    // them, so those are hidden only while it is enabled.
    const pok = isEnabled("pok");
    return scope(AGENDAS).filter((a) => !(pok && a.removedByPok));
  }, [scope, isEnabled]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return available.filter((agenda) => {
      if (kind !== "all" && agenda.kind !== kind) return false;
      if (!q) return true;
      return [agenda.name, agenda.elect ?? "", ...agenda.outcomes.map((o) => o.text)]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [available, query, kind]);

  return (
    <>
      <p className={styles.note}>
        The deck is 50 cards either way: Prophecy of Kings removes 13 base
        agendas and adds 13 of its own. Enabling it here swaps them out.
      </p>

      <div className={styles.objControls}>
        <SearchInput
          value={query}
          onValueChange={setQuery}
          placeholder="Search agendas…"
          aria-label="Search agendas"
        />
        <Segmented
          label="Filter by type"
          value={kind}
          onValueChange={setKind}
          options={[
            { value: "all", label: "All" },
            { value: "Law", label: "Laws" },
            { value: "Directive", label: "Directives" },
          ]}
        />
        <span className={styles.count}>
          {results.length} of {available.length}
        </span>
      </div>

      {results.length === 0 && hydrated ? (
        <EmptyState icon={<TargetIcon size={26} />} title="No agendas match">
          Nothing here fits that search.
        </EmptyState>
      ) : (
        <div className={styles.agendaList}>
          {results.map((agenda) => (
            <Card
              key={agenda.id}
              className={styles.agenda}
              style={{ ["--kind-color" as string]: AGENDA_COLOR[agenda.kind] }}
            >
              <div className={styles.agendaTop}>
                <h4 className={styles.agendaName}>{agenda.name}</h4>
                {agenda.elect ? (
                  <span className={styles.electTag}>Elect {agenda.elect}</span>
                ) : null}
              </div>

              <div className={styles.outcomes}>
                {agenda.outcomes.map((outcome, i) => (
                  <p key={i} className={styles.outcome}>
                    {outcome.label ? (
                      <span
                        className={[
                          styles.outcomeLabel,
                          outcome.label === "FOR"
                            ? styles.labelFor
                            : styles.labelAgainst,
                        ].join(" ")}
                      >
                        {outcome.label}
                      </span>
                    ) : null}
                    <span>{outcome.text}</span>
                  </p>
                ))}
              </div>

              <div className={styles.agendaFoot}>
                <Badge tone={agenda.kind === "Law" ? "plasma" : "cyan"}>
                  {agenda.kind}
                </Badge>
                {agenda.expansion !== "base" ? (
                  <Badge tone="plasma">
                    {EXPANSION_BY_ID[agenda.expansion].shortName}
                  </Badge>
                ) : null}
                {agenda.removedByPok ? (
                  <Badge tone="danger">Removed by PoK</Badge>
                ) : null}
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

type SecretPhaseFilter = "all" | SecretObjectivePhase;

/** Secret objectives are grouped by the phase their timing window sits in. */
const SECRET_PHASES: SecretObjectivePhase[] = ["Action", "Status", "Agenda"];

function Secrets() {
  const { scope, isEnabled, hydrated } = useSettings();
  const [query, setQuery] = useState("");
  const [phase, setPhase] = useState<SecretPhaseFilter>("all");

  const available = useMemo(() => scope(SECRET_OBJECTIVES), [scope]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return available.filter((objective) => {
      if (phase !== "all" && objective.phase !== phase) return false;
      if (!q) return true;
      return `${objective.name} ${objective.requirement} ${objective.omega ?? ""}`
        .toLowerCase()
        .includes(q);
    });
  }, [available, query, phase]);

  return (
    <>
      <p className={styles.note}>
        Every secret objective is worth 1 victory point and can only be scored by
        the player holding it. You are dealt two at setup and keep one, and may
        hold at most three at a time — scored ones included.
      </p>

      <div className={styles.objControls}>
        <SearchInput
          value={query}
          onValueChange={setQuery}
          placeholder="Search secret objectives…"
          aria-label="Search secret objectives"
        />
        <Segmented
          label="Filter by scoring phase"
          value={phase}
          onValueChange={setPhase}
          options={[
            { value: "all", label: "All" },
            ...SECRET_PHASES.map((p) => ({ value: p, label: p })),
          ]}
        />
        <span className={styles.count}>
          {results.length} of {available.length}
        </span>
      </div>

      {results.length === 0 && hydrated ? (
        <EmptyState icon={<TargetIcon size={26} />} title="No secret objectives match">
          Nothing here fits that search.
        </EmptyState>
      ) : (
        SECRET_PHASES.map((p) => {
          const items = results.filter((o) => o.phase === p);
          if (!items.length) return null;
          return (
            <section key={p} className={styles.objGroup}>
              <h3 className={styles.abilityLabel}>{p} phase — 1 victory point each</h3>
              <div className={styles.objList}>
                {items.map((objective) => (
                  <article key={objective.id} className={[styles.obj, styles.objSecret].join(" ")}>
                    <div className={styles.objTop}>
                      <h4 className={styles.objName}>{objective.name}</h4>
                      <span className={styles.objPoints}>1 VP</span>
                    </div>
                    <p className={styles.objReq}>{objective.requirement}</p>
                    {objective.omega && isEnabled(objective.omegaExpansion ?? "codex3") ? (
                      <p className={styles.objOmega}>
                        <span className={styles.omegaTag}>Ω {EXPANSION_BY_ID[objective.omegaExpansion ?? "codex3"].shortName}</span>
                        {objective.omega}
                      </p>
                    ) : null}
                    {objective.expansion !== "base" ? (
                      <div className={styles.objMeta}>
                        <Badge tone="plasma">
                          {EXPANSION_BY_ID[objective.expansion].shortName}
                        </Badge>
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>
          );
        })
      )}
    </>
  );
}

type StageFilter = "all" | ObjectiveStage;

function Objectives() {
  const { scope, isEnabled, hydrated } = useSettings();
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState<StageFilter>("all");

  const available = useMemo(() => scope(PUBLIC_OBJECTIVES), [scope]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return available.filter((objective) => {
      if (stage !== "all" && objective.stage !== stage) return false;
      if (!q) return true;
      return `${objective.name} ${objective.requirement}`.toLowerCase().includes(q);
    });
  }, [available, query, stage]);

  const groups: { stage: ObjectiveStage; items: typeof results }[] = [
    { stage: "I", items: results.filter((o) => o.stage === "I") },
    { stage: "II", items: results.filter((o) => o.stage === "II") },
  ];

  return (
    <>
      <p className={styles.note}>
        The full public objective decks — 20 Stage I and 20 Stage II across the
        base game and Prophecy of Kings. The tracker still lets you type in an
        objective by hand if you need one this list does not carry.
      </p>

      <div className={styles.objControls}>
        <SearchInput
          value={query}
          onValueChange={setQuery}
          placeholder="Search objectives…"
          aria-label="Search objectives"
        />
        <Segmented
          label="Filter by stage"
          value={stage}
          onValueChange={setStage}
          options={[
            { value: "all", label: "All" },
            { value: "I", label: "Stage I" },
            { value: "II", label: "Stage II" },
          ]}
        />
      </div>

      {results.length === 0 && hydrated ? (
        <EmptyState icon={<TargetIcon size={26} />} title="No objectives match">
          Nothing here fits that search.
        </EmptyState>
      ) : (
        groups
          .filter((group) => group.items.length > 0)
          .map((group) => (
            <section key={group.stage} className={styles.objGroup}>
              <h3 className={styles.abilityLabel}>
                Stage {group.stage} — {STAGE_POINTS[group.stage]} victory point
                {STAGE_POINTS[group.stage] > 1 ? "s" : ""} each
              </h3>
              <div className={styles.objList}>
                {group.items.map((objective) => (
                  <article
                    key={objective.id}
                    className={[
                      styles.obj,
                      objective.stage === "I" ? styles.objStage1 : styles.objStage2,
                    ].join(" ")}
                  >
                    <div className={styles.objTop}>
                      <h4 className={styles.objName}>{objective.name}</h4>
                      <span className={styles.objPoints}>
                        {STAGE_POINTS[objective.stage]} VP
                      </span>
                    </div>
                    <p className={styles.objReq}>{objective.requirement}</p>
                    {objective.omega && isEnabled(objective.omegaExpansion ?? "codex3") ? (
                      <p className={styles.objOmega}>
                        <span className={styles.omegaTag}>Ω {EXPANSION_BY_ID[objective.omegaExpansion ?? "codex3"].shortName}</span>
                        {objective.omega}
                      </p>
                    ) : null}
                    {objective.expansion !== "base" ? (
                      <div className={styles.objMeta}>
                        <Badge tone="plasma">
                          {EXPANSION_BY_ID[objective.expansion].shortName}
                        </Badge>
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>
          ))
      )}
    </>
  );
}
