"use client";

import { EXPANSIONS } from "@/lib/expansions";
import { useSettings } from "@/state/SettingsProvider";
import { CheckboxRow, Modal } from "@/components/ui";
import styles from "./ExpansionSettings.module.css";

/**
 * The single place expansions are switched on and off. Everything else in the
 * app reads `useSettings().enabled`, so a change here immediately re-filters
 * the rules, factions and objectives.
 */
export function ExpansionSettings({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { isEnabled, toggle } = useSettings();

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Expansions"
      description="Tick the products on your table. Rules, factions and objectives from anything unticked stay hidden."
    >
      <div className={styles.list}>
        {EXPANSIONS.map((expansion) => (
          <CheckboxRow
            key={expansion.id}
            checked={isEnabled(expansion.id)}
            onCheckedChange={(next) => toggle(expansion.id, next)}
            locked={expansion.locked}
            title={expansion.name}
            meta={<span className={styles.year}>{expansion.year}</span>}
            description={
              expansion.locked
                ? `${expansion.description} Always on.`
                : expansion.description
            }
          />
        ))}
      </div>
      <p className={styles.note}>
        Your selection is stored in this browser, so it is remembered the next
        time you sit down to play.
      </p>
    </Modal>
  );
}
