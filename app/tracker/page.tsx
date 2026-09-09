"use client";

import { useGame } from "@/state/GameProvider";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui";
import { GameSetup } from "@/components/tracker/GameSetup";
import { GameBoard } from "@/components/tracker/GameBoard";

export default function TrackerPage() {
  const { game, hydrated } = useGame();

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
