import { Streak } from "components/Streak";
import { Art, Rarity } from "components/TCG/TCGCard";

export interface Character {
  id: number;
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
  Anime_Id: number;
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
  id: number;
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
  higherlowerHeightGamesPlayed = "higherlowerHeightGamesPlayed",
  higherlowerAnimeGamesPlayed = "higherlowerAnimeGamesPlayed",
  higherlowerHeightPointsTotal = "higherlowerHeightPointsTotal",
  higherlowerAnimePointsTotal = "higherlowerAnimePointsTotal",
}

export interface Card {
  cardId: string; //combination of characterId + rarity + art
  characterId: number; //id of the character
  character: Character;
  rarity: Rarity;
  art: Art;
  obtainedAt: string;
  packId: number;
}

export interface Collection {
  cards: Card[];
  lastUpdated: string;
  totalCards: number;
}

export interface Pack {
  id: number;
  tag: string;
  packname: string;
  mainAnime: number[];
  price: number;
  coverId: number;
  visible?: boolean;
  config?: PackConfig;
}

export interface PackConfig {
  secretRarePossibilty: number; // e.g., 0.1 means 10% chance for one Secret Rare in pack
  additionalSuperRare: number; // 5% chance for an additional Super Rare
  ultraRarePossibility: number; // Always have Ultra Rare at the end
  mainCastChance: number; // e.g., 0.3 means 30% chance for main cast character
  godPackPossibility: number; // 2% chance for all Ultra Rares
  secretRareOnly?: boolean; // if true and GodPack, pack only contains Secret Rares
  ultraRareOnly?: boolean; // if true and GodPack, pack only contains Ultra Rares
}

export const defaultPackConfig: PackConfig = {
  secretRarePossibilty: 0.1, // 10% chance for Secret Rare
  additionalSuperRare: 0.05, // 5% chance for an additional Super Rare
  ultraRarePossibility: 0.5, // Always have Ultra Rare at the end
  godPackPossibility: 0.02, // 2% chance for all Ultra Rares
  mainCastChance: 0.3, // 30% chance for main cast character
};

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
  settings?: Record<string, string | boolean | number>;
  credits: {
    total: number;
    used: number;
    available: number;
  };
  collection?: Collection;
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
