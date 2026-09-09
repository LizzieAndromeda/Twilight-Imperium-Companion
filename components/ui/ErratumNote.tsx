"use client";

import type { ErratumKind } from "@/lib/types";
import { ERRATA } from "@/data/errata.generated";
import styles from "./ErratumNote.module.css";

/**
 * Shows the official correction for a component, if there is one.
 *
 * Errata are corrections to printed wording, so they belong next to the card
 * rather than on a page of their own — you want to see them while you are
 * reading the thing they correct. The words that actually changed are
 * underlined, because that is usually all you need.
 */
export function ErratumNote({
  name,
  kind,
}: {
  name: string;
  /** Narrow the match when two components could share a name. */
  kind?: ErratumKind | ErratumKind[];
}) {
  const kinds = kind ? (Array.isArray(kind) ? kind : [kind]) : null;
  const erratum = ERRATA.find(
    (e) =>
      e.name.toLowerCase() === name.trim().toLowerCase() &&
      (!kinds || kinds.includes(e.kind)),
  );
  if (!erratum) return null;

  return (
    <p className={styles.note}>
      <span className={styles.tag}>Errata</span>
      <span>
        {erratum.parts.map((part, i) => (
          <span key={i} className={part.changed ? styles.changed : undefined}>
            {part.text}
            {i < erratum.parts.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    </p>
  );
}
