/**
 * Feature switches.
 *
 * These are build-time constants rather than user settings — they decide what
 * the app offers at all, not what a given table is playing with. Expansion
 * toggles live in `SettingsProvider`.
 */

/**
 * The game tracker is on hold while the reference side of the app gets ahead
 * of it. It knows about factions, objectives and strategy cards but nothing
 * about laws, technologies, leaders or relics, so it under-serves a real game.
 *
 * Turning this back on restores the nav entry, the overview tile and the
 * working page — nothing has been deleted. Games already saved in the browser
 * are left untouched while it is off, so switching it back on picks up
 * whatever was in progress.
 */
export const TRACKER_ENABLED = false;
