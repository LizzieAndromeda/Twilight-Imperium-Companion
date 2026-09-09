import type { Faction } from "@/lib/types";
import { GENERATED_FACTIONS } from "./factions.generated";
import { FACTION_NOTES } from "./factionNotes";

/**
 * The faction directory the app reads.
 *
 * Mechanical data is scraped into `factions.generated.ts`; the editorial
 * tagline and playstyle live in `factionNotes.ts`. This module is the only
 * place the two are joined, so regenerating one never disturbs the other.
 */
export const FACTIONS: Faction[] = GENERATED_FACTIONS.map((faction) => ({
  ...faction,
  ...FACTION_NOTES[faction.id],
}));

export const FACTION_BY_ID = new Map(FACTIONS.map((f) => [f.id, f]));
