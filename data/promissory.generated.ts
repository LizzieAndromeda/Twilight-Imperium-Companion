import type { PromissoryNote } from "@/lib/types";

/**
 * The five general promissory notes — the ones every player holds in their own
 * colour, as opposed to the faction-specific note on each faction sheet.
 *
 * GENERATED FILE — do not hand-edit.
 * Regenerate with `npm run gen:promissory`.
 *
 * Scraped from https://twilight-imperium.fandom.com/wiki/Promissory_Notes.
 * The text refers to "the (color) player" — that is the note's owner, the
 * player whose colour is printed on it.
 */
export const PROMISSORY_NOTES: PromissoryNote[] = [
  {
    id: "ceasefire",
    name: "Ceasefire",
    expansion: "base",
    text: "After the (color) player activates a system that contains 1 or more of your units:\nThe (color) player cannot move units into the active system.\nThen, return this card to the (color) player.",
  },
  {
    id: "trade-agreement",
    name: "Trade Agreement",
    expansion: "base",
    text: "When the (color) player replenishes commodities:\nThe (color) player gives you all of their commodities.\nThen, return this card to the (color) player.",
  },
  {
    id: "political-secret",
    name: "Political Secret",
    expansion: "base",
    text: "When an agenda is revealed:\nThe (color) player cannot vote, play action cards, or use faction abilities until after that agenda has been resolved.\nThen, return this card to the (color) player.",
  },
  {
    id: "support-for-the-throne",
    name: "Support for the Throne",
    expansion: "base",
    text: "When you receive this card, if you are not the (color) player, you must place it face-up in your play area and gain 1 Victory Point.\nIf you activate a system that contains 1 or more of the (color) player's units, or if the (color) player is eliminated, lose 1 Victory Point and return this card to the (color) player.",
  },
  {
    id: "alliance",
    name: "Alliance",
    expansion: "pok",
    text: "When you receive this card, if you are not the (color) player, you must place it face up in your play area.\nWhile this card is in your play area, you can use the (color) player's commander ability, if it is unlocked.\nIf you activate a system that contains 1 or more of the (color) player's units, return this card to the (color) player",
  },
];

export const PROMISSORY_NOTE_BY_ID = new Map(
  PROMISSORY_NOTES.map((n) => [n.id, n]),
);
