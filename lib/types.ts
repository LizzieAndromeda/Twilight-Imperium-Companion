/** Domain types shared by the rules companion and the game tracker. */

/**
 * Every piece of content is tagged with the product it comes from so the
 * expansion checkboxes in Settings can filter the whole app from one place.
 * `base` is always enabled and is intentionally not user-toggleable.
 */
export type ExpansionId =
  | "base"
  | "pok"
  | "codex1"
  | "codex2"
  | "codex3"
  | "codex4";

export interface Expansion {
  id: ExpansionId;
  name: string;
  shortName: string;
  year: string;
  description: string;
  /** Base game content can never be switched off. */
  locked?: boolean;
}

/** Anything filterable by expansion. */
export interface ExpansionScoped {
  expansion: ExpansionId;
}

/* ------------------------------------------------------------------ rules */

export type RuleCategory =
  | "Core"
  | "Phases"
  | "Actions"
  | "Movement"
  | "Combat"
  | "Units"
  | "Planets"
  | "Technology"
  | "Politics"
  | "Objectives"
  | "Components"
  | "Leaders"
  | "Exploration";

export interface Rule extends ExpansionScoped {
  id: string;
  term: string;
  category: RuleCategory;
  /** One-sentence answer to "what is this?" — shown in collapsed lists. */
  summary: string;
  /** The individual rule clauses, in the order they are resolved. */
  clauses: string[];
  /** Ids of other rules worth reading next. */
  related?: string[];
  /** Rules people get wrong at the table. */
  gotcha?: string;
}

/* --------------------------------------------------------------- factions */

export interface Faction extends ExpansionScoped {
  id: string;
  name: string;
  /** Short form used on the tracker where space is tight. */
  shortName: string;
  /** Flavour line from the faction sheet. */
  tagline: string;
  abilities: { name: string; text: string }[];
  /** Notes on how the faction wants to be played. */
  playstyle: string;
  difficulty: "Low" | "Medium" | "High";
}

/* -------------------------------------------------------- strategy cards */

export interface StrategyCard {
  initiative: number;
  name: string;
  primary: string;
  secondary: string;
  /** Cost in command tokens for the secondary ability, if any. */
  secondaryCost: string;
}

/* ------------------------------------------------------------ objectives */

export type ObjectiveStage = "I" | "II";

export interface PublicObjective extends ExpansionScoped {
  id: string;
  name: string;
  stage: ObjectiveStage;
  requirement: string;
}

/* --------------------------------------------------------------- tracker */

export type PlayerColor =
  | "red"
  | "blue"
  | "green"
  | "yellow"
  | "purple"
  | "black"
  | "orange"
  | "pink";

export type Phase = "strategy" | "action" | "status" | "agenda";

export interface CommandTokens {
  tactic: number;
  fleet: number;
  strategy: number;
}

export interface Player {
  id: string;
  name: string;
  factionId: string | null;
  color: PlayerColor;
  /** Initiative numbers of the strategy cards held this round. */
  strategyCards: number[];
  /** Strategy cards already exhausted (used) this round. */
  usedStrategyCards: number[];
  passed: boolean;
  tradeGoods: number;
  commodities: number;
  tokens: CommandTokens;
}

/** A victory point awarded outside the revealed public objective track. */
export type ScoreSource =
  | "secret"
  | "custodians"
  | "agenda"
  | "support"
  | "relic"
  | "imperial"
  | "other";

export interface ScoreEvent {
  id: string;
  playerId: string;
  round: number;
  points: number;
  source: ScoreSource;
  label: string;
}

/**
 * A public objective face-up on the table. `objectiveId` points into the
 * bundled dataset; `customName` covers objectives the dataset does not carry
 * yet, so a game is never blocked by missing content.
 */
export interface RevealedObjective {
  id: string;
  objectiveId: string | null;
  customName: string | null;
  stage: ObjectiveStage;
  round: number;
  /** Player ids that have scored it. */
  scoredBy: string[];
}

export interface LogEntry {
  id: string;
  at: number;
  round: number;
  text: string;
}

export interface GameState {
  id: string;
  createdAt: number;
  players: Player[];
  round: number;
  phase: Phase;
  speakerId: string | null;
  victoryTarget: number;
  /** The agenda phase does not exist until the custodians token is removed. */
  custodiansTaken: boolean;
  revealed: RevealedObjective[];
  scores: ScoreEvent[];
  log: LogEntry[];
}
