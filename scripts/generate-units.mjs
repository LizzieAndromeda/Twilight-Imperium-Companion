/**
 * Regenerates `data/units.generated.ts` from the wiki's per-unit pages.
 *
 *   node scripts/generate-units.mjs
 *
 * The standard unit line — what a carrier costs, what a dreadnought rolls —
 * is the most looked-up table in the game and the app only had the faction
 * variants of it. Each unit page opens with a "Base Unit" table shaped like the
 * unit upgrade tables: a labels row naming the columns and the row above it
 * holding the values.
 */
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const API = "https://twilight-imperium.fandom.com/api.php";
const UA = "TI4Companion/1.0 (data generation)";

/** [page, category, expansion] — the order is the order they are shown in. */
const UNITS = [
  ["War Sun", "Ships", "base"],
  ["Dreadnought", "Ships", "base"],
  ["Cruiser", "Ships", "base"],
  ["Carrier", "Ships", "base"],
  ["Destroyer", "Ships", "base"],
  ["Fighter", "Ships", "base"],
  ["Infantry", "Ground forces", "base"],
  ["Space Dock", "Structures", "base"],
  ["PDS", "Structures", "base"],
];

const warnings = [];

const squash = (s) => String(s ?? "").replace(/\s+/g, " ").trim();

function clean(s, { keepBreaks = false } = {}) {
  let t = String(s ?? "")
    .replace(/\[\[File:[^\]]*\]\]/gi, "")
    .replace(/\[https?:\/\/\S+\s+([^\]]*)\]/g, "$1")
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")
    .replace(/\[\[([^\]]+)\]\]/g, "$1")
    .replace(/\{\{[^{}]*\}\}/g, "")
    .replace(/<br\s*\/?>/gi, keepBreaks ? "\n" : " ")
    .replace(/'''/g, "")
    .replace(/''/g, "")
    .replace(/<[^>]+>/g, " ");
  t = keepBreaks
    ? t.split("\n").map(squash).filter(Boolean).join("\n")
    : squash(t);
  return t.length ? t : null;
}

const slug = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/**
 * A "^" on a stat means it improves when the unit is upgraded. That is already
 * visible from the upgrade card, so it is dropped from the value here.
 */
const stat = (s) => {
  const t = squash(String(s ?? "").replace(/\^/g, ""));
  // A printed dash means the unit has no value in that column — the war sun
  // has none at all until its technology is researched.
  return t && t !== "-" ? t : null;
};

function cellContent(raw) {
  const body = raw.replace(/^\|/, "");
  const m = body.match(/^([^|\n]*=[^|\n]*)\|([\s\S]*)$/);
  return m ? m[2] : body;
}

function tableRows(table) {
  return table
    .split(/\n\|-\s*\n?/)
    .slice(1)
    .map((chunk) => {
      const stop = chunk.indexOf("\n|}");
      const c = stop === -1 ? chunk : chunk.slice(0, stop);
      return c
        .split(/\n\|(?!\})/)
        .map((x) => clean(cellContent(x), { keepBreaks: true }) ?? "");
    });
}

/**
 * Read the stats out of a unit table. The row of labels identifies which row
 * holds the numbers; aligning the two from the right survives the stray cells
 * that a doubled "|-" separator leaves behind.
 */
function statsOf(table) {
  const rows = tableRows(table);
  for (let i = 1; i < rows.length; i += 1) {
    const labels = rows[i].map((c) => c.toLowerCase().replace(/[^a-z]/g, ""));
    if (!labels.includes("cost")) continue;
    const raw = rows[i - 1];
    const values =
      raw.length > labels.length ? raw.slice(raw.length - labels.length) : raw;
    const out = {};
    labels.forEach((label, idx) => {
      if (!["cost", "combat", "move", "capacity"].includes(label)) return;
      const value = stat(values[idx]);
      if (value) out[label] = value;
    });
    return Object.keys(out).length ? out : null;
  }
  return null;
}

/**
 * The wide cell in a unit table holds its printed abilities. Ships use a cell
 * spanning both columns and rows; the structures use a rowspan alone.
 */
function abilitiesOf(table) {
  const m =
    table.match(/\|\s*colspan="\d+"\s+rowspan="\d+"\s*\|([\s\S]*?)(?=\n\|)/) ??
    table.match(/\|\s*rowspan="\d+"\s*\|([\s\S]*?)(?=\n\|)/);
  const text = clean(m?.[1] ?? "", { keepBreaks: true });
  return text ? text.split("\n").map(squash).filter(Boolean) : [];
}

async function fetchPage(title) {
  const url = `${API}?action=parse&page=${encodeURIComponent(title)}&prop=wikitext&format=json&redirects=1`;
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  if (!r.ok) throw new Error(`${title}: HTTP ${r.status}`);
  const j = await r.json();
  if (j.error) throw new Error(`${title}: ${j.error.code}`);
  return j.parse.wikitext["*"];
}

/* ------------------------------------------------------------------ run */

const units = [];

for (const [page, category, expansion] of UNITS) {
  const w = await fetchPage(page);

  // The "Base Unit" section holds the printed stats; later sections are the
  // upgrade and the faction variants, which are covered elsewhere.
  const start = w.search(/^==\s*Base Unit\s*==/m);
  const region = start === -1 ? w : w.slice(start);
  if (start === -1) warnings.push(`${page}: no "Base Unit" heading, using whole page`);

  const table = region.match(/\{\|[\s\S]*?\n\|\}/)?.[0];
  if (!table) {
    warnings.push(`${page}: no stats table found`);
    continue;
  }

  const name = clean(table.match(/^!\s*colspan="\d+"[^|]*\|([\s\S]*?)(?=\n\|-)/m)?.[1] ?? page);
  const stats = statsOf(table);

  /**
   * The war sun prints *every* stat as a dash: it has no line at all until the
   * War Sun technology is researched, which is where its numbers live. So a
   * table that has a Cost column but yielded no values is that case, not a
   * parse failure — whereas a unit with only some dashes (a cruiser has no
   * capacity) parses fine.
   */
  const hasStatColumns = tableRows(table).some((row) =>
    row.some((c) => c.toLowerCase().replace(/[^a-z]/g, "") === "cost"),
  );
  const requiresTechnology = !stats && hasStatColumns;
  if (!stats && category !== "Structures" && !requiresTechnology) {
    warnings.push(`${page}: no stats parsed`);
  }

  units.push({
    id: slug(page),
    name: squash(name ?? page),
    category,
    expansion,
    ...(stats ?? {}),
    ...(requiresTechnology ? { requiresTechnology: true } : {}),
    abilities: abilitiesOf(table),
  });

  await new Promise((r) => setTimeout(r, 200));
}

// Sanity-check a couple of values that are printed on the box.
const known = { carrier: { cost: "3", capacity: "4" }, cruiser: { cost: "2", combat: "7" } };
for (const [id, expected] of Object.entries(known)) {
  const unit = units.find((u) => u.id === id);
  if (!unit) continue;
  for (const [k, v] of Object.entries(expected)) {
    if (unit[k] !== v) warnings.push(`${unit.name}: ${k} is "${unit[k]}", expected "${v}"`);
  }
}

/* ----------------------------------------------------------------- emit */

const j = (v) => JSON.stringify(v);

const body = units
  .map((u) => {
    const lines = [
      `    id: ${j(u.id)},`,
      `    name: ${j(u.name)},`,
      `    category: ${j(u.category)},`,
      `    expansion: ${j(u.expansion)},`,
    ];
    for (const key of ["cost", "combat", "move", "capacity"]) {
      if (u[key]) lines.push(`    ${key}: ${j(u[key])},`);
    }
    if (u.requiresTechnology) lines.push(`    requiresTechnology: true,`);
    if (u.abilities.length) lines.push(`    abilities: ${j(u.abilities)},`);
    return `  {\n${lines.join("\n")}\n  },`;
  })
  .join("\n");

const file = `import type { Unit } from "@/lib/types";

/**
 * The standard unit line — what every faction starts from before its own
 * variants and upgrades.
 *
 * GENERATED FILE — do not hand-edit.
 * Regenerate with \`npm run gen:units\`.
 *
 * Scraped from the individual unit pages on the wiki. A "^" on a printed stat
 * marks one that improves on upgrade; it is dropped here because the upgrade
 * card shows the new value anyway.
 */
export const UNITS: Unit[] = [
${body}
];

export const UNIT_BY_ID = new Map(UNITS.map((u) => [u.id, u]));

/** Unit categories, in the order the reference shows them. */
export const UNIT_CATEGORIES = ["Ships", "Ground forces", "Structures"] as const;
`;

await writeFile(
  join(dirname(fileURLToPath(import.meta.url)), "..", "data", "units.generated.ts"),
  file,
  "utf8",
);

console.log(`Wrote ${units.length} units`);
console.log(
  `  ${units.filter((u) => u.cost).length} with a cost, ` +
    `${units.filter((u) => u.abilities.length).length} with printed abilities`,
);
if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`  - ${w}`);
}
