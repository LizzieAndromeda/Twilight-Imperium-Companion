"use client";

import Link from "next/link";
import { TRACKER_ENABLED } from "@/lib/features";
import { useGame } from "@/state/GameProvider";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button, Card, EmptyState } from "@/components/ui";
import { SwordsIcon } from "@/components/ui/icons";
import { GameSetup } from "@/components/tracker/GameSetup";
import { GameBoard } from "@/components/tracker/GameBoard";

export default function TrackerPage() {
  const { game, hydrated } = useGame();

  // The tracker is on hold. Anyone arriving here from a bookmark gets an
  // explanation rather than a dead link, and is told their saved game is
  // still there.
  if (!TRACKER_ENABLED) {
    return (
      <>
        <PageHeader
          eyebrow="Game tracker"
          title="On hold for now"
          lede="The reference side of the app has run ahead of the tracker, so it is switched off until it catches up."
        />
        <EmptyState icon={<SwordsIcon size={26} />} title="Paused, not removed">
          The tracker only knows about factions, objectives and strategy cards —
          it cannot record the laws in play, the technologies anyone owns, their
          unlocked leaders or their relics, all of which the rest of the app now
          carries. Rather than offer a half-picture at the table, it is off until
          it can hold the whole game.
          {hydrated && game ? (
            <>
              {" "}
              A game you had in progress is still saved in this browser and will
              be waiting when it comes back.
            </>
          ) : null}
        </EmptyState>
        <div style={{ display: "flex", gap: "var(--s-3)", marginTop: "var(--s-5)" }}>
          <Button variant="primary" asChild>
            <Link href="/rules">Browse the rules</Link>
          </Button>
          <Button asChild>
            <Link href="/reference">Reference tables</Link>
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Game tracker"
        title={hydrated && game ? "Game in progress" : "Set up a game"}
        lede={
          hydrated && game
            ? "Everything is saved in this browser as you go, so a refresh — or closing the laptop mid-game — loses nothing."
            : "Seat your players, pick colours and factions, and choose how many points it takes to win."
        }
      />
      {/* Which of the two views to show depends on localStorage, so until that
          has been read we render a placeholder rather than guessing and
          flashing the setup form over a game in progress. */}
      {hydrated ? (
        game ? (
          <GameBoard />
        ) : (
          <GameSetup />
        )
      ) : (
        <Card>Loading your table…</Card>
      )}
    </>
  );
}
