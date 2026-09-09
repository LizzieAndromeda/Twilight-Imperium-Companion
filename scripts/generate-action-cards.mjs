/**
 * Regenerates `data/actionCards.ts` from the AsyncTI4 map generator bot's
 * public-domain game data.
 *
 *   node scripts/generate-action-cards.mjs
 *
 * The upstream dump lists one entry per physical card, so cards printed
 * multiple times appear multiple times; they are collapsed here into one entry
 * with a `copies` count.
 */
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const SOURCE_URL =
  "https://raw.githubusercontent.com/AsyncTI4/TI4_map_generator_bot/master/src/main/resources/data/action_cards/action_cards.json";

/**
 * Upstream `source` values we carry, mapped to our expansion ids.
 *
 * "asteroid" is deliberately excluded: it is a variant deck composition, and
 * every one of its entries repeats a card that already exists under base, pok
 * or codex1, so including it would duplicate the list.
 */
const SOURCE_TO_EXPANSION = {
  base: "base",
  pok: "pok",
  codex1: "codex1",
};

const clean = (value) => {
  if (!value) return null;
  const text = String(value).replace(/\s+/g, " ").trim();
  return text.length ? text : null;
};

const response = await fetch(SOURCE_URL);
if (!response.ok) {
  throw new Error(`Could not fetch upstream data: ${response.status}`);
}
const raw = await response.json();

const groups = new Map();
for (const card of raw) {
  const expansion = SOURCE_TO_EXPANSION[card.source];
  if (!expansion) continue;
  const key = `${expansion}|${card.name}`;
  if (!groups.has(key)) groups.set(key, { card, expansion, copies: 0 });
  groups.get(key).copies += 1;
}

const cards = [...groups.values()]
  .map(({ card, expansion, copies }) => ({
    id: card.alias,
    name: clean(card.name),
    expansion,
    phase: clean(card.phase) ?? "Action",
    window: clean(card.window) ?? "",
    text: clean(card.text) ?? "",
    flavor: clean(card.flavorText),
    note: clean(card.notes),
    copies,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

const j = (value) => JSON.stringify(value);

const body = cards
  .map((card) => {
    const lines = [
      `    id: ${j(card.id)},`,
      `    name: ${j(card.name)},`,
      `    expansion: ${j(card.expansion)},`,
      `    phase: ${j(card.phase)},`,
      `    window: ${j(card.window)},`,
      `    text: ${j(card.text)},`,
      `    copies: ${card.copies},`,
    ];
    if (card.flavor) lines.push(`    flavor: ${j(card.flavor)},`);
    if (card.note) lines.push(`    note: ${j(card.note)},`);
    return `  {\n${lines.join("\n")}\n  },`;
  })
  .join("\n");

const file = `import type { ActionCard } from "@/lib/types";

/**
 * The full action card deck.
 *
 * GENERATED FILE — do not hand-edit.
 * Regenerate with \`node scripts/generate-action-cards.mjs\`.
 *
 * Card text comes from the AsyncTI4 map generator bot's game data
 * (https://github.com/AsyncTI4/TI4_map_generator_bot), which that project
 * releases into the public domain. The \`note\` field is their rules
 * clarification for interactions the community has had to settle; most cards
 * do not have one, and none have been invented here.
 *
 * \`copies\` is how many of that card are physically in the deck.
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

const withNotes = cards.filter((c) => c.note).length;
const byExpansion = cards.reduce(
  (acc, c) => ({ ...acc, [c.expansion]: (acc[c.expansion] ?? 0) + 1 }),
  {},
);
console.log(
  `Wrote ${cards.length} cards ${JSON.stringify(byExpansion)}, ` +
    `${withNotes} with clarification notes, ` +
    `${cards.reduce((n, c) => n + c.copies, 0)} physical copies.`,
);
