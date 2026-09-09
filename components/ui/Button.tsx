"use client";

import type { ButtonHTMLAttributes, Ref } from "react";
import { Slot } from "radix-ui";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  /** Stretch to the width of the container. */
  block?: boolean;
  /** Square button holding a single icon — pass an accessible label too. */
  iconOnly?: boolean;
  /**
   * Render the single child element instead of a `<button>`, merging these
   * styles onto it. Use it to make a `next/link` look like a button.
   */
  asChild?: boolean;
  /**
   * Declared explicitly so Radix wrappers such as `Dialog.Close asChild` can
   * attach to the underlying element (React 19 passes refs as a plain prop).
   */
  ref?: Ref<HTMLButtonElement>;
}

export function Button({
  variant = "secondary",
  size = "md",
  block,
  iconOnly,
  asChild,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = [
    styles.base,
    styles[size],
    styles[variant],
    block && styles.block,
    iconOnly && styles.iconOnly,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (asChild) {
    return <Slot.Root className={classes} {...props} />;
  }

  return <button type={type} className={classes} {...props} />;
}
