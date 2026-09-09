"use client";

import { useMemo, useState } from "react";
import type { PlayerColor } from "@/lib/types";
import { FACTIONS } from "@/data/factions";
import { useSettings } from "@/state/SettingsProvider";
import { PLAYER_COLORS, useGame } from "@/state/GameProvider";
import type { NewPlayerInput } from "@/state/GameProvider";
import {
  Button,
  Card,
  Field,
  PLAYER_COLOR_VAR,
  Segmented,
  SelectInput,
  TextInput,
} from "@/components/ui";
import { PlusIcon, TrashIcon } from "@/components/ui/icons";
import styles from "./GameSetup.module.css";

const UNASSIGNED = "__none__";

function blankPlayer(index: number): NewPlayerInput {
  return {
    name: `Player ${index + 1}`,
    factionId: null,
    color: PLAYER_COLORS[index],
  };
}

/**
 * Pre-game form. Seat order here is the clockwise table order, which the
 * tracker uses as its default speaker and its fallback ordering before any
 * strategy cards have been claimed.
 */
export function GameSetup() {
  const { scope } = useSettings();
  const { startGame } = useGame();

  const [players, setPlayers] = useState<NewPlayerInput[]>(() =>
    Array.from({ length: 6 }, (_, i) => blankPlayer(i)),
  );
  const [victoryTarget, setVictoryTarget] = useState("10");
  const [error, setError] = useState<string | null>(null);

  const factionOptions = useMemo(() => {
    const available = scope(FACTIONS);
    return [
      { value: UNASSIGNED, label: "No faction yet" },
      ...available.map((f) => ({ value: f.id, label: f.name })),
    ];
  }, [scope]);

  const takenColors = new Set(players.map((p) => p.color));
  const takenFactions = new Set(
    players.map((p) => p.factionId).filter((id): id is string => id !== null),
  );

  function update(index: number, patch: Partial<NewPlayerInput>) {
    setPlayers((prev) =>
      prev.map((p, i) => (i === index ? { ...p, ...patch } : p)),
    );
    setError(null);
  }

  function addPlayer() {
    setPlayers((prev) => {
      if (prev.length >= 8) return prev;
      const freeColor =
        PLAYER_COLORS.find((c) => !prev.some((p) => p.color === c)) ??
        PLAYER_COLORS[0];
      return [
        ...prev,
        { name: `Player ${prev.length + 1}`, factionId: null, color: freeColor },
      ];
    });
  }

  function removePlayer(index: number) {
    setPlayers((prev) => (prev.length <= 3 ? prev : prev.filter((_, i) => i !== index)));
  }

  function submit() {
    const named = players.map((p, i) => ({
      ...p,
      name: p.name.trim() || `Player ${i + 1}`,
    }));
    if (new Set(named.map((p) => p.color)).size !== named.length) {
      setError("Two players have the same colour.");
      return;
    }
    startGame(named, Number(victoryTarget));
  }

  return (
    <Card>
      <div className={styles.topRow}>
        <Field
          label="Players"
          hint="Three to eight. Seat them in clockwise table order."
        >
          <Segmented
            label="Player count"
            value={String(players.length)}
            onValueChange={(next) => {
              const target = Number(next);
              setPlayers((prev) =>
                target > prev.length
                  ? [
                      ...prev,
                      ...Array.from({ length: target - prev.length }, (_, i) =>
                        blankPlayer(prev.length + i),
                      ),
                    ]
                  : prev.slice(0, target),
              );
            }}
            options={[3, 4, 5, 6, 7, 8].map((n) => ({
              value: String(n),
              label: String(n),
            }))}
          />
        </Field>

        <Field label="Points to win" hint="14 makes for a longer game.">
          <Segmented
            label="Victory point target"
            value={victoryTarget}
            onValueChange={setVictoryTarget}
            options={[
              { value: "10", label: "10 VP" },
              { value: "12", label: "12 VP" },
              { value: "14", label: "14 VP" },
            ]}
          />
        </Field>
      </div>

      <div className={styles.players}>
        {players.map((player, i) => (
          <div key={i} className={styles.row}>
            <span className={styles.seat}>{i + 1}</span>

            <TextInput
              value={player.name}
              onChange={(e) => update(i, { name: e.target.value })}
              aria-label={`Name for seat ${i + 1}`}
              placeholder={`Player ${i + 1}`}
            />

            <SelectInput
              label={`Faction for seat ${i + 1}`}
              value={player.factionId ?? UNASSIGNED}
              onValueChange={(next) =>
                update(i, { factionId: next === UNASSIGNED ? null : next })
              }
              options={factionOptions.filter(
                (option) =>
                  option.value === UNASSIGNED ||
                  option.value === player.factionId ||
                  !takenFactions.has(option.value),
              )}
            />

            <div className={styles.colors}>
              {PLAYER_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={[
                    styles.swatch,
                    player.color === color && styles.swatchOn,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  style={{ background: PLAYER_COLOR_VAR[color] }}
                  disabled={player.color !== color && takenColors.has(color)}
                  onClick={() => update(i, { color: color as PlayerColor })}
                  aria-label={`${color} for seat ${i + 1}`}
                  aria-pressed={player.color === color}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              size="sm"
              iconOnly
              onClick={() => removePlayer(i)}
              disabled={players.length <= 3}
              aria-label={`Remove seat ${i + 1}`}
            >
              <TrashIcon size={15} />
            </Button>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <Button onClick={addPlayer} disabled={players.length >= 8}>
          <PlusIcon size={15} />
          Add player
        </Button>
        {error ? <span className={styles.error}>{error}</span> : null}
        <span className={styles.spacer} />
        <Button variant="primary" size="lg" onClick={submit}>
          Start game
        </Button>
      </div>
    </Card>
  );
}
