import { v4 as uuidv4 } from "uuid";

export function downloadStats() {
  //Download statistic data from local storage
  const currentProfile = getCurrentUserProfile();
  if (!currentProfile) return;
  const username = currentProfile.username;
  const scoreLog = localStorage.getItem(`userProfile_${username}`);
  if (scoreLog) {
    const blob = new Blob([scoreLog], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "user_statistics.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

export interface UserProfile {
  id: string;
  username: string;
  createdAt: string;
}

export interface UserLogs {
  statistics: { [key in StatisticFields]?: number };
  scoreLog: { [key: string]: number };
  streaks: { [key: string]: number };
  highscores: { [key: string]: Score[] };
  userId: string;
}

export interface Score {
  points: number;
  date: string;
}

export const defaultUser: UserProfile = {
  id: "guest",
  username: "Guest",
  createdAt: new Date().toISOString(),
};

export function createUserProfile(username: string) {
  const uuid = uuidv4();
  const userProfile: UserProfile = {
    id: uuid,
    username: username,
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(`userProfile_${username}`, JSON.stringify(userProfile));
  const existingProfilesStr = localStorage.getItem("existingProfiles");
  let existingProfiles: string[] = existingProfilesStr
    ? JSON.parse(existingProfilesStr)
    : [];
  existingProfiles.push(username);
  localStorage.setItem("existingProfiles", JSON.stringify(existingProfiles));
  setCurrentUserProfile(username);
}

export function loadUserProfile(username: string) {
  const userProfileStr = localStorage.getItem(`userProfile_${username}`);
  if (userProfileStr) {
    return JSON.parse(userProfileStr);
  }
  return null;
}

export function setCurrentUserProfile(username: string) {
  localStorage.setItem("currentUserProfile", username);
}

export function getCurrentUserProfile(): UserProfile | null {
  const username = localStorage.getItem("currentUserProfile");
  if (username) {
    return loadUserProfile(username);
  }
  return null;
}

export function loadExistingProfiles() {
  const existingProfilesStr = localStorage.getItem("existingProfiles");
  return existingProfilesStr ? JSON.parse(existingProfilesStr) : [];
}

export enum StatisticFields {
  totalGamesPlayed = "totalGamesPlayed",
  totalWins = "totalWins",
  totalLosses = "totalLosses",
  totalScore = "totalScore",
  totalCharactersGuessed = "totalCharactersGuessed",
  totalBlurredCharactersGuessed = "totalBlurredCharactersGuessed",
  totalCharacterImagesGuessed = "totalCharacterImagesGuessed",
  totalAnimesGuessed = "totalAnimesGuessed",
}

export function saveFieldToTotalStatistics(
  fields: StatisticFields[],
  value: number
) {
  const currentProfile = getCurrentUserProfile();
  if (!currentProfile) {
    return; // Do not track score if disabled in settings
  }
  const userId = currentProfile.id;
  const userLogStr = localStorage.getItem(`profile_${userId}`);
  if (userLogStr) {
    const userLogs: UserLogs = JSON.parse(userLogStr || "{}");

    //Add field to statistics log group
    if (!userLogs.statistics) {
      userLogs.statistics = {};
    }
    for (const field of fields) {
      if (!userLogs.statistics[field]) {
        userLogs.statistics[field] = 0;
      }
      userLogs.statistics[field] += value;
    }
    localStorage.setItem(`profile_${userId}`, JSON.stringify(userLogs));
  }
}

export function saveStreakToProfile(
  date: string,
  quizKey: string,
  streak: number
) {
  const currentProfile = getCurrentUserProfile();
  if (!currentProfile) {
    return; // Do not track score if disabled in settings
  }
  const userId = currentProfile.id;
  const userLogStr = localStorage.getItem(`profile_${userId}`);
  if (userLogStr) {
    const userLogs: UserLogs = JSON.parse(userLogStr || "{}");

    //Add field to statistics log group
    if (!userLogs.statistics) {
      userLogs.streaks = {};
    }
    userLogs.streaks[`${quizKey}_streak`] = streak;
    localStorage.setItem(`profile_${userId}`, JSON.stringify(userLogs));
  }
}

export function saveHighscoreToProfile(quizKey: string, score: Score) {
  const currentProfile = getCurrentUserProfile();
  if (!currentProfile) {
    return; // Do not track score if disabled in settings
  }
  const userId = currentProfile.id;
  const userLogStr = localStorage.getItem(`profile_${userId}`);
  if (userLogStr) {
    const userLogs: UserLogs = JSON.parse(userLogStr || "{}");

    //Add field to statistics log group
    if (!userLogs.highscores) {
      userLogs.highscores = {};
    }
    userLogs.highscores[`${quizKey}_highscore`] = [score];
    localStorage.setItem(`profile_${userId}`, JSON.stringify(userLogs));
  }
}
