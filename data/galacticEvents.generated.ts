import type { GalacticEvent } from "@/lib/types";

/**
 * Galactic Events — optional setup cards that change the rules of the whole
 * game. Codex IV introduced them; Thunder's Edge added sixteen more.
 *
 * GENERATED FILE — do not hand-edit.
 * Regenerate with `npm run gen:events`.
 *
 * Scraped from https://twilight-imperium.fandom.com/wiki/Galactic_Events.
 * `complexity` is the wiki's own 1-3 rating of how much the event changes.
 */
export const GALACTIC_EVENTS: GalacticEvent[] = [
  {
    id: "advent-of-the-war-sun",
    name: "Advent of the War Sun",
    expansion: "thundersedge",
    complexity: 1,
    effect: [
      "At the end of setup, all players other than the Embers of Muaat player gain the War Sun unit upgrade technology.",
      "The Embers of Muaat player purges their faction-specific promissory note, unlocks their commander, and places 1 additional War Sun in their home system.",
    ],
  },
  {
    id: "age-of-commerce",
    name: "Age of Commerce",
    expansion: "codex4",
    complexity: 1,
    effect: [
      "Players do not have to be neighbors to perform transactions with each other.",
      "Players do not have a maximum number of commodities; when they refresh commodities, they gain a number of commodities equal to their commodities value instead.",
      "Players can share non-faction technology with other players as part of a transaction. When sharing technology, the receiving player gains that technology from their own deck; the sharing player does not lose the technology.",
    ],
  },
  {
    id: "age-of-exploration",
    name: "Age of Exploration",
    expansion: "codex4",
    complexity: 2,
    effect: [
      "Relics only require 2 matching fragments be purged instead of 3.",
      "The Naaz-Rokha Alliance's Fabrication faction ability and Black Market Forgery promissory note do not require purged fragments to match.",
      "All players can perform the following action:",
      "ACTION: Exhaust Dark Energy Tap and choose a non-home edge system that contains your ships to roll a 1 die. On a result of 1 - 4, draw a random unused red tile; on a result of 5 - 10, draw an random unused blue tile. Place that tile adjacent to the chosen system so that it is touching 2 non-home systems. Place a frontier token in the system if it does not contain any planets.",
    ],
  },
  {
    id: "age-of-fighters",
    name: "Age of Fighters",
    expansion: "thundersedge",
    complexity: 3,
    effect: [
      "During setup, all players gain the Fighters II unit upgrade technology; the Naalu Collective player gains Hybrid Crystal Fighter II technology instead.",
      "Fighters that count against your fleet pool have CAPACITY value of 1; fighters cannot transport other fighters",
      "Non-fighter ships are purged when they are destroyed.",
    ],
  },
  {
    id: "call-of-the-void",
    name: "Call of the Void",
    expansion: "thundersedge",
    complexity: 1,
    effect: [
      "After you move 1 or more units into the active system, if that system is in The Fracture, gain 1 command token.",
      "When you activate a system in The Fracture, apply +1 to the move values of each of your ships.",
    ],
  },
  {
    id: "civilized-society",
    name: "Civilized Society",
    expansion: "thundersedge",
    complexity: 2,
    effect: [
      "During setup, turn all public objectives face up.",
      "There is no limit to the number of public objectives a player may score during the status phase.",
      "The game does not immediately end when a player reaches the required number of victory points; instead, it ends at the end of that round's status phase, and the player with the most victory points wins. In the case of a tie, the tied players total the influence values of their controlled planets and their unspent trade goods; the player or players with the highest total win the game.",
    ],
  },
  {
    id: "conventions-of-war-abandoned",
    name: "Conventions of War Abandoned",
    expansion: "thundersedge",
    complexity: 3,
    effect: [
      "Each hit produced by BOMBARDMENT rolls destroy 3 units instead of 1.",
      "Players that have the X-89 BACTERIAL WEAPON technology can perform the following action:",
      "ACTION: Exhaust X-89 BACTERIAL WEAPON to choose 1 planet in a system that contains 1 of your units that has BOMBARDMENT; purge its planet card and all attachments or legendary planet ability cards associated with it.",
      "You are eliminated if all of your home system's planet cards are purged.",
    ],
  },
  {
    id: "cosmic-phenomenae",
    name: "Cosmic Phenomenae",
    expansion: "thundersedge",
    complexity: 2,
    effect: [
      "Anomalies are adjusted as follows:",
      "Nebulae: The defender applies +3 to each of their ship's combat rolls in the nebulae instead.",
      "Asteroid Fields: Fighters without a move value do not participate in space combat in asteroid fields.",
      "Supernovas: Units with PRODUCTION in or adjacent to supernovas have their PRODUCTION values increased by 1.",
      "Gravity Rifts: You may apply an additional +1 to the MOVE values of any of your ships moving out of gravity rifts; if you do, those ships are removed on a roll of 5 or lower.",
      "Entropic Scars: Systems that contain entropic scars are adjacent to each other",
    ],
  },
  {
    id: "cultural-exchange-program",
    name: "Cultural Exchange Program",
    expansion: "thundersedge",
    complexity: 2,
    effect: [
      "At the end of setup, shuffle the reference cards that correspond to each faction in play. Each player draws 1 of those cards and takes all leaders that correspond to that faction. They belong to that player for the rest of the game. Then, each player unlocks their commander.",
      "The Obsidian/Firmament player does not participate in the Cultural Exchange Program. Instead, they begin the game with \"The Obsidian\" relic.",
    ],
  },
  {
    id: "dangerous-wilds",
    name: "Dangerous Wilds",
    expansion: "thundersedge",
    complexity: 1,
    effect: [
      "During setup, place neutral infantry on each hazardous planet equal to that planet's resource value.",
      "At the end of each round, for each hazardous planet that is not controlled, replenish any neutral units that were destroyed during the game round.",
      "When a player gains control of a hazardous planet from the planet deck, they may research 1 technology; they may ignore a number of that technology's prerequisites equal to that planet's resource value.",
    ],
  },
  {
    id: "hidden-agenda",
    name: "Hidden Agenda",
    expansion: "thundersedge",
    complexity: 2,
    effect: [
      "During the agenda phase, only the speaker can talk; all other players must remain silent except when declaring action cards. Transactions cannot be performed during this phase.",
      "When voting, players secretly and simultaneously write their desired outcome and number of votes and pass them to the speaker. After all players have voted, the speaker secretly tallies the results and reveals only the totals to the other players; the speaker reveals who voted for which outcome only when required to resolve the outcome.",
      "The Argent Flight's votes are public and are known before the other players vote.",
    ],
  },
  {
    id: "mercenaries-for-hire",
    name: "Mercenaries for Hire",
    expansion: "thundersedge",
    complexity: 1,
    effect: [
      "At the start of the game, shuffle the alliance cards that correspond to the factions not in play and place them in the common play area with the card front face up; this is the mercenary deck.",
      "All players can perform the following action:",
      "ACTION: Spend 3 trade goods to gain the top card of the mercenary deck and place it in your play area.",
      "Players can use the abilities of the mercenaries in their play area.",
    ],
  },
  {
    id: "minor-factions",
    name: "Minor Factions",
    expansion: "codex4",
    complexity: 2,
    effect: [
      "During setup, players are dealt 1 fewer blue tile. Before creating the galaxy, shuffle the reference cards for factions not being played and deal 1 to each player. In speaker order, each player places that faction's home system in the second ring, equidistant from players' home systems. Then, that player places 3 neutral infantry on that system's planets, split as evenly as possible. These systems are minor faction systems and do not count as home systems.",
      "When a player controls each planet in a minor faction system, they take that factions alliance card from the deck or from the player that owned it previously.",
      "Planets in minor faction systems gain all three planet traits (cultural, industrial, and hazardous).",
    ],
  },
  {
    id: "monuments-to-the-ages",
    name: "Monuments to the Ages",
    expansion: "thundersedge",
    complexity: 2,
    effect: [
      "When you would place a structure on a non-home planet, you may instead spend 5 trade goods to place a neutral space dock instead; this is a monument, and is not considered to be a unit of any type. There can only be 3 monuments in play at once.",
      "At the start of the status phase, place 1 commodity beneath each monument; each monument is worth 1 victory point to the player that controls its planet for every 3 commodities beneath it.",
      "When a player gains control of a planet that contains a monument, they may destroy that monument.",
    ],
  },
  {
    id: "rapid-mobilization",
    name: "Rapid Mobilization",
    expansion: "thundersedge",
    complexity: 1,
    effect: [
      "After setup, put the Fracture into play. Then, each player simultaneously resolves the following effects in order.",
      "# Place 1 infantry onto each planet adjacent to your home system (or the Creuss Gate/The Sorrow, if playing those factions); gain control of and ready those planets but do not explore them.",
      "# Place 1 space dock on any planet you control and place your flagship and 3 fighters in its system.",
      "# Gain your breakthrough.",
      "# Research 1 technology; if you are the Nomad player, research 1 additional technology.",
    ],
  },
  {
    id: "stellar-atomics",
    name: "Stellar Atomics",
    expansion: "thundersedge",
    complexity: 2,
    effect: [
      "During setup, each player places one of their control tokens on this card.",
      "All players can perform the following action:",
      "ACTION: Discard your control token from this card to destroy all ground forces and structures on any non-home planet.",
      "If you do not have a control token on this card, you cannot vote or play action cards during the agenda phase.",
    ],
  },
  {
    id: "total-war",
    name: "Total War",
    expansion: "codex4",
    complexity: 3,
    effect: [
      "When a player destroys or produces a hit that destroys another player's units, they place commodities from the supply equal to the combined cost of the units they destroyed on a planet they control in their home system (infantry and fighters are worth 1 each).",
      "When a player gains control of a home system that has commodities, they move those commodities to a planet they control in their own home system.",
      "All players can perform the following action:",
      "ACTION: Discard 10 commodities from planets in your home system to gain 1 victory point.",
    ],
  },
  {
    id: "weird-wormholes",
    name: "Weird Wormholes",
    expansion: "thundersedge",
    complexity: 3,
    effect: [
      "After a ship moves using at least 1 alpha, beta, or gamma wormhole, roll 1 die and consult the following list;",
      "# Fighter",
      "# Destroyer",
      "# Cruiser",
      "# Dreadnought",
      "# Carrier",
      "# Flagship",
      "# War Sun (if researched)",
      "For each roll of 1-5, replace that ship with the ship before it from your reinforcements, if able.",
      "For each roll of 6-10, replace that ship with the ship after it from your reinforcements, if able.",
      "If there are no ships of that type in your reinforcements, skip that type and replace it with the next available type.",
    ],
  },
  {
    id: "wild-wild-galaxy",
    name: "Wild, Wild Galaxy",
    expansion: "thundersedge",
    complexity: 3,
    effect: [
      "Action cards are adjusted as follows:",
      "Direct Hit: Can be used against mechs",
      "Flank Speed: Applies +2 MOVE instead of +1",
      "Maneuvering Jets: Cancel all SPACE CANNON hits",
      "Morale Boost: Applies +2 to die rolls instead of +1",
      "Sabotage: Also take the canceled action card",
      "Shields Holding: Can be used in ground combat",
      "Skilled Retreat: Does not place a command token",
      "War Machine: Reduces cost by 5 instead of 1",
      "Diplomatic Pressure: Player must give 3 notes",
      "Additionally, Stellar Converter and Nova Seed can be used against any planets or systems.",
    ],
  },
  {
    id: "zealous-orthodoxy",
    name: "Zealous Orthodoxy",
    expansion: "thundersedge",
    complexity: 1,
    effect: [
      "The first player to score 2 secret objectives gains 1 victory point.",
      "Then, place that faction's alliance card on this card; all players gain that ability. That faction's alliance promissory is then purged.",
    ],
  },
];

export const GALACTIC_EVENT_BY_ID = new Map(
  GALACTIC_EVENTS.map((e) => [e.id, e]),
);
