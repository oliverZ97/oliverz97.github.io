import { alpha, darken, lighten } from "@mui/material";
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
    colors.push(COLORS.cards.bg.shounen);
  }
  if (charGenres.includes("Supernatural") || charGenres.includes("Horror")) {
    colors.push(COLORS.cards.bg.supernatural);
  }

  if (colors.length === 1) {
    colors.push(lighten(colors[0], 0.3));
  }
  if (colors.length === 0) {
    colors.push(COLORS.cards.bg.default, lighten(COLORS.cards.bg.default, 0.3));

  }
  return colors;
}


export async function getCardArt(id: number, fileType: "webp" | "png" | "jpg" = "webp"): Promise<string> {
  const filename = id.toString() + "_full_art";
  const basepath = !import.meta.env.PROD
    ? "/src/assets/tcg/"
    : "assets/tcg/";

  const path = basepath + filename + "." + fileType;

  // Check if the image exists
  return new Promise<string>((resolve) => {
    const img = new Image();
    img.onload = () => resolve(path);
    img.onerror = () => resolve("");
    img.src = path;
  });
}