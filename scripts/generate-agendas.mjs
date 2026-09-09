/**
 * Regenerates `data/agendas.generated.ts` from the wiki's Agenda Cards page.
 *
 *   node scripts/generate-agendas.mjs
 *
 * The deck is 50 cards either way: the base game has 34 laws and 16 directives,
 * and Prophecy of Kings removes 13 of them while adding 13 of its own. The
 * removed ones are kept in the data and flagged, so the app can hide them only
 * when Prophecy of Kings is actually switched on.
 */
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const URL =
  "https://twilight-imperium.fandom.com/api.php?action=parse&page=Agenda%20Cards&prop=wikitext&format=json";

const warnings = [];

/** How the base tables mark a card that Prophecy of Kings takes out of the deck. */
const REMOVED_MARK = /\s*\(\s*removed in (?:PoK|Prophecy of Kings)\s*\)\s*$/i;

/**
 * Representative Government exists in both decks with different text, so the
 * wiki disambiguates the base one as "Representative Government (TI4)". That
 * suffix is not part of the printed card name.
 */
const DISAMBIGUATOR = /\s*\(\s*(?:TI4|Base Game)\s*\)\s*$/i;

const squash = (s) => String(s ?? "").replace(/\s+/g, " ").trim();

function clean(s) {
  const t = squash(
    String(s ?? "")
      .replace(/\[\[File:[^\]]*\]\]/gi, "")
      .replace(/<nowiki>([\s\S]*?)<\/nowiki>/gi, "$1")
      .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")
      .replace(/\[\[([^\]]+)\]\]/g, "$1")
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

/** Split wikitext into an ordered list of sections. */
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

/** A wikitable cell may carry attributes before a second pipe. */
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
      return c.split(/\n\|(?!\})/).map((x) => clean(cellContent(x)) ?? "");
    })
    .filter((cells) => cells.some(Boolean));
}

/** "FOR: …" / "AGAINST: …", or a single unlabelled effect. */
function toOutcome(text) {
  const m = text.match(/^(FOR|AGAINST)\s*:\s*([\s\S]*)$/i);
  if (m) return { label: m[1].toUpperCase(), text: squash(m[2]) };
  return { label: null, text: squash(text) };
}

/** "-" in the elect column means the agenda is a plain for/against vote. */
const electOf = (cell) => {
  const t = squash(cell);
  return !t || t === "-" ? null : t;
};

/**
 * Parse one agenda table.
 *
 * Cards with both a FOR and an AGAINST outcome use rowspan on the name (and
 * type, and elect) columns, so the follow-up row carries only the second
 * outcome and belongs to the card above it.
 */
function parseTable(text, { expansion, kind: fixedKind }) {
  const out = [];
  for (const row of tableRows(text)) {
    const cells = row.filter((c) => c !== "");

    // A continuation row is a single cell: the card's other outcome.
    if (cells.length === 1 && out.length) {
      out[out.length - 1].outcomes.push(toOutcome(cells[0]));
      continue;
    }
    if (!row[0]) continue;

    // Base tables are Name | Elect | Effect; the Prophecy of Kings table adds
    // a Type column between the name and the elect.
    const hasTypeColumn = !fixedKind;
    const name = squash(row[0]);
    const kind = hasTypeColumn
      ? /directive/i.test(row[1] ?? "")
        ? "Directive"
        : "Law"
      : fixedKind;
    const elect = electOf(row[hasTypeColumn ? 2 : 1] ?? "");
    const effect = row[hasTypeColumn ? 3 : 2] ?? "";

    if (!effect) {
      warnings.push(`${name}: no effect text`);
      continue;
    }
    // The base tables annotate the cards Prophecy of Kings drops, as in
    // "Core Mining (removed in PoK)". Strip that out of the name and keep it
    // as a flag; the same information also appears as a bullet list further
    // down the page, and the two are cross-checked below.
    const removedInline = REMOVED_MARK.test(name);
    out.push({
      name: squash(name.replace(REMOVED_MARK, "").replace(DISAMBIGUATOR, "")),
      kind,
      elect,
      expansion,
      outcomes: [toOutcome(effect)],
      removedInline,
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
const find = (re) => sections.find((s) => re.test(s.heading));

const agendas = [
  ...parseTable(find(/^Laws$/i)?.text ?? "", {
    expansion: "base",
    kind: "Law",
  }),
  ...parseTable(find(/^Directives$/i)?.text ?? "", {
    expansion: "base",
    kind: "Directive",
  }),
  ...parseTable(find(/^New Agendas$/i)?.text ?? "", { expansion: "pok" }),
];

// The removed list is a plain bullet list of base card names.
const removed = new Set(
  (find(/^Removed Agendas$/i)?.text ?? "")
    .split("\n")
    .map((line) => line.match(/^\*\s*(.+)$/)?.[1])
    .filter(Boolean)
    .map((name) => squash(clean(name).replace(/\([^)]*\)\s*$/, "")))
    .map((name) => slug(name)),
);

/**
 * The page states which cards Prophecy of Kings removes twice — inline in the
 * base tables and as a bullet list. Take the union, and report anything the
 * two disagree on rather than silently trusting one.
 */
for (const agenda of agendas) {
  agenda.id = slug(agenda.name);
  if (agenda.expansion !== "base") {
    delete agenda.removedInline;
    continue;
  }
  const inList = removed.has(agenda.id);
  if (agenda.removedInline !== inList) {
    warnings.push(
      `${agenda.name}: marked removed ${agenda.removedInline ? "inline only" : "in the list only"}`,
    );
  }
  if (agenda.removedInline || inList) agenda.removedByPok = true;
  delete agenda.removedInline;
}

// Prophecy of Kings reprints Representative Government under the same name, so
// the two need distinct ids even though only one is ever in play at a time.
const seen = new Map();
for (const agenda of agendas) {
  if (!seen.has(agenda.id)) {
    seen.set(agenda.id, agenda);
    continue;
  }
  agenda.id = `${agenda.id}-${agenda.expansion}`;
  if (seen.has(agenda.id)) warnings.push(`duplicate id after suffixing: ${agenda.id}`);
  seen.set(agenda.id, agenda);
}

for (const id of removed) {
  if (!agendas.some((a) => a.id === id || a.id.startsWith(`${id}-`))) {
    warnings.push(`removed-agenda name matches no card: ${id}`);
  }
}

const counts = agendas.reduce(
  (acc, a) => ({ ...acc, [`${a.expansion}/${a.kind}`]: (acc[`${a.expansion}/${a.kind}`] ?? 0) + 1 }),
  {},
);
const baseTotal = agendas.filter((a) => a.expansion === "base").length;
const pokTotal =
  agendas.filter((a) => a.expansion === "pok").length +
  agendas.filter((a) => a.expansion === "base" && !a.removedByPok).length;
if (baseTotal !== 50) warnings.push(`base deck is ${baseTotal}, expected 50`);
if (pokTotal !== 50) warnings.push(`Prophecy of Kings deck is ${pokTotal}, expected 50`);

agendas.sort(
  (a, b) => a.kind.localeCompare(b.kind) || a.name.localeCompare(b.name),
);

/* ----------------------------------------------------------------- emit */

const j = (v) => JSON.stringify(v);

const body = agendas
  .map((a) => {
    const lines = [
      `    id: ${j(a.id)},`,
      `    name: ${j(a.name)},`,
      `    kind: ${j(a.kind)},`,
      `    expansion: ${j(a.expansion)},`,
      `    elect: ${a.elect ? j(a.elect) : "null"},`,
      `    outcomes: [\n${a.outcomes
        .map((o) => `      { label: ${o.label ? j(o.label) : "null"}, text: ${j(o.text)} },`)
        .join("\n")}\n    ],`,
    ];
    if (a.removedByPok) lines.push(`    removedByPok: true,`);
    return `  {\n${lines.join("\n")}\n  },`;
  })
  .join("\n");

const file = `import type { Agenda } from "@/lib/types";

/**
 * The agenda deck.
 *
 * GENERATED FILE — do not hand-edit.
 * Regenerate with \`npm run gen:agendas\`.
 *
 * Scraped from https://twilight-imperium.fandom.com/wiki/Agenda_Cards.
 *
 * The deck is 50 cards with or without Prophecy of Kings: it removes 13 base
 * agendas and adds 13 of its own. Cards it removes are kept here and marked
 * \`removedByPok\`, so they can be hidden only when that expansion is enabled.
 */
export const AGENDAS: Agenda[] = [
${body}
];

export const AGENDA_BY_ID = new Map(AGENDAS.map((a) => [a.id, a]));
`;

await writeFile(
  join(dirname(fileURLToPath(import.meta.url)), "..", "data", "agendas.generated.ts"),
  file,
  "utf8",
);

console.log(`Wrote ${agendas.length} agendas ${JSON.stringify(counts)}`);
console.log(
  `  base deck ${baseTotal}, Prophecy of Kings deck ${pokTotal}, ` +
    `${agendas.filter((a) => a.removedByPok).length} removed by PoK, ` +
    `${agendas.filter((a) => a.elect).length} elect an outcome`,
);
if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`  - ${w}`);
}
