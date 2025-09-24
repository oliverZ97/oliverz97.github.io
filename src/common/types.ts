import { Streak } from "components/Streak";

export interface Character {
  Name: string;
  Sex: string;
  Origin: string;
  Hair_Color: string;
  Age: string;
  Age_Group: "0-11" | "12-18" | "19-30" | "31-50" | "51-70" | "100+";
  Height: number | null;
  Eye_Color: string;
  Genre: string;
  Anime: string;
  Editorial_Staff_Hint: string;
  First_Release_Year: number;
  Difficulty: Difficulty;
  Studio: string;
  Version: string;
  Subgenre1?: string;
  Subgenre2?: string;
  Tags?: string;
  Birthday?: string;
  ValidFields?: string[];
}

export interface Anime {
  Name: string;
  First_Release_Year: number;
  Studio: string;
  Genre: string;
  Subgenre1?: string;
  Subgenre2?: string;
  Tags?: string;
  ValidFields?: string[];
  Version: string;
}

export type Difficulty = "A" | "B" | "C";

export type SolvedKeys =
  | "charquizSolved"
  | "animeQuizSolved"
  | "blurQuizSolved"
  | "imageQuizSolved";

export enum StatisticFields {
  totalGamesPlayed = "totalGamesPlayed",
  totalWins = "totalWins",
  totalLosses = "totalLosses",
  totalScore = "totalScore",
  totalCharactersGuessed = "totalCharactersGuessed",
  totalCharacterGuesses = "totalCharacterGuesses",
  totalBlurredCharactersGuessed = "totalBlurredCharactersGuessed",
  totalBlurredCharacterGuesses = "totalBlurredCharacterGuesses",
  totalCharacterImagesGuessed = "totalCharacterImagesGuessed",
  totalAnimesGuessed = "totalAnimesGuessed",
  totalAnimeGuesses = "totalAnimeGuesses",
  longestStreak = "longestStreak",
  kissMarryKillGamesPlayed = "kissMarryKillGamesPlayed",
  kissMarryKillMaleGamesPlayed = "kissMarryKillMaleGamesPlayed",
  kissMarryKillFemaleGamesPlayed = "kissMarryKillFemaleGamesPlayed",
  imageQuizMaxPoints = "imageQuizMaxPoints",
  charQuizMaxPoints = "charQuizMaxPoints",
  animeQuizMaxPoints = "animeQuizMaxPoints",
  blurQuizMaxPoints = "blurQuizMaxPoints",
  totalMaxPoints = "totalMaxPoints",
  totalOver35kPointsGames = "totalOver35kPointsGames",
}

export interface UserProfile {
  id: string;
  username: string;
  createdAt: string;
  avatar?: {
    avatarUrl: string;
    backgroundColor: string;
  };
  charquizSolved?: SolveData;
  animeQuizSolved?: SolveData;
  blurQuizSolved?: SolveData;
  imageQuizSolved?: SolveData;
}

export interface SolveData {
  date: string;
  gaveUp?: boolean;
  score?: number;
}

export interface UserLogs {
  statistics: { [key in StatisticFields]?: number };
  scores: { [key: string]: Record<string, number> };
  streaks: { [key: string]: Streak };
  highscores: { [key: string]: Score[] };
  user: UserProfile;
}

export interface Score {
  points: number;
  date: string;
}
