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
- **Rules reference** — searchable entries for the rules that actually stop play,
  written as ordered steps rather than prose, with cross-links and a "watch out" note
  on the ones people routinely get wrong.
- **Factions** — all 30, including the five from Thunder's Edge. Faction
  abilities, leaders (agent, commander, hero, with their Omega revisions), the
  flagship and mech, the Thunder's Edge breakthrough, home planets, starting
  units and tech, and the FAQ rulings for that faction — all taken from the
  faction sheets, plus a hand-written read on how each one wants to be played.
- **Reference tables** — the strategy cards with both abilities (including the two
  Thunder's Edge Omega revisions, which hide the cards they replace), the public
  objective decks split by stage, and all 20 galactic events with their complexity
  ratings.
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
app/                    routes: overview, rules, action cards, factions, reference, tracker
components/
  ui/                   design system primitives (Button, Card, Field, Modal, …)
  layout/               app shell, top nav, expansion settings dialog
  tracker/              game setup, board, player cards, objectives panel
data/                   rules, factions, action cards, strategy cards, objectives
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

### Regenerating the scraped data

Two datasets are generated rather than hand-written:

```bash
npm run gen:action-cards   # data/actionCards.ts
npm run gen:factions       # data/factions.generated.ts
npm run gen:events         # data/galacticEvents.generated.ts
```

Both are deterministic — running them twice gives byte-identical output — and
both print a warning list rather than failing silently when a source changes
shape. Neither touches `data/factionNotes.ts`, which holds the hand-written
tagline and playstyle for each faction.

**Faction data** is scraped from the individual faction pages on the wiki:
abilities, leaders and their Omega revisions, flagship, mech, Thunder's Edge
breakthrough, setup details and FAQ. Faction ids are pinned in the script
because saved games store `factionId` — an id must never change once shipped.

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

**Scraped, verbatim** — action cards and faction sheets. Generated from the
sources above, complete for the products they cover, and regenerable. Trust
these at the table.

**Hand-written, paraphrased** — the rules reference, public objectives, strategy
cards, and the faction taglines and playstyles. A curated digest for quick
lookup, not a reproduction of the rulebook and not complete. The objective lists
in particular are a working subset (the tracker always lets you type in a card it
does not carry).

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
