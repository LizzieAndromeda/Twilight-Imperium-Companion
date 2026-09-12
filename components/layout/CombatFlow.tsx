"use client";

import { useState } from "react";
import { COMBAT_ABILITIES, COMBAT_STAGES } from "@/data/combatGuide";
import type { CombatFlowStep, CombatStage } from "@/data/combatGuide";
import { Badge, Segmented } from "@/components/ui";
import styles from "./CombatFlow.module.css";

/** The one people mean when they say "how does combat work". */
const DEFAULT_STAGE = "space";

/**
 * The combat flow, as a flow rather than as prose.
 *
 * The rules print this order across four separate pages, and the parts people
 * get wrong are the joins between them: which steps are skipped, which round a
 * repeat starts from, and the exact moment each unit ability fires. So the
 * shape of the flow is the content here — the steps run down a spine, the ways
 * out of it hang off the side, and the loop back to a step that is not the
 * first one is drawn rather than described.
 */
export function CombatFlow() {
  // A segmented control rather than another row of tabs: this sits inside the
  // cheat sheet's own phase tabs, and two identical-looking strips read as one
  // flat list of ten rather than a choice within a choice.
  const [view, setView] = useState<string>(DEFAULT_STAGE);
  const stage = COMBAT_STAGES.find((s) => s.id === view) ?? COMBAT_STAGES[0];

  return (
    <>
      <div className={styles.stagePicker}>
        <Segmented
          label="Combat stage"
          value={view}
          onValueChange={setView}
          options={[
            ...COMBAT_STAGES.map((s) => ({ value: s.id, label: s.name })),
            { value: "abilities", label: "Abilities" },
          ]}
        />
      </div>

      {view === "abilities" ? <AbilityTable /> : <StageFlow stage={stage} />}
    </>
  );
}

function StageFlow({ stage }: { stage: CombatStage }) {
  const loopFrom = stage.loop
    ? stage.steps.findIndex((s) => s.id === stage.loop!.toStep)
    : -1;

  return (
    <>
      <p className={styles.oneLine}>{stage.oneLine}</p>
      <p className={styles.trigger}>
        <span className={styles.triggerLabel}>Happens when</span>
        {stage.trigger}
      </p>

      <ol className={styles.flow}>
        {stage.steps.map((step, i) => (
          <Step
            key={step.id}
            step={step}
            last={i === stage.steps.length - 1}
            // The spine is drawn back up to the step a new round starts from,
            // which is rarely the first one.
            loopStart={loopFrom >= 0 && i >= loopFrom}
          />
        ))}
      </ol>

      {stage.loop ? (
        <p className={styles.loop}>
          <span className={styles.loopArrow} aria-hidden>
            ↺
          </span>
          {stage.loop.label}
        </p>
      ) : null}

      <div className={styles.ends}>
        <h5 className={styles.endsLabel}>Then</h5>
        <ul className={styles.endsList}>
          {stage.ends.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

function Step({
  step,
  last,
  loopStart,
}: {
  step: CombatFlowStep;
  last: boolean;
  loopStart: boolean;
}) {
  return (
    <li className={[styles.step, loopStart && styles.inLoop].filter(Boolean).join(" ")}>
      <span className={styles.marker} aria-hidden>
        {step.marker}
      </span>
      {!last ? <span className={styles.spine} aria-hidden /> : null}

      <div className={styles.stepBody}>
        <h5 className={styles.stepName}>{step.name}</h5>
        <p className={styles.stepDetail}>{step.detail}</p>

        {step.substeps?.length ? (
          <ul className={styles.substeps}>
            {step.substeps.map((sub) => (
              <li key={sub.name} className={styles.substep}>
                <span className={styles.substepName}>{sub.name}</span>
                <span className={styles.substepDetail}>{sub.detail}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {step.interrupts?.length ? (
          <ul className={styles.interrupts}>
            {step.interrupts.map((line) => (
              <li key={line} className={styles.interrupt}>
                <span className={styles.interruptDot} aria-hidden />
                {line}
              </li>
            ))}
          </ul>
        ) : null}

        {step.branch ? (
          <p className={styles.branch}>
            <span className={styles.branchArrow} aria-hidden>
              ↳
            </span>
            {step.branch}
          </p>
        ) : null}

        {step.gotcha ? <p className={styles.gotcha}>{step.gotcha}</p> : null}
      </div>
    </li>
  );
}

function AbilityTable() {
  return (
    <>
      <p className={styles.oneLine}>
        Nearly every combat argument is really an argument about this table.
      </p>
      <div className={styles.abilities}>
        {COMBAT_ABILITIES.map((ability) => (
          <div key={ability.name} className={styles.ability}>
            <div className={styles.abilityTop}>
              <h5 className={styles.abilityName}>{ability.name}</h5>
              <Badge tone="accent">{ability.when}</Badge>
            </div>
            <p className={styles.abilityRolls}>{ability.rolls}</p>
            <ul className={styles.abilityNotes}>
              {ability.notes.map((note) => (
                <li key={note} className={styles.abilityNote}>
                  <span className={styles.interruptDot} aria-hidden />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
