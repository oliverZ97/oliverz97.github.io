import { Character, Difficulty } from "common/types";

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
         return false
      } else {
         return true
      }
   } else if (difficulty === "A") {
      if (char.Difficulty === "A") {
         return true
      } else {
         return false
      }
   }
}