import type { HTMLAttributes, ReactNode } from "react";
import type { PlayerColor } from "@/lib/types";
import styles from "./Badge.module.css";

type Tone = "neutral" | "accent" | "plasma" | "cyan" | "success" | "danger";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  children: ReactNode;
}

export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  const classes = [
    styles.badge,
    tone !== "neutral" && styles[tone],
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return <span className={classes} {...props} />;
}

/** The token colours from the box, resolved through the CSS variables. */
export const PLAYER_COLOR_VAR: Record<PlayerColor, string> = {
  red: "var(--p-red)",
  blue: "var(--p-blue)",
  green: "var(--p-green)",
  yellow: "var(--p-yellow)",
  purple: "var(--p-purple)",
  black: "var(--p-black)",
  orange: "var(--p-orange)",
  pink: "var(--p-pink)",
};

export function ColorDot({
  color,
  size = 10,
  title,
}: {
  color: PlayerColor;
  size?: number;
  title?: string;
}) {
  return (
    <span
      className={styles.dot}
      style={{
        background: PLAYER_COLOR_VAR[color],
        width: size,
        height: size,
      }}
      title={title ?? color}
    />
  );
}

/** Victory point progress bar. */
export function Meter({
  value,
  max,
  color = "var(--accent)",
}: {
  value: number;
  max: number;
  color?: string;
}) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div
      className={styles.meter}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div
        className={styles.meterFill}
        style={{ width: `${pct}%`, background: color }}
      />
    </div>
  );
}
