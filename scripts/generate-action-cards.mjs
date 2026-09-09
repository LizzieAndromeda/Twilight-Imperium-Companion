/**
 * Regenerates `data/actionCards.ts` from two public sources.
 *
 *   node scripts/generate-action-cards.mjs
 *
 * 1. The AsyncTI4 map generator bot's game data (public domain) is the
 *    authority for the base game, Prophecy of Kings and Codex I. It carries
 *    stable card aliases, timing phases and community clarification notes.
 *
 * 2. The Twilight Imperium Fandom wiki supplies Thunder's Edge (2025), its
 *    Omega replacements for eight Codex I cards, the Twilight's Fall mode
 *    deck, and the official FAQ rulings — none of which appear in (1).
 *
 * The script cross-checks the two sources on the decks they share and prints
 * any disagreement rather than silently preferring one.
 */
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ASYNC_URL =
  "https://raw.githubusercontent.com/AsyncTI4/TI4_map_generator_bot/master/src/main/resources/data/action_cards/action_cards.json";
const WIKI_URL =
  "https://twilight-imperium.fandom.com/api.php?action=parse&page=Action_Cards&prop=wikitext&format=json";

/**
 * Upstream `source` values we carry from AsyncTI4.
 *
 * "asteroid" is excluded: it is a variant deck composition whose entries all
 * repeat cards already present under base, pok or codex1.
 */
const ASYNC_SOURCES = { base: "base", pok: "pok", codex1: "codex1" };

/** Wiki section heading -> our expansion id. */
const WIKI_SECTIONS = {
  "Twilight Imperium Fourth Edition": "base",
  "Codex I": "codex1",
  "Prophecy of Kings": "pok",
  "Thunder's Edge": "thundersedge",
  "Thunder's Edge Updated": "thundersedge",
  "Twilight's Fall Variant": "twilightsfall",
};

/** Sections the wiki is the only source for. */
const WIKI_ONLY = new Set(["thundersedge", "twilightsfall"]);

const squash = (s) => String(s ?? "").replace(/\s+/g, " ").trim();

const clean = (s) => {
  const t = squash(
    String(s ?? "")
      .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")
      .replace(/\[\[([^\]]+)\]\]/g, "$1")
      .replace(/'''/g, "")
      .replace(/''/g, "")
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<[^>]+>/g, "")
      .replace(/\{\{[^}]*\}\}/g, ""),
  );
  return t.length ? t : null;
};

const slug = (name) =>
  name
    .toLowerCase()
    .replace(/Ω/g, "-omega")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Normalised key for comparing card names across sources. */
const key = (name) =>
  name
    .toLowerCase()
    .replace(/Ω/g, "")
    .replace(/[^a-z0-9]/g, "");

/** Derive the timing phase from a printed "Play" line. */
function phaseFromWindow(window) {
  const w = window.toLowerCase();
  if (/\bagenda\b/.test(w)) return "Agenda";
  if (/status phase/.test(w)) return "Status";
  if (/strategy phase/.test(w)) return "Strategy";
  return "Action";
}

/* --------------------------------------------------------------- sources */

const asyncRaw = await fetch(ASYNC_URL).then((r) => {
  if (!r.ok) throw new Error(`AsyncTI4 fetch failed: ${r.status}`);
  return r.json();
});

const wikiText = await fetch(WIKI_URL, {
  headers: { "User-Agent": "TI4Companion/1.0 (data generation)" },
}).then(async (r) => {
  if (!r.ok) throw new Error(`Fandom fetch failed: ${r.status}`);
  return (await r.json()).parse.wikitext["*"];
});

/* ------------------------------------------------------- parse AsyncTI4 */

const asyncCards = new Map(); // expansion|nameKey -> record
for (const c of asyncRaw) {
  const expansion = ASYNC_SOURCES[c.source];
  if (!expansion) continue;
  const k = `${expansion}|${key(c.name)}`;
  if (!asyncCards.has(k)) {
    asyncCards.set(k, {
      id: c.alias,
      name: clean(c.name),
      expansion,
      phase: clean(c.phase) ?? "Action",
      window: clean(c.window) ?? "",
      text: clean(c.text) ?? "",
      flavor: clean(c.flavorText),
      note: clean(c.notes),
      copies: 0,
    });
  }
  asyncCards.get(k).copies += 1;
}

/* ----------------------------------------------------------- parse wiki */

/** Split the wikitext into `{ heading, text }` sections. */
function sections(text) {
  const out = [];
  let cur = { heading: "(intro)", lines: [] };
  for (const line of text.split("\n")) {
    const m = line.match(/^(=+)([^=].*?)\1\s*$/);
    if (m) {
      out.push(cur);
      cur = { heading: clean(m[2]) ?? "", lines: [] };
    } else cur.lines.push(line);
  }
  out.push(cur);
  return out.map((s) => ({ heading: s.heading, text: s.lines.join("\n") }));
}

/** Rows of every `{| ... |}` table in a chunk of wikitext. */
function tableRows(text) {
  const rows = [];
  const tableRe = /\{\|[\s\S]*?\n\|\}/g;
  let t;
  while ((t = tableRe.exec(text)) !== null) {
    for (const chunk of t[0].split(/\n\|-\s*\n?/).slice(1)) {
      const stop = chunk.indexOf("\n|}");
      const c = stop === -1 ? chunk : chunk.slice(0, stop);
      const cells = c
        .split(/\n\|(?!\})/)
        .map((x) => clean(x.replace(/^\|/, "")) ?? "");
      if (cells.length >= 4 && cells[0]) rows.push(cells);
    }
  }
  return rows;
}

const wikiCards = new Map(); // expansion|nameKey -> record
const wikiSections = sections(wikiText);

for (const s of wikiSections) {
  const expansion = WIKI_SECTIONS[s.heading];
  if (!expansion) continue;
  const omegaSection = s.heading.endsWith("Updated");
  for (const [name, copies, window, text, flavor] of tableRows(s.text)) {
    const k = `${expansion}|${key(name)}${omegaSection ? "-omega" : ""}`;
    if (wikiCards.has(k)) continue;
    wikiCards.set(k, {
      id: slug(name),
      name,
      expansion,
      phase: phaseFromWindow(window),
      window: window.replace(/:$/, ""),
      text,
      flavor: flavor || null,
      copies: Number(copies) || 1,
      omega: omegaSection,
    });
  }
}

/* -------------------------------------------------------------- the FAQ */

const faqIndex = wikiText.search(/^==\s*\[\[FAQ\]\]\s*==/m);
const faqEntries =
  faqIndex === -1
    ? []
    : (clean(wikiText.slice(faqIndex).replace(/^==.*==$/gm, "")) ?? "")
        .split(/(?=Q:)/)
        .map(squash)
        .filter((s) => s.startsWith("Q:"));

/**
 * Attach each FAQ ruling to the cards it names. Card names appear in the
 * question inside curly or straight quotes; matching on the quoted strings
 * avoids attaching a ruling to every card that shares a common word.
 */
function faqTargets(entry) {
  const quoted = [...entry.matchAll(/[“"']([^”"']{3,40})[”"']/g)].map((m) =>
    key(m[1]),
  );
  return new Set(quoted);
}

/* --------------------------------------------------------- cross-check */

const warnings = [];
for (const shared of ["base", "pok", "codex1"]) {
  const a = new Set(
    [...asyncCards.keys()].filter((k) => k.startsWith(`${shared}|`)),
  );
  const b = new Set(
    [...wikiCards.keys()].filter((k) => k.startsWith(`${shared}|`)),
  );
  for (const k of a) if (!b.has(k)) warnings.push(`only in AsyncTI4: ${k}`);
  for (const k of b) if (!a.has(k)) warnings.push(`only in wiki: ${k}`);
}

/* ------------------------------------------------------------- combine */

const cards = [];

// Shared decks: take the AsyncTI4 record, but the wiki's copy count.
//
// The two sources agree on every copy count except Veto, where AsyncTI4 lists
// three and the wiki one. The wiki is right: with Veto at 1 the base deck comes
// to exactly the printed 80 cards, and at 3 it comes to 82. AsyncTI4 carries
// two spurious duplicate entries.
for (const [k, card] of asyncCards) {
  const wiki = wikiCards.get(k);
  if (wiki && wiki.copies !== card.copies) {
    warnings.push(
      `copies differ for ${k}: async=${card.copies} wiki=${wiki.copies} (using wiki)`,
    );
  }
  cards.push({ ...card, copies: wiki?.copies ?? card.copies });
}

// Wiki-only decks.
for (const [k, card] of wikiCards) {
  const expansion = k.split("|")[0];
  if (!WIKI_ONLY.has(expansion)) continue;
  const record = { ...card, note: null };
  if (card.omega) {
    // An Omega card replaces the Codex I card of the same name.
    const original = [...asyncCards.values()].find(
      (c) => c.expansion === "codex1" && key(c.name) === key(card.name),
    );
    if (original) record.supersedes = original.id;
    else warnings.push(`omega card with no Codex I original: ${card.name}`);
  }
  delete record.omega;
  cards.push(record);
}

// Attach FAQ rulings.
const byKey = new Map();
for (const c of cards) {
  const k = key(c.name);
  if (!byKey.has(k)) byKey.set(k, []);
  byKey.get(k).push(c);
}
let attached = 0;
for (const entry of faqEntries) {
  const targets = faqTargets(entry);
  let hit = false;
  for (const t of targets) {
    for (const c of byKey.get(t) ?? []) {
      (c.faq ??= []).push(entry);
      hit = true;
    }
  }
  // Rulings about riders in general apply to every rider card.
  if (/\brider\b/i.test(entry)) {
    for (const c of cards) {
      if (/ Rider$/.test(c.name)) {
        (c.faq ??= []).push(entry);
        hit = true;
      }
    }
  }
  if (hit) attached += 1;
  else warnings.push(`FAQ ruling matched no card: ${entry.slice(0, 70)}…`);
}

cards.sort(
  (a, b) => a.name.localeCompare(b.name) || a.expansion.localeCompare(b.expansion),
);

/* --------------------------------------------------------------- emit */

const j = (v) => JSON.stringify(v);

const body = cards
  .map((c) => {
    const lines = [
      `    id: ${j(c.id)},`,
      `    name: ${j(c.name)},`,
      `    expansion: ${j(c.expansion)},`,
      `    phase: ${j(c.phase)},`,
      `    window: ${j(c.window)},`,
      `    text: ${j(c.text)},`,
      `    copies: ${c.copies},`,
    ];
    if (c.flavor) lines.push(`    flavor: ${j(c.flavor)},`);
    if (c.note) lines.push(`    note: ${j(c.note)},`);
    if (c.supersedes) lines.push(`    supersedes: ${j(c.supersedes)},`);
    if (c.faq?.length) {
      lines.push(`    faq: [\n${c.faq.map((f) => `      ${j(f)},`).join("\n")}\n    ],`);
    }
    return `  {\n${lines.join("\n")}\n  },`;
  })
  .join("\n");

const file = `import type { ActionCard } from "@/lib/types";

/**
 * The full action card deck.
 *
 * GENERATED FILE — do not hand-edit.
 * Regenerate with \`npm run gen:action-cards\`.
 *
 * Sources:
 * - Base game, Prophecy of Kings and Codex I text comes from the AsyncTI4 map
 *   generator bot (https://github.com/AsyncTI4/TI4_map_generator_bot), which
 *   releases its game data into the public domain. Its \`note\` field is a
 *   community clarification for an interaction that has needed settling.
 * - Thunder's Edge, its Omega replacements and the Twilight's Fall mode deck
 *   come from the Twilight Imperium Fandom wiki, as does \`faq\` — the official
 *   FAQ rulings that mention the card by name.
 *
 * \`copies\` is how many of that card are in the deck. \`supersedes\` is set on
 * Omega cards and names the card they replace.
 */
export const ACTION_CARDS: ActionCard[] = [
${body}
];

export const ACTION_CARD_BY_ID = new Map(ACTION_CARDS.map((c) => [c.id, c]));

/** Timing phases present in the deck, in play order. */
export const ACTION_CARD_PHASES = [
  "Strategy",
  "Action",
  "Status",
  "Agenda",
  "Any",
] as const;
`;

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "actionCards.ts");
await writeFile(out, file, "utf8");

const byExpansion = cards.reduce(
  (acc, c) => ({ ...acc, [c.expansion]: (acc[c.expansion] ?? 0) + 1 }),
  {},
);
console.log(`Wrote ${cards.length} cards ${JSON.stringify(byExpansion)}`);
console.log(
  `  ${cards.filter((c) => c.note).length} community notes, ` +
    `${cards.filter((c) => c.faq).length} cards carry FAQ rulings ` +
    `(${attached}/${faqEntries.length} rulings attached), ` +
    `${cards.filter((c) => c.supersedes).length} Omega replacements, ` +
    `${cards.reduce((n, c) => n + c.copies, 0)} physical copies.`,
);
if (warnings.length) {
  console.log(`\n${warnings.length} cross-check warning(s):`);
  for (const w of warnings) console.log(`  - ${w}`);
}
