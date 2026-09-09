"use client";

import Link from "next/link";
import { useMemo } from "react";
import { RULES } from "@/data/rules";
import { FACTIONS } from "@/data/factions";
import { PUBLIC_OBJECTIVES } from "@/data/objectives";
import { EXPANSIONS } from "@/lib/expansions";
import { useSettings } from "@/state/SettingsProvider";
import { useGame, PHASE_LABEL } from "@/state/GameProvider";
import { Badge, Button, Card, SectionHeading } from "@/components/ui";
import {
  BookIcon,
  ChevronRightIcon,
  SwordsIcon,
  TargetIcon,
  UsersIcon,
} from "@/components/ui/icons";
import styles from "./page.module.css";

const PHASES = [
  {
    name: "Strategy",
    body: "Starting with the speaker, each player takes a strategy card. Those numbers set initiative order for the round.",
  },
  {
    name: "Action",
    body: "In initiative order, take one action per turn — tactical, strategic or component — until everyone has passed.",
  },
  {
    name: "Status",
    body: "Score objectives, reveal a new one, draw action cards, then reset tokens, ready cards and repair units.",
  },
  {
    name: "Agenda",
    body: "Two agendas are revealed and voted on. This phase only exists once the custodians token leaves Mecatol Rex.",
    conditional: true,
  },
];

export default function OverviewPage() {
  const { scope, enabled, hydrated } = useSettings();
  const { game, hydrated: gameHydrated, victoryPoints, initiativeOrder } = useGame();

  const counts = useMemo(
    () => ({
      rules: scope(RULES).length,
      factions: scope(FACTIONS).length,
      objectives: scope(PUBLIC_OBJECTIVES).length,
    }),
    [scope],
  );

  const activeExpansions = EXPANSIONS.filter((e) => enabled.includes(e.id));
  const leader = game
    ? [...game.players].sort((a, b) => victoryPoints(b.id) - victoryPoints(a.id))[0]
    : null;

  return (
    <>
      <section className={styles.hero}>
        <p className={styles.heroEyebrow}>Twilight Imperium · Fourth Edition</p>
        <h1 className={styles.heroTitle}>Settle the rules argument. Then settle the galaxy.</h1>
        <p className={styles.heroLede}>
          A searchable rules reference and a full game tracker in one place. Tick
          the expansions on your table and everything else — rules, factions,
          objectives — narrows to match.
        </p>
        <div className={styles.heroActions}>
          <Button size="lg" variant="primary" asChild>
            <Link href="/tracker">{game ? "Resume game" : "Start a game"}</Link>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/rules">Browse the rules</Link>
          </Button>
        </div>
      </section>

      {/* Only rendered once localStorage has been read, so the server-rendered
          markup never claims a game exists that the browser does not have. */}
      {gameHydrated && game ? (
        <>
          <SectionHeading>Game in progress</SectionHeading>
          <Card>
            <div className={styles.resume}>
              <div className={styles.resumeMeta}>
                <span>
                  Round <b>{game.round}</b>
                </span>
                <span>
                  Phase <b>{PHASE_LABEL[game.phase]}</b>
                </span>
                <span>
                  Players <b>{game.players.length}</b>
                </span>
                {leader ? (
                  <span>
                    Leading <b>{leader.name}</b> on {victoryPoints(leader.id)} VP
                  </span>
                ) : null}
                {initiativeOrder[0]?.strategyCards.length ? (
                  <span>
                    First initiative <b>{initiativeOrder[0].name}</b>
                  </span>
                ) : null}
              </div>
              <Button variant="primary" asChild>
                <Link href="/tracker">Open tracker</Link>
              </Button>
            </div>
          </Card>
        </>
      ) : null}

      <SectionHeading>Where to look</SectionHeading>
      <div className={styles.grid}>
        <NavTile
          href="/rules"
          icon={<BookIcon size={18} />}
          count={hydrated ? counts.rules : null}
          name="Rules reference"
          body="Searchable entries for the rules that actually stop play — combat steps, movement restrictions, scoring windows."
        />
        <NavTile
          href="/factions"
          icon={<UsersIcon size={18} />}
          count={hydrated ? counts.factions : null}
          name="Factions"
          body="Every faction available with your expansions, with abilities, difficulty and a read on how each one wants to be played."
        />
        <NavTile
          href="/reference"
          icon={<TargetIcon size={18} />}
          count={hydrated ? counts.objectives : null}
          name="Reference tables"
          body="The eight strategy cards with both abilities, plus the public objective decks split by stage."
        />
        <NavTile
          href="/tracker"
          icon={<SwordsIcon size={18} />}
          count={null}
          name="Game tracker"
          body="Rounds, phases, initiative, victory points, objectives, trade goods and command tokens for up to eight players."
        />
      </div>

      <SectionHeading>The game round</SectionHeading>
      <div className={styles.flow}>
        {PHASES.map((phase, i) => (
          <div
            key={phase.name}
            className={[styles.phase, phase.conditional && styles.phaseConditional]
              .filter(Boolean)
              .join(" ")}
          >
            <span className={styles.phaseNum}>{i + 1}</span>
            <h3 className={styles.phaseName}>{phase.name}</h3>
            <p className={styles.phaseBody}>{phase.body}</p>
          </div>
        ))}
      </div>

      <SectionHeading>Content in play</SectionHeading>
      <div className={styles.strip}>
        <span className={styles.stripLabel}>Enabled</span>
        <div className={styles.stripBadges}>
          {hydrated ? (
            activeExpansions.map((e) => (
              <Badge key={e.id} tone={e.locked ? "neutral" : "accent"}>
                {e.shortName}
              </Badge>
            ))
          ) : (
            <Badge>Loading…</Badge>
          )}
        </div>
        <span className={styles.stripLabel}>
          Change these from Expansions in the top bar
        </span>
      </div>
    </>
  );
}

function NavTile({
  href,
  icon,
  count,
  name,
  body,
}: {
  href: string;
  icon: React.ReactNode;
  count: number | null;
  name: string;
  body: string;
}) {
  return (
    <Link href={href}>
      <Card interactive className={styles.tile}>
        <div className={styles.tileTop}>
          {icon}
          {count !== null ? <span className={styles.tileCount}>{count}</span> : null}
        </div>
        <h3 className={styles.tileName}>{name}</h3>
        <p className={styles.tileBody}>{body}</p>
        <span className={styles.tileLink}>
          Open <ChevronRightIcon size={13} />
        </span>
      </Card>
    </Link>
  );
}
