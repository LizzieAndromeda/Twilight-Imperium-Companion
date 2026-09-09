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
    year: "July 2020",
    description:
      "The first free codex: Omega errata for technologies and promissory notes, 17 new action cards, and the Nexus.",
  },
  {
    id: "codex2",
    name: "Codex II — Affinity",
    shortName: "Codex II",
    year: "April 2021",
    description:
      "Faction and Alliance reference cards, more relics, and the Alliance team game variant.",
  },
  {
    id: "codex3",
    name: "Codex III — Vigil",
    shortName: "Codex III",
    year: "April 2022",
    description:
      "Adds The Council Keleres, plus Omega leaders, mechs, secret objectives and frontier cards.",
  },
  {
    id: "codex4",
    name: "Codex IV — Liberation",
    shortName: "Codex IV",
    year: "June 2025",
    description:
      "Introduces Galactic Events — optional setup cards that rewrite the rules of the whole game — plus new relics.",
  },
  {
    id: "thundersedge",
    name: "Thunder's Edge",
    shortName: "Thunder's Edge",
    year: "2025",
    description:
      "The second big-box expansion. Adds 5 factions and 14 action cards, plus Omega replacements for eight Codex I cards. Its worlds and Galactic Events are not catalogued here yet.",
  },
  {
    id: "twilightsfall",
    name: "Twilight's Fall mode",
    shortName: "Twilight's Fall",
    year: "2025",
    description:
      "The alternate game mode inside Thunder's Edge, which uses its own 44-card action deck. Enable it only when playing that mode.",
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
