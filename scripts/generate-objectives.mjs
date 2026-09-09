/**
 * Regenerates `data/objectives.generated.ts` from the wiki's Objectives page.
 *
 *   node scripts/generate-objectives.mjs
 *
 * Produces both decks: public objectives (Stage I and II) and secret
 * objectives (grouped by the phase they can be scored in). Ids are slugs of
 * the card name — the tracker stores `objectiveId` against a revealed
 * objective, so an id must stay stable once shipped. The script prints a
 * warning if a previously shipped id disappears.
 */
import { writeFile, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const URL =
  "https://twilight-imperium.fandom.com/api.php?action=parse&page=Objectives&prop=wikitext&format=json";

/** Sub-heading pattern -> our expansion id. */
const PRODUCTS = [
  [/Prophecy of Kings/i, "pok"],
  [/Twilight Imperium Fourth Edition/i, "base"],
];

const squash = (s) => String(s ?? "").replace(/\s+/g, " ").trim();

function clean(s) {
  const t = squash(
    String(s ?? "")
      .replace(/\[\[File:[^\]]*\]\]/gi, "")
      .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")
      .replace(/\[\[([^\]]+)\]\]/g, "$1")
      .replace(/\{\{Edition\|([^}]*)\}\}/gi, "")
      .replace(/\{\{[^{}]*\}\}/g, "")
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/'''/g, "")
      .replace(/''/g, "")
      .replace(/<[^>]+>/g, " "),
  );
  return t.length ? t : null;
}

const slug = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Split wikitext into an ordered list of `{ level, heading, text }`. */
function sectionList(w) {
  const out = [];
  let cur = { level: 0, heading: "(intro)", lines: [] };
  for (const line of w.split("\n")) {
    const m = line.match(/^(=+)([^=].*?)\1\s*$/);
    if (m) {
      out.push(cur);
      cur = { level: m[1].length, heading: clean(m[2]) ?? "", lines: [] };
    } else cur.lines.push(line);
  }
  out.push(cur);
  return out.map((s) => ({ ...s, text: s.lines.join("\n") }));
}

/** Strip a wikitable cell's leading attributes. */
function cellContent(raw) {
  const body = raw.replace(/^\|/, "");
  const m = body.match(/^([^|\n]*=[^|\n]*)\|([\s\S]*)$/);
  return m ? m[2] : body;
}

/**
 * Rows of the first table, keeping raw cells so the caller can spot the
 * rowspan continuation rows that carry Omega revisions.
 */
function tableRows(text) {
  const m = text.match(/\{\|[\s\S]*?\n\|\}/);
  if (!m) return [];
  return m[0]
    .split(/\n\|-\s*\n?/)
    .slice(1)
    .map((chunk) => {
      const stop = chunk.indexOf("\n|}");
      const c = stop === -1 ? chunk : chunk.slice(0, stop);
      return c.split(/\n\|(?!\})/).map((x) => clean(cellContent(x)) ?? "");
    })
    .filter((cells) => cells.some(Boolean));
}

const warnings = [];

/**
 * Parse one product table.
 *
 * Where a card has a Codex III revision, the name and points cells use
 * rowspan, so the follow-up row carries only the revised condition. That
 * revision is attached to the card above it rather than becoming a new entry.
 */
function parseTable(text, expansion, extra) {
  const out = [];
  for (const row of tableRows(text)) {
    const [first, second] = row;
    if (!first) continue;

    // A continuation row has a single cell: the Omega condition.
    const isContinuation = row.filter(Boolean).length === 1 && out.length > 0;
    if (isContinuation) {
      const revision = first.replace(/^Ω\s*:?\s*/, "").trim();
      if (revision) out[out.length - 1].omega = revision;
      continue;
    }
    if (!second) continue;

    // Omega text sometimes lands in the condition cell of its own row.
    if (/^Ω\s*:?/.test(second) && out.length > 0) {
      out[out.length - 1].omega = second.replace(/^Ω\s*:?\s*/, "").trim();
      continue;
    }

    out.push({
      id: slug(first),
      name: first,
      expansion,
      requirement: second,
      ...extra,
    });
  }
  return out;
}

/* ------------------------------------------------------------------ run */

const wikitext = await fetch(URL, {
  headers: { "User-Agent": "TI4Companion/1.0 (data generation)" },
}).then(async (r) => {
  if (!r.ok) throw new Error(`Fandom fetch failed: ${r.status}`);
  return (await r.json()).parse.wikitext["*"];
});

const sections = sectionList(wikitext);

const publics = [];
const secrets = [];

// Track the enclosing headings as we walk down the document.
let deck = null; // "public" | "secret"
let group = null; // "I" | "II" for public; phase name for secret

for (const s of sections) {
  if (/^Public Objectives$/i.test(s.heading)) {
    deck = "public";
    group = null;
    continue;
  }
  if (/^Secret Objectives$/i.test(s.heading)) {
    deck = "secret";
    group = null;
    continue;
  }
  if (/^FAQ$/i.test(s.heading)) {
    deck = null;
    continue;
  }
  if (!deck) continue;

  if (deck === "public" && /^Stage (I|II) Objectives$/i.test(s.heading)) {
    group = s.heading.match(/^Stage (I{1,2})/i)[1].toUpperCase();
    continue;
  }
  if (deck === "secret" && /^(Action|Status|Agenda) Phase$/i.test(s.heading)) {
    group = s.heading.replace(/ Phase$/i, "");
  }

  if (!group) continue;

  // A product sub-heading, or a phase heading that holds its table directly
  // (the agenda phase has no per-product split).
  const product = PRODUCTS.find(([re]) => re.test(s.heading));
  const expansion = product ? product[1] : "base";
  if (!product && !/^(Action|Status|Agenda) Phase$/i.test(s.heading)) continue;
  if (!/\{\|/.test(s.text)) continue;

  if (deck === "public") {
    publics.push(...parseTable(s.text, expansion, { stage: group }));
  } else {
    secrets.push(...parseTable(s.text, expansion, { phase: group }));
  }
}

publics.sort((a, b) => a.stage.localeCompare(b.stage) || a.name.localeCompare(b.name));
secrets.sort((a, b) => a.name.localeCompare(b.name));

// Ids must be unique within each deck.
for (const [label, list] of [
  ["public", publics],
  ["secret", secrets],
]) {
  const seen = new Set();
  for (const o of list) {
    if (seen.has(o.id)) warnings.push(`duplicate ${label} id: ${o.id}`);
    seen.add(o.id);
  }
}

// A shipped id vanishing would orphan saved games that reference it.
try {
  const previous = await readFile(
    join(dirname(fileURLToPath(import.meta.url)), "..", "data", "objectives.ts"),
    "utf8",
  );
  const oldIds = [...previous.matchAll(/^    id: "([^"]+)",$/gm)].map((m) => m[1]);
  const nowIds = new Set(publics.map((o) => o.id));
  for (const id of oldIds) {
    if (!nowIds.has(id)) warnings.push(`previously shipped public id is gone: ${id}`);
  }
} catch {
  // First run, or the file has already been replaced — nothing to compare.
}

/* ----------------------------------------------------------------- emit */

const j = (v) => JSON.stringify(v);

const render = (o, extraKey) => {
  const lines = [
    `    id: ${j(o.id)},`,
    `    name: ${j(o.name)},`,
    `    expansion: ${j(o.expansion)},`,
    `    ${extraKey}: ${j(o[extraKey])},`,
    `    requirement: ${j(o.requirement)},`,
  ];
  if (o.omega) lines.push(`    omega: ${j(o.omega)},`);
  return `  {\n${lines.join("\n")}\n  },`;
};

const file = `import type { PublicObjective, SecretObjective } from "@/lib/types";

/**
 * The objective decks.
 *
 * GENERATED FILE — do not hand-edit.
 * Regenerate with \`npm run gen:objectives\`.
 *
 * Scraped from https://twilight-imperium.fandom.com/wiki/Objectives.
 * \`omega\` holds a Codex III revision of the card's requirement, where one
 * exists — the card is the same card, so it keeps one entry and one id.
 */
export const PUBLIC_OBJECTIVES: PublicObjective[] = [
${publics.map((o) => render(o, "stage")).join("\n")}
];

export const SECRET_OBJECTIVES: SecretObjective[] = [
${secrets.map((o) => render(o, "phase")).join("\n")}
];
`;

await writeFile(
  join(dirname(fileURLToPath(import.meta.url)), "..", "data", "objectives.generated.ts"),
  file,
  "utf8",
);

const count = (list, key) =>
  list.reduce((acc, o) => ({ ...acc, [o[key]]: (acc[o[key]] ?? 0) + 1 }), {});

console.log(
  `Wrote ${publics.length} public objectives ${JSON.stringify(count(publics, "stage"))} ` +
    `${JSON.stringify(count(publics, "expansion"))}`,
);
console.log(
  `      ${secrets.length} secret objectives ${JSON.stringify(count(secrets, "phase"))} ` +
    `${JSON.stringify(count(secrets, "expansion"))}`,
);
console.log(
  `      ${[...publics, ...secrets].filter((o) => o.omega).length} with Codex III revisions`,
);
if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`  - ${w}`);
}
