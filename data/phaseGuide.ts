import type { Phase } from "@/lib/types";

export interface PhaseGuideEntry {
  phase: Phase;
  name: string;
  /** One line answering "what is this phase for?". */
  oneLine: string;
  /** What happens, in printed order. */
  steps: { name: string; detail: string }[];
  /** What an individual player may choose to do. */
  youCan: string[];
  /** The things that get missed or argued about. */
  remember: string[];
  /** Shown as a caveat above the steps. */
  caveat?: string;
}

/**
 * The phase cheat sheet.
 *
 * Hand-written, but every step order and clause here was checked against the
 * wiki's Strategy Phase, Action Phase, Status Phase and Agenda Phase pages.
 * Keep it that way: this is the thing people will read mid-game instead of
 * opening the rulebook, so it has to be right.
 */
export const PHASE_GUIDE: PhaseGuideEntry[] = [
  {
    phase: "strategy",
    name: "Strategy",
    oneLine: "Everyone takes a strategy card. Those numbers are turn order for the round.",
    steps: [
      {
        name: "Choose strategy cards",
        detail:
          "Beginning with the speaker and continuing clockwise, each player takes one card from the common play area. In a three- or four-player game, go round a second time from the speaker so everyone holds two.",
      },
      {
        name: "Add trade goods",
        detail:
          "The speaker places 1 trade good on each strategy card nobody chose. Those accumulate until someone takes the card.",
      },
    ],
    youCan: [
      "Take any trade goods already sitting on the card you choose.",
      "Nothing else — no actions happen in this phase.",
    ],
    remember: [
      "The lowest card number goes first in the action phase, not the speaker.",
      "Initiative order is not the seating order used for choosing cards or for voting.",
      "In a three- or four-player game you must play both of your cards before you can pass.",
    ],
  },
  {
    phase: "action",
    name: "Action",
    oneLine:
      "In initiative order, one action per turn, going round until everybody has passed.",
    steps: [
      {
        name: "Take a turn",
        detail:
          "Starting with the lowest initiative number, each player takes exactly one action, then play passes to the next player. Keep going round, skipping anyone who has passed.",
      },
      {
        name: "End the phase",
        detail: "Once every player has passed, move to the status phase.",
      },
    ],
    youCan: [
      "Strategic action — play one of your strategy cards: resolve its primary, then every other player may pay for the secondary.",
      "Tactical action — spend a tactic token to activate a system, then Activation → Movement → Space Combat → Invasion → Production.",
      "Component action — any card or sheet ability headed ACTION. It uses your whole turn.",
      "Pass — you take no further turns this round.",
      "Resolve one transaction with each of your neighbours during your turn.",
    ],
    remember: [
      "You cannot pass until you have played the primary of every strategy card you hold.",
      "You cannot use the secondary ability of your own strategy card.",
      "You cannot activate a system that already contains one of your command tokens.",
      "Every step of a tactical action is optional except the activation itself.",
      "Once passed you can still resolve other players' secondary abilities.",
      "On the turn you pass you may still resolve transactions and 'at the start of your turn' abilities.",
      "If every other player has passed, you may keep taking consecutive actions on your own.",
      "If you cannot perform any action, you must pass.",
    ],
  },
  {
    phase: "status",
    name: "Status",
    oneLine: "Score, reveal, draw, then reset the board for the next round.",
    steps: [
      {
        name: "1. Score objectives",
        detail:
          "In initiative order, each player may score up to one public and one secret objective that can be scored in the status phase.",
      },
      {
        name: "2. Reveal public objective",
        detail:
          "The speaker flips the next unrevealed public objective. No Stage II card is revealed until every Stage I card is face-up.",
      },
      { name: "3. Draw action cards", detail: "One each, in initiative order." },
      {
        name: "4. Remove command tokens",
        detail: "Every player takes all of their tokens off the board.",
      },
      {
        name: "5. Gain and redistribute",
        detail:
          "Gain 2 tokens, then freely redistribute everything on your command sheet between the tactic, fleet and strategy pools.",
      },
      { name: "6. Ready cards", detail: "Ready every exhausted card, strategy cards included." },
      { name: "7. Repair units", detail: "Stand all damaged units back up." },
      {
        name: "8. Return strategy cards",
        detail:
          "Cards go back to the common play area. Then the agenda phase, if the custodians token has been removed — otherwise a new round.",
      },
    ],
    youCan: [
      "Score one public objective and one secret objective, no more.",
      "Move command tokens between your pools — this is the routine chance to do it.",
    ],
    remember: [
      "You cannot score any public objective while you do not control every planet in your home system.",
      "A 'spend' objective means spending now, as you score it, not spending you did during the action phase.",
      "The game ends here if there are no unrevealed public objectives left at the start of step 2.",
      "After shrinking your fleet pool, recount your non-fighter ships in every system.",
    ],
  },
  {
    phase: "agenda",
    name: "Agenda",
    oneLine: "Two agendas are revealed and voted on, then every planet readies.",
    caveat:
      "This phase does not exist until someone removes the custodians token from Mecatol Rex. Until then, the round ends after the status phase.",
    steps: [
      {
        name: "1. First agenda",
        detail:
          "The speaker reveals it. 'When an agenda is revealed' windows resolve first, then 'after an agenda is revealed'.",
      },
      {
        name: "2. Vote",
        detail:
          "Clockwise from the speaker's left, each player exhausts planets to cast votes for a single outcome. The speaker votes last.",
      },
      {
        name: "3. Resolve",
        detail:
          "The outcome with the most votes happens. The speaker breaks any tie, and chooses if nobody voted at all.",
      },
      { name: "4. Second agenda", detail: "Repeat the whole process with a new card." },
      { name: "5. Ready planets", detail: "Every player readies all of their planets." },
    ],
    youCan: [
      "Cast votes by exhausting planets, all for one outcome.",
      "Abstain entirely.",
      "Play rider action cards to bet on an outcome.",
      "Negotiate up to one transaction per agenda with each other player, at any point.",
    ],
    remember: [
      "Trade goods cannot be spent as votes — only exhausted planets produce votes.",
      "Agenda phase transactions do not require you to be neighbours.",
      "Planets ready at the end of this phase, so voting does not cost you the next round's economy.",
      "A law stays in play permanently; a directive resolves once and is discarded.",
    ],
  },
];

export const PHASE_GUIDE_BY_PHASE = new Map(
  PHASE_GUIDE.map((entry) => [entry.phase, entry]),
);
