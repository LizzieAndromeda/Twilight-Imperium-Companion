"use client";

import { useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { Checkbox, Select, Switch, ToggleGroup } from "radix-ui";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MinusIcon,
  PlusIcon,
  SearchIcon,
  XIcon,
} from "./icons";
import styles from "./Field.module.css";

/* ------------------------------------------------------------------ label */

export function Field({
  label,
  hint,
  htmlFor,
  children,
}: {
  label?: ReactNode;
  hint?: ReactNode;
  htmlFor?: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.field}>
      {label ? (
        <label className={styles.label} htmlFor={htmlFor}>
          {label}
        </label>
      ) : null}
      {children}
      {hint ? <p className={styles.hint}>{hint}</p> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ input */

export function TextInput({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input className={[styles.input, className].filter(Boolean).join(" ")} {...props} />
  );
}

export function SearchInput({
  value,
  onValueChange,
  placeholder = "Search…",
  "aria-label": ariaLabel = "Search",
}: {
  value: string;
  onValueChange: (next: string) => void;
  placeholder?: string;
  "aria-label"?: string;
}) {
  return (
    <div className={styles.searchWrap}>
      <SearchIcon className={styles.searchIcon} size={16} />
      <input
        type="search"
        className={styles.input}
        value={value}
        placeholder={placeholder}
        aria-label={ariaLabel}
        onChange={(e) => onValueChange(e.target.value)}
      />
      {value ? (
        <button
          type="button"
          className={styles.clear}
          onClick={() => onValueChange("")}
          aria-label="Clear search"
        >
          <XIcon size={14} />
        </button>
      ) : null}
    </div>
  );
}

/* --------------------------------------------------------------- checkbox */

/**
 * A checkbox with its label and description in one clickable row — the shape
 * the expansion toggles need. `locked` renders a permanently checked row for
 * content that cannot be switched off, such as the base game.
 */
export function CheckboxRow({
  checked,
  onCheckedChange,
  title,
  description,
  meta,
  locked,
}: {
  checked: boolean;
  onCheckedChange: (next: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
  locked?: boolean;
}) {
  const id = useId();
  const classes = [
    styles.checkRow,
    checked && styles.checkRowOn,
    locked && styles.checkRowDisabled,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <Checkbox.Root
        id={id}
        className={styles.checkbox}
        checked={checked}
        disabled={locked}
        onCheckedChange={(next) => onCheckedChange(next === true)}
      >
        <Checkbox.Indicator>
          <CheckIcon size={14} />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <div className={styles.checkText}>
        <label className={styles.checkTitle} htmlFor={id}>
          {title}
          {meta}
        </label>
        {description ? <p className={styles.checkDesc}>{description}</p> : null}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- switch */

export function Toggle({
  checked,
  onCheckedChange,
  label,
}: {
  checked: boolean;
  onCheckedChange: (next: boolean) => void;
  label: string;
}) {
  return (
    <Switch.Root
      className={styles.switch}
      checked={checked}
      onCheckedChange={onCheckedChange}
      aria-label={label}
    >
      <Switch.Thumb className={styles.thumb} />
    </Switch.Root>
  );
}

/* ---------------------------------------------------------------- stepper */

export function Stepper({
  value,
  onChange,
  min = 0,
  max = 99,
  label,
}: {
  value: number;
  onChange: (delta: number) => void;
  min?: number;
  max?: number;
  label: string;
}) {
  return (
    <div className={styles.stepper}>
      <button
        type="button"
        className={styles.stepBtn}
        onClick={() => onChange(-1)}
        disabled={value <= min}
        aria-label={`Decrease ${label}`}
      >
        <MinusIcon size={14} />
      </button>
      <span className={styles.stepValue} aria-label={label}>
        {value}
      </span>
      <button
        type="button"
        className={styles.stepBtn}
        onClick={() => onChange(1)}
        disabled={value >= max}
        aria-label={`Increase ${label}`}
      >
        <PlusIcon size={14} />
      </button>
    </div>
  );
}

/* ------------------------------------------------------- segmented control */

export function Segmented<T extends string>({
  value,
  onValueChange,
  options,
  label,
}: {
  value: T;
  onValueChange: (next: T) => void;
  options: { value: T; label: ReactNode }[];
  label: string;
}) {
  return (
    <ToggleGroup.Root
      type="single"
      className={styles.segmented}
      value={value}
      aria-label={label}
      // Radix reports "" when the active item is clicked again; keep the
      // current value so the control always has a selection.
      onValueChange={(next) => next && onValueChange(next as T)}
    >
      {options.map((option) => (
        <ToggleGroup.Item
          key={option.value}
          value={option.value}
          className={styles.segment}
        >
          {option.label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
}

/* ----------------------------------------------------------------- select */

export function SelectInput({
  value,
  onValueChange,
  options,
  placeholder = "Choose…",
  label,
}: {
  value: string | undefined;
  onValueChange: (next: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  label: string;
}) {
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger className={styles.selectTrigger} aria-label={label}>
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronDownIcon size={15} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className={styles.selectContent}
          position="popper"
          sideOffset={6}
        >
          <Select.ScrollUpButton className={styles.selectScroll}>
            <ChevronUpIcon size={14} />
          </Select.ScrollUpButton>
          <Select.Viewport>
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className={styles.selectItem}
              >
                <Select.ItemText>{option.label}</Select.ItemText>
                <Select.ItemIndicator>
                  <CheckIcon size={14} />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className={styles.selectScroll}>
            <ChevronDownIcon size={14} />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
