/**
 * Regenerates `data/faq.generated.ts` from the wiki's FAQ page.
 *
 *   node scripts/generate-faq.mjs
 *
 * The page carries three tiers of authority and says so in its own preamble:
 * bolded Q&As are in the Living Rules Reference, unbolded ones are official
 * answers from the designer that have not made it into the reference yet, and
 * the "Unofficial Answers" section is the community's best interpretation of
 * questions FFG has never answered. That distinction is the most useful thing
 * on the page, so it is preserved rather than flattened.
 */
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  assertExemptionsUsed,
  buildLexicon,
  requirementsFor,
} from "./lib/expansion-requirements.mjs";

const URL =
  "https://twilight-imperium.fandom.com/api.php?action=parse&page=FAQ&prop=wikitext&format=json";

const warnings = [];

/**
 * Wiki faction names -> our faction ids, so a per-faction ruling can be tagged
 * with that faction's expansion and linked to its page.
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
};

const FACTION_EXPANSION = {
  argent: "pok",
  empyrean: "pok",
  mahact: "pok",
  naazrokha: "pok",
  nomad: "pok",
  titans: "pok",
  vuilraith: "pok",
  keleres: "codex3",
};

/**
 * Topic-level expansion. Exploration only exists with Prophecy of Kings; the
 * rest are core subjects, even where an individual answer happens to mention a
 * card from a later product.
 */
const TOPIC_EXPANSION = { exploration: "pok" };

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
    .replace(/^-|-$/g, "")
    .slice(0, 60);

const factionId = (name) =>
  FACTION_IDS[squash(name).toLowerCase().replace(/[‘’]/g, "'")] ?? null;

/** Ordered sections with their heading level. */
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

/**
 * Pull the Q&A pairs out of a section.
 *
 * A pair starts at a "Q:" that begins a line — bolded or not — and runs to the
 * next one. Whether the marker was bolded says which tier of authority the
 * answer has, so it is read before the markup is stripped.
 */
function questionsIn(text) {
  const out = [];
  // The bold markers land in four different places across the page —
  // '''Q:''' , '''Q''': , '''Q: and plain Q: — so the apostrophes are treated
  // as optional either side of the letter.
  const Q_MARKER = /(?:''')?\s*Q\s*(?:''')?\s*:\s*(?:''')?/;
  const A_MARKER = /(?:''')?\s*A\s*(?:''')?\s*:\s*(?:''')?/;

  const blocks = text
    .split(new RegExp(`\\n(?=\\s*${Q_MARKER.source})`))
    .filter((b) => new RegExp(`^\\s*${Q_MARKER.source}`).test(b));

  for (const block of blocks) {
    const bolded = /'''\s*Q/.test(block);
    // Split the block at its answer marker.
    const at = block.search(new RegExp(`\\n\\s*${A_MARKER.source}`));
    if (at === -1) continue;

    const question = clean(
      block.slice(0, at).replace(new RegExp(`^\\s*${Q_MARKER.source}`), ""),
    );
    const answer = clean(
      block.slice(at).replace(new RegExp(`^\\s*${A_MARKER.source}`), ""),
    );
    if (!question || !answer) continue;
    out.push({ question, answer, bolded });
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

const entries = [];
let topic = null;
let subtopic = null;
let unofficial = false;

for (const section of sectionList(wikitext)) {
  if (section.level === 2) {
    topic = section.heading;
    subtopic = null;
    unofficial = /^Unofficial Answers$/i.test(topic);
  } else if (section.level >= 3) {
    subtopic = section.heading;
  }
  if (!topic || topic === "(intro)") continue;

  const owner = subtopic ? factionId(subtopic) : null;
  const expansion = owner
    ? (FACTION_EXPANSION[owner] ?? "base")
    : (TOPIC_EXPANSION[topic.toLowerCase()] ?? "base");

  for (const qa of questionsIn(section.text)) {
    entries.push({
      // The question is the only stable thing about an entry, so the id is
      // derived from it.
      id: slug(qa.question),
      question: qa.question,
      answer: qa.answer,
      topic: unofficial ? (subtopic ?? "General") : topic,
      subtopic: unofficial ? null : subtopic,
      faction: owner,
      expansion,
      authority: unofficial
        ? "community"
        : qa.bolded
          ? "living-rules"
          : "designer",
    });
  }
}

// Ids come from question text, which can repeat across topics.
const seen = new Map();
for (const entry of entries) {
  const count = (seen.get(entry.id) ?? 0) + 1;
  seen.set(entry.id, count);
  if (count > 1) entry.id = `${entry.id}-${count}`;
}

const byAuthority = entries.reduce(
  (acc, e) => ({ ...acc, [e.authority]: (acc[e.authority] ?? 0) + 1 }),
  {},
);
const byTopic = entries.reduce(
  (acc, e) => ({ ...acc, [e.topic]: (acc[e.topic] ?? 0) + 1 }),
  {},
);

if (entries.length < 150) {
  warnings.push(`only ${entries.length} entries parsed; the page has ~191 Q markers`);
}
for (const e of entries) {
  if (e.answer.length < 2) warnings.push(`${e.id}: suspiciously short answer`);
}

/**
 * Work out which expansions each ruling actually needs.
 *
 * The page files a ruling under whoever it is about, which is not the same
 * question as which products you need to own to care about it: most of the
 * rulings filed under a base game faction are about that faction's Prophecy of
 * Kings leaders. See `lib/expansion-requirements.mjs`.
 */
const lexicon = await buildLexicon();
for (const e of entries) {
  const requires = requirementsFor(
    `${e.question} ${e.answer}`,
    lexicon,
    ["base", e.expansion],
  );
  if (requires.length) e.requires = requires;
}
await assertExemptionsUsed(entries.map((e) => `${e.question} ${e.answer}`));

const gated = entries.filter((e) => e.requires).length;

/* ----------------------------------------------------------------- emit */

const j = (v) => JSON.stringify(v);

const body = entries
  .map((e) => {
    const lines = [
      `    id: ${j(e.id)},`,
      `    question: ${j(e.question)},`,
      `    answer: ${j(e.answer)},`,
      `    topic: ${j(e.topic)},`,
      `    authority: ${j(e.authority)},`,
      `    expansion: ${j(e.expansion)},`,
    ];
    if (e.subtopic) lines.push(`    subtopic: ${j(e.subtopic)},`);
    if (e.faction) lines.push(`    faction: ${j(e.faction)},`);
    if (e.requires)
      lines.push(`    requires: [${e.requires.map(j).join(", ")}],`);
    return `  {\n${lines.join("\n")}\n  },`;
  })
  .join("\n");

const file = `import type { FaqEntry } from "@/lib/types";

/**
 * The rules FAQ.
 *
 * GENERATED FILE — do not hand-edit.
 * Regenerate with \`npm run gen:faq\`.
 *
 * Scraped from https://twilight-imperium.fandom.com/wiki/FAQ.
 *
 * \`authority\` is the page's own three-way distinction, and it matters:
 * - "living-rules" — the ruling is in the Living Rules Reference.
 * - "designer"     — an official answer that has not reached the reference yet.
 * - "community"    — the community's reading of a question FFG has not answered.
 */
export const FAQ: FaqEntry[] = [
${body}
];

export const FAQ_BY_ID = new Map(FAQ.map((e) => [e.id, e]));

/** Topics in the order the wiki presents them. */
export const FAQ_TOPICS = ${JSON.stringify([...new Set(entries.map((e) => e.topic))], null, 2)
  .replace(/\n/g, "\n")} as const;
`;

await writeFile(
  join(dirname(fileURLToPath(import.meta.url)), "..", "data", "faq.generated.ts"),
  file,
  "utf8",
);

console.log(`Wrote ${entries.length} FAQ entries`);
console.log(`  authority: ${JSON.stringify(byAuthority)}`);
console.log(
  `  ${gated} of ${entries.length} rulings need an expansion beyond the one ` +
    `they are filed under.`,
);
console.log(`  topics:    ${JSON.stringify(byTopic)}`);
console.log(
  `  ${entries.filter((e) => e.faction).length} tied to a faction, ` +
    `${entries.filter((e) => e.expansion !== "base").length} not base game`,
);
if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const w of warnings.slice(0, 15)) console.log(`  - ${w}`);
}
