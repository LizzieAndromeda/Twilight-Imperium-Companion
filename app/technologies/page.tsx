"use client";

import { Suspense, useMemo, useState } from "react";
import type { TechColor, Technology, TechnologyKind } from "@/lib/types";
import { TECHNOLOGIES, TECH_COLORS } from "@/data/technologies.generated";
import { FACTION_BY_ID } from "@/data/factions";
import { EXPANSION_BY_ID } from "@/lib/expansions";
import { useQuerySeed, useTabParam, useUrlQuery } from "@/lib/useUrlQuery";
import { useSettings } from "@/state/SettingsProvider";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  Badge,
  Card,
  EmptyState,
  ErratumNote,
  FactionSymbol,
  SearchInput,
  Segmented,
  Tabs,
} from "@/components/ui";
import { TargetIcon } from "@/components/ui/icons";
import { UnitReference } from "./UnitReference";
import styles from "./technologies.module.css";

const ALL = "all" as const;

/** The four technology colours, matched to the tokens used elsewhere. */
export const TECH_COLOR_VAR: Record<TechColor, string> = {
  biotic: "var(--success)",
  propulsion: "var(--p-blue)",
  cybernetic: "var(--accent)",
  warfare: "var(--danger)",
};

const KIND_LABEL: Record<TechnologyKind, string> = {
  basic: "Basic",
  faction: "Faction",
  "unit-upgrade": "Unit upgrade",
};

export default function TechnologiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Technology"
        title="Every card on the tree"
        lede="Basic, faction and unit upgrade technologies with their prerequisites, effects and Codex revisions — and the standard unit line they upgrade from."
      />
      {/* Suspense so a global search result arriving with ?q=/?tab= can open
          the right tab with the query already in the box. */}
      <Suspense fallback={null}>
        <TechnologyTabs />
      </Suspense>
    </>
  );
}

const TECH_TABS = ["tech", "units"] as const;

/**
 * Remount the tabs when `?q=` or `?tab=` changes.
 *
 * Both are read once, when this mounts: the tab as `defaultValue`, the query
 * as each panel's initial search box. Arriving from a global search result
 * while already on the technology page changes only the query string, which remounts
 * nothing — so without a key the URL would say one thing and the page would
 * still be showing the last one.
 */
function TechnologyTabs() {
  const { q, tab } = useUrlQuery();
  return (
    <Tabs
      key={`${q}|${tab}`}
      label="Technology sections"
      defaultValue={useTabParam(TECH_TABS)}
      items={[
        { value: "tech", label: "Technologies", content: <TechnologyList /> },
        { value: "units", label: "Units", content: <UnitReference /> },
      ]}
    />
  );
}

function TechnologyList() {
  const { scope, hydrated } = useSettings();
  const [query, setQuery] = useState(useQuerySeed("tech"));
  const [color, setColor] = useState<TechColor | typeof ALL>(ALL);
  const [kind, setKind] = useState<TechnologyKind | typeof ALL>(ALL);

  const available = useMemo(() => scope(TECHNOLOGIES), [scope]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return available.filter((tech) => {
      if (color !== ALL && tech.color !== color) return false;
      if (kind !== ALL && tech.kind !== kind) return false;
      if (!q) return true;
      const faction = tech.faction ? FACTION_BY_ID.get(tech.faction)?.name : "";
      return [tech.name, tech.text, faction ?? "", tech.unit?.of ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [available, query, color, kind]);

  /**
   * Grouped by colour, and within a colour by level, since that is the order
   * you actually research them in. Unit upgrades have no colour and sit last.
   */
  const groups = useMemo(() => {
    const byColor = TECH_COLORS.map((c) => ({
      key: c as TechColor,
      label: c,
      items: results
        .filter((t) => t.color === c)
        .sort(
          (a, b) =>
            a.prerequisites.length - b.prerequisites.length ||
            a.name.localeCompare(b.name),
        ),
    }));
    const upgrades = results
      .filter((t) => t.color === null)
      .sort((a, b) => (a.unit?.of ?? "").localeCompare(b.unit?.of ?? "") || a.name.localeCompare(b.name));
    return [
      ...byColor,
      { key: "upgrades" as const, label: "Unit upgrades", items: upgrades },
    ].filter((g) => g.items.length);
  }, [results]);

  return (
    <>
      <div className={styles.controls}>
        <div className={styles.row}>
          <SearchInput
            value={query}
            onValueChange={setQuery}
            placeholder="Search technologies — try 'bombardment', 'wormhole', 'trade goods'…"
            aria-label="Search technologies"
          />
          <span className={styles.count}>
            {results.length} of {available.length}
          </span>
        </div>

        <div className={styles.chips}>
          <button
            type="button"
            className={[styles.chip, color === ALL && styles.chipOn]
              .filter(Boolean)
              .join(" ")}
            onClick={() => setColor(ALL)}
            aria-pressed={color === ALL}
          >
            All colours
          </button>
          {TECH_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              className={[styles.chip, color === c && styles.chipOn]
                .filter(Boolean)
                .join(" ")}
              style={{ ["--chip-color" as string]: TECH_COLOR_VAR[c] }}
              onClick={() => setColor(c)}
              aria-pressed={color === c}
            >
              <span
                className={styles.swatch}
                style={{ background: TECH_COLOR_VAR[c] }}
              />
              {c}
            </button>
          ))}

          <Segmented
            label="Filter by kind"
            value={kind}
            onValueChange={setKind}
            options={[
              { value: ALL, label: "All" },
              { value: "basic", label: "Basic" },
              { value: "faction", label: "Faction" },
              { value: "unit-upgrade", label: "Upgrades" },
            ]}
          />
        </div>
      </div>

      {results.length === 0 && hydrated ? (
        <EmptyState icon={<TargetIcon size={26} />} title="No technologies match">
          Nothing here fits that filter. Prophecy of Kings and Thunder&apos;s Edge
          add technologies of their own — enable them from the top bar.
        </EmptyState>
      ) : (
        groups.map((group) => (
          <section key={group.key} className={styles.group}>
            <h2
              className={styles.groupHead}
              style={{
                ["--group-color" as string]:
                  group.key === "upgrades"
                    ? "var(--text-dim)"
                    : TECH_COLOR_VAR[group.key as TechColor],
              }}
            >
              {group.label} · {group.items.length}
            </h2>
            <div className={styles.grid}>
              {group.items.map((tech) => (
                <TechnologyCard key={tech.id} tech={tech} />
              ))}
            </div>
          </section>
        ))
      )}
    </>
  );
}

function TechnologyCard({ tech }: { tech: Technology }) {
  const { isEnabled } = useSettings();
  const owner = tech.faction ? FACTION_BY_ID.get(tech.faction) : null;
  // Only name factions that are actually in play.
  const startingFor = (tech.startingFor ?? [])
    .map((id) => FACTION_BY_ID.get(id))
    .filter((f) => f && isEnabled(f.expansion))
    .map((f) => f!.shortName);

  return (
    <Card
      className={styles.card}
      style={{
        ["--tech-color" as string]: tech.color
          ? TECH_COLOR_VAR[tech.color]
          : "var(--line-strong)",
      }}
    >
      <div className={styles.cardTop}>
        <h3 className={styles.name}>{tech.name}</h3>
        <span
          className={styles.prereqs}
          title={
            tech.prerequisites.length
              ? `Requires ${tech.prerequisites.join(", ")}`
              : "No prerequisites"
          }
        >
          {tech.prerequisites.length ? (
            tech.prerequisites.map((p, i) => (
              <span
                key={i}
                className={styles.pip}
                style={{ background: TECH_COLOR_VAR[p] }}
              />
            ))
          ) : (
            <span className={styles.pipNone}>No prereq</span>
          )}
        </span>
      </div>

      {tech.unit ? (
        <p className={styles.stats}>
          <span>{tech.unit.of}</span>
          {tech.unit.cost ? (
            <span>
              Cost <b>{tech.unit.cost}</b>
            </span>
          ) : null}
          {tech.unit.combat ? (
            <span>
              Combat <b>{tech.unit.combat}</b>
            </span>
          ) : null}
          {tech.unit.move ? (
            <span>
              Move <b>{tech.unit.move}</b>
            </span>
          ) : null}
          {tech.unit.capacity ? (
            <span>
              Capacity <b>{tech.unit.capacity}</b>
            </span>
          ) : null}
        </p>
      ) : null}

      <p className={styles.text}>{tech.text}</p>

      <ErratumNote name={tech.name} kind={["technology", "faction-technology"]} />

      {tech.revisions?.filter((rev) => !rev.expansion || isEnabled(rev.expansion)).map((revision) => (
        <div key={revision.label} className={styles.revision}>
          <span className={styles.revisionTag}>{revision.label}</span>
          <span>{revision.text}</span>
        </div>
      ))}

      <div className={styles.foot}>
        <Badge>{KIND_LABEL[tech.kind]}</Badge>
        {tech.expansion !== "base" ? (
          <Badge tone="plasma">{EXPANSION_BY_ID[tech.expansion].shortName}</Badge>
        ) : null}
        {owner ? (
          <span className={styles.owner}>
            <FactionSymbol src={owner.symbol} name={owner.name} size={20} />
            {owner.shortName}
          </span>
        ) : null}
        {startingFor.length ? (
          <span className={styles.starting}>
            Starts with: {startingFor.join(", ")}
          </span>
        ) : null}
      </div>
    </Card>
  );
}
