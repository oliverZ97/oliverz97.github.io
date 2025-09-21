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
  let userProfile: UserProfile;
  let username = "";

  if (typeof user !== "string") {
    const existingUserProfile = loadUserProfile(user.username);
    localStorage.setItem(`userProfile_${user.username}`, JSON.stringify(user));
    username = user.username;
    userProfile = user;
  } else {
    const existingProfiles = loadExistingProfiles();
    if (existingProfiles.includes(user)) return; //User already exists
    const uuid = uuidv4();
    userProfile = {
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

  // Ensure a stats entry exists for the new user profile
  const userLog = getUserLog(userProfile.id);
  if (!userLog) {
    createEmptyUserLog(userProfile);
  }

  const existingProfilesStr = localStorage.getItem("existingProfiles");
  let existingProfiles: string[] = [];
  if (existingProfilesStr) {
    existingProfiles = safeJsonParse<string[]>(existingProfilesStr, []);
    if (Array.isArray(existingProfiles)) {
      existingProfiles.forEach((profile) => {
        loadUserProfile(profile);
      });
    }
  }

  if (!existingProfiles.includes(username)) {
    existingProfiles.push(username);
  }
  localStorage.setItem("existingProfiles", JSON.stringify(existingProfiles));
  setCurrentUserProfile(username);
  migrateExistingStreaksToProfile(username);
  migrateExistingScoresToProfile(username);
}

function getUserLog(id: string) {
  const userLogStr = localStorage.getItem(`stats_${id}`);
  if (userLogStr) {
    return safeJsonParse<UserLogs>(userLogStr);
  }
  return null;
}

function createEmptyUserLog(user: UserProfile) {
  const userLog: UserLogs = {
    user: user,
    statistics: {},
    scores: {},
    streaks: {},
    highscores: {},
  };
  localStorage.setItem(`stats_${user.id}`, JSON.stringify(userLog));
  return userLog;
}

function migrateExistingStreaksToProfile(username: string) {
  const userProfile = loadUserProfile(username);
  if (!userProfile) return;

  let userLog = getUserLog(userProfile.id);
  if (!userLog) {
    userLog = createEmptyUserLog(userProfile);
  }

  const existingStreakKeys = Object.keys(localStorage).filter((key) =>
    key.endsWith("Streak")
  );

  if (existingStreakKeys.length > 0) {
    existingStreakKeys.forEach((streakKey) => {
      const streakStr = localStorage.getItem(streakKey);
      if (userLog && streakStr) {
        const streakObj = safeJsonParse<Streak>(streakStr);
        if (streakObj && streakObj.streak !== undefined && streakObj.date) {
          if (!userLog.streaks) {
            userLog.streaks = {};
          }
          userLog.streaks[streakKey] = streakObj;
          localStorage.removeItem(streakKey);
        }
      }
    });
  }

  setUserLog(userLog); // Always save the user log
}

/**
 * Migrates existing scores from legacy localStorage format to the user profile.
 * Similar to how streaks are migrated, this finds any old-format score entries
 * and moves them to the user's profile.
 *
 * @param username - The username whose profile should receive the migrated scores
 */
function migrateExistingScoresToProfile(username: string) {
  const userProfile = loadUserProfile(username);
  if (!userProfile) return;

  let userLog = getUserLog(userProfile.id);
  if (!userLog) {
    userLog = createEmptyUserLog(userProfile);
  }

  // Look for old score entries that match a pattern like "quizName_score"
  const existingScoreKeys = Object.keys(localStorage).filter(
    (key) => key.endsWith("scores") || key.endsWith("dailyScores")
  );

  if (existingScoreKeys.length > 0) {
    existingScoreKeys.forEach((scoreKey) => {
      const scoreStr = localStorage.getItem(scoreKey);
      if (scoreStr) {
        const scoreObj = safeJsonParse<Score | Score[]>(scoreStr);

        if (userLog && scoreObj) {
          // Ensure highscores object exists
          if (!userLog.highscores) {
            userLog.highscores = {};
          }

          // Handle both single score objects and arrays of scores
          if (Array.isArray(scoreObj)) {
            userLog.highscores[scoreKey] = scoreObj;
          } else {
            // For single score objects, create an array
            userLog.highscores[scoreKey] = [scoreObj];
          }

          // Remove the old entry
          localStorage.removeItem(scoreKey);
        }
      }
    });
  }

  // Always save the user log after migration
  setUserLog(userLog);
}

/**
 * Loads a user profile from localStorage.
 *
 * @param username - The username whose profile should be loaded
 * @returns The user profile object if found, or null if no profile exists
 */
export function loadUserProfile(username: string): UserProfile | null {
  const userProfileStr = localStorage.getItem(`userProfile_${username}`);
  if (userProfileStr) {
    const profile = safeJsonParse<any>(userProfileStr, null);
    if (isValidUserProfile(profile)) {
      return profile;
    }
    console.error(`Invalid user profile format for username: ${username}`);
    return null;
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
    return safeJsonParse<UserLogs>(userLogStr);
  }
  return createEmptyUserLog(currentProfile);
}

/**
 * Sets or updates the user log in the localStorage.
 *
 * @param userLog - The user logs object to be stored
 * @remarks The user log is stored as a JSON string in localStorage with the key format `stats_${userId}`
 */
export function setUserLog(userLog: UserLogs) {
  // Handle migration for older profiles where user is just the ID string
  let userId: string;

  if (typeof userLog.user === "string") {
    // Legacy format: user field contains just the ID string
    userId = userLog.user;

    // Migrate to new format by finding the matching user profile
    const existingProfiles = loadExistingProfiles();
    for (const username of existingProfiles) {
      const profile = loadUserProfile(username);
      if (profile && profile.id === userId) {
        // Found the matching profile, update the user field
        userLog.user = { username: profile.username, id: profile.id, createdAt: profile.createdAt };
        break;
      }
    }

    // If no matching profile found, create a placeholder one
    if (typeof userLog.user === "string") {
      userLog.user = {
        id: userId,
        username: `User_${userId}`,
        createdAt: new Date().toISOString(),
      };
    }
  } else if (!userLog.user || !userLog.user.id) {
    // Invalid user object
    console.error("Missing user ID in userLog", userLog);
    return;
  } else {
    // Current format: user field contains UserProfile object
    userId = userLog.user.id;
  }

  // Save with the correct ID
  localStorage.setItem(`stats_${userId}`, JSON.stringify(userLog));
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
export function loadExistingProfiles(): string[] {
  const existingProfilesStr = localStorage.getItem("existingProfiles");
  if (existingProfilesStr) {
    const profiles = safeJsonParse<string[]>(existingProfilesStr, []);
    return Array.isArray(profiles) ? profiles : [];
  }
  return [];
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
      userLog.statistics[field] = userLog.statistics[field]! + value;
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

    const existingScores = userLog.highscores[`${quizKey}_highscore`] || [];
    const validScores = Array.isArray(existingScores) ? existingScores : [];
    validScores.push(score);
    userLog.highscores[`${quizKey}_highscore`] = validScores;

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
export function setUserProfile(userProfile: UserProfile) {
  localStorage.setItem(
    `userProfile_${userProfile.username}`,
    JSON.stringify(userProfile)
  );
}

function safeJsonParse<T>(jsonString: string, defaultValue?: T): T {
  try {
    return JSON.parse(jsonString) as T;
  } catch (e) {
    console.error("Error parsing JSON:", e);
    return defaultValue as T;
  }
}

function isValidUserProfile(obj: any): obj is UserProfile {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj.id === "string" &&
    typeof obj.username === "string" &&
    typeof obj.createdAt === "string"
  );
}
