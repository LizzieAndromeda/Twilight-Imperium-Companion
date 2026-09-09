import type { ReactNode } from "react";
import styles from "./EmptyState.module.css";

export function EmptyState({
  icon,
  title,
  children,
  action,
}: {
  icon?: ReactNode;
  title: string;
  children?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className={styles.empty}>
      {icon ? <div className={styles.icon}>{icon}</div> : null}
      <h3 className={styles.title}>{title}</h3>
      {children ? <p className={styles.body}>{children}</p> : null}
      {action}
    </div>
  );
}
