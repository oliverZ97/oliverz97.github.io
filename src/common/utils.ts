export function getRandomNumberFromUTCDate(
  max: number,
  isPrevious = false,
  mode: "blurred" | "normal" = "normal",
  date?: Date
): number {
  if (max <= 0 || !Number.isInteger(max)) {
    throw new Error("Max must be a positive integer.");
  }
  const utcDate = date ? cleanUTCDate(date) : isPrevious ? getYesterdayUTCDate() : getDailyUTCDate();
  const dailyTimestamp = utcDate.getTime();

  // Hash the daily timestamp to create a more distributed value.
  let hash = dailyTimestamp;
  hash = (hash ^ (hash >>> 16)) * 0x85ebca6b;
  hash = (hash ^ (hash >>> 13)) * 0xc2b2ae35;
  hash = hash ^ (hash >>> 16);

  // For blurred mode, create a different but consistent hash
  if (mode === "blurred") {
    // Use a different seed value but maintain uniform distribution
    const blurSeed = 0x27d4eb2d;
    hash = (hash ^ blurSeed) >>> 0; // Ensure unsigned 32-bit integer
    hash = (hash ^ (hash >>> 16)) * 0x85ebca6b;
    hash = (hash ^ (hash >>> 13)) * 0xc2b2ae35;
    hash = hash ^ (hash >>> 16);
  }

  const positiveHash = Math.abs(hash);
  const randomNumber = positiveHash % max;
  return randomNumber;
}

export function getYesterdayUTCDate(): Date {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setUTCDate(today.getUTCDate() - 1);
  yesterday.setUTCHours(0, 0, 0, 0); // Set to start of yesterday UTC
  return yesterday;
}

export function cleanUTCDate(date: Date): Date {
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

import { Anime, Character, Difficulty } from "common/types";
import { getNLatestVersion, getPreLatestVersion } from "./version";
import { DateTime } from "luxon";

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
export function compareVersions(
  version1: string | number,
  version2: string | number
): number {
  const v1String = String(version1);
  const v2String = String(version2);

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
}
export function getRandomCharacter(
  charData: Character[],
  {
    endlessMode = true,
    isPrevious = false,
    usePreviousVersion = false,
    gender = "all",
    quizMode = "normal"
  }: GetRandomCharacterParams = {}
) {
  if (usePreviousVersion) {
    const preLatestVersion = getNLatestVersion(1);
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
    // Create a seed based on the quizMode to get different daily characters
    // for different quiz modes
    if (isPrevious) {
      // Use a hash function to create a different but consistent index for each mode
      index = (getRandomNumberFromUTCDate(charArray.length, true, quizMode)) % charArray.length;

    } else {
      index = (getRandomNumberFromUTCDate(charArray.length, false, quizMode)) % charArray.length;
    }
  }
  const target = charArray[index];
  return target as Character;
}

interface GetRandomAnimeParams {
  endlessMode?: boolean;
  isPrevious?: boolean;
  usePreviousVersion?: boolean;
}
export function getRandomAnime(
  animeData: Anime[],
  {
    endlessMode = true,
    isPrevious = false,
    usePreviousVersion = false,
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
    if (isPrevious) {
      index = getRandomNumberFromUTCDate(animeArray.length, true);
    } else {
      index = getRandomNumberFromUTCDate(animeArray.length);
    }
  }
  const target = animeArray[index];
  return target as Anime;
}

export enum QUIZ_KEY {
  CHAR = "charquiz",
  ANIME = "animequiz",
  IMAGE = "imagequiz",
  BLUR = "blurquiz",
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
  const dailyScore = localStorage.getItem("scorelog");
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
  const scores = localStorage.getItem("scorelog");
  if (scores) {
    const scoreLog = JSON.parse(scores);
    if (scoreLog[date]) {
      scoreLog[date][key] = score;
      scoreLog[date].totalScore = (scoreLog[date].totalScore || 0) + score;
    } else {
      scoreLog[date] = { [key]: score };
      scoreLog[date].totalScore = score;
    }
    localStorage.setItem("scorelog", JSON.stringify(scoreLog));
  } else {
    localStorage.setItem(
      "scorelog",
      JSON.stringify({ [date]: { [key]: score, totalScore: score } })
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
    numberOfEntries = 1
  }: GetRandomCharacterParams = {}
) {
  let charArray = Object.values(charData);
  if (gender !== "all") {
    charArray = charArray.filter((char) => char.Sex.toLowerCase() === gender);
  }
  const targets: Record<string, Character> = {};
  const stats: Record<string, number> = {};
  for (let i = 0; i < numberOfEntries; i++) {
    let index;
    let date;
    if (!isPrevious) {
      date = DateTime.now().plus({ days: i + 1 }).toJSDate();
    } else {
      date = DateTime.now().minus({ days: i + 1 }).toJSDate();
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
      // Create a seed based on the quizMode to get different daily characters
      // for different quiz modes
      if (isPrevious) {
        // Use a hash function to create a different but consistent index for each mode
        index = (getRandomNumberFromUTCDate(charArray.length, true, quizMode, date)) % charArray.length;

      } else {
        index = (getRandomNumberFromUTCDate(charArray.length, false, quizMode, date)) % charArray.length;
      }
    }
    const target = charArray[index];
    targets[date.toISOString()] = {
      ...target,
    };
    stats[index] = (stats[index] || 0) + 1;
  }

  console.log(stats);

  return targets;
}
