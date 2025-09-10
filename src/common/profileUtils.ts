import { Streak } from "components/Streak";
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

export function getCurrentUserLog() {
  const currentProfile = getCurrentUserProfile();
  if (!currentProfile) return null;
  const userLogStr = localStorage.getItem(`profile_${currentProfile.id}`);
  if (userLogStr) {
    return JSON.parse(userLogStr);
  }
  return { userId: currentProfile.id };
}

export function setUserLog(userLog: UserLogs) {
  localStorage.setItem(`profile_${userLog.userId}`, JSON.stringify(userLog));
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
  const userLog = getCurrentUserLog();
  if (userLog) {
    //Add field to statistics log group
    if (!userLog.statistics) {
      userLog.statistics = {};
    }
    for (const field of fields) {
      if (!userLog.statistics[field]) {
        userLog.statistics[field] = 0;
      }
      userLog.statistics[field] += value;
    }
    setUserLog(userLog);
  }
}

export function saveStreakToProfile(quizKey: string, streak: Streak) {
  const userLog = getCurrentUserLog();
  if (userLog) {
    //Add field to statistics log group
    if (!userLog.streaks) {
      userLog.streaks = {};
    }
    userLog.streaks[quizKey] = streak;
    setUserLog(userLog);
  }
}

//saves the best three scores of each quiz to the profile
export function saveHighscoreToProfile(quizKey: string, score: Score) {
  const userLog = getCurrentUserLog();
  if (userLog) {
    // Ensure highscores object exists
    if (!userLog.highscores) {
      userLog.highscores = {};
    }

    userLog.highscores[`${quizKey}_highscore`] = [score];
    setUserLog(userLog);
  }
}
