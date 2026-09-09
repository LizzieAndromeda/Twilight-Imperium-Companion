import type { Erratum } from "@/lib/types";

/**
 * Official errata — corrections to printed card and ability wording, published
 * in the Living Rules Reference.
 *
 * GENERATED FILE — do not hand-edit.
 * Regenerate with `npm run gen:errata`.
 *
 * Scraped from https://twilight-imperium.fandom.com/wiki/Errata.
 *
 * `parts` splits the corrected wording into runs, with `changed` set on the
 * ones the errata underlines — those are the words that actually changed, which
 * is usually all anyone needs to read.
 */
export const ERRATA: Erratum[] = [
  {
    id: "bribery",
    name: "Bribery",
    kind: "action-card",
    text: "After the speaker votes on an agenda: Spend any number of trade goods. For each trade good spent, cast 1 additional vote for the outcome on which you voted.",
    parts: [
      { text: "After the speaker votes on an agenda: Spend any number of trade goods. For each trade good spent, cast 1 additional vote for", changed: false },
      { text: "the outcome on which you voted.", changed: true },
    ],
  },
  {
    id: "devotion",
    name: "Devotion",
    kind: "faction-ability",
    text: "After each space battle round, you may destroy 1 of your cruisers or destroyers in the active system to produce 1 hit and assign it to 1 of your opponent’s ships in that system.",
    parts: [
      { text: "After each space battle round, you may destroy 1 of your cruisers or destroyers", changed: false },
      { text: "in the active system", changed: true },
      { text: "to produce 1 hit and assign it to 1 of your opponent’s ships", changed: false },
      { text: "in that system.", changed: true },
    ],
    faction: "yin",
  },
  {
    id: "diplomacy",
    name: "Diplomacy",
    kind: "strategy-card",
    text: "Spend 1 token from your strategy pool to ready up to 2 exhausted planets you control.",
    parts: [
      { text: "Spend 1 token from your strategy pool to ready up to 2 exhausted planets", changed: false },
      { text: "you control.", changed: true },
    ],
  },
  {
    id: "direct-hit",
    name: "Direct Hit",
    kind: "action-card",
    text: "After another player’s ship uses ‘Sustain Damage’ to cancel a hit produced by your units or abilities : Destroy that ship.",
    parts: [
      { text: "After another player’s ship uses ‘Sustain Damage’ to cancel a hit produced by your units", changed: false },
      { text: "or abilities", changed: true },
      { text: ": Destroy that ship.", changed: false },
    ],
  },
  {
    id: "harrow",
    name: "Harrow",
    kind: "faction-ability",
    text: "At the end of each round of ground combat, your ships in the active system may use their bombardment abilities against your opponent’s ground forces on the planet.",
    parts: [
      { text: "At the end of each round of ground combat,", changed: true },
      { text: "your ships in the active system may use their bombardment abilities against your opponent’s ground forces on the planet.", changed: false },
    ],
    faction: "l1z1x",
  },
  {
    id: "hegemonic-trade-policy",
    name: "Hegemonic Trade Policy",
    kind: "faction-technology",
    text: "Exhaust this card when 1 or more of your units use ‘Production’; swap the resource and influence values of 1 planet you control during that use of ‘Production.’",
    parts: [
      { text: "Exhaust this card when 1 or more of your units use ‘Production’; swap the resource and influence values of 1 planet you control", changed: false },
      { text: "during that use of ‘Production.’", changed: true },
    ],
    faction: "winnu",
  },
  {
    id: "hyper-metabolism",
    name: "Hyper Metabolism",
    kind: "technology",
    text: "During the status phase, gain 3 command tokens instead of 2.",
    parts: [
      { text: "During the status phase,", changed: false },
      { text: "gain 3 command tokens instead of 2.", changed: true },
    ],
  },
  {
    id: "matriarch",
    name: "Matriarch",
    kind: "flagship",
    text: "During an invasion in this system, you may commit fighters to planets as if they were ground forces. When combat ends , return those units to the space area.",
    parts: [
      { text: "During an invasion in this system, you may commit fighters to planets as if they were ground forces.", changed: false },
      { text: "When combat ends", changed: true },
      { text: ", return those units to the space area.", changed: false },
    ],
    faction: "naalu",
  },
  {
    id: "political-favor",
    name: "Political Favor",
    kind: "promissory-note",
    text: "When an agenda is revealed: Remove 1 token from the Xxcha player’s strategy pool and return it to his reinforcements. Then, discard the revealed agenda and reveal 1 agenda from the top of the deck. Players vote on this agenda instead. Then, return this card to the Xxcha player.",
    parts: [
      { text: "When", changed: true },
      { text: "an agenda is revealed: Remove 1 token from the Xxcha player’s strategy pool and return it to his reinforcements. Then, discard the revealed agenda and reveal 1 agenda from the top of the deck. Players vote on this agenda instead. Then, return this card to the Xxcha player.", changed: false },
    ],
    faction: "xxcha",
  },
  {
    id: "unstable-planet",
    name: "Unstable Planet",
    kind: "action-card",
    text: "Action: Choose 1 hazardous planet. Exhaust that planet and destroy up to 3 infantry on it.",
    parts: [
      { text: "Action: Choose 1 hazardous planet. Exhaust that planet and destroy", changed: false },
      { text: "up to", changed: true },
      { text: "3 infantry on it.", changed: false },
    ],
  },
  {
    id: "veto",
    name: "Veto",
    kind: "action-card",
    text: "When an agenda is revealed: Discard that agenda and reveal 1 agenda from the top of the deck. Players vote on this agenda instead.",
    parts: [
      { text: "When", changed: true },
      { text: "an agenda is revealed: Discard that agenda and reveal 1 agenda from the top of the deck. Players vote on this agenda instead.", changed: false },
    ],
  },
];

export const ERRATA_BY_ID = new Map(ERRATA.map((e) => [e.id, e]));

/** Errata for a named component, matched case-insensitively. */
export const ERRATA_BY_NAME = new Map(
  ERRATA.map((e) => [e.name.toLowerCase(), e]),
);
