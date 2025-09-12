import { Streak } from "components/Streak";
import { v4 as uuidv4 } from "uuid";
import {
  Score,
  SolveData,
  SolvedKeys,
  StatisticFields,
  UserLogs,
  UserProfile,
} from "./types";

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

export const defaultUser: UserProfile = {
  id: "guest",
  username: "Guest",
  createdAt: new Date().toISOString(),
};

/**
 * Creates a user profile and stores it in local storage.
 *
 * If a UserProfile object is provided, it checks if the user already exists.
 * If the user exists, the function returns early.
 * If the user doesn't exist, it stores the profile in local storage.
 *
 * If a string is provided, it creates a new UserProfile with a generated UUID,
 * the provided username, and the current timestamp, then stores it in local storage.
 *
 * In both cases, the username is added to the list of existing profiles in local storage
 * and the created profile is set as the current user profile.
 *
 * @param user - Either a UserProfile object or a string representing the username
 * @returns void
 */
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

/**
 * Loads a user profile from localStorage.
 *
 * @param username - The username whose profile should be loaded
 * @returns The user profile object if found, or null if no profile exists
 */
export function loadUserProfile(username: string) {
  const userProfileStr = localStorage.getItem(`userProfile_${username}`);
  if (userProfileStr) {
    return JSON.parse(userProfileStr);
  }
  return null;
}

/**
 * Retrieves the current user's log data from local storage.
 *
 * This function first gets the current user profile and then attempts to retrieve
 * the associated log data from local storage using a key in the format `stats_{userId}`.
 * If log data exists, it is parsed from JSON and returned.
 * If no log data exists, a new UserLogs object is initialized with the current user profile
 * and empty statistics, scores, streaks, and highscores objects.
 *
 * @returns {UserLogs | null} The user's log data if a profile exists, otherwise null.
 */
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

/**
 * Sets or updates the user log in the localStorage.
 *
 * @param userLog - The user logs object to be stored
 * @remarks The user log is stored as a JSON string in localStorage with the key format `stats_${userId}`
 */
export function setUserLog(userLog: UserLogs) {
  localStorage.setItem(`stats_${userLog.user.id}`, JSON.stringify(userLog));
}

/**
 * Sets the current user profile by storing the username in the local storage.
 *
 * @param username - The username to be stored as the current user profile
 */
export function setCurrentUserProfile(username: string) {
  localStorage.setItem("currentUserProfile", username);
}

/**
 * Retrieves the current user's profile from local storage.
 *
 * This function first checks if a username is stored in localStorage under the key "currentUserProfile".
 * If a username is found, it loads and returns the corresponding user profile.
 * If no username is found, it returns null.
 *
 * @returns {UserProfile | null} The user profile if a username is found in localStorage, otherwise null
 */
export function getCurrentUserProfile(): UserProfile | null {
  const username = localStorage.getItem("currentUserProfile");
  if (username) {
    return loadUserProfile(username);
  }
  return null;
}

/**
 * Loads existing profiles from local storage.
 *
 * @returns {Array} An array of profiles retrieved from localStorage, or an empty array if none exist.
 * The profiles are parsed from JSON format stored under the key "existingProfiles".
 */
export function loadExistingProfiles() {
  const existingProfilesStr = localStorage.getItem("existingProfiles");
  return existingProfilesStr ? JSON.parse(existingProfilesStr) : [];
}

/**
 * Saves a value to multiple statistic fields in the current user's log.
 * Creates statistic fields if they don't exist and adds the value to existing ones.
 *
 * @param fields - Array of statistic field names to update
 * @param value - Numeric value to add to each of the specified fields
 *
 * @example
 * // Add 10 points to both 'score' and 'totalPoints' statistics
 * saveFieldToTotalStatistics(['score', 'totalPoints'], 10);
 */
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

/**
 * Saves a streak for a specific quiz to the user's profile.
 *
 * This function retrieves the current user log, adds or updates the streak
 * information for the specified quiz, and then saves the updated user log.
 * If the streaks object doesn't exist in the user log, it initializes it.
 *
 * @param quizKey - The unique identifier for the quiz
 * @param streak - The streak object to be saved
 *
 * @remarks
 * The function requires that a user is currently logged in to successfully save the streak.
 */
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

/**
 * Saves a highscore to the user profile for a specific quiz.
 *
 * This function retrieves the current user log, adds the new score to the
 * appropriate quiz's highscore list, sorts the highscores in descending order
 * by points, keeps only the top 3 scores, and then updates the user log.
 *
 * @param quizKey - The unique identifier for the quiz
 * @param score - The score object to be saved
 *
 * @remarks
 * - If the user log doesn't exist, the function will do nothing
 * - If the highscores object doesn't exist in the user log, it will be created
 * - Only the top 3 scores for each quiz are retained
 */
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

/**
 * Retrieves the highscores for a specific quiz from the user's profile.
 *
 * @param quizKey - The unique identifier for the quiz to retrieve highscores for
 * @returns An array of Score objects representing the highscores for the specified quiz.
 * Returns an empty array if no highscores exist for the quiz or if the user log is not available.
 */
export function getHighscoresFromProfile(quizKey: string): Score[] {
  const userLog = getCurrentUserLog();
  if (userLog && userLog.highscores) {
    return userLog.highscores[`${quizKey}_highscore`] || [];
  }
  return [];
}

/**
 * Saves the solve data for a quiz to the current user's profile.
 * @param quizKey - The key identifying which quiz was solved.
 * @param solveData - The data about how the quiz was solved.
 * @returns void
 */
export function saveHasBeenSolvedToday(
  quizKey: SolvedKeys,
  solveData: SolveData
) {
  const userProfile = getCurrentUserProfile();
  if (userProfile && solveData) {
    userProfile[quizKey] = solveData;
    setUserProfile(userProfile);
  }
}

/**
 * Sets the user profile in the local storage.
 *
 * @param userProfile - The user profile object to be stored
 * @example
 * const userProfile = {
 *   username: 'johndoe',
 *   // other user properties
 * };
 * setUserProfile(userProfile);
 */
function setUserProfile(userProfile: UserProfile) {
  localStorage.setItem(
    `userProfile_${userProfile.username}`,
    JSON.stringify(userProfile)
  );
}
