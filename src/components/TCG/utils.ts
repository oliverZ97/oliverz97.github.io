import { alpha, darken, lighten } from "@mui/material";
import { setUserProfile } from "common/profileUtils";
import { getCurrentUserProfile } from "common/profileUtils";
import { Card, Character, Pack } from "common/types";
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

export async function getCardArt(id: number): Promise<string> {
  const filename = id.toString() + "_full_art";
  const basepath = !import.meta.env.PROD ? "/src/assets/tcg/" : "assets/tcg/";

  const path = basepath + filename + ".webp";

  // Check if the image exists
  return new Promise<string>((resolve) => {
    const img = new Image();
    img.onload = () => resolve(path);
    img.onerror = () => resolve("");
    img.src = path;
  });
}

export function getCardArtSync(id: number): string {
  const filename = id.toString() + "_full_art";
  const basepath = !import.meta.env.PROD ? "/src/assets/tcg/" : "assets/tcg/";

  const path = basepath + filename + ".webp";
  return path;
}

/*
XXX - characterId
R - Rarity (C, SR, UR, SSR)
A - Art type (Full or Normal)
XXX/R/AAA
**/
export function generateCardId(
  characterId: number,
  rarity: string,
  art: string
): string {
  const artCode = art === "full" ? "F" : "N";
  let rarityCode = "";
  switch (rarity) {
    case "Common":
      rarityCode = "C";
      break;
    case "SuperRare":
      rarityCode = "SR";
      break;
    case "UltraRare":
      rarityCode = "UR";
      break;
    case "SecretRare":
      rarityCode = "SSR";
      break;
  }
  return `${characterId}/${rarityCode}/${artCode}`;
}

export function applyCardToCollection(card: Card) {
  const profile = getCurrentUserProfile();
  if (profile) {
    if (profile.collection) {
      profile.collection.cards.push(card);
      profile.collection.totalCards += 1;
      profile.collection.lastUpdated = new Date().toISOString();
    } else {
      profile.collection = {
        cards: [card],
        totalCards: 1,
        lastUpdated: new Date().toISOString(),
      };
    }
    setUserProfile(profile);
  }
}

export function filterCharsByPack(
  charData: Character[],
  pack: Pack
): Character[] {
  return charData.filter((char) => pack.mainAnime.includes(char.Anime_Id));
}
