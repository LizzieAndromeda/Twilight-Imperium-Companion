"use client";

import { useEffect, useState } from "react";
import type { Phase } from "@/lib/types";
import { PHASE_GUIDE } from "@/data/phaseGuide";
import { useGame } from "@/state/GameProvider";
import { Modal } from "@/components/ui";
import { CombatFlow } from "./CombatFlow";
import styles from "./PhaseCheatSheet.module.css";

/**
 * A phase reference you can pull up mid-game without losing your place.
 *
 * When a game is running it opens on whatever phase the tracker is in, since
 * that is almost always the one being asked about. Callers that already know
 * which phase is being asked about — the overview's round diagram, where you
 * click the phase you want — pass `phase` to say so.
 */
export function PhaseCheatSheet({
  open,
  onOpenChange,
  phase,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Open on this phase rather than the one the tracker is in. */
  phase?: Phase;
}) {
  const { game } = useGame();
  const currentPhase = game?.phase ?? null;

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      wide
      title="Cheat sheet"
      description="What you can do in each phase, how a combat resolves, and the things that get missed."
    >
      {/* Mounted only while open, so the body's state starts fresh on the live
          phase every time the sheet is pulled up — no effect needed to sync. */}
      {open ? (
        <CheatSheetBody
          currentPhase={currentPhase}
          initialPhase={phase ?? currentPhase}
        />
      ) : null}
    </Modal>
  );
}

function CheatSheetBody({
  currentPhase,
  initialPhase,
}: {
  /** The live phase, highlighted on its tab wherever the sheet opens. */
  currentPhase: Phase | null;
  /** The phase to open on. */
  initialPhase: Phase | null;
}) {
  // Combat is a sub-flow of the action phase rather than a phase of its own,
  // but it is what people look up most, so it sits alongside the four phases
  // rather than a level down inside one of them.
  const [selected, setSelected] = useState<Phase | "combat">(
    initialPhase ?? "strategy",
  );

  const entry = PHASE_GUIDE.find((e) => e.phase === selected) ?? PHASE_GUIDE[0];

  return (
    <>
      <div className={styles.tabs}>
        {PHASE_GUIDE.map((e) => (
          <button
            key={e.phase}
            type="button"
            className={[
              styles.tab,
              e.phase === selected && styles.tabOn,
              e.phase === currentPhase && styles.tabCurrent,
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => setSelected(e.phase)}
            aria-pressed={e.phase === selected}
            title={e.phase === currentPhase ? "Current phase" : undefined}
          >
            {e.name}
          </button>
        ))}
        <button
          type="button"
          className={[styles.tab, selected === "combat" && styles.tabOn]
            .filter(Boolean)
            .join(" ")}
          onClick={() => setSelected("combat")}
          aria-pressed={selected === "combat"}
        >
          Combat
        </button>
      </div>

      {selected === "combat" ? (
        <>
          <CombatFlow />
          <p className={styles.hint}>
            Press <span className={styles.kbd}>?</span> anywhere to open this,
            and <span className={styles.kbd}>Esc</span> to close it.
          </p>
        </>
      ) : (
        <PhaseBody entry={entry} />
      )}
    </>
  );
}

function PhaseBody({ entry }: { entry: (typeof PHASE_GUIDE)[number] }) {
  return (
    <>
      <p className={styles.oneLine}>{entry.oneLine}</p>

      {entry.caveat ? <p className={styles.caveat}>{entry.caveat}</p> : null}

      <div className={styles.section}>
        <h4 className={styles.sectionLabel}>How it runs</h4>
        <ol className={styles.steps}>
          {entry.steps.map((step) => (
            <li key={step.name} className={styles.step}>
              <p className={styles.stepName}>{step.name}</p>
              <p className={styles.stepDetail}>{step.detail}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionLabel}>What you can do</h4>
        <ul className={styles.list}>
          {entry.youCan.map((line) => (
            <li key={line} className={styles.item}>
              <span className={styles.bullet} />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionLabel}>Remember</h4>
        <ul className={styles.list}>
          {entry.remember.map((line) => (
            <li key={line} className={styles.item}>
              <span className={[styles.bullet, styles.bulletWarn].join(" ")} />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className={styles.hint}>
        Press <span className={styles.kbd}>?</span> anywhere to open this, and{" "}
        <span className={styles.kbd}>Esc</span> to close it.
      </p>
    </>
  );
}

/**
 * Opens the cheat sheet on "?" from anywhere, as long as the user is not
 * typing into a field.
 */
export function useCheatSheetShortcut(onOpen: () => void) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "?") return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
      ) {
        return;
      }
      event.preventDefault();
      onOpen();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onOpen]);
}
