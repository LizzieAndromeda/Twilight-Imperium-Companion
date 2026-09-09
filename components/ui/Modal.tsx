"use client";

import type { ReactNode } from "react";
import { Dialog } from "radix-ui";
import { XIcon } from "./icons";
import styles from "./Modal.module.css";

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  /** Rendered in the footer, right-aligned. */
  footer?: ReactNode;
  wide?: boolean;
  /** Element that opens the dialog; omit when driving `open` yourself. */
  trigger?: ReactNode;
}

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  wide,
  trigger,
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger ? <Dialog.Trigger asChild>{trigger}</Dialog.Trigger> : null}
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content
          className={[styles.content, wide && styles.wide].filter(Boolean).join(" ")}
        >
          <div className={styles.head}>
            <div>
              <Dialog.Title className={styles.title}>{title}</Dialog.Title>
              {description ? (
                <Dialog.Description className={styles.desc}>
                  {description}
                </Dialog.Description>
              ) : (
                // Radix warns when a dialog has no description; an empty one
                // keeps the console clean without adding visible chrome.
                <Dialog.Description className="srOnly">{title}</Dialog.Description>
              )}
            </div>
            <Dialog.Close className={styles.close} aria-label="Close">
              <XIcon size={16} />
            </Dialog.Close>
          </div>
          <div className={styles.body}>{children}</div>
          {footer ? <div className={styles.foot}>{footer}</div> : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export const ModalClose = Dialog.Close;
