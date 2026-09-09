/**
 * Regenerates `data/exploration.generated.ts` from the wiki's Exploration page.
 *
 *   node scripts/generate-exploration.mjs
 *
 * Two decks come off this page: the exploration cards you draw when you take a
 * planet (cultural, industrial, hazardous) or reach a frontier token, and the
 * relics you get for purging three matching fragments.
 *
 * The page states how many relics each product introduced in its own prose, so
 * those sentences are parsed and used to check the scrape rather than trusted
 * blindly.
 */
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const URL =
  "https://twilight-imperium.fandom.com/api.php?action=parse&page=Exploration&prop=wikitext&format=json&redirects=1";

const warnings = [];

/** Heading pattern -> our expansion id. */
const EXPANSION_OF = [
  [/Codex II\b/i, "codex2"],
  [/Codex III/i, "codex3"],
  [/Codex IV/i, "codex4"],
  [/Thunder/i, "thundersedge"],
  [/Prophecy of Kings/i, "pok"],
];

const squash = (s) => String(s ?? "").replace(/\s+/g, " ").trim();

function clean(s) {
  const t = squash(
    String(s ?? "")
      .replace(/\[\[File:[^\]]*\]\]/gi, "")
      .replace(/\[https?:\/\/\S+\s+([^\]]*)\]/g, "$1")
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

const slug = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Ordered sections with their heading level, headings left raw for matching. */
function sectionList(w) {
  const out = [];
  let cur = { level: 0, raw: "(intro)", heading: "(intro)", lines: [] };
  for (const line of w.split("\n")) {
    const m = line.match(/^(=+)([^=].*?)\1\s*$/);
    if (m) {
      out.push(cur);
      cur = {
        level: m[1].length,
        raw: m[2],
        heading: clean(m[2]) ?? "",
        lines: [],
      };
    } else cur.lines.push(line);
  }
  out.push(cur);
  return out.map((s) => ({ ...s, text: s.lines.join("\n") }));
}

function cellContent(raw) {
  const body = raw.replace(/^\|/, "");
  const m = body.match(/^([^|\n]*=[^|\n]*)\|([\s\S]*)$/);
  return m ? m[2] : body;
}

function rawRows(text) {
  const m = text.match(/\{\|[\s\S]*?\n\|\}/);
  if (!m) return [];
  return m[0]
    .split(/\n\|-\s*\n?/)
    .slice(1)
    .map((chunk) => {
      const stop = chunk.indexOf("\n|}");
      const c = stop === -1 ? chunk : chunk.slice(0, stop);
      return c.split(/\n\|(?!\})/).map((x) => cellContent(x));
    })
    .filter((cells) => clean(cells[0]));
}

function tableRows(text) {
  return rawRows(text).map((cells) => cells.map((c) => clean(c) ?? ""));
}

/**
 * Some relics were reprinted with new wording, and the row's name cell names
 * the product that reprinted it. Read that before the markup is stripped.
 */
const EDITION_TO_EXPANSION = {
  "prophecy of kings": "pok",
  "codex i": "codex1",
  "codex ii": "codex2",
  "codex iii": "codex3",
  "codex iv": "codex4",
  "thunder's edge": "thundersedge",
};

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
  return (await r.json()).parse.wikitext["*"];
});

const sections = sectionList(wikitext);

const cards = [];
const relics = [];

/** Which top-level part of the page we are inside. */
let area = null;
/** For relics, the product heading currently in force. */
let relicExpansion = null;
let deck = null;
let deckExpansion = "pok";

for (const s of sections) {
  if (s.level === 2) {
    if (/List of Exploration and Frontier Cards/i.test(s.heading)) area = "cards";
    else if (/^Relics$/i.test(s.heading)) area = "relics";
    else area = null;
    deck = null;
    relicExpansion = null;
  }

  if (area === "cards") {
    const deckMatch = s.heading.match(
      /^(Cultural|Industrial|Hazardous|Frontier)\b/i,
    );
    if (s.level === 3 && deckMatch) {
      deck = deckMatch[1][0].toUpperCase() + deckMatch[1].slice(1).toLowerCase();
      // The three planet decks are all Prophecy of Kings; the frontier deck is
      // split by product in level-4 subheadings below.
      deckExpansion = "pok";
    }
    if (s.level === 4) {
      deckExpansion = EXPANSION_OF.find(([re]) => re.test(s.raw))?.[1] ?? "pok";
    }
    if (!deck) continue;

    for (const [name, copies, effect] of tableRows(s.text)) {
      if (!name || !effect) continue;
      const count = Number(squash(copies));
      if (!Number.isInteger(count)) {
        warnings.push(`${name}: unexpected deck count "${copies}"`);
      }
      cards.push({
        id: slug(`${deck}-${name}`),
        name: squash(name),
        deck,
        copies: Number.isInteger(count) ? count : 1,
        text: squash(effect),
        expansion: deckExpansion,
        // Some exploration cards are the relic fragments themselves.
        fragment: /relic fragment/i.test(name) || /relic fragment/i.test(effect),
      });
    }
  }

  if (area === "relics") {
    if (s.level === 3) {
      relicExpansion = EXPANSION_OF.find(([re]) => re.test(s.raw))?.[1] ?? null;
      if (!relicExpansion) {
        warnings.push(`relic section "${s.heading}" has no recognised product`);
        relicExpansion = "pok";
      }

      const rows = rawRows(s.text).filter((r) => clean(r[0]) && clean(r[1]));
      let added = 0;

      for (const row of rows) {
        // A reprint repeats the relic's name with a different edition marker,
        // so it becomes a revision of the existing relic rather than a second
        // relic with a duplicate id.
        const printing = editionOf(row[0]);
        const name = squash(clean(row[0]) ?? "");
        const text = squash(clean(row[1]) ?? "");
        if (!name || !text) continue;

        const existing = relics.find((r) => r.name === name);
        if (existing) {
          existing.revisions.push({
            expansion: printing ?? relicExpansion,
            text,
          });
          continue;
        }
        relics.push({
          id: slug(name),
          name,
          text,
          expansion: printing ?? relicExpansion,
          revisions: [],
        });
        added += 1;
      }

      // "These 10 Relics were introduced in …" — check the scrape against it.
      // The count is of relics, not table rows, which is why reprints have to
      // be collapsed first.
      const stated = clean(s.text)?.match(/These\s+(\d+)\s+Relics/i);
      if (stated && Number(stated[1]) !== added) {
        warnings.push(
          `${s.heading}: page says ${stated[1]} relics, scraped ${added}`,
        );
      }
    }
  }
}

for (const [label, list] of [
  ["exploration card", cards],
  ["relic", relics],
]) {
  const seen = new Set();
  for (const item of list) {
    if (seen.has(item.id)) warnings.push(`duplicate ${label} id: ${item.id}`);
    seen.add(item.id);
  }
}
if (!cards.length) warnings.push("no exploration cards parsed");
if (!relics.length) warnings.push("no relics parsed");

cards.sort((a, b) => a.deck.localeCompare(b.deck) || a.name.localeCompare(b.name));
relics.sort((a, b) => a.name.localeCompare(b.name));

/* ----------------------------------------------------------------- emit */

const j = (v) => JSON.stringify(v);

const cardBody = cards
  .map((c) => {
    const lines = [
      `    id: ${j(c.id)},`,
      `    name: ${j(c.name)},`,
      `    deck: ${j(c.deck)},`,
      `    expansion: ${j(c.expansion)},`,
      `    copies: ${c.copies},`,
      `    text: ${j(c.text)},`,
    ];
    if (c.fragment) lines.push(`    fragment: true,`);
    return `  {\n${lines.join("\n")}\n  },`;
  })
  .join("\n");

const relicBody = relics
  .map((r) => {
    const lines = [
      `    id: ${j(r.id)},`,
      `    name: ${j(r.name)},`,
      `    expansion: ${j(r.expansion)},`,
      `    text: ${j(r.text)},`,
    ];
    if (r.revisions.length) {
      lines.push(
        `    revisions: [\n${r.revisions
          .map(
            (v) =>
              `      { expansion: ${j(v.expansion)}, text: ${j(v.text)} },`,
          )
          .join("\n")}\n    ],`,
      );
    }
    return `  {\n${lines.join("\n")}\n  },`;
  })
  .join("\n");

const file = `import type { ExplorationCard, Relic } from "@/lib/types";

/**
 * Exploration cards and relics.
 *
 * GENERATED FILE — do not hand-edit.
 * Regenerate with \`npm run gen:exploration\`.
 *
 * Scraped from https://twilight-imperium.fandom.com/wiki/Exploration.
 *
 * \`copies\` is how many of that card are in its deck. \`fragment\` marks the
 * cards that are relic fragments rather than an immediate effect — three
 * matching fragments buy a relic.
 */
export const EXPLORATION_CARDS: ExplorationCard[] = [
${cardBody}
];

export const RELICS: Relic[] = [
${relicBody}
];

export const EXPLORATION_CARD_BY_ID = new Map(
  EXPLORATION_CARDS.map((c) => [c.id, c]),
);
export const RELIC_BY_ID = new Map(RELICS.map((r) => [r.id, r]));

/** The four exploration decks, in the order the wiki lists them. */
export const EXPLORATION_DECKS = [
  "Cultural",
  "Industrial",
  "Hazardous",
  "Frontier",
] as const;
`;

await writeFile(
  join(dirname(fileURLToPath(import.meta.url)), "..", "data", "exploration.generated.ts"),
  file,
  "utf8",
);

const by = (list, key) =>
  list.reduce((acc, x) => ({ ...acc, [x[key]]: (acc[x[key]] ?? 0) + 1 }), {});

console.log(
  `Wrote ${cards.length} exploration cards ${JSON.stringify(by(cards, "deck"))}`,
);
console.log(
  `      ${cards.reduce((n, c) => n + c.copies, 0)} physical cards, ` +
    `${cards.filter((c) => c.fragment).length} are relic fragments`,
);
console.log(`      ${relics.length} relics ${JSON.stringify(by(relics, "expansion"))}`);
if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`  - ${w}`);
}
