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
  FactionSymbol,
  Modal,
  SearchInput,
  Segmented,
} from "@/components/ui";
import { UsersIcon } from "@/components/ui/icons";
import styles from "./factions.module.css";

type DifficultyFilter = "all" | "Low" | "Medium" | "High";

/** The four technology colours, for the faction technology dots. */
const TECH_COLOR: Record<string, string> = {
  biotic: "var(--success)",
  propulsion: "var(--p-blue)",
  cybernetic: "var(--accent)",
  warfare: "var(--danger)",
};

const DIFFICULTY_TONE = {
  Low: "success",
  Medium: "accent",
  High: "danger",
} as const;

export default function FactionsPage() {
  const { scope, isEnabled, hydrated } = useSettings();
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
        // Only search what is actually on screen — a leader hidden because
        // Prophecy of Kings is off should not pull its faction into results.
        ...scope(faction.leaders ?? []).flatMap((l) => [l.name, l.ability]),
        faction.flagship?.name ?? "",
        faction.mech && isEnabled(faction.mech.expansion) ? faction.mech.name : "",
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [available, query, difficulty, scope, isEnabled]);

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
                <FactionSymbol
                  src={faction.symbol}
                  name={faction.name}
                  size={38}
                />
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
  const { scope, isEnabled } = useSettings();

  /**
   * A faction sheet is not all from one product. Leaders and mechs arrived
   * with Prophecy of Kings and breakthroughs with Thunder's Edge, on base game
   * factions too, so each block is filtered on its own tag rather than the
   * faction's.
   */
  const leaders = scope(faction.leaders ?? []);
  const factionTech = scope(faction.factionTech ?? []);
  const promissory = scope(faction.promissory ?? []);
  const mech = faction.mech && isEnabled(faction.mech.expansion) ? faction.mech : null;
  const breakthrough =
    faction.breakthrough && isEnabled(faction.breakthrough.expansion)
      ? faction.breakthrough
      : null;

  return (
    <div>
      <div className={styles.detailHead}>
        <FactionSymbol src={faction.symbol} name={faction.name} size={64} />
        {faction.tagline ? (
          <p className={styles.detailTagline}>{faction.tagline}</p>
        ) : null}
      </div>

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

      {leaders.length ? (
        <>
          <h4 className={styles.subhead}>Leaders</h4>
          <div className={styles.stack}>
            {leaders.map((leader, i) => (
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

      {faction.flagship || mech || breakthrough ? (
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
            {mech ? (
              <div className={styles.ability}>
                <p className={styles.abilityName}>{mech.name} — Mech</p>
                <p className={styles.abilityText}>{mech.text}</p>
              </div>
            ) : null}
            {breakthrough ? (
              <div className={styles.ability}>
                <p className={styles.abilityName}>
                  {breakthrough.name} — Breakthrough
                </p>
                {breakthrough.synergy ? (
                  <p className={styles.unitStats}>
                    <span>
                      Synergy <b>{breakthrough.synergy.join(" ↔ ")}</b>
                    </span>
                  </p>
                ) : null}
                <p className={styles.abilityText}>{breakthrough.text}</p>
              </div>
            ) : null}
            {faction.uniqueUnits?.map((unit) => (
              <div key={unit.name} className={styles.ability}>
                <p className={styles.abilityName}>{unit.name}</p>
                <p className={styles.unitStats}>
                  <span>
                    Cost <b>{unit.cost}</b>
                  </span>
                  <span>
                    Combat <b>{unit.combat}</b>
                  </span>
                  {unit.prerequisites ? (
                    <span>
                      Prerequisites <b>{unit.prerequisites}</b>
                    </span>
                  ) : null}
                </p>
                {unit.text ? (
                  <p className={styles.abilityText}>{unit.text}</p>
                ) : null}
              </div>
            ))}
          </div>
        </>
      ) : null}

      {factionTech.length ? (
        <>
          <h4 className={styles.subhead}>Faction technologies</h4>
          <div className={styles.stack}>
            {factionTech.map((tech) => (
              <div key={tech.name} className={styles.ability}>
                <p className={styles.abilityName}>
                  {tech.color ? (
                    <span
                      className={styles.techDot}
                      style={{ background: TECH_COLOR[tech.color] ?? "var(--text-dim)" }}
                    />
                  ) : null}
                  {tech.name}
                </p>
                <p className={styles.abilityText}>{tech.text}</p>
                {tech.prerequisites ? (
                  <p className={styles.unitStats}>
                    <span>
                      Prerequisites <b>{tech.prerequisites}</b>
                    </span>
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </>
      ) : null}

      {promissory.length ? (
        <>
          <h4 className={styles.subhead}>
            Promissory note{promissory.length > 1 ? "s" : ""}
          </h4>
          <div className={styles.stack}>
            {promissory.map((note) => (
              <div key={note.name} className={styles.ability}>
                <p className={styles.abilityName}>{note.name}</p>
                <p className={styles.abilityText}>{note.text}</p>
              </div>
            ))}
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
