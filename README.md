# Twilight Imperium Companion

A rules companion and game tracker for **Twilight Imperium: Fourth Edition**, built as a
dark-mode Next.js app. Tick the expansions on your table and the whole app — rules,
factions and objectives — narrows to match.

An unofficial fan project. Twilight Imperium is a trademark of Fantasy Flight Games;
this app is not affiliated with or endorsed by them.

## What it does

- **Action cards** — the complete deck (93 unique cards, 122 physical copies across
  the base game, Prophecy of Kings and Codex I), searchable by name, timing window
  and text, filterable by phase, with deck copy counts and community rules
  clarifications.
- **Rules reference** — searchable entries for the rules that actually stop play,
  written as ordered steps rather than prose, with cross-links and a "watch out" note
  on the ones people routinely get wrong.
- **Factions** — every faction your enabled expansions bring in, with abilities,
  a complexity rating and a read on how each one wants to be played.
- **Reference tables** — all eight strategy cards with both abilities, and the public
  objective decks split by stage.
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

### Regenerating the action card data

`data/actionCards.ts` is generated, not hand-written:

```bash
npm run gen:action-cards
```

It pulls from the [AsyncTI4 map generator bot](https://github.com/AsyncTI4/TI4_map_generator_bot),
whose game data is released into the public domain (that licence explicitly
excludes art assets, which this project does not use). The upstream dump lists
one entry per physical card, so the script collapses duplicates into a `copies`
count. It also drops the `asteroid` variant deck, whose entries all repeat cards
that already exist under the base game, Prophecy of Kings or Codex I.

## About the game content

The rules, faction and objective text in `data/` is a **curated, paraphrased digest**
written for quick lookup at the table — not a reproduction of the rulebook, and not
complete. The objective lists in particular are a working subset (the tracker always
lets you type in a card it does not carry).

The **action cards are the exception**: that text is generated from the upstream
dataset above rather than written by hand, so it is verbatim and complete for the
products it covers. Their `note` field carries that project's rules clarifications
for interactions the community has had to settle — 17 of the 93 cards have one, and
nothing has been invented to fill the gap for the rest.

The official Living Rules Reference is authoritative. Where this app disagrees with
it, this app is wrong — corrections to `data/` are the most useful contribution.
