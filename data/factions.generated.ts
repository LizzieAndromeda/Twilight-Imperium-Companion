import type { GeneratedFaction } from "@/lib/types";

/**
 * Faction sheet data.
 *
 * GENERATED FILE — do not hand-edit.
 * Regenerate with `npm run gen:factions`.
 *
 * Scraped from the Twilight Imperium Fandom wiki
 * (https://twilight-imperium.fandom.com/wiki/Factions). Ability, leader,
 * flagship, mech and breakthrough text is verbatim from the faction sheets.
 *
 * Editorial commentary (tagline, playstyle) is NOT here — it lives in
 * `factionNotes.ts` so that regenerating this file never discards it.
 */
export const GENERATED_FACTIONS: GeneratedFaction[] = [
  {
    id: "arborec",
    name: "The Arborec",
    shortName: "Arborec",
    expansion: "base",
    difficulty: "High",
    color: "Green",
    symbol: "https://static.wikia.nocookie.net/twilight-imperium-4/images/8/8f/ArborecSymbolSquare.png",
    commodities: 3,
    homePlanets: [
      "Nestphar: 3/2",
    ],
    startingUnits: [
      "1 Carrier",
      "1 Cruiser",
      "2 Fighters",
      "4 Infantry",
      "1 Space Dock",
      "1 PDS",
    ],
    startingTech: [
      "Magen Defense Grid",
    ],
    abilities: [
      { name: "MITOSIS", text: "Your space docks cannot produce infantry. At the start of the status phase, place 1 infantry from your reinforcements on any planet you control." },
    ],
    leaders: [
      {
        role: "Agent",
        name: "Letani Ospha",
        unlock: "At Game Start",
        ability: "ACTION: Exhaust this card and choose a player's non-fighter ship; that player may replace that ship with one from their reinforcements that costs up to 2 more than the replaced ship.",
        expansion: "pok",
      },
      {
        role: "Commander",
        name: "Dirzuga Rophal",
        unlock: "Have 12 Ground Forces on Planets you control.",
        ability: "After another player activates a system that contains 1 or more of your units that have PRODUCTION: You may produce 1 unit in that system.",
        expansion: "pok",
      },
      {
        role: "Hero",
        name: "Letani Miasmiala",
        unlock: "Have 3 Scored Objectives",
        ability: "ULTRASONIC EMITTER ACTION: Produce any number of units in any number of systems that contain 1 or more of your ground forces. Then, purge this card.",
        expansion: "pok",
      },
    ],
    flagship: {
      name: "Duha Menaimon",
      cost: "8",
      combat: "7 (x2)",
      move: "1",
      capacity: "5",
      text: "Sustain Damage After you activate this system, you may produce up to 5 units in this system.",
    },
    mech: { name: "Letani Behemoth", text: "DEPLOY: When you would use your MITOSIS faction ability you may replace 1 of your infantry with 1 mech from your reinforcements instead. Sustain Damage Production 2 Planetary Shield", expansion: "pok" },
    breakthrough: {
      name: "Psychospore",
      text: "ACTION: Exhaust this card to remove a command token from a system that contains 1 or more of your infantry and return it to your reinforcements. Then, place 1 infantry in that system.",
      expansion: "thundersedge",
      synergy: ["warfare","biotic"],
    },
    promissory: [
      { name: "Stymie", text: "ACTION: Place this card face up in your play area. While this card is in your play area, the Arborec player cannot produce units in or adjacent to non-home systems that contain 1 or more of your units. If you activate a system that contains 1 or more of the Arborec player's units, return this card to the Arborec player.", expansion: "base" },
      { name: "Stymie Ω", text: "After another player moves ships into a system that contains 1 or more of your units: You may place 1 command token from that player's reinforcements in any non-home system. Then, return this card to the Arborec player.", expansion: "codex1" },
    ],
    factionTech: [
      {
        name: "Bioplasmosis",
        text: "At the end of the status phase , you may remove any number of infantry from planets you control and place them on 1 or more planets you control in the same or adjacent systems.",
        expansion: "base",
      },
    ],
    uniqueUnits: [
      {
        name: "Letani Warrior I",
        cost: "1x2",
        combat: "8",
        text: "Production 1",
      },
      {
        name: "Letani Warrior II",
        cost: "1x2",
        combat: "7",
        text: "Production 2 After this unit is destroyed, roll 1 die. If the result is 6 or greater, place the unit on this card. At the start of your next turn, place each unit that is on this card on a planet you control in your home system.",
      },
    ],
    faq: [
      {
        text: "Q: Can the Arborec's \"Mitosis\" ability be used to place 1 infantry on every planet they control? A: No. Only 1 infantry may be placed on a single planet using this ability.",
      },
      {
        text: "Q: Can the secondary ability of the “Warfare” strategy card (pre-Thunder’s Edge) be used to trigger the “Production” ability of the Arborec’s Letani Warriors? A: Prior to the Thunder’s Edge updated “Warfare” card: No, the “Warfare” secondary ability can only be used to trigger the production ability of space docks, and thus cannot be used by the Arborec to produce additional infantry. Addendum: The change to the “Warfare” strategy card made in the Expansion Thunder's Edge now allows this.",
      },
      {
        text: "Q: Can the “Production” abilities of multiple Arborec “Letani Warriors” in a system be combined to allow the production of two infantry for one resource? A: Yes. Production value is totaled when the “Production” ability of units in a system is used.",
      },
      {
        text: "Q: Does the Arborec flagship (The “Duha Menaimon”) need to be in a system when it is activated to make use of its ability? A: Yes. The “Duha Menaimon” can only be used to produce units when it is in a system at the moment it is activated.",
      },
      {
        text: "Q: Can the technology \"Sarween Tools\" be used to reduce the cost of units produced by the Duha Menaimon? A: No. Sarween tools can only be used when a unit specifically uses the PRODUCTION ability",
      },
      {
        text: "Q: When using the Arborec's hero ability \"Ultrasonic Emitter\", does the cost for the produced units need to be paid for? A: Yes. Any game effect that instructs a player to produce units requires them to pay for them unless otherwise specified.",
        requires: ["pok"],
      },
    ],
  },
  {
    id: "letnev",
    name: "The Barony of Letnev",
    shortName: "Letnev",
    expansion: "base",
    difficulty: "Low",
    color: "Red, black",
    symbol: "https://static.wikia.nocookie.net/twilight-imperium-4/images/2/20/Barony.png",
    commodities: 2,
    homePlanets: [
      "Arc Prime: 4/0",
      "Wren Terra: 2/1",
    ],
    startingUnits: [
      "1 Dreadnought",
      "1 Carrier",
      "1 Destroyer",
      "1 Fighter",
      "3 Infantry",
      "1 Space Dock",
    ],
    startingTech: [
      "Antimass Deflectors",
      "Plasma Scoring",
    ],
    abilities: [
      { name: "MUNITIONS RESERVES", text: "At the start of each round of space combat, you may spend 2 trade goods; you may re-roll any number of your dice during that combat round." },
      { name: "ARMADA", text: "The maximum number of non-fighter ships you can have in each system is equal to 2 more than the number of tokens in your fleet pool." },
    ],
    leaders: [
      {
        role: "Agent",
        name: "Viscount Unlenn",
        unlock: "At Game Start",
        ability: "At the start of a Space Combat round: You may exhaust this card to choose 1 ship in the active system. That ship rolls 1 additional die during this combat round.",
        expansion: "pok",
      },
      {
        role: "Commander",
        name: "Rear Admiral Farran",
        unlock: "Have 5 non-fighter ships in 1 system",
        ability: "After 1 of your units uses SUSTAIN DAMAGE: You may gain 1 Trade Good.",
        expansion: "pok",
      },
      {
        role: "Hero",
        name: "Darktalon Treilla",
        unlock: "Have 3 Scored Objectives",
        ability: "DARK MATTER AFFINITY ACTION: Place this card near the game board; the number of non-fighter ships you can have in systems is not limited by laws or by the number of command tokens in your fleet pool during this game round. At the end of that game round, purge this card.",
        expansion: "pok",
      },
    ],
    flagship: {
      name: "Arc Secundus",
      cost: "8",
      combat: "5 (x2)",
      move: "1",
      capacity: "3",
      text: "Sustain Damage Bombardment 5 (x3) Other players' units in this system lose PLANETARY SHIELD. At the start of each space combat round, repair this ship.",
    },
    mech: { name: "Dunlain Reaper", text: "DEPLOY: At the start of a round of ground combat, you may spend 2 resources to replace 1 of your infantry in that combat with 1 mech. Sustain Damage", expansion: "pok" },
    breakthrough: {
      name: "Gravleash Maneuvers",
      text: "Before you roll dice during space combat, apply +X to the results of 1 of your ship's rolls, where X is the number of ship types you have in the combat. During movement, your non-fighter ships' move values are equal to the highest move value amongst moving ships in the system they started in.",
      expansion: "thundersedge",
      synergy: ["propulsion","warfare"],
    },
    promissory: [
      { name: "War Funding", text: "At the start of a round of space combat: The Letnev player loses 2 trade goods. During this combat round, re-roll any number of your dice. Then, return this card to the Letnev player.", expansion: "base" },
      { name: "War Funding Ω", text: "After you and your opponent roll dice during space combat: You may reroll all of your opponent's dice. You may reroll any number of your dice. Then, return this card to the Letnev player.", expansion: "codex1" },
    ],
    factionTech: [
      {
        name: "L4 Disruptors",
        text: "During an invasion, units cannot use SPACE CANNON against your units.",
        expansion: "base",
      },
      {
        name: "Non-Euclidean Shielding",
        text: "When 1 of your units uses SUSTAIN DAMAGE, cancel 2 hits instead of 1.",
        expansion: "base",
      },
    ],
    faq: [
      {
        text: "Q: Can War Funding Omega be used on Anti-Fighter Barrage rolls? How about Munitions Reserves? A: No, War Funding Omega, War Funding, Munitions Reserves and Crown of Thalnos, are specific to combat rolls.",
        requires: ["codex1"],
      },
      {
        text: "Q: Does the Barony of Letnev agent, Viscount Unlenn, allow an extra dice to be rolled during Anti-Fighter Barrage? A: No, the Barony agent only has an effect on combat rolls.",
        requires: ["pok"],
      },
    ],
  },
  {
    id: "saar",
    name: "The Clan of Saar",
    shortName: "Saar",
    expansion: "base",
    difficulty: "Medium",
    color: "Orange, green, yellow",
    symbol: "https://static.wikia.nocookie.net/twilight-imperium-4/images/b/b0/Saar.png",
    commodities: 3,
    homePlanets: [
      "Lisis II: 1/0",
      "Ragh: 2/1",
    ],
    startingUnits: [
      "2 Carriers",
      "1 Cruiser",
      "2 Fighters",
      "4 Infantry",
      "1 Space Dock",
    ],
    startingTech: [
      "Antimass Deflectors",
    ],
    abilities: [
      { name: "SCAVENGE", text: "After you gain control of a planet, gain 1 trade good." },
      { name: "NOMADIC", text: "You can score objectives even if you do not control the planets in your home system." },
    ],
    leaders: [
      {
        role: "Agent",
        name: "Captain Mendosa",
        unlock: "At Game Start",
        ability: "After a player activates a system: You may exhaust this card to increase the move value of 1 of that player's ships to match the move value of the ship on the game board that has the highest move value.",
        expansion: "pok",
      },
      {
        role: "Commander",
        name: "Rowl Sarrig",
        unlock: "Have 3 space docks on the game board",
        ability: "When you produce fighters or infantry: You may place each of those units at any of your space docks that are not blockaded.",
        expansion: "pok",
      },
      {
        role: "Hero",
        name: "Gurno Aggero",
        unlock: "Have 3 Scored Objectives",
        ability: "ARMAGEDDON RELAY ACTION: Choose 1 system that is adjacent to 1 of your space docks. Destroy all other player's infantry and fighters in that system. Then, purge this card.",
        expansion: "pok",
      },
    ],
    flagship: {
      name: "Son of Ragh",
      cost: "8",
      combat: "5 (x2)",
      move: "1",
      capacity: "3",
      text: "Sustain Damage Anti-Fighter Barrage 6 (x4)",
    },
    mech: { name: "Scavenger Zeta", text: "DEPLOY: After you gain control of a planet, you may spend 1 trade good to place 1 mech on that planet. Sustain Damage", expansion: "pok" },
    breakthrough: {
      name: "Deorbit Barrage",
      text: "ACTION: Exhaust this card and spend any amount of resources to choose a planet up to 2 systems away from an asteroid field that contains your ships; roll a number of dice equal to the amount spent, and assign 1 hit to a ground force on that planet for each roll of 4 or greater",
      expansion: "thundersedge",
      synergy: ["propulsion","warfare"],
    },
    promissory: [
      { name: "Ragh's Call", text: "After you commit 1 or more units to land on a planet: Remove all of the Saar player's ground forces from that planet and place them on a planet controlled by the Saar player. Then, return this card to the Saar player.", expansion: "base" },
    ],
    factionTech: [
      {
        name: "Chaos Mapping",
        text: "Other players cannot activate asteroid fields that contain 1 or more of your ships. At the start of your turn during the action phase, you may produce 1 unit in a system that contains at least 1 of your units that has Production.",
        expansion: "base",
      },
    ],
    uniqueUnits: [
      {
        name: "Floating Factory I",
        cost: "1",
        combat: "4",
        text: "Production 5 This unit is placed in a space area instead of on a planet. This unit can move and retreat as if it were a ship. If this unit is blockaded, it is destroyed.",
      },
      {
        name: "Floating Factory II",
        cost: "2",
        combat: "5",
        text: "Production 7 This unit is placed in a space area instead of on a planet. This unit can move and retreat as if it were a ship. If this unit is blockaded, it is destroyed.",
      },
    ],
    faq: [
      {
        text: "Q: Can the Clan of Saar’s “Chaos Mapping” faction-specific technology be used at the start of each of that player’s turns during the action phase? A: Yes, “Chaos Mapping” can be used as many times as you have turns during the action phase.",
      },
      {
        text: "Q: Can the Clan of Saar’s “Chaos Mapping” faction-specific technology be used on the turn that the Saar player passes? A: Yes, “Chaos Mapping” can be used on the turn that a player passes.",
      },
      {
        text: "Q: Can the Clan of Saar’s “Floating Factories” trigger Space Cannon Offense or be assigned hits produced by PDS units? A: No, “Floating Factories” cannot be the target of PDS fire.",
      },
      {
        text: "Q: How does Clan of Saar’s agent, Mendosa, interact with abilities that increase movement such as Gravity Drive or Flank Speed? A: Clan of Saar’s agent, Mendosa, will get an errata to “WHEN you activate a system.” This means other bonuses would be applied after Mendosa takes effect.",
        requires: ["pok"],
      },
      {
        text: "Q: When leaving a Nebula, is Clan of Saar’s agent, Mendosa, applied as a bonus or setting the move value? A: The Nebula section of the LRR will be edited to reflect changing the printed move value of a unit to 1, Mendosa would be treated as a bonus and would override the Nebula’s movement value rule.",
        requires: ["pok"],
      },
      {
        text: "Q: Does the Clan of Saar’s “Floating Factories” count in fleet pool ? A: No, the Clan of Saar’s “Floating Factories” are still structures and do not count in the fleet pool, even though they move \"as if it were a ship\". ru:Клан Сааров Category:Factions",
      },
    ],
  },
  {
    id: "muaat",
    name: "The Embers of Muaat",
    shortName: "Muaat",
    expansion: "base",
    difficulty: "High",
    color: "Red, Orange",
    symbol: "https://static.wikia.nocookie.net/twilight-imperium-4/images/3/37/MuaatSymbolSquare.png",
    commodities: 4,
    homePlanets: [
      "Muaat: 4/1",
    ],
    startingUnits: [
      "1 War Sun",
      "2 Fighters",
      "4 Infantry",
      "1 Space Dock",
    ],
    startingTech: [
      "Plasma Scoring",
    ],
    abilities: [
      { name: "STAR FORGE", text: "ACTION: Spend 1 token from your strategy pool to place either 2 fighters or 1 destroyer from your reinforcements in a system that contains 1 or more of your war suns." },
      { name: "GASHLAI PHYSIOLOGY", text: "Your ships can move through supernovas." },
    ],
    leaders: [
      {
        role: "Agent",
        name: "Umbat",
        unlock: "At Game Start",
        ability: "ACTION: Exhaust this card to choose a player; that player may produce up to 2 units that each have a cost of 4 or less in a system that contains one of their war suns or their flagship.",
        expansion: "pok",
      },
      {
        role: "Commander",
        name: "Magmus",
        unlock: "Produce a War Sun",
        ability: "After you spend a token from your strategy pool: You may gain 1 trade good.",
        expansion: "pok",
      },
      {
        role: "Hero",
        name: "Adjudicator Ba'al",
        unlock: "Have 3 Scored Objectives",
        ability: "NOVA SEED After you move a war sun into a non-home system other than Mecatol Rex: You may destroy all other players' units in that system and replace that system tile with the Muaat supernova tile. If you do, purge this card and each planet card that corresponds to the replaced system tile.",
        expansion: "pok",
      },
    ],
    flagship: {
      name: "The Inferno",
      cost: "8",
      combat: "5 (x2)",
      move: "1",
      capacity: "3",
      text: "Sustain Damage ACTION: Spend 1 token from your strategy pool to place 1 cruiser in this unit's system.",
    },
    mech: { name: "Ember Colossus", text: "When you use your STAR FORGE faction ability in this system or an adjacent system, you may place 1 infantry from your reinforcements with this unit. Sustain Damage", expansion: "pok" },
    breakthrough: {
      name: "Stellar Genesis",
      text: "When you gain this card, place the Avernus planet token into a non-home system that is adjacent to a planet you control; gain control of and ready it. After you move 1 of your war suns out of or through Avernus's system and into a non-home system, you may move the Avernus token with it.",
      expansion: "thundersedge",
      synergy: ["warfare","cybernetic"],
    },
    promissory: [
      { name: "Fires of the Gashlai", text: "ACTION: Remove 1 token from the Muaat player's fleet pool and return it to their reinforcements. Then, gain your war sun unit upgrade technology card. Then, return this card to the Muaat player.", expansion: "base" },
    ],
    factionTech: [
      {
        name: "Magmus Reactor",
        text: "Your ships can move into supernovas. After 1 or more of your units use Production in a system that either contains a war sun or is adjacent to a supernova, gain 1 trade good.",
        expansion: "base",
      },
      {
        name: "Magmus Reactor Ω",
        text: "Your ships can move into supernovas. Each supernova that contains 1 or more of your units gains the PRODUCTION 5 ability as if it were 1 of your units.",
        expansion: "codex1",
      },
    ],
    uniqueUnits: [
      {
        name: "Prototype War Sun I",
        cost: "12",
        combat: "3 (x3)",
        text: "1",
        prerequisites: "6",
      },
      {
        name: "Prototype War Sun II",
        cost: "10",
        combat: "3 (x3)",
        text: "3",
        prerequisites: "6",
      },
    ],
    faq: [
      {
        text: "Q: How does the Agenda \"Publicize Weapon Schematics\" affect the Embers of Muaat's War Suns? A: Prototype War Sun I is considered a war sun but is a printed unit not a war sun technology. Thus, a vote of \"For\" would mean that it would lose the Sustain Damage ability but other players would not be able to ignore war sun prerequisites. A vote of \"Against\" would not affect the Muaat player. The agenda plays as normal if the Muaat player has researched Prototype War Sun II.",
      },
      {
        text: "Q: How does The Embers of Muaat Hero, Nova Seed, interact with tokens (e.g. wormholes, Mirage)? A: Nova Seed also purges all tokens other than command tokens and frontier tokens. Any faction specific tokens are returned to that faction.",
        requires: ["pok"],
      },
      {
        text: "Q: Does the Muaat Gashlai Physiology ability allow them to move their ships into Supernovas? A: No, moving through a system is distinct from moving into a system. See Movement rules for details. ru:Тлеющие с Муаата Category:Factions",
      },
    ],
  },
  {
    id: "hacan",
    name: "The Emirates of Hacan",
    shortName: "Hacan",
    expansion: "base",
    difficulty: "Low",
    color: "Yellow, Orange",
    symbol: "https://static.wikia.nocookie.net/twilight-imperium-4/images/f/f8/Hacan.png",
    commodities: 6,
    homePlanets: [
      "Arretze: 2/0",
      "Hercant: 1/1",
      "Kamdorn: 0/1",
    ],
    startingUnits: [
      "2 Carriers",
      "1 Cruiser",
      "2 Fighters",
      "4 Infantry",
      "1 Space Dock",
    ],
    startingTech: [
      "Antimass Deflectors",
      "Sarween Tools",
    ],
    abilities: [
      { name: "MASTERS OF TRADE", text: "You do not have to spend a command token to resolve the secondary ability of the \"Trade\" strategy card." },
      { name: "GUILD SHIPS", text: "You can negotiate transactions with players who are not your neighbor." },
      { name: "ARBITERS", text: "When you are negotiating a transaction, action cards can be exchanged as part of that transaction." },
    ],
    leaders: [
      {
        role: "Agent",
        name: "Carth of Golden Sands",
        unlock: "At Game Start",
        ability: "During the action phase: You may exhaust this card to gain 2 commodities or replenish another player's commodities.",
        expansion: "pok",
      },
      {
        role: "Commander",
        name: "Gila the Silvertongue",
        unlock: "Have 10 Trade Goods",
        ability: "When you cast votes: You may spend any number of trade goods; cast 2 additional votes for each trade good spent.",
        expansion: "pok",
      },
      {
        role: "Hero",
        name: "Harrugh Gefhara",
        unlock: "Have 3 Scored Objectives",
        ability: "GALACTIC SECURITIES NET When 1 or more of your units use PRODUCTION: You may reduce the cost of each of your units to 0 during this use of PRODUCTION. If you do, purge this card.",
        expansion: "pok",
      },
    ],
    flagship: {
      name: "Wrath of Kenara",
      cost: "8",
      combat: "7 (x2)",
      move: "1",
      capacity: "3",
      text: "Sustain Damage After you roll a die during a space combat in this system, you may spend 1 trade good to apply +1 to the result.",
    },
    mech: { name: "Pride of Kenara", text: "This planet's card may be traded as part of a transaction; if you do, move all of your units from this planet to another planet you control. Sustain Damage", expansion: "pok" },
    breakthrough: {
      name: "Auto-Factories",
      text: "When you produce 3 or more non-fighter ships, place 1 command token from your reinforcements into your fleet pool.",
      expansion: "thundersedge",
      synergy: ["warfare","cybernetic"],
    },
    promissory: [
      { name: "Trade Convoys", text: "ACTION: Place this card face-up in your play area. While this card is in your play area, you may negotiate transactions with players who are not your neighbor. If you activate a system that contains 1 or more of the Hacan player's units, return this card to the Hacan player.", expansion: "base" },
    ],
    factionTech: [
      {
        name: "Production Biomes",
        text: "ACTION: Exhaust this card and spend 1 token from your strategy pool to gain 4 trade goods and choose 1 other player; that player gains 2 trade goods",
        expansion: "base",
      },
      {
        name: "Quantum Datahub Node",
        text: "At the end of the strategy phase, you may spend 1 token from your strategy pool and give another player 3 of your trade goods. If you do, give 1 of your strategy cards to that player and take 1 of their strategy cards.",
        expansion: "base",
      },
    ],
    faq: [
      {
        text: "Q: Does the Hacan player have to initiate negotiations in order to transact with a player who is not their neighbor? A: So long as the active player is involved in the transaction, either player may suggest the opening of negotiations, on either player’s turn.",
      },
      {
        text: "Q: Can Hacan trade action cards after having Political Secret played against them? A: Arbiters is a passive ability and the Emirates of Hacan can trade Action cards regardless of having their Political Secret played against them.",
      },
      {
        text: "Q: What happens if the Emirates of Hacan trade a planet during combat using their mech’s ability? Particularly when combined with Integrated Economy or the Nomad faction technology Temporal Command Suite? A: A planet that has the Hacan Mech can’t be traded in combat. You can’t produce ground forces on a planet with another player’s ground forces. Future errata will clarify this.",
        requires: ["pok"],
      },
      {
        text: "Q: Can I use the Nekro Virus’ Agent, Nekro Malleon, or Psychoarchaeology or the Hacan Agent to interrupt another ability since the timing is “during the action phase”? A: No, any ability that is used “during the action phase” cannot be resolved unless there are no other abilities currently being resolved. ru:Хаканские Эмираты Category:Factions",
        requires: ["pok"],
      },
    ],
  },
  {
    id: "sol",
    name: "The Federation of Sol",
    shortName: "Sol",
    expansion: "base",
    difficulty: "Low",
    color: "Blue, yellow",
    symbol: "https://static.wikia.nocookie.net/twilight-imperium-4/images/0/01/Sol.png",
    commodities: 4,
    homePlanets: [
      "Jord: 4/2",
    ],
    startingUnits: [
      "2 Carriers",
      "1 Destroyer",
      "3 Fighters",
      "5 Infantry",
      "1 Space Dock",
    ],
    startingTech: [
      "Neural Motivator",
      "Antimass Deflectors",
    ],
    abilities: [
      { name: "ORBITAL DROP", text: "ACTION: Spend 1 token from your strategy pool to place 2 infantry from your reinforcements on 1 planet you control." },
      { name: "VERSATILE", text: "When you gain command tokens during the status phase, gain 1 additional command token." },
    ],
    leaders: [
      {
        role: "Agent",
        name: "Evelyn Delouis",
        unlock: "At Game Start",
        ability: "At the start of a ground combat round: You may exhaust this card to choose 1 ground force in the active system; that ground force rolls 1 additional die during that combat round.",
        expansion: "pok",
      },
      {
        role: "Commander",
        name: "Claire Gibson",
        unlock: "Control planets that have a combined total of at least 12 resources.",
        ability: "At the start of a ground combat on a planet you control: You may place 1 infantry from your reinforcements on that planet.",
        expansion: "pok",
      },
      {
        role: "Hero",
        name: "Jace X. 4th Air Legion",
        unlock: "Have 3 Scored Objectives",
        ability: "HELIO COMMAND ARRAY ACTION: Remove each of your command tokens from the game board and return them to your reinforcements. Then, purge this card.",
        expansion: "pok",
      },
    ],
    flagship: {
      name: "Genesis",
      cost: "8",
      combat: "5 (x2)",
      move: "1",
      capacity: "12",
      text: "Sustain Damage At the end of the status phase, place 1 infantry from your reinforcements in this system's space area.",
    },
    mech: { name: "ZS Thunderbolt M2", text: "DEPLOY: After you use your ORBITAL DROP faction ability, you may spend 3 resources to place 1 mech on that planet. Sustain Damage", expansion: "pok" },
    breakthrough: {
      name: "Bellum Gloriosum",
      text: "When you produce a ship that has capacity, you may also produce any combination of ground forces or fighters up to that ship's capacity; they do not count against your PRODUCTION limit.",
      expansion: "thundersedge",
      synergy: ["cybernetic","biotic"],
    },
    promissory: [
      { name: "Military Support", text: "At the start of the Sol player's turn: Remove 1 token from the Sol player's strategy pool, if able, and return it to their reinforcements. Then, you may place 2 infantry from your reinforcements on any planet you control. Then, return this card to the Sol player.", expansion: "base" },
    ],
    uniqueUnits: [
      {
        name: "Spec Ops I",
        cost: "1x2",
        combat: "7",
      },
      {
        name: "Spec Ops II",
        cost: "1x2",
        combat: "6",
        text: "After this unit is destroyed, roll 1 die. If the result is 5 or greater, place the unit on this card. At the start of your next turn, place each unit that is on this card on a planet you control in your home system.",
      },
      {
        name: "Advanced Carrier I",
        cost: "3",
        combat: "9",
        text: "1",
        prerequisites: "6",
      },
      {
        name: "Advanced Carrier II",
        cost: "3",
        combat: "9",
        text: "2",
        prerequisites: "8",
      },
    ],
  },
  {
    id: "creuss",
    name: "The Ghosts of Creuss",
    shortName: "Creuss",
    expansion: "base",
    difficulty: "Medium",
    color: "Blue",
    symbol: "https://static.wikia.nocookie.net/twilight-imperium-4/images/7/7f/Ghosts.png",
    commodities: 4,
    homePlanets: [
      "Creuss: 4/2",
      "Delta wormhole",
    ],
    startingUnits: [
      "1 Carrier",
      "2 Destroyers",
      "2 Fighters",
      "4 Infantry",
      "1 Space Dock",
    ],
    startingTech: [
      "Gravity Drive",
    ],
    abilities: [
      { name: "QUANTUM ENTANGLEMENT", text: "You treat all systems that contain either an alpha or beta wormhole as adjacent to each other. Game effects cannot prevent you from using this ability." },
      { name: "SLIPSTREAM", text: "During your tactical actions, apply +1 to the move value of each of your ships that starts its movement in your home system or in a system that contains either an alpha or beta wormhole." },
      { name: "CREUSS GATE", text: "When you create the game board, place the Creuss Gate (tile 17) where your home system would normally be placed. The Creuss Gate system is not a home system. Then, place your home system (tile 51) in your play area." },
    ],
    leaders: [
      {
        role: "Agent",
        name: "Emissary Taivra",
        unlock: "At Game Start",
        ability: "After a player activates a system that contains a non-delta wormhole: You may exhaust this card; if you do, that system is adjacent to all other systems that contain a wormhole during this tactical action.",
        expansion: "pok",
      },
      {
        role: "Commander",
        name: "Sai Seravus",
        unlock: "Have units in 3 systems that contain alpha or beta wormholes.",
        ability: "After your ships move: For each ship that has a capacity value and moved through 1 or more wormholes, you may place 1 fighter from your reinforcements with that ship if you have unused capacity in the active system.",
        expansion: "pok",
      },
      {
        role: "Hero",
        name: "Riftwalker Meian",
        unlock: "Have 3 Scored Objectives",
        ability: "SINGULARITY REACTOR ACTION: Swap the positions of any 2 systems that contain wormholes or your units, other than the Creuss system and the Wormhole Nexus. Then, purge this card.",
        expansion: "pok",
      },
    ],
    flagship: {
      name: "Hil Colish",
      cost: "8",
      combat: "5",
      move: "1",
      capacity: "3",
      text: "Sustain Damage This ship's system contains a delta wormhole. During movement, this ship may move before or after your other ships.",
    },
    mech: { name: "Icarus Drive", text: "After any player activates a system, you may remove this unit from the game board to place or move a Creuss wormhole token into this system. Sustain Damage", expansion: "pok" },
    breakthrough: {
      name: "Particle Synthesis",
      text: "Each wormhole in a system that contains your ships gains PRODUCTION 1 as if it were a unit you control. Reduce the combined cost of units you produce in systems that contain wormholes by 1 for each wormhole in that system.",
      expansion: "thundersedge",
      synergy: ["propulsion","cybernetic"],
    },
    promissory: [
      { name: "Creuss Iff", text: "At the start of your turn during the action phase: Place or move a Creuss wormhole token into either a system that contains a planet you control or a non-home system that does not contain another player's ships. Then, return this card to the Creuss player.", expansion: "base" },
    ],
    factionTech: [
      {
        name: "Wormhole Generator",
        text: "At the start of the status phase, place or move a Creuss wormhole token into either a system that contains a planet you control or a non-home system that does not contain another player's ships",
        expansion: "base",
      },
      {
        name: "Wormhole Generator Ω",
        text: "ACTION: Exhaust this card to place or move a Creuss wormhole token into either a system that contains a planet you control or a non-home system that does not contain another player's ships.",
        expansion: "codex1",
      },
      {
        name: "Dimensional Splicer",
        text: "At the start of space combat in a system that contains a wormhole and 1 or more of your ships, you may produce 1 hit and assign it to 1 of your opponent's ships.",
        expansion: "base",
      },
    ],
  },
  {
    id: "l1z1x",
    name: "The L1Z1X Mindnet",
    shortName: "L1Z1X",
    expansion: "base",
    difficulty: "Low",
    color: "Black, blue, red",
    symbol: "https://static.wikia.nocookie.net/twilight-imperium-4/images/e/ec/L1Z1X.png",
    commodities: 2,
    homePlanets: [
      "[0.0.0]: 5/0",
    ],
    startingUnits: [
      "1 Dreadnought",
      "1 Carrier",
      "3 Fighters",
      "5 Infantry",
      "1 Space Dock",
      "1 PDS",
    ],
    startingTech: [
      "Neural Motivator",
      "Plasma Scoring",
    ],
    abilities: [
      { name: "ASSIMILATE", text: "When you gain control of a planet, replace each PDS and space dock that is on that planet with a matching unit from your reinforcements." },
      { name: "HARROW", text: "At the end of each round of ground combat, your ships in the active system may use their Bombardment abilities against your opponent's ground forces on the planet." },
    ],
    leaders: [
      {
        role: "Agent",
        name: "I48S",
        unlock: "At Game Start",
        ability: "After a player activates a system: You may exhaust this card to allow that player to replace 1 of their infantry in the active system with 1 mech from their reinforcements.",
        expansion: "pok",
      },
      {
        role: "Commander",
        name: "2RAM",
        unlock: "Have 4 dreadnoughts on the Board",
        ability: "Units that have PLANETARY SHIELD do not prevent you from using Bombardment.",
        expansion: "pok",
      },
      {
        role: "Hero",
        name: "The Helmsman",
        unlock: "Have 3 Scored Objectives",
        ability: "DARK SPACE NAVIGATION ACTION: Choose 1 system that does not contain other players' ships; you may move your flagship and any number of your dreadnoughts from other systems into the chosen system. Then, purge this card.",
        expansion: "pok",
      },
    ],
    flagship: {
      name: "[0.0.1]",
      cost: "8",
      combat: "5 (x2)",
      move: "1",
      capacity: "5",
      text: "Sustain Damage During a space combat, hits produced by this ship and by your dreadnoughts in this system must be assigned to non-fighter ships if able.",
    },
    mech: { name: "Annihilator", text: "While not participating in ground combat, this unit can use its BOMBARDMENT ability on planets in its system as if it were a ship. Sustain Damage Bombardment 8", expansion: "pok" },
    breakthrough: {
      name: "Fealty Uplink",
      text: "When you gain control of a planet, place infantry from your reinforcements equal to that planet's influence value on that planet.",
      expansion: "thundersedge",
      synergy: ["warfare","biotic"],
    },
    promissory: [
      { name: "Cybernetic Enhancements", text: "At the start of your turn: Remove 1 token from the L1Z1X player's strategy pool and return it to his reinforcements. Then, place 1 command token from your reinforcements in your strategy pool. Then, return this card to the L1Z1X player.", expansion: "base" },
      { name: "Cybernetic Enhancements Ω", text: "When you gain command tokens during the status phase: Gain 1 additional command token. Then, return this card to the L1Z1X player.", expansion: "codex1" },
    ],
    factionTech: [
      {
        name: "Inheritance Systems",
        text: "You may exhaust this card and spend 2 resources when you research a technology; ignore all of that technology's prerequisites.",
        expansion: "base",
      },
    ],
    uniqueUnits: [
      {
        name: "Super-Dreadnought I",
        cost: "4",
        combat: "5",
        text: "1",
        prerequisites: "2",
      },
      {
        name: "Super-Dreadnought II",
        cost: "4",
        combat: "4",
        text: "2",
        prerequisites: "2",
      },
    ],
    faq: [
      {
        text: "Q: Can the L1Z1X use Harrow when they're defending during ground combat? A: No, only the active player can use BOMBARDMENT.",
      },
      {
        text: "Q: When using the hero ability, can fighters and infantry be transported? A: Yes. During movement abilities (L1Z1X Hero, Argent Hero, Mahact Hero), you may transport units out of systems that contain your tokens. ru:Психосеть Л1З1КС Category:Factions",
        requires: ["pok"],
      },
    ],
  },
  {
    id: "mentak",
    name: "The Mentak Coalition",
    shortName: "Mentak",
    expansion: "base",
    difficulty: "High",
    color: "Orange, black, yellow",
    symbol: "https://static.wikia.nocookie.net/twilight-imperium-4/images/3/3c/Mentak.png",
    commodities: 2,
    homePlanets: [
      "Moll Primus: 4/1",
    ],
    startingUnits: [
      "1 Carrier",
      "2 Cruisers",
      "3 Fighters",
      "4 Infantry",
      "1 Space Dock",
      "1 PDS",
    ],
    startingTech: [
      "Sarween Tools",
      "Plasma Scoring",
    ],
    abilities: [
      { name: "AMBUSH", text: "At the start of a space combat, you may roll 1 die for each of up to 2 of your cruisers or destroyers in the system. For each result equal to or greater than that ship's combat value, produce 1 hit; your opponent must assign it to 1 of their ships." },
      { name: "PILLAGE", text: "After 1 of your neighbors gains trade goods or resolves a transaction, if they have 3 or more trade goods, you may take 1 of their trade goods or commodities." },
    ],
    leaders: [
      {
        role: "Agent",
        name: "Suffi An",
        unlock: "At Game Start",
        ability: "After the PILLAGE faction ability is used against another player: You may exhaust this card; if you do, you and that player each draw 1 action card.",
        expansion: "pok",
      },
      {
        role: "Commander",
        name: "S'Ula Mentarion",
        unlock: "Have 4 cruisers on the game board",
        ability: "After you win a space combat: You may force your opponent to give you 1 promissory note from their hand.",
        expansion: "pok",
      },
      {
        role: "Hero",
        name: "Ipswitch, Loose Cannon",
        unlock: "Have 3 Scored Objectives",
        ability: "SLEEPER CELL At the start of space combat that you are participating in: You may purge this card; if you do, for each other player's ship that is destroyed during this combat, place 1 ship of that type from your reinforcements in the active system.",
        expansion: "pok",
      },
    ],
    flagship: {
      name: "Fourth Moon",
      cost: "8",
      combat: "7 (x2)",
      move: "1",
      capacity: "3",
      text: "Sustain Damage Other players' ships in this system cannot use Sustain Damage.",
    },
    mech: { name: "Moll Terminus", text: "Other players' ground forces on this planet cannot use SUSTAIN DAMAGE. Sustain Damage", expansion: "pok" },
    breakthrough: {
      name: "The Table's Grace",
      text: "If you have the Cruiser II unit upgrade technology, flip this card and place it on top of Cruiser II.",
      expansion: "thundersedge",
      synergy: ["cybernetic","biotic"],
    },
    promissory: [
      { name: "Promise of Protection", text: "ACTION: Place this card face-up in your play area. While this card is in your play area, the Mentak player cannot use their Pillage faction ability against you. If you activate a system that contains 1 or more of the Mentak player's units, return this card to the Mentak player.", expansion: "base" },
    ],
    factionTech: [
      {
        name: "Salvage Operations",
        text: "After you win or lose a space combat, gain 1 trade good; if you won the combat, you may also produce 1 ship in that system of any ship type that was destroyed during the combat",
        expansion: "base",
      },
      {
        name: "Mirror Computing",
        text: "When you spend trade goods, each trade good is worth 2 resources or influence instead of 1",
        expansion: "base",
      },
    ],
    faq: [
      {
        text: "Q: Can the Mentak Coalition use the “Salvage Operations” faction-specific technology to produce infantry after a combat against the Nekro Virus flagship “The Alastor” in which Nekro Virus infantry were treated like ships and were subsequently destroyed? A: No, the infantry do not count as ships once the combat is over.",
      },
      {
        text: "Q: Can the Mentak Coalition use the “Pillage” faction ability to steal trade goods when they are neighbors with another faction as a result of the “Lazax Gate Folding” faction technology or “Quantum Entanglement” faction ability? A: Yes, even in the case of “Quantum Entanglement” only being active from the Creuss’ point of view, because the ‘neighbor’ status is active as a result of the ability, the Mentak may use their “Pillage” in these situations.",
      },
      {
        text: "Q: Can the Mentak Coalition use the “Pillage” faction ability for each time the Saar gain a trade good from the “Scavenge” faction ability in a single turn, provided that the other requirements are met? A: Yes. The Mentak can trigger “Pillage” each time the Saar gain control of a planet, if all the conditions of “Pillage” are met.",
      },
      {
        text: "Q: If Ipswitch, Loose Cannon is used in a space combat where both the Fourth Moon and the Van Hauge is present and the latter is destroyed, leading to the destruction of all other ships in the system, does the Mentak player regain their flagship as well as any other ships of the same (legal) sort that the Yin player lost, or just the ships that were available from the reinforcements before the combat? A: Yes",
        requires: ["pok"],
      },
      {
        text: "Q: Can the Mentak Coalition use the “Salvage Operations” faction-specific technology to produce a war sun that was destroyed if they do not personally have war sun technology? A: No. Without war sun technology, they cannot produce a war sun, even using “Salvage Operations.”",
      },
      {
        text: "Q: Can the Mentak Coalition’s hero, Sleeper Cell, be used to place a warsun if you do not own the warsun technology? A: No",
        requires: ["pok"],
      },
      {
        text: "Q: If Mentak's Hero, Sleeper Cell, is used and their last ship is destroyed during a round of combat in which they also destroy an opponent's ship, does combat continue? A: Yes, after both players assign hits the Mentak player then places a ship from their reinforcements in the active system and combat continues",
        requires: ["pok"],
      },
      {
        text: "Q: If you use the Mentak Coalition’s Hero, Ipswitch, Loose Cannon, and lose your flagship in a combat, but destroy the other player’s flagship and rebuild your own, can you score Unveil Flagship? A: No, the wording on Unveil Flagship would prevent you from scoring it since your flagship was destroyed in the combat, regardless of the fact that it returned ru:Коалиция Ментака Category:Factions",
        requires: ["pok"],
      },
    ],
  },
  {
    id: "naalu",
    name: "The Naalu Collective",
    shortName: "Naalu",
    expansion: "base",
    difficulty: "Medium",
    color: "Green, yellow, orange",
    symbol: "https://static.wikia.nocookie.net/twilight-imperium-4/images/a/a7/Naalu.png",
    commodities: 3,
    homePlanets: [
      "Maaluuk: 0/2",
      "Druaa: 3/1",
    ],
    startingUnits: [
      "1 Carrier",
      "1 Cruiser",
      "1 Destroyer",
      "3 Fighters",
      "4 Infantry",
      "1 Space Dock",
      "1 PDS",
    ],
    startingTech: [
      "Neural Motivator",
      "Sarween Tools",
    ],
    abilities: [
      { name: "TELEPATHIC", text: "At the end of the strategy phase, place the Naalu \"0\" token on your strategy card; you are first in initiative order." },
      { name: "FORESIGHT", text: "After another player moves ships into a system that contains 1 or more of your ships, you may place 1 token from your strategy pool in an adjacent system that does not contain another player's ships; move your ships from the active system into that system." },
    ],
    leaders: [
      {
        role: "Agent",
        name: "Z'eu",
        unlock: "At Game Start",
        ability: "After an agenda is revealed: You may exhaust this card to look at the top card of the agenda deck. Then, you may show that card to 1 other player.",
        expansion: "pok",
      },
      {
        role: "Agent",
        name: "Z'eu Ω",
        unlock: "At Game Start",
        ability: "ACTION: Exhaust this card and choose a player; That player may perform a tactical action in a non-home system without placing a command token; that system still counts as being activated.",
        expansion: "codex3",
      },
      {
        role: "Agent",
        name: "Z'eu ΩΩ",
        unlock: "At Game Start",
        ability: "After any player's command token is placed in a system: You may exhaust this card to return that token to that player's reinforcements.",
        expansion: "thundersedge",
      },
      {
        role: "Commander",
        name: "M'aban",
        unlock: "Have 12 fighters on the game board",
        ability: "You may produce 1 additional fighter for their cost; these additional units do not count against your production limit.",
        expansion: "pok",
      },
      {
        role: "Commander",
        name: "M'abanΩ",
        unlock: "Have 12 fighters on the game board",
        ability: "Have ground forces in or adjacent to the Mecatol Rex system.",
        expansion: "codex3",
      },
      {
        role: "Hero",
        name: "The Oracle",
        unlock: "Have 3 Scored Objectives",
        ability: "C-RADIUM GEOMETRY At the end of the status phase: You may force each other player to give you 1 promissory note from their hand. If you do, purge this card.",
        expansion: "pok",
      },
    ],
    flagship: {
      name: "Matriarch",
      cost: "8",
      combat: "9 (x2)",
      move: "1",
      capacity: "6",
      text: "Sustain Damage During an invasion in this system, you may commit fighters to planets as if they were ground forces. When combat ends, return those units to the space area.",
    },
    mech: { name: "Iconoclast", text: "During combat against an opponent who has at least 1 relic fragment, apply +2 to the results of this unit's combat rolls. Sustain Damage", expansion: "pok" },
    breakthrough: {
      name: "Mindsieve",
      text: "When you would resolve the secondary ability of another player's strategy card, you may give them a promissory note to resolve it without spending a command token.",
      expansion: "thundersedge",
      synergy: ["warfare","biotic"],
    },
    promissory: [
      { name: "Gift of Prescience", text: "At the end of the strategy phase: Place this card face-up in your play area and place the Naalu \"0\" token on your strategy card; you are first in the initiative order. The Naalu player cannot use their TELEPATHIC faction ability during this game round. Return this card to the Naalu player at the end of the status phase.", expansion: "base" },
    ],
    factionTech: [
      {
        name: "Neuroglaive",
        text: "After another player activates a system that contains 1 or more of your ships, that player removes 1 token from their fleet pool and returns it to their reinforcements.",
        expansion: "base",
      },
    ],
    uniqueUnits: [
      {
        name: "Hybrid Crystal Fighter I",
        cost: "1x2",
        combat: "8",
      },
      {
        name: "Hybrid Crystal Fighter II",
        cost: "1x2",
        combat: "7",
        text: "2",
      },
    ],
    faq: [
      {
        text: "Q: Does the Naalu flagship (“The Matriarch”) allow the Naalu to take gain control of a planet using only fighters? A: No. The Naalu fighters return to the space area when ground combat ends. If no Naalu ground forces are present, the combat is considered to be a draw, and the Naalu do not gain control of the planet during the “Establish Control” step.",
      },
      {
        text: "Q: Using the Naalu flagship (“The Matriarch”) in combination with the “Dacxive Animators” technology, can the Naalu gain control of a planet using only fighters? A: No, as you cannot win (only draw) ground combat with only Naalu fighters (see above question). However, if you could somehow win, the exact sequence of events if you win the ground combat would be to place an infantry with Daxcive Animators, return the fighters to the space area, then take control of the planet during the \"Establish Control\" step.",
      },
      {
        text: "Q: Does the Naalu “0” token move with the strategy card it is placed on if the card is exchanged with or taken by another player? A: No. The Naalu “0” token stays with the Naalu or the faction that gained the token through the “Gift of Prescience” promissory note and is placed on any of that player’s strategy cards.",
      },
      {
        text: "Q: Can the Naalu Collective commander, M’aban, or the Yin Brotherhood commander, Brother Omar, allow the player to choose to produce only 1 infantry/fighter and then another with their commander? A: Yes, both of these commanders allow the player to choose to only build a single fighter/infantry for 1 resource and gain an additional unit of that type each time they do.",
        requires: ["pok"],
      },
      {
        text: "Q: The Naalu Collective agent, Z’eu Omega, says \"resolve a tactical action\" but this is during a component action. How does this work for the Mahact Gene-Sorceres mech, Starlancer? Master Plan? Ministers of Peace and War? Who is the active player for abilities/transactions? Can Naalu use Fleet Logistics after this action? Can players who passed use it? A: The Naalu Collective agent, Z’eu Omega is a component action that allows a player to take a tactical action and effectively makes them the active player for the duration of the tactical action (and any actions that may occur after, due to further abilities causing further actions). This DOES NOT count as the tactical action player’s turn, so they cannot utilize fleet logistics, however they could use Master Plan or the Minister of War, as these reference tactical actions and not a player’s turn. Minister of Peace and the Mahact Gene-Sorcerers mech, Starlancer ends the turn of the tactical action player, regardless of referencing a “turn”.",
        requires: ["pok"],
      },
      {
        text: "Q: When Covert Legislation is revealed, is there a window in which the Naalu Collective commander, M’aban Omega, can look at the next agenda card? Can they look while the Politics player is resolving the primary of that strategy card, or while putting them on the top/bottom? A: The Naalu Collective Commander, M’aban Omega, cannot look at the next card when Covert Legislation is revealed before the speaker draws the top card of the agenda deck. It also cannot be used to interrupt the primary ability of the Politics strategy card.",
        requires: ["pok"],
      },
      {
        text: "Q: When using the primary ability of diplomacy on a system that has Naalu ships, does this activate the ability of Neuroglaive and force all players to place a token from their fleet pool into their reinforcements? A: No. That system is not activated by the use of the \"Diplomacy\" strategy card.",
      },
    ],
  },
  {
    id: "nekro",
    name: "The Nekro Virus",
    shortName: "Nekro",
    expansion: "base",
    difficulty: "High",
    color: "Red",
    symbol: "https://static.wikia.nocookie.net/twilight-imperium-4/images/2/22/Nekro.png",
    commodities: 3,
    homePlanets: [
      "Mordai II: 4/0",
    ],
    startingUnits: [
      "1 Dreadnought",
      "1 Carrier",
      "1 Cruiser",
      "2 Fighters",
      "2 Infantry",
      "1 Space Dock",
    ],
    startingTech: [
      "Dacxive Animators",
      "Valefar Assimilator X",
      "Valefar Assimilator Y",
    ],
    abilities: [
      { name: "GALACTIC THREAT", text: "You cannot vote on agendas. Once per agenda phase, after an agenda is revealed, you may predict aloud the outcome of that agenda. If your prediction is correct, gain 1 technology that is owned by a player who voted how you predicted." },
      { name: "TECHNOLOGICAL SINGULARITY", text: "Once per combat, after 1 of your opponent's units is destroyed, you may gain 1 technology that is owned by that player." },
      { name: "PROPAGATION", text: "You cannot research technology. When you would research a technology, gain 3 command tokens instead." },
    ],
    leaders: [
      {
        role: "Agent",
        name: "Nekro Malleon",
        unlock: "At Game Start",
        ability: "During the action phase: You may exhaust this card to choose a player; that player may discard 1 action card or spend 1 command token from their command sheet to gain 2 trade goods.",
        expansion: "pok",
      },
      {
        role: "Commander",
        name: "Nekro Acidos",
        unlock: "Own 3 technologies. A \"Valefar Assimilator\" technology counts only if its X or Y token is on a technology",
        ability: "After you gain a technology: You may draw 1 action card.",
        expansion: "pok",
      },
      {
        role: "Hero",
        name: "UNIT.DSGN. FLAYESH",
        unlock: "Have 3 Scored Objectives",
        ability: "POLYMORPHIC ALGORITHM ACTION: Choose a planet that has a technology specialty in a system that contains your units. Destroy any other player's units on that planet. Gain trade goods equal to that planet's combined resource and influence values and gain 1 technology that matches the specialty of that planet. Then, purge this card.",
        expansion: "pok",
      },
    ],
    flagship: {
      name: "The Alastor",
      cost: "8",
      combat: "9 (x2)",
      move: "1",
      capacity: "3",
      text: "Sustain Damage At the start of a space combat, choose any number of your ground forces in this system to participate in that combat as if they were ships.",
    },
    mech: { name: "Mordred", text: "During combat against an opponent who has an \"X\" or \"Y\" token on 1 or more of their technologies, apply +2 to the result of each of this unit's combat rolls. Sustain Damage", expansion: "pok" },
    breakthrough: {
      name: "Valefar Assimilator Z",
      text: "When you would gain another player's technology using one of your faction abilities, you may instead place one of your \"Z\" assimilator tokens on that player's faction sheet. Your flagship gains the text abilities of that faction's flagship in addition to its own. N/A N/A",
      expansion: "thundersedge",
    },
    promissory: [
      { name: "Antivirus", text: "At the start of a combat: Place this card face-up in your play area. While this card is in your play area, the Nekro player cannot use their TECHNOLOGICAL SINGULARITY faction ability against you. If you activate a system that contains 1 or more of the Nekro player's units, return this card to the Nekro player.", expansion: "base" },
    ],
    faq: [
      {
        text: "Q: Can the Nekro Virus use the “Valefar Assimilator” technologies on printed faction units such as the Embers of Muaat’s Prototype War Sun I? A: No, printed faction units are not technologies, and thus are ineligible targets for “Valefar Assimilator.”",
      },
      {
        text: "Q: Do infantry involved in a space combat via the effects of “The Alastor” flagship count as ships for the purpose of card effects and fleet supply? A: Infantry that are participating in space combat via “The Alastor” do count as ships (in addition to their own unit type) for the purpose of card effects, but, as a unit that can be transported, they do not count against fleet supply in that system.",
      },
      {
        text: "Q: Can infantry involved in a space combat by using the ability of “The Alastor” flagship be used in an invasion after the space combat? A: Yes.",
      },
      {
        text: "Q: Do infantry involved in a space combat via the effects of “The Alastor” flagship cease participation in combat if the Alastor is destroyed? A: No. Infantry that are committed to the space combat due to the effects of \"The Alastor\" continue to participate until the end of the combat, even if \"The Alastor\" is destroyed.",
      },
      {
        text: "Q: Do infantry involved in a space combat via the effects of “The Alastor” flagship count toward the ships required to use the “Assault Cannon” technology? A: Yes. These infantry may be used to resolve “Assault Cannon.”",
      },
      {
        text: "Q: Does the Winnu “Salai Sai Corian” flagship get additional dice for infantry participating in a fight due to the Nekro “Alastor” flagship? A: Yes. The “Salai Sai Corian” would get one additional die per infantry.",
      },
      {
        text: "Q: Can the Nekro Virus have both a standard and a faction-specific unit upgrade of the same type? A: Yes. Only the faction-specific unit upgrade technology will be in effect, but should the Nekro lose the faction-specific upgrade technology that is being copied by the “Valefar Assimilator,” they would revert to the standard unit upgrade technology that was previously inactive.",
      },
      {
        text: "Q: If the Nekro Virus owns multiple unit upgrade technologies of the same type, such as “Dreadnought II” and “Exotrireme II,” does each one count toward the “Develop Weaponry” and “Revolutionize Warfare” objectives? A: No. Only one upgrade of a given type counts toward those objectives.",
      },
      {
        text: "Q: Can a player who cannot vote (such as the Nekro Virus) play \"rider\" action cards? A: Yes. The Nekro player, or a player who cannot vote due to another effect, can still play \"rider\" action cards.",
      },
      {
        text: "Q: Can the Nekro Virus player play a \"rider\" action card along with their \"Galactic threat\" faction ability? A: Yes, the Nekro Virus may play \"rider\" action cards in addition to using their Galactic threat faction ability for the same agenda.",
      },
      {
        text: "Q: Can the Nekro Virus player play the action cards \"Bribery\" or \"Distinguished Councillor\"? A: No. The Nekro Virus player is unable to vote and so cannot use these cards to gain votes.",
      },
      {
        text: "Q: If the Nekro Virus' Valefar Assimilator technology is copying another player's faction technology and that player is eliminated, does the Valefar Assimilator token remain on that technology? A: Yes. If a player becomes eliminated and the Nekro Virus Valefar Assimilator X or Y token is on one of their faction technologies, that technology remains in play.",
      },
      {
        text: "Q: Can the Nekro Virus score the secret objective \"Adapt New Strategies\"? A: Although Valefar Assimilators themselves do not count, once other faction technologies are copied by them, those faction technologies count for the purpose of this objective.",
      },
      {
        text: "Q: Can the Nekro Virus player use the Prophet's Tears Relic? A: Yes, when the Nekro virus player uses their Propagation faction ability, they could exhaust the Relic to gain an action card. They cannot do this when they GAIN technology via their Technological Singularity faction ability.",
        requires: ["pok"],
      },
      {
        text: "Q: If the Universities of Jol-Nar player replaces a faction technology with their hero, what happens if the Nekro Virus player had a Valefar Assimilator token on it? A: The token stays on the tech in the tech-deck and Valefar Assimilator still has that technology’s text.",
        requires: ["pok"],
      },
      {
        text: "Q: Can I use the Nekro Virus’ Agent, Nekro Malleon, or Psychoarchaeology or the Hacan Agent to interrupt another ability since the timing is “during the action phase”? A: No, any ability that is used “during the action phase” cannot be resolved unless there are no other abilities currently being resolved.",
        requires: ["pok"],
      },
      {
        text: "Q: Are ground forces participating in combat via the Nekro Virus’ Flagship, The Alastor, in the space area? Are they affected by Argent Flight's Strike Wing Alpha II's ability? A: Ground Forces participating in space combat via The Alastor do not move from their origin location. If they were on planets at the start of combat, they stay on the planet, participate in combat, and are immune to SWA2’s ability. If they started in space, they are in space and are subject to SWA2’s ability.",
        requires: ["pok"],
      },
    ],
  },
  {
    id: "norr",
    name: "Sardakk N'orr",
    shortName: "N'orr",
    expansion: "base",
    difficulty: "Medium",
    color: "Black, Red",
    symbol: "https://static.wikia.nocookie.net/twilight-imperium-4/images/0/08/SardakkSymbolSquare.png",
    commodities: 3,
    homePlanets: [
      "Tren'lak: 1/0",
      "Quinarra: 3/1",
    ],
    startingUnits: [
      "2 Carriers",
      "1 Cruiser",
      "5 Infantry",
      "1 Space Dock",
      "1 PDS",
    ],
    startingTech: [
      "None",
    ],
    abilities: [
      { name: "UNRELENTING", text: "Apply +1 to the result of each of your unit's combat rolls." },
    ],
    leaders: [
      {
        role: "Agent",
        name: "T'ro",
        unlock: "At Game Start",
        ability: "At the end of a player's tactical action: You may exhaust this card; if you do, that player may place 2 infantry from their reinforcements on a planet they control in the active system.",
        expansion: "pok",
      },
      {
        role: "Commander",
        name: "G'hom Sek'kus",
        unlock: "Control 5 planets in non-home systems",
        ability: "During the \"Commit Ground Forces\" step: You can commit up to 1 ground force from each planet in the active system and each planet in adjacent systems that do not contain 1 of your command tokens.",
        expansion: "pok",
      },
      {
        role: "Hero",
        name: "Sh'val, Harbinger",
        unlock: "Have 3 Scored Objectives",
        ability: "TEKKLAR CONDITIONING After you move ships into the active system: You may skip directly to the \"Commit Ground Forces\" step. If you do, after you commit ground forces to land on planets, purge this card and return each of your ships in the active system to your reinforcements.",
        expansion: "pok",
      },
    ],
    flagship: {
      name: "C'Morran N'orr",
      cost: "8",
      combat: "6 (x2)",
      move: "1",
      capacity: "3",
      text: "Sustain Damage Apply +1 to the result of each of your other ship's combat rolls in this system.",
    },
    mech: { name: "Valkyrie Exoskeleton", text: "After this unit uses its SUSTAIN DAMAGE ability during Ground Combat, it produces 1 hit against your opponent's ground forces on this planet. Sustain Damage", expansion: "pok" },
    breakthrough: {
      name: "N'orr Supremacy",
      text: "After you win a combat, either gain 1 command token or research a unit upgrade technology.",
      expansion: "thundersedge",
      synergy: ["propulsion","warfare"],
    },
    promissory: [
      { name: "Tekklar Legion", text: "At the start of an invasion combat: Apply +1 to the result of each of your unit's combat rolls during this combat. If your opponent is the N'orr player, apply -1 to the result of each of his unit's combat rolls during this combat. Then, return this card to the N'orr player.", expansion: "base" },
    ],
    factionTech: [
      {
        name: "Valkyrie Particle Weave",
        text: "After making combat rolls during a round of ground combat, if your opponent produced 1 or more hits, you produce 1 additional hit",
        expansion: "base",
      },
    ],
    uniqueUnits: [
      {
        name: "Exotrireme I",
        cost: "4",
        combat: "5",
        text: "1",
        prerequisites: "1",
      },
      {
        name: "Exotrireme II",
        cost: "4",
        combat: "5",
        text: "2",
        prerequisites: "1",
      },
    ],
    faq: [
      {
        text: "Q: Does a Ceasefire promissory note have any impact on committing ground forces from adjacent planets via Sardakk N’orr’s commander, G’hom Sek’kus? A: Will change “commit ground forces” in LRR to say “move” to ensure Ceasefire works. Will also prevent units from being committed to planets in anomalies without the appropriate technology, or through wormholes if Enforced Travel Ban is a Law.",
        requires: ["pok"],
      },
      {
        text: "Q: Can the Sardakk N’orr player commit ground forces via their commander, G’hom Sek’kus, on defense? A: No, only the active player can commit ground forces",
        requires: ["pok"],
      },
      {
        text: "Q: Does using Dominus Orb allow the Sardakk N’orr player to commit ground forces via their commander, G’hom Sek’kus? A: Yes, If the N’orr player purges the Dominus Orb relic during the “Movement” of a tactical action, they may use G’hom Sek’kus to commit ground forces from systems that contain their command tokens during that tactical action.",
        requires: ["pok"],
      },
      {
        text: "Q: Can Sardakk N’orr’s commander, G’hom Sek’kus, be used without moving any ships into the active system? A: Yes, the commander can allow the Sardakk N’orr player to commit ground forces even without moving in ships",
        requires: ["pok"],
      },
      {
        text: "Q: Does Valkyrie Particle Weave trigger after hits were produced if the hits were cancelled? A: Yes, the hit from Valkyrie Particle Weave is still applied",
      },
      {
        text: "Q: Does the Sardakk N'orr Exotrireme 2's ability ignores the Sustain Damage ability? A: Yes, as the words of the ability says \"Destroy up to 2 ships\" and not \"Produce 2 hits\"",
      },
      {
        text: "Q: Who choses the targets of the Exotrireme II's ability ? A: The Sardakk N'orr Player chooses the targets",
      },
    ],
  },
  {
    id: "jolnar",
    name: "The Universities of Jol-Nar",
    shortName: "Jol-Nar",
    expansion: "base",
    difficulty: "Low",
    color: "Blue, purple",
    symbol: "https://static.wikia.nocookie.net/twilight-imperium-4/images/0/06/Jol-Nar.png",
    commodities: 4,
    homePlanets: [
      "Jol: 1/2",
      "Nar: 2/3",
    ],
    startingUnits: [
      "1 Dreadnought",
      "2 Carriers",
      "1 Fighter",
      "2 Infantry",
      "1 Space Dock",
      "2 PDS",
    ],
    startingTech: [
      "Neural Motivator",
      "Antimass Deflectors",
      "Sarween Tools",
      "Plasma Scoring",
    ],
    abilities: [
      { name: "FRAGILE", text: "Apply -1 to the result of each of your unit's combat rolls." },
      { name: "BRILLIANT", text: "When you spend a command token to resolve the secondary ability of the \"Technology\" strategy card, you may resolve the primary ability instead." },
      { name: "ANALYTICAL", text: "When you research a technology that is not a unit upgrade technology, you may ignore 1 prerequisite." },
    ],
    leaders: [
      {
        role: "Agent",
        name: "Doctor Sucaban",
        unlock: "At Game Start",
        ability: "When a player spends resources to research: You may exhaust this card to allow that player to remove any number of their infantry from the game board. For each unit removed, reduce the resources spent by 1.",
        expansion: "pok",
      },
      {
        role: "Commander",
        name: "Ta Zern",
        unlock: "Own 8 technologies",
        ability: "After you roll dice for a unit ability: You may reroll any of those dice.",
        expansion: "pok",
      },
      {
        role: "Commander",
        name: "???",
        unlock: "Own 8 technologies",
        ability: "Agnlan Oln",
        expansion: "thundersedge",
      },
      {
        role: "Hero",
        name: "Rin, The Master's Legacy",
        unlock: "Have 3 Scored Objectives",
        ability: "GENETIC MEMORY ACTION: For each non-unit upgrade technology you own, you may replace that technology with any technology of the same color from the deck. Then, purge this card.",
        expansion: "pok",
      },
    ],
    flagship: {
      name: "J.N.S. Hylarim",
      cost: "8",
      combat: "6 (x2)",
      move: "1",
      capacity: "3",
      text: "Sustain Damage When making a combat roll for this ship, each result of 9 or 10, before applying modifiers, produces 2 additional hits.",
    },
    mech: { name: "Shield Paling", text: "Your infantry on this planet are not affected by your FRAGILE faction ability. Sustain Damage", expansion: "pok" },
    breakthrough: {
      name: "Specialized Compounds",
      text: "When you research technology using the \"Technology\" strategy card, you may exhaust a planet that has a technology speciality instead of spending resources; if you do you must research a technology of that colour.",
      expansion: "thundersedge",
      synergy: ["cybernetic","biotic"],
    },
    promissory: [
      { name: "Research Agreement", text: "After the Jol-Nar player researches a technology that is not a faction technology: Gain that technology. Then, return this card to the Jol-Nar player.", expansion: "base" },
    ],
    factionTech: [
      {
        name: "E-Res Siphons",
        text: "After another player activates a system that contains 1 or more of your ships, gain 4 trade goods.",
        expansion: "base",
      },
      {
        name: "Spatial Conduit Cylinder",
        text: "You may exhaust this card after you activate a system that contains 1 or more of your units; that system is adjacent to all other systems that contain 1 or more of your units during this activation.",
        expansion: "base",
      },
    ],
    faq: [
      {
        text: "Q: When the Universities of Jol-Nar player uses their hero, Rin, do they swap all techs simultaneously or consecutively? A: Simultaneously, that is to say the Universities of Jol-Nar player cannot swap out a tech and re-take it during this component action",
        requires: ["pok"],
      },
      {
        text: "Q: If the Universities of Jol-Nar player replaces a faction technology with their hero, what happens if the Nekro Virus player had a Valefar Assimilator token on it? A: The token stays on the tech in the tech-deck and Valefar Assimilator still has that technology’s text",
        requires: ["pok"],
      },
    ],
  },
  {
    id: "winnu",
    name: "The Winnu",
    shortName: "Winnu",
    expansion: "base",
    difficulty: "Medium",
    color: "Orange, Yellow, Purple",
    symbol: "https://static.wikia.nocookie.net/twilight-imperium-4/images/c/cd/Winnu.png",
    commodities: 3,
    homePlanets: [
      "Winnu: 3/4",
    ],
    startingUnits: [
      "1 Carrier",
      "1 Cruiser",
      "2 Fighters",
      "2 Infantry",
      "1 Space Dock",
      "1 PDS",
    ],
    startingTech: [
      "Choose any 1 technology that has no prerequisites.",
    ],
    abilities: [
      { name: "BLOOD TIES", text: "You do not have to spend influence to remove the custodians token from Mecatol Rex." },
      { name: "RECLAMATION", text: "After you resolve a tactical action during which you gained control of Mecatol Rex, you may place 1 PDS and 1 space dock from your reinforcements on Mecatol Rex." },
    ],
    leaders: [
      {
        role: "Agent",
        name: "Berekar Berekon",
        unlock: "At Game Start",
        ability: "When 1 or more of a player's units use PRODUCTION: You may exhaust this card to reduce the combined cost of the produced units by 2.",
        expansion: "pok",
      },
      {
        role: "Commander",
        name: "Rickar Rickani",
        unlock: "Control Mecatol Rex or enter into a combat in the Mecatol Rex system.",
        ability: "During combat: Apply +2 to the result of each of your unit's combat rolls in the Mecatol Rex system, your home system, and each system that contains a legendary planet",
        expansion: "pok",
      },
      {
        role: "Hero",
        name: "Mathis Mathinus",
        unlock: "Have 3 Scored Objectives",
        ability: "IMPERIAL SEAL ACTION: Perform the primary ability of any strategy card. Then, choose any number of other players. Those players may perform the secondary ability of that strategy card. Then, purge this card.",
        expansion: "pok",
      },
    ],
    flagship: {
      name: "Salai Sai Corian",
      cost: "8",
      combat: "7",
      move: "1",
      capacity: "3",
      text: "Sustain Damage When this unit makes a combat roll, it rolls a number of dice equal to the number of your opponent's non-fighter ships in this system.",
    },
    mech: { name: "Reclaimer", text: "After you resolve a tactical action where you gained control of this planet, you may place 1 PDS or 1 Space Dock from your reinforcements on this planet. Sustain Damage", expansion: "pok" },
    breakthrough: {
      name: "Imperator",
      text: "Apply +1 to the results of each of your unit's combat rolls for each \"Support for the Throne\" in your opponent's play area. After you activate a system that contains a legendary planet, apply +1 to the move value of 1 of your ships during this tactical action.",
      expansion: "thundersedge",
      synergy: ["propulsion","warfare"],
    },
    promissory: [
      { name: "Acquiescence", text: "At the end of the strategy phase: Exchange 1 of your strategy cards with a strategy card that was chosen by the Winnu player. Then, return this card to the Winnu player.", expansion: "base" },
      { name: "Acquiescence Ω", text: "When the Winnu player resolves a strategic action: You do not have to spend or place a command token to resolve the secondary ability of that strategy card. Then, return this card to the Winnu player", expansion: "codex1" },
    ],
    factionTech: [
      {
        name: "Lazax Gate Folding",
        text: "During your tactical actions, if you do not control Mecatol Rex, treat its system as if it contains both an alpha and beta wormhole. ACTION: If you control Mecatol Rex, exhaust this card to place 1 infantry from your reinforcements on Mecatol Rex.",
        expansion: "base",
      },
      {
        name: "Hegemonic Trade Policy",
        text: "Exhaust this card when 1 or more of your units use PRODUCTION; swap the resource and influence values of 1 planet you control during that use of Production",
        expansion: "base",
      },
    ],
    faq: [
      {
        text: "Q: Does the Winnu “Salai Sai Corian” flagship get additional dice for infantry participating in a fight due to the Nekro “Alastor” flagship? A: Yes. The “Salai Sai Corian” would get one additional die per infantry.",
      },
      {
        text: "Q: Can the Mentak Coalition use the “Pillage” faction ability to steal trade goods when they are neighbors with another faction as a result of the “Lazax Gate Folding” faction technology? A: Yes.",
      },
      {
        text: "Q: Does the Winnu commander, Rickar Rickani, stack if Mecatol Rex is also a Legendary Planet? A: No, the commander only triggers once no matter how many conditions are met, +2 is the max.",
        requires: ["pok"],
      },
    ],
  },
  {
    id: "xxcha",
    name: "The Xxcha Kingdom",
    shortName: "Xxcha",
    expansion: "base",
    difficulty: "Low",
    color: "Green, Blue",
    symbol: "https://static.wikia.nocookie.net/twilight-imperium-4/images/1/1a/Xxcha.png",
    commodities: 4,
    homePlanets: [
      "Archon Ren: 2/3",
      "Archon Tau: 1/1",
    ],
    startingUnits: [
      "1 Carrier",
      "2 Cruisers",
      "3 Fighters",
      "4 Infantry",
      "1 Space Dock",
      "1 PDS",
    ],
    startingTech: [
      "Graviton Laser System",
    ],
    abilities: [
      { name: "PEACE ACCORDS", text: "After you resolve the primary or secondary ability of the \"Diplomacy\" strategy card, you may gain control of 1 planet other than Mecatol Rex that does not contain any units and is in a system that is adjacent to a planet you control." },
      { name: "QUASH", text: "When an agenda is revealed, you may spend 1 token from your strategy pool to discard that agenda and reveal 1 agenda from the top of the deck. Players vote on this agenda instead." },
    ],
    leaders: [
      {
        role: "Agent",
        name: "Ggrocuto Rinn",
        unlock: "At Game Start",
        ability: "ACTION: Exhaust this card to ready any planet; if that planet is in a system that is adjacent to a planet you control, you may remove 1 infantry from that planet and return it to its reinforcements.",
        expansion: "pok",
      },
      {
        role: "Commander",
        name: "Elder Qanoj",
        unlock: "Control planets that have a combined value of at least 12 influence",
        ability: "Each planet you exhaust to cast votes provides 1 additional vote. Game effects cannot prevent you from voting on an agenda.",
        expansion: "pok",
      },
      {
        role: "Hero",
        name: "Xxekir Grom",
        unlock: "Have 3 Scored Objectives",
        ability: "POLITICAL DATA NEXUS ACTION: You may discard 1 law from play. Look at the top 5 cards of the agenda deck. Choose 2 to reveal, and resolve each as if you had cast 1 vote for an outcome of your choice; discard the rest. Other players cannot resolve abilities during this action. Then, purge this card.",
        expansion: "pok",
      },
      {
        role: "Hero",
        name: "Xxekir Grom Ω",
        unlock: "Have 3 Scored Objectives",
        ability: "POLITICAL DATA NEXUS Ω When you exhaust planets, combine the values of their resources and influence. Treat the combined value as if it were both resources and influence.",
        expansion: "codex3",
      },
      {
        role: "Hero",
        name: "Xxekir Grom ΩΩ",
        unlock: "Have 3 Scored Objectives",
        ability: "PLANETARY DEFENSE NEXUS ACTION: Place any combination of up to 4 PDS or mechs onto planets you control; ready each planet that you place a unit on. Then, purge this card.",
        expansion: "thundersedge",
      },
    ],
    flagship: {
      name: "Loncara Ssodu",
      cost: "8",
      combat: "7 (x2)",
      move: "1",
      capacity: "3",
      text: "Sustain Damage Space Cannon 5 (x3) You may use this unit's SPACE CANNON against ships that are in adjacent systems.",
    },
    mech: { name: "Indomitus", text: "You may use this unit's Space Cannon ability against ships that are in adjacent systems. Sustain Damage Space Cannon 8", expansion: "pok" },
    breakthrough: {
      name: "Archon's Gift",
      text: "You can spend influence as if it were resources. You can spend resources as if it were influence.",
      expansion: "thundersedge",
      synergy: ["cybernetic","biotic"],
    },
    promissory: [
      { name: "Political Favor", text: "When an agenda is revealed: Remove 1 token from the Xxcha player's strategy pool and return it to their reinforcements. Then, discard the revealed agenda and reveal 1 agenda from the top of the deck. Players vote on this agenda instead. Then, return this card to the Xxcha player.", expansion: "base" },
    ],
    factionTech: [
      {
        name: "Nullification Field",
        text: "After another player activates a system that contains 1 or more of your ships, you may exhaust this card and spend 1 token from your strategy pool; immediately end that player's turn.",
        expansion: "base",
      },
      {
        name: "Instinct Training",
        text: "You may exhaust this card and spend 1 token from your strategy pool when another player plays an action card; cancel that action card.",
        expansion: "base",
      },
    ],
    faq: [
      {
        text: "Q: Can the Xxcha use the “Peace Accords” faction ability from one planet to another planet in the same system? A: Yes, a planet is considered to be adjacent to its own system.",
      },
      {
        text: "Q: Can the Xxcha use the “Peace Accords” faction ability on a planet that has another players ships in the space area of the system? A: Yes, as long as the planet being targeted is free of opposing players units (Ground Forces & Structures).",
      },
      {
        text: "Q: Can the Xxcha promissory note \"Political Favor\" be used if the Xxcha players strategy pool doesn't have any Command Tokens in it? A: No, the strategy token discard is mandatory and must resolve for the rest of the card effect to work.",
      },
      {
        text: "Q: Can the Xxcha faction technology \"Instinct Training\" be used to cancel a \"Sabotage\" action card? A: Yes, \"Instinct Training\" can be used to cancel the effect of a \"Sabotage\".",
      },
      {
        text: "Q: Can the Xxcha Agent, Ggrocuto Rinn, be used to “ready” a planet that is not exhausted? A: The target planet must be exhausted.",
        requires: ["pok"],
      },
      {
        text: "Q: If the Xxcha hero (Xxekir Grom) gives two players in the lead a Victory Point, and both players now have enough points to win the game, is the order for winning determined from Xxcha player (active player) onwards in initiative, or starting with the lowest initiatve? A: Initiative order determines the winner. Initiative order is always the lowest initiative player onwards, regardless of who the active player is. Q Can the Xxcha Kingdom player play riders while using their hero, Xxekir Grom? Can other players use riders during the Xxcha hero? A Yes, the Xxcha player can play riders, and use their quash ability during their hero (other players do not vote, even if quashed). Other players cannot play any action cards as these are abilities.",
        requires: ["pok"],
      },
      {
        text: "Q: If Xxcha draws Covert legislation as one of their 5 Agendas with their hero, do they get to see the next agenda that would be tied to it as well? Related, what happens if they draw an agenda that says \"if there are no laws in play...\" off of their hero? A: Xxcha would only get to see the agenda tied to Covert Legislation if it was one of the 2 agendas selected to resolve and they are the speaker, otherwise the speaker would see the agenda. If there are no laws in play a new agenda is drawn",
        requires: ["pok"],
      },
      {
        text: "Q: When using the Xxcha Kingdom Hero Xxekir Grom, can other players resolve agendas that affect the whole table, such as Galactic Crisis Pact? A: The intent is that players still resolve agendas that the Xxcha player chooses off of their Hero. I recognize that this may conflict with RAW, but the intention was never to make other players unable to resolve agenda effects.",
        requires: ["pok"],
      },
      {
        text: "Q: Checks and balances against reads “Each player readies only 3 of their planets at the end of this agenda phase.” Does this trigger at the end of Xxchas hero? At the end of the next agenda phase, not at all? A: This effect does not trigger if it happens during the Xxcha Hero.",
        requires: ["pok"],
      },
      {
        text: "Q: When the Xxcha Kingdom hero, Political Data Nexus Omega, is used do they get both resources and influence, or is it only one? A: When the Xxcha Kingdom hero, Political Data Nexus Omega, is used to combine resource and influence values, the Xxcha Kingdom player chooses to spend those as one or the other, not both.",
        requires: ["pok"],
      },
      {
        text: "Q: For the Xxcha Kingdom hero, Political Data Nexus Omega, unlock condition; what is the order of scoring public and secret objectives? Can the hero be unlocked in between these? A: Scoring in the status phase is done all at once, the unlock condition of heroes is not checked until the score objectives step of the status phase is complete.",
        requires: ["pok"],
      },
      {
        text: "Q: If the Xxcha Kingdom plays uprising with Political Data Nexus Omega unlocked do they get the sum of both influence and resources in trade goods? A: When using an ability that references “resource value”, the printed resource value of the planet is used. ru:Королевство Ззча Category:Factions",
      },
    ],
  },
  {
    id: "yin",
    name: "The Yin Brotherhood",
    shortName: "Yin",
    expansion: "base",
    difficulty: "Low",
    color: "Purple, black, yellow",
    symbol: "https://static.wikia.nocookie.net/twilight-imperium-4/images/f/f6/Yin.png",
    commodities: 2,
    homePlanets: [
      "Darien: 4/4",
    ],
    startingUnits: [
      "2 Carriers",
      "1 Destroyer",
      "4 Fighters",
      "4 Infantry",
      "1 Space Dock",
    ],
    startingTech: [
      "Sarween Tools",
    ],
    abilities: [
      { name: "INDOCTRINATION", text: "At the start of a ground combat, you may spend 2 influence to replace 1 of your opponent's participating infantry with 1 infantry from your reinforcements." },
      { name: "DEVOTION", text: "After each space battle round, you may destroy 1 of your cruisers or destroyers in the active system to produce 1 hit and assign it to 1 of your opponent's ships in that system." },
    ],
    leaders: [
      {
        role: "Agent",
        name: "Brother Milor",
        unlock: "At Game Start",
        ability: "After a player's destroyer or cruiser is destroyed: You may exhaust this card; if you do, that player may place up to 2 fighters from their reinforcements in that unit's system.",
        expansion: "pok",
      },
      {
        role: "Agent",
        name: "Brother Milor Ω",
        unlock: "At Game Start",
        ability: "After a player's unit is destroyed: You may exhaust this card to allow that player to place 2 fighters in the destroyed unit's system if it was a ship, or 2 infantry on its planet if it was a ground force.",
        expansion: "codex3",
      },
      {
        role: "Agent",
        name: "Brother Milor ΩΩ",
        unlock: "At Game Start",
        ability: "After a player's unit is destroyed during combat: You may exhaust this card to allow that player to place 2 fighters in the destroyed unit's system if it was a ship, or 2 infantry on its planet if it was a ground force.",
        expansion: "thundersedge",
      },
      {
        role: "Commander",
        name: "Brother Omar",
        unlock: "Use your INDOCTRINATION faction ability",
        ability: "This card satisfies a green technology prerequisite. You may produce 1 additional infantry for their cost. These infantry do not count against your production limit.",
        expansion: "pok",
      },
      {
        role: "Commander",
        name: "Brother Omar Ω",
        unlock: "Use your INDOCTRINATION faction ability",
        ability: "Use one of your faction abilities.",
        expansion: "codex3",
      },
      {
        role: "Commander",
        name: "Brother Omar ΩΩ",
        unlock: "Use your INDOCTRINATION faction ability",
        ability: "Use one of your faction abilities.",
        expansion: "thundersedge",
      },
      {
        role: "Hero",
        name: "Dannel of the Tenth",
        unlock: "Have 3 Scored Objectives",
        ability: "SPINNER OVERDRIVE ACTION: For each planet that contains any number of your infantry, either ready that planet or place an equal number of infantry from your reinforcements on that planet. Then, purge this card.",
        expansion: "pok",
      },
      {
        role: "Hero",
        name: "Dannel of the Tenth Ω",
        unlock: "Have 3 Scored Objectives",
        ability: "QUANTUM DISSEMINATION ACTION: Commit up to 3 infantry from your reinforcements to any non-home planets and resolve invasions on those planets; players cannot use SPACE CANNON against those units. Then, purge this card.",
        expansion: "codex3",
      },
      {
        role: "Hero",
        name: "Dannel of the Tenth ΩΩ",
        unlock: "Have 3 Scored Objectives",
        ability: "QUANTUM DISSEMINATION ACTION: Commit up to 3 infantry from your reinforcements to any non-home planets and resolve ground combats on those planets; players cannot use SPACE CANNON against these units. Then, purge this card.",
        expansion: "thundersedge",
      },
    ],
    flagship: {
      name: "Van Hauge",
      cost: "8",
      combat: "9 (x2)",
      move: "1",
      capacity: "3",
      text: "Sustain Damage When this ship is destroyed, destroy all ships in this system.",
    },
    mech: { name: "Moyin's Ashes", text: "DEPLOY: When you use your INDOCTRINATION faction ability, you may spend 1 additional influence to replace your opponent's unit with 1 mech instead of 1 infantry. Sustain Damage", expansion: "pok" },
    breakthrough: {
      name: "Yin Ascendant",
      text: "When you gain this card or score a public objective, gain the alliance ability of a random, unused faction.",
      expansion: "thundersedge",
      synergy: ["cybernetic","biotic"],
    },
    promissory: [
      { name: "Greyfire Mutagen", text: "After a system is activated: The Yin player cannot use faction abilities or faction technology during this tactical action. Then, return this card to the Yin player.", expansion: "base" },
      { name: "Greyfire Mutagen Ω", text: "At the start of a ground combat against 2 or more ground forces that are not controlled by the Yin player: Replace 1 of your opponent's infantry with 1 infantry from your reinforcements. Then, return this card to the Yin player.", expansion: "codex1" },
    ],
    factionTech: [
      {
        name: "Impulse Core",
        text: "At the start of a space combat, you may destroy 1 of your cruisers or destroyers in the active system to produce 1 hit against your opponent's ships; that hit must be assigned by your opponent to 1 of their non-fighter ships, if able.",
        expansion: "base",
      },
      {
        name: "Yin Spinner",
        text: "After 1 or more of your units use PRODUCTION, place 1 infantry from your reinforcements on a planet you control in that system.",
        expansion: "base",
      },
      {
        name: "Yin Spinner Ω",
        text: "After you produce units, place up to 2 infantry from your reinforcements on any planet you control or in any space area that contains 1 or more of your ships.",
        expansion: "codex1",
      },
    ],
    faq: [
      {
        text: "Q: Does the Yin Brotherhood agent, Brother Milor, keep combat going after the last ship is destroyed? A: Yes.",
        requires: ["pok"],
      },
      {
        text: "Q: Can the Yin Brotherhood commander, Brother Omar, or the Naalu Collective commander, M’aban, allow the player to choose to produce only 1 infantry/fighter and then another with their commander? A: Yes, both of these commanders allow the player to choose to only build a single fighter/infantry for 1 resource and gain an additional unit of that type each time they do.",
        requires: ["pok"],
      },
      {
        text: "Q: Does a destroyer use its anti-fighter barrage ability before it is destroyed by the Impulse core technology? A: No. \"Start of Combat\" abilities occur before the Anti-fighter barrage step.",
      },
      {
        text: "Q: The Yin Brotherhood hero, Quantum Dissemination Omega, says to \"resolve invasions\" on those planets. Does this allow for using Parley, committing additional ground forces, and using bombardment? Should this be ground combats? A: The Yin hero, Quantum Dissemination Omega, should indicate to resolve ground combats on those planets, not full invasion steps. Parley can be played on one of the planets.",
        requires: ["pok"],
      },
      {
        text: "Q: Can the Yin Brotherhood Agent, Brother Milor Omega, be used during the Agenda Phase? A: Brother Milor Omega can only be used during the action phase.",
        requires: ["codex3", "pok"],
      },
      {
        text: "Q: What is the interaction between the Yin Brotherhood agent, Brother Milor Omega, and the Nekro Virus and Naalu Collective flagship abilities? A: The units participating in combat via these flagship abilities are both a ground force and ship during combat. The owner of the unit can choose whether to place 2 infantry or 2 fighters when using Brother Milor Omega, however units placed this way can only continue to participate in space combat if fighters are placed, and can only continue to participate in ground combat if infantry are placed ru:Братство Инь Category:Factions",
        requires: ["codex3", "pok"],
      },
    ],
  },
  {
    id: "yssaril",
    name: "The Yssaril Tribes",
    shortName: "Yssaril",
    expansion: "base",
    difficulty: "Low",
    color: "Green, Yellow",
    symbol: "https://static.wikia.nocookie.net/twilight-imperium-4/images/a/ac/Yssaril.png",
    commodities: 3,
    homePlanets: [
      "Retillion: 2/3",
      "Shalloq: 1/2",
    ],
    startingUnits: [
      "2 Carriers",
      "1 Cruiser",
      "2 Fighters",
      "5 Infantry",
      "1 Space Dock",
      "1 PDS",
    ],
    startingTech: [
      "Neural Motivator",
    ],
    abilities: [
      { name: "STALL TACTICS", text: "ACTION: Discard 1 action card from your hand." },
      { name: "SCHEMING", text: "When you draw 1 or more action cards, draw 1 additional action card. Then, choose and discard 1 action card from your hand." },
      { name: "CRAFTY", text: "You can have any number of action cards in your hand. Game effects cannot prevent you from using this ability." },
    ],
    leaders: [
      {
        role: "Agent",
        name: "Ssruu",
        unlock: "At Game Start",
        ability: "This card has the text ability of each other player's agent, even if that agent is exhausted.",
        expansion: "pok",
      },
      {
        role: "Commander",
        name: "So Ata",
        unlock: "Have 7 action cards",
        ability: "After another player activates a system that contains your units: You may look at that player's action cards, promissory notes, or secret objectives.",
        expansion: "pok",
      },
      {
        role: "Hero",
        name: "Kyver, Blade and Key",
        unlock: "Have 3 Scored Objectives",
        ability: "GUILD OF SPIES ACTION: Each other player shows you 1 action card from their hand. For each player, you may either take that card or force that player to discard 3 random action cards from their hand. Then, purge this card.",
        expansion: "pok",
      },
    ],
    flagship: {
      name: "Y'sia Y'ssrila",
      cost: "8",
      combat: "5 (x2)",
      move: "2",
      capacity: "3",
      text: "Sustain Damage This ship can move through systems that contain other player's ships.",
    },
    mech: { name: "Blackshade Infiltrator", text: "DEPLOY: After you use your STALL TACTICS faction ability, you may place 1 mech on a planet you control Sustain Damage", expansion: "pok" },
    breakthrough: {
      name: "Deepgloom Executable",
      text: "You can allow other players to use your STALL TACTICS or SCHEMING faction abilities; when you do, you may resolve a transaction with that player. During the action phase, that transaction does not count against the once-per-player transactions limit for that turn.",
      expansion: "thundersedge",
      synergy: ["cybernetic","biotic"],
    },
    promissory: [
      { name: "Spy Net", text: "At the start of your turn: Look at the Yssaril player's hand of action cards. Choose 1 of those cards and add it to your hand. Then, return this card to the Yssaril player.", expansion: "base" },
    ],
    factionTech: [
      {
        name: "Transparasteel Plating",
        text: "During your turn of the action phase, players that have passed cannot play action cards.",
        expansion: "base",
      },
      {
        name: "Mageon Implants",
        text: "ACTION: Exhaust this card to look at another player's hand of action cards. Choose 1 of those cards and add it to your hand.",
        expansion: "base",
      },
    ],
    faq: [
      {
        text: "Q: Does the “Neural Motivator” technology give an additional action card with the Yssaril’s “Scheming” faction ability? A: Yes, \"when you draw action cards\" so you would draw 3 cards.",
      },
    ],
  },
  {
    id: "argent",
    name: "The Argent Flight",
    shortName: "Argent",
    expansion: "pok",
    difficulty: "Low",
    color: "Orange",
    symbol: "https://static.wikia.nocookie.net/twilight-imperium-4/images/1/13/ArgentFactionSymbol.png",
    commodities: 3,
    homePlanets: [
      "Valk: 2/0",
      "Avar: 1/1",
      "Ylir: 0/2",
    ],
    startingUnits: [
      "1 Carrier",
      "2 Destroyers",
      "2 Fighters",
      "5 Infantry",
      "1 Space Dock",
      "1 PDS",
    ],
    startingTech: [
      "Choose two of the following:",
      "Neural Motivator",
      "Sarween Tools",
      "Plasma Scoring",
    ],
    abilities: [
      { name: "ZEAL", text: "You always vote first during the agenda phase. When you cast at least 1 vote, cast 1 additional vote for each player in the game including you." },
      { name: "RAID FORMATION", text: "When 1 or more of your units uses ANTI-FIGHTER BARRAGE, for each hit produced in excess of your opponent's Fighters, choose 1 of your opponent's ships that has SUSTAIN DAMAGE to become damaged." },
    ],
    leaders: [
      {
        role: "Agent",
        name: "Trillossa Aun Mirik",
        unlock: "At Game Start",
        ability: "When a player produces ground forces in a system: You may exhaust this card; that player may place those units on any planets they control in that system and any adjacent systems.",
        expansion: "pok",
      },
      {
        role: "Commander",
        name: "Trrakan Aun Zulok",
        unlock: "Have 6 units that have ANTI-FIGHTER BARRAGE, SPACE CANNON or BOMBARDMENT on the game board",
        ability: "When 1 or more of your units make a roll for a unit ability: You may choose 1 of those units to roll 1 additional die.",
        expansion: "pok",
      },
      {
        role: "Hero",
        name: "Mirik Aun Sissiri",
        unlock: "Have 3 Scored Objectives",
        ability: "HELIX PROTOCOL ACTION: Move any number of your ships from any systems to any number of other systems that contain 1 of your command tokens and no other players' ships. Then, purge this card.",
        expansion: "pok",
      },
    ],
    flagship: {
      name: "Quetzecoatl",
      cost: "8",
      combat: "7 (x2)",
      move: "1",
      capacity: "3",
      text: "Sustain Damage Other players cannot use space cannon against your ships in this system",
    },
    mech: { name: "Aerie Sentinel", text: "This unit does not count against capacity if it is being transported or if it is in a space area with 1 or more of your ships that have capacity values Sustain Damage", expansion: "pok" },
    breakthrough: {
      name: "Wing Transfer",
      text: "When you activate a system that contains only your units, you may place command tokens from your reinforcements into any system adjacent to that system that contain only your units; at the end of this action, you may move ships among the active system and systems adjacent to it that contain your command tokens.",
      expansion: "thundersedge",
      synergy: ["propulsion","cybernetic"],
    },
    promissory: [
      { name: "Strike Wing Ambuscade", text: "When 1 or more of your units make a roll for a unit ability: Choose 1 of those units to roll 1 additional die Then, return this card to the Argent player", expansion: "pok" },
    ],
    factionTech: [
      {
        name: "Aerie Hololattice",
        text: "Other players cannot move ships through systems that contain your structures. Each planet that contains 1 or more of your structures gains the PRODUCTION 1 ability as if it were a unit",
        expansion: "pok",
      },
    ],
    uniqueUnits: [
      {
        name: "Strike Wing Alpha I",
        cost: "1",
        combat: "8",
        text: "2",
        prerequisites: "1",
      },
      {
        name: "Strike Wing Alpha II",
        cost: "1",
        combat: "7",
        text: "2",
        prerequisites: "1",
      },
    ],
    faq: [
      {
        text: "Q: Can ships damaged by Raid Formation trigger a window for the Direct Hit Action card? A: No, Raid Formation does not cause the ship to use its Sustain Damage ability, it only causes it to become damaged, so there is no window for Direct Hit to be used.",
      },
      {
        text: "Q: Can the Argent Flight Hero \"Mirik Aun Sissiri\" be used to move ships into a Supernova or Nebula tile? A: No. Any units moving into, through or out of anomalies must follow the same rules for ships moving into, through or out of anomalies.",
      },
      {
        text: "Q: When is Raid Formation applied? After rolling or after assigning hits? (Interacts with Waylay) A: Raid formation is applied after rolling, before canceling or assigning hits.",
      },
      {
        text: "Q: Does Strike Wing Alpha II infantry killing get prevented by Shields Holding/re-roll abilities? A: The rolls from Strike Wing Alpha II can be subject to rerolls before the ability is applied, but the infantry would be destroyed BEFORE any cancellation of hits. ru:Серебряная Стая Category:Factions",
      },
    ],
  },
  {
    id: "empyrean",
    name: "The Empyrean",
    shortName: "Empyrean",
    expansion: "pok",
    difficulty: "Low",
    color: "Purple, Pink, Red",
    symbol: "https://static.wikia.nocookie.net/twilight-imperium-4/images/c/ca/EmpyreanFactionSymbol.png",
    commodities: 4,
    homePlanets: [
      "The Dark: 3/4",
      "Nebula",
    ],
    startingUnits: [
      "2 Carriers",
      "1 Destroyer",
      "2 Fighters",
      "4 Infantry",
      "1 Space Dock",
    ],
    startingTech: [
      "Dark Energy Tap",
    ],
    abilities: [
      { name: "VOIDBORN", text: "Nebulae do not affect your ships' movement." },
      { name: "AETHERPASSAGE", text: "After a player activates a system, you may allow that player to move their ships through systems that contain your ships." },
      { name: "DARK WHISPERS", text: "During setup, take the additional Empyrean faction promissory note; you have 2 faction promissory notes." },
    ],
    leaders: [
      {
        role: "Agent",
        name: "Acamar",
        unlock: "At Game Start",
        ability: "After a player moves ships into a system that does not contain any planets: You may exhaust this card; that player gains 1 command token.",
        expansion: "pok",
      },
      {
        role: "Commander",
        name: "Xuange",
        unlock: "Be neighbors with all other players",
        ability: "After another player moves ships into a system that contains 1 of your command tokens: You may return that token to your reinforcements.",
        expansion: "pok",
      },
      {
        role: "Hero",
        name: "Conservator Procyon",
        unlock: "Have 3 Scored Objectives",
        ability: "MULTIVERSE SHIFT ACTION: Place 1 frontier token in each system that does not contain any planets and does not already have a frontier token. Then, explore each frontier token that is in a system that contains 1 or more of your ships. Then, purge this card.",
        expansion: "pok",
      },
    ],
    flagship: {
      name: "Dynamo",
      cost: "8",
      combat: "5 (x2)",
      move: "1",
      capacity: "3",
      text: "Sustain Damage After any player's unit in this system or an adjacent system uses SUSTAIN DAMAGE, you may spend 2 influence to repair that unit.",
    },
    mech: { name: "Watcher", text: "You may remove this unit from a system that contains or is adjacent to another player's units to cancel an action card played by that player. Sustain Damage", expansion: "pok" },
    breakthrough: {
      name: "Void Tether",
      text: "When you activate a system that contains or is adjacent to a unit or planet you control, you may place or move 1 of your void tether tokens onto a border that system shares with another system; other players do not treat those systems as adjacent to each other unless you allow it.",
      expansion: "thundersedge",
      synergy: ["biotic","propulsion"],
    },
    promissory: [
      { name: "Dark Pact", text: "ACTION: Place this card face up in your play area. When you give a number of commodities to the Empyrean player equal to your maximum commodity value, you each gain 1 trade good. If you activate a system that contains 1 or more of the Empyrean player's units, return this card to the Empyrean player.", expansion: "pok" },
      { name: "Blood Pact", text: "ACTION: Place this card face up in your play area. When you and the Empyrean player cast votes for the same outcome, cast 4 additional votes for that outcome. If you activate a system that contains 1 or more of the Empyrean player's units, return this card to the Empyrean player.", expansion: "pok" },
    ],
    factionTech: [
      {
        name: "Aetherstream",
        text: "After you or one of your neighbors activates a system that is adjacent to an anomaly, you may apply +1 to the move value of all of that player's ships during this tactical action.",
        expansion: "pok",
      },
      {
        name: "Voidwatch",
        text: "After a player moves ships into a system that contains 1 or more of your units, they must give you 1 promissory note from their hand, if able.",
        expansion: "pok",
      },
    ],
    faq: [
      {
        text: "Q: When a player gives you their commodities and triggers Dark Pact, do you gain all the trade goods simultaneously or the Dark Pact TG separately? (For the purposes of Pillage) A: It is a single gain of commodities and 1 TG simultaneously.",
      },
      {
        text: "Q:: Can the Empyrean flagship be used to repair the same ship, multiple times in the same combat round? Can it spend a 4 influence planet to use the ability twice? A: The Dynamo’s ability can be used multiple times in the same combat round by spending 2 influence, individually, each time. However, the same unit could not use its Sustain Damage ability multiple times during the same timing window. ru:Возвышенные Category:Factions",
      },
    ],
  },
  {
    id: "mahact",
    name: "The Mahact Gene-Sorcerers",
    shortName: "Mahact",
    expansion: "pok",
    difficulty: "High",
    color: "Yellow, Purple",
    symbol: "https://static.wikia.nocookie.net/twilight-imperium-4/images/2/2f/MahactSymbolSquare.png",
    commodities: 3,
    homePlanets: [
      "Ixth: 3/5",
    ],
    startingUnits: [
      "1 Dreadnought",
      "1 Carrier",
      "1 Cruiser",
      "2 Fighters",
      "3 Infantry",
      "1 Space Dock",
    ],
    startingTech: [
      "Bio-Stims",
      "Predictive Intelligence",
    ],
    abilities: [
      { name: "EDICT", text: "When you win a combat, place 1 command token from your opponent's reinforcements in your fleet pool if it does not already contain 1 of that player's tokens; other player's tokens in your fleet pool increase your fleet limit but cannot be redistributed." },
      { name: "IMPERIA", text: "While another player's command token is in your fleet pool, you can use the ability of that player's commander, if it is unlocked." },
      { name: "HUBRIS", text: "During setup, purge your \"Alliance\" promissory note. Other players cannot give you their \"Alliance\" promissory note." },
    ],
    leaders: [
      {
        role: "Agent",
        name: "Jae Mir Kan",
        unlock: "At Game Start",
        ability: "When you would spend a command token during the secondary ability of a strategic action: You may exhaust this card to remove 1 of the active player's command tokens from the board and use it instead.",
        expansion: "pok",
      },
      {
        role: "Commander",
        name: "Il Na Viroset",
        unlock: "Have 2 other factions' command tokens in your fleet pool.",
        ability: "During your tactical actions, you can activate systems that contain your command tokens. If you do, return both command tokens to your reinforcements and end your turn.",
        expansion: "pok",
      },
      {
        role: "Hero",
        name: "Airo Shir Aur",
        unlock: "Have 3 Scored Objectives",
        ability: "BENEDICTION ACTION: Move all units in the space area of any system to an adjacent system that contains a different player's ships. Space Combat is resolved in that system; neither player can retreat or resolve abilities that would move their ships. Then, purge this card.",
        expansion: "pok",
      },
    ],
    flagship: {
      name: "Arvicon Rex",
      cost: "8",
      combat: "5 (x2)",
      move: "1",
      capacity: "3",
      text: "Sustain Damage During combat against an opponent whose command token is not in your fleet pool, apply +2 to the results of this unit's combat rolls.",
    },
    mech: { name: "Starlancer", text: "After a player whose command token is in your fleet pool activates this system, you may spend their token from your fleet pool to end their turn; they gain that token. Sustain Damage", expansion: "pok" },
    breakthrough: {
      name: "Vaults of the Heir",
      text: "ACTION: Exhaust this card and purge 1 of your technologies to gain 1 relic.",
      expansion: "thundersedge",
      synergy: ["cybernetic","biotic"],
    },
    promissory: [
      { name: "Scepter of Dominion", text: "At the start of the strategy phase: Choose 1 non-home system that contains your units; each other player who has a token on the Mahact player's command sheet places a token from their reinforcements in that system. Then, return this card to the Mahact player.", expansion: "pok" },
    ],
    factionTech: [
      {
        name: "Genetic Recombination",
        text: "You may exhaust this card before a player casts votes; that player must cast at least 1 vote for an outcome of your choice or remove 1 token from their fleet pool and return it to their reinforcements.",
        expansion: "pok",
      },
    ],
    uniqueUnits: [
      {
        name: "Crimson Legionnaire I",
        cost: "1x2",
        combat: "8",
        text: "After this unit is destroyed, gain 1 commodity or convert 1 of your commodities to a trade good.",
      },
      {
        name: "Crimson Legionnaire II",
        cost: "1x2",
        combat: "7",
        text: "After this unit is destroyed, gain 1 commodity or convert 1 of your commodities to a trade good. Then, place the unit on this card. At the start of your next turn, place each unit that is on this card on a planet you control in your home system.",
      },
    ],
    faq: [
      {
        text: "Q: Can you use the Mahact Agent, Jae Mir Kan, to place a token using the secondary of the Construction Strategy Card without placing a structure A: The system that you place a token in must have an eligible planet for you to put a structure on.",
      },
      {
        text: "Q: If the Mahact player has a token where they want to place a structure using another player's token, does the other player's token go in the system or to their reinforcements? A: The other players token is still placed in the system.",
      },
      {
        text: "Q: In regards to the Mahact Commander, Il Na Viroset, when does your turn end? Do you resolve when/after you activate a system abilities? Is this different from Nullification Field or Starlancer? Can you resolve end of your turn abilities? A: Contrary to a previous Twitter ruling, when/after you activate and other abilities within your turn cannot be used when the Mahact player places a second token in a system. End of turn abilities can still be used. Any ability that ends your turn should be treated as ending your turn when they occur, and no further abilities during that same trigger window can take place.",
      },
      {
        text: "Q: What's the interaction with the Mahact Commander, Il Na Viroset, and the Counterstroke action card? A: Counterstroke cannot be played.",
      },
      {
        text: "Q: Does Dark Energy Tap trigger if you used the Mahact Commander, Il Na Viroset? A: No.",
      },
      {
        text: "Q: Do ships roll when moving out of a gravity rift due to the Mahact Hero, Benediction? A: Yes.",
      },
      {
        text: "Q: When the Mahact hero, Benediction, is used who is considered the attacker and who is the defender? For ability purposes, is the combat system considered “The Active System”? A: The ships being moved belong to the \"attacker\" and the ships not being moved belong to the \"defender.” The combat system is treated as the active system during that combat.",
      },
      {
        text: "Q: When using the Mahact Hero, Benediction, is capacity resolved after moving ships before the space combat? (Only relevant if moving fighters away from a space dock) A: A Capacity check is resolved before the space combat begins.",
      },
      {
        text: "Q: When using the Mahact Hero, Benediction, can the Mahact player transport other players' ground forces from planets? Can the units’ owner transport ground forces from planets? A: No in both circumstances.",
      },
      {
        text: "Q: When using the Mahact Hero, Benediction, can the Mahact player transport their own ground forces from planets when moving? A: Yes.",
      },
      {
        text: "Q: When using the Mahact Hero, Benediction, if another player's fleet is moved into a Mahact fleet, who is the attacker/defender? A: The player that is moved is the attacker, the player that is moved into is the defender.",
      },
      {
        text: "Q: Can Mahact use their mech ability on themselves? A: Yes.",
      },
      {
        text: "Q: If you are the Mahact player, what happens when an agenda tells you to “remove one of your command tokens from your fleet pool and return it to your reinforcements” but you only have tokens from other players in your fleet pool? A: You are required to remove another player’s token and return it to that player’s reinforcements.",
      },
      {
        text: "Q: If the law Fleet Regulations is in play, and Mahact already has 4 tokens in fleet, can they add another one and then discard one via Edict, or can they NOT add one after a combat win because of the “cannot” in Fleet Regulations? A: The Mahact player can add a 5th token and choose one to return to their reinforcements from their fleet pool afterward.",
      },
      {
        text: "Q: Can a player with 0 votes be targeted by Genetic Recombination? It is theoretically possible for someone to receive abilities via transaction to allow them to vote after the timing window of Genetic Recombination. Is there a defined difference between “cannot vote” and “currently has no votes” for the purposes of this technology? A: Genetic Recombination happens before a player would exhaust planets to vote. So if a player cannot vote, or does not have votes to cast, they cannot be targeted by the tech. If they obtain an ability that would allow them to vote, they could be targeted by the tech before the votes are cast.",
      },
      {
        text: "Q: If Mahact has an Arborec Command Token in their fleet pool, after another player activates an appropriate system that does not already contain a Mahact Mech, can the Mahact player produce a mech and then trigger that mech's ability to end a player’s turn? A: No, the mech was not in the system at the time of activation, so it didn't see the trigger for its ability.",
      },
      {
        text: "Q: If Mahact is in an Alliance game does their ally gain access to Il Na Viroset, the Mahact commander? A: No, Mahact has a special Alliance card that requires their ally to put a Command Token into the Mahact Player's fleet pool. So Mahact gains access to their ally's commander, but their ally does not gain access to the Mahact Commander. \"During setup, you must place one of your command tokens in the Mahact player’s fleet pool; this token cannot be discarded or spent.\". ru:Генные Чародеи Мэхакт Category:Factions",
      },
    ],
  },
  {
    id: "naazrokha",
    name: "The Naaz-Rokha Alliance",
    shortName: "Naaz-Rokha",
    expansion: "pok",
    difficulty: "Low",
    color: "Green",
    symbol: "https://static.wikia.nocookie.net/twilight-imperium-4/images/3/3b/NaazRokhaSymbolSquare.png",
    commodities: 3,
    homePlanets: [
      "Naazir: 2/1",
      "Rokha: 1/2",
    ],
    startingUnits: [
      "2 Carriers",
      "1 Destroyer",
      "2 Fighters",
      "1 Mech",
      "3 Infantry",
      "1 Space Dock",
    ],
    startingTech: [
      "Psychoarchaeology",
      "AI Development Algorithm",
    ],
    abilities: [
      { name: "DISTANT SUNS", text: "When you explore a planet that contains 1 of your mechs, you may draw 1 additional card; choose 1 to resolve and discard the rest." },
      { name: "FABRICATION", text: "ACTION: Either purge 2 of your relic fragments of the same type to gain 1 relic; or purge 1 of your relic fragments to gain 1 command token." },
    ],
    leaders: [
      {
        role: "Agent",
        name: "Garv and Gunn",
        unlock: "At Game Start",
        ability: "At the end of a player's turn: You may exhaust this card to allow that player to explore 1 of their planets.",
        expansion: "pok",
      },
      {
        role: "Commander",
        name: "Dart and Tai",
        unlock: "Have 3 mechs in 3 systems",
        ability: "After you gain control of a planet that was controlled by another player: You may explore that planet.",
        expansion: "pok",
      },
      {
        role: "Hero",
        name: "Hesh and Prit",
        unlock: "Have 3 Scored Objectives",
        ability: "PERFECT SYNTHESIS ACTION: Gain 1 relic and perform the secondary ability of up to 2 readied or unchosen strategy cards; during this action, spend command tokens from your reinforcements instead of your strategy pool. Then, purge this card.",
        expansion: "pok",
      },
    ],
    flagship: {
      name: "Visz el Vir",
      cost: "8",
      combat: "9 (x2)",
      move: "1",
      capacity: "4",
      text: "Sustain Damage Your mechs in this system roll 1 additional die during combat.",
    },
    mech: { name: "Eidolon", text: "If this unit is in the space area of the active system at the start of a space combat, flip this card. Sustain Damage (This card begins the game with this side face up)", expansion: "pok" },
    breakthrough: {
      name: "Absolute Synergy",
      text: "When you have 4 mechs in the same system, you may return 3 of those mechs to your reinforcements to flip this card and place it on top of your mech card.",
      expansion: "thundersedge",
      synergy: ["biotic","propulsion"],
    },
    promissory: [
      { name: "Black Market Forgery", text: "ACTION: Purge 2 of your relic fragments of the same type to gain 1 relic. Then, return this card to the Naaz-Rokha player.", expansion: "pok" },
    ],
    factionTech: [
      {
        name: "Supercharge",
        text: "At the start of a combat round, you may exhaust this card to apply +1 to the result of each of your unit's combat rolls during this combat round.",
        expansion: "pok",
      },
      {
        name: "Pre-Fab Arcologies",
        text: "After you explore a planet, ready that planet.",
        expansion: "pok",
      },
    ],
    faq: [
      {
        text: "Q: Can the Naaz-Rohka hero, Hesh and Prit, be used when the player has no tokens in reinforcements? A: The LRR will be updated to be more general towards taking off sheet if none are in reinforcements. This change should cover other requirements in this regard as well.",
      },
      {
        text: "Q: Can you purge a relic fragment to gain a command token if you have no command tokens in your reinforcements? A: Yes, you can purge the fragment and not gain a command token if there are none in reinforcements.",
      },
      {
        text: "Q: For the Naaz-Rokha’s Distant Suns ability, do you decide to draw the extra exploration card before you draw the first card, or after? A: Before the initial exploration card is drawn.",
      },
      {
        text: "Q: Does the Mech “Z Grav Eidolon” count against fleet supply? A: No, because this unit is also transported.",
      },
    ],
  },
  {
    id: "nomad",
    name: "The Nomad",
    shortName: "Nomad",
    expansion: "pok",
    difficulty: "Low",
    color: "Blue, Purple",
    symbol: "https://static.wikia.nocookie.net/twilight-imperium-4/images/5/5e/NomadFactionSheet.png",
    commodities: 4,
    homePlanets: [
      "Arcturus: 4/4",
    ],
    startingUnits: [
      "1 Flagship",
      "1 Carrier",
      "1 Destroyer",
      "3 Fighters",
      "4 Infantry",
      "1 Space Dock",
    ],
    startingTech: [
      "Sling Relay",
    ],
    abilities: [
      { name: "THE COMPANY", text: "During setup, take the 2 additional Nomad faction agents and place them next to your faction sheet; you have 3 agents." },
      { name: "FUTURE SIGHT", text: "During the Agenda phase, after an outcome that you voted for or predicted is resolved, gain 1 trade good." },
    ],
    leaders: [
      {
        role: "Agent",
        name: "Artuno the Betrayer",
        unlock: "At Game Start",
        ability: "When you gain trade goods from the supply: You may exhaust this card to place an equal number of trade goods on this card. When this card readies, gain the trade goods on this card.",
        expansion: "pok",
      },
      {
        role: "Agent",
        name: "Field Marshal Mercer",
        unlock: "At Game Start",
        ability: "At the end of a player's turn: You may exhaust this card to allow that player to remove up to 2 of their ground forces from the game board and place them on planets they control in the active system.",
        expansion: "pok",
      },
      {
        role: "Agent",
        name: "The Thundarian",
        unlock: "At Game Start",
        ability: "After the \"Roll Dice\" step of combat: You may exhaust this card. If you do, hits are not assigned to either players' units. Return to the start of this combat round's \"Roll Dice\" step.",
        expansion: "pok",
      },
      {
        role: "Commander",
        name: "Navarch Feng",
        unlock: "Have 1 scored secret objective",
        ability: "You can produce your flagship without spending resources.",
        expansion: "pok",
      },
      {
        role: "Hero",
        name: "Ahk-Syl Siven",
        unlock: "Have 3 Scored Objectives",
        ability: "PROBABILITY MATRIX ACTION: Place this card near the game board; your flagship and units it transports can move out of systems that contain your command tokens during this game round. At the end of that game round, purge this card.",
        expansion: "pok",
      },
    ],
    flagship: {
      name: "Memoria",
      cost: "8",
      combat: "7 (x2)",
      move: "1",
      capacity: "3",
      text: "Sustain Damage Anti-Fighter Barrage 8 (x3) You may treat this unit as if it were adjacent to systems that contain one or more of your mechs.",
    },
    mech: { name: "Quantum Manipulator", text: "While this unit is in a space area during combat, you may use its SUSTAIN DAMAGE ability to cancel a hit that is produced against your ships in this system. Sustain Damage", expansion: "pok" },
    breakthrough: {
      name: "Thunder's Paradox",
      text: "At the start of any player's turn, you may exhaust 1 of your agents to ready any other agent.",
      expansion: "thundersedge",
      synergy: ["cybernetic","biotic"],
    },
    promissory: [
      { name: "The Cavalry", text: "At the start of a space combat against a player other than the Nomad: During this combat, treat 1 of your non-fighter ships as if it has the SUSTAIN DAMAGE ability, combat value, and ANTI-FIGHTER BARRAGE value of the Nomad's flagship. Return this card to the Nomad player at the end of this combat.", expansion: "pok" },
    ],
    factionTech: [
      {
        name: "Temporal Command Suite",
        text: "After any player's agent becomes exhausted, you may exhaust this card to ready that agent; if you ready another player's agent, you may perform a transaction with that player.",
        expansion: "pok",
      },
    ],
    faq: [
      {
        text: "Q: Does the Duranium Armor technology allow you to repair Nomad Mechs that have used their ability to cancel a hit during space combat? A: No, Duranium Armor only affects units participating (rolling dice) in a combat.",
      },
      {
        text: "Q: Does Nomad’s Temporal Command Suite faction technology bypass transaction limits? A: Yes, Temporal Command Suite’s transaction does not affect performing a second transaction with the same player that turn.",
      },
      {
        text: "Q: Does the Nomad’s Hero, Ahk-Syl Siven, allow their flagship to pick up ground forces in systems that contain their tokens? A: Yes.",
      },
    ],
  },
  {
    id: "titans",
    name: "The Titans of Ul",
    shortName: "Titans",
    expansion: "pok",
    difficulty: "Medium",
    color: "Pink",
    symbol: "https://static.wikia.nocookie.net/twilight-imperium-4/images/6/6d/UlFactionSymbol.png",
    commodities: 2,
    homePlanets: [
      "Elysium: 4/1",
    ],
    startingUnits: [
      "1 Dreadnought",
      "2 Cruisers",
      "2 Fighters",
      "3 Infantry",
      "1 Space Dock",
    ],
    startingTech: [
      "Antimass Deflectors",
      "Scanlink Drone Network",
    ],
    abilities: [
      { name: "TERRAGENESIS", text: "After you explore a planet that does not have a sleeper token, you may place or move 1 sleeper token onto that planet." },
      { name: "AWAKEN", text: "After you activate a system that contains 1 or more of your sleeper tokens, you may replace each of those tokens with 1 PDS from your reinforcements." },
      { name: "COALESCENCE", text: "If your flagship or your AWAKEN faction ability places your units into the same space area or onto the same planet as another player's units, your units must participate in combat during \"Space Combat\" or \"Ground Combat\" steps." },
    ],
    leaders: [
      {
        role: "Agent",
        name: "Tellurian",
        unlock: "At Game Start",
        ability: "When a hit is produced against a unit: You may exhaust this card to cancel that hit.",
        expansion: "pok",
      },
      {
        role: "Commander",
        name: "Tungstantus",
        unlock: "Have 5 structures on the game board",
        ability: "When 1 or more of your units use PRODUCTION: You may gain 1 trade good.",
        expansion: "pok",
      },
      {
        role: "Hero",
        name: "Ul The Progenitor",
        unlock: "Have 3 Scored Objectives",
        ability: "GEOFORM ACTION: Ready Elysium and attach this card to it. Its resource and influence values are each increased by 3, and it gains the SPACE CANNON 5 (x3) ability as if it were a unit.",
        expansion: "pok",
      },
    ],
    flagship: {
      name: "Ouranos",
      cost: "8",
      combat: "7 (x2)",
      move: "1",
      capacity: "3",
      text: "Sustain Damage DEPLOY: After you activate a system that contains 1 or more of your PDS, you may replace 1 of those PDS with this unit.",
    },
    mech: { name: "Hecatoncheires", text: "DEPLOY: When you would place a PDS on a planet, you may place 1 mech and 1 infantry on that planet instead. Sustain Damage", expansion: "pok" },
    breakthrough: {
      name: "Slumberstate Computing",
      text: "When COALESCENCE results in a ground combat, if you commit no other units, you may choose for your units to coexist instead. During the status phase, for each player you are coexisting with, you and that player each draw 1 additional action card. Other players may allow you to place a sleeper token on a planet they control.",
      expansion: "thundersedge",
      synergy: ["cybernetic","biotic"],
    },
    promissory: [
      { name: "Terraform", text: "ACTION: Attach this card to a non-home planet you control other than Mecatol Rex. Its resource and influence values are each increased by 1 and it is treated as having all 3 planet traits (Cultural, Hazardous, and Industrial).", expansion: "pok" },
    ],
    uniqueUnits: [
      {
        name: "Saturn Engine I",
        cost: "2",
        combat: "7",
        text: "2",
        prerequisites: "1",
      },
      {
        name: "Saturn Engine II",
        cost: "2",
        combat: "6",
        text: "3",
        prerequisites: "2",
      },
      {
        name: "Hel‑Titan&nbsp;I",
        cost: "7",
        combat: "Planetary Shield Space Cannon 6 Sustain Damage Production 1 This unit is treated as both a structure and a ground force. It cannot be transported.",
        text: "None",
      },
      {
        name: "Hel‑Titan&nbsp;II",
        cost: "6",
        combat: "Planetary Shield Space Cannon 5 Sustain Damage Production 1 This unit is treated as both a structure and a ground force. It cannot be transported. You may use this unit's SPACE CANNON against ships that are adjacent to this unit's system.",
      },
    ],
    faq: [
      {
        text: "Q: Hel Titans cannot be transported but can they be moved by use of the technology Transit Diodes? A: Since Transit Diodes uses the terms \"remove\" and \"place\" it may be used to move Hel Titans.",
      },
      {
        text: "Q: Can Hel Titans be destroyed by Bombardment? A: Since Hel Titans are treated as ground forces, they may be bombarded; provided the player bombarding has a unit or ability that is capable of bypassing their Planetary Shield ability.",
      },
      {
        text: "Q: If you awaken a sleeper token or deploy your flagship and then your turn ends (Mahact mech, Nullification field, Minister of Peace), do you resolve combat? A: Coalescence forces combat steps to occur. No other steps of the tactical action occur, and abilities can only be used within combat.",
      },
      {
        text: "Q: If Titans of Ul have their commander, Tungstantus, unlocked and have 2 TGs and go to production to gain a third and build a carrier, is that TG able to be pillaged? A: The gain and spend are simultaneous, so cannot be pillaged",
      },
      {
        text: "Q: Does the Titans of Ul promissory note “Terraform” count for the purposes of objectives like “Strengthen Bonds” or “Betray a Friend”? A: Yes, when Terraform is attached to a planet it counts as being in that planet owner’s play area",
      },
      {
        text: "Q: Does LRR 74.5 (2 PDS on a planet max) mean that Titans couldn't commit Hel-Titans using the Sardakk commander, or place a PDS via Sleeper token onto a planet where another player already has 2 PDS? Related, if a planet has 2 PDS on it already can you DEPLOY the Titan’s mech there, given that the mech is \"when you would place a PDS\"? A: LRR 74.5 does not prevent Titans from deploying a PDS. You cannot place a structure on a planet with the maximum number of your structures, which prevents using the DEPLOY ability on a planet with 2 PDS, or placing more PDS than would be allowed using Transit Diodes. You also cannot DEPLOY a mech if you have no PDS in reinforcements, but could remove a PDS from the board and then DEPLOY your mech.",
      },
      {
        text: "Q: If the Titans Agent is used to cancel the only hit “when” it is generated against a player that has Valkyrie Particle Weave as a technology, does VPW trigger? A: The Titan’s Agent will receive an errata to have the same timing as Shields Holding or Sustain Damage. “Before you assign a hit”. The hit is still produced, VPW triggers, then the hit is canceled.",
      },
      {
        text: "Q: Can the Titans Hel-Titan move via abilities like the action card Ghost Squad or via the Sardakk N’orr Alliance? A: No, structures cannot move",
      },
      {
        text: "Q: Does the Geoform ability of Ul the progenitor count as an attachment for the purpose of the objective \"Reclaim ancient monuments\"? A: Yes",
      },
      {
        text: "Q: Does Slumberstate Computing breakthrough allow me to put sleeper token on planets controlled by players who aren't my neighbor? A: The Ul player does not have to be neighbors with the player that agrees to have a sleeper token placed on their planet.",
        requires: ["thundersedge"],
      },
    ],
  },
  {
    id: "vuilraith",
    name: "The Vuil'Raith Cabal",
    shortName: "Vuil'raith",
    expansion: "pok",
    difficulty: "High",
    color: "Red",
    symbol: "https://static.wikia.nocookie.net/twilight-imperium-4/images/0/04/CabalFactionSymbol.png",
    commodities: 2,
    homePlanets: [
      "Acheron: 4/0",
    ],
    startingUnits: [
      "1 Dreadnought",
      "1 Carrier",
      "1 Cruiser",
      "3 Fighters",
      "3 Infantry",
      "1 Space Dock",
    ],
    startingTech: [
      "Self Assembly Routines",
    ],
    abilities: [
      { name: "DEVOUR", text: "Capture your opponent's non-structure units that are destroyed during combat." },
      { name: "AMALGAMATION", text: "When you produce a unit, you may return 1 captured unit of that type to produce that unit without spending resources." },
      { name: "RIFTMELD", text: "When you research a unit upgrade technology, you may return 1 captured unit of that type to ignore all of the technology's prerequisites." },
    ],
    leaders: [
      {
        role: "Agent",
        name: "The Stillness of Stars",
        unlock: "At Game Start",
        ability: "After another player replenishes commodities: You may exhaust this card to convert their commodities to trade goods and capture 1 unit from their reinforcements that has a cost equal to or lower than their commodity value.",
        expansion: "pok",
      },
      {
        role: "Commander",
        name: "That Which Molds Flesh",
        unlock: "Have units in 3 Gravity Rifts",
        ability: "When you produce fighter or infantry units: Up to 2 of those units do not count against your PRODUCTION limit.",
        expansion: "pok",
      },
      {
        role: "Hero",
        name: "It Feeds on Carrion",
        unlock: "Have 3 Scored Objectives",
        ability: "DIMENSIONAL ANCHOR ACTION: Each other player rolls a die for each of their non-fighter ships that are in or adjacent to a system that contains a dimensional tear; on a 1-3, capture that unit. If this causes a player's ground forces or fighters to be removed, also capture those units. Then, purge this card.",
        expansion: "pok",
      },
    ],
    flagship: {
      name: "The Terror Between",
      cost: "8",
      combat: "5 (x2)",
      move: "1",
      capacity: "3",
      text: "Sustain Damage Bombardment 5 Capture all other non-structure units that are destroyed in this system, including your own.",
    },
    mech: { name: "Reanimator", text: "When your infantry on this planet are destroyed, place them on your faction sheet; those units are captured. Sustain Damage", expansion: "pok" },
    breakthrough: {
      name: "Al'Raith Ix Ianovar",
      text: "This breakthrough causes The Fracture to enter play without a roll, if it is not already in play. After this card enters play, move up to 2 ingress tokens into systems that contain gravity rifts. Apply +1 to the Move value of each of your ships that start their movement in The Fracture.",
      expansion: "thundersedge",
      synergy: ["warfare","biotic"],
    },
    promissory: [
      { name: "Crucible", text: "After you activate a system: Your ships do not roll for gravity rifts during this movement; apply an additional +1 to the move values of your ships that would move out of or through a gravity rift instead. Then, return this card to the Vuil'raith player.", expansion: "pok" },
    ],
    factionTech: [
      {
        name: "Vortex",
        text: "ACTION: Exhaust this card to choose another player's non-structure unit in a system that is adjacent to 1 or more of your space docks. Capture 1 unit of that type from that player's reinforcements",
        expansion: "pok",
      },
    ],
    uniqueUnits: [
      {
        name: "Dimensional Tear I",
        cost: "5",
        combat: "This system is a gravity rift; your ships do not roll for this gravity rift. Place a dimensional tear token beneath this unit as a reminder. Up to 6 fighters in this system do not count against your ships' capacity.",
        text: "None",
      },
      {
        name: "Dimensional Tear II",
        cost: "7",
        combat: "This system is a gravity rift; your ships do not roll for this gravity rift. Place a dimensional tear token beneath this unit as a reminder. Up to 12 fighters in this system do not count against your ships' capacity.",
      },
    ],
    faq: [
      {
        text: "Q: Can Vortex be used on a ship if a player doesn't have any of those ships in their reinforcements? A: No, since they cannot fully resolve Vortex",
      },
      {
        text: "Q: Are systems that contain Vuil’raith Cabal’s Dimensional Tears anomalies? A: Yes, any game effect that references an anomaly includes systems containing Dimensional Tears",
      },
      {
        text: "Q: Can the Vuil’raith Cabal use their agent on someone who has their Trade Agreement used to take their commodities? A: Yes, the commodities would not be there but the agent could still be used to capture a ship up to the player’s commodity value.",
      },
      {
        text: "Q: Does the Cabal Flagship capture other units that are destroyed in the same timing window in which it is destroyed? A: Yes",
      },
      {
        text: "Q: What happens to captured units when the owner is eliminated? A: Captured units remain on the sheet of the player that captured them. If they would ever be returned to the eliminated player, they are returned to the game box instead",
      },
      {
        text: "Q: Can a ship benefit from the Vuil'raith Cabal promissory note, The Crucible, if it would not be able to reach a gravity rift on the way to the active system without it? A: Yes, once a system has been activated and The Crucible has been played, the bonus would apply to all ships that can make it to the active system, including the bonuses from the promissory and the rift they are passing through.",
      },
      {
        text: "Q: Does Cabal Agent count as \"converting your own commodities,\" or is the Cabal player converting them for the purpose of Pillage? A: No, whenever commodities are converted to a player’s own trade good area, they are not considered gained",
      },
      {
        text: "Q: Does Cabal Commander apply to units being producing outside of production ability (e.g. Sling relay, Integrated economy or Freelancer exploration)? A: No, production limit isn't a thing for abilities that produce directly - only for production unit ability ([https://discord.com/channels/409044671508250625/539917752022990858/1171964148658208789 link] to Dane message in [https://discord.gg/ZCQmMjkj SCPT discord community]) ru:Кабал Вуил'Райт Category:Factions",
      },
    ],
  },
  {
    id: "keleres",
    name: "The Council Keleres",
    shortName: "Keleres",
    expansion: "codex3",
    difficulty: "Medium",
    color: "Purple, blue, yellow",
    symbol: "https://static.wikia.nocookie.net/twilight-imperium-4/images/8/86/KeleresFactionSymbol.png",
    commodities: 2,
    homePlanets: [
      "Dependent on Tribunii faction choice, may be one of three options below:",
      "Moll Primus: 4/1",
      "OR",
      "Archon Ren: 2/3",
      "Archon Tau: 1/1",
      "OR",
      "Valk: 2/0",
      "Avar: 1/1",
      "Ylir: 0/2",
    ],
    startingUnits: [
      "2 Carriers",
      "1 Cruiser",
      "2 Fighters",
      "2 Infantry",
      "1 Space Dock",
    ],
    startingTech: [
      "Choose 2 non-faction technologies owned by other players.",
    ],
    abilities: [
      { name: "THE TRIBUNII", text: "During setup, choose an unplayed faction from among the Mentak, the Xxcha and The Argent Flight; take that faction's home system, command tokens and control markers. Additionally, take the Keleres Hero that corresponds to that faction." },
      { name: "COUNCIL PATRONAGE", text: "Replenish your commodities at the start of the strategy phase, then gain 1 trade good." },
      { name: "LAW'S ORDER", text: "You may spend 1 influence at the start of your turn to treat all laws as blank until the end of your turn." },
      { name: "THE TRIBUNII Ω", text: "Ω : During setup, choose a Keleres hero that corresponds to an unused faction; take that faction's home system, command tokens and control tokens. The unchosen Keleres heroes are not used." },
      { name: "LAW'S ORDER Ω", text: "You may spend 1 trade good or 1 commodity at the start of any player's turn to treat all laws as blank until the end of that turn." },
    ],
    leaders: [
      {
        role: "Agent",
        name: "Xander Alexin Victori III",
        unlock: "At Game Start",
        ability: "At any time: You may exhaust this card to allow any player to spend commodities as if they were trade goods",
        expansion: "pok",
      },
      {
        role: "Commander",
        name: "Suffi An",
        unlock: "Spend 1 trade good after you play an action card that has a component action",
        ability: "After you perform a component action: You may perform an additional action.",
        expansion: "pok",
      },
      {
        role: "Commander",
        name: "Hero If Argent Flight Chosen for Tribunii",
        unlock: "Spend 1 trade good after you play an action card that has a component action",
        ability: "",
        expansion: "codex3",
      },
      {
        role: "Commander",
        name: "Kuuasi Aun Jalatai",
        unlock: "Spend 1 trade good after you play an action card that has a component action",
        ability: "OVERWING ZETA At the start of a round of space combat in a system that contains a planet you control: Place your flagship and any combination of up to 2 cruisers or destroyers from your reinforcements in the active system. Then, purge this card.",
        expansion: "thundersedge",
      },
      {
        role: "Commander",
        name: "Hero If Xxcha Chosen for Tribunii",
        unlock: "Spend 1 trade good after you play an action card that has a component action",
        ability: "",
        expansion: "codex3",
      },
      {
        role: "Commander",
        name: "Odlynn Myrr",
        unlock: "Spend 1 trade good after you play an action card that has a component action",
        ability: "OPERATION ARCHON After an agenda is revealed: You may cast up to 6 additional votes on this agenda. Predict aloud an outcome for this agenda. For each player that abstains or votes for another outcome, gain 1 trade good and 1 command token. Then, purge this card.",
        expansion: "thundersedge",
      },
      {
        role: "Commander",
        name: "Hero If Mentak Chosen for Tribunii",
        unlock: "Spend 1 trade good after you play an action card that has a component action",
        ability: "",
        expansion: "pok",
      },
    ],
    flagship: {
      name: "Artemiris",
      cost: "8",
      combat: "7 (x2)",
      move: "1",
      capacity: "6",
      text: "Sustain Damage Other players must spend 2 influence to activate the system that contains this ship.",
    },
    mech: { name: "Omniopiares", text: "Other players must spend 1 influence to commit ground forces to the planet that contains this unit. Sustain Damage", expansion: "pok" },
    breakthrough: {
      name: "I.I.H.Q. Modernization",
      text: "When you gain this card, gain the Custodia Vigilia planet card and its legendary planet ability card. You are neighbors with all players that have units or control planets in or adjacent to the Mecatol Rex system.",
      expansion: "thundersedge",
      synergy: ["cybernetic","biotic"],
    },
    promissory: [
      { name: "Keleres Rider", text: "After an agenda is revealed: You cannot vote on this agenda. Predict aloud an outcome of this agenda. If your prediction is correct, draw 1 action card and gain 2 trade goods. Then, return this card to the Keleres player.", expansion: "codex3" },
    ],
    factionTech: [
      {
        name: "I.I.H.Q. Modernization",
        text: "You are neighbors with all players that have units or control planets in or adjacent to the Mecatol Rex system. Gain the Custodia Vigilia planet card and its legendary planet ability card. You cannot lose these cards, and this card cannot have an X or Y assimilator token placed on it.",
        expansion: "codex3",
      },
      {
        name: "Agency Supply Network",
        text: "Whenever you resolve one of your PRODUCTION abilities, you may resolve an additional one of your PRODUCTION abilities in any system; the additional use does not trigger this ability.",
        expansion: "codex3",
      },
      {
        name: "Executive Order",
        text: "ACTION: Exhaust this card and draw the top or bottom card of the agenda deck. Players immediately vote on this agenda as if you were the speaker; you can spend trade goods and resources on this agenda as if they were votes.",
        expansion: "thundersedge",
      },
      {
        name: "Agency Supply Network",
        text: "Once per action, when you resolve a unit's PRODUCTION ability, you may resolve another of your unit's PRODUCTION abilities in any system.",
        expansion: "thundersedge",
      },
    ],
    faq: [
      {
        text: "Q: Can the Keleres Hero ability \"Overwing Zeta\" be used during a combat in which you are not participating in? A: No, any non-agent “at the start of a combat” abilities must be played during a combat you are participating in.",
        requires: ["pok"],
      },
      {
        text: "Q: What is the duration of the Council Keleres agent, Xander Alexin Victori III? A: The agent is exhausted at the time the commodities would be spent as trade goods, and only lasts for the duration of that spend.",
        requires: ["pok"],
      },
      {
        text: "Q: What is the order of gaining starting technology when Winnu and/or Argent Flight are in a game with Council Keleres? What if there are not two unique starting technologies at the beginning of the game? A: Keleres selects after all other players have selected their starting technology. Keleres only gets one starting technology if there is only one other starting technology among all other factions at the table.",
        requires: ["pok"],
      },
      {
        text: "Q: Does Custodia Vigilia's PRODUCTION count as a unit for sarween tools, etc.? A: Yes, Custodia Vigilia should include “as if it were a unit”.",
      },
      {
        text: "Q: Does Custodia Vigilia count as a planet for objectives? Agendas? Do you gain it exhausted like a planet? Can it be terraformed (if yes, can it be explored)? Nano-Forged? Can units be placed on it? Can the Keleres player be eliminated with it in game? A: This planet is not on the game board, and does not exist in a system. It is gained exhausted. It counts as a planet for objectives and agendas if it meets the specific criteria of those objectives and agendas. Terraform can be placed on it (Nano-Forge cannot since it is a legendary planet), but their attachment tokens are not placed on the game board. It may be explored, however units cannot be placed on it. Keleres cannot be eliminated if they control Custodia Vigilia.",
        requires: ["codex2", "pok"],
      },
      {
        text: "Q: Does Custodia Vigilia give command tokens when a player scores public objectives off Imperial? A: No, the intent is that the tokens are only gained off of using Imperial’s ability to gain a Victory Point because you control Mecatol Rex.",
      },
      {
        text: "Q: How does the influence payment for the Council Keleres mech, Omniopiares, stack in multiples? Each a separate payment? A: Each mech is one instance of spend one influence.",
        requires: ["pok"],
      },
      {
        text: "Q: With Agency Supply Network, can you use it on the same unit? Does it trigger Sarween Tools each time? Can you use it on a second dock in a system for a separate use of Sarween? How about off of the Warfare secondary? Does it trigger a single unit's PRODUCTION, or an entire system's? A: No, the second PRODUCTION instance must be different than one of the units that used the ability to trigger Agency Supply Network. Yes, Sarween Tools would trigger with each instance of PRODUCTION (twice). PRODUCTION is all or nothing during tactical actions, so you couldn’t choose to only use one ability in a system to then use another one in the same system. However, Warfare would allow you to do this, since it specifically says one space dock, Agency Supply Network could be used to use PRODUCTION at a second unit in the same system.",
      },
      {
        text: "Q: How does the Council Keleres faction ability Law's Order interact with Minister of Peace/more than 2 PDS on a planet law? A: All agendas are treated as blank for all players for the duration of that Council Keleres player’s turn",
      },
    ],
  },
  {
    id: "crimson",
    name: "The Crimson Rebellion",
    shortName: "Crimson",
    expansion: "thundersedge",
    difficulty: "High",
    color: "Red",
    symbol: "https://static.wikia.nocookie.net/twilight-imperium-4/images/0/00/CrimsonFactionSymbol.png",
    commodities: 2,
    homePlanets: [
      "Ahk Creuxx: 4/2",
      "Epsilon Wormhole",
    ],
    startingUnits: [
      "1 Carrier",
      "2 Destroyers",
      "3 Fighters",
      "4 Infantry",
      "1 Space Dock",
      "1 PDS",
    ],
    startingTech: [
      "Choose one red or blue with no prerequisites",
    ],
    abilities: [
      { name: "SUNDERED", text: "You cannot use wormholes other than epsilon wormholes. Other players' units that move or are placed into your home system are destroyed." },
      { name: "INCURSION", text: "When you activate a system that contains a breach, you may flip that breach; systems that contain active breaches are adjacent. At the end of the status phase, any player with ships in a system that contain an active breach may remove that breach." },
      { name: "THE SORROW", text: "When you create the game board, place the Sorrow (tile 94) where your home system would normally be placed, then place a inactive breach there. The Sorrow is not a home system. Then, place your home system (tile 118) in your play area." },
    ],
    leaders: [
      {
        role: "Agent",
        name: "Ahk Ravin",
        unlock: "At Game Start",
        ability: "ACTION: Exhaust this card to choose 1 player. That player may swap the position of 2 of their ships in any systems; they may transport units when they swap.",
        expansion: "pok",
      },
      {
        role: "Commander",
        name: "Ahk Siever",
        unlock: "Place a breach token in a system that contains another player's unit.",
        ability: "At the end of a combat between any players: Gain 1 commodity or convert 1 of your commodities to a trade good.",
        expansion: "pok",
      },
      {
        role: "Hero",
        name: "Homesick Phantom",
        unlock: "Have 3 Scored Objectives",
        ability: "FRAGMENT REALITY When you produce ships: You may place any of those ships on this card. At the start of a space combat, you may purge this card to place all ships from this card into the active system.",
        expansion: "pok",
      },
    ],
    flagship: {
      name: "Quietus",
      cost: "8",
      combat: "5 (x2)",
      move: "1",
      capacity: "3",
      text: "Sustain Damage While this unit is in a system that contains an active breach, other players' units in systems with active breaches lose all their unit abilities.",
    },
    mech: { name: "Revenant", text: "DEPLOY: During the \"Commit Ground Forces\" step of your tactical action in a system that contains an active breach, you may commit 1 mech, even if you have no units in the system Sustain Damage", expansion: "pok" },
    breakthrough: {
      name: "Resonance Generator",
      text: "During your tactical actions, apply +1 to the move value of each of your ships that start in your home system or in a system that contains an active breach. ACTION: Exhaust this card to flip any breach or place an active breach in a non-home system that contains your units.",
      expansion: "thundersedge",
      synergy: ["propulsion","warfare"],
    },
    promissory: [
      { name: "Sever", text: "ACTION: Place this card faceup in your play area, and place the sever token in a system that contains your units; wormholes in that system have no effect during movement. Remove the sever token and return this card to the Rebellion player at end of the status phase.", expansion: "thundersedge" },
    ],
    factionTech: [
      {
        name: "Subatomic Splicer",
        text: "When one of your ships is destroyed, you may produce a ship of the same type at a space dock in your home system.",
        expansion: "thundersedge",
      },
    ],
    uniqueUnits: [
      {
        name: "Exile I",
        cost: "1",
        combat: "8",
        text: "2",
      },
      {
        name: "Exile II",
        cost: "1",
        combat: "7",
        text: "2",
      },
    ],
    faq: [
      {
        text: "Q: Can the Rebellion agent Ahk Ravin be used to swap a non-fighter ship with a fighter? A: Ahk Ravin does not specify non-fighter ship, so yes.",
        requires: ["pok"],
      },
      {
        text: "Q: Is there a Fracture roll at the start of any game with the Crimson Rebellion participating? A: Yes, in the Gather Starting Components step of setup, the Crimson Rebellion player GAINS their Breakthrough and as such there is a Fracture roll.",
      },
      {
        text: "Q: Can other factions besides the Crimson Rebellion use Epsilon Wormholes? A: Yes. Though as per the SUNDERED ability any other player's units that use the Epsilon wormhole to travel to the Crimson Rebellion Home System will be destroyed.",
      },
    ],
  },
  {
    id: "deepwrought",
    name: "The Deepwrought Scholarate",
    shortName: "Deepwrought",
    expansion: "thundersedge",
    difficulty: "Medium",
    symbol: "https://static.wikia.nocookie.net/twilight-imperium-4/images/8/83/DWSFactionSymbol.png",
    commodities: 3,
    homePlanets: [
      "Ikatena: 4/4",
    ],
    startingUnits: [
      "1 Dreadnought",
      "1 Carrier",
      "4 Fighters",
      "3 Infantry",
      "1 Space Dock",
    ],
    startingTech: [
      "During setup, research technology twice",
    ],
    abilities: [
      { name: "RESEARCH TEAM", text: "When ground forces are committed, if your units on the planet are not already coexisting, you may choose for your units to coexist." },
      { name: "OCEANBOUND", text: "When your units begin coexisting on a planet, gain an ocean card and ready it. Any time you have more ocean cards than there are planets that have your coexisting units, discard ocean cards until you do not." },
    ],
    leaders: [
      {
        role: "Agent",
        name: "Doctor Carrina",
        unlock: "At Game Start",
        ability: "When another player researches a technology: You may exhaust this card to allow that player to ignore 1 prerequisite; if they do, you may place 1 infantry from your reinforcements into coexistence on a non-home planet they control",
        expansion: "pok",
      },
      {
        role: "Commander",
        name: "Aello",
        unlock: "Have an ocean card in play.",
        ability: "When another player spends resources to research a technology: That player may reduce the cost by 1, if they do, gain 1 commodity or convert 1 of your commodities to a trade good.",
        expansion: "pok",
      },
      {
        role: "Hero",
        name: "Ta Zern",
        unlock: "Have 3 Scored Objectives",
        ability: "WAVE FUNCTION COLLAPSE ACTION: Purge this card and a non-unit upgrade technology you own or from your deck; then, purge all cards with the same name owned by other players and in other players' decks. Then, each player that purged a technology they owned researches another technology.",
        expansion: "pok",
      },
    ],
    flagship: {
      name: "D.W.S. Luminous",
      cost: "8",
      combat: "7 (x2)",
      move: "1",
      capacity: "6",
      text: "Sustain Damage This ship can move through systems that contain your units, even if other players' units are present: if it would, apply +1 to its move value for each of those systems.",
    },
    mech: { name: "Eanautic", text: "When another player activates this system, if this unit is coexisting, you may move it and any of your infantry on its planet to a planet you control in your home system. Sustain Damage Production 1", expansion: "pok" },
    breakthrough: {
      name: "Visionaria Select",
      text: "ACTION: Exhaust this card to allow each other player to spend 3 trade goods and give you 1 promissory note. Each player that does may research a non-faction, non-unit upgrade technology. You also gain each technology researched this way.",
      expansion: "thundersedge",
      synergy: ["cybernetic","biotic"],
    },
    promissory: [
      { name: "Share Knowledge", text: "ACTION: Place this card faceup in your play area and gain 1 non-faction, non-unit upgrade technology that the Deepwrought player owns; place that technology on this card. Return that technology to the deck and this card to the Deepwrought player at the end of the status phase.", expansion: "thundersedge" },
    ],
    factionTech: [
      {
        name: "Radical Advancement",
        text: "At the start of the status phase, you may replace one of your non-unit upgrade technologies with a technology of the same color that has exactly 1 more prerequisite.",
        expansion: "thundersedge",
      },
      {
        name: "Hydrothermal Mining",
        text: "At the start of the status phase, gain 1 trade good for each ocean card in play.",
        expansion: "thundersedge",
      },
    ],
    faq: [
      {
        text: "Q: Is the Deepwrought Commander, Aello, optional? A: No! Once it is unlocked, any player may use it, whether or not the Deepwrought player wants them to.",
        requires: ["pok"],
      },
      {
        text: "Q: If Deepwrought Scholarate is the controller of a planet and an opponent commits ground units to it, can Deepwrought trigger Research Team to avoid combat even though opponent wants to still initiate combat? A: Dane has ruled the answer to be yes, they can use research teams to avoid combat as long as they were not already coexisting. See SCPT episode 443 for this and other coexistence clarifications.",
      },
      {
        text: "Q: If a player has the Deepwrought Scholarate's alliance, can other players benefit from Commander Aello twice? A: Yes, and if Mahact is in the mix, the discount can apply thrice, as each player utilizing the commander ability composes a separate ability.",
        requires: ["pok"],
      },
      {
        text: "Q: If a planet of a player has no ground forces, can it be chosen by the Deepwrought agent so you gain control of it? A: No. You cannot trigger coexistence on a planet that does not have units on it. Category:Factions",
        requires: ["pok"],
      },
    ],
  },
  {
    id: "firmament",
    name: "The Firmament",
    shortName: "Firmament",
    expansion: "thundersedge",
    difficulty: "High",
    symbol: "https://static.wikia.nocookie.net/twilight-imperium-4/images/e/eb/FirmamentFactionSymbol.png",
    commodities: 3,
    homePlanets: [
      "Cronos: 2/1",
      "Tallin: 1/2",
    ],
    startingUnits: [
      "1 Carrier",
      "1 Cruiser",
      "1 Destroyer",
      "3 Fighters",
      "3 Infantry",
      "1 Space Dock",
    ],
    startingTech: [
      "Choose one green or yellow technology that has no pre-requisites.",
    ],
    abilities: [
      { name: "PLOTS WITHIN PLOTS", text: "You can score secret objectives already scored by other players, if you fulfill their requirements; This does not count against your secret objective limit or the number you can score in a round. When you score another player's secret objective do not score a victory point. Instead, place a face down plot card into your play area with that player's control token on it." },
      { name: "PUPPETS OF THE BLADE", text: "If you have at least one plot card in your play area, gain the following ability: ACTION: Purge the Firmaments faction sheet, leaders, planet card, and promissory note, then gain all of the faction components for The Obsidian." },
      { name: "NOCTURNE", text: "This faction cannot be chosen during setup." },
      { name: "THE BLADE'S ORCHESTRA", text: "When this faction comes into play, flip your home system, double sided faction components and all of your in-play plot cards. Then, ready Cronos Hollow and Tallin Hollow if you control them." },
      { name: "MARIONETTES", text: "The player or players whose control tokens are on each plot card are the puppeted players for that plot." },
    ],
    leaders: [
      {
        role: "Agent",
        name: "Myru Vos",
        unlock: "At Game Start",
        ability: "When a player moves ships: You may exhaust this card; if you do, SPACE CANNON cannot be used against those ships. If they are not transporting units, they can also move through other players' ships.",
        expansion: "pok",
      },
      {
        role: "Commander",
        name: "Captain Aroz",
        unlock: "Have one plot card in play.",
        ability: "You may treat planets in systems that contain your ships as if you controlled them for the purpose of scoring secret objectives.",
        expansion: "pok",
      },
      {
        role: "Hero",
        name: "Sharsiss",
        unlock: "Have 3 Scored Objectives",
        ability: "THE BLADE BECKONS ACTION: Place 1 of your plot cards in play with any other player's control token on it. Then, you may place any player's control token on 1 of your in-play plot cards; one plot cannot have two of the same player's tokens. Then, purge this card.",
        expansion: "pok",
      },
    ],
    flagship: {
      name: "Heaven's Eye",
      cost: "8",
      combat: "5 (x2)",
      move: "1",
      capacity: "3",
      text: "Sustain Damage If the Active System contains units that belong to a player who has a Control Token on one of your Plots, apply +1 to this ship's move value and repair it at the end of every Combat Round.",
    },
    mech: { name: "Viper EX-23", text: "When ground forces are committed to this planet, you may choose for your units to coexist, if they were not already. Flip this card if your faction becomes the Obsidian. Sustain Damage", expansion: "pok" },
    breakthrough: {
      name: "The Sowing",
      text: "When you gain this card and at the start of the status phase, you may place up to three of your trade goods on this card. Flip this card if you become The Obsidian faction.",
      expansion: "thundersedge",
      synergy: ["cybernetic","biotic"],
    },
    promissory: [
      { name: "Black Ops", text: "When you receive this card: If you are not The Firmament, the Firmament player may place 1 facedown plot card in their play area with your control token on it. Then, gain 2 command tokens, gain 2 trade goods, and purge this card.", expansion: "thundersedge" },
      { name: "Malevolency", text: "At the end of one of your tactical actions: Spend 1 Influence to give this card to 1 of your neighbors; you can use this ability even if you are The Obsidian player. At the end of the status phase, if you are not the Obsidian player, remove 1 command token from your fleet pool and return it to your reinforcements.", expansion: "thundersedge" },
    ],
    factionTech: [
      {
        name: "Plane Splitter",
        text: "When you gain this card, put The Fracture into play. Flip this card if the Obsidian faction is in play.",
        expansion: "thundersedge",
      },
      {
        name: "Neural Parasite",
        text: "At the start of the status phase, you may place 1 infantry from your reinforcements on a planet you control in your home system. Flip this card if the Obsidian faction is in play.",
        expansion: "thundersedge",
      },
      {
        name: "Plane Splitter",
        text: "At the start of your strategic actions, you may move an ingress token into a system that contains or is adjacent to your units. This technology cannot be researched.",
        expansion: "thundersedge",
      },
      {
        name: "Neural Parasite",
        text: "At the start of your turn, destroy 1 of another player's infantry in or adjacent to a system that contains your infantry. This technology cannot be researched.",
        expansion: "thundersedge",
      },
    ],
    faq: [
      {
        text: "Q: Can you place your own Control Tokens on Plot cards? A: You cannot.",
      },
      {
        text: "Q: Can you get more than one persons control tokens on one plot card? A: Yes that is possible.",
      },
      {
        text: "Q: Does scoring another player's Secret Objective count towards the 3 you need to unlock your Hero? A: Yes. The PLOTS WITHIN PLOTS faction ability allows you to \"score\" other players Secret Objectives, you just don't gain points from doing so. The Firmament / The Obsidian",
        requires: ["pok"],
      },
    ],
  },
  {
    id: "bastion",
    name: "Last Bastion",
    shortName: "Last Bastion",
    expansion: "thundersedge",
    difficulty: "Low",
    color: "Orange, Blue",
    symbol: "https://static.wikia.nocookie.net/twilight-imperium-4/images/6/62/LastBastionFactionSymbol.png",
    commodities: 1,
    homePlanets: [
      "Ordinian: 0/0",
      "Revelation: 1/2 (Space Station)",
      "Nebula",
    ],
    startingUnits: [
      "1 Dreadnought",
      "1 Carrier",
      "1 Cruiser",
      "2 Fighters",
      "3 Infantry",
      "1 Space Dock",
    ],
    startingTech: [
      "Choose 1 blue or yellow technology with no prerequisites",
    ],
    abilities: [
      { name: "LIBERATE", text: "When you gain control of a planet, ready that planet if it contains a number of your infantry equal to or greater than that planet's resource value; otherwise, place 1 infantry on that planet." },
      { name: "GALVANIZE", text: "When a game effect instructs a player to galvanize a unit, they place a galvanize token beneath it, if it does not have one. Galvanized units roll 1 additional die for combat rolls and unit abilities." },
      { name: "PHOENIX STANDARD", text: "At the end of combat, you may galvanize 1 of your units that participated." },
    ],
    leaders: [
      {
        role: "Agent",
        name: "Dame Briar",
        unlock: "At Game Start",
        ability: "When a player's unit is destroyed: You may exhaust this card to galvanize another of that player's units in the destroyed unit's system.",
        expansion: "pok",
      },
      {
        role: "Commander",
        name: "Nip and Tuck",
        unlock: "There are 3 galvanized units on the game board",
        ability: "Your action cards cannot be canceled by \"Sabotage\" action cards. The Nekro Virus cannot place assimilator tokens on your components.",
        expansion: "pok",
      },
      {
        role: "Hero",
        name: "Lyra Keen",
        unlock: "Have 3 Scored Objectives",
        ability: "ENTITY 4X41A \"APOLLO\" When one of your galvanized units is destroyed: You may purge this card to roll 1 die for each unit in its system that belongs to another player; if the result is equal to or greater than the galvanized unit's combat value, destroy that unit.",
        expansion: "pok",
      },
    ],
    flagship: {
      name: "The Egeiro",
      cost: "8",
      combat: "9",
      move: "1",
      capacity: "3",
      text: "Sustain Damage Production 1 Apply +1 to the results of each of this unit's combat rolls for each non-home system that contains a planet you control.",
    },
    mech: { name: "A3 Valiance", text: "When this unit is destroyed, if it was galvanized, galvanize up to 3 of your infantry in its system Sustain Damage", expansion: "pok" },
    breakthrough: {
      name: "The Icon",
      text: "When you produce ships, you may exhaust this card to place those ships in a system that contains one of your command tokens, at least one of your ground forces, and no other player's ships.",
      expansion: "thundersedge",
      synergy: ["warfare","cybernetic"],
    },
    promissory: [
      { name: "Raise the Standard", text: "At the end of a combat: Galvanize 1 of your units that participated. Then, return this card to the Last Bastion player.", expansion: "thundersedge" },
    ],
    factionTech: [
      {
        name: "Proxima Targeting VI",
        text: "Cancel 1 hit produced by BOMBARDMENT rolls made against your ground forces for each of your galvanized units present. At the start of a round of ground combat, you may resolve BOMBARDMENT 8 (x3) against your opponents ground forces; if you do, make an identical roll against your own ground forces.",
        expansion: "thundersedge",
      },
    ],
    uniqueUnits: [
      {
        name: "4X41C \"HELIOS\" V1",
        cost: "This unit's PRODUCTION value is equal to 2 more than the resource value of this planet. The resource value of this planet is increased by 1. Up to 3 fighters in this system do not count against your ships' capacity. Production X",
        combat: "None",
      },
      {
        name: "4X41C \"HELIOS\" V2",
        cost: "This unit's PRODUCTION value is equal to 4 more than the resource value of this planet. The resource value of this planet is increased by 2. Up to 3 fighters in this system do not count against your ships' capacity. Production X",
        combat: "",
      },
    ],
    faq: [
      {
        text: "Q: When Galvanizing, can I move galvanize tokens between units when the token supply is empty? A: No.",
      },
    ],
  },
  {
    id: "ralnel",
    name: "The Ral Nel Consortium",
    shortName: "Ral Nel",
    expansion: "thundersedge",
    difficulty: "Low",
    color: "Green, Yellow, Blue",
    symbol: "https://static.wikia.nocookie.net/twilight-imperium-4/images/5/5c/RalNelFactionSymbol.png",
    commodities: 4,
    homePlanets: [
      "Mez Lo Orz Pei Zsha: 2/1",
      "Rep Lo Orz Oet: 1/3",
    ],
    startingUnits: [
      "1 Dreadnought",
      "1 Carrier",
      "1 Destroyer",
      "2 Fighters",
      "4 Infantry",
      "1 Space Dock",
      "2 PDS",
    ],
    startingTech: [
      "Choose 1 red or green technology with no prerequisites",
    ],
    abilities: [
      { name: "SURVIVAL INSTINCT", text: "After another player activates a system that contains your ships, you may move up to 2 of your ships into the active system from adjacent systems that do not contain your command tokens." },
      { name: "MINIATURIZATION", text: "Your structures can be transported by any ship; this does not require or count against capacity. While your structures are in the space area, they cannot use their unit abilities. At the end of your tactical actions, you may place your structures that are in space areas onto planets you control in their respective systems." },
    ],
    leaders: [
      {
        role: "Agent",
        name: "Kan Kip Rel",
        unlock: "At Game Start",
        ability: "ACTION: Exhaust this card to draw 2 action cards; give 1 of those cards to another player.",
        expansion: "pok",
      },
      {
        role: "Commander",
        name: "Watchful Ojz",
        unlock: "Be the last person to pass during the Action Phase",
        ability: "When you declare a retreat: Immediately retreat up to 2 of your ships from the active system to an adjacent system that does not contain another player's ships. Place a command token from your reinforcements into that system.",
        expansion: "pok",
      },
      {
        role: "Hero",
        name: "Director Nel",
        unlock: "Have 3 Scored Objectives",
        ability: "SIGNAL INTRUSION After the last player passes: You may choose to no longer be passed; if you do, gain 2 command tokens, draw 1 action card, and purge this card.",
        expansion: "pok",
      },
    ],
    flagship: {
      name: "Last Dispatch",
      cost: "8",
      combat: "8 (x2)",
      move: "2",
      capacity: "4",
      text: "Sustain Damage When this unit retreats, you may destroy 1 ship in the active system that does not have SUSTAIN DAMAGE.",
    },
    mech: { name: "Alarum", text: "At the end of a round of combat on this planet, you may move up to 2 of your ground forces to this planet from planets in adjacent systems. Sustain Damage", expansion: "pok" },
    breakthrough: {
      name: "Data Skimmer",
      text: "During the action phase, if you have not passed, when other players would discard action cards, they are placed on this card instead. When you pass, take 1 action card from this card and discard the rest.",
      expansion: "thundersedge",
      synergy: ["cybernetic","biotic"],
    },
    promissory: [
      { name: "Nano-Link Permit", text: "After you activate a system: You may move your structures from adjacent systems that do not contain your command tokens onto planets you control in the active system. Then, return this card to the Ral Nel player.", expansion: "thundersedge" },
    ],
    factionTech: [
      {
        name: "Nanomachines",
        text: "ACTION: Exhaust this card to place 1 PDS on a planet you control. ACTION: Exhaust this card to repair all of your damaged units. ACTION: Exhaust this card and discard 1 action card to draw 1 action card.",
        expansion: "thundersedge",
      },
    ],
    uniqueUnits: [
      {
        name: "Linkship I",
        cost: "1",
        combat: "9",
        text: "3",
        prerequisites: "This unit can use the SPACE CANNON ability of one of your structures in its space area; each structure can only be triggered once. Anti-Fighter Barrage 9 (x2)",
      },
      {
        name: "Linkship II",
        cost: "1",
        combat: "8",
        text: "4",
        prerequisites: "This unit can use the SPACE CANNON ability of one of your structures in its space area; each linkship can trigger the same structure. Anti-Fighter Barrage 6 (x3)",
      },
    ],
    faq: [
      {
        text: "Q: So... their government is run by lizard people? A: We can neither confirm nor deny that.",
      },
      {
        text: "Q: Can the Ral Nel Consortium build one PDS in space area with nine Destroyers II or so that at the start of each combat each destroyer triggers one PDS shot? A: You can only have up to 8 destroyers on the board at once, but yes! With 1 PDS and 8 Linkship II, each one can trigger the same PDS resulting in 8 Space Cannon shots.",
      },
      {
        text: "Q: If have the PDS II unit upgrade, can my Linkships use the Space Cannons in adjacent systems? A: There is no official ruling/errata yet. This will be updated in the future when an official ruling is made. According to tirules2.com Linkships cannot fire Space Cannon against adjacent units, even if the Ral Nel player has PDS II.",
      },
      {
        text: "Q: Using the Watchful Ojz - Actuary General, can you first retreat some ships into one system using this ability and then retreat using the normal retreat? Do you retreat in the the same system as with the commander or in to a different one? A: The commander and ordinary retreat are separate abilities! You retreat 2 ships upon declaring retreats, then retreat the rest of your ships upon reaching the end of the combat round. You can retreat those ships to the same system as your 2 retreated ships via the Commander, or a different system. ru:Клан Сааров Category:Factions",
        requires: ["pok"],
      },
    ],
  },
];
