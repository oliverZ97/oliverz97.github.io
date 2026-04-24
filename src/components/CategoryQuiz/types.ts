import { GameConfig } from "./GameSettings";

export type GamePhase = "LOBBY" | "WRITING" | "VOTING" | "RESULTS" | "TRANSITION";

export interface Player {
  id: string;
  name: string;
  score: number;
  currentAnswer: string;
  isHost: boolean;
}

export type GameMessage =
  | { type: "RESET_GAME"; config: GameConfig }
  | { type: "GAME_PREPARATION"; config: GameConfig }
  | { type: "START_ROUND"; category: string; endTime: number; writeTime: number }
  | { type: "SUBMIT_ANSWER"; playerId: string; playerName: string; answer: string }
  | { type: "START_VOTING"; submissions: Submission[]; voteEndTime: number }
  | { type: "CAST_VOTE"; targetPlayerId: string; isApproved: boolean }
  | {
      type: "END_ROUND";
      finalSubmissions: Submission[];
      updatedTotals: Record<string, number>;
      isLastRound: boolean;
      nextRoundNumber: number;
    };

export interface PlayerProfile {
  name: string;
  isHost: boolean;
}

export interface GameState {
  phase: GamePhase;
  category: string;
  endTime: number;
}

export interface Submission {
  playerId: string;
  playerName: string;
  answer: string;
  votes: number;
}
