"use client";

import type { ReactNode } from "react";
import { Tabs as RadixTabs } from "radix-ui";
import styles from "./Tabs.module.css";

export interface TabItem {
  value: string;
  label: ReactNode;
  content: ReactNode;
}

export function Tabs({
  items,
  value,
  onValueChange,
  defaultValue,
  label,
}: {
  items: TabItem[];
  /** Omit both `value` and `onValueChange` to let the tabs manage themselves. */
  value?: string;
  onValueChange?: (next: string) => void;
  defaultValue?: string;
  label: string;
}) {
  return (
    <RadixTabs.Root
      value={value}
      onValueChange={onValueChange}
      defaultValue={defaultValue ?? items[0]?.value}
    >
      <RadixTabs.List className={styles.list} aria-label={label}>
        {items.map((item) => (
          <RadixTabs.Trigger
            key={item.value}
            value={item.value}
            className={styles.trigger}
          >
            {item.label}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {items.map((item) => (
        <RadixTabs.Content
          key={item.value}
          value={item.value}
          className={styles.panel}
        >
          {item.content}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  );
}
