/**
 * The combat cheat sheet.
 *
 * Combat is where a game actually stalls: the order is printed across four
 * different pages of the rules reference, three of the five space combat steps
 * are skipped or repeated depending on what happened in the last one, and the
 * abilities that fire do so at exact moments rather than "during combat".
 *
 * Hand-written, but every step, order and clause below was taken from the
 * wiki's Tactical Action, Activation, Movement, Space Combat, Invasion, Ground
 * Combat, Anti-Fighter Barrage, Space Cannon, Bombardment, Sustain Damage and
 * Planetary Shield pages. Keep it that way — this is what people will read
 * mid-combat instead of opening the rulebook, so it has to be right.
 */

export interface CombatFlowStep {
  id: string;
  /** Printed step number, as the rules reference writes it. */
  marker: string;
  name: string;
  detail: string;
  /** The sub-steps the rules give this step, in order. */
  substeps?: { name: string; detail: string }[];
  /** Abilities and choices that can only happen at this exact moment. */
  interrupts?: string[];
  /** A way out of the normal order — a skip or an early end. */
  branch?: string;
  /** The thing that gets missed or argued about here. */
  gotcha?: string;
}

export interface CombatStage {
  id: string;
  name: string;
  /** One line answering "what is this?". */
  oneLine: string;
  /** When this stage happens at all. */
  trigger: string;
  steps: CombatFlowStep[];
  /** Where a new round restarts, for the stages that repeat. */
  loop?: { toStep: string; label: string };
  /** How the stage finishes, and who won. */
  ends: string[];
}

export const COMBAT_STAGES: CombatStage[] = [
  {
    id: "tactical",
    name: "Tactical action",
    oneLine: "The turn combat happens inside. Five steps, always in this order.",
    trigger:
      "Your turn in the action phase, if you have a command token in your tactic pool.",
    steps: [
      {
        id: "activation",
        marker: "1",
        name: "Activation",
        detail:
          "Take a command token from your tactic pool and place it on a system. That system is now the active system.",
        gotcha:
          "You cannot activate a system that already has one of your own command tokens on it. Other players' tokens do not stop you.",
      },
      {
        id: "movement",
        marker: "2",
        name: "Movement",
        detail:
          "Move any number of ships with enough move value into the active system. Ships with capacity carry fighters and ground forces with them.",
        substeps: [
          {
            name: "i. Move Ships",
            detail:
              "Ships may come from any number of systems, as long as those systems do not contain one of your command tokens.",
          },
          {
            name: "ii. Space Cannon Offense",
            detail:
              "Starting with you and going clockwise, every player may fire the Space Cannon ability of their units in the active system. Roll, then the targeted player destroys one ship per hit.",
          },
        ],
        interrupts: [
          "Space Cannon Offense fires here and nowhere else in the turn.",
          "PDS II can fire from systems adjacent to the active one; the hits still land in the active system.",
        ],
        gotcha:
          "Space Cannon Offense happens even if you moved nothing. It is not space combat, so anything that triggers “during space combat” cannot be used against it.",
      },
      {
        id: "space-combat",
        marker: "3",
        name: "Space Combat",
        detail:
          "If two players have ships in the active system, they must resolve a space combat.",
        branch: "If only one player has ships there, skip straight to Invasion.",
      },
      {
        id: "invasion",
        marker: "4",
        name: "Invasion",
        detail:
          "Bombard, commit ground forces to planets, and resolve any ground combats.",
        branch:
          "If you have no ground forces in the space area, or choose to commit none, skip straight to Production.",
      },
      {
        id: "production",
        marker: "5",
        name: "Production",
        detail:
          "Resolve the Production ability of each of your units in the active system.",
        gotcha:
          "You may produce even if you moved nothing and landed nothing this turn.",
      },
    ],
    ends: ["The turn ends. Play passes to the next player in initiative order."],
  },

  {
    id: "space",
    name: "Space combat",
    oneLine:
      "Rounds of simultaneous dice until one side has no ships left in the system.",
    trigger:
      "Two players have ships in the active system once Space Cannon Offense has been resolved.",
    steps: [
      {
        id: "afb",
        marker: "1",
        name: "Anti-Fighter Barrage",
        detail:
          "First round only. Both players simultaneously fire the Anti-Fighter Barrage ability of their units in the system, then each destroys one of their own fighters per hit taken.",
        interrupts: [
          "Only units with the Anti-Fighter Barrage ability roll here.",
          "Effects that re-roll or modify combat rolls do not touch barrage rolls.",
        ],
        branch:
          "If either player has no ships left after this step, the combat ends immediately.",
        gotcha:
          "The step happens even when the other side has no fighters, which is what makes the Argent Flight's Raid Formation work. Hits beyond the fighters present are simply lost, and a dreadnought cannot Sustain Damage against a barrage hit because it was never eligible to be hit by one.",
      },
      {
        id: "announce",
        marker: "2",
        name: "Announce Retreats",
        detail:
          "Each player may announce a retreat, starting with the defender. Nothing moves yet.",
        gotcha:
          "If the defender announces, the attacker cannot announce in that same round. You cannot announce at all unless you have somewhere legal to go.",
      },
      {
        id: "roll",
        marker: "3",
        name: "Roll Dice",
        detail:
          "Each player rolls one die per ship. A result equal to or above the unit's combat value is a hit. A combat value with two or more burst icons rolls that many dice.",
        interrupts: [
          "Re-rolls and die-modifying abilities resolve immediately after you have rolled all of your dice.",
        ],
        gotcha:
          "The attacker rolls everything before the defender does — that order is what makes abilities that re-roll an opponent's die work. Roll your different combat values separately, lowest first.",
      },
      {
        id: "assign",
        marker: "4",
        name: "Assign Hits",
        detail:
          "Each player chooses and destroys one of their own ships for each hit the opponent produced.",
        interrupts: [
          "Sustain Damage is used immediately before hits are assigned — each use cancels one hit and flips that unit on its side.",
        ],
        gotcha:
          "A damaged unit fights normally; it just cannot Sustain again until it is repaired in the status phase.",
      },
      {
        id: "retreat",
        marker: "5",
        name: "Retreat",
        detail:
          "Anyone who announced in step 2 and still has somewhere legal to go must now retreat. Take every ship with a move value to a single adjacent system and place a command token there.",
        branch:
          "If the opponent has no ships left, the combat ends and the retreat does not happen.",
        gotcha:
          "The destination must hold one of your units or a planet you control, and must not hold another player's ships. Fighters and ground forces in the space area that cannot be carried out are removed.",
      },
    ],
    loop: {
      toStep: "announce",
      label:
        "Both sides still have ships? A new round starts at Announce Retreats — Anti-Fighter Barrage never happens again.",
    },
    ends: [
      "Combat ends when only one player, or neither, has a ship in the space area.",
      "The player with ships left is the winner. If neither has any, it is a draw with no winner.",
      "The winner removes any fighters and ground forces in the space area beyond the capacity of the ships they have left.",
    ],
  },

  {
    id: "invasion",
    name: "Invasion",
    oneLine: "Landing ground forces on planets, and taking them.",
    trigger:
      "After space combat, or straight after Space Cannon Offense if there was no combat to fight.",
    steps: [
      {
        id: "bombardment",
        marker: "1",
        name: "Bombardment",
        detail:
          "You may fire the Bombardment ability of your units in the system. Declare which planet each unit is bombarding before rolling. The planet's controller destroys one ground force per hit.",
        gotcha:
          "A planet holding a unit with Planetary Shield cannot be bombarded at all. Combat-roll modifiers do not apply, and hits beyond the ground forces present are lost.",
      },
      {
        id: "commit",
        marker: "2",
        name: "Commit Ground Forces",
        detail:
          "Move any number of your ground forces from the space area onto any planets in the system. The planet may already hold another player's ground forces.",
        branch: "Commit nothing and the invasion is over — go to Production.",
      },
      {
        id: "scd",
        marker: "3",
        name: "Space Cannon Defense",
        detail:
          "Units with Space Cannon on an invaded planet fire at the ground forces that were just committed there.",
        interrupts: ["Only players other than the active player fire here."],
        gotcha:
          "Abilities that let Space Cannon reach into adjacent systems do nothing during defense. If you invaded several defended planets, you choose the order they fire in.",
      },
      {
        id: "ground-combat",
        marker: "4",
        name: "Ground Combat",
        detail:
          "Resolve a ground combat on each planet where your landed forces meet another player's.",
        gotcha: "You choose the order the planets are fought over.",
      },
      {
        id: "control",
        marker: "5",
        name: "Establish Control",
        detail:
          "You gain control of every planet you committed to that still holds at least one of your ground forces, and take its planet card exhausted.",
        gotcha:
          "Other players' structures on a planet you take are destroyed immediately. If both sides were wiped out, the defender keeps the planet.",
      },
    ],
    ends: ["Move on to Production."],
  },

  {
    id: "ground",
    name: "Ground combat",
    oneLine: "Two steps, repeated on one planet until one side is gone.",
    trigger:
      "Your committed ground forces landed on a planet that holds another player's ground forces.",
    steps: [
      {
        id: "ground-roll",
        marker: "1",
        name: "Roll Dice",
        detail:
          "Each player rolls one die per ground force on the planet. A result equal to or above the unit's combat value is a hit; two or more burst icons roll that many dice.",
      },
      {
        id: "ground-assign",
        marker: "2",
        name: "Assign Hits",
        detail:
          "Each player chooses and destroys one of their own ground forces on the planet per hit taken.",
      },
    ],
    loop: {
      toStep: "ground-roll",
      label:
        "Both sides still have ground forces? A new round starts at Roll Dice. There is no barrage and no retreat down here.",
    },
    ends: [
      "Combat ends when only one player, or neither, has ground forces on the planet.",
      "If both sides are wiped out there is no winner, and the planet's owner keeps it.",
    ],
  },
];

export interface CombatAbility {
  name: string;
  /** The exact moment it fires. */
  when: string;
  /** What it rolls, and against what. */
  rolls: string;
  notes: string[];
}

/**
 * The unit abilities that interrupt the flow, and the one moment each fires.
 * Nearly every combat argument is really an argument about this table.
 */
export const COMBAT_ABILITIES: CombatAbility[] = [
  {
    name: "Space Cannon Offense",
    when: "Movement, straight after Move Ships",
    rolls: "Space Cannon value, against ships in the active system",
    notes: [
      "Every player may fire, not just the active one, going clockwise from the active player.",
      "Fires even if nothing moved.",
      "Not space combat — abilities that trigger during space combat cannot answer it.",
      "PDS II reaches into adjacent systems; hits still land in the active system.",
    ],
  },
  {
    name: "Anti-Fighter Barrage",
    when: "Space combat, step 1 — first round only",
    rolls: "Barrage value, destroying only fighters",
    notes: [
      "Both players fire simultaneously.",
      "Happens even with no fighters on the table.",
      "Excess hits are lost.",
      "Sustain Damage cannot cancel a barrage hit: only fighters are eligible to be hit.",
    ],
  },
  {
    name: "Sustain Damage",
    when: "Immediately before hits are assigned, in any combat",
    rolls: "Cancels one hit per use, and flips the unit on its side",
    notes: [
      "Works against combat hits and against Space Cannon and Bombardment hits.",
      "Only usable if the unit was eligible to be hit in the first place.",
      "Cannot cancel an effect that destroys a unit outright.",
      "A damaged unit is otherwise a normal unit until it repairs in the status phase.",
    ],
  },
  {
    name: "Bombardment",
    when: "Invasion, step 1",
    rolls: "Bombardment value, against ground forces on a planet",
    notes: [
      "Declare the target planet for each unit before rolling.",
      "Blocked entirely by Planetary Shield.",
      "Excess hits are lost.",
    ],
  },
  {
    name: "Space Cannon Defense",
    when: "Invasion, step 3 — after ground forces are committed",
    rolls: "Space Cannon value, against the committed ground forces",
    notes: [
      "Only players other than the active player fire.",
      "Only units on the invaded planet; adjacent-system range does not apply.",
      "The active player chooses the order if several planets were invaded.",
    ],
  },
  {
    name: "Planetary Shield",
    when: "Passive, during Bombardment",
    rolls: "No roll — the planet simply cannot be bombarded",
    notes: [
      "Also stops the L1Z1X Harrow ability.",
      "A war sun in the system turns it off for every other player's units there.",
    ],
  },
];
