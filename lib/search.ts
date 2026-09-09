import type { ExpansionId } from "./types";
import { RULES } from "@/data/rules";
import { FAQ } from "@/data/faq.generated";
import { ACTION_CARDS } from "@/data/actionCards";
import { TECHNOLOGIES } from "@/data/technologies.generated";
import { UNITS } from "@/data/units.generated";
import { FACTIONS } from "@/data/factions";
import { AGENDAS } from "@/data/agendas.generated";
import { PUBLIC_OBJECTIVES, SECRET_OBJECTIVES } from "@/data/objectives";
import { STRATEGY_CARDS } from "@/data/strategyCards";
import { GALACTIC_EVENTS } from "@/data/galacticEvents.generated";
import {
  EXPLORATION_CARDS,
  RELICS,
} from "@/data/exploration.generated";
import { PROMISSORY_NOTES } from "@/data/promissory.generated";

/**
 * One searchable thing, whatever it actually is.
 *
 * `kind` is what the reader sees on the badge, `href` is where the thing
 * lives, and `text` is everything worth matching against, flattened once at
 * module load so searching is a substring test rather than a walk of thirteen
 * differently-shaped datasets.
 */
export interface SearchEntry {
  id: string;
  kind: SearchKind;
  name: string;
  /** One line of context shown under the name. */
  detail: string;
  href: string;
  /** Which tab of that page, when the page has tabs. */
  tab?: string;
  expansion: ExpansionId;
  /** Expansions the entry talks about but does not come from — all must be on. */
  requires?: ExpansionId[];
  /** Lowercased haystack. */
  text: string;
  /**
   * Haystack for parts of the entry that are not always on screen — a base
   * game faction's Prophecy of Kings leaders. Searched only while that
   * expansion is enabled, so a search cannot match wording the reader has
   * switched off.
   */
  gated?: { expansion: ExpansionId; text: string }[];
}

export type SearchKind =
  | "Rule"
  | "FAQ"
  | "Action card"
  | "Technology"
  | "Unit"
  | "Faction"
  | "Agenda"
  | "Objective"
  | "Strategy card"
  | "Galactic event"
  | "Exploration"
  | "Relic"
  | "Promissory note";

/** The page each kind of result lives on, and which tab of it. */
const DESTINATION: Record<SearchKind, { path: string; tab?: string }> = {
  Rule: { path: "/rules", tab: "rules" },
  FAQ: { path: "/rules", tab: "faq" },
  "Action card": { path: "/action-cards" },
  Technology: { path: "/technologies", tab: "tech" },
  Unit: { path: "/technologies", tab: "units" },
  Faction: { path: "/factions" },
  Agenda: { path: "/reference", tab: "agendas" },
  Objective: { path: "/reference", tab: "objectives" },
  "Strategy card": { path: "/reference", tab: "strategy" },
  "Galactic event": { path: "/reference", tab: "events" },
  Exploration: { path: "/reference", tab: "exploration" },
  Relic: { path: "/reference", tab: "exploration" },
  "Promissory note": { path: "/reference", tab: "promissory" },
};

/**
 * Where to send someone for a result, carrying the query so the page arrives
 * already filtered to what they were looking for.
 */
export function hrefFor(target: SearchEntry, query: string): string {
  const params = new URLSearchParams();
  if (query.trim()) params.set("q", query.trim());
  if (target.tab) params.set("tab", target.tab);
  const qs = params.toString();
  return qs ? `${target.href}?${qs}` : target.href;
}

const entry = (
  kind: SearchKind,
  id: string,
  name: string,
  detail: string,
  expansion: ExpansionId,
  extra: string[] = [],
  /** For the one kind that lives on two different tabs: secret objectives. */
  tab: string | undefined = DESTINATION[kind].tab,
): SearchEntry => ({
  id: `${kind}:${id}`,
  kind,
  name,
  detail,
  href: DESTINATION[kind].path,
  tab,
  expansion,
  text: [name, detail, ...extra].join(" ").toLowerCase(),
});

/**
 * The whole app, flattened. Built once at module load — every dataset is a
 * static import, so there is nothing to await and no reason to rebuild it.
 */
export const SEARCH_INDEX: SearchEntry[] = [
  ...RULES.map((r) =>
    entry("Rule", r.id, r.term, r.summary, r.expansion, [
      r.category,
      ...r.clauses,
      r.gotcha ?? "",
    ]),
  ),
  ...FAQ.map((f) => ({
    ...entry("FAQ", f.id, f.question, f.answer, f.expansion, [
      f.topic,
      f.subtopic ?? "",
    ]),
    requires: f.requires,
  })),
  ...ACTION_CARDS.map((c) =>
    entry("Action card", c.id, c.name, c.text, c.expansion, [
      c.window,
      c.note ?? "",
      ...(c.faq ?? []),
    ]),
  ),
  ...TECHNOLOGIES.map((t) =>
    entry("Technology", t.id, t.name, t.text, t.expansion, [
      t.color ?? "",
      t.unit?.of ?? "",
      ...(t.revisions ?? []).map((v) => v.text),
    ]),
  ),
  ...UNITS.map((u) =>
    entry(
      "Unit",
      u.id,
      u.name,
      [u.cost && `Cost ${u.cost}`, u.combat && `Combat ${u.combat}`]
        .filter(Boolean)
        .join(" · ") || u.category,
      u.expansion,
      [u.category, ...(u.abilities ?? [])],
    ),
  ),
  ...FACTIONS.map((f) => ({
    ...entry(
      "Faction",
      f.id,
      f.name,
      f.tagline ?? f.abilities[0]?.text ?? "",
      f.expansion,
      [
        ...f.abilities.flatMap((a) => [a.name, a.text]),
        f.flagship?.name ?? "",
        f.playstyle ?? "",
      ],
    ),
    // Leaders, mechs and breakthroughs are on base game faction sheets too,
    // but only once the expansion that added them is on.
    gated: [
      ...(f.leaders ?? []).map((l) => ({
        expansion: l.expansion,
        text: `${l.name} ${l.ability}`.toLowerCase(),
      })),
      ...(f.mech ? [{ expansion: f.mech.expansion, text: f.mech.name.toLowerCase() }] : []),
      ...(f.breakthrough
        ? [{ expansion: f.breakthrough.expansion, text: f.breakthrough.name.toLowerCase() }]
        : []),
    ],
  })),
  ...AGENDAS.map((a) =>
    entry(
      "Agenda",
      a.id,
      a.name,
      a.outcomes.map((o) => (o.label ? `${o.label}: ${o.text}` : o.text)).join(" "),
      a.expansion,
      [a.kind, a.elect ?? ""],
    ),
  ),
  ...PUBLIC_OBJECTIVES.map((o) =>
    entry("Objective", o.id, o.name, o.requirement, o.expansion, [
      `Stage ${o.stage}`,
      o.omega ?? "",
    ]),
  ),
  ...SECRET_OBJECTIVES.map((o) =>
    entry(
      "Objective",
      `secret-${o.id}`,
      o.name,
      o.requirement,
      o.expansion,
      ["secret", o.phase, o.omega ?? ""],
      "secrets",
    ),
  ),
  ...STRATEGY_CARDS.map((c) =>
    entry(
      "Strategy card",
      `${c.expansion}-${c.initiative}`,
      c.name,
      c.primary,
      c.expansion,
      [String(c.initiative), c.secondary],
    ),
  ),
  ...GALACTIC_EVENTS.map((e) =>
    entry("Galactic event", e.id, e.name, e.effect[0] ?? "", e.expansion, e.effect),
  ),
  ...EXPLORATION_CARDS.map((c) =>
    entry("Exploration", c.id, c.name, c.text, c.expansion, [`${c.deck} deck`]),
  ),
  ...RELICS.map((r) =>
    entry("Relic", r.id, r.name, r.text, r.expansion, [
      ...(r.revisions ?? []).map((v) => v.text),
    ]),
  ),
  ...PROMISSORY_NOTES.map((n) =>
    entry("Promissory note", n.id, n.name, n.text, n.expansion),
  ),
];

/**
 * Rank matches so the obvious answer is first: an exact name, then a name that
 * starts with the query, then a name that contains it, then a body match.
 * Within a tier, shorter names win — "Veto" should beat "Veto Ω".
 */
function score(
  candidate: SearchEntry,
  query: string,
  isEnabled: (expansion: ExpansionId) => boolean,
): number {
  const name = candidate.name.toLowerCase();
  if (name === query) return 0;
  if (name.startsWith(query)) return 1;
  if (name.includes(query)) return 2;
  if (candidate.text.includes(query)) return 3;
  const gated = candidate.gated ?? [];
  if (gated.some((g) => isEnabled(g.expansion) && g.text.includes(query))) return 3;
  return Number.POSITIVE_INFINITY;
}

export function searchAll(
  query: string,
  isEnabled: (expansion: ExpansionId) => boolean,
  limit = 40,
): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];

  const hits: { entry: SearchEntry; rank: number }[] = [];
  for (const candidate of SEARCH_INDEX) {
    if (!isEnabled(candidate.expansion)) continue;
    if (!(candidate.requires ?? []).every(isEnabled)) continue;
    const rank = score(candidate, q, isEnabled);
    if (rank !== Number.POSITIVE_INFINITY) hits.push({ entry: candidate, rank });
  }

  hits.sort(
    (a, b) =>
      a.rank - b.rank ||
      a.entry.name.length - b.entry.name.length ||
      a.entry.name.localeCompare(b.entry.name),
  );
  return hits.slice(0, limit).map((h) => h.entry);
}
