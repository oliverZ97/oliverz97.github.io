export function getRandomNumberFromUTCDate(
  max: number,
  isPrevious = false,
  mode: "blurred" | "normal" = "normal",
  date?: Date
): number {
  if (max <= 0 || !Number.isInteger(max)) {
    throw new Error("Max must be a positive integer.");
  }
  const utcDate = date
    ? cleanUTCDate(date)
    : isPrevious
    ? getYesterdayUTCDate()
    : getDailyUTCDate();
  const dailyTimestamp = utcDate.getTime();
  const yearMonth = utcDate.getUTCFullYear() * 100 + utcDate.getUTCMonth();

  // Create multiple seeds based on different aspects of the date
  const seed1 = dailyTimestamp;
  const seed2 = utcDate.getUTCDate() + yearMonth * 31;
  const seed3 =
    utcDate.getUTCDate() * utcDate.getUTCMonth() + utcDate.getUTCFullYear();

  // Enhanced hash function with multiple seeds for better distribution
  let hash = seed1;
  hash = (hash ^ seed2) * 0x85ebca6b;
  hash = (hash ^ (hash >>> 16)) * 0x85ebca6b;
  hash = (hash ^ seed3 ^ (hash >>> 13)) * 0xc2b2ae35;
  hash = hash ^ (hash >>> 16);

  // For blurred mode, create a different but consistent hash
  if (mode === "blurred") {
    // Use a different seed value but maintain uniform distribution
    const blurSeed = 0x27d4eb2d;
    hash = (hash ^ blurSeed) >>> 0; // Ensure unsigned 32-bit integer
    hash = (hash ^ (hash >>> 16)) * 0x85ebca6b;
    hash = (hash ^ seed2 ^ (hash >>> 13)) * 0xc2b2ae35;
    hash = hash ^ (hash >>> 16);
  }

  const positiveHash = Math.abs(hash);

  // Use a prime number close to max for better distribution
  // This helps avoid patterns when max is a composite number
  const primeFactor = findNearestPrime(max);
  const randomNumber = (positiveHash % primeFactor) % max;

  return randomNumber;
}

export function getYesterdayUTCDate(): Date {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setUTCDate(today.getUTCDate() - 1);
  yesterday.setUTCHours(0, 0, 0, 0); // Set to start of yesterday UTC
  return yesterday;
}

/**
 * Finds the nearest prime number less than or equal to the given number.
 * This helps improve random distribution when used with modulo operations.
 */
export function findNearestPrime(n: number): number {
  // For small numbers, use a lookup table of common primes
  const smallPrimes = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
    73, 79, 83, 89, 97,
  ];

  // If n is small, return the largest prime <= n
  if (n <= 100) {
    for (let i = smallPrimes.length - 1; i >= 0; i--) {
      if (smallPrimes[i] <= n) {
        return smallPrimes[i];
      }
    }
    return 2; // Smallest prime if n < 2
  }

  // For larger numbers, start checking from n and work downward
  let candidate = n;
  while (candidate > 2) {
    if (isProbablePrime(candidate)) {
      return candidate;
    }
    candidate--;
  }

  return 97; // Fallback to a reasonably large prime
}

/**
 * Checks if a number is probably prime using a simple primality test.
 * This is a basic implementation - for cryptographic uses, a more robust test would be needed.
 */
function isProbablePrime(n: number): boolean {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;

  // Check divisibility by numbers of form 6k ± 1 up to sqrt(n)
  const limit = Math.sqrt(n);
  for (let i = 5; i <= limit; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) {
      return false;
    }
  }

  return true;
}

export function cleanUTCDate(date: Date): Date {
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

import { Anime, Character, Difficulty } from "common/types";
import { getNLatestVersion, getPreLatestVersion } from "./version";
import { DateTime } from "luxon";
import { CalendarEntry } from "components/Calendar";
import { getCurrentUserProfile } from "./profileUtils";

export function sortObjectsByKey(
  element1: Record<string, any>,
  element2: Record<string, any>,
  key: string,
  desc = false
) {
  if (desc) {
    if (element1[key] > element2[key]) {
      return -1;
    }
    if (element1[key] < element2[key]) {
      return 1;
    }
  } else {
    if (element1[key] > element2[key]) {
      return 1;
    }
    if (element1[key] < element2[key]) {
      return -1;
    }
  }
  return 0;
}

export function isIncludedInDifficulty(
  char: Character,
  difficulty: Difficulty
) {
  if (difficulty === "C") {
    return true;
  } else if (difficulty === "B") {
    if (char.Difficulty === "C") {
      return false;
    } else {
      return true;
    }
  } else if (difficulty === "A") {
    if (char.Difficulty === "A") {
      return true;
    } else {
      return false;
    }
  }
}

export function getDailyUTCDate() {
  const now = new Date(); // Get current date and time in local timezone
  const utcDate = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  ); // Create UTC date at 00:00:00

  //add days for TESTING purposes
  //utcDate.setUTCDate(utcDate.getUTCDate() + 0);
  return utcDate;
}

export function getRandomCharacterArray(
  charData: Character[],
  count: number,
  gender = "all"
) {
  let counter = 0;
  let chars: Character[] = [];
  while (counter < Math.max(0, count)) {
    const char = getRandomCharacter(charData, {
      endlessMode: undefined,
      isPrevious: undefined,
      gender,
    });
    if (!chars.some((item) => item.Name === char.Name)) {
      chars.push(char);
      counter++;
    }
  }
  return chars;
}

/**
 * Compares two version strings in the format "major.minor".
 * @param version1 First version string (e.g. "1.8")
 * @param version2 Second version string (e.g. "1.15")
 * @returns -1 if version1 < version2, 0 if equal, 1 if version1 > version2
 */
export function compareVersions(version1: string, version2: string): number {
  const v1String = version1.replace("v", "");
  const v2String = version2.replace("v", "");

  const [major1, minor1] = v1String.split(".").map(Number);
  const [major2, minor2] = v2String.split(".").map(Number);

  // Compare major versions first
  if (major1 !== major2) {
    return major1 > major2 ? 1 : -1;
  }

  // If major versions are equal, compare minor versions
  if (minor1 !== minor2) {
    return minor1 > minor2 ? 1 : -1;
  }

  // Versions are equal
  return 0;
}

interface GetRandomCharacterParams {
  endlessMode?: boolean;
  isPrevious?: boolean;
  usePreviousVersion?: boolean;
  gender?: string;
  quizMode?: "blurred" | "normal";
  numberOfEntries?: number;
  avoidRecentDuplicates?: boolean;
  date?: Date;
}
export function getRandomCharacter(
  charData: Character[],
  {
    endlessMode = true,
    isPrevious = false,
    usePreviousVersion = false,
    gender = "all",
    quizMode = "normal",
    avoidRecentDuplicates = true,
    date = undefined,
  }: GetRandomCharacterParams = {}
) {
  if (usePreviousVersion) {
    const preLatestVersion = getNLatestVersion(2);
    charData = charData.filter((char) => {
      const res = compareVersions(char.Version, preLatestVersion.version);
      return res < 0;
    });
  }
  let charArray = Object.values(charData);
  if (gender !== "all") {
    charArray = charArray.filter((char) => char.Sex.toLowerCase() === gender);
  }

  let index;
  if (endlessMode) {
    index = Math.floor(Math.random() * charArray.length);
  } else {
    // IMPORTANT: For non-endless mode (daily character), we need to ensure deterministic
    // selection first, then handle deduplication as a separate process

    // First, get the deterministic index based on date
    // This ensures the daily character is always the same for a given date
    if (isPrevious) {
      index =
        getRandomNumberFromUTCDate(charArray.length, true, quizMode, date) %
        charArray.length;
    } else {
      index =
        getRandomNumberFromUTCDate(charArray.length, false, quizMode, date) %
        charArray.length;
    }

    // Apply deduplication ONLY when developing or debugging
    // In normal operation, we want deterministic daily characters
    if (avoidRecentDuplicates && window.location.hostname === "localhost") {
      // Get recently used characters
      const recentChars = getRecentlyUsedCharacters();

      // Check if today's character is a recent duplicate
      const potentialTarget = charArray[index];

      if (recentChars.includes(potentialTarget.Name)) {
        // For testing/debugging only: track that we detected a duplicate
        //console.debug('Detected duplicate daily character:', potentialTarget.Name);
      }
    }
  }

  const target = charArray[index];

  // Store the selected character in history - but don't let this affect today's selection
  // Only store if we're not in endless mode and the feature is enabled
  if (!endlessMode && avoidRecentDuplicates && !date) {
    // Add after selection to avoid affecting today's character
    setTimeout(() => addToRecentCharacters(target.Name), 0);
  }

  return target as Character;
}

interface GetRandomAnimeParams {
  endlessMode?: boolean;
  isPrevious?: boolean;
  usePreviousVersion?: boolean;
  avoidRecentDuplicates?: boolean;
  date?: Date;
}
export function getRandomAnime(
  animeData: Anime[],
  {
    endlessMode = true,
    isPrevious = false,
    usePreviousVersion = false,
    avoidRecentDuplicates = true,
    date = undefined,
  }: GetRandomAnimeParams
) {
  if (usePreviousVersion) {
    const preLatestVersion = getNLatestVersion(1);
    animeData = animeData.filter((anime) => {
      const res = compareVersions(anime.Version, preLatestVersion.version);
      return res < 0;
    });
  }
  let animeArray = Object.values(animeData);

  let index;
  if (endlessMode) {
    index = Math.floor(Math.random() * animeArray.length);
  } else {
    // For daily deterministic selection, get the index first
    if (isPrevious) {
      index = getRandomNumberFromUTCDate(
        animeArray.length,
        true,
        "normal",
        date
      );
    } else {
      index = getRandomNumberFromUTCDate(
        animeArray.length,
        false,
        "normal",
        date
      );
    }

    // Apply deduplication ONLY when developing or debugging
    if (avoidRecentDuplicates && window.location.hostname === "localhost") {
      const recentAnimes = getRecentlyUsedAnimes();
      const potentialTarget = animeArray[index];

      if (recentAnimes.includes(potentialTarget.Name)) {
        // For testing/debugging only
        //console.debug('Detected duplicate daily anime:', potentialTarget.Name);
      }
    }
  }

  const target = animeArray[index];

  // Store the selected anime in history - but don't let this affect today's selection
  if (!endlessMode && avoidRecentDuplicates && !date) {
    // Add after selection to avoid affecting today's anime
    setTimeout(() => addToRecentAnimes(target.Name), 0);
  }

  return target as Anime;
}
export enum QUIZ_KEY {
  CHAR = "charquiz",
  ANIME = "animequiz",
  IMAGE = "imagequiz",
  BLUR = "blurquiz",
}

// Constants for recent character tracking
const RECENT_CHARS_KEY = "recentCharacters";
const MAX_RECENT_CHARS = 30; // Avoid repeating characters from the last 30 days

/**
 * Get the list of recently used character names from local storage.
 * This helps prevent duplicate characters from appearing in daily quizzes.
 */
export function getRecentlyUsedCharacters(): string[] {
  const stored = localStorage.getItem(RECENT_CHARS_KEY);
  if (!stored) return [];

  try {
    const data = JSON.parse(stored);
    if (Array.isArray(data.characters)) {
      return data.characters;
    }
    return [];
  } catch (e) {
    // If there's an error parsing, reset the storage
    localStorage.removeItem(RECENT_CHARS_KEY);
    return [];
  }
}

/**
 * Add a character name to the list of recently used characters.
 * Maintains a limited history to avoid too many restrictions.
 */
export function addToRecentCharacters(characterName: string): void {
  const recentChars = getRecentlyUsedCharacters();

  // Don't add duplicates
  if (recentChars.includes(characterName)) return;

  // Add to the front (most recent)
  recentChars.unshift(characterName);

  // Trim to maximum length
  while (recentChars.length > MAX_RECENT_CHARS) {
    recentChars.pop();
  }

  // Save back to localStorage
  localStorage.setItem(
    RECENT_CHARS_KEY,
    JSON.stringify({
      characters: recentChars,
      lastUpdated: new Date().toISOString(),
    })
  );
}

/**
 * Check for duplicate character selections across a range of future dates.
 * This is useful for content creators to plan ahead and identify potential duplicates
 * without affecting the daily character selection.
 *
 * @param charData The character data array
 * @param days Number of days to look ahead
 * @returns An object with information about duplicate selections
 */
export function analyzeFutureDuplicates(
  charData: Character[],
  days: number = 90
): Record<string, any> {
  const startDate = new Date();
  const characters: Record<string, any> = {};
  const duplicates: Record<string, any[]> = {};
  let duplicateCount = 0;

  // Look ahead for the specified number of days
  for (let i = 0; i < days; i++) {
    const futureDate = new Date(startDate);
    futureDate.setDate(startDate.getDate() + i);

    // Get the character for this date using our deterministic selection
    const character = getRandomCharacter(charData, {
      endlessMode: false,
      gender: "all",
      quizMode: "normal",
      avoidRecentDuplicates: false,
      date: futureDate,
    });

    const dateString = futureDate.toISOString().split("T")[0];

    // Check if this character has appeared before
    if (characters[character.Name]) {
      duplicateCount++;

      // Record this duplicate
      if (!duplicates[character.Name]) {
        duplicates[character.Name] = [
          { date: characters[character.Name].date, character },
        ];
      }

      duplicates[character.Name].push({ date: dateString, character });
    }

    // Store this character
    characters[character.Name] = {
      date: dateString,
      index: i,
    };
  }

  return {
    totalDays: days,
    uniqueCharacters: Object.keys(characters).length,
    duplicateCount,
    duplicates,
  };
}

export function hasBeenSolvedToday(key: QUIZ_KEY) {
  const solvedInfo = localStorage.getItem(key + "_HasBeenSolvedToday");
  if (solvedInfo) {
    if (!solvedInfo?.includes("{")) {
      // If the format is not JSON, it might be an old version or corrupted data
      localStorage.removeItem(key + "_HasBeenSolvedToday");
      return false;
    }
    if (!solvedInfo?.includes("gaveUp") && key !== QUIZ_KEY.IMAGE) {
      localStorage.removeItem(key + "_HasBeenSolvedToday");
      return false;
    }
    const { date: solvedDate } = JSON.parse(solvedInfo);

    const date = new Date(solvedDate).toDateString();
    const now = new Date().toDateString();
    if (date === now) {
      return true;
    } else {
      localStorage.removeItem(key + "_HasBeenSolvedToday");
      return false;
    }
  } else {
    return false;
  }
}

// Constants for recent anime tracking
const RECENT_ANIMES_KEY = "recentAnimes";
const MAX_RECENT_ANIMES = 20; // Avoid repeating anime from the last 20 days

/**
 * Get the list of recently used anime names from local storage.
 * This helps prevent duplicate anime from appearing in daily quizzes.
 */
export function getRecentlyUsedAnimes(): string[] {
  const stored = localStorage.getItem(RECENT_ANIMES_KEY);
  if (!stored) return [];

  try {
    const data = JSON.parse(stored);
    if (Array.isArray(data.animes)) {
      return data.animes;
    }
    return [];
  } catch (e) {
    // If there's an error parsing, reset the storage
    localStorage.removeItem(RECENT_ANIMES_KEY);
    return [];
  }
}

/**
 * Add an anime name to the list of recently used animes.
 * Maintains a limited history to avoid too many restrictions.
 */
export function addToRecentAnimes(animeName: string): void {
  const recentAnimes = getRecentlyUsedAnimes();

  // Don't add duplicates
  if (recentAnimes.includes(animeName)) return;

  // Add to the front (most recent)
  recentAnimes.unshift(animeName);

  // Trim to maximum length
  while (recentAnimes.length > MAX_RECENT_ANIMES) {
    recentAnimes.pop();
  }

  // Save back to localStorage
  localStorage.setItem(
    RECENT_ANIMES_KEY,
    JSON.stringify({
      animes: recentAnimes,
      lastUpdated: new Date().toISOString(),
    })
  );
}

export function gaveUpOnTodaysQuiz(key: QUIZ_KEY) {
  const solvedInfo = localStorage.getItem(key + "_HasBeenSolvedToday");

  if (solvedInfo) {
    if (!solvedInfo?.includes("gaveUp") && key !== QUIZ_KEY.IMAGE) {
      localStorage.removeItem(key + "_HasBeenSolvedToday");
      return false;
    }
    const { date: solvedDate, gaveUp } = JSON.parse(solvedInfo);

    const date = new Date(solvedDate).toDateString();
    const now = new Date().toDateString();
    if (date === now) {
      return gaveUp;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export function getDailyScore(date: string): number {
  const currentProfile = getCurrentUserProfile();
  if (!currentProfile) {
    return 0; // Do not track score if disabled in settings
  }
  const dailyScore = localStorage.getItem(
    `userProfile_${currentProfile.username}`
  );
  if (dailyScore) {
    const scoreLog = JSON.parse(dailyScore);
    return scoreLog[date]?.totalScore || 0;
  } else {
    return 0;
  }
}

export function setDailyScore(
  date: string,
  score: number,
  key: QUIZ_KEY
): void {
  const currentProfile = getCurrentUserProfile();
  if (!currentProfile) {
    return; // Do not track score if disabled in settings
  }
  const scores = localStorage.getItem("scorelog");
  if (scores) {
    //Migration to User related score tracking
    const scoreLog = JSON.parse(scores);
    if (scoreLog[date]) {
      scoreLog[date][key] = score;
      scoreLog[date].totalScore = (scoreLog[date].totalScore || 0) + score;
    } else {
      scoreLog[date] = { [key]: score };
      scoreLog[date].totalScore = score;
    }

    const profileStatistics = {
      scores: scoreLog,
      user: currentProfile.id,
    };
    localStorage.setItem(
      "profile_" + currentProfile.id,
      JSON.stringify(profileStatistics)
    );
    localStorage.removeItem("scorelog");
  } else if (localStorage.getItem("profile_" + currentProfile.id)) {
    const profileData = localStorage.getItem("profile_" + currentProfile.id);
    if (profileData) {
      const profileStatistics = JSON.parse(profileData);
      if (profileStatistics.scores[date]) {
        profileStatistics.scores[date][key] = score;
        profileStatistics.scores[date].totalScore =
          (profileStatistics.scores[date].totalScore || 0) + score;
      } else {
        profileStatistics.scores[date] = { [key]: score };
        profileStatistics.scores[date].totalScore = score;
      }
      localStorage.setItem(
        "profile_" + currentProfile.id,
        JSON.stringify(profileStatistics)
      );
    }
  } else {
    const profileStatistics = {
      scores: { [date]: { [key]: score, totalScore: score } },
      user: currentProfile.id,
    };

    localStorage.setItem(
      "profile_" + currentProfile.id,
      JSON.stringify(profileStatistics)
    );
  }
}

export function debugGetRandomCharacter(
  charData: Character[],
  {
    endlessMode = true,
    isPrevious = false,
    usePreviousVersion = false,
    gender = "all",
    quizMode = "normal",
    numberOfEntries = 1,
  }: GetRandomCharacterParams = {}
) {
  let charArray = Object.values(charData);
  if (gender !== "all") {
    charArray = charArray.filter((char) => char.Sex.toLowerCase() === gender);
  }
  const targets: Record<string, Character> = {};
  const stats: Record<string, number> = {};
  const selectedIndices: Record<number, boolean> = {};
  const selectedNames: Record<string, boolean> = {};
  const dailyEntries: Record<string, Character> = {};

  // Track duplicates for debugging
  let duplicateCount = 0;
  let uniqueCount = 0;

  // Test deterministic selection for today
  // Run it 5 times to verify it returns the same character each time
  for (let i = 0; i < 5; i++) {
    const todayChar = getRandomCharacter(charData, {
      endlessMode: false,
      isPrevious: false,
      gender,
      quizMode,
      avoidRecentDuplicates: false,
    });
    dailyEntries[`Run ${i + 1}`] = todayChar;
  }
  console.log(
    "Deterministic daily character test (should be identical):",
    dailyEntries
  );

  // Test distribution across many days
  for (let i = 0; i < numberOfEntries; i++) {
    let index;
    let date;
    if (!isPrevious) {
      date = DateTime.now()
        .plus({ days: i + 1 })
        .toJSDate();
    } else {
      date = DateTime.now()
        .minus({ days: i + 1 })
        .toJSDate();
    }
    if (usePreviousVersion) {
      const preLatestVersion = getNLatestVersion(1);
      charData = charData.filter((char) => {
        const res = compareVersions(char.Version, preLatestVersion.version);
        return res < 0;
      });
    }

    if (endlessMode) {
      index = Math.floor(Math.random() * charArray.length);
    } else {
      // Use our improved random distribution
      index =
        getRandomNumberFromUTCDate(
          charArray.length,
          isPrevious,
          quizMode,
          date
        ) % charArray.length;
    }

    const target = charArray[index];
    targets[date.toISOString()] = {
      ...target,
    };

    // Track statistics for analysis
    stats[index] = (stats[index] || 0) + 1;

    // Track unique vs duplicate selections
    if (selectedIndices[index]) {
      duplicateCount++;
    } else {
      selectedIndices[index] = true;
      uniqueCount++;
    }

    if (selectedNames[target.Name]) {
      // This is a duplicate character name
    } else {
      selectedNames[target.Name] = true;
    }
  }

  console.log("Distribution Statistics:", stats);
  console.log(
    `Unique characters: ${uniqueCount}, Duplicates: ${duplicateCount}`
  );
  console.log(`Unique names: ${Object.keys(selectedNames).length}`);

  // Calculate distribution quality metrics
  const indices = Object.keys(stats).map(Number);
  const values = Object.values(stats);
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  const variance =
    values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) /
    values.length;

  console.log(
    `Distribution metrics - Mean: ${mean.toFixed(
      2
    )}, Variance: ${variance.toFixed(2)}`
  );
  console.log(`Lower variance indicates more even distribution`);

  return targets;
}

export function getScoreLogs(): Record<string, { [key: string]: number }> {
  const currentProfile = getCurrentUserProfile();
  if (!currentProfile) return {};
  const scoreLog = localStorage.getItem(
    `userProfile_${currentProfile.username}`
  );
  if (scoreLog) {
    return JSON.parse(scoreLog);
  }
  return {};
}

export function formatScoresForCalendar(
  scoreLogs: Record<string, { [key: string]: number }>
): Record<string, CalendarEntry[]> {
  const entries: Record<string, CalendarEntry[]> = {};

  for (const [date, scores] of Object.entries(scoreLogs)) {
    const dateKey = DateTime.fromISO(date).toFormat("yyyy-MM-dd");
    entries[dateKey] = [
      {
        value: scores.totalScore.toString(),
        date: DateTime.fromISO(date),
      },
    ];
  }
  return entries;
}

export function getCharacterBirthdaysAsCalendarData(charData: Character[]) {
  const entries: Record<string, CalendarEntry[]> = {};
  const currentYear = DateTime.now().year;

  charData.forEach((char) => {
    if (char.Birthday && char.Birthday.includes(".")) {
      // Parse the birthday format (assuming it's "DD.MM" format)
      const [day, month] = char.Birthday.split(".").map(Number);

      // Create a DateTime object for this birthday in the current year
      // We'll use this as a key to store in our data structure
      const birthday = DateTime.utc(currentYear, month, day);
      const dateKey = birthday.toFormat("yyyy-MM-dd");

      const dateEntry: CalendarEntry = {
        value: char.Name,
        date: birthday,
        isRecurring: true, // Mark as recurring so calendar knows to show it every year
      };

      entries[dateKey] = entries[dateKey] || [];
      entries[dateKey].push(dateEntry);
    }
  });

  return entries;
}

// Example of combining regular events with recurring birthday events:
export function combineCalendarData(
  ...dataSources: Record<string, CalendarEntry[]>[]
) {
  const combined: Record<string, CalendarEntry[]> = {};

  dataSources.forEach((source) => {
    Object.entries(source).forEach(([date, entries]) => {
      combined[date] = combined[date] || [];
      combined[date].push(...entries);
    });
  });

  return combined;
}
