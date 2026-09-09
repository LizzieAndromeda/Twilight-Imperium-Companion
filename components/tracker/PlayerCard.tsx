"use client";

import type { Player } from "@/lib/types";
import { FACTION_BY_ID } from "@/data/factions";
import { STRATEGY_CARD_BY_INITIATIVE } from "@/data/strategyCards";
import { useGame } from "@/state/GameProvider";
import {
  Badge,
  Button,
  Card,
  ColorDot,
  FactionSymbol,
  Meter,
  PLAYER_COLOR_VAR,
  Stepper,
} from "@/components/ui";
import { CrownIcon, PlusIcon } from "@/components/ui/icons";
import styles from "./PlayerCard.module.css";

const INITIATIVES = [1, 2, 3, 4, 5, 6, 7, 8];

export function PlayerCard({
  player,
  onAddScore,
}: {
  player: Player;
  onAddScore: (playerId: string) => void;
}) {
  const {
    game,
    victoryPoints,
    setSpeaker,
    adjust,
    adjustToken,
    togglePassed,
    toggleStrategyCard,
    toggleStrategyUsed,
  } = useGame();

  if (!game) return null;

  const vp = victoryPoints(player.id);
  const faction = player.factionId ? FACTION_BY_ID.get(player.factionId) : null;
  const isSpeaker = game.speakerId === player.id;
  const color = PLAYER_COLOR_VAR[player.color];

  /**
   * One button cycles a strategy card through the three states it can be in
   * for this player: unclaimed → claimed → played → unclaimed. Clicking a card
   * another player holds takes it from them, which is what happens at the
   * table when someone mis-assigns one.
   */
  function cycleStrategy(initiative: number) {
    const mine = player.strategyCards.includes(initiative);
    const used = player.usedStrategyCards.includes(initiative);
    if (!mine || used) {
      toggleStrategyCard(player.id, initiative);
    } else {
      toggleStrategyUsed(player.id, initiative);
    }
  }

  return (
    <Card
      className={[styles.card, player.passed && styles.passed]
        .filter(Boolean)
        .join(" ")}
      style={{ ["--seat-color" as string]: color }}
    >
      <div className={styles.head}>
        {faction ? (
          <FactionSymbol src={faction.symbol} name={faction.name} size={34} />
        ) : null}
        <div className={styles.identity}>
          <div className={styles.nameRow}>
            <ColorDot color={player.color} />
            <span className={styles.name}>{player.name}</span>
          </div>
          <p className={styles.faction}>
            {faction ? faction.name : "No faction assigned"}
          </p>
        </div>

        <button
          type="button"
          className={[styles.speakerBtn, isSpeaker && styles.speakerOn]
            .filter(Boolean)
            .join(" ")}
          onClick={() => setSpeaker(player.id)}
          aria-pressed={isSpeaker}
          title={isSpeaker ? "Speaker" : "Make speaker"}
          aria-label={isSpeaker ? "Speaker" : `Make ${player.name} speaker`}
        >
          <CrownIcon size={14} />
        </button>

        <div className={styles.vp}>
          <span className={styles.vpNum} style={{ color }}>
            {vp}
          </span>
          <span className={styles.vpMax}>/{game.victoryTarget}</span>
        </div>
      </div>

      <Meter value={vp} max={game.victoryTarget} color={color} />

      <div>
        <p className={styles.label}>Strategy cards</p>
        <div className={styles.strategyRow}>
          {INITIATIVES.map((initiative) => {
            const mine = player.strategyCards.includes(initiative);
            const used = player.usedStrategyCards.includes(initiative);
            const holder = game.players.find(
              (p) => p.id !== player.id && p.strategyCards.includes(initiative),
            );
            const card = STRATEGY_CARD_BY_INITIATIVE.get(initiative);

            return (
              <button
                key={initiative}
                type="button"
                className={[
                  styles.strategyBtn,
                  mine && !used && styles.strategyMine,
                  mine && used && styles.strategyUsed,
                  holder && styles.strategyTaken,
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => cycleStrategy(initiative)}
                title={
                  holder
                    ? `${card?.name} — held by ${holder.name}`
                    : mine && used
                      ? `${card?.name} — played`
                      : card?.name
                }
                aria-label={`${card?.name}, initiative ${initiative}`}
              >
                {initiative}
                {holder ? (
                  <span
                    className={styles.takenDot}
                    style={{ background: PLAYER_COLOR_VAR[holder.color] }}
                  />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.counters}>
        <div className={styles.counter}>
          <span className={styles.counterLabel}>Trade goods</span>
          <Stepper
            value={player.tradeGoods}
            onChange={(d) => adjust(player.id, "tradeGoods", d)}
            label={`${player.name} trade goods`}
          />
        </div>
        <div className={styles.counter}>
          <span className={styles.counterLabel}>Commodities</span>
          <Stepper
            value={player.commodities}
            onChange={(d) => adjust(player.id, "commodities", d)}
            label={`${player.name} commodities`}
          />
        </div>
        <div className={styles.counter}>
          <span className={styles.counterLabel}>Tactic</span>
          <Stepper
            value={player.tokens.tactic}
            onChange={(d) => adjustToken(player.id, "tactic", d)}
            label={`${player.name} tactic tokens`}
          />
        </div>
        <div className={styles.counter}>
          <span className={styles.counterLabel}>Fleet</span>
          <Stepper
            value={player.tokens.fleet}
            onChange={(d) => adjustToken(player.id, "fleet", d)}
            label={`${player.name} fleet tokens`}
          />
        </div>
        <div className={styles.counter}>
          <span className={styles.counterLabel}>Strategy</span>
          <Stepper
            value={player.tokens.strategy}
            onChange={(d) => adjustToken(player.id, "strategy", d)}
            label={`${player.name} strategy tokens`}
          />
        </div>
      </div>

      <div className={styles.foot}>
        <Button size="sm" onClick={() => onAddScore(player.id)}>
          <PlusIcon size={14} />
          Victory point
        </Button>
        {isSpeaker ? <Badge tone="accent">Speaker</Badge> : null}
        <span className={styles.footSpacer} />
        <Button
          size="sm"
          variant={player.passed ? "primary" : "ghost"}
          onClick={() => togglePassed(player.id)}
          aria-pressed={player.passed}
        >
          {player.passed ? "Passed" : "Pass"}
        </Button>
      </div>
    </Card>
  );
}
