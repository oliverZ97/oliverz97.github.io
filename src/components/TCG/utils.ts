import { darken } from "@mui/material";
import { Character } from "common/types";
import { COLORS } from "styling/constants";

export function getBackgroundColor(character: Character): string[] {
  const charGenres = character.Genre.split(" ");
  const colors: string[] = [];
  if (charGenres.includes("Action")) {
    colors.push(COLORS.cards.bg.action);
  }
  if (charGenres.includes("Comedy")) {
    colors.push(COLORS.cards.bg.comedy);
  }
  if (charGenres.includes("Romance") || charGenres.includes("Romantic")) {
    colors.push(COLORS.cards.bg.romance);
  }
  if (charGenres.includes("Drama")) {
    colors.push(COLORS.cards.bg.drama);
  }
  if (charGenres.includes("Fantasy") || charGenres.includes("Adventure")) {
    colors.push(COLORS.cards.bg.fantasy);
  }
  if (charGenres.includes("Fighting-Shounen")) {
    colors.push(COLORS.cards.bg.drama);
  }
  if (charGenres.includes("Supernatural") || charGenres.includes("Horror")) {
    colors.push(COLORS.cards.bg.drama);
  }

  if (colors.length === 1) {
    colors.push(darken(colors[0], 0.3));
  }
  if (colors.length === 0) {
    colors.push(COLORS.cards.bg.default);
  }
  return colors;
}
