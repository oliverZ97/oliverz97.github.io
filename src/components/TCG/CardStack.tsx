import { Box } from "@mui/material";
import { Rarity, TCGCard } from "./TCGCard";
import { Character } from "common/types";
import { useEffect, useState } from "react";
interface CardStackProps {
  charData: Character[];
  amount: number;
}

export const CardStack = ({ amount, charData }: CardStackProps) => {
  const [cards, setCards] = useState<Character[]>([]);
  const [topCardIndex, setTopCardIndex] = useState<number>(0);
  const [rarities, setRarities] = useState<Rarity[]>([]);
  const secretRarePossibilty = 0.1; // 10% chance for Secret Rare
  const additionalSuperRare = 0.05; // 5% chance for Secret Rare or Super Rare

  useEffect(() => {
    setRarities(getStackRarities(amount));
  }, [amount]);


  useEffect(() => {
    if (cards.length === 0) {
      fillBooster();
    }
  }, [charData, amount]);

  function fillBooster() {
    const booster: Character[] = [];
    for (let i = 0; i < amount; i++) {
      const randomIndex = Math.floor(Math.random() * charData.length);
      booster.push(charData[randomIndex]);
    }
    setCards(booster);
  }

  function handleCardClick(index: number) {
    if (index === topCardIndex) {
      // Wait for slide animation to complete before revealing next card
      setTimeout(() => {
        if (topCardIndex < cards.length - 1) {
          setTopCardIndex(topCardIndex + 1);
        }
      }, 1000);
    }

  }
  function getStackRarities(amount: number): Rarity[] {
    const rarities: Rarity[] = [];
    const hasSecretRare = Math.random() < secretRarePossibilty;
    const hasAdditionalSuperRare = Math.random() < additionalSuperRare;
    for (let i = 0; i < amount; i++) {
      if (i === amount - 1) {
        rarities.push("UltraRare");
      } else if (i === amount - 2) {
        if (hasSecretRare) {
          rarities.push("SecretRare");
        } else {
          rarities.push("SuperRare");
        }
      } else {
        if (hasAdditionalSuperRare && i === amount - 3) {
          rarities.push("SuperRare");
        } else {
          rarities.push("Rare");
        }
      }
    }
    return rarities;
  }
  return (
    <Box sx={{ position: "relative" }}>
      {rarities && cards.map((card, index) => {
        let zIndex;
        if (index < topCardIndex) {
          // Cards that have been revealed go behind
          zIndex = -1;
        } else if (index === topCardIndex) {
          // Current top card is on top
          zIndex = 100;
        } else {
          // Remaining cards stacked in reverse order
          zIndex = cards.length - index;
        }

        return (
          <Box
            sx={{
              position: "absolute",
              top: 0 + index * 5,
              left: 0,
              zIndex: zIndex,
              pointerEvents: index === topCardIndex ? "auto" : "none",
            }}
            key={index}
            onClick={() => handleCardClick(index)}
          >
            <TCGCard
              slideOnClick
              character={card}
              visible={index === topCardIndex || index === topCardIndex + 1}
              inStack={index >= topCardIndex}
              rarity={rarities[index]}
            />
          </Box>
        );
      })}
    </Box>
  );
};
