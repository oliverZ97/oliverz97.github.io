export function getRandomNumberFromUTCDate(
  max: number,
  isPrevious = false
): number {
  if (max <= 0 || !Number.isInteger(max)) {
    throw new Error("Max must be a positive integer.");
  }

  const utcDate = isPrevious ? getYesterdayUTCDate() : getDailyUTCDate();
  const dailyTimestamp = utcDate.getTime();

  // Hash the daily timestamp to create a more distributed value.
  let hash = dailyTimestamp;
  hash = (hash ^ (hash >>> 16)) * 0x85ebca6b;
  hash = (hash ^ (hash >>> 13)) * 0xc2b2ae35;
  hash = hash ^ (hash >>> 16);

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

import { Character, Difficulty } from "common/types";

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
  return utcDate;
}


export function getRandomCharacterArray(charData: Character[], count: number, gender = "all") {
  let counter = 0;
  let chars: Character[] = [];
  while (counter < Math.max(0, count)) {
    const char = getRandomCharacter(charData, undefined, undefined, gender);
    if (!chars.some((item) => item.Name === char.Name)) {
      chars.push(char);
      counter++;
    }
  }
  return chars;
}

export function getRandomCharacter(charData: Character[], endlessMode = true, isPrevious = false, gender = "all") {
  let charArray = Object.values(charData);
  if (gender !== "all") {
    charArray = charArray.filter((char) => char.Sex.toLowerCase() === gender)
  }
  let index;
  if (endlessMode) {
    index = Math.floor(Math.random() * charArray.length);
  } else {
    if (isPrevious) {
      index = getRandomNumberFromUTCDate(charArray.length, true);
    } else {
      index = getRandomNumberFromUTCDate(charArray.length);
    }
  }
  const target = charArray[index];
  return target as Character;
}