import { Streak } from "components/Streak";
import { v4 as uuidv4 } from "uuid";

export function downloadStats() {
  //Download statistic data from local storage
  const currentProfile = getCurrentUserProfile();
  if (!currentProfile) return;
  const scoreLog = localStorage.getItem(`stats_${currentProfile.id}`);
  if (scoreLog) {
    const blob = new Blob([scoreLog], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `user_${currentProfile.username}.json`;
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

export const defaultUser: UserProfile = {
  id: "guest",
  username: "Guest",
  createdAt: new Date().toISOString(),
};

export function createUserProfile(user: UserProfile | string) {
  let username = "";
  if (typeof user !== "string") {
    const userProfile = loadUserProfile(user.username);
    if (userProfile) return; //User already exists
    localStorage.setItem(`userProfile_${user.username}`, JSON.stringify(user));
    username = user.username;
  } else {
    const uuid = uuidv4();
    const userProfile: UserProfile = {
      id: uuid,
      username: user,
      createdAt: new Date().toISOString(),
    };
    username = user;
    localStorage.setItem(
      `userProfile_${username}`,
      JSON.stringify(userProfile)
    );
  }
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

export function getCurrentUserLog(): UserLogs | null {
  const currentProfile = getCurrentUserProfile();
  if (!currentProfile) return null;
  const userLogStr = localStorage.getItem(`stats_${currentProfile.id}`);
  if (userLogStr) {
    return JSON.parse(userLogStr);
  }
  return {
    user: currentProfile,
    statistics: {},
    scores: {},
    streaks: {},
    highscores: {},
  };
}

export function setUserLog(userLog: UserLogs) {
  localStorage.setItem(`stats_${userLog.user.id}`, JSON.stringify(userLog));
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
    userLog.highscores[`${quizKey}_highscore`].sort((a: Score, b: Score) =>
      a.points < b.points ? 1 : -1
    );
    userLog.highscores[`${quizKey}_highscore`] = userLog.highscores[
      `${quizKey}_highscore`
    ].slice(0, 3);
    setUserLog(userLog);
  }
}

export function getHighscoresFromProfile(quizKey: string): Score[] {
  const userLog = getCurrentUserLog();
  if (userLog && userLog.highscores) {
    return userLog.highscores[`${quizKey}_highscore`] || [];
  }
  return [];
}

export type SolvedKeys =
  | "charquizSolved"
  | "animeQuizSolved"
  | "blurQuizSolved"
  | "imageQuizSolved";
export function saveHasBeenSolvedToday(
  quizKey: SolvedKeys,
  solveData: SolveData
) {
  const userProfile = getCurrentUserProfile();
  if (userProfile && solveData) {
    userProfile[quizKey] = solveData;
  }

  setUserProfile(userProfile!);
}

function setUserProfile(userProfile: UserProfile) {
  localStorage.setItem(
    `userProfile_${userProfile.username}`,
    JSON.stringify(userProfile)
  );
}
