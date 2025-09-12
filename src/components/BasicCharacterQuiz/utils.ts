import { Character, Difficulty } from "common/types";

const BASEPOINTS = 150;
const REDUCEFACTOR = 10;

export function calculateSelectionPoints(
  correctFieldCount: number,
  searchHistory: Character[],
  difficulty: Difficulty,
  points: number,
  setPoints: (points: number) => void
) {
  console.log(correctFieldCount, searchHistory.length, difficulty, points);
  const baseValue = Math.max(searchHistory.length, 1) * BASEPOINTS;
  let difficultyFactor = 2;
  if (difficulty === "B") {
    difficultyFactor = 1.5;
  }
  if (difficulty === "C") {
    difficultyFactor = 1;
  }
  let roundPoints =
    baseValue - correctFieldCount * REDUCEFACTOR * difficultyFactor;
  console.log(points - roundPoints < 0 ? 0 : points - roundPoints);
  setPoints(points - roundPoints < 0 ? 0 : points - roundPoints);
}

export function removeOptionFromArray(
  value: Character,
  localCharData: Character[],
  setLocalCharData: (data: Character[]) => void
) {
  const index = localCharData.indexOf(value);
  const tempArray = localCharData;
  tempArray.splice(index, 1);
  setLocalCharData(tempArray);
}
