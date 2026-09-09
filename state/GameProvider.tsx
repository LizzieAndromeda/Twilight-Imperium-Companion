"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import type {
  CommandTokens,
  GameState,
  LogEntry,
  ObjectiveStage,
  Phase,
  Player,
  PlayerColor,
  ScoreSource,
} from "@/lib/types";
import { uid, usePersistentState } from "@/lib/storage";
import { STAGE_POINTS } from "@/data/objectives";

const STORAGE_KEY = "tic:game";

export const PHASE_ORDER: Phase[] = ["strategy", "action", "status", "agenda"];

export const PHASE_LABEL: Record<Phase, string> = {
  strategy: "Strategy",
  action: "Action",
  status: "Status",
  agenda: "Agenda",
};

export const PLAYER_COLORS: PlayerColor[] = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "black",
  "orange",
  "pink",
];

export const SCORE_SOURCE_LABEL: Record<ScoreSource, string> = {
  secret: "Secret objective",
  custodians: "Custodians token",
  agenda: "Agenda",
  support: "Support for the Throne",
  relic: "Relic",
  imperial: "Imperial (Mecatol Rex)",
  other: "Other",
};

export interface NewPlayerInput {
  name: string;
  factionId: string | null;
  color: PlayerColor;
}

const STARTING_TOKENS: CommandTokens = { tactic: 3, fleet: 3, strategy: 2 };

function makePlayer(input: NewPlayerInput): Player {
  return {
    id: uid(),
    name: input.name,
    factionId: input.factionId,
    color: input.color,
    strategyCards: [],
    usedStrategyCards: [],
    passed: false,
    tradeGoods: 0,
    commodities: 0,
    tokens: { ...STARTING_TOKENS },
  };
}

function logged(state: GameState, text: string): LogEntry[] {
  const entry: LogEntry = { id: uid(), at: Date.now(), round: state.round, text };
  // Newest first, and capped so a long game does not grow localStorage forever.
  return [entry, ...state.log].slice(0, 200);
}

/* ------------------------------------------------------------------ context */

interface GameValue {
  game: GameState | null;
  hydrated: boolean;
  /** Players sorted by the initiative number of their lowest strategy card. */
  initiativeOrder: Player[];
  victoryPoints: (playerId: string) => number;
  leaders: Player[];
  winner: Player | null;

  startGame: (players: NewPlayerInput[], victoryTarget: number) => void;
  endGame: () => void;

  setPhase: (phase: Phase) => void;
  advancePhase: () => void;
  setSpeaker: (playerId: string) => void;

  updatePlayer: (playerId: string, patch: Partial<Player>) => void;
  adjust: (playerId: string, field: "tradeGoods" | "commodities", delta: number) => void;
  adjustToken: (playerId: string, pool: keyof CommandTokens, delta: number) => void;
  toggleStrategyCard: (playerId: string, initiative: number) => void;
  toggleStrategyUsed: (playerId: string, initiative: number) => void;
  togglePassed: (playerId: string) => void;

  revealObjective: (
    stage: ObjectiveStage,
    objectiveId: string | null,
    customName: string | null,
  ) => void;
  removeRevealed: (revealedId: string) => void;
  toggleObjectiveScored: (revealedId: string, playerId: string) => void;

  addScore: (
    playerId: string,
    points: number,
    source: ScoreSource,
    label: string,
  ) => void;
  removeScore: (scoreId: string) => void;
  takeCustodians: (playerId: string) => void;
}

const GameContext = createContext<GameValue | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [game, setGame, hydrated] = usePersistentState<GameState | null>(
    STORAGE_KEY,
    null,
  );

  /** Apply a change to a live game; no-ops when no game is in progress. */
  const patch = useCallback(
    (fn: (state: GameState) => GameState) => {
      setGame((prev) => (prev ? fn(prev) : prev));
    },
    [setGame],
  );

  const startGame = useCallback(
    (players: NewPlayerInput[], victoryTarget: number) => {
      const made = players.map(makePlayer);
      setGame({
        id: uid(),
        createdAt: Date.now(),
        players: made,
        round: 1,
        phase: "strategy",
        speakerId: made[0]?.id ?? null,
        victoryTarget,
        custodiansTaken: false,
        revealed: [],
        scores: [],
        log: [
          {
            id: uid(),
            at: Date.now(),
            round: 1,
            text: `Game started — ${made.length} players, ${victoryTarget} points to win.`,
          },
        ],
      });
    },
    [setGame],
  );

  const endGame = useCallback(() => setGame(null), [setGame]);

  const setPhase = useCallback(
    (phase: Phase) => patch((s) => ({ ...s, phase })),
    [patch],
  );

  /**
   * Walks the round forward. The agenda phase is skipped entirely until the
   * custodians token has been removed from Mecatol Rex, and rolling past the
   * last phase starts a new round: strategy cards are returned and everyone
   * is un-passed.
   */
  const advancePhase = useCallback(() => {
    patch((s) => {
      const isLastPhase =
        s.phase === "agenda" || (s.phase === "status" && !s.custodiansTaken);

      if (!isLastPhase) {
        const next = PHASE_ORDER[PHASE_ORDER.indexOf(s.phase) + 1];
        return { ...s, phase: next, log: logged(s, `${PHASE_LABEL[next]} phase.`) };
      }

      const round = s.round + 1;
      return {
        ...s,
        round,
        phase: "strategy",
        players: s.players.map((p) => ({
          ...p,
          strategyCards: [],
          usedStrategyCards: [],
          passed: false,
        })),
        log: logged(s, `Round ${round} begins.`),
      };
    });
  }, [patch]);

  const setSpeaker = useCallback(
    (playerId: string) =>
      patch((s) => {
        const name = s.players.find((p) => p.id === playerId)?.name ?? "Unknown";
        return { ...s, speakerId: playerId, log: logged(s, `${name} is now speaker.`) };
      }),
    [patch],
  );

  const mapPlayer = useCallback(
    (playerId: string, fn: (p: Player) => Player) =>
      patch((s) => ({
        ...s,
        players: s.players.map((p) => (p.id === playerId ? fn(p) : p)),
      })),
    [patch],
  );

  const updatePlayer = useCallback(
    (playerId: string, p: Partial<Player>) =>
      mapPlayer(playerId, (player) => ({ ...player, ...p })),
    [mapPlayer],
  );

  const adjust = useCallback(
    (playerId: string, field: "tradeGoods" | "commodities", delta: number) =>
      mapPlayer(playerId, (p) => ({
        ...p,
        [field]: Math.max(0, p[field] + delta),
      })),
    [mapPlayer],
  );

  const adjustToken = useCallback(
    (playerId: string, pool: keyof CommandTokens, delta: number) =>
      mapPlayer(playerId, (p) => ({
        ...p,
        tokens: { ...p.tokens, [pool]: Math.max(0, p.tokens[pool] + delta) },
      })),
    [mapPlayer],
  );

  /** A strategy card belongs to exactly one player, so claiming it takes it. */
  const toggleStrategyCard = useCallback(
    (playerId: string, initiative: number) =>
      patch((s) => {
        const holder = s.players.find((p) => p.strategyCards.includes(initiative));
        const claiming = holder?.id !== playerId;
        return {
          ...s,
          players: s.players.map((p) => {
            const without = {
              ...p,
              strategyCards: p.strategyCards.filter((c) => c !== initiative),
              usedStrategyCards: p.usedStrategyCards.filter((c) => c !== initiative),
            };
            if (claiming && p.id === playerId) {
              return {
                ...without,
                strategyCards: [...without.strategyCards, initiative].sort(
                  (a, b) => a - b,
                ),
              };
            }
            return without;
          }),
        };
      }),
    [patch],
  );

  const toggleStrategyUsed = useCallback(
    (playerId: string, initiative: number) =>
      mapPlayer(playerId, (p) => ({
        ...p,
        usedStrategyCards: p.usedStrategyCards.includes(initiative)
          ? p.usedStrategyCards.filter((c) => c !== initiative)
          : [...p.usedStrategyCards, initiative],
      })),
    [mapPlayer],
  );

  const togglePassed = useCallback(
    (playerId: string) => mapPlayer(playerId, (p) => ({ ...p, passed: !p.passed })),
    [mapPlayer],
  );

  const revealObjective = useCallback(
    (stage: ObjectiveStage, objectiveId: string | null, customName: string | null) =>
      patch((s) => ({
        ...s,
        revealed: [
          ...s.revealed,
          {
            id: uid(),
            objectiveId,
            customName,
            stage,
            round: s.round,
            scoredBy: [],
          },
        ],
        log: logged(s, `Stage ${stage} objective revealed.`),
      })),
    [patch],
  );

  const removeRevealed = useCallback(
    (revealedId: string) =>
      patch((s) => ({
        ...s,
        revealed: s.revealed.filter((r) => r.id !== revealedId),
      })),
    [patch],
  );

  const toggleObjectiveScored = useCallback(
    (revealedId: string, playerId: string) =>
      patch((s) => ({
        ...s,
        revealed: s.revealed.map((r) =>
          r.id === revealedId
            ? {
                ...r,
                scoredBy: r.scoredBy.includes(playerId)
                  ? r.scoredBy.filter((id) => id !== playerId)
                  : [...r.scoredBy, playerId],
              }
            : r,
        ),
      })),
    [patch],
  );

  const addScore = useCallback(
    (playerId: string, points: number, source: ScoreSource, label: string) =>
      patch((s) => {
        const name = s.players.find((p) => p.id === playerId)?.name ?? "Unknown";
        return {
          ...s,
          scores: [
            ...s.scores,
            { id: uid(), playerId, round: s.round, points, source, label },
          ],
          log: logged(s, `${name} scored ${points} VP — ${label}.`),
        };
      }),
    [patch],
  );

  const removeScore = useCallback(
    (scoreId: string) =>
      patch((s) => ({ ...s, scores: s.scores.filter((sc) => sc.id !== scoreId) })),
    [patch],
  );

  const takeCustodians = useCallback(
    (playerId: string) =>
      patch((s) => {
        const name = s.players.find((p) => p.id === playerId)?.name ?? "Unknown";
        return {
          ...s,
          custodiansTaken: true,
          scores: [
            ...s.scores,
            {
              id: uid(),
              playerId,
              round: s.round,
              points: 1,
              source: "custodians" as ScoreSource,
              label: "Removed the custodians token",
            },
          ],
          log: logged(
            s,
            `${name} removed the custodians token — the agenda phase is now in play.`,
          ),
        };
      }),
    [patch],
  );

  /* --------------------------------------------------------------- derived */

  const value = useMemo<GameValue>(() => {
    const victoryPoints = (playerId: string) => {
      if (!game) return 0;
      const fromObjectives = game.revealed.reduce(
        (sum, r) => (r.scoredBy.includes(playerId) ? sum + STAGE_POINTS[r.stage] : sum),
        0,
      );
      const fromEvents = game.scores.reduce(
        (sum, s) => (s.playerId === playerId ? sum + s.points : sum),
        0,
      );
      // The rules cap a player at the victory target and floor them at zero.
      return Math.max(0, Math.min(game.victoryTarget, fromObjectives + fromEvents));
    };

    const players = game?.players ?? [];

    // Players holding no strategy card sort last, which matches the rulebook.
    const initiativeOrder = [...players].sort((a, b) => {
      const ai = a.strategyCards.length ? Math.min(...a.strategyCards) : Infinity;
      const bi = b.strategyCards.length ? Math.min(...b.strategyCards) : Infinity;
      return ai - bi;
    });

    const best = players.reduce((m, p) => Math.max(m, victoryPoints(p.id)), 0);
    const leaders = best > 0 ? players.filter((p) => victoryPoints(p.id) === best) : [];

    // On a tie the player earliest in initiative order takes the win.
    const atTarget = game
      ? initiativeOrder.filter((p) => victoryPoints(p.id) >= game.victoryTarget)
      : [];

    return {
      game,
      hydrated,
      initiativeOrder,
      victoryPoints,
      leaders,
      winner: atTarget[0] ?? null,
      startGame,
      endGame,
      setPhase,
      advancePhase,
      setSpeaker,
      updatePlayer,
      adjust,
      adjustToken,
      toggleStrategyCard,
      toggleStrategyUsed,
      togglePassed,
      revealObjective,
      removeRevealed,
      toggleObjectiveScored,
      addScore,
      removeScore,
      takeCustodians,
    };
  }, [
    game,
    hydrated,
    startGame,
    endGame,
    setPhase,
    advancePhase,
    setSpeaker,
    updatePlayer,
    adjust,
    adjustToken,
    toggleStrategyCard,
    toggleStrategyUsed,
    togglePassed,
    revealObjective,
    removeRevealed,
    toggleObjectiveScored,
    addScore,
    removeScore,
    takeCustodians,
  ]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame(): GameValue {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used inside <GameProvider>");
  return ctx;
}
