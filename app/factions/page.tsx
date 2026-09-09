"use client";

import { useMemo, useState } from "react";
import type { Faction } from "@/lib/types";
import { FACTIONS } from "@/data/factions";
import { EXPANSION_BY_ID } from "@/lib/expansions";
import { useSettings } from "@/state/SettingsProvider";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  Badge,
  Card,
  EmptyState,
  Modal,
  SearchInput,
  Segmented,
} from "@/components/ui";
import { UsersIcon } from "@/components/ui/icons";
import styles from "./factions.module.css";

type DifficultyFilter = "all" | "Low" | "Medium" | "High";

const DIFFICULTY_TONE = {
  Low: "success",
  Medium: "accent",
  High: "danger",
} as const;

export default function FactionsPage() {
  const { scope, hydrated } = useSettings();
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("all");
  const [selected, setSelected] = useState<Faction | null>(null);

  const available = useMemo(() => scope(FACTIONS), [scope]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return available.filter((faction) => {
      if (difficulty !== "all" && faction.difficulty !== difficulty) return false;
      if (!q) return true;
      return [
        faction.name,
        faction.tagline ?? "",
        faction.playstyle ?? "",
        ...faction.abilities.flatMap((a) => [a.name, a.text]),
        ...(faction.leaders ?? []).flatMap((l) => [l.name, l.ability]),
        faction.flagship?.name ?? "",
        faction.mech?.name ?? "",
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [available, query, difficulty]);

  return (
    <>
      <PageHeader
        eyebrow="Factions"
        title="Thirty ways to lose friends"
        lede="Every faction your enabled expansions bring to the table — abilities, leaders, unique units and setup, straight off the faction sheet, with a note on what each one is actually trying to do."
      />

      <div className={styles.controls}>
        <SearchInput
          value={query}
          onValueChange={setQuery}
          placeholder="Search factions and abilities…"
          aria-label="Search factions"
        />
        <Segmented
          label="Filter by difficulty"
          value={difficulty}
          onValueChange={setDifficulty}
          options={[
            { value: "all", label: "All" },
            { value: "Low", label: "Low" },
            { value: "Medium", label: "Medium" },
            { value: "High", label: "High" },
          ]}
        />
        <span className={styles.count}>
          {results.length} of {available.length}
        </span>
      </div>

      {results.length === 0 && hydrated ? (
        <EmptyState icon={<UsersIcon size={26} />} title="No factions match">
          Nothing here fits that search. Prophecy of Kings, Codex III and
          Thunder&apos;s Edge add another 13 factions between them — enable them
          from the top bar.
        </EmptyState>
      ) : (
        <div className={styles.grid}>
          {results.map((faction) => (
            <Card
              key={faction.id}
              interactive
              className={styles.card}
              role="button"
              tabIndex={0}
              onClick={() => setSelected(faction)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelected(faction);
                }
              }}
            >
              <div className={styles.cardTop}>
                <h3 className={styles.name}>{faction.name}</h3>
              </div>
              <p className={styles.tagline}>
                {faction.tagline ?? faction.abilities[0]?.text ?? ""}
              </p>
              <div className={styles.cardFoot}>
                <Badge tone={DIFFICULTY_TONE[faction.difficulty]}>
                  {faction.difficulty}
                </Badge>
                {faction.expansion !== "base" ? (
                  <Badge tone="plasma">
                    {EXPANSION_BY_ID[faction.expansion].shortName}
                  </Badge>
                ) : null}
                <span className={styles.abilityCount}>
                  {faction.abilities.length} abilities
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={selected !== null}
        onOpenChange={(open) => !open && setSelected(null)}
        wide
        title={selected?.name ?? ""}
        description={selected ? EXPANSION_BY_ID[selected.expansion].name : undefined}
      >
        {selected ? <FactionDetail faction={selected} /> : null}
      </Modal>
    </>
  );
}

const LEADER_CLASS = {
  Agent: styles.leaderAgent,
  Commander: styles.leaderCommander,
  Hero: styles.leaderHero,
} as const;

function FactionDetail({ faction }: { faction: Faction }) {
  return (
    <div>
      {faction.tagline ? (
        <p className={styles.detailTagline}>{faction.tagline}</p>
      ) : null}

      <div className={styles.detailMeta}>
        <Badge tone={DIFFICULTY_TONE[faction.difficulty]}>
          {faction.difficulty} complexity
        </Badge>
        <Badge tone={faction.expansion === "base" ? "neutral" : "plasma"}>
          {EXPANSION_BY_ID[faction.expansion].shortName}
        </Badge>
        {faction.color ? <Badge>{faction.color}</Badge> : null}
      </div>

      <h4 className={styles.subhead}>Faction abilities</h4>
      <div className={styles.abilities}>
        {faction.abilities.map((ability) => (
          <div key={ability.name} className={styles.ability}>
            <p className={styles.abilityName}>{ability.name}</p>
            <p className={styles.abilityText}>{ability.text}</p>
          </div>
        ))}
      </div>

      <h4 className={styles.subhead}>Setup</h4>
      <div className={styles.statGrid}>
        {faction.homePlanets?.length ? (
          <Stat label="Home planets" items={faction.homePlanets} />
        ) : null}
        {faction.startingUnits?.length ? (
          <Stat label="Starting units" items={faction.startingUnits} />
        ) : null}
        {faction.startingTech?.length ? (
          <Stat label="Starting tech" items={faction.startingTech} />
        ) : null}
        {faction.commodities !== undefined ? (
          <Stat label="Commodities" items={[String(faction.commodities)]} />
        ) : null}
      </div>

      {faction.leaders?.length ? (
        <>
          <h4 className={styles.subhead}>Leaders</h4>
          <div className={styles.stack}>
            {faction.leaders.map((leader, i) => (
              <div
                key={`${leader.role}-${leader.name}-${i}`}
                className={[styles.leader, LEADER_CLASS[leader.role]].join(" ")}
              >
                <div className={styles.leaderTop}>
                  <Badge>{leader.role}</Badge>
                  <span className={styles.leaderName}>{leader.name}</span>
                  {leader.unlock ? (
                    <span className={styles.leaderUnlock}>{leader.unlock}</span>
                  ) : null}
                </div>
                <p className={styles.abilityText}>{leader.ability}</p>
              </div>
            ))}
          </div>
        </>
      ) : null}

      {faction.flagship || faction.mech || faction.breakthrough ? (
        <>
          <h4 className={styles.subhead}>Unique units</h4>
          <div className={styles.stack}>
            {faction.flagship ? (
              <div className={styles.ability}>
                <p className={styles.abilityName}>
                  {faction.flagship.name} — Flagship
                </p>
                <p className={styles.unitStats}>
                  <span>
                    Cost <b>{faction.flagship.cost}</b>
                  </span>
                  <span>
                    Combat <b>{faction.flagship.combat}</b>
                  </span>
                  <span>
                    Move <b>{faction.flagship.move}</b>
                  </span>
                  <span>
                    Capacity <b>{faction.flagship.capacity}</b>
                  </span>
                </p>
                <p className={styles.abilityText}>{faction.flagship.text}</p>
              </div>
            ) : null}
            {faction.mech ? (
              <div className={styles.ability}>
                <p className={styles.abilityName}>{faction.mech.name} — Mech</p>
                <p className={styles.abilityText}>{faction.mech.text}</p>
              </div>
            ) : null}
            {faction.breakthrough ? (
              <div className={styles.ability}>
                <p className={styles.abilityName}>
                  {faction.breakthrough.name} — Breakthrough
                </p>
                <p className={styles.abilityText}>{faction.breakthrough.text}</p>
              </div>
            ) : null}
          </div>
        </>
      ) : null}

      {faction.playstyle ? (
        <>
          <h4 className={styles.subhead}>How it plays</h4>
          <p className={styles.playstyle}>{faction.playstyle}</p>
        </>
      ) : null}

      {faction.faq?.length ? (
        <>
          <h4 className={styles.subhead}>FAQ</h4>
          <div className={styles.stack}>
            {faction.faq.map((entry, i) => (
              <p key={i} className={styles.faq}>
                {entry}
              </p>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

function Stat({ label, items }: { label: string; items: string[] }) {
  return (
    <div className={styles.stat}>
      <p className={styles.statLabel}>{label}</p>
      <ul className={styles.statList}>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
