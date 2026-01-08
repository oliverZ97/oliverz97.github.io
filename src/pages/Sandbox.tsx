import { Box } from "@mui/material";
import { Art, Rarity, TCGCard } from "components/TCG/TCGCard";
import { useEffect, useState } from "react";
import characterData from "data/character_data.json";
import { Card, Character } from "common/types";
import { generateCardId } from "components/TCG/utils";

export const Sandbox = () => {
  const [charData, setCharData] = useState<Character[]>([]);

  const [card, setCard] = useState<Card | null>(null);
  const [rarity, setRarity] = useState<Rarity>("Common");
  const [art, setArt] = useState<Art>("default");

  useEffect(() => {
    if (charData.length === 0) {
      setCharData([
        ...characterData.sort((a, b) => (a.Name < b.Name ? -1 : 1)),
      ] as Character[]);
    }
  }, [charData, characterData]);

  useEffect(() => {
    let characterId = 99;
    const character =
      charData.find((char) => char.id === characterId) ?? charData[0];
    let card: Card = {
      cardId: generateCardId(characterId, rarity, art), //combination of characterId + rarity + art
      characterId: 99, //id of the character
      character,
      rarity,
      art,
      obtainedAt: new Date().toISOString(),
      packname: "sandbox pack",
    };
    setCard(card);
  }, []);

  return (
    <Box>{card && <TCGCard card={card} size="large" visible={true} />}</Box>
  );
};
