"use client";

import { useState } from "react";
import type { Phase, ScoreSource } from "@/lib/types";
import {
  PHASE_LABEL,
  PHASE_ORDER,
  SCORE_SOURCE_LABEL,
  useGame,
} from "@/state/GameProvider";
import {
  Badge,
  Button,
  Card,
  CardHeader,
  ColorDot,
  Field,
  Modal,
  ModalClose,
  SectionHeading,
  SelectInput,
  Stepper,
  TextInput,
} from "@/components/ui";
import { CrownIcon, RotateIcon, TrashIcon } from "@/components/ui/icons";
import { PlayerCard } from "./PlayerCard";
import { ObjectivesPanel } from "./ObjectivesPanel";
import styles from "./GameBoard.module.css";

export function GameBoard() {
  const {
    game,
    initiativeOrder,
    victoryPoints,
    winner,
    setPhase,
    advancePhase,
    takeCustodians,
    endGame,
    removeScore,
  } = useGame();

  const [scoreFor, setScoreFor] = useState<string | null>(null);
  const [custodiansFor, setCustodiansFor] = useState<string>("");
  const [confirmEnd, setConfirmEnd] = useState(false);

  if (!game) return null;

  const speaker = game.players.find((p) => p.id === game.speakerId);
  const nextPhase: Phase =
    game.phase === "agenda" || (game.phase === "status" && !game.custodiansTaken)
      ? "strategy"
      : PHASE_ORDER[PHASE_ORDER.indexOf(game.phase) + 1];

  return (
    <>
      <div className={styles.bar}>
        <div className={styles.round}>
          <span className={styles.roundLabel}>Round</span>
          <span className={styles.roundNum}>{game.round}</span>
        </div>

        <div className={styles.phases}>
          {PHASE_ORDER.map((phase) => {
            // The agenda phase does not exist until the custodians token goes.
            const locked = phase === "agenda" && !game.custodiansTaken;
            return (
              <button
                key={phase}
                type="button"
                className={[styles.phase, game.phase === phase && styles.phaseOn]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => setPhase(phase)}
                disabled={locked}
                aria-pressed={game.phase === phase}
                title={
                  locked
                    ? "No agenda phase until the custodians token is removed"
                    : undefined
                }
              >
                {PHASE_LABEL[phase]}
              </button>
            );
          })}
        </div>

        <span className={styles.barSpacer} />

        <div className={styles.barActions}>
          {speaker ? (
            <Badge tone="accent">
              <CrownIcon size={12} />
              {speaker.name}
            </Badge>
          ) : null}
          <Button variant="primary" onClick={advancePhase}>
            {nextPhase === "strategy" && game.phase !== "strategy"
              ? `Round ${game.round + 1}`
              : PHASE_LABEL[nextPhase]}
          </Button>
          <Button variant="danger" onClick={() => setConfirmEnd(true)}>
            <TrashIcon size={14} />
            End
          </Button>
        </div>
      </div>

      {winner ? (
        <div className={[styles.banner, styles.winBanner].join(" ")}>
          <p className={styles.bannerText}>
            <b>{winner.name}</b> has reached {game.victoryTarget} victory points and
            wins the game. On a tie, the player earliest in initiative order takes it.
          </p>
        </div>
      ) : null}

      {!game.custodiansTaken ? (
        <div className={styles.banner}>
          <p className={styles.bannerText}>
            The custodians token is still on Mecatol Rex. Removing it costs 6
            influence, scores 1 victory point, and switches the agenda phase on for
            the rest of the game.
          </p>
          <div className={styles.custodianPick}>
            <SelectInput
              label="Player who removed the custodians token"
              value={custodiansFor || undefined}
              onValueChange={setCustodiansFor}
              placeholder="Who took it?"
              options={game.players.map((p) => ({ value: p.id, label: p.name }))}
            />
            <Button
              variant="primary"
              disabled={!custodiansFor}
              onClick={() => {
                takeCustodians(custodiansFor);
                setCustodiansFor("");
              }}
            >
              Remove token
            </Button>
          </div>
        </div>
      ) : null}

      <SectionHeading>
        Initiative order
        {initiativeOrder[0]?.strategyCards.length
          ? ` — ${initiativeOrder.map((p) => p.name).join(" → ")}`
          : " — assign strategy cards to set it"}
      </SectionHeading>

      <div className={styles.playerGrid}>
        {initiativeOrder.map((player) => (
          <PlayerCard key={player.id} player={player} onAddScore={setScoreFor} />
        ))}
      </div>

      <SectionHeading>Scoring</SectionHeading>
      <div className={styles.columns}>
        <ObjectivesPanel />

        <Card>
          <CardHeader
            title="Score log"
            subtitle="Points awarded outside the public objective track."
          />
          {game.scores.length === 0 ? (
            <p className={styles.logEmpty}>
              Nothing yet. Use the victory point button on a player to record
              secrets, agendas, relics and Support for the Throne.
            </p>
          ) : (
            <div className={styles.log}>
              {[...game.scores].reverse().map((score) => {
                const player = game.players.find((p) => p.id === score.playerId);
                return (
                  <div key={score.id} className={styles.logRow}>
                    <span className={styles.logRound}>R{score.round}</span>
                    {player ? <ColorDot color={player.color} size={8} /> : null}
                    <span>
                      {player?.name ?? "Unknown"} · {score.label} (+{score.points})
                    </span>
                    <span style={{ marginLeft: "auto" }}>
                      <Button
                        size="sm"
                        variant="ghost"
                        iconOnly
                        onClick={() => removeScore(score.id)}
                        aria-label="Remove score entry"
                      >
                        <TrashIcon size={13} />
                      </Button>
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </div>

      <SectionHeading>Standings</SectionHeading>
      <Card>
        <div className={styles.log}>
          {[...game.players]
            .sort((a, b) => victoryPoints(b.id) - victoryPoints(a.id))
            .map((player) => (
              <div key={player.id} className={styles.logRow}>
                <ColorDot color={player.color} size={9} />
                <span>{player.name}</span>
                <span style={{ marginLeft: "auto" }}>
                  {victoryPoints(player.id)} / {game.victoryTarget} VP
                </span>
              </div>
            ))}
        </div>
      </Card>

      <AddScoreDialog
        playerId={scoreFor}
        onClose={() => setScoreFor(null)}
      />

      <Modal
        open={confirmEnd}
        onOpenChange={setConfirmEnd}
        title="End this game?"
        description="The whole game — players, scores and log — is deleted from this browser. There is no undo."
        footer={
          <>
            <ModalClose asChild>
              <Button>Keep playing</Button>
            </ModalClose>
            <Button
              variant="danger"
              onClick={() => {
                endGame();
                setConfirmEnd(false);
              }}
            >
              <RotateIcon size={14} />
              End game
            </Button>
          </>
        }
      >
        <p className={styles.bannerText}>
          Round {game.round}, {game.players.length} players. Ending here clears the
          board so you can set up a new game.
        </p>
      </Modal>
    </>
  );
}

const SOURCES = Object.keys(SCORE_SOURCE_LABEL) as ScoreSource[];

/** Records a victory point that does not come from a revealed public objective. */
function AddScoreDialog({
  playerId,
  onClose,
}: {
  playerId: string | null;
  onClose: () => void;
}) {
  const { game, addScore } = useGame();
  const [source, setSource] = useState<ScoreSource>("secret");
  const [points, setPoints] = useState(1);
  const [label, setLabel] = useState("");

  const player = game?.players.find((p) => p.id === playerId) ?? null;

  function submit() {
    if (!playerId) return;
    addScore(playerId, points, source, label.trim() || SCORE_SOURCE_LABEL[source]);
    setSource("secret");
    setPoints(1);
    setLabel("");
    onClose();
  }

  return (
    <Modal
      open={playerId !== null}
      onOpenChange={(open) => !open && onClose()}
      title={player ? `Score for ${player.name}` : "Score"}
      description="For secret objectives, agenda points, relics and Support for the Throne. Public objectives are tracked in the panel instead."
      footer={
        <>
          <ModalClose asChild>
            <Button>Cancel</Button>
          </ModalClose>
          <Button variant="primary" onClick={submit}>
            Add points
          </Button>
        </>
      }
    >
      <div className={styles.dialogGrid}>
        <Field label="Source">
          <SelectInput
            label="Score source"
            value={source}
            onValueChange={(next) => setSource(next as ScoreSource)}
            options={SOURCES.map((s) => ({
              value: s,
              label: SCORE_SOURCE_LABEL[s],
            }))}
          />
        </Field>

        <div className={styles.dialogRow}>
          <Field label="Points">
            <Stepper
              value={points}
              onChange={(d) => setPoints((p) => Math.max(1, Math.min(5, p + d)))}
              min={1}
              max={5}
              label="Victory points"
            />
          </Field>
        </div>

        <Field
          label="Note"
          hint="Optional — the objective or card name, for the log."
        >
          <TextInput
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder={SCORE_SOURCE_LABEL[source]}
            aria-label="Score note"
          />
        </Field>
      </div>
    </Modal>
  );
}
