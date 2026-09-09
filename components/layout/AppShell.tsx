import type { ReactNode } from "react";
import { TopNav } from "./TopNav";
import styles from "./AppShell.module.css";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <>
      <TopNav />
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p>
          <strong>An unofficial fan companion.</strong> Twilight Imperium is a
          trademark of Fantasy Flight Games. This app is not affiliated with or
          endorsed by them.
        </p>
        <p>
          Rules and faction text here is paraphrased for quick reference at the
          table. The official Living Rules Reference is always authoritative.
        </p>
      </footer>
    </>
  );
}
