import { Anime, Character, Difficulty, SolvedKeys, StatisticFields } from "@/common/types";
import { getCurrentVersion, getPreLatestVersion } from "./version";
import { DateTime } from "luxon";
import { CalendarEntry } from "@/components/Calendar";
import {
  getCurrentUserLog,
  getCurrentUserProfile,
  saveFieldToTotalStatistics,
} from "./profileUtils";

export enum QUIZ_KEY {
  CHAR = "charquiz",
  ANIME = "animequiz",
  IMAGE = "imagequiz",
  BLUR = "blurquiz",
  CHOICE = "choicequiz",
  HIGHERLOWER_ANIME = "higherloweranimequiz",
  HIGHERLOWER_HEIGHT = "higherlowerheightquiz",
}

const QUIZ_SHIFT_MAP: Record<QUIZ_KEY, number> = {
  [QUIZ_KEY.CHAR]: 104729,
  [QUIZ_KEY.ANIME]: 104729,
  [QUIZ_KEY.IMAGE]: 15485863,
  [QUIZ_KEY.BLUR]: 982451653,
  [QUIZ_KEY.CHOICE]: 7919,
  [QUIZ_KEY.HIGHERLOWER_ANIME]: 42,
  [QUIZ_KEY.HIGHERLOWER_HEIGHT]: 99,
};

export function getRandomIndicesFromUTCDate(
  max: number,
  isPrevious = false,
  amount: number = 1,
  shiftValue: number = QUIZ_SHIFT_MAP["charquiz"],
  date?: Date,
): number[] {
  if (max <= 0 || !Number.isInteger(max)) {
    throw new Error("Max must be a positive integer.");
  }
  const utcDate = date
    ? cleanUTCDate(date)
    : isPrevious
    ? getYesterdayUTCDate()
    : getDailyUTCDate();

  const indices = getMultipleDailyIndices(
    utcDate.getFullYear(),
    utcDate.getMonth(),
    utcDate.getDay(),
    shiftValue,
    max,
    amount,
  );

  return indices;
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
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97,
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
  desc = false,
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

export function isIncludedInDifficulty(char: Character, difficulty: Difficulty) {
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
  const utcDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())); // Create UTC date at 00:00:00

  //add days for TESTING purposes
  //utcDate.setUTCDate(utcDate.getUTCDate() + 0);
  return utcDate;
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
  date?: Date;
  mode?: QUIZ_KEY;
}
export function getRandomCharacter(
  charData: Character[],
  {
    endlessMode = true,
    isPrevious = false,
    gender = "all",
    date = undefined,
    mode,
  }: GetRandomCharacterParams = {},
  count: number = 1,
) {
  //sort chars by id
  let chars = charData.sort((a, b) => (a.id < b.id ? -1 : 1));
  let currentVersion = getCurrentVersion();
  if (
    isPrevious &&
    currentVersion.date.split("T")[0] === getYesterdayUTCDate().toISOString().split("T")[0]
  ) {
    currentVersion = getPreLatestVersion();
  }

  chars = chars.filter((char) => compareVersions(char.Version, currentVersion.version) <= 0);
  let charArray = Object.values(chars);
  if (gender !== "all") {
    charArray = charArray.filter((char) => char.Sex.toLowerCase() === gender);
  }

  const indices = getRandomIndicesFromUTCDate(
    charArray.length,
    isPrevious,
    count,
    QUIZ_SHIFT_MAP[mode ?? QUIZ_KEY.CHAR],
    date,
  );

  const targets: Character[] = [];
  if (endlessMode) {
    for (let i = 0; i < count; i++) {
      const idx = Math.floor(Math.random() * charArray.length);
      const target = charArray[idx];
      targets.push(target);
    }
  } else {
    for (let i = 0; i < indices.length; i++) {
      const target = charArray[indices[i]];
      targets.push(target);
    }
  }

  return targets;
}

interface GetRandomAnimeParams {
  endlessMode?: boolean;
  isPrevious?: boolean;
  date?: Date;
}
export function getRandomAnime(
  animeData: Anime[],
  { endlessMode = true, isPrevious = false, date = undefined }: GetRandomAnimeParams,
) {
  let animeArray = Object.values(animeData);
  animeArray = animeArray.sort((a, b) => (a.id < b.id ? -1 : 1));
  let currentVersion = getCurrentVersion();
  if (
    isPrevious &&
    currentVersion.date.split("T")[0] === getYesterdayUTCDate().toISOString().split("T")[0]
  ) {
    currentVersion = getPreLatestVersion();
  }
  animeArray = animeArray.filter(
    (anime) => compareVersions(anime.Version, currentVersion.version) <= 0,
  );

  let index: number;
  if (endlessMode) {
    index = Math.floor(Math.random() * animeArray.length);
  } else {
    // For daily deterministic selection, get the index first
    index = getRandomIndicesFromUTCDate(
      animeArray.length,
      isPrevious,
      QUIZ_SHIFT_MAP["charquiz"],
      1,
      date,
    )[0];
  }

  const target = animeArray[index];

  return target as Anime;
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

export function setDailyScore(date: string, score: number, key: QUIZ_KEY, tries?: number): void {
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
    localStorage.setItem("stats_" + currentProfile.id, JSON.stringify(profileStatistics));
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
      localStorage.setItem("stats_" + currentProfile.id, JSON.stringify(profileStatistics));
      //TODO: Check here later for total days of played games for achievement
    }
  } else {
    const profileStatistics = {
      scores: {
        [date]: { [key]: score, totalScore: score, [key + "_tries"]: tries },
      },
      user: currentProfile.id,
    };

    localStorage.setItem("stats_" + currentProfile.id, JSON.stringify(profileStatistics));
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
  scoreLogs: Record<string, { [key: string]: number }>,
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
export function combineCalendarData(...dataSources: Record<string, CalendarEntry[]>[]) {
  const combined: Record<string, CalendarEntry[]> = {};

  dataSources.forEach((source) => {
    Object.entries(source).forEach(([date, entries]) => {
      combined[date] = combined[date] || [];
      combined[date].push(...entries);
    });
  });

  return combined;
}

export function createAnimeListFromCharData(
  charData: Character[],
  animeData: { id: number; Name: string; Origin: string }[],
) {
  // Create a map to track anime entries with lowest version numbers
  const animeMap = new Map();

  // First pass: populate the map with anime entries
  charData.forEach((item: Character) => {
    const anime = animeData.find((anime) => anime.id === item.Anime_Id);

    const animeEntry: Anime = {
      id: item.Anime_Id,
      Name: item.Anime,
      First_Release_Year: item.First_Release_Year,
      Studio: item.Studio,
      Genre: item.Genre,
      Subgenre1: item.Subgenre1,
      Subgenre2: item.Subgenre2,
      Tags: item.Tags,
      Version: item.Version,
      Origin: anime?.Origin ?? "-",
    };

    // If this anime isn't in the map yet or has a lower version number, update the map
    if (!animeMap.has(item.Anime) || item.Version < animeMap.get(item.Anime).Version) {
      animeMap.set(item.Anime, { ...animeEntry });
    }
  });

  // Convert map values to array
  const localAnimeData = Array.from(animeMap.values());
  return localAnimeData;
}

function getMultipleDailyIndices(
  year: number,
  month: number,
  day: number,
  shiftValue: number,
  arrayLength: number,
  count: number,
) {
  // 1. Create combined seed from date and shift
  const dateSeed = year * 10000 + month * 100 + day;
  let seed = dateSeed ^ Math.imul(shiftValue, 2654435761);

  // 2. Seeded PRNG (Mulberry32)
  function random() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  // 3. Shuffle array pool using the PRNG
  const indices = Array.from({ length: arrayLength }, (_, i) => i);

  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  return indices.slice(0, Math.min(count, arrayLength));
}
