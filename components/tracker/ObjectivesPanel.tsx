"use client";

import { useMemo, useState } from "react";
import type { ObjectiveStage, RevealedObjective } from "@/lib/types";
import { OBJECTIVE_BY_ID, PUBLIC_OBJECTIVES, STAGE_POINTS } from "@/data/objectives";
import { useSettings } from "@/state/SettingsProvider";
import { useGame } from "@/state/GameProvider";
import {
  Badge,
  Button,
  Card,
  CardHeader,
  ColorDot,
  Field,
  Modal,
  ModalClose,
  Segmented,
  SelectInput,
  TextInput,
} from "@/components/ui";
import { CheckIcon, PlusIcon, TrashIcon } from "@/components/ui/icons";
import styles from "./ObjectivesPanel.module.css";

const CUSTOM = "__custom__";

/** Name of a revealed objective, whether it came from the dataset or free text. */
function nameOf(revealed: RevealedObjective): string {
  if (revealed.objectiveId) {
    return OBJECTIVE_BY_ID.get(revealed.objectiveId)?.name ?? "Unknown objective";
  }
  return revealed.customName ?? "Untitled objective";
}

function requirementOf(revealed: RevealedObjective): string | null {
  if (!revealed.objectiveId) return null;
  return OBJECTIVE_BY_ID.get(revealed.objectiveId)?.requirement ?? null;
}

export function ObjectivesPanel() {
  const { scope } = useSettings();
  const { game, revealObjective, removeRevealed, toggleObjectiveScored } = useGame();

  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<ObjectiveStage>("I");
  const [pick, setPick] = useState<string>(CUSTOM);
  const [customName, setCustomName] = useState("");

  const alreadyRevealed = useMemo(
    () => new Set(game?.revealed.map((r) => r.objectiveId).filter(Boolean)),
    [game],
  );

  // Only objectives of the chosen stage, from enabled expansions, that are not
  // already face-up on the table.
  const options = useMemo(() => {
    const available = scope(PUBLIC_OBJECTIVES).filter(
      (o) => o.stage === stage && !alreadyRevealed.has(o.id),
    );
    return [
      ...available.map((o) => ({ value: o.id, label: o.name })),
      { value: CUSTOM, label: "Something else (type it in)" },
    ];
  }, [scope, stage, alreadyRevealed]);

  if (!game) return null;

  function confirm() {
    if (pick === CUSTOM) {
      const name = customName.trim();
      if (!name) return;
      revealObjective(stage, null, name);
    } else {
      revealObjective(stage, pick, null);
    }
    setPick(CUSTOM);
    setCustomName("");
    setOpen(false);
  }

  return (
    <Card>
      <CardHeader
        title="Public objectives"
        subtitle="Tick a player when they score. Stage I is 1 VP, Stage II is 2 VP."
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            <PlusIcon size={14} />
            Reveal
          </Button>
        }
      />

      {game.revealed.length === 0 ? (
        <p className={styles.objReq}>
          Nothing revealed yet. The speaker reveals one public objective in each
          status phase.
        </p>
      ) : (
        <div className={styles.list}>
          {game.revealed.map((revealed) => {
            const requirement = requirementOf(revealed);
            return (
              <div
                key={revealed.id}
                className={[
                  styles.obj,
                  revealed.stage === "I" ? styles.stage1 : styles.stage2,
                ].join(" ")}
              >
                <div className={styles.objTop}>
                  <span className={styles.objName}>{nameOf(revealed)}</span>
                  <Badge tone={revealed.stage === "I" ? "cyan" : "plasma"}>
                    {STAGE_POINTS[revealed.stage]} VP
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    iconOnly
                    onClick={() => removeRevealed(revealed.id)}
                    aria-label={`Remove ${nameOf(revealed)}`}
                  >
                    <TrashIcon size={14} />
                  </Button>
                </div>

                {requirement ? <p className={styles.objReq}>{requirement}</p> : null}

                <div className={styles.scorers}>
                  {game.players.map((player) => {
                    const scored = revealed.scoredBy.includes(player.id);
                    return (
                      <button
                        key={player.id}
                        type="button"
                        className={[styles.scorer, scored && styles.scorerOn]
                          .filter(Boolean)
                          .join(" ")}
                        onClick={() => toggleObjectiveScored(revealed.id, player.id)}
                        aria-pressed={scored}
                      >
                        {scored ? (
                          <CheckIcon size={12} />
                        ) : (
                          <ColorDot color={player.color} size={8} />
                        )}
                        {player.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Reveal a public objective"
        description="Pick it from the deck list, or type in one this app does not carry yet."
        footer={
          <>
            <ModalClose asChild>
              <Button>Cancel</Button>
            </ModalClose>
            <Button
              variant="primary"
              onClick={confirm}
              disabled={pick === CUSTOM && customName.trim() === ""}
            >
              Reveal
            </Button>
          </>
        }
      >
        <div className={styles.dialogGrid}>
          <Field label="Stage">
            <Segmented
              label="Objective stage"
              value={stage}
              onValueChange={(next) => {
                setStage(next);
                setPick(CUSTOM);
              }}
              options={[
                { value: "I", label: "Stage I — 1 VP" },
                { value: "II", label: "Stage II — 2 VP" },
              ]}
            />
          </Field>

          <Field label="Objective">
            <SelectInput
              label="Objective"
              value={pick}
              onValueChange={setPick}
              options={options}
            />
          </Field>

          {pick === CUSTOM ? (
            <Field label="Objective name" hint="Whatever is printed on the card.">
              <TextInput
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="e.g. Seize an Icon"
                aria-label="Custom objective name"
              />
            </Field>
          ) : null}
        </div>
      </Modal>
    </Card>
  );
}
