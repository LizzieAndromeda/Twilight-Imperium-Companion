import type { Faction } from "@/lib/types";

/**
 * Faction directory.
 *
 * Ability text here is *paraphrased* for quick reference at the table — the
 * printed faction sheet and the official Living Rules Reference remain
 * authoritative. Where an ability is omitted it simply has not been catalogued
 * yet; add it here and it appears everywhere in the app.
 */
export const FACTIONS: Faction[] = [
  {
    id: "arborec",
    name: "The Arborec",
    shortName: "Arborec",
    expansion: "base",
    tagline: "A sentient forest that grows its armies rather than building them.",
    difficulty: "High",
    playstyle:
      "Free infantry every status phase makes the Arborec relentless on the ground, but their production restrictions make fleet building awkward. Plan to win planets, not space battles.",
    abilities: [
      {
        name: "Mitosis",
        text: "At the start of the status phase, place 1 infantry from your reinforcements on any planet you control.",
      },
    ],
  },
  {
    id: "letnev",
    name: "The Barony of Letnev",
    shortName: "Letnev",
    expansion: "base",
    tagline: "A starving aristocracy with the finest war fleet in the galaxy.",
    difficulty: "Low",
    playstyle:
      "The strongest opening navy in the base game. Armada lets you field oversized fleets early; use that window to take Mecatol Rex before anyone can contest you.",
    abilities: [
      {
        name: "Munitions Reserves",
        text: "At the start of each round of space combat, you may spend 2 trade goods to re-roll any number of your dice.",
      },
      {
        name: "Armada",
        text: "The maximum number of non-fighter ships you can have in each system is equal to 2 more than the number of tokens in your fleet pool.",
      },
    ],
  },
  {
    id: "saar",
    name: "The Clan of Saar",
    shortName: "Saar",
    expansion: "base",
    tagline: "Nomad scrappers whose shipyards are themselves ships.",
    difficulty: "Medium",
    playstyle:
      "Mobile space docks let you produce anywhere and abandon anything. Scavenge turns aggressive expansion into a steady trade good income.",
    abilities: [
      {
        name: "Scavenge",
        text: "After you gain control of a planet, gain 1 trade good.",
      },
      {
        name: "Nomadic",
        text: "You can score objectives even if you do not control the planets in your home system.",
      },
    ],
  },
  {
    id: "muaat",
    name: "The Embers of Muaat",
    shortName: "Muaat",
    expansion: "base",
    tagline: "Living flame, born of a dying star, armed with a war sun from turn one.",
    difficulty: "Medium",
    playstyle:
      "You start with a war sun. That is both a threat and a target — use the early intimidation to claim territory before the rest of the table catches up in technology.",
    abilities: [
      {
        name: "Star Forge",
        text: "ACTION: Spend 1 token from your strategy pool to place 1 destroyer or 2 fighters from your reinforcements in a system that contains 1 or more of your war suns.",
      },
      {
        name: "Gashlai Physiology",
        text: "Your ships can move through supernovas.",
      },
    ],
  },
  {
    id: "hacan",
    name: "The Emirates of Hacan",
    shortName: "Hacan",
    expansion: "base",
    tagline: "Merchant princes who would rather buy the galaxy than conquer it.",
    difficulty: "Low",
    playstyle:
      "The economic engine of the game. Trade with everyone, hold the balance of power, and convert an enormous treasury into a late-game points burst.",
    abilities: [
      {
        name: "Masters of Trade",
        text: "You do not have to spend a command token to resolve the secondary ability of the Trade strategy card.",
      },
      {
        name: "Guild Ships",
        text: "You can negotiate transactions with players who are not your neighbours.",
      },
      {
        name: "Arbiters",
        text: "When you are negotiating a transaction, action cards can be exchanged as part of that transaction.",
      },
    ],
  },
  {
    id: "sol",
    name: "The Federation of Sol",
    shortName: "Sol",
    expansion: "base",
    tagline: "Humanity, stubborn and numerous, fielding the galaxy's best infantry.",
    difficulty: "Low",
    playstyle:
      "The friendliest faction for a first game. Extra command tokens each round means more actions than anyone else, and Orbital Drop makes planets very hard to take back from you.",
    abilities: [
      {
        name: "Orbital Drop",
        text: "ACTION: Spend 1 token from your strategy pool to place 2 infantry from your reinforcements on 1 planet you control.",
      },
      {
        name: "Versatile",
        text: "When you gain command tokens during the status phase, gain 1 additional command token.",
      },
    ],
  },
  {
    id: "creuss",
    name: "The Ghosts of Creuss",
    shortName: "Creuss",
    expansion: "base",
    tagline: "Refugees from another dimension who fold space to move.",
    difficulty: "High",
    playstyle:
      "Wormholes make you the most mobile faction in the game and let you strike anywhere. The cost is a fragile, exposed home system that sits outside the galaxy.",
    abilities: [
      {
        name: "Quantum Entanglement",
        text: "You treat all systems that contain either an alpha or beta wormhole as adjacent to each other.",
      },
      {
        name: "Slipstream",
        text: "During your tactical actions, apply +1 to the move value of each of your ships that starts its movement in your home system or in a system that contains either an alpha or beta wormhole.",
      },
      {
        name: "Creuss Gate",
        text: "Your home system is placed outside the galaxy, connected to the board by the Creuss Gate tile.",
      },
    ],
  },
  {
    id: "l1z1x",
    name: "The L1Z1X Mindnet",
    shortName: "L1Z1X",
    expansion: "base",
    tagline: "The remnant of the Lazax empire, now more machine than memory.",
    difficulty: "Low",
    playstyle:
      "A straightforward military faction with an outstanding dreadnought line. Harrow grinds down defenders that survive your bombardment.",
    abilities: [
      {
        name: "Assimilate",
        text: "When you gain control of a planet, replace each space dock and PDS on it with a matching unit of your own.",
      },
      {
        name: "Harrow",
        text: "After each round of ground combat, your ships in the active system may use BOMBARDMENT against your opponent's ground forces on the planet.",
      },
    ],
  },
  {
    id: "mentak",
    name: "The Mentak Coalition",
    shortName: "Mentak",
    expansion: "base",
    tagline: "Pirates and exiles who take what the great powers will not share.",
    difficulty: "Low",
    playstyle:
      "Ambush gives you free damage in every space battle, and Pillage punishes wealthy neighbours. Sit between two rich players and tax them.",
    abilities: [
      {
        name: "Ambush",
        text: "At the start of a space combat, you may roll 1 die for each of up to 2 of your cruisers or destroyers in the system; for each result equal to or greater than that ship's combat value, produce 1 hit.",
      },
      {
        name: "Pillage",
        text: "After 1 of your neighbours gains trade goods or resolves a transaction, if they have 3 or more trade goods, you may take 1 of their trade goods or commodities.",
      },
    ],
  },
  {
    id: "naalu",
    name: "The Naalu Collective",
    shortName: "Naalu",
    expansion: "base",
    tagline: "A telepathic hive that always sees the next move coming.",
    difficulty: "Medium",
    playstyle:
      "Guaranteed first place in initiative order every round is enormous — you score, move and claim objectives before anyone can respond.",
    abilities: [
      {
        name: "Telepathic",
        text: 'At the end of the strategy phase, place the Naalu "0" token on your strategy card; you are first in initiative order.',
      },
      {
        name: "Foresight",
        text: "After another player moves ships into a system that contains 1 or more of your ships, you may place 1 token from your strategy pool in an adjacent system that does not contain another player's ships; if you do, move all of your ships from the active system into that system.",
      },
    ],
  },
  {
    id: "nekro",
    name: "The Nekro Virus",
    shortName: "Nekro",
    expansion: "base",
    tagline: "A machine plague that cannot invent, only steal.",
    difficulty: "High",
    playstyle:
      "You cannot research — you must fight for every technology you own. Deeply asymmetric and dependent on staying in combat with technologically advanced neighbours.",
    abilities: [
      {
        name: "Galactic Threat",
        text: "You cannot vote on agendas. Once per agenda phase, after an agenda is revealed, you may predict aloud the outcome; if your prediction is correct, gain 1 technology owned by a player who voted that way.",
      },
      {
        name: "Technological Singularity",
        text: "Once per combat, after 1 or more of your opponent's units are destroyed, you may gain 1 technology owned by that player.",
      },
      {
        name: "Propagation",
        text: "You cannot research technology. When you would research a technology, gain 3 command tokens instead.",
      },
    ],
  },
  {
    id: "norr",
    name: "Sardakk N'orr",
    shortName: "N'orr",
    expansion: "base",
    tagline: "An insectoid warrior caste for whom war is a religious duty.",
    difficulty: "Medium",
    playstyle:
      "+1 to every combat roll makes you the best pure fighter in the game, but you have no economic or political tools. Win by force or not at all.",
    abilities: [
      {
        name: "Unrelenting",
        text: "Apply +1 to the result of each of your unit's combat rolls.",
      },
    ],
  },
  {
    id: "jolnar",
    name: "The Universities of Jol-Nar",
    shortName: "Jol-Nar",
    expansion: "base",
    tagline: "Brilliant, frail academics who out-think what they cannot out-shoot.",
    difficulty: "High",
    playstyle:
      "The fastest technology curve in the game, paid for with -1 on every combat roll. Race to unit upgrades before your fragility catches up with you.",
    abilities: [
      {
        name: "Fragile",
        text: "Apply -1 to the result of each of your unit's combat rolls.",
      },
      {
        name: "Brilliant",
        text: "When you spend a command token to resolve the secondary ability of the Technology strategy card, you may resolve the primary ability instead.",
      },
      {
        name: "Analytical",
        text: "When you research a technology that is not a unit upgrade technology, you may ignore 1 prerequisite.",
      },
    ],
  },
  {
    id: "winnu",
    name: "The Winnu",
    shortName: "Winnu",
    expansion: "base",
    tagline: "The Lazax's favoured servants, who believe the throne is theirs by right.",
    difficulty: "Medium",
    playstyle:
      "Built entirely around Mecatol Rex. Take the throne world early and for free, then defend it for the rest of the game.",
    abilities: [
      {
        name: "Blood Ties",
        text: "You do not have to spend influence to remove the custodians token from Mecatol Rex.",
      },
    ],
  },
  {
    id: "xxcha",
    name: "The Xxcha Kingdom",
    shortName: "Xxcha",
    expansion: "base",
    tagline: "Ancient, patient diplomats with the galaxy's best defences.",
    difficulty: "Low",
    playstyle:
      "You control the agenda phase and expand without fighting. Slow, safe and very hard to remove once entrenched.",
    abilities: [
      {
        name: "Peace Accords",
        text: "After you resolve the primary or secondary ability of the Diplomacy strategy card, you may gain control of 1 planet other than Mecatol Rex in a system adjacent to a system that contains 1 or more of your ships.",
      },
      {
        name: "Quash",
        text: "When an agenda is revealed, you may spend 1 token from your strategy pool to discard that agenda and reveal 1 agenda from the top of the deck.",
      },
    ],
  },
  {
    id: "yin",
    name: "The Yin Brotherhood",
    shortName: "Yin",
    expansion: "base",
    tagline: "Cloned zealots who spend their own lives freely.",
    difficulty: "High",
    playstyle:
      "Sacrifice is a resource. Converting enemy infantry and trading ships for hits gives you outsized combat swings if you can afford the losses.",
    abilities: [
      {
        name: "Indoctrination",
        text: "At the start of a ground combat, you may spend 2 influence to replace 1 of your opponent's participating infantry with 1 infantry from your reinforcements.",
      },
      {
        name: "Devotion",
        text: "After each space combat round, you may destroy 1 of your cruisers or destroyers in the active system to produce 1 hit against your opponent's ships.",
      },
    ],
  },
  {
    id: "yssaril",
    name: "The Yssaril Tribes",
    shortName: "Yssaril",
    expansion: "base",
    tagline: "Spies and saboteurs who win the game from behind a fan of cards.",
    difficulty: "Medium",
    playstyle:
      "An unlimited hand of action cards is a slow, quiet accumulation of power. Hoard, then unload at the moment someone reaches for the win.",
    abilities: [
      {
        name: "Stall Tactics",
        text: "ACTION: Discard 1 action card from your hand.",
      },
      {
        name: "Scheming",
        text: "When you draw 1 or more action cards, draw 1 additional action card. Then choose and discard 1 action card from your hand.",
      },
      {
        name: "Crafty",
        text: "You can have any number of action cards in your hand.",
      },
    ],
  },

  /* ---------------------------------------------------- Prophecy of Kings */

  {
    id: "argent",
    name: "The Argent Flight",
    shortName: "Argent",
    expansion: "pok",
    tagline: "Avian wardens sworn to keep the galaxy's old seals closed.",
    difficulty: "Medium",
    playstyle:
      "Enormous voting power plus destroyers that shred fighters and infantry. Strong in the agenda phase and strong at contesting space.",
    abilities: [
      {
        name: "Zeal",
        text: "You always vote first during the agenda phase. When you cast at least 1 vote, cast 1 additional vote for each player in the game.",
      },
      {
        name: "Raid Formation",
        text: "When 1 or more of your units use ANTI-FIGHTER BARRAGE, for each hit produced in excess of your opponent's fighters in the space area, destroy 1 of your opponent's infantry in the space area.",
      },
    ],
  },
  {
    id: "empyrean",
    name: "The Empyrean",
    shortName: "Empyrean",
    expansion: "pok",
    tagline: "A void-dwelling species that lives in the nebulae between stars.",
    difficulty: "Medium",
    playstyle:
      "You ignore terrain everyone else must route around, and you sell passage through your territory. A subtle, deal-making position.",
    abilities: [
      {
        name: "Voidborn",
        text: "Nebulae do not affect your ships' movement.",
      },
      {
        name: "Aetherpassage",
        text: "After a player activates a system, you may allow that player to move their ships through systems that contain your ships.",
      },
    ],
  },
  {
    id: "mahact",
    name: "The Mahact Gene-Sorcerers",
    shortName: "Mahact",
    expansion: "pok",
    tagline: "The bloodline that ruled before the Lazax, and intends to rule again.",
    difficulty: "High",
    playstyle:
      "Winning fights lets you hold other players' command tokens and use their commanders. Fight everyone a little; collect the whole table.",
    abilities: [
      {
        name: "Edict",
        text: "When you win a combat against another player, if their command token is not already in your fleet pool, add it to your fleet pool.",
      },
      {
        name: "Imperia",
        text: "While another player's command token is in your fleet pool, you can use the commander of that player's faction.",
      },
    ],
  },
  {
    id: "naazrokha",
    name: "The Naaz-Rokha Alliance",
    shortName: "Naaz-Rokha",
    expansion: "pok",
    tagline: "Two species, one hull: explorers who turn ruins into relics.",
    difficulty: "Medium",
    playstyle:
      "The best exploration faction. Mechs on the ground double your exploration draws, and relic fragments convert into game-swinging relics.",
    abilities: [
      {
        name: "Fabrication",
        text: "ACTION: Either purge 2 of your relic fragments to gain 1 relic, or purge 1 of your relic fragments to gain 1 command token.",
      },
      {
        name: "Distant Suns",
        text: "When you explore a planet, if you have a mech on that planet, you may draw 1 additional card; if you do, choose 1 to resolve and discard the other.",
      },
    ],
  },
  {
    id: "nomad",
    name: "The Nomad",
    shortName: "Nomad",
    expansion: "pok",
    tagline: "A single ancient ship and its captain, playing every side at once.",
    difficulty: "Medium",
    playstyle:
      "Three agents instead of one gives you an answer to almost any situation, and your flagship is among the strongest in the game.",
    abilities: [
      {
        name: "The Company",
        text: "During setup, take the 2 additional Nomad agents and place them next to your faction sheet.",
      },
      {
        name: "Future Sight",
        text: "During the agenda phase, after an outcome you voted for is resolved, gain 1 trade good.",
      },
    ],
  },
  {
    id: "titans",
    name: "The Titans of Ul",
    shortName: "Titans",
    expansion: "pok",
    tagline: "Machine gods waking from beneath the crust of forgotten worlds.",
    difficulty: "High",
    playstyle:
      "Sleeper tokens turn exploration into free PDS across the map, and your unique cruiser-PDS units make territory extremely sticky.",
    abilities: [
      {
        name: "Terragenesis",
        text: "After you explore a planet that does not have a sleeper token, you may place or move a sleeper token onto that planet.",
      },
      {
        name: "Awaken",
        text: "After you activate a system that contains 1 or more of your sleeper tokens, you may replace each of those tokens with 1 PDS from your reinforcements.",
      },
    ],
  },
  {
    id: "vuilraith",
    name: "The Vuil'raith Cabal",
    shortName: "Vuil'raith",
    expansion: "pok",
    tagline: "Things from beyond the rift, eating their way into this galaxy.",
    difficulty: "High",
    playstyle:
      "You capture what you destroy and rebuild it as your own. Terrifying in a long war, weak if the table refuses to fight you.",
    abilities: [
      {
        name: "Devour",
        text: "Capture your opponent's non-structure units that are destroyed during combat.",
      },
      {
        name: "Amalgamation",
        text: "When you produce a unit, you may return 1 captured unit of that type instead of spending resources for it.",
      },
    ],
  },

  /* ----------------------------------------------------------- Codex III */

  {
    id: "keleres",
    name: "The Council Keleres",
    shortName: "Keleres",
    expansion: "codex3",
    tagline: "Mecatol Rex's own agency, drawn from three rival powers.",
    difficulty: "Medium",
    playstyle:
      "You build your identity at setup by choosing a Tribunii heritage. Flexible, political, and always positioned near the centre of the galaxy.",
    abilities: [
      {
        name: "The Tribunii",
        text: "During setup, choose an unplayed faction from among the Mentak, Xxcha or Argent Flight and take that faction's home system and the matching Keleres hero.",
      },
      {
        name: "Council Patronage",
        text: "Replenish your commodities at the start of the strategy phase, then gain 1 trade good.",
      },
      {
        name: "Law's Order",
        text: "You may spend 1 influence at the start of your turn to treat all laws as blank until the end of your turn.",
      },
    ],
  },
];

export const FACTION_BY_ID = new Map(FACTIONS.map((f) => [f.id, f]));
