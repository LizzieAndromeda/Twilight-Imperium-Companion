import type { FactionNote } from "@/lib/types";

/**
 * Editorial notes on each faction — a flavour line and a read on how the
 * faction actually wants to be played.
 *
 * This is opinion, not rules text, and it is deliberately kept out of
 * `factions.generated.ts` so that regenerating the mechanical data from the
 * wiki never discards it. A faction with no entry here simply shows its
 * abilities without commentary.
 */
export const FACTION_NOTES: Record<string, FactionNote> = {
  arborec: {
    tagline: "A sentient forest that grows its armies rather than building them.",
    playstyle:
      "Free infantry every status phase makes the Arborec relentless on the ground, but their space docks cannot produce infantry at all, so fleet building is awkward and every ground force is precious. Plan to win planets, not space battles.",
  },
  letnev: {
    tagline: "A starving aristocracy with the finest war fleet in the galaxy.",
    playstyle:
      "The strongest opening navy in the base game. Armada lets you field oversized fleets early; use that window to take Mecatol Rex before anyone can contest you.",
  },
  saar: {
    tagline: "Nomad scrappers whose shipyards are themselves ships.",
    playstyle:
      "Mobile space docks let you produce anywhere and abandon anything. Scavenge turns aggressive expansion into a steady trade good income.",
  },
  muaat: {
    tagline: "Living flame, born of a dying star, armed with a war sun from turn one.",
    playstyle:
      "You start with a war sun. That is both a threat and a target — use the early intimidation to claim territory before the rest of the table catches up in technology.",
  },
  hacan: {
    tagline: "Merchant princes who would rather buy the galaxy than conquer it.",
    playstyle:
      "The economic engine of the game. Trade with everyone, hold the balance of power, and convert an enormous treasury into a late-game points burst.",
  },
  sol: {
    tagline: "Humanity, stubborn and numerous, fielding the galaxy's best infantry.",
    playstyle:
      "The friendliest faction for a first game. Extra command tokens each round means more actions than anyone else, and Orbital Drop makes planets very hard to take back from you.",
  },
  creuss: {
    tagline: "Refugees from another dimension who fold space to move.",
    playstyle:
      "Wormholes make you the most mobile faction in the game and let you strike anywhere. The cost is a fragile, exposed home system that sits outside the galaxy.",
  },
  l1z1x: {
    tagline: "The remnant of the Lazax empire, now more machine than memory.",
    playstyle:
      "A straightforward military faction with an outstanding dreadnought line. Harrow grinds down defenders that survive your bombardment.",
  },
  mentak: {
    tagline: "Pirates and exiles who take what the great powers will not share.",
    playstyle:
      "Ambush gives you free damage in every space battle, and Pillage punishes wealthy neighbours. Sit between two rich players and tax them.",
  },
  naalu: {
    tagline: "A telepathic hive that always sees the next move coming.",
    playstyle:
      "Guaranteed first place in initiative order every round is enormous — you score, move and claim objectives before anyone can respond.",
  },
  nekro: {
    tagline: "A machine plague that cannot invent, only steal.",
    playstyle:
      "You cannot research — you must fight for every technology you own. Deeply asymmetric and dependent on staying in combat with technologically advanced neighbours.",
  },
  norr: {
    tagline: "An insectoid warrior caste for whom war is a religious duty.",
    playstyle:
      "+1 to every combat roll makes you the best pure fighter in the game, but you have no economic or political tools. Win by force or not at all.",
  },
  jolnar: {
    tagline: "Brilliant, frail academics who out-think what they cannot out-shoot.",
    playstyle:
      "The fastest technology curve in the game, paid for with -1 on every combat roll. Race to unit upgrades before your fragility catches up with you.",
  },
  winnu: {
    tagline: "The Lazax's favoured servants, who believe the throne is theirs by right.",
    playstyle:
      "Built entirely around Mecatol Rex. Take the throne world early and for free, then defend it for the rest of the game.",
  },
  xxcha: {
    tagline: "Ancient, patient diplomats with the galaxy's best defences.",
    playstyle:
      "You control the agenda phase and expand without fighting. Slow, safe and very hard to remove once entrenched.",
  },
  yin: {
    tagline: "Cloned zealots who spend their own lives freely.",
    playstyle:
      "Sacrifice is a resource. Converting enemy infantry and trading ships for hits gives you outsized combat swings if you can afford the losses.",
  },
  yssaril: {
    tagline: "Spies and saboteurs who win the game from behind a fan of cards.",
    playstyle:
      "An unlimited hand of action cards is a slow, quiet accumulation of power. Hoard, then unload at the moment someone reaches for the win.",
  },

  /* ---------------------------------------------------- Prophecy of Kings */

  argent: {
    tagline: "Avian wardens sworn to keep the galaxy's old seals closed.",
    playstyle:
      "Enormous voting power plus destroyers that shred fighters and infantry. Strong in the agenda phase and strong at contesting space.",
  },
  empyrean: {
    tagline: "A void-dwelling species that lives in the nebulae between stars.",
    playstyle:
      "You ignore terrain everyone else must route around, and you sell passage through your territory. A subtle, deal-making position.",
  },
  mahact: {
    tagline: "The bloodline that ruled before the Lazax, and intends to rule again.",
    playstyle:
      "Winning fights lets you hold other players' command tokens and use their commanders. Fight everyone a little; collect the whole table.",
  },
  naazrokha: {
    tagline: "Two species, one hull: explorers who turn ruins into relics.",
    playstyle:
      "The best exploration faction. Mechs on the ground double your exploration draws, and relic fragments convert into game-swinging relics.",
  },
  nomad: {
    tagline: "A single ancient ship and its captain, playing every side at once.",
    playstyle:
      "Three agents instead of one gives you an answer to almost any situation, and your flagship is among the strongest in the game.",
  },
  titans: {
    tagline: "Machine gods waking from beneath the crust of forgotten worlds.",
    playstyle:
      "Sleeper tokens turn exploration into free PDS across the map, and your unique cruiser-PDS units make territory extremely sticky.",
  },
  vuilraith: {
    tagline: "Things from beyond the rift, eating their way into this galaxy.",
    playstyle:
      "You capture what you destroy and rebuild it as your own. Terrifying in a long war, weak if the table refuses to fight you.",
  },

  /* ------------------------------------------------------------ Codex III */

  keleres: {
    tagline: "Mecatol Rex's own agency, drawn from three rival powers.",
    playstyle:
      "You build your identity at setup by choosing a Tribunii heritage. Flexible, political, and always positioned near the centre of the galaxy.",
  },

  /* -------------------------------------------------------- Thunder's Edge */

  crimson: {
    tagline: "Exiles behind a wound in space, striking through breaches nobody else can open.",
    playstyle:
      "Locked out of ordinary wormholes and starting beside the Sorrow, you trade normal mobility for breaches you alone control. Anything that enters your home system dies, so you defend cheaply and pick your moment to erupt somewhere unexpected.",
  },
  deepwrought: {
    tagline: "Ocean-dwelling scholars who share a planet rather than take it.",
    playstyle:
      "Built on coexistence: you land alongside other players instead of fighting them, and turn those shared planets into ocean cards. A quiet, non-confrontational engine that punishes anyone who ignores you for too long.",
  },
  firmament: {
    tagline: "A hidden hand that scores other players' secrets, then becomes something worse.",
    playstyle:
      "You cannot be chosen at setup — you arrive mid-game. Scoring other players' secret objectives builds plot cards, and once you hold one you can purge the Firmament entirely and flip into The Obsidian. A long, theatrical setup for a late-game turn.",
  },
  bastion: {
    tagline: "The last defenders of Ordinian, hardening every unit that survives a fight.",
    playstyle:
      "Galvanize tokens make your veterans roll extra dice, so every combat you survive makes the next one easier. Liberate readies planets you take with enough infantry, giving you an economy that rewards committing hard on the ground.",
  },
  ralnel: {
    tagline: "Consortium logisticians who carry their infrastructure with the fleet.",
    playstyle:
      "Structures ride along on any ship without using capacity, so you rebuild wherever you end up rather than defending a fixed position. Survival Instinct lets you reinforce a system the moment it is activated, making you very hard to pin down.",
  },
};
