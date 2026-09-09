import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Card.module.css";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Adds the standard internal padding. Off for cards with custom layouts. */
  padded?: boolean;
  /** Lifts and brightens on hover — for cards that link somewhere. */
  interactive?: boolean;
}

export function Card({
  padded = true,
  interactive,
  className,
  ...props
}: CardProps) {
  const classes = [
    styles.card,
    padded && styles.padded,
    interactive && styles.interactive,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classes} {...props} />;
}

export function CardHeader({
  title,
  subtitle,
  actions,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className={styles.header}>
      <div className={styles.titleGroup}>
        <h3 className={styles.title}>{title}</h3>
        {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
      </div>
      {actions}
    </div>
  );
}

/** A labelled hairline rule for separating blocks within a page. */
export function SectionHeading({ children }: { children: ReactNode }) {
  return <h2 className={styles.sectionHeading}>{children}</h2>;
}
