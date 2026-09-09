"use client";

import { useSearchParams } from "next/navigation";

/**
 * The `?q=` and `?tab=` a global search result arrives with.
 *
 * Pages seed their own search box and tab from these, so a result opens the
 * page already filtered to what was being looked for rather than dropping the
 * reader at the top of a list of two hundred cards.
 *
 * Callers must sit inside a `<Suspense>` boundary: on a statically prerendered
 * page `useSearchParams` has nothing to read on the server, and the boundary is
 * what lets the first *client* render see the real values — which is what makes
 * seeding `useState` from them work without a hydration mismatch.
 */
export function useUrlQuery(): { q: string; tab: string | null } {
  const params = useSearchParams();
  return { q: params.get("q") ?? "", tab: params.get("tab") };
}

/**
 * The `?tab=` if it names a tab that actually exists on this page.
 *
 * A hand-typed or stale tab name would otherwise leave Radix showing no panel
 * at all, so anything unrecognised falls back to the page's own first tab.
 */
export function useTabParam(valid: readonly string[]): string | undefined {
  const { tab } = useUrlQuery();
  return tab && valid.includes(tab) ? tab : undefined;
}

/**
 * A `?q=` seed for one search box, used as the initial value of `useState`.
 *
 * Pages with tabs pass their own tab name: only the tab the result was headed
 * for gets seeded, so switching tabs afterwards shows a full list rather than
 * the same query filtering a deck it was never meant for.
 */
export function useQuerySeed(ownTab?: string): string {
  const { q, tab } = useUrlQuery();
  if (ownTab && tab && tab !== ownTab) return "";
  return q;
}
