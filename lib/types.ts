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
  | "codex4"
  | "thundersedge"
  | "twilightsfall";

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

export interface FactionLeader {
  role: "Agent" | "Commander" | "Hero";
  name: string;
  /** What has to be true before the leader unlocks. */
  unlock: string;
  ability: string;
}

export interface FactionFlagship {
  name: string;
  cost: string;
  combat: string;
  move: string;
  capacity: string;
  text: string;
}

export interface FactionUnitCard {
  name: string;
  text: string;
}

/**
 * The mechanical half of a faction, scraped from the wiki into
 * `data/factions.generated.ts`. Never hand-edited.
 */
export interface GeneratedFaction extends ExpansionScoped {
  id: string;
  name: string;
  /** Short form used on the tracker where space is tight. */
  shortName: string;
  difficulty: "Low" | "Medium" | "High";
  /** Plastic colour(s) the faction ships with. */
  color?: string;
  commodities?: number;
  homePlanets?: string[];
  startingUnits?: string[];
  startingTech?: string[];
  abilities: { name: string; text: string }[];
  leaders?: FactionLeader[];
  flagship?: FactionFlagship;
  mech?: FactionUnitCard;
  /** Thunder's Edge breakthrough technology. */
  breakthrough?: FactionUnitCard;
  /** Official FAQ rulings from the faction's wiki page. */
  faq?: string[];
}

/** Hand-written editorial colour, kept out of the generated file. */
export interface FactionNote {
  tagline: string;
  playstyle: string;
}

/** A generated faction with its editorial notes merged in. */
export interface Faction extends GeneratedFaction {
  tagline?: string;
  playstyle?: string;
}

/* ----------------------------------------------------------- action cards */

/** The phase an action card can be played in. */
export type ActionCardPhase =
  | "Strategy"
  | "Action"
  | "Status"
  | "Agenda"
  | "Any";

export interface ActionCard extends ExpansionScoped {
  id: string;
  name: string;
  phase: ActionCardPhase;
  /** The printed timing line, e.g. "After an agenda is revealed". */
  window: string;
  text: string;
  flavor?: string;
  /**
   * A community rules clarification for an interaction that has needed
   * settling at the table. Most cards do not have one.
   */
  note?: string;
  /** Official FAQ rulings that name this card. */
  faq?: string[];
  /**
   * Set on Thunder's Edge Omega cards: the id of the card this one replaces.
   * While both products are enabled, the replaced card is hidden.
   */
  supersedes?: string;
  /** How many copies of this card are in the deck. */
  copies: number;
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
