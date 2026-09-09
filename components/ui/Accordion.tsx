"use client";

import type { ReactNode } from "react";
import { Accordion as RadixAccordion } from "radix-ui";
import { ChevronRightIcon } from "./icons";
import styles from "./Accordion.module.css";

export interface AccordionItem {
  /** Optional DOM id, so callers can scroll an item into view. */
  id?: string;
  value: string;
  /** Everything left of the chevron in the closed row. */
  header: ReactNode;
  content: ReactNode;
}

/**
 * Multiple-open accordion. Used for the rules list, where players routinely
 * want two or three entries expanded side by side.
 *
 * Pass `value`/`onValueChange` to drive it from outside — the rules page does
 * this so a "related rules" link can open its target.
 */
export function Accordion({
  items,
  value,
  onValueChange,
}: {
  items: AccordionItem[];
  value?: string[];
  onValueChange?: (next: string[]) => void;
}) {
  return (
    <RadixAccordion.Root
      type="multiple"
      className={styles.root}
      value={value}
      onValueChange={onValueChange}
    >
      {items.map((item) => (
        <RadixAccordion.Item
          key={item.value}
          value={item.value}
          id={item.id}
          className={styles.item}
        >
          <RadixAccordion.Header className={styles.header}>
            <RadixAccordion.Trigger className={styles.trigger}>
              <ChevronRightIcon className={styles.chevron} size={16} />
              {item.header}
            </RadixAccordion.Trigger>
          </RadixAccordion.Header>
          <RadixAccordion.Content className={styles.content}>
            <div className={styles.contentInner}>{item.content}</div>
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  );
}
