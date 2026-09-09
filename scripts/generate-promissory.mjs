/**
 * Regenerates `data/promissory.generated.ts` from the wiki's Promissory Notes
 * page.
 *
 *   node scripts/generate-promissory.mjs
 *
 * Only the five general notes — the ones every player has a copy of in their
 * own colour. Faction-specific notes already come off the faction pages via
 * `gen:factions`, so scraping them again here would only create a second
 * source to keep in step.
 */
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const URL =
  "https://twilight-imperium.fandom.com/api.php?action=parse&page=Promissory%20Notes&prop=wikitext&format=json&redirects=1";

const warnings = [];

/** The five general notes, in the order the page lists them. */
const EXPECTED = [
  "Ceasefire",
  "Trade Agreement",
  "Political Secret",
  "Support for the Throne",
  "Alliance",
];

const EDITION_TO_EXPANSION = {
  "base game": "base",
  "prophecy of kings": "pok",
  "codex i": "codex1",
  "codex ii": "codex2",
  "codex iii": "codex3",
  "codex iv": "codex4",
  "thunder's edge": "thundersedge",
};

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

function editionOf(raw) {
  const m = String(raw ?? "").match(/\{\{Edition\|([^}|]+)/i);
  if (!m) return null;
  const key = squash(m[1]).toLowerCase().replace(/[‘’]/g, "'");
  const expansion = EDITION_TO_EXPANSION[key];
  if (!expansion) warnings.push(`unrecognised edition marker "${m[1]}"`);
  return expansion ?? null;
}

/* ------------------------------------------------------------------ run */

const wikitext = await fetch(URL, {
  headers: { "User-Agent": "TI4Companion/1.0 (data generation)" },
}).then(async (r) => {
  if (!r.ok) throw new Error(`Fandom fetch failed: ${r.status}`);
  // Headings on this page contain non-breaking spaces, which a literal space
  // in a pattern will not match. Normalise them before anything looks at it.
  return (await r.json()).parse.wikitext["*"].replace(/ /g, " ");
});

// Everything between the general section and the faction-specific one.
const start = wikitext.search(/^==\s*General Promissory Notes\s*==/m);
const end = wikitext.search(/^==\s*.*Faction-Specific Promissory Notes/m);
if (start === -1) throw new Error("could not find the general notes section");
const region = wikitext.slice(start, end === -1 ? undefined : end);

const notes = [];
// Exactly three "=" a side: a level-4 heading would otherwise match this too,
// since its outer "=" just look like part of the title.
const blocks = region.split(/^===(?!=)\s*(.+?)\s*(?<!=)===\s*$/m);
for (let i = 1; i < blocks.length; i += 2) {
  const rawHeading = blocks[i];
  const name = clean(rawHeading);
  const body = clean(blocks[i + 1] ?? "", { keepBreaks: true });
  if (!name || !body) continue;

  notes.push({
    id: slug(name),
    name,
    // "Alliance" arrived with Prophecy of Kings and says so in its heading.
    expansion: editionOf(rawHeading) ?? "base",
    text: body,
  });
}

// The five general notes are a fixed set; anything else means the page moved.
for (const name of EXPECTED) {
  if (!notes.some((n) => n.name === name)) warnings.push(`missing note: ${name}`);
}
for (const note of notes) {
  if (!EXPECTED.includes(note.name)) {
    warnings.push(`unexpected note in the general section: ${note.name}`);
  }
}

/* ----------------------------------------------------------------- emit */

const j = (v) => JSON.stringify(v);

const body = notes
  .map(
    (n) =>
      `  {\n    id: ${j(n.id)},\n    name: ${j(n.name)},\n` +
      `    expansion: ${j(n.expansion)},\n    text: ${j(n.text)},\n  },`,
  )
  .join("\n");

const file = `import type { PromissoryNote } from "@/lib/types";

/**
 * The five general promissory notes — the ones every player holds in their own
 * colour, as opposed to the faction-specific note on each faction sheet.
 *
 * GENERATED FILE — do not hand-edit.
 * Regenerate with \`npm run gen:promissory\`.
 *
 * Scraped from https://twilight-imperium.fandom.com/wiki/Promissory_Notes.
 * The text refers to "the (color) player" — that is the note's owner, the
 * player whose colour is printed on it.
 */
export const PROMISSORY_NOTES: PromissoryNote[] = [
${body}
];

export const PROMISSORY_NOTE_BY_ID = new Map(
  PROMISSORY_NOTES.map((n) => [n.id, n]),
);
`;

await writeFile(
  join(dirname(fileURLToPath(import.meta.url)), "..", "data", "promissory.generated.ts"),
  file,
  "utf8",
);

console.log(`Wrote ${notes.length} general promissory notes`);
console.log(`  ${notes.map((n) => `${n.name} (${n.expansion})`).join(", ")}`);
if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`  - ${w}`);
}
