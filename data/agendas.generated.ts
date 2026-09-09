import type { Agenda } from "@/lib/types";

/**
 * The agenda deck.
 *
 * GENERATED FILE — do not hand-edit.
 * Regenerate with `npm run gen:agendas`.
 *
 * Scraped from https://twilight-imperium.fandom.com/wiki/Agenda_Cards.
 *
 * The deck is 50 cards with or without Prophecy of Kings: it removes 13 base
 * agendas and adds 13 of its own. Cards it removes are kept here and marked
 * `removedByPok`, so they can be hidden only when that expansion is enabled.
 */
export const AGENDAS: Agenda[] = [
  {
    id: "archived-secret",
    name: "Archived Secret",
    kind: "Directive",
    expansion: "base",
    elect: "Player",
    outcomes: [
      { label: null, text: "Elected player draws 1 secret objective." },
    ],
  },
  {
    id: "armed-forces-standardization",
    name: "Armed Forces Standardization",
    kind: "Directive",
    expansion: "pok",
    elect: "Player",
    outcomes: [
      { label: null, text: "The elected player places command tokens from their reinforcements so that they have 3 tokens in their tactic pool, 3 tokens in their fleet pool and 2 tokens in their strategy pool. They return any excess tokens to their reinforcements." },
    ],
  },
  {
    id: "arms-reduction",
    name: "Arms Reduction",
    kind: "Directive",
    expansion: "base",
    elect: null,
    outcomes: [
      { label: "FOR", text: "Each player destroys all but 2 of their dreadnaughts and all but 4 of their cruisers." },
      { label: "AGAINST", text: "At the start of the next strategy phase, each player exhausts each of their planets that have a technology specialty." },
    ],
  },
  {
    id: "clandestine-operations",
    name: "Clandestine Operations",
    kind: "Directive",
    expansion: "pok",
    elect: null,
    outcomes: [
      { label: "FOR", text: "Each player removes 2 command tokens from their command sheet and returns those tokens to their reinforcements." },
      { label: "AGAINST", text: "Each player removes 1 command token from their fleet pool and returns that token to their reinforcements." },
    ],
  },
  {
    id: "colonial-redistribution",
    name: "Colonial Redistribution",
    kind: "Directive",
    expansion: "base",
    elect: "Non-Home Planet Other Than Mecatol Rex",
    outcomes: [
      { label: null, text: "Destroy each unit on the elected planet. Then, the player who controls that planet chooses 1 player with the fewest victory points; that player may place 1 infantry from their reinforcements on the elected planet." },
    ],
  },
  {
    id: "compensated-disarmament",
    name: "Compensated Disarmament",
    kind: "Directive",
    expansion: "base",
    elect: "Planet",
    outcomes: [
      { label: null, text: "Destroy each ground force on the elected planet; for each unit that was destroyed, the player who controls that planet gains 1 trade good." },
    ],
  },
  {
    id: "covert-legislation",
    name: "Covert Legislation",
    kind: "Directive",
    expansion: "pok",
    elect: null,
    outcomes: [
      { label: null, text: "When this agenda is revealed, the speaker draws the next card in the agenda deck but does not reveal it to the other players. Instead, the speaker reads the eligible outcomes aloud (for, against, elect player, etc.); the other players vote for these outcomes as if they were outcomes of this agenda, without knowing their effects." },
    ],
  },
  {
    id: "economic-equality",
    name: "Economic Equality",
    kind: "Directive",
    expansion: "base",
    elect: null,
    outcomes: [
      { label: "FOR", text: "Each player returns all of their trade goods to the supply. Then, each player gains 5 trade goods." },
      { label: "AGAINST", text: "Each player returns all of their trade goods to the supply." },
    ],
  },
  {
    id: "galactic-crisis-pact",
    name: "Galactic Crisis Pact",
    kind: "Directive",
    expansion: "pok",
    elect: "Strategy Card",
    outcomes: [
      { label: null, text: "Each player may perform the secondary ability of the elected strategy card without spending a command token; command tokens placed by the ability are placed from a player's reinforcements instead." },
    ],
  },
  {
    id: "incentive-program",
    name: "Incentive Program",
    kind: "Directive",
    expansion: "base",
    elect: null,
    outcomes: [
      { label: "FOR", text: "Draw and reveal 1 stage I public objective from the deck and place it near the public objectives." },
      { label: "AGAINST", text: "Draw and reveal 1 stage II public objective from the deck and place it near the public objectives." },
    ],
  },
  {
    id: "ixthian-artifact",
    name: "Ixthian Artifact",
    kind: "Directive",
    expansion: "base",
    elect: null,
    outcomes: [
      { label: "FOR", text: "The speaker rolls 1 die. If the result is 6-10, each player may research 2 technologies. If the result is 1-5, destroy all units in Mecatol Rex's system, and each player with units in systems adjacent to Mecatol Rex's system destroys 3 of their units in each of those systems." },
      { label: "AGAINST", text: "No effect." },
    ],
  },
  {
    id: "judicial-abolishment",
    name: "Judicial Abolishment",
    kind: "Directive",
    expansion: "base",
    elect: "Law",
    outcomes: [
      { label: null, text: "When this agenda is revealed, if there are no laws in play, discard this card and reveal another agenda from the top of the deck. Discard the elected law from play." },
    ],
  },
  {
    id: "minister-of-antiques",
    name: "Minister of Antiques",
    kind: "Directive",
    expansion: "pok",
    elect: "Player",
    outcomes: [
      { label: null, text: "The elected player gains 1 relic." },
    ],
  },
  {
    id: "miscount-disclosed",
    name: "Miscount Disclosed",
    kind: "Directive",
    expansion: "base",
    elect: "Law",
    outcomes: [
      { label: null, text: "When this agenda is revealed, if there are no laws in play, discard this card and reveal another agenda from the top of the deck. Vote on the elected law as if it were just revealed from the top of the deck." },
    ],
  },
  {
    id: "mutiny",
    name: "Mutiny",
    kind: "Directive",
    expansion: "base",
    elect: null,
    outcomes: [
      { label: "FOR", text: "Each player who voted \"For\" gains 1 victory point." },
      { label: "AGAINST", text: "Each player who voted \"For\" loses 1 victory point." },
    ],
  },
  {
    id: "new-constitution",
    name: "New Constitution",
    kind: "Directive",
    expansion: "base",
    elect: null,
    outcomes: [
      { label: null, text: "When this agenda is revealed, if there are no laws in play, discard this card and reveal another agenda from the top of the deck." },
      { label: "FOR", text: "Discard all laws in play. At the start of the next strategy phase, each player exhausts each planet in their home system." },
      { label: "AGAINST", text: "No effect." },
    ],
  },
  {
    id: "public-execution",
    name: "Public Execution",
    kind: "Directive",
    expansion: "base",
    elect: "Player",
    outcomes: [
      { label: null, text: "The elected player discards all of their action cards. If they have the speaker token, they give it to the player on their left. The elected player cannot vote on any agendas during this agenda phase." },
    ],
  },
  {
    id: "rearmament-agreement",
    name: "Rearmament Agreement",
    kind: "Directive",
    expansion: "pok",
    elect: null,
    outcomes: [
      { label: "FOR", text: "Each player places 1 mech from their reinforcements on a planet they control in their home system." },
      { label: "AGAINST", text: "Each player replaces each of their mechs with 1 infantry from their reinforcements." },
    ],
  },
  {
    id: "research-grant-reallocation",
    name: "Research Grant Reallocation",
    kind: "Directive",
    expansion: "pok",
    elect: "Player",
    outcomes: [
      { label: null, text: "The elected player gains any 1 technology of their choice. Then, for each prerequisite on that technology, they remove 1 token from their fleet pool and return it to their reinforcements." },
    ],
  },
  {
    id: "seed-of-an-empire",
    name: "Seed of an Empire",
    kind: "Directive",
    expansion: "base",
    elect: null,
    outcomes: [
      { label: "FOR", text: "The player with most victory points gains 1 victory point." },
      { label: "AGAINST", text: "The player with the fewest victory points gains 1 victory point." },
    ],
  },
  {
    id: "swords-to-plowshares",
    name: "Swords to Plowshares",
    kind: "Directive",
    expansion: "base",
    elect: null,
    outcomes: [
      { label: "FOR", text: "Each player destroys half of their infantry on each planet they control, rounded up. Then, each player gains trade goods equal to the number of their infantry that were destroyed." },
      { label: "AGAINST", text: "Each player places 1 infantry from their reinforcements on each planet they control." },
    ],
  },
  {
    id: "unconventional-measures",
    name: "Unconventional Measures",
    kind: "Directive",
    expansion: "base",
    elect: null,
    outcomes: [
      { label: "FOR", text: "Each player that voted \"For\" draws 2 action cards." },
      { label: "AGAINST", text: "Each player that voted \"For\" discards all of their action cards." },
    ],
  },
  {
    id: "wormhole-research",
    name: "Wormhole Research",
    kind: "Directive",
    expansion: "base",
    elect: null,
    outcomes: [
      { label: "FOR", text: "Each player who has 1 or more ships in a system that contains a wormhole may research 1 technology. Then, destroy all ships in systems that contain an alpha or beta wormhole." },
      { label: "AGAINST", text: "Each player that voted \"Against\" removes 1 command token from their command sheet and returns it to their reinforcements." },
    ],
  },
  {
    id: "anti-intellectual-revolution",
    name: "Anti-Intellectual Revolution",
    kind: "Law",
    expansion: "base",
    elect: null,
    outcomes: [
      { label: "FOR", text: "After a player researches a technology, they must destroy 1 of their non-fighter ships." },
      { label: "AGAINST", text: "At the start of the next strategy phase, each player chooses and exhausts 1 planet for each technology they own." },
    ],
  },
  {
    id: "articles-of-war",
    name: "Articles of War",
    kind: "Law",
    expansion: "pok",
    elect: null,
    outcomes: [
      { label: "FOR", text: "All mechs lose their printed abilities except for SUSTAIN DAMAGE." },
      { label: "AGAINST", text: "Each player that voted \"For\" gains 3 trade goods." },
    ],
  },
  {
    id: "checks-and-balances",
    name: "Checks and Balances",
    kind: "Law",
    expansion: "pok",
    elect: null,
    outcomes: [
      { label: "FOR", text: "When a player chooses a strategy card during the strategy phase, they give that strategy card to another player that does not have 1 (or a player that does not have 2 in a three- or four-player game), if able." },
      { label: "AGAINST", text: "Each player readies only 3 of their planets at the end of this agenda phase." },
    ],
  },
  {
    id: "classified-document-leaks",
    name: "Classified Document Leaks",
    kind: "Law",
    expansion: "base",
    elect: "Scored Secret Objective",
    outcomes: [
      { label: null, text: "When this agenda is revealed, if there are no scored secret objectives, discard this card and reveal another agenda from the top of the deck. The elected secret objective becomes a public objective; place it near the other public objectives in the common play area." },
    ],
  },
  {
    id: "committee-formation",
    name: "Committee Formation",
    kind: "Law",
    expansion: "base",
    elect: "Player",
    outcomes: [
      { label: null, text: "The elected player gains this card. Before players vote on an agenda that requires a player to be elected, the owner of this card may discard this card to choose a player to be elected. Players do not vote on that agenda." },
    ],
  },
  {
    id: "conventions-of-war",
    name: "Conventions of War",
    kind: "Law",
    expansion: "base",
    elect: null,
    outcomes: [
      { label: "FOR", text: "Players cannot use BOMBARDMENT against units that are on cultural planets." },
      { label: "AGAINST", text: "Each player that voted \"Against\" discards all of their action cards." },
    ],
  },
  {
    id: "core-mining",
    name: "Core Mining",
    kind: "Law",
    expansion: "base",
    elect: "Hazardous Planet",
    outcomes: [
      { label: null, text: "Attach this card to the elected planet's card. Then, destroy 1 infantry on the planet. The resource value of this planet is increased by 2." },
    ],
    removedByPok: true,
  },
  {
    id: "demilitarized-zone",
    name: "Demilitarized Zone",
    kind: "Law",
    expansion: "base",
    elect: "Cultural Planet",
    outcomes: [
      { label: null, text: "Attach this card to the elected planet's card. Then, destroy all units on that planet. Player's units cannot land, be produced, or be placed on this planet." },
    ],
    removedByPok: true,
  },
  {
    id: "enforced-travel-ban",
    name: "Enforced Travel Ban",
    kind: "Law",
    expansion: "base",
    elect: null,
    outcomes: [
      { label: "FOR", text: "Alpha and beta wormholes have no effect during movement." },
      { label: "AGAINST", text: "Destroy each PDS in or adjacent to a system that contains a wormhole." },
    ],
  },
  {
    id: "executive-sanctions",
    name: "Executive Sanctions",
    kind: "Law",
    expansion: "base",
    elect: null,
    outcomes: [
      { label: "FOR", text: "Each player can have a maximum of 3 action cards in their hand." },
      { label: "AGAINST", text: "Each player discards 1 random action card from their hand." },
    ],
  },
  {
    id: "fleet-regulations",
    name: "Fleet Regulations",
    kind: "Law",
    expansion: "base",
    elect: null,
    outcomes: [
      { label: "FOR", text: "Each player cannot have more than 4 tokens in their fleet pool." },
      { label: "AGAINST", text: "Each player places 1 command token from their reinforcements in their fleet pool." },
    ],
  },
  {
    id: "holy-planet-of-ixth",
    name: "Holy Planet of Ixth",
    kind: "Law",
    expansion: "base",
    elect: "Cultural Planet",
    outcomes: [
      { label: null, text: "Attach this card to the elected planet's card. The planet's owner gains 1 victory point. Units on this planet cannot use PRODUCTION. When a player gains control of this planet, they gain 1 victory point. When a player loses control of this planet, they lose 1 victory point." },
    ],
    removedByPok: true,
  },
  {
    id: "homeland-defense-act",
    name: "Homeland Defense Act",
    kind: "Law",
    expansion: "base",
    elect: null,
    outcomes: [
      { label: "FOR", text: "Each player can have any number of PDS units on planets they control." },
      { label: "AGAINST", text: "Each player destroys 1 of their PDS unit." },
    ],
  },
  {
    id: "imperial-arbiter",
    name: "Imperial Arbiter",
    kind: "Law",
    expansion: "base",
    elect: "Player",
    outcomes: [
      { label: null, text: "The elected player gains this card. At the end of the strategy phase, the owner of this card may discard this card to swap 1 of their strategy cards with 1 of another player's strategy cards." },
    ],
  },
  {
    id: "minister-of-commerce",
    name: "Minister of Commerce",
    kind: "Law",
    expansion: "base",
    elect: "Player",
    outcomes: [
      { label: null, text: "The elected player gains this card. After the owner of this card replenishes commodities, they gain 1 trade good for each player that is their neighbor." },
    ],
  },
  {
    id: "minister-of-exploration",
    name: "Minister of Exploration",
    kind: "Law",
    expansion: "base",
    elect: "Player",
    outcomes: [
      { label: null, text: "The elected player gains this card. When the owner of this card gains control of a planet, they gain 1 trade good." },
    ],
  },
  {
    id: "minister-of-industry",
    name: "Minister of Industry",
    kind: "Law",
    expansion: "base",
    elect: "Player",
    outcomes: [
      { label: null, text: "The elected player gains this card. When the owner of this card places a space dock in a system, their units in that system may use their PRODUCTION abilities." },
    ],
  },
  {
    id: "minister-of-peace",
    name: "Minister of Peace",
    kind: "Law",
    expansion: "base",
    elect: "Player",
    outcomes: [
      { label: null, text: "The elected player gains this card. After a player activates a system that contains 1 or more of a different player's units, the owner of this card may discard this card; immediately end the active player's turn." },
    ],
  },
  {
    id: "minister-of-policy",
    name: "Minister of Policy",
    kind: "Law",
    expansion: "base",
    elect: "Player",
    outcomes: [
      { label: null, text: "The elected player gains this card. At the end of the status phase, the owner of this card draws 1 action card." },
    ],
  },
  {
    id: "minister-of-sciences",
    name: "Minister of Sciences",
    kind: "Law",
    expansion: "base",
    elect: "Player",
    outcomes: [
      { label: null, text: "The elected player gains this card. When the owner of this card resolves the primary or secondary ability of the \"Technology\" strategy card, they do not need to spend resources to research technology." },
    ],
  },
  {
    id: "minister-of-war",
    name: "Minister of War",
    kind: "Law",
    expansion: "base",
    elect: "Player",
    outcomes: [
      { label: null, text: "The elected player gains this card. The owner of this card may discard this card after performing an action to remove 1 of their command counters from the game board and return it to their reinforcements; then they may perform 1 additional action." },
    ],
  },
  {
    id: "nexus-sovereignty",
    name: "Nexus Sovereignty",
    kind: "Law",
    expansion: "pok",
    elect: null,
    outcomes: [
      { label: "FOR", text: "Alpha and beta wormholes in the wormhole nexus have no effect during movement." },
      { label: "AGAINST", text: "Place a gamma wormhole token in the Mecatol Rex system." },
    ],
  },
  {
    id: "political-censure",
    name: "Political Censure",
    kind: "Law",
    expansion: "pok",
    elect: "Player",
    outcomes: [
      { label: null, text: "The elected player gains this card and 1 victory point. The elected player cannot play action cards. If the owner of this card loses this card, they lose 1 victory point." },
    ],
  },
  {
    id: "prophecy-of-ixth",
    name: "Prophecy of Ixth",
    kind: "Law",
    expansion: "base",
    elect: "Player",
    outcomes: [
      { label: null, text: "The elected player gains this card. The owner of this card applies +1 to the result of their fighter's combat rolls. When the owner of this card uses PRODUCTION, they discard this card unless they produce 2 or more fighters." },
    ],
  },
  {
    id: "publicize-weapon-schematics",
    name: "Publicize Weapon Schematics",
    kind: "Law",
    expansion: "base",
    elect: null,
    outcomes: [
      { label: "FOR", text: "If any player owns a war sun technology, all players may ignore all prerequisites on war sun technologies. All war suns lose SUSTAIN DAMAGE." },
      { label: "AGAINST", text: "Each player that owns a war sun technology discards all of their action cards." },
    ],
  },
  {
    id: "regulated-conscription",
    name: "Regulated Conscription",
    kind: "Law",
    expansion: "base",
    elect: null,
    outcomes: [
      { label: "FOR", text: "When a player produces units, they produce only 1 fighter and infantry for its cost instead of 2." },
      { label: "AGAINST", text: "No effect." },
    ],
  },
  {
    id: "representative-government",
    name: "Representative Government",
    kind: "Law",
    expansion: "base",
    elect: null,
    outcomes: [
      { label: "FOR", text: "Players cannot exhaust planets to cast votes during the agenda phase. Each player may cast 1 vote on each agenda instead." },
      { label: "AGAINST", text: "At the start of the next strategy phase, each player that voted \"Against\" exhausts all of their cultural planets." },
    ],
    removedByPok: true,
  },
  {
    id: "representative-government-pok",
    name: "Representative Government (POK)",
    kind: "Law",
    expansion: "pok",
    elect: null,
    outcomes: [
      { label: "FOR", text: "Players cannot exhaust planets to cast votes during the agenda phase; each player may cast 1 vote on each agenda instead. Players cannot cast additional votes." },
      { label: "AGAINST", text: "At the start of the next strategy phase, each player that voted \"Against\" exhausts all of their cultural planets." },
    ],
  },
  {
    id: "research-team-biotic",
    name: "Research Team: Biotic",
    kind: "Law",
    expansion: "base",
    elect: "Industrial Planet",
    outcomes: [
      { label: null, text: "Attach this card to the elected planet's card. When the owner of this planet researches technology, they may exhaust this card to ignore 1 green prerequisite." },
    ],
    removedByPok: true,
  },
  {
    id: "research-team-cybernetic",
    name: "Research Team: Cybernetic",
    kind: "Law",
    expansion: "base",
    elect: "Industrial Planet",
    outcomes: [
      { label: null, text: "Attach this card to the elected planet's card. When the owner of this planet researches technology, they may exhaust this card to ignore 1 yellow prerequisite." },
    ],
    removedByPok: true,
  },
  {
    id: "research-team-propulsion",
    name: "Research Team: Propulsion",
    kind: "Law",
    expansion: "base",
    elect: "Industrial Planet",
    outcomes: [
      { label: null, text: "Attach this card to the elected planet's card. When the owner of this planet researches technology, they may exhaust this card to ignore 1 blue prerequisite." },
    ],
    removedByPok: true,
  },
  {
    id: "research-team-warfare",
    name: "Research Team: Warfare",
    kind: "Law",
    expansion: "base",
    elect: "Hazardous Planet",
    outcomes: [
      { label: null, text: "Attach this card to the elected planet's card. When the owner of this planet researches technology, they may exhaust this card to ignore 1 red prerequisite." },
    ],
    removedByPok: true,
  },
  {
    id: "search-warrant",
    name: "Search Warrant",
    kind: "Law",
    expansion: "pok",
    elect: "Player",
    outcomes: [
      { label: null, text: "The elected player gains this card and draws 2 secret objectives. The owner of this card plays with their secret objectives revealed." },
    ],
  },
  {
    id: "senate-sanctuary",
    name: "Senate Sanctuary",
    kind: "Law",
    expansion: "base",
    elect: "Cultural Planet",
    outcomes: [
      { label: null, text: "Attach this card to the elected planet's card. The influence value of this planet is increased by 2." },
    ],
    removedByPok: true,
  },
  {
    id: "shard-of-the-throne",
    name: "Shard of the Throne",
    kind: "Law",
    expansion: "base",
    elect: "Player",
    outcomes: [
      { label: null, text: "The elected player gains this card and 1 victory point. A player gains this card and 1 victory point when they win a combat against the owner of this card. Then, the previous owner of this card loses 1 victory point." },
    ],
    removedByPok: true,
  },
  {
    id: "shared-research",
    name: "Shared Research",
    kind: "Law",
    expansion: "base",
    elect: null,
    outcomes: [
      { label: "FOR", text: "Each player's units can move through nebulae." },
      { label: "AGAINST", text: "Each player places a command token from their reinforcements in their home system, if able." },
    ],
  },
  {
    id: "terraforming-initiative",
    name: "Terraforming Initiative",
    kind: "Law",
    expansion: "base",
    elect: "Hazardous Planet",
    outcomes: [
      { label: null, text: "Attach this card to the elected planet's card. The resource and influence values of this planet are increased by 1." },
    ],
    removedByPok: true,
  },
  {
    id: "the-crown-of-emphidia",
    name: "The Crown of Emphidia",
    kind: "Law",
    expansion: "base",
    elect: "Player",
    outcomes: [
      { label: null, text: "The elected player gains this card and 1 victory point. A player gains this card and 1 victory point after they gain control of a planet in the home system of this card's owner. Then, the previous owner of this card loses 1 victory point." },
    ],
    removedByPok: true,
  },
  {
    id: "the-crown-of-thalnos",
    name: "The Crown of Thalnos",
    kind: "Law",
    expansion: "base",
    elect: "Player",
    outcomes: [
      { label: null, text: "The elected player gains this card. During each combat round, the owner of this card may reroll any number of dice; they must destroy each of their units that did not produce a hit with its reroll. (Typo: The card itself says \"The Crown of Thanlos,\" but rules referring to it use the correct name.)" },
    ],
    removedByPok: true,
  },
  {
    id: "wormhole-reconstruction",
    name: "Wormhole Reconstruction",
    kind: "Law",
    expansion: "base",
    elect: null,
    outcomes: [
      { label: "FOR", text: "All systems that contain either an alpha or beta wormhole are adjacent to each other." },
      { label: "AGAINST", text: "Each player places a command token from their reinforcements in each system that contains a wormhole and 1 or more of their ships." },
    ],
  },
];

export const AGENDA_BY_ID = new Map(AGENDAS.map((a) => [a.id, a]));
