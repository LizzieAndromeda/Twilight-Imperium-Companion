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
        faction.tagline,
        faction.playstyle,
        ...faction.abilities.flatMap((a) => [a.name, a.text]),
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
        title="Twenty-five ways to lose friends"
        lede="Every faction your enabled expansions bring to the table, with abilities, a difficulty read and a note on what each one is actually trying to do."
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
          Nothing here fits that search. Prophecy of Kings and Codex III add
          another eight factions — enable them from the top bar.
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
              <p className={styles.tagline}>{faction.tagline}</p>
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
        title={selected?.name ?? ""}
        description={selected ? EXPANSION_BY_ID[selected.expansion].name : undefined}
      >
        {selected ? <FactionDetail faction={selected} /> : null}
      </Modal>
    </>
  );
}

function FactionDetail({ faction }: { faction: Faction }) {
  return (
    <div>
      <p className={styles.detailTagline}>{faction.tagline}</p>

      <div className={styles.detailMeta}>
        <Badge tone={DIFFICULTY_TONE[faction.difficulty]}>
          {faction.difficulty} complexity
        </Badge>
        <Badge tone={faction.expansion === "base" ? "neutral" : "plasma"}>
          {EXPANSION_BY_ID[faction.expansion].shortName}
        </Badge>
      </div>

      <h4 className={styles.subhead}>Faction abilities</h4>
      {faction.abilities.length ? (
        <div className={styles.abilities}>
          {faction.abilities.map((ability) => (
            <div key={ability.name} className={styles.ability}>
              <p className={styles.abilityName}>{ability.name}</p>
              <p className={styles.abilityText}>{ability.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.missing}>
          Not catalogued yet — check the printed faction sheet.
        </p>
      )}

      <h4 className={styles.subhead}>How it plays</h4>
      <p className={styles.playstyle}>{faction.playstyle}</p>
    </div>
  );
}
