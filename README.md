# Twilight Imperium Companion

A rules companion and game tracker for **Twilight Imperium: Fourth Edition**, built as a
dark-mode Next.js app. Tick the expansions on your table and the whole app — rules,
factions and objectives — narrows to match.

An unofficial fan project. Twilight Imperium is a trademark of Fantasy Flight Games;
this app is not affiliated with or endorsed by them.

## What it does

- **Action cards** — 159 unique cards across the base game, Prophecy of Kings,
  Codex I, Thunder's Edge and the Twilight's Fall mode deck. Searchable by name,
  timing window and text, filterable by phase, with deck copy counts, community
  clarifications and the official FAQ rulings that name each card. Thunder's Edge
  Omega cards automatically hide the Codex I cards they replace.
- **Phase cheat sheet** — press `?` anywhere, or the Phases button in the top bar.
  What you can do in each phase, the printed step order, and the things that get
  missed. Opens on the phase your tracked game is in.
- **Rules reference** — searchable entries for the rules that actually stop play,
  written as ordered steps rather than prose, with cross-links and a "watch out" note
  on the ones people routinely get wrong. Beside it, an **FAQ** tab with 217 official
  rulings, each labelled with how much weight it carries: printed in the Living
  Rules Reference, an official designer answer that has not reached the reference
  yet, or the community's reading of something FFG never answered.
- **Technology** — 89 cards: 24 basic, 41 faction and 24 unit upgrades, with their
  prerequisite symbols, effects, Codex revisions, upgraded unit stats and which
  factions start with them. Grouped by colour and ordered by depth in the tree.
  A **Units** tab beside it carries the standard unit line those upgrades
  replace — cost, combat, move, capacity and printed abilities.
- **Factions** — all 30, including the five from Thunder's Edge, each with its
  faction symbol. Abilities, leaders (agent, commander, hero, with their Omega
  revisions), flagship, mech, unique unit variants, faction technologies,
  promissory notes, the Thunder's Edge breakthrough and its colour synergy,
  home planets, starting units and tech, and the FAQ rulings for that faction —
  all from the faction sheets, plus a hand-written read on how each one plays.
- **Agendas** — the whole deck, 50 cards either way. Laws and directives with
  their FOR/AGAINST outcomes or what they elect, searchable and filterable.
  Enabling Prophecy of Kings swaps out the 13 base agendas it removes for the
  13 it adds.
- **Reference tables** — the strategy cards with both abilities (including the two
  Thunder's Edge Omega revisions, which hide the cards they replace), the complete
  public objective decks (20 Stage I, 20 Stage II), all 40 secret objectives grouped
  by the phase they score in, the four exploration decks with their relic
  fragments, all 23 relics, the five general promissory notes, and all 20
  galactic events with their complexity ratings. Codex III revisions are shown
  on the cards they revise.
- **Game tracker** — rounds and phases, initiative order, victory points, revealed
  objectives, the speaker token, custodians token, trade goods, commodities and
  command token pools for three to eight players. The whole game is saved to the
  browser as you go, so a refresh loses nothing.
- **Expansion toggles** — Prophecy of Kings and Codices I–IV switch on and off from
  one dialog in the top bar. The base game is always on.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

Requires Node 20+.

## How it is built

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript, strict |
| Styling | **CSS Modules** with a shared design-token layer — no Tailwind |
| Components | Hand-built primitives, with [Radix UI](https://www.radix-ui.com/) for the behaviour that is hard to get right (dialog, select, tabs, accordion, checkbox, switch, toggle group) |
| State | React context over `useSyncExternalStore`-backed localStorage |

### Layout

```
app/                    routes: overview, rules, action cards, technology, factions,
                        reference, tracker
components/
  ui/                   design system primitives (Button, Card, Field, Modal, …)
  layout/               app shell, top nav, expansion settings, phase cheat sheet
  tracker/              game setup, board, player cards, objectives panel
data/                   rules, factions, action cards, strategy cards, objectives,
                        galactic events, phase cheat sheet
  *.generated.ts        scraped — never hand-edit, regenerate instead
  factionNotes.ts       hand-written editorial, safe from regeneration
scripts/                data generators
lib/                    types, expansion registry, storage
state/                  SettingsProvider (expansions), GameProvider (the game)
styles/tokens.css       every colour, space, radius and font in the app
```

### Design system

All visual values live in `styles/tokens.css` as CSS custom properties. Components
read those variables and never hardcode a colour, so retheming is a single-file
change. The app is deliberately dark-only — it is meant to be used at a table with
the lights down.

### Adding content

Every piece of content carries an `expansion` tag, and `useSettings().scope()`
filters any tagged list down to the enabled products. To add a rule, a faction or an
objective, append an entry to the relevant file in `data/` — it appears everywhere in
the app, correctly filtered, with no other changes.

To add a new expansion, add it to `EXPANSIONS` in `lib/expansions.ts` and it gains a
checkbox automatically.

**Expansion tags are not only on top-level records.** A faction sheet is not all
from one product: leaders and mechs arrived with Prophecy of Kings and
breakthroughs with Thunder's Edge, and they sit on base game faction sheets too.
So leaders, mechs, breakthroughs, faction technologies, promissory notes and
every Codex revision carry their own `expansion`, taken from the `{{Edition|…}}`
marker on the wiki, and the UI filters each block on its own tag rather than
inheriting the faction's. Anything nested that came from a different product
needs the same treatment — including search fields, which should only match
content that is actually on screen.

### Regenerating the scraped data

Eleven datasets are generated rather than hand-written:

```bash
npm run gen:action-cards   # data/actionCards.ts
npm run gen:factions       # data/factions.generated.ts
npm run gen:events         # data/galacticEvents.generated.ts
npm run gen:objectives     # data/objectives.generated.ts
npm run gen:technologies   # data/technologies.generated.ts
npm run gen:agendas        # data/agendas.generated.ts
npm run gen:faq            # data/faq.generated.ts
npm run gen:errata         # data/errata.generated.ts
npm run gen:exploration    # data/exploration.generated.ts
npm run gen:units          # data/units.generated.ts
npm run gen:promissory     # data/promissory.generated.ts
```

All eleven are deterministic — running them twice gives byte-identical output — and
each prints a warning list rather than failing silently when a source changes
shape. None of them touch `data/factionNotes.ts`, which holds the hand-written
tagline and playstyle for each faction.

**Faction data** is scraped from the individual faction pages on the wiki:
abilities, leaders and their Omega revisions, flagship, mech, unique unit
variants, faction technologies, promissory notes, the Thunder's Edge
breakthrough, setup details and FAQ. Faction ids are pinned in the script
because saved games store `factionId` — an id must never change once shipped.

**Technology data** comes from the four colour pages and the unit upgrade page.
Faction technologies are described *twice* on the wiki — on the faction's page
and on the page for their colour — so `gen:technologies` compares its own output
against `factions.generated.ts` and warns about any name that appears in one but
not the other. That check found three places where the wiki contradicts itself:

| Colour page | Faction page | Resolution |
| --- | --- | --- |
| Spacial Conduit Cylinder | Spatial Conduit Cylinder | Faction page — "spatial" is the word |
| I.I.H.Q Modernization | I.I.H.Q. Modernization | Faction page — missing full stop |
| Planet Splitter | Plane Splitter | **Unresolved.** Faction page wins by convention; check the printed card |

Those live in `NAME_CORRECTIONS` in the script, each with its reasoning, so the
cross-check stays clean and any *new* disagreement surfaces as a warning.

**Unit and promissory note data** cover only what is generic. Flagships and
mechs are absent from the unit list because there is no generic printed card
for either — every faction prints its own, and those come off the faction
pages. Likewise only the five general promissory notes are scraped here; the
faction-specific ones already arrive via `gen:factions`, and scraping them
twice would just create a second source to keep in step.

**Exploration data** is checked against the page's own prose. Each relic section
opens with a sentence like "These 10 Relics were introduced in…", so the
generator parses that number and compares it to what it scraped. That check
immediately caught something: the Codex II table has five rows but says three
relics, because Dynamis Core and Nano-Forge were both reprinted with new
wording in Thunder's Edge. Those are collapsed into one relic each with a
`revisions` entry carrying the reprint, which is hidden unless Thunder's Edge
is enabled — the same shape used for Omega cards elsewhere.

**Errata** are not given a page of their own. All 11 official corrections are
attached to the component they correct — the action card, faction ability,
flagship, promissory note, technology or strategy card — so you meet the
correction while reading the thing it corrects, with the words that actually
changed underlined. The generator resolves every erratum against the other
generated datasets by name and warns about any it cannot place, which is what
catches a rename on either side.

**FAQ data** keeps the page's own three-way distinction, which is the most
useful thing on it: `authority` is `living-rules`, `designer` or `community`.
The wiki signals the first two by whether the "Q:" is bolded, so the generator
reads that before the markup is stripped. Rulings filed under a faction inherit
that faction's expansion and are hidden with it; the Exploration topic is tagged
Prophecy of Kings. Everything else is treated as base game even where an
individual answer mentions a later card — the topic, not the answer text,
decides.

**Agenda data** checks itself twice over. The page states which cards Prophecy
of Kings removes in two places — inline in the base tables ("Core Mining
(removed in PoK)") and as a bullet list further down — and the generator takes
the union while warning about any card the two disagree on. It also asserts the
arithmetic: 34 laws plus 16 directives is 50, and swapping the 13 removed cards
for the 13 new ones is 50 again. Either check failing is a loud warning rather
than a quietly wrong deck.

**Faction symbols** are hot-linked from the wiki's CDN
(`static.wikia.nocookie.net`, allow-listed in `next.config.ts`) rather than
copied into `public/`. They are Fantasy Flight artwork, so the app points at
them where they already live instead of redistributing them in this repository.
`<FactionSymbol>` falls back to a monogram whenever an image is missing,
blocked or slow, so nothing depends on that request succeeding.

**Action card data**:

It merges two public sources:

- The [AsyncTI4 map generator bot](https://github.com/AsyncTI4/TI4_map_generator_bot),
  whose game data is public domain (that licence explicitly excludes art assets,
  which this project does not use). It is the authority for the base game,
  Prophecy of Kings and Codex I, and supplies stable card ids and community
  clarification notes.
- The [Twilight Imperium wiki](https://twilight-imperium.fandom.com/wiki/Action_Cards),
  which is the only source for Thunder's Edge, its Omega replacements, the
  Twilight's Fall mode deck, and the official FAQ rulings.

The script cross-checks the two on the decks they share and prints any
disagreement rather than silently preferring one. Two known handling decisions:

- The upstream AsyncTI4 dump lists one entry per physical card, so duplicates are
  collapsed into a `copies` count. Its `asteroid` deck is dropped — every entry
  repeats a card that already exists under another source.
- The sources disagree on one card. AsyncTI4 lists three copies of **Veto**, the
  wiki one. The wiki is right: at one copy the base deck totals exactly the
  printed 80 cards, at three it totals 82. Copy counts therefore come from the
  wiki.

## About the game content

Content in `data/` falls into two tiers, and it is worth knowing which is which.

**Scraped, verbatim** — action cards, faction sheets, technologies, agendas, the
FAQ, the errata, exploration and relics, both objective decks and galactic events. Generated from the sources above, complete for the products
they cover, and regenerable. Trust these at the table.

The rules reference and the phase cheat sheet are hand-written but **cross-checked
against the wiki's rules pages** entry by entry. Phase step orders, combat and invasion
sequences, command token counts, the custodians cost, the action card hand limit
and the voting order all verified clean; eleven entries have been corrected across
two passes. It is
still a paraphrased digest rather than a reproduction of the rulebook, and it is
not regenerable — a future edit can drift from the source in a way the generated
datasets cannot.

**Hand-written, paraphrased** — the rules reference, the strategy cards, and the
faction taglines and playstyles.

The playstyle notes are opinion, not scraped: **the wiki carries no strategy
content** for factions — no tier lists, no guides, and the Trivia sections are
lore and easter eggs. If you want sourced strategy the material exists off-wiki
(BoardGameGeek, r/twilightimperium), but it is prose written by individuals
rather than anything structured enough to generate from.

The move from the second tier to the first is the point of the generators. When
faction data was hand-written, MITOSIS was recorded as "place 1 infantry each
status phase" with no mention that Arborec space docks *cannot produce infantry
at all* — an ability quoted without its drawback reads as a straight buff. That
class of error is why the sheets are scraped now.

**Thunder's Edge coverage** is action cards, factions, galactic events, the two
revised strategy cards, and nine rules entries for its new mechanics (the
expedition, breakthroughs, the Fracture, neutral units, space stations, the
entropic scar, galvanize and coexistence). Its planet cards, system tiles, relics
and alliance cards are not catalogued.

Coexistence is the weak entry: the wiki has no rules page for it, only components
that reference it, so that entry summarises those references and says so.

The official Living Rules Reference is authoritative. Where this app disagrees with
it, this app is wrong — corrections to `data/` are the most useful contribution.
