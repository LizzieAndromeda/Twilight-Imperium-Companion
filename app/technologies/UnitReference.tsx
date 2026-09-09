"use client";

import { useMemo } from "react";
import type { Unit } from "@/lib/types";
import { UNITS, UNIT_CATEGORIES } from "@/data/units.generated";
import { useSettings } from "@/state/SettingsProvider";
import { Badge, EmptyState } from "@/components/ui";
import { TargetIcon } from "@/components/ui/icons";
import styles from "./technologies.module.css";

const STATS = [
  ["cost", "Cost"],
  ["combat", "Combat"],
  ["move", "Move"],
  ["capacity", "Capacity"],
] as const;

/**
 * The standard unit line, next to the upgrades that replace it.
 *
 * Flagships and mechs are deliberately absent: there is no generic printed
 * card for either, so their stats live on each faction's own page.
 */
export function UnitReference() {
  const { scope, hydrated } = useSettings();
  const units = useMemo(() => scope(UNITS), [scope]);

  if (!units.length && hydrated) {
    return (
      <EmptyState icon={<TargetIcon size={26} />} title="No units" />
    );
  }

  return (
    <>
      <p className={styles.unitNote}>
        What every faction starts from, before its own variants and the upgrades
        on the technology tab. Flagships and mechs are not here because there is
        no generic version of either — each faction prints its own, and those
        are on the faction pages.
      </p>

      {UNIT_CATEGORIES.map((category) => {
        const items = units.filter((u) => u.category === category);
        if (!items.length) return null;
        return (
          <section key={category} className={styles.unitGroup}>
            <h2 className={styles.groupHead}>{category}</h2>
            <div className={styles.unitGrid}>
              {items.map((unit) => (
                <UnitCard key={unit.id} unit={unit} />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}

function UnitCard({ unit }: { unit: Unit }) {
  // Structures have no cost or combat line, so the stat grid is skipped for
  // them rather than printed as four dashes.
  const hasStats = STATS.some(([key]) => unit[key]);

  return (
    <article className={styles.unit}>
      <h3 className={styles.unitName}>{unit.name}</h3>

      {hasStats ? (
        <div className={styles.unitStatRow}>
          {STATS.map(([key, label]) => (
            <div key={key} className={styles.unitStat}>
              <span className={styles.unitStatLabel}>{label}</span>
              <span
                className={[
                  styles.unitStatValue,
                  !unit[key] && styles.unitStatEmpty,
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {unit[key] ?? "—"}
              </span>
            </div>
          ))}
        </div>
      ) : null}

      {unit.requiresTechnology ? (
        <p className={styles.unitRequires}>
          No printed stats — a war sun only exists once you research the War Sun
          technology, which carries its values.
        </p>
      ) : null}

      {unit.abilities?.length ? (
        <ul className={styles.unitAbilities}>
          {unit.abilities.map((ability, i) => (
            <li key={i}>{ability}</li>
          ))}
        </ul>
      ) : null}

      {unit.expansion !== "base" ? (
        <div>
          <Badge tone="plasma">{unit.expansion}</Badge>
        </div>
      ) : null}
    </article>
  );
}
