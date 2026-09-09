import type { StrategyCard } from "@/lib/types";

/**
 * The eight strategy cards. These are identical in the base game and Prophecy
 * of Kings, so they are not expansion-tagged.
 */
export const STRATEGY_CARDS: StrategyCard[] = [
  {
    initiative: 1,
    name: "Leadership",
    primary:
      "Gain 3 command tokens. Then you may spend any amount of influence to gain 1 command token for every 3 influence spent.",
    secondary:
      "Spend any amount of influence to gain 1 command token for every 3 influence spent.",
    secondaryCost: "No strategy token — influence only",
  },
  {
    initiative: 2,
    name: "Diplomacy",
    primary:
      "Choose 1 system other than the Mecatol Rex system that contains a planet you control; each other player places a command token from their reinforcements in that system. Then ready up to 2 exhausted planets you control.",
    secondary: "Ready up to 2 exhausted planets you control.",
    secondaryCost: "1 strategy token",
  },
  {
    initiative: 3,
    name: "Politics",
    primary:
      "Choose a player other than the speaker; that player gains the speaker token. Draw 2 action cards. Look at the top 2 cards of the agenda deck and place each on the top or bottom of the deck in any order.",
    secondary: "Draw 2 action cards.",
    secondaryCost: "1 strategy token",
  },
  {
    initiative: 4,
    name: "Construction",
    primary:
      "Place 1 PDS or 1 space dock on a planet you control. Then place 1 PDS on a planet you control.",
    secondary:
      "Place the spent token in any system, then place 1 PDS or 1 space dock on a planet you control in that system.",
    secondaryCost: "1 strategy token, placed on the board",
  },
  {
    initiative: 5,
    name: "Trade",
    primary:
      "Gain 3 trade goods. Replenish your commodities. Choose any number of other players; those players may use this card's secondary ability without spending a command token.",
    secondary: "Replenish your commodities.",
    secondaryCost: "1 strategy token",
  },
  {
    initiative: 6,
    name: "Warfare",
    primary:
      "Remove 1 of your command tokens from the board, then redistribute any number of tokens between your pools.",
    secondary: "Use the PRODUCTION ability of 1 of your space docks.",
    secondaryCost: "1 strategy token",
  },
  {
    initiative: 7,
    name: "Technology",
    primary:
      "Research 1 technology. Then you may spend 6 resources to research 1 additional technology.",
    secondary: "Research 1 technology.",
    secondaryCost: "1 strategy token and 4 resources",
  },
  {
    initiative: 8,
    name: "Imperial",
    primary:
      "Immediately score 1 public objective if you fulfil its requirements. Gain 1 victory point if you control Mecatol Rex; otherwise draw 1 secret objective.",
    secondary: "Draw 1 secret objective.",
    secondaryCost: "1 strategy token",
  },
];

export const STRATEGY_CARD_BY_INITIATIVE = new Map(
  STRATEGY_CARDS.map((c) => [c.initiative, c]),
);
