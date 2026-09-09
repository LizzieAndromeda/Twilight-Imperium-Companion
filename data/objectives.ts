import type { PublicObjective } from "@/lib/types";

/**
 * Public objectives, used to populate the tracker's objective picker.
 *
 * This is a working subset rather than the complete decks — the tracker always
 * allows a free-text objective, so a card missing from here never blocks a
 * game. Requirement text is paraphrased.
 */
export const PUBLIC_OBJECTIVES: PublicObjective[] = [
  /* ------------------------------------------------- Stage I — base game */
  {
    id: "corner-the-market",
    name: "Corner the Market",
    stage: "I",
    expansion: "base",
    requirement: "Control 4 planets that each have the same planet trait.",
  },
  {
    id: "develop-weaponry",
    name: "Develop Weaponry",
    stage: "I",
    expansion: "base",
    requirement: "Own 2 unit upgrade technologies.",
  },
  {
    id: "diversify-research",
    name: "Diversify Research",
    stage: "I",
    expansion: "base",
    requirement: "Own 2 technologies in each of 2 colours.",
  },
  {
    id: "erect-a-monument",
    name: "Erect a Monument",
    stage: "I",
    expansion: "base",
    requirement: "Spend 8 resources.",
  },
  {
    id: "expand-borders",
    name: "Expand Borders",
    stage: "I",
    expansion: "base",
    requirement: "Control 6 planets in non-home systems.",
  },
  {
    id: "found-research-outposts",
    name: "Found Research Outposts",
    stage: "I",
    expansion: "base",
    requirement: "Control 3 planets that have technology specialties.",
  },
  {
    id: "intimidate-council",
    name: "Intimidate Council",
    stage: "I",
    expansion: "base",
    requirement:
      "Have 1 or more ships in 2 systems that are adjacent to the Mecatol Rex system.",
  },
  {
    id: "lead-from-the-front",
    name: "Lead From the Front",
    stage: "I",
    expansion: "base",
    requirement: "Spend a total of 3 tokens from your tactic and/or strategy pools.",
  },
  {
    id: "negotiate-trade-routes",
    name: "Negotiate Trade Routes",
    stage: "I",
    expansion: "base",
    requirement: "Spend 5 trade goods.",
  },
  {
    id: "sway-the-council",
    name: "Sway the Council",
    stage: "I",
    expansion: "base",
    requirement: "Spend 8 influence.",
  },

  /* -------------------------------------------- Stage I — Prophecy of Kings */
  {
    id: "amass-wealth",
    name: "Amass Wealth",
    stage: "I",
    expansion: "pok",
    requirement: "Spend 3 influence, 3 resources and 3 trade goods.",
  },
  {
    id: "build-defenses",
    name: "Build Defences",
    stage: "I",
    expansion: "pok",
    requirement: "Have 4 or more structures.",
  },
  {
    id: "discover-lost-outposts",
    name: "Discover Lost Outposts",
    stage: "I",
    expansion: "pok",
    requirement: "Control 2 planets that have attachments.",
  },
  {
    id: "engineer-a-marvel",
    name: "Engineer a Marvel",
    stage: "I",
    expansion: "pok",
    requirement: "Have your flagship or a war sun on the game board.",
  },
  {
    id: "explore-deep-space",
    name: "Explore Deep Space",
    stage: "I",
    expansion: "pok",
    requirement: "Have units in 3 systems that do not contain planets.",
  },
  {
    id: "improve-infrastructure",
    name: "Improve Infrastructure",
    stage: "I",
    expansion: "pok",
    requirement: "Have structures on 3 planets outside of your home system.",
  },
  {
    id: "make-history",
    name: "Make History",
    stage: "I",
    expansion: "pok",
    requirement:
      "Have units in 2 systems that contain legendary planets, Mecatol Rex or anomalies.",
  },
  {
    id: "populate-the-outer-rim",
    name: "Populate the Outer Rim",
    stage: "I",
    expansion: "pok",
    requirement:
      "Have units in 3 systems on the edge of the game board, other than your home system.",
  },
  {
    id: "push-boundaries",
    name: "Push Boundaries",
    stage: "I",
    expansion: "pok",
    requirement: "Control more planets than each of 2 of your neighbours.",
  },
  {
    id: "raise-a-fleet",
    name: "Raise a Fleet",
    stage: "I",
    expansion: "pok",
    requirement: "Have 5 or more non-fighter ships in 1 system.",
  },

  /* ------------------------------------------------ Stage II — base game */
  {
    id: "centralize-galactic-trade",
    name: "Centralize Galactic Trade",
    stage: "II",
    expansion: "base",
    requirement: "Spend 10 trade goods.",
  },
  {
    id: "command-an-armada",
    name: "Command an Armada",
    stage: "II",
    expansion: "base",
    requirement: "Have 8 or more non-fighter ships in 1 system.",
  },
  {
    id: "conquer-the-weak",
    name: "Conquer the Weak",
    stage: "II",
    expansion: "base",
    requirement: "Control 1 planet that is in another player's home system.",
  },
  {
    id: "form-galactic-brain-trust",
    name: "Form Galactic Brain Trust",
    stage: "II",
    expansion: "base",
    requirement: "Control 5 planets that have technology specialties.",
  },
  {
    id: "found-a-golden-age",
    name: "Found a Golden Age",
    stage: "II",
    expansion: "base",
    requirement: "Spend 16 resources.",
  },
  {
    id: "galvanize-the-people",
    name: "Galvanize the People",
    stage: "II",
    expansion: "base",
    requirement: "Spend a total of 6 tokens from your tactic and/or strategy pools.",
  },
  {
    id: "manipulate-galactic-law",
    name: "Manipulate Galactic Law",
    stage: "II",
    expansion: "base",
    requirement: "Spend 16 influence.",
  },
  {
    id: "master-the-sciences",
    name: "Master the Sciences",
    stage: "II",
    expansion: "base",
    requirement: "Own 2 technologies in each of 4 colours.",
  },
  {
    id: "revolutionize-warfare",
    name: "Revolutionize Warfare",
    stage: "II",
    expansion: "base",
    requirement: "Own 3 unit upgrade technologies.",
  },
  {
    id: "subdue-the-galaxy",
    name: "Subdue the Galaxy",
    stage: "II",
    expansion: "base",
    requirement: "Control 11 planets in non-home systems.",
  },
  {
    id: "unify-the-colonies",
    name: "Unify the Colonies",
    stage: "II",
    expansion: "base",
    requirement: "Control 6 planets that each have the same planet trait.",
  },

  /* ------------------------------------------- Stage II — Prophecy of Kings */
  {
    id: "achieve-supremacy",
    name: "Achieve Supremacy",
    stage: "II",
    expansion: "pok",
    requirement:
      "Have your flagship or a war sun in another player's home system or the Mecatol Rex system.",
  },
  {
    id: "become-a-legend",
    name: "Become a Legend",
    stage: "II",
    expansion: "pok",
    requirement:
      "Have units in 4 systems that contain legendary planets, Mecatol Rex or anomalies.",
  },
  {
    id: "control-the-borderlands",
    name: "Control the Borderlands",
    stage: "II",
    expansion: "pok",
    requirement:
      "Have units in 5 systems on the edge of the game board, other than your home system.",
  },
  {
    id: "hold-vast-reserves",
    name: "Hold Vast Reserves",
    stage: "II",
    expansion: "pok",
    requirement: "Spend 6 influence, 6 resources and 6 trade goods.",
  },
  {
    id: "patrol-vast-territories",
    name: "Patrol Vast Territories",
    stage: "II",
    expansion: "pok",
    requirement: "Have units in 5 systems that do not contain planets.",
  },
  {
    id: "protect-the-border",
    name: "Protect the Border",
    stage: "II",
    expansion: "pok",
    requirement: "Have structures on 5 planets outside of your home system.",
  },
  {
    id: "reclaim-ancient-monuments",
    name: "Reclaim Ancient Monuments",
    stage: "II",
    expansion: "pok",
    requirement: "Control 3 planets that have attachments.",
  },
  {
    id: "rule-distant-lands",
    name: "Rule Distant Lands",
    stage: "II",
    expansion: "pok",
    requirement:
      "Control 2 planets that are each in or adjacent to a different, other player's home system.",
  },
];

export const OBJECTIVE_BY_ID = new Map(PUBLIC_OBJECTIVES.map((o) => [o.id, o]));

/** Points a public objective is worth, by stage. */
export const STAGE_POINTS = { I: 1, II: 2 } as const;
