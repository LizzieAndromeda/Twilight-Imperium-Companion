import type { Expansion, ExpansionId } from "./types";

/**
 * The products whose content this app carries. Order matters: it is the order
 * the checkboxes appear in Settings and the order badges sort in.
 */
export const EXPANSIONS: Expansion[] = [
  {
    id: "base",
    name: "Twilight Imperium: Fourth Edition",
    shortName: "Base",
    year: "2017",
    description:
      "The core game: 17 factions, the four-phase game round, and the race to 10 victory points.",
    locked: true,
  },
  {
    id: "pok",
    name: "Prophecy of Kings",
    shortName: "PoK",
    year: "2020",
    description:
      "The major expansion. Adds 7 factions, leaders, mechs, exploration, relics, legendary planets and a larger galaxy.",
  },
  {
    id: "codex1",
    name: "Codex I — Ordinian",
    shortName: "Codex I",
    year: "2020",
    description:
      "Free card errata plus a scenario. Enable it if you play with the corrected card text.",
  },
  {
    id: "codex2",
    name: "Codex II — Affinity",
    shortName: "Codex II",
    year: "2020",
    description:
      "Adds Alliance promissory notes, which let players share their commander abilities.",
  },
  {
    id: "codex3",
    name: "Codex III — Vigil",
    shortName: "Codex III",
    year: "2021",
    description:
      "Adds The Council Keleres, a 25th faction assembled from the councils of Mecatol Rex.",
  },
  {
    id: "codex4",
    name: "Codex IV — Liberation",
    shortName: "Codex IV",
    year: "2022",
    description: "A large co-operative scenario with its own cards and rules.",
  },
];

export const EXPANSION_BY_ID: Record<ExpansionId, Expansion> = Object.fromEntries(
  EXPANSIONS.map((e) => [e.id, e]),
) as Record<ExpansionId, Expansion>;

/** Expansions the player can switch on and off (everything but the base game). */
export const TOGGLEABLE_EXPANSIONS = EXPANSIONS.filter((e) => !e.locked);

export const DEFAULT_ENABLED: ExpansionId[] = ["base"];

/** Filter any expansion-tagged collection down to the enabled products. */
export function filterByExpansion<T extends { expansion: ExpansionId }>(
  items: T[],
  enabled: ExpansionId[],
): T[] {
  return items.filter((item) => enabled.includes(item.expansion));
}
