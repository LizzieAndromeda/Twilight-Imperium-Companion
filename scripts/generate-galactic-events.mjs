/**
 * Regenerates `data/galacticEvents.generated.ts` from the Twilight Imperium
 * wiki's Galactic Events page.
 *
 *   node scripts/generate-galactic-events.mjs
 *
 * Galactic Events are optional setup cards that change the rules of the whole
 * game. Codex IV introduced them; Thunder's Edge added sixteen more.
 */
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const URL =
  "https://twilight-imperium.fandom.com/api.php?action=parse&page=Galactic%20Events&prop=wikitext&format=json";

/** Section heading pattern -> our expansion id. */
const SECTIONS = [
  [/Codex IV/i, "codex4"],
  [/Thunder/i, "thundersedge"],
];

const squash = (s) => String(s ?? "").replace(/\s+/g, " ").trim();

function clean(s, { keepBreaks = false } = {}) {
  let t = String(s ?? "")
    .replace(/\[\[File:[^\]]*\]\]/gi, "")
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")
    .replace(/\[\[([^\]]+)\]\]/g, "$1")
    .replace(/\{\{[^{}]*\}\}/g, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/'''/g, "")
    .replace(/''/g, "")
    .replace(/<[^>]+>/g, " ");
  t = keepBreaks
    ? t.split("\n").map(squash).filter(Boolean).join("\n")
    : squash(t);
  return t.length ? t : null;
}

const slug = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Split wikitext into `{ heading: text }`. */
function sections(w) {
  const s = {};
  let cur = "(intro)";
  s[cur] = [];
  for (const line of w.split("\n")) {
    const m = line.match(/^(=+)([^=].*?)\1\s*$/);
    if (m) {
      cur = clean(m[2]) ?? "";
      s[cur] ??= [];
    } else s[cur].push(line);
  }
  return Object.fromEntries(Object.entries(s).map(([k, v]) => [k, v.join("\n")]));
}

/** Strip a wikitable cell's leading attributes. */
function cellContent(raw) {
  const body = raw.replace(/^\|/, "");
  const m = body.match(/^([^|\n]*=[^|\n]*)\|([\s\S]*)$/);
  return m ? m[2] : body;
}

function tableRows(text) {
  const m = text.match(/\{\|[\s\S]*?\n\|\}/);
  if (!m) return [];
  return m[0]
    .split(/\n\|-\s*\n?/)
    .slice(1)
    .map((chunk) => {
      const stop = chunk.indexOf("\n|}");
      const c = stop === -1 ? chunk : chunk.slice(0, stop);
      return c
        .split(/\n\|(?!\})/)
        .map((x) => clean(cellContent(x), { keepBreaks: true }) ?? "");
    })
    .filter((cells) => cells[0]);
}

const warnings = [];

const wikitext = await fetch(URL, {
  headers: { "User-Agent": "TI4Companion/1.0 (data generation)" },
}).then(async (r) => {
  if (!r.ok) throw new Error(`Fandom fetch failed: ${r.status}`);
  return (await r.json()).parse.wikitext["*"];
});

const s = sections(wikitext);

const events = [];
for (const [heading, text] of Object.entries(s)) {
  const match = SECTIONS.find(([re]) => re.test(heading));
  if (!match || !/Introduced/i.test(heading)) continue;
  const expansion = match[1];

  for (const [name, complexity, effect] of tableRows(text)) {
    const cleanName = squash(name);
    if (!cleanName || !effect) continue;
    const rating = Number(squash(complexity));
    if (!Number.isInteger(rating) || rating < 1 || rating > 3) {
      warnings.push(`${cleanName}: unexpected complexity "${squash(complexity)}"`);
    }
    events.push({
      id: slug(cleanName),
      name: cleanName,
      expansion,
      complexity: Number.isInteger(rating) ? rating : 2,
      // Bullet markers survive as leading asterisks; turn them into lines the
      // UI can render as a list.
      effect: effect
        .split("\n")
        .map((line) => squash(line.replace(/^\*+\s*/, "")))
        .filter(Boolean),
    });
  }
}

events.sort((a, b) => a.name.localeCompare(b.name));

const ids = new Set();
for (const e of events) {
  if (ids.has(e.id)) warnings.push(`duplicate id: ${e.id}`);
  ids.add(e.id);
}

const j = (v) => JSON.stringify(v);

const body = events
  .map(
    (e) =>
      `  {\n    id: ${j(e.id)},\n    name: ${j(e.name)},\n    expansion: ${j(e.expansion)},\n` +
      `    complexity: ${e.complexity},\n    effect: [\n${e.effect
        .map((line) => `      ${j(line)},`)
        .join("\n")}\n    ],\n  },`,
  )
  .join("\n");

const file = `import type { GalacticEvent } from "@/lib/types";

/**
 * Galactic Events — optional setup cards that change the rules of the whole
 * game. Codex IV introduced them; Thunder's Edge added sixteen more.
 *
 * GENERATED FILE — do not hand-edit.
 * Regenerate with \`npm run gen:events\`.
 *
 * Scraped from https://twilight-imperium.fandom.com/wiki/Galactic_Events.
 * \`complexity\` is the wiki's own 1-3 rating of how much the event changes.
 */
export const GALACTIC_EVENTS: GalacticEvent[] = [
${body}
];

export const GALACTIC_EVENT_BY_ID = new Map(
  GALACTIC_EVENTS.map((e) => [e.id, e]),
);
`;

const out = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "data",
  "galacticEvents.generated.ts",
);
await writeFile(out, file, "utf8");

const byExpansion = events.reduce(
  (acc, e) => ({ ...acc, [e.expansion]: (acc[e.expansion] ?? 0) + 1 }),
  {},
);
console.log(`Wrote ${events.length} galactic events ${JSON.stringify(byExpansion)}`);
if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`  - ${w}`);
}
