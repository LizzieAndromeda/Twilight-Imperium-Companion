/**
 * Regenerates `data/factions.generated.ts` from the Twilight Imperium wiki.
 *
 *   node scripts/generate-factions.mjs
 *
 * Faction sheets are dense and easy to get subtly wrong from memory — an
 * ability quoted without its drawback clause reads as a straight buff. So the
 * mechanical text here is scraped rather than written, and the editorial
 * colour (tagline, playstyle) lives separately in `data/factionNotes.ts`,
 * which this script never touches.
 *
 * Faction ids are pinned in FACTIONS below: saved games store `factionId`, so
 * an id must never change once shipped.
 */
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const API = "https://twilight-imperium.fandom.com/api.php";
const UA = "TI4Companion/1.0 (data generation)";

/** [wiki page title, our id, short name, expansion] */
const FACTIONS = [
  ["The Arborec", "arborec", "Arborec", "base"],
  ["The Barony of Letnev", "letnev", "Letnev", "base"],
  ["The Clan of Saar", "saar", "Saar", "base"],
  ["The Embers of Muaat", "muaat", "Muaat", "base"],
  ["The Emirates of Hacan", "hacan", "Hacan", "base"],
  ["The Federation of Sol", "sol", "Sol", "base"],
  ["The Ghosts of Creuss", "creuss", "Creuss", "base"],
  ["The L1Z1X Mindnet", "l1z1x", "L1Z1X", "base"],
  ["The Mentak Coalition", "mentak", "Mentak", "base"],
  ["The Naalu Collective", "naalu", "Naalu", "base"],
  ["The Nekro Virus", "nekro", "Nekro", "base"],
  ["Sardakk N'orr", "norr", "N'orr", "base"],
  ["The Universities of Jol-Nar", "jolnar", "Jol-Nar", "base"],
  ["The Winnu", "winnu", "Winnu", "base"],
  ["The Xxcha Kingdom", "xxcha", "Xxcha", "base"],
  ["The Yin Brotherhood", "yin", "Yin", "base"],
  ["The Yssaril Tribes", "yssaril", "Yssaril", "base"],
  ["The Argent Flight", "argent", "Argent", "pok"],
  ["The Empyrean", "empyrean", "Empyrean", "pok"],
  ["The Mahact Gene-Sorcerers", "mahact", "Mahact", "pok"],
  ["The Naaz-Rokha Alliance", "naazrokha", "Naaz-Rokha", "pok"],
  ["The Nomad", "nomad", "Nomad", "pok"],
  ["The Titans of Ul", "titans", "Titans", "pok"],
  ["The Vuil'Raith Cabal", "vuilraith", "Vuil'raith", "pok"],
  ["The Council Keleres", "keleres", "Keleres", "codex3"],
  ["The Crimson Rebellion", "crimson", "Crimson", "thundersedge"],
  ["The Deepwrought Scholarate", "deepwrought", "Deepwrought", "thundersedge"],
  ["The Firmament / The Obsidian", "firmament", "Firmament", "thundersedge"],
  ["Last Bastion", "bastion", "Last Bastion", "thundersedge"],
  ["The Ral Nel Consortium", "ralnel", "Ral Nel", "thundersedge"],
];

/* ------------------------------------------------------------- wikitext */

const squash = (s) => String(s ?? "").replace(/\s+/g, " ").trim();

/** Strip wiki markup to readable text. */
function clean(s, { keepBreaks = false } = {}) {
  let t = String(s ?? "")
    .replace(/\[\[File:[^\]]*\]\]/gi, "")
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")
    .replace(/\[\[([^\]]+)\]\]/g, "$1")
    .replace(/\{\{Tech\|[^|}]*\|([^}]*)\}\}/gi, "$1")
    .replace(/\{\{Edition\|([^}]*)\}\}/gi, "")
    .replace(/\{\{Symbol\|[^}]*\}\}/gi, "")
    .replace(/\{\{[^{}]*\}\}/g, "")
    .replace(/<blockquote>/gi, keepBreaks ? "\n" : " ")
    .replace(/<\/blockquote>/gi, keepBreaks ? "\n" : " ")
    .replace(/<br\s*\/?>/gi, keepBreaks ? "\n" : " ")
    .replace(/'''/g, "")
    .replace(/''/g, "")
    .replace(/<[^>]+>/g, "");
  t = keepBreaks
    ? t
        .split("\n")
        .map(squash)
        .filter(Boolean)
        .join("\n")
    : squash(t);
  return t.length ? t : null;
}

/**
 * Split wikitext into `{ heading: text }`.
 *
 * A heading's text includes its subsections — the Council Keleres page files
 * its abilities under "Codex III" and "Thunder's Edge" sub-headings, and a
 * naive split loses them entirely.
 */
function sections(w) {
  const stack = []; // [{ level, key }]
  const s = { "(intro)": [] };
  stack.push({ level: 0, key: "(intro)" });

  for (const line of w.split("\n")) {
    const m = line.match(/^(=+)([^=].*?)\1\s*$/);
    if (m) {
      const level = m[1].length;
      while (stack.length && stack[stack.length - 1].level >= level) stack.pop();
      const key = clean(m[2]) ?? "";
      s[key] ??= [];
      stack.push({ level, key });
    } else {
      // Append to every open ancestor so parents contain their subsections.
      for (const frame of stack) s[frame.key].push(line);
    }
  }
  return Object.fromEntries(Object.entries(s).map(([k, v]) => [k, v.join("\n")]));
}

/**
 * A wikitable cell may carry attributes before a second pipe, as in
 * `| rowspan="3" |'''Agent'''`. Strip them so the caller sees only content.
 */
function cellContent(raw) {
  const body = raw.replace(/^\|/, "");
  const m = body.match(/^([^|\n]*=[^|\n]*)\|([\s\S]*)$/);
  return m ? m[2] : body;
}

/** Rows of the first `{| ... |}` table in a chunk. */
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
    .filter((cells) => cells.some(Boolean));
}

/** Values from the `{{Main Infobox 1 ...}}` template. */
function infobox(w) {
  // Pages use both "{{Main Infobox 1" and "{{Main_Infobox_1".
  const opener = w.match(/\{\{Main[_ ]Infobox[_ ]1/);
  const start = opener ? opener.index : -1;
  if (start === -1) return {};
  // Walk to the matching close brace so nested templates do not truncate it.
  let depth = 0;
  let end = start;
  for (let i = start; i < w.length - 1; i += 1) {
    if (w[i] === "{" && w[i + 1] === "{") {
      depth += 1;
      i += 1;
    } else if (w[i] === "}" && w[i + 1] === "}") {
      depth -= 1;
      i += 1;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  const body = w.slice(start + opener[0].length, end - 2);

  // Split on top-level pipes only.
  const parts = [];
  let buf = "";
  let d = 0;
  for (let i = 0; i < body.length; i += 1) {
    const c = body[i];
    if (body.startsWith("{{", i) || body.startsWith("[[", i)) d += 1;
    if (body.startsWith("}}", i) || body.startsWith("]]", i)) d -= 1;
    if (c === "|" && d <= 0) {
      parts.push(buf);
      buf = "";
    } else buf += c;
  }
  parts.push(buf);

  const out = {};
  for (const p of parts) {
    const eq = p.indexOf("=");
    if (eq === -1) continue;
    const key = p.slice(0, eq).trim().toLowerCase();
    const value = p.slice(eq + 1);
    if (key) out[key] = value;
  }
  return out;
}

/**
 * `* '''NAME:''' text` bullets.
 *
 * Some sheets carry an Omega revision of an ability alongside the original —
 * the Council Keleres lists both its Codex III and Thunder's Edge wording. The
 * revision is marked with an Ω after the bold name, which is kept in the
 * ability name so the two are distinguishable, and exact duplicates (the
 * abilities a revision left untouched) are collapsed.
 */
function bulletAbilities(text) {
  const out = [];
  const seen = new Set();
  for (const line of text.split("\n")) {
    // Lazy `.+?` rather than `[^']+?`: ability names contain apostrophes
    // (LAW'S ORDER), and a single quote must not end the bold run.
    const m = line.match(/^\*\s*'''(.+?)'''\s*:?\s*(.*)$/);
    if (!m) continue;
    let name = squash(clean(m[1])?.replace(/:$/, "") ?? "");
    let body = m[2];
    // An Ω marker sits in its own bold run before the colon.
    const omega = /^\s*'''\s*Ω[^']*'''\s*:?/.test(body) || /^\s*Ω/.test(clean(body) ?? "");
    if (omega) {
      body = body.replace(/^\s*'''\s*Ω[^']*'''\s*:?/, "").replace(/^\s*Ω\s*:?/, "");
      name = squash(`${name} Ω`);
    }
    const cleaned = clean(body);
    if (!name || !cleaned) continue;
    // Faction abilities are printed in capitals. Anything in mixed case is a
    // leader or unit name that shares the bullet formatting, not an ability.
    if (/[a-z]/.test(name.replace(/Ω/g, ""))) continue;
    const key = `${name}|${cleaned}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ name, text: cleaned });
  }
  return out;
}

/**
 * A named card written as `'''Name'''<blockquote>text</blockquote>`, where the
 * name may or may not be wrapped in `<big>`, and may be preceded by
 * `{{Tech|colour}}` markers. Promissory notes and faction technologies share
 * this shape.
 */
function namedCards(text) {
  const out = [];
  // Pages nest these two ways round — '''<big>Name</big>''' and
  // <big>'''Name'''</big> — so drop the <big> tags and both become the same
  // '''Name''' followed by a blockquote.
  const flat = text.replace(/<\/?big>/gi, "");

  // An edition marker or an editorial aside can sit between the name and the
  // first blockquote — the Council Keleres has
  // '''I.I.H.Q. Modernization''' {{Edition|Codex III}} (Moved to Breakthrough…)
  // — so allow a short run of text there rather than requiring them adjacent.
  // Anything but a tag or the start of the next bold run. Plain apostrophes
  // must be allowed through: one of these asides reads "Thunder's Edge".
  const GAP = "(?:(?!''')[^<>]){0,160}";
  const chunks = flat
    .split(new RegExp(`(?='''[^']+'''${GAP}<blockquote>)`, "i"))
    .filter((c) => /<blockquote>/i.test(c));

  for (const chunk of chunks) {
    const nameMatch = chunk.match(
      new RegExp(`'''\\s*(.*?)\\s*'''(?=${GAP}<blockquote>)`, "i"),
    );
    if (!nameMatch) continue;
    const name = clean(nameMatch[1]);
    if (!name) continue;

    const quotes = [...chunk.matchAll(/<blockquote>([\s\S]*?)<\/blockquote>/gi)]
      .map((m) => clean(m[1]))
      .filter(Boolean);

    // The last blockquote is often "Prerequisites: ..." rather than rules text.
    let prerequisites = null;
    if (quotes.length && /^Prerequisites:/i.test(quotes[quotes.length - 1])) {
      prerequisites = squash(quotes.pop().replace(/^Prerequisites:\s*/i, ""));
    }

    // Technology colour markers sit before the name.
    const colours = [
      ...chunk.slice(0, nameMatch.index).matchAll(/\{\{Tech\|([a-z]+)\}\}/gi),
    ].map((m) => m[1].toLowerCase());

    const card = { name, text: quotes.join(" ") };
    if (colours.length) card.color = colours[0];
    if (prerequisites) card.prerequisites = prerequisites;
    if (card.text) out.push(card);
  }
  return out;
}

/**
 * Faction-specific unit tables: Name | Cost | Combat | Abilities |
 * Prerequisites, one table per unit type sub-section.
 */
function unitVariants(text) {
  const out = [];
  const tables = text.match(/\{\|[\s\S]*?\n\|\}/g) ?? [];
  for (const table of tables) {
    const header = table.slice(0, table.indexOf("|-"));
    if (!/!\s*Name/i.test(header)) continue;
    for (const row of tableRows(table)) {
      const [name, cost, combat, abilities, prerequisites] = row;
      if (!name || !cost) continue;
      const variant = {
        name: squash(name),
        cost: squash(cost),
        combat: squash(combat ?? ""),
      };
      const ability = squash(abilities ?? "").replace(/^-$/, "");
      if (ability) variant.text = ability;
      const pre = squash(prerequisites ?? "").replace(/^(None|-)$/i, "");
      if (pre) variant.prerequisites = pre;
      out.push(variant);
    }
  }
  return out;
}

const listFrom = (raw) =>
  clean(raw, { keepBreaks: true })
    ?.split("\n")
    .map(squash)
    .filter(Boolean) ?? [];

/* ------------------------------------------------------------ per faction */

const warnings = [];

/* --------------------------------------------------------------- symbols */

/**
 * `Template:Symbol` is a big #switch mapping faction keys to symbol files.
 * Several keys share a file (full name and abbreviation), and the keys pile up
 * on their own lines before the line that names the file.
 */
async function symbolFileByKey() {
  const wikitext = await fetchPage("Template:Symbol");
  const map = {};
  let pending = [];
  for (const line of wikitext.split("\n")) {
    const withFile = line.match(/^\|\s*([^=|]+?)\s*=\s*\[\[File:([^|\]]+)/);
    if (withFile) {
      pending.push(withFile[1].trim());
      const file = withFile[2].trim();
      for (const key of pending) map[key] = file;
      pending = [];
      continue;
    }
    const keyOnly = line.match(/^\|\s*([^=|]+?)\s*$/);
    if (keyOnly) pending.push(keyOnly[1].trim());
  }
  return map;
}

/** Resolve `File:X.png` names to their CDN urls, in one batched query. */
async function imageUrls(files) {
  const urls = {};
  const unique = [...new Set(files)];
  for (let i = 0; i < unique.length; i += 40) {
    const batch = unique.slice(i, i + 40);
    const url =
      `${API}?action=query&format=json&prop=imageinfo&iiprop=url&titles=` +
      batch.map((f) => encodeURIComponent(`File:${f}`)).join("|");
    const r = await fetch(url, { headers: { "User-Agent": UA } });
    if (!r.ok) throw new Error(`imageinfo failed: ${r.status}`);
    const j = await r.json();
    for (const page of Object.values(j.query?.pages ?? {})) {
      const src = page.imageinfo?.[0]?.url;
      if (!src) {
        warnings.push(`no url for ${page.title}`);
        continue;
      }
      // Strip Fandom's cache-busting/scaling query so the original is served.
      urls[page.title.replace(/^File:/, "")] = src.split("/revision/")[0];
    }
  }
  return urls;
}

async function fetchPage(title) {
  const url = `${API}?action=parse&page=${encodeURIComponent(title)}&prop=wikitext&format=json`;
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  if (!r.ok) throw new Error(`${title}: HTTP ${r.status}`);
  const j = await r.json();
  if (j.error) throw new Error(`${title}: ${j.error.code}`);
  return j.parse.wikitext["*"];
}

function parseFaction(title, id, shortName, expansion, w, symbolUrl) {
  const s = sections(w);
  const box = infobox(w);

  const abilities = bulletAbilities(s["Faction Abilities"] ?? "");
  if (!abilities.length) warnings.push(`${title}: no faction abilities parsed`);

  // Leaders table: role | portrait | name | unlock | ability | flavour.
  //
  // Where a leader has an Omega revision the role, portrait and unlock cells
  // use rowspan, so the follow-up rows carry only [name, ability] and inherit
  // the role above them.
  const leaders = [];
  let currentRole = null;
  let currentUnlock = "";
  for (const row of tableRows(s["Leaders"] ?? "")) {
    const first = squash(row[0] ?? "");
    if (/^(Agent|Commander|Hero)$/i.test(first)) {
      currentRole = first[0].toUpperCase() + first.slice(1).toLowerCase();
      currentUnlock = squash(row[3] ?? "");
      const name = squash(row[2] ?? "");
      if (name) {
        leaders.push({
          role: currentRole,
          name,
          unlock: currentUnlock,
          ability: squash(row[4] ?? ""),
        });
      }
    } else if (currentRole && row.length >= 2 && first) {
      leaders.push({
        role: currentRole,
        name: first,
        unlock: currentUnlock,
        ability: squash(row[1] ?? ""),
      });
    }
  }

  // Flagship table: name | cost | combat | move | capacity | abilities
  let flagship = null;
  const shipRow = tableRows(s["Flagship"] ?? "").find((r) => r[0] && r[1]);
  if (shipRow) {
    flagship = {
      name: squash(shipRow[0]),
      cost: squash(shipRow[1] ?? ""),
      combat: squash(shipRow[2] ?? ""),
      move: squash(shipRow[3] ?? ""),
      capacity: squash(shipRow[4] ?? ""),
      text: squash(shipRow[5] ?? ""),
    };
  } else warnings.push(`${title}: no flagship parsed`);

  // Mech table: header holds the name, first body row the text.
  let mech = null;
  const mechText = s["Mech"];
  if (mechText) {
    const nameMatch = mechText.match(/!\s*colspan="2"[^|]*\|\s*(.+)/);
    const rows = tableRows(mechText);
    const name = clean(nameMatch?.[1] ?? "");
    const text = squash(rows[0]?.[0] ?? "");
    if (name && text) mech = { name, text };
  }

  // Breakthrough (Thunder's Edge): name in the header, synergy text below.
  let breakthrough = null;
  const btText = s["Breakthrough"];
  if (btText) {
    const nameMatch = btText.match(/!\s*colspan="3"[^|]*\|\s*(.+)/);
    const name = clean(nameMatch?.[1] ?? "");
    const text = tableRows(btText)
      .flat()
      .map(squash)
      .filter((x) => x && !/^(Synergy|Unit|Ability)$/i.test(x))
      .join(" ");
    // Each breakthrough grants a synergy between two technology colours.
    const synergy = [...btText.matchAll(/\{\{Tech\|([a-z]+)\}\}/gi)]
      .map((m) => m[1].toLowerCase())
      .filter((c, i, a) => a.indexOf(c) === i);
    if (name) {
      breakthrough = { name, text: squash(text) };
      if (synergy.length === 2) breakthrough.synergy = synergy;
    }
  }

  // Heading is singular on most pages, plural on the few factions that have
  // more than one note (the Empyrean has Dark Pact and Blood Pact).
  const promissory = namedCards(
    s["Faction Promissory Note"] ?? s["Faction Promissory Notes"] ?? "",
  );
  if (!promissory.length) warnings.push(`${title}: no promissory note parsed`);

  const factionTech = namedCards(s["Faction Technologies"] ?? "");

  const uniqueUnits = unitVariants(
    `${s["Faction Specific Units"] ?? ""}\n${s["Faction Specific Components"] ?? ""}`,
  );

  const faq = (clean(s["FAQ"] ?? "", { keepBreaks: true } ) ?? "")
    .split(/(?=Q:)/)
    .map(squash)
    .filter((x) => x.startsWith("Q:"));

  // The wiki writes the middle tier as "Moderate"; the app calls it Medium.
  const complexityRaw = squash(clean(box.complexity ?? "") ?? "").toLowerCase();
  const COMPLEXITY = { low: "Low", moderate: "Medium", medium: "Medium", high: "High" };
  const difficulty = COMPLEXITY[complexityRaw] ?? null;
  if (!difficulty) warnings.push(`${title}: unrecognised complexity "${complexityRaw}"`);

  const boxExpansion = clean(box.expansion ?? "") ?? "";

  return {
    id,
    name: clean(box.title1 ?? "") ?? title,
    shortName,
    expansion,
    boxExpansion,
    difficulty: difficulty ?? "Medium",
    color: clean(box.faction_color ?? ""),
    commodities: Number(squash(clean(box.commodities ?? "") ?? "")) || null,
    homePlanets: listFrom(box.starting_planets),
    startingUnits: listFrom(box.starting_units),
    startingTech: listFrom(box.starting_technologies),
    symbol: symbolUrl ?? null,
    abilities,
    leaders,
    flagship,
    mech,
    breakthrough,
    promissory,
    factionTech,
    uniqueUnits,
    faq,
  };
}

/* ------------------------------------------------------------------ run */

const symbolFiles = await symbolFileByKey();
const symbolUrlByFile = await imageUrls(Object.values(symbolFiles));

const parsed = [];
for (const [title, id, shortName, expansion] of FACTIONS) {
  const w = await fetchPage(title);
  // The infobox names which Symbol-template key this faction uses.
  const key = w.match(/symbol\s*=\s*\{\{Symbol\|([^}|]+)/i)?.[1]?.trim();
  const file = key ? symbolFiles[key] : null;
  if (!file) warnings.push(`${title}: could not resolve symbol (key "${key}")`);
  parsed.push(
    parseFaction(title, id, shortName, expansion, w, file ? symbolUrlByFile[file] : null),
  );
  await new Promise((r) => setTimeout(r, 250));
}

// Sanity-check our hardcoded expansion against the infobox.
const EXPECTED = {
  base: /Base Game/i,
  pok: /Prophecy of Kings/i,
  codex3: /Codex/i,
  thundersedge: /Thunder/i,
};
for (const f of parsed) {
  if (!EXPECTED[f.expansion]?.test(f.boxExpansion)) {
    warnings.push(
      `${f.name}: expansion mismatch — pinned "${f.expansion}", infobox says "${f.boxExpansion}"`,
    );
  }
  delete f.boxExpansion;
}

/* ----------------------------------------------------------------- emit */

const j = (v) => JSON.stringify(v);
const arr = (items, indent) =>
  items.length
    ? `[\n${items.map((x) => `${indent}  ${j(x)},`).join("\n")}\n${indent}]`
    : "[]";

const body = parsed
  .map((f) => {
    const lines = [
      `    id: ${j(f.id)},`,
      `    name: ${j(f.name)},`,
      `    shortName: ${j(f.shortName)},`,
      `    expansion: ${j(f.expansion)},`,
      `    difficulty: ${j(f.difficulty)},`,
    ];
    if (f.color) lines.push(`    color: ${j(f.color)},`);
    if (f.symbol) lines.push(`    symbol: ${j(f.symbol)},`);
    if (f.commodities !== null) lines.push(`    commodities: ${f.commodities},`);
    if (f.homePlanets.length)
      lines.push(`    homePlanets: ${arr(f.homePlanets, "    ")},`);
    if (f.startingUnits.length)
      lines.push(`    startingUnits: ${arr(f.startingUnits, "    ")},`);
    if (f.startingTech.length)
      lines.push(`    startingTech: ${arr(f.startingTech, "    ")},`);

    lines.push(
      `    abilities: [\n${f.abilities
        .map((a) => `      { name: ${j(a.name)}, text: ${j(a.text)} },`)
        .join("\n")}\n    ],`,
    );

    if (f.leaders.length) {
      lines.push(
        `    leaders: [\n${f.leaders
          .map(
            (l) =>
              `      {\n        role: ${j(l.role)},\n        name: ${j(l.name)},\n` +
              `        unlock: ${j(l.unlock)},\n        ability: ${j(l.ability)},\n      },`,
          )
          .join("\n")}\n    ],`,
      );
    }
    if (f.flagship) {
      lines.push(
        `    flagship: {\n      name: ${j(f.flagship.name)},\n      cost: ${j(f.flagship.cost)},\n` +
          `      combat: ${j(f.flagship.combat)},\n      move: ${j(f.flagship.move)},\n` +
          `      capacity: ${j(f.flagship.capacity)},\n      text: ${j(f.flagship.text)},\n    },`,
      );
    }
    if (f.mech)
      lines.push(
        `    mech: { name: ${j(f.mech.name)}, text: ${j(f.mech.text)} },`,
      );
    if (f.breakthrough) {
      const bt = [
        `      name: ${j(f.breakthrough.name)},`,
        `      text: ${j(f.breakthrough.text)},`,
      ];
      if (f.breakthrough.synergy)
        bt.push(`      synergy: ${j(f.breakthrough.synergy)},`);
      lines.push(`    breakthrough: {\n${bt.join("\n")}\n    },`);
    }
    if (f.promissory.length) {
      lines.push(
        `    promissory: [\n${f.promissory
          .map(
            (n) =>
              `      { name: ${j(n.name)}, text: ${j(n.text)} },`,
          )
          .join("\n")}\n    ],`,
      );
    }
    if (f.factionTech.length) {
      lines.push(
        `    factionTech: [\n${f.factionTech
          .map((t) => {
            const parts = [`        name: ${j(t.name)}`, `        text: ${j(t.text)}`];
            if (t.color) parts.push(`        color: ${j(t.color)}`);
            if (t.prerequisites)
              parts.push(`        prerequisites: ${j(t.prerequisites)}`);
            return `      {\n${parts.join(",\n")},\n      },`;
          })
          .join("\n")}\n    ],`,
      );
    }
    if (f.uniqueUnits.length) {
      lines.push(
        `    uniqueUnits: [\n${f.uniqueUnits
          .map((u) => {
            const parts = [
              `        name: ${j(u.name)}`,
              `        cost: ${j(u.cost)}`,
              `        combat: ${j(u.combat)}`,
            ];
            if (u.text) parts.push(`        text: ${j(u.text)}`);
            if (u.prerequisites)
              parts.push(`        prerequisites: ${j(u.prerequisites)}`);
            return `      {\n${parts.join(",\n")},\n      },`;
          })
          .join("\n")}\n    ],`,
      );
    }
    if (f.faq.length) lines.push(`    faq: ${arr(f.faq, "    ")},`);

    return `  {\n${lines.join("\n")}\n  },`;
  })
  .join("\n");

const file = `import type { GeneratedFaction } from "@/lib/types";

/**
 * Faction sheet data.
 *
 * GENERATED FILE — do not hand-edit.
 * Regenerate with \`npm run gen:factions\`.
 *
 * Scraped from the Twilight Imperium Fandom wiki
 * (https://twilight-imperium.fandom.com/wiki/Factions). Ability, leader,
 * flagship, mech and breakthrough text is verbatim from the faction sheets.
 *
 * Editorial commentary (tagline, playstyle) is NOT here — it lives in
 * \`factionNotes.ts\` so that regenerating this file never discards it.
 */
export const GENERATED_FACTIONS: GeneratedFaction[] = [
${body}
];
`;

const out = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "data",
  "factions.generated.ts",
);
await writeFile(out, file, "utf8");

const byExpansion = parsed.reduce(
  (acc, f) => ({ ...acc, [f.expansion]: (acc[f.expansion] ?? 0) + 1 }),
  {},
);
console.log(`Wrote ${parsed.length} factions ${JSON.stringify(byExpansion)}`);
console.log(
  `  ${parsed.reduce((n, f) => n + f.abilities.length, 0)} abilities, ` +
    `${parsed.filter((f) => f.symbol).length} symbols, ` +
    `${parsed.reduce((n, f) => n + f.promissory.length, 0)} promissory notes, ` +
    `${parsed.reduce((n, f) => n + f.factionTech.length, 0)} faction techs, ` +
    `${parsed.reduce((n, f) => n + f.uniqueUnits.length, 0)} unique unit variants, ` +
    `${parsed.reduce((n, f) => n + f.leaders.length, 0)} leaders, ` +
    `${parsed.filter((f) => f.flagship).length} flagships, ` +
    `${parsed.filter((f) => f.mech).length} mechs, ` +
    `${parsed.filter((f) => f.breakthrough).length} breakthroughs, ` +
    `${parsed.filter((f) => f.faq.length).length} with FAQ entries.`,
);
if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`  - ${w}`);
}
