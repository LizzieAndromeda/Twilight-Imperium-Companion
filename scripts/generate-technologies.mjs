/**
 * Regenerates `data/technologies.generated.ts` from the wiki.
 *
 *   node scripts/generate-technologies.mjs
 *
 * Five pages feed this: the four colour pages, which carry basic and faction
 * technologies, and the unit upgrade page, whose tables are shaped differently
 * because an upgrade's "effect" is mostly a change in unit stats.
 *
 * Codex revisions (Ω, ΩΩ) appear as extra tables under the same heading. They
 * are attached to the technology they revise rather than becoming separate
 * entries — it is the same card.
 */
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const API = "https://twilight-imperium.fandom.com/api.php";
const UA = "TI4Companion/1.0 (data generation)";

const COLOUR_PAGES = [
  ["Biotic Technologies", "biotic"],
  ["Cybernetic Technologies", "cybernetic"],
  ["Propulsion Technologies", "propulsion"],
  ["Warfare Technologies", "warfare"],
];

/** Level-2 section heading -> expansion. */
const SECTION_EXPANSION = [
  [/Prophecy of Kings/i, "pok"],
  [/Thunder/i, "thundersedge"],
];

/**
 * Wiki faction names -> our faction ids, so a technology can link to the
 * faction that owns it. Mirrors the pinned list in generate-factions.mjs.
 */
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
  "the argent flight": "argent",
  "the empyrean": "empyrean",
  "the mahact gene-sorcerers": "mahact",
  "the mahact gene sorcerers": "mahact",
  "the naaz-rokha alliance": "naazrokha",
  "the nomad": "nomad",
  "the titans of ul": "titans",
  "the vuil'raith cabal": "vuilraith",
  "the council keleres": "keleres",
  "the crimson rebellion": "crimson",
  "the deepwrought scholarate": "deepwrought",
  "the firmament / the obsidian": "firmament",
  "the firmament": "firmament",
  "last bastion": "bastion",
  "the ral nel consortium": "ralnel",
};

/** Faction id -> expansion, for unit upgrades where the page gives no edition. */
const FACTION_EXPANSION = {
  argent: "pok",
  empyrean: "pok",
  mahact: "pok",
  naazrokha: "pok",
  nomad: "pok",
  titans: "pok",
  vuilraith: "pok",
  keleres: "codex3",
  crimson: "thundersedge",
  deepwrought: "thundersedge",
  firmament: "thundersedge",
  bastion: "thundersedge",
  ralnel: "thundersedge",
};

const warnings = [];

/**
 * The wiki describes each faction technology twice — on the faction's page and
 * on the page for its colour — and the two disagree on three names. These are
 * the colour-page spellings, corrected to the faction-page ones.
 *
 * - "Spacial Conduit Cylinder": the propulsion page misspells it. The card is
 *   about spatial adjacency and the Jol-Nar page spells it correctly.
 * - "I.I.H.Q Modernization": the cybernetic page drops the final full stop.
 * - "Planet Splitter" / "Plane Splitter": genuinely unresolved. The Firmament's
 *   page says "Plane", the cybernetic page says "Planet". Neither is obviously
 *   a typo, so the faction page wins on the grounds that a faction's own page
 *   is the more careful transcription of its cards — but check the printed card
 *   before relying on this one.
 */
const NAME_CORRECTIONS = {
  "Spacial Conduit Cylinder": "Spatial Conduit Cylinder",
  "I.I.H.Q Modernization": "I.I.H.Q. Modernization",
  "Planet Splitter": "Plane Splitter",
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

const slug = (name) =>
  name
    .toLowerCase()
    .replace(/Ω/g, "-omega")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const factionId = (name) => {
  // Pages mix the straight and curly apostrophe in "Sardakk N'orr".
  const key = squash(name).toLowerCase().replace(/[‘’]/g, "'");
  return FACTION_IDS[key] ?? null;
};

/** Structures upgrade by text alone — they have no cost/combat/move line. */
const STRUCTURES = ["PDS", "Space Dock"];

async function fetchPage(title) {
  const url = `${API}?action=parse&page=${encodeURIComponent(title)}&prop=wikitext&format=json&redirects=1`;
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  if (!r.ok) throw new Error(`${title}: HTTP ${r.status}`);
  const j = await r.json();
  if (j.error) throw new Error(`${title}: ${j.error.code}`);
  return j.parse.wikitext["*"];
}

/** Split a blob into its individual `{| ... |}` tables. */
const splitTables = (text) => text.match(/\{\|[\s\S]*?\n\|\}/g) ?? [];

/**
 * Prerequisites are `{{Tech|colour}}` markers in the requirement column. The
 * technology's own colour badge carries `w=32px`, so it is excluded.
 */
function prerequisitesOf(table) {
  return [...table.matchAll(/\{\{Tech\|([a-z]+)([^}]*)\}\}/gi)]
    .filter((m) => !/w=\d/.test(m[2] ?? ""))
    .map((m) => m[1].toLowerCase());
}

/** The wide `colspan=N rowspan=3` cell holds the card text. */
function effectOf(table) {
  const m = table.match(/\|\s*colspan="\d+"\s+rowspan="3"\s*\|([\s\S]*?)(?=\n\|)/);
  return clean(m?.[1] ?? "", { keepBreaks: true }) ?? "";
}

/**
 * Codex rewrites name the volume they came from, so a revision can be hidden
 * unless that codex is enabled.
 */
const EDITION_TO_EXPANSION = {
  "base game": "base",
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

/** The table's own header row, which carries the name and any Ω marker. */
function headerOf(table) {
  const m = table.match(/^!\s*colspan="\d+"[^|]*\|([\s\S]*?)(?=\n\|-)/m);
  return squash(clean(m?.[1] ?? "") ?? "");
}

/* -------------------------------------------------- colour page parsing */

function parseColourPage(wikitext, colour) {
  const out = [];
  let section = null;
  let faction = null;
  let pending = null;

  const flush = () => {
    if (!pending) return;
    const tables = splitTables(pending.body.join("\n"));
    if (tables.length) {
      const [base, ...rest] = tables;
      const expansion =
        SECTION_EXPANSION.find(([re]) => re.test(section ?? ""))?.[1] ?? "base";
      const owner = pending.faction ? factionId(pending.faction) : null;
      if (pending.faction && !owner) {
        warnings.push(`unmapped faction "${pending.faction}" on ${colour} page`);
      }

      const name = NAME_CORRECTIONS[pending.name] ?? pending.name;
      const entry = {
        id: slug(name),
        name,
        color: colour,
        kind: pending.faction ? "faction" : "basic",
        expansion: owner ? (FACTION_EXPANSION[owner] ?? expansion) : expansion,
        prerequisites: prerequisitesOf(base),
        text: effectOf(base),
        faction: owner,
        startingFor: pending.starting,
        revisions: rest
          .map((t) => ({ label: headerOf(t), text: effectOf(t), expansion: editionOf(t) }))
          .filter((r) => r.label && r.text),
      };
      if (!entry.text) warnings.push(`${pending.name}: no effect text parsed`);
      out.push(entry);
    }
    pending = null;
  };

  for (const line of wikitext.split("\n")) {
    const h = line.match(/^(=+)([^=].*?)\1\s*$/);
    if (h) {
      flush();
      const level = h[1].length;
      const title = squash(clean(h[2]) ?? "");
      if (level === 2) {
        section = title;
        faction = null;
        continue;
      }
      if (/^FAQ$/i.test(section ?? "")) continue;
      if (level === 3) {
        // A level-3 heading is a faction grouping if it names a faction,
        // otherwise it is a basic technology.
        if (factionId(title)) {
          faction = title;
        } else {
          faction = null;
          pending = { name: title, faction: null, body: [], starting: [] };
        }
        continue;
      }
      if (level === 4) {
        pending = { name: title, faction, body: [], starting: [] };
      }
      continue;
    }
    if (!pending) continue;
    if (/Starting Tech/i.test(line)) {
      const names = (clean(line) ?? "")
        .replace(/^.*Starting Tech\s*:?\s*/i, "")
        .replace(/^:\s*/, "")
        .split(",")
        .map(squash)
        .filter(Boolean);
      pending.starting = names
        .map((n) => factionId(n) ?? factionId(`the ${n}`))
        .filter(Boolean);
      continue;
    }
    pending.body.push(line);
  }
  flush();
  return out;
}

/* ------------------------------------------------ unit upgrade parsing */

/**
 * Unit upgrade tables end with a stats row followed by its label row
 * (Cost / Combat / Move / Capacity), so the labels identify which row holds
 * the numbers.
 */
function statsOf(table) {
  const rows = table
    .split(/\n\|-\s*\n?/)
    .slice(1)
    .map((chunk) =>
      chunk
        .split(/\n\|(?!\})/)
        .map((c) => squash(clean(c.replace(/^\|/, "")) ?? "")),
    );
  for (let i = 1; i < rows.length; i += 1) {
    const labels = rows[i].map((c) => c.toLowerCase());
    if (!labels.includes("cost")) continue;
    // Some tables carry a doubled "|-" separator, which leaves a stray cell at
    // the front of the values row. The stat columns are the trailing ones, so
    // align the two rows from the right rather than the left.
    const raw = rows[i - 1];
    const values = raw.length > labels.length
      ? raw.slice(raw.length - labels.length)
      : raw;
    const stats = {};
    labels.forEach((label, idx) => {
      const key = label.replace(/[^a-z]/g, "");
      if (!["cost", "combat", "move", "capacity"].includes(key)) return;
      const value = values[idx];
      if (value) stats[key] = value;
    });
    return stats;
  }
  return null;
}

function parseUnitUpgrades(wikitext) {
  const out = [];
  let unit = null;
  let pending = null;

  const flush = () => {
    if (!pending) return;
    const tables = splitTables(pending.body.join("\n"));
    if (tables.length) {
      const base = tables[0];
      const owner = pending.faction ? factionId(pending.faction) : null;
      if (pending.faction && !owner) {
        warnings.push(`unmapped faction "${pending.faction}" on unit upgrade page`);
      }
      const stats = statsOf(base);
      if (!stats && !STRUCTURES.includes(unit ?? "")) {
        warnings.push(`${pending.name}: no unit stats parsed`);
      }
      out.push({
        id: slug(pending.name),
        name: pending.name,
        color: null,
        kind: "unit-upgrade",
        expansion: owner ? (FACTION_EXPANSION[owner] ?? "base") : "base",
        prerequisites: prerequisitesOf(base),
        text: [pending.blurb, effectOf(base)].filter(Boolean).join(" ").trim(),
        faction: owner,
        startingFor: [],
        revisions: [],
        unit: { of: unit, ...(stats ?? {}) },
      });
    }
    pending = null;
  };

  for (const line of wikitext.split("\n")) {
    const h = line.match(/^(=+)([^=].*?)\1\s*$/);
    if (h) {
      flush();
      const level = h[1].length;
      const title = squash(clean(h[2]) ?? "");
      if (level === 2) {
        unit = title;
        // The generic upgrade for this unit is named "<Unit> II".
        pending = { name: `${title} II`, faction: null, body: [], blurb: "" };
      } else if (level === 4) {
        // "Advanced Carrier II (The Federation of Sol)"
        const m = title.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
        pending = {
          name: squash(m?.[1] ?? title),
          faction: m?.[2] ?? null,
          body: [],
          blurb: "",
        };
      }
      continue;
    }
    if (!pending) continue;
    if (!pending.body.length && !/^\{\|/.test(line.trim()) && squash(line)) {
      pending.blurb = squash(clean(line) ?? "");
      continue;
    }
    pending.body.push(line);
  }
  flush();
  return out;
}

/* ------------------------------------------------------------------ run */

const technologies = [];

for (const [page, colour] of COLOUR_PAGES) {
  technologies.push(...parseColourPage(await fetchPage(page), colour));
  await new Promise((r) => setTimeout(r, 200));
}
technologies.push(...parseUnitUpgrades(await fetchPage("Unit Upgrade Technologies")));

technologies.sort(
  (a, b) => a.kind.localeCompare(b.kind) || a.name.localeCompare(b.name),
);

const ids = new Set();
for (const t of technologies) {
  if (ids.has(t.id)) warnings.push(`duplicate id: ${t.id}`);
  ids.add(t.id);
}

/**
 * Faction technologies are described twice on the wiki: once on the faction's
 * own page and once on the page for their colour. `generate-factions.mjs`
 * scrapes the first, this script scrapes the second, so the two can be
 * compared — and they do disagree in places.
 */
try {
  const { readFile } = await import("node:fs/promises");
  const factionsFile = await readFile(
    join(dirname(fileURLToPath(import.meta.url)), "..", "data", "factions.generated.ts"),
    "utf8",
  );
  const onFactionPages = new Set();
  for (const block of factionsFile.split(/\n  \{\n/).slice(1)) {
    const techBlock = block.match(/factionTech: \[([\s\S]*?)\n {4}\],/);
    if (!techBlock) continue;
    for (const m of techBlock[1].matchAll(/name: "([^"]+)"/g)) {
      onFactionPages.add(m[1].toLowerCase());
    }
  }
  if (onFactionPages.size) {
    for (const t of technologies) {
      if (t.kind !== "faction") continue;
      if (!onFactionPages.has(t.name.toLowerCase())) {
        warnings.push(
          `"${t.name}" is on the ${t.color} page but not on its faction's page — check the spelling on both`,
        );
      }
    }
  }
} catch {
  // Faction data not generated yet; nothing to compare against.
}

/* ----------------------------------------------------------------- emit */

const j = (v) => JSON.stringify(v);

const body = technologies
  .map((t) => {
    const lines = [
      `    id: ${j(t.id)},`,
      `    name: ${j(t.name)},`,
      `    kind: ${j(t.kind)},`,
      `    expansion: ${j(t.expansion)},`,
      `    color: ${t.color ? j(t.color) : "null"},`,
      `    prerequisites: ${j(t.prerequisites)},`,
      `    text: ${j(t.text)},`,
    ];
    if (t.faction) lines.push(`    faction: ${j(t.faction)},`);
    if (t.startingFor.length)
      lines.push(`    startingFor: ${j(t.startingFor)},`);
    if (t.unit) {
      const parts = Object.entries(t.unit)
        .filter(([, v]) => v)
        .map(([k, v]) => `${k}: ${j(v)}`);
      lines.push(`    unit: { ${parts.join(", ")} },`);
    }
    if (t.revisions.length) {
      lines.push(
        `    revisions: [\n${t.revisions
          .map((r) => `      { label: ${j(r.label)}, text: ${j(r.text)}, expansion: ${j(r.expansion ?? t.expansion)} },`)
          .join("\n")}\n    ],`,
      );
    }
    return `  {\n${lines.join("\n")}\n  },`;
  })
  .join("\n");

const file = `import type { Technology } from "@/lib/types";

/**
 * The technology deck.
 *
 * GENERATED FILE — do not hand-edit.
 * Regenerate with \`npm run gen:technologies\`.
 *
 * Scraped from the wiki's four colour pages and its unit upgrade page.
 * \`prerequisites\` is the list of coloured prerequisite symbols on the card, so
 * its length is the technology's level. \`revisions\` holds Codex Ω rewrites of
 * a card, which stay attached to the card they revise.
 */
export const TECHNOLOGIES: Technology[] = [
${body}
];

export const TECHNOLOGY_BY_ID = new Map(TECHNOLOGIES.map((t) => [t.id, t]));

/** The four technology colours, in the order the reference tables use them. */
export const TECH_COLORS = [
  "biotic",
  "propulsion",
  "cybernetic",
  "warfare",
] as const;
`;

await writeFile(
  join(dirname(fileURLToPath(import.meta.url)), "..", "data", "technologies.generated.ts"),
  file,
  "utf8",
);

const by = (key) =>
  technologies.reduce((acc, t) => ({ ...acc, [t[key]]: (acc[t[key]] ?? 0) + 1 }), {});

console.log(`Wrote ${technologies.length} technologies`);
console.log(`  by kind:      ${JSON.stringify(by("kind"))}`);
console.log(`  by expansion: ${JSON.stringify(by("expansion"))}`);
console.log(
  `  ${technologies.filter((t) => t.revisions.length).length} with Codex revisions, ` +
    `${technologies.filter((t) => t.startingFor.length).length} are someone's starting tech`,
);
if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`  - ${w}`);
}
