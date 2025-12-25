import {
  Anime,
  Character,
  Difficulty,
  SolvedKeys,
  StatisticFields,
} from "common/types";
import { getCurrentVersion, getPreLatestVersion } from "./version";
import { DateTime } from "luxon";
import { CalendarEntry } from "components/Calendar";
import {
  getCurrentUserLog,
  getCurrentUserProfile,
  saveFieldToTotalStatistics,
} from "./profileUtils";

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
    const char = getRandomCharacter(Object.values(charData), {
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
  gender?: string;
  quizMode?: "blurred" | "normal";
  date?: Date;
}
export function getRandomCharacter(
  charData: Character[],
  {
    endlessMode = true,
    isPrevious = false,
    gender = "all",
    quizMode = "normal",
    date = undefined,
  }: GetRandomCharacterParams = {}
) {
  let chars = charData.sort((a, b) => (a.id < b.id ? -1 : 1));
  let currentVersion = getCurrentVersion();
  if (
    isPrevious &&
    currentVersion.date.split("T")[0] ===
    getYesterdayUTCDate().toISOString().split("T")[0]
  ) {
    currentVersion = getPreLatestVersion();
  }

  chars = chars.filter(
    (char) => compareVersions(char.Version, currentVersion.version) <= 0
  );
  let charArray = Object.values(chars);
  if (gender !== "all") {
    charArray = charArray.filter((char) => char.Sex.toLowerCase() === gender);
  }

  let index;
  if (endlessMode) {
    index = Math.floor(Math.random() * charArray.length);
  } else {
    // First, get the deterministic index based on date
    // This ensures the daily character is always the same for a given date
    index =
      getRandomNumberFromUTCDate(charArray.length, isPrevious, quizMode, date) %
      charArray.length;
  }

  const target = charArray[index];

  return target as Character;
}

interface GetRandomAnimeParams {
  endlessMode?: boolean;
  isPrevious?: boolean;
  date?: Date;
}
export function getRandomAnime(
  animeData: Anime[],
  {
    endlessMode = true,
    isPrevious = false,
    date = undefined,
  }: GetRandomAnimeParams
) {
  let animeArray = Object.values(animeData);
  animeArray = animeArray.sort((a, b) => (a.id < b.id ? -1 : 1));
  let currentVersion = getCurrentVersion();
  if (
    isPrevious &&
    currentVersion.date.split("T")[0] ===
    getYesterdayUTCDate().toISOString().split("T")[0]
  ) {
    currentVersion = getPreLatestVersion();
  }
  animeArray = animeArray.filter(
    (anime) => compareVersions(anime.Version, currentVersion.version) <= 0
  );

  let index;
  if (endlessMode) {
    index = Math.floor(Math.random() * animeArray.length);
  } else {
    // For daily deterministic selection, get the index first
    index = getRandomNumberFromUTCDate(
      animeArray.length,
      isPrevious,
      "normal",
      date
    );
  }

  const target = animeArray[index];

  return target as Anime;
}
export enum QUIZ_KEY {
  CHAR = "charquiz",
  ANIME = "animequiz",
  IMAGE = "imagequiz",
  BLUR = "blurquiz",
  CHOICE = "choicequiz",
  HIGHERLOWER_ANIME = "higherloweranimequiz",
  HIGHERLOWER_HEIGHT = "higherlowerheightquiz",
}

export function hasBeenSolvedToday(key: QUIZ_KEY) {
  const profile = getCurrentUserProfile();
  if (!profile) return false;
  const solvedInfo = profile[(key + "Solved") as SolvedKeys];
  if (solvedInfo) {
    const date = new Date(solvedInfo.date).toDateString();
    const now = new Date().toDateString();
    if (date === now) {
      return true;
    } else {
      profile[(key + "Solved") as SolvedKeys] = undefined;
      return false;
    }
  } else {
    return false;
  }
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
  const userLog = getCurrentUserLog();
  let dailyScore = 0;
  if (userLog) {
    const totalScore = userLog?.scores?.[date]?.totalScore;
    if (totalScore !== undefined) {
      dailyScore = totalScore;
    }
  }
  return dailyScore;
}

export function setDailyScore(
  date: string,
  score: number,
  key: QUIZ_KEY,
  tries?: number
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
      if (tries !== undefined) {
        scoreLog[date][key + "_tries"] = tries;
      }
      scoreLog[date].totalScore = (scoreLog[date].totalScore || 0) + score;
    } else {
      if (tries !== undefined) {
        scoreLog[date] = { [key]: score, [key + "_tries"]: tries };
      } else {
        scoreLog[date] = { [key]: score };
      }
      scoreLog[date].totalScore = score;
    }

    const profileStatistics = {
      scores: scoreLog,
      user: currentProfile.id,
    };
    localStorage.setItem(
      "stats_" + currentProfile.id,
      JSON.stringify(profileStatistics)
    );
    localStorage.removeItem("scorelog");
  } else if (localStorage.getItem("stats_" + currentProfile.id)) {
    const profileData = localStorage.getItem("stats_" + currentProfile.id);
    if (profileData) {
      const profileStatistics = JSON.parse(profileData);
      // Ensure scores object exists
      if (!profileStatistics.scores) {
        profileStatistics.scores = {};
      }

      if (profileStatistics.scores[date]) {
        profileStatistics.scores[date][key] = score;
        if (tries !== undefined) {
          profileStatistics.scores[date][key + "_tries"] = tries;
        }
        profileStatistics.scores[date].totalScore =
          (profileStatistics.scores[date].totalScore || 0) + score;
      } else {
        profileStatistics.scores[date] = { [key]: score };
        if (tries !== undefined) {
          profileStatistics.scores[date][key + "_tries"] = tries;
        }
        profileStatistics.scores[date].totalScore = score;
      }
      localStorage.setItem(
        "stats_" + currentProfile.id,
        JSON.stringify(profileStatistics)
      );
      //TODO: Check here later for total days of played games for achievement
    }
  } else {
    const profileStatistics = {
      scores: {
        [date]: { [key]: score, totalScore: score, [key + "_tries"]: tries },
      },
      user: currentProfile.id,
    };

    localStorage.setItem(
      "stats_" + currentProfile.id,
      JSON.stringify(profileStatistics)
    );
  }

  const newDailyTotal = getDailyScore(date);
  if (newDailyTotal > 35000) {
    saveFieldToTotalStatistics([StatisticFields.totalOver35kPointsGames], 1);
  }
  if (newDailyTotal >= 40000) {
    saveFieldToTotalStatistics([StatisticFields.totalMaxPoints], 1);
  }
}

export function getScoreLogs(): Record<string, { [key: string]: number }> {
  const logs = getCurrentUserLog();
  return logs ? logs.scores : {};
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
