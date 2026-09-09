import type { Unit } from "@/lib/types";

/**
 * The standard unit line — what every faction starts from before its own
 * variants and upgrades.
 *
 * GENERATED FILE — do not hand-edit.
 * Regenerate with `npm run gen:units`.
 *
 * Scraped from the individual unit pages on the wiki. A "^" on a printed stat
 * marks one that improves on upgrade; it is dropped here because the upgrade
 * card shows the new value anyway.
 */
export const UNITS: Unit[] = [
  {
    id: "war-sun",
    name: "War Sun",
    category: "Ships",
    expansion: "base",
    requiresTechnology: true,
  },
  {
    id: "dreadnought",
    name: "Dreadnought",
    category: "Ships",
    expansion: "base",
    cost: "4",
    combat: "5",
    move: "1",
    capacity: "1",
    abilities: ["Sustain Damage","Bombardment 5"],
  },
  {
    id: "cruiser",
    name: "Cruiser",
    category: "Ships",
    expansion: "base",
    cost: "2",
    combat: "7",
    move: "2",
  },
  {
    id: "carrier",
    name: "Carrier",
    category: "Ships",
    expansion: "base",
    cost: "3",
    combat: "9",
    move: "1",
    capacity: "4",
  },
  {
    id: "destroyer",
    name: "Destroyer",
    category: "Ships",
    expansion: "base",
    cost: "1",
    combat: "9",
    move: "2",
    abilities: ["Anti-Fighter Barrage 9 (x2)"],
  },
  {
    id: "fighter",
    name: "Fighter",
    category: "Ships",
    expansion: "base",
    cost: "1 (x2)",
    combat: "9",
  },
  {
    id: "infantry",
    name: "Infantry",
    category: "Ground forces",
    expansion: "base",
    cost: "1 (x2)",
    combat: "8",
  },
  {
    id: "space-dock",
    name: "Space Dock",
    category: "Structures",
    expansion: "base",
    abilities: ["Up to 3 fighters in this system do not count against your ships' capacity.","Production (Planet +2)"],
  },
  {
    id: "pds",
    name: "PDS",
    category: "Structures",
    expansion: "base",
    abilities: ["Planetary Shield","Space Cannon 6"],
  },
];

export const UNIT_BY_ID = new Map(UNITS.map((u) => [u.id, u]));

/** Unit categories, in the order the reference shows them. */
export const UNIT_CATEGORIES = ["Ships", "Ground forces", "Structures"] as const;
