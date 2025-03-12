export function getRandomNumberFromUTCDate(
  max: number,
  isPrevious = false
): number {
  if (max <= 0 || !Number.isInteger(max)) {
    throw new Error("Max must be a positive integer.");
  }

  const utcDate = isPrevious ? getYesterdayUTCDate() : getDailyUTCDate();
  const timestamp = utcDate.getTime(); // Get the UTC timestamp in milliseconds
  const randomNumber = timestamp % max;

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
