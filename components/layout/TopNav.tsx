"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { TRACKER_ENABLED } from "@/lib/features";
import { useSettings } from "@/state/SettingsProvider";
import { Badge, Button } from "@/components/ui";
import {
  BeakerIcon,
  BookIcon,
  LayersIcon,
  OrbitIcon,
  SearchIcon,
  SlidersIcon,
  SwordsIcon,
  TargetIcon,
  UsersIcon,
} from "@/components/ui/icons";
import { ExpansionSettings } from "./ExpansionSettings";
import { PhaseCheatSheet, useCheatSheetShortcut } from "./PhaseCheatSheet";
import { GlobalSearch, useGlobalSearchShortcut } from "./GlobalSearch";
import searchStyles from "./GlobalSearch.module.css";
import styles from "./TopNav.module.css";

const LINKS = [
  { href: "/", label: "Overview", icon: OrbitIcon },
  { href: "/rules", label: "Rules", icon: BookIcon },
  { href: "/action-cards", label: "Action cards", icon: LayersIcon },
  { href: "/technologies", label: "Tech", icon: BeakerIcon },
  { href: "/factions", label: "Factions", icon: UsersIcon },
  { href: "/reference", label: "Reference", icon: TargetIcon },
  ...(TRACKER_ENABLED
    ? [{ href: "/tracker", label: "Tracker", icon: SwordsIcon }]
    : []),
];

export function TopNav() {
  const pathname = usePathname();
  const { enabled, hydrated } = useSettings();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [cheatSheetOpen, setCheatSheetOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useCheatSheetShortcut(useCallback(() => setCheatSheetOpen(true), []));
  useGlobalSearchShortcut(useCallback(() => setSearchOpen(true), []));

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
          <Button
            size="sm"
            variant="secondary"
            className={searchStyles.searchButton}
            onClick={() => setSearchOpen(true)}
            aria-label="Search everything (press / )"
            title="Search everything — press /"
          >
            <SearchIcon size={15} />
            <span className={styles.linkLabel}>Search</span>
            <span className={searchStyles.kbd}>/</span>
          </Button>

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
            onClick={() => setCheatSheetOpen(true)}
            aria-label="Cheat sheet: phases and combat (press ?)"
            title="Cheat sheet — phases and combat, press ?"
          >
            <BookIcon size={15} />
            <span className={styles.linkLabel}>Cheat sheet</span>
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setSettingsOpen(true)}
            aria-label="Expansion settings"
          >
            <SlidersIcon size={15} />
            <span className={styles.linkLabel}>Expansions</span>
          </Button>
        </div>
      </div>

      <ExpansionSettings open={settingsOpen} onOpenChange={setSettingsOpen} />
      <PhaseCheatSheet open={cheatSheetOpen} onOpenChange={setCheatSheetOpen} />
      <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
