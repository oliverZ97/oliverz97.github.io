import { Anime } from "@/common/types";

const BASEPOINTS = 150;
const REDUCEFACTOR = 10;

export function calculateSelectionPoints(
  correctFieldCount: number,
  searchHistory: Anime[],
  points: number,
  setPoints: (points: number) => void,
) {
  const baseValue = Math.max(searchHistory.length, 1) * BASEPOINTS;
  const difficultyFactor = 2;
  const roundPoints = baseValue - correctFieldCount * REDUCEFACTOR * difficultyFactor;
  setPoints(points - roundPoints < 0 ? 0 : points - roundPoints);
}

export function removeOptionFromArray(
  value: Anime,
  localCharData: Anime[],
  setLocalCharData: (data: Anime[]) => void,
) {
  const index = localCharData.indexOf(value);
  const tempArray = localCharData;
  tempArray.splice(index, 1);
  setLocalCharData(tempArray);
}
