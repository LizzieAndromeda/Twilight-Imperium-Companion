/**
 * Regenerates `data/errata.generated.ts` from the wiki's Errata page.
 *
 *   node scripts/generate-errata.mjs
 *
 * Each erratum is a heading naming the component it corrects, linked to that
 * component's page, followed by the corrected wording with the words that
 * actually changed marked up. Both of those are worth keeping: the link says
 * which card to attach the correction to, and the emphasis says what to read.
 */
import { writeFile, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const URL =
  "https://twilight-imperium.fandom.com/api.php?action=parse&page=Errata&prop=wikitext&format=json";

const warnings = [];

/** Link target -> what kind of component the erratum corrects. */
const KINDS = [
  [/^Action Cards/i, "action-card"],
  [/\(Strategy card\)/i, "strategy-card"],
  [/#Faction Abilities|#Racial Abilities/i, "faction-ability"],
  [/#Faction Technologies/i, "faction-technology"],
  [/#Flagship/i, "flagship"],
  [/#Faction Promissory Note/i, "promissory-note"],
  [/Technologies#/i, "technology"],
];

const FACTION_IDS = {
  "the arborec": "arborec",
  "the barony of letnev": "letnev",
  "the clan of saar": "saar",
  "the embers of muaat": "muaat",
  "the emirates of hacan": "hacan",
  "the federation of sol": "sol",
  "the ghosts of creuss": "creuss",
  "the l1z1x mindnet": "l1z1x",
  "the mentak coalition": "mentak",
  "the naalu collective": "naalu",
  "the nekro virus": "nekro",
  "sardakk n'orr": "norr",
  "the universities of jol-nar": "jolnar",
  "the winnu": "winnu",
  "the xxcha kingdom": "xxcha",
  "the yin brotherhood": "yin",
  "the yssaril tribes": "yssaril",
};

const squash = (s) => String(s ?? "").replace(/\s+/g, " ").trim();

const stripMarkup = (s) =>
  String(s ?? "")
    .replace(/\[\[File:[^\]]*\]\]/gi, "")
    .replace(/\[https?:\/\/\S+\s+([^\]]*)\]/g, "$1")
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")
    .replace(/\[\[([^\]]+)\]\]/g, "$1")
    .replace(/\{\{[^{}]*\}\}/g, "")
    .replace(/'''/g, "")
    .replace(/''/g, "");

const clean = (s) => {
  const t = squash(stripMarkup(s).replace(/<[^>]+>/g, " "));
  return t.length ? t : null;
};

const slug = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * Split the corrected wording into runs, marking the ones the wiki underlines.
 * Those are the words that actually changed, which is the only part most people
 * need to read.
 */
function toParts(raw) {
  const text = stripMarkup(raw);
  const parts = [];
  const re = /<u>([\s\S]*?)<\/u>/gi;
  let last = 0;
  let m;
  while ((m = re.exec(text)) !== null) {
    const before = squash(text.slice(last, m.index).replace(/<[^>]+>/g, " "));
    if (before) parts.push({ text: before, changed: false });
    const changed = squash(m[1].replace(/<[^>]+>/g, " "));
    if (changed) parts.push({ text: changed, changed: true });
    last = m.index + m[0].length;
  }
  const tail = squash(text.slice(last).replace(/<[^>]+>/g, " "));
  if (tail) parts.push({ text: tail, changed: false });
  return parts;
}

/* ------------------------------------------------------------------ run */

const wikitext = await fetch(URL, {
  headers: { "User-Agent": "TI4Companion/1.0 (data generation)" },
}).then(async (r) => {
  if (!r.ok) throw new Error(`Fandom fetch failed: ${r.status}`);
  return (await r.json()).parse.wikitext["*"];
});

const errata = [];

// Each erratum is a level-3 heading whose link names the component.
const blocks = wikitext.split(/^===\s*(.+?)\s*===\s*$/m);
for (let i = 1; i < blocks.length; i += 2) {
  const rawHeading = blocks[i];
  const body = blocks[i + 1] ?? "";

  const link = rawHeading.match(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/);
  const target = link?.[1] ?? "";
  const name = clean(link?.[2] ?? rawHeading);
  if (!name) continue;

  const kind = KINDS.find(([re]) => re.test(target))?.[1] ?? "other";
  if (kind === "other") warnings.push(`${name}: could not classify target "${target}"`);

  const faction =
    FACTION_IDS[squash(target.split("#")[0]).toLowerCase().replace(/[‘’]/g, "'")] ??
    null;

  // Drop the "The text of X should read as follows:" preamble; the correction
  // is the quoted wording after it.
  const quoted = body.match(/should read as follows\s*:\s*([\s\S]*)$/i);
  const parts = toParts(quoted?.[1] ?? body).map((p) => ({
    ...p,
    // The quotation marks around the whole correction are not part of it.
    text: p.text.replace(/^[“"']+|[”"']+$/g, "").trim(),
  }));
  const nonEmpty = parts.filter((p) => p.text);
  if (!nonEmpty.length) {
    warnings.push(`${name}: no corrected text parsed`);
    continue;
  }

  errata.push({
    id: slug(name),
    name,
    kind,
    faction,
    parts: nonEmpty,
    text: nonEmpty.map((p) => p.text).join(" "),
  });
}

/* ------------------------------------- resolve each erratum to a component */

async function read(file) {
  try {
    return await readFile(
      join(dirname(fileURLToPath(import.meta.url)), "..", "data", file),
      "utf8",
    );
  } catch {
    return "";
  }
}

// Names appear both on their own line and inline inside one-line records, so
// this deliberately matches anywhere rather than anchoring to a line.
const namesIn = (src) =>
  new Set([...src.matchAll(/\bname: "([^"]+)"/g)].map((m) => m[1].toLowerCase()));

const [actionCards, technologies, factionsSrc, strategySrc] = await Promise.all([
  read("actionCards.ts"),
  read("technologies.generated.ts"),
  read("factions.generated.ts"),
  read("strategyCards.ts"),
]);

const known = {
  "action-card": namesIn(actionCards),
  technology: namesIn(technologies),
  "faction-technology": namesIn(technologies),
  "strategy-card": new Set(
    [...strategySrc.matchAll(/name: "([^"]+)"/g)].map((m) => m[1].toLowerCase()),
  ),
};
// Faction abilities, flagships and promissory notes all live in the faction file.
const factionNames = namesIn(factionsSrc);

for (const e of errata) {
  const pool =
    known[e.kind] ??
    (["faction-ability", "flagship", "promissory-note"].includes(e.kind)
      ? factionNames
      : null);
  if (!pool) continue;
  // Strategy card names gain an Omega suffix in later printings.
  const hit =
    pool.has(e.name.toLowerCase()) ||
    [...pool].some((n) => n.startsWith(e.name.toLowerCase()));
  if (!hit) {
    warnings.push(
      `${e.name} (${e.kind}): no component of that name in the generated data`,
    );
  }
}

/* ----------------------------------------------------------------- emit */

const j = (v) => JSON.stringify(v);

const body = errata
  .map((e) => {
    const lines = [
      `    id: ${j(e.id)},`,
      `    name: ${j(e.name)},`,
      `    kind: ${j(e.kind)},`,
      `    text: ${j(e.text)},`,
      `    parts: [\n${e.parts
        .map((p) => `      { text: ${j(p.text)}, changed: ${p.changed} },`)
        .join("\n")}\n    ],`,
    ];
    if (e.faction) lines.push(`    faction: ${j(e.faction)},`);
    return `  {\n${lines.join("\n")}\n  },`;
  })
  .join("\n");

const file = `import type { Erratum } from "@/lib/types";

/**
 * Official errata — corrections to printed card and ability wording, published
 * in the Living Rules Reference.
 *
 * GENERATED FILE — do not hand-edit.
 * Regenerate with \`npm run gen:errata\`.
 *
 * Scraped from https://twilight-imperium.fandom.com/wiki/Errata.
 *
 * \`parts\` splits the corrected wording into runs, with \`changed\` set on the
 * ones the errata underlines — those are the words that actually changed, which
 * is usually all anyone needs to read.
 */
export const ERRATA: Erratum[] = [
${body}
];

export const ERRATA_BY_ID = new Map(ERRATA.map((e) => [e.id, e]));

/** Errata for a named component, matched case-insensitively. */
export const ERRATA_BY_NAME = new Map(
  ERRATA.map((e) => [e.name.toLowerCase(), e]),
);
`;

await writeFile(
  join(dirname(fileURLToPath(import.meta.url)), "..", "data", "errata.generated.ts"),
  file,
  "utf8",
);

const byKind = errata.reduce(
  (acc, e) => ({ ...acc, [e.kind]: (acc[e.kind] ?? 0) + 1 }),
  {},
);
console.log(`Wrote ${errata.length} errata ${JSON.stringify(byKind)}`);
console.log(
  `  ${errata.filter((e) => e.faction).length} tied to a faction, ` +
    `${errata.reduce((n, e) => n + e.parts.filter((p) => p.changed).length, 0)} marked changes`,
);
if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`  - ${w}`);
}
