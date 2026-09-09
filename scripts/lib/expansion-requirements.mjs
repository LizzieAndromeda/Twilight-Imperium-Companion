import { pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const DATA = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "data");

/**
 * Which expansions a piece of free text depends on.
 *
 * The wiki files an FAQ ruling under whoever it is about — a faction, a topic —
 * and nothing more. That is not the same question as which products you need to
 * own to care about it: a base game faction's page carries rulings about that
 * faction's Prophecy of Kings leaders, because leaders were added to every
 * faction, base ones included. Tagging those rulings "base", which is all the
 * page itself can tell you, is how a leader nobody at the table owns ends up on
 * screen.
 *
 * There is no marker on the wiki to scrape for this, so the requirement is
 * derived instead: a ruling needs whatever expansion introduced the things it
 * names. Names come from the other generated datasets rather than a list kept
 * here, so this stays correct as those are regenerated.
 */

/** Ω and "Omega" are the same card; the wiki uses both, often in one sentence. */
const normalise = (s) => String(s).replace(/Ω/g, "Omega").replace(/\s+/g, " ");

/**
 * Names shorter than this match inside ordinary words and sentences — the
 * Jol-Nar hero "Rin" would fire on "during", "rings", "printed". The concept
 * patterns below catch those rulings by their role word instead.
 */
const MIN_NAME = 5;

/**
 * Things an expansion introduced that no single card is named for. A ruling
 * that says "the Arborec's hero ability" names no leader we could match, but
 * still cannot come up in a base game.
 */
const CONCEPTS = [
  [/\b(agents?|commanders?|heroe?s?|leaders?)\b/i, "pok"],
  [/\bmechs?\b/i, "pok"],
  [/\balliance\b/i, "pok"],
  [/\brelics?\b/i, "pok"],
  [/\bexplorat\w*\b|\bexplores?\b|\bexplored\b/i, "pok"],
  [/\bfrontier\b/i, "pok"],
  [/\blegendary\b/i, "pok"],
  [/\bbreakthroughs?\b/i, "thundersedge"],
];

/**
 * Rulings that name expansion content only as an example, while the ruling
 * itself answers a base game question. Gating these would hide an answer the
 * reader needs, so the derivation is overridden by hand. Keyed on a distinctive
 * fragment of the question; the generator fails loudly if one stops matching,
 * so a reworded ruling cannot silently lose its exemption.
 */
const NOT_GATED = [
  // About the "replace" keyword and component limitations generally. Mechs
  // appear once, as the example of an empty reinforcement pool.
  'the keyword "replace"',
];

/** Import a generated dataset. Node strips the types; the type-only import of
 *  `@/lib/types` is erased before anything tries to resolve the alias. */
async function dataset(file) {
  return import(pathToFileURL(join(DATA, file)).href);
}

/**
 * name -> the expansion that introduced it, for every named thing in the app
 * that the base game does not contain.
 */
export async function buildLexicon({ factions } = {}) {
  const named = new Map();
  const add = (name, expansion) => {
    if (!name || !expansion || expansion === "base") return;
    const key = normalise(name).trim();
    if (key.length < MIN_NAME) return;
    if (!named.has(key)) named.set(key, expansion);
  };

  // The caller passes its own list when it is the one regenerating factions,
  // so content added in this very run is recognised rather than waiting for a
  // second pass over a file that does not exist yet.
  const allFactions = factions ?? (await dataset("factions.generated.ts")).GENERATED_FACTIONS;
  for (const f of allFactions) {
    add(f.name.replace(/^The /, ""), f.expansion);
    add(f.shortName, f.expansion);
    // Leaders exist at all only because of Prophecy of Kings, so a leader on a
    // base game faction is Prophecy of Kings content even though the faction
    // is not.
    for (const l of f.leaders ?? []) add(l.name, l.expansion === "base" ? "pok" : l.expansion);
    if (f.mech) add(f.mech.name, f.mech.expansion);
    if (f.breakthrough) add(f.breakthrough.name, f.breakthrough.expansion);
    for (const t of f.factionTech ?? []) add(t.name, t.expansion);
    for (const p of f.promissory ?? []) add(p.name, p.expansion);
  }

  const { RELICS, EXPLORATION_CARDS } = await dataset("exploration.generated.ts");
  const { GALACTIC_EVENTS } = await dataset("galacticEvents.generated.ts");
  const { TECHNOLOGIES } = await dataset("technologies.generated.ts");
  const { AGENDAS } = await dataset("agendas.generated.ts");
  const { PUBLIC_OBJECTIVES, SECRET_OBJECTIVES } = await dataset("objectives.generated.ts");
  const { PROMISSORY_NOTES } = await dataset("promissory.generated.ts");
  for (const c of [
    ...RELICS,
    ...EXPLORATION_CARDS,
    ...GALACTIC_EVENTS,
    ...TECHNOLOGIES,
    ...AGENDAS,
    ...PUBLIC_OBJECTIVES,
    ...SECRET_OBJECTIVES,
    ...PROMISSORY_NOTES,
  ]) {
    add(c.name, c.expansion);
  }

  return named;
}

/**
 * The expansions `text` depends on, beyond the ones in `already`.
 *
 * `already` is what the caller has established on other grounds — usually the
 * expansion of the page the ruling came from — so the result is only the extra
 * requirement, and is empty for the ordinary case of a ruling about the thing
 * whose page it is on.
 */
export function requirementsFor(text, lexicon, already = ["base"]) {
  const t = normalise(text);
  if (NOT_GATED.some((fragment) => t.includes(fragment))) return [];

  const found = new Set();
  for (const [name, expansion] of lexicon) if (t.includes(name)) found.add(expansion);
  for (const [pattern, expansion] of CONCEPTS) if (pattern.test(t)) found.add(expansion);
  for (const e of already) found.delete(e);
  return [...found].sort();
}

/**
 * Every exemption must still match a ruling somewhere, or it has silently
 * expired and whatever it was protecting is now gated.
 *
 * Checked against every ruling in the app at once — the faction sheets on disk
 * plus whatever the caller is generating — because an exemption written for a
 * ruling on one page would look stale to a generator that cannot see it.
 */
export async function assertExemptionsUsed(callerText) {
  const { GENERATED_FACTIONS } = await dataset("factions.generated.ts");
  const { FAQ } = await dataset("faq.generated.ts");
  const joined = [
    ...callerText,
    ...GENERATED_FACTIONS.flatMap((f) => (f.faq ?? []).map((q) => q.text ?? q)),
    ...FAQ.map((e) => `${e.question} ${e.answer}`),
  ]
    .map(normalise)
    .join("\n");
  const stale = NOT_GATED.filter((f) => !joined.includes(f));
  if (stale.length) {
    throw new Error(
      `NOT_GATED entries no longer match any ruling: ${stale.join(", ")}. ` +
        `The ruling was reworded or removed — re-read it and update the list.`,
    );
  }
}
