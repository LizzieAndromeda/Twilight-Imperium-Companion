import { PUBLIC_OBJECTIVES, SECRET_OBJECTIVES } from "./objectives.generated";

/**
 * The objective decks the app reads.
 *
 * The card data itself is scraped into `objectives.generated.ts`; this module
 * is the stable import point and holds the small amount of derived data that
 * is not on the cards.
 */
export { PUBLIC_OBJECTIVES, SECRET_OBJECTIVES };

export const OBJECTIVE_BY_ID = new Map(PUBLIC_OBJECTIVES.map((o) => [o.id, o]));

export const SECRET_OBJECTIVE_BY_ID = new Map(
  SECRET_OBJECTIVES.map((o) => [o.id, o]),
);

/** Points a public objective is worth, by stage. Secrets are always 1. */
export const STAGE_POINTS = { I: 1, II: 2 } as const;
