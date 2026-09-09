"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSettings } from "@/state/SettingsProvider";
import { Badge, Button } from "@/components/ui";
import {
  BookIcon,
  OrbitIcon,
  SlidersIcon,
  SwordsIcon,
  TargetIcon,
  UsersIcon,
} from "@/components/ui/icons";
import { ExpansionSettings } from "./ExpansionSettings";
import styles from "./TopNav.module.css";

const LINKS = [
  { href: "/", label: "Overview", icon: OrbitIcon },
  { href: "/rules", label: "Rules", icon: BookIcon },
  { href: "/factions", label: "Factions", icon: UsersIcon },
  { href: "/reference", label: "Reference", icon: TargetIcon },
  { href: "/tracker", label: "Tracker", icon: SwordsIcon },
];

export function TopNav() {
  const pathname = usePathname();
  const { enabled, hydrated } = useSettings();
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Everything past the always-on base game.
  const extraCount = enabled.length - 1;

  return (
    <header className={styles.bar}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <span className={styles.mark}>
            <OrbitIcon size={17} />
          </span>
          <span className={styles.wordmark}>
            <span className={styles.wordmarkTop}>Imperium</span>
            <span className={styles.wordmarkSub}>Companion</span>
          </span>
        </Link>

        <nav className={styles.links} aria-label="Main">
          {LINKS.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={[styles.link, active && styles.linkActive]
                  .filter(Boolean)
                  .join(" ")}
                aria-current={active ? "page" : undefined}
              >
                <Icon size={15} />
                <span className={styles.linkLabel}>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.actions}>
          {/* Rendered only after hydration so the server and client markup
              agree on a count that comes from localStorage. */}
          {hydrated && extraCount > 0 ? (
            <Badge tone="accent" className={styles.expansionCount}>
              +{extraCount}
            </Badge>
          ) : null}
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setSettingsOpen(true)}
            aria-label="Expansion settings"
          >
            <SlidersIcon size={15} />
            Expansions
          </Button>
        </div>
      </div>

      <ExpansionSettings open={settingsOpen} onOpenChange={setSettingsOpen} />
    </header>
  );
}
