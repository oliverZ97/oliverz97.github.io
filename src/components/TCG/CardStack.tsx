import { Box } from "@mui/material";
import { Rarity, TCGCard } from "./TCGCard";
import { Character, Card } from "common/types";
import { useEffect, useState } from "react";
import { applyCreditsToProfile, generateCardId, getCardArt } from "./utils";
import { CardInfoEntry } from "./CardInfoEntry";
import { COLORS } from "styling/constants";
import { BoosterPackage } from "./BoosterPackage";

interface CardStackProps {
  charData: Character[];
  amount: number;
}

export const CardStack = ({ amount, charData }: CardStackProps) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [topCardIndex, setTopCardIndex] = useState<number>(0);
  const [packOpen, setPackOpen] = useState<boolean>(false);
  const secretRarePossibilty = 0.1; // 10% chance for Secret Rare
  const additionalSuperRare = 0.05; // 5% chance for Secret Rare or Super Rare
  const ultraRarePossibility = 0.5; // Always have Ultra Rare at the end
  const godPackPossibility = 0.02; // 2% chance for all Ultra Rares

  useEffect(() => {
    if (cards.length === 0) {
      void fillBooster();
    }
  }, [charData, amount]);

  async function fillBooster() {
    const hasSecretRare = Math.random() < secretRarePossibilty;
    const hasAdditionalSuperRare = Math.random() < additionalSuperRare;
    const hasUltraRare = Math.random() < ultraRarePossibility;
    const isGodPack = Math.random() < godPackPossibility;
    const booster: Card[] = [];
    for (let i = 0; i < amount; i++) {
      const randomIndex = Math.floor(Math.random() * charData.length);
      let isFullArt = Math.random() < 0.25;
      let path = await getCardArt(charData[randomIndex].id, "jpg");
      if (path === "") {
        isFullArt = false;
      }
      let rarity = getCardRarity(
        i,
        isGodPack,
        hasSecretRare,
        hasAdditionalSuperRare,
        hasUltraRare
      );
      let card: Card = {
        character: charData[randomIndex],
        characterId: charData[randomIndex].id,
        cardId: generateCardId(
          charData[randomIndex].id,
          rarity,
          isFullArt ? "full" : "default"
        ),
        obtainedAt: new Date().toISOString(),
        rarity: rarity,
        art: isFullArt ? "full" : "default",
      };
      booster.push(card);
    }
    setCards(booster);
  }

  function handleCardClick(index: number) {
    if (index === topCardIndex) {
      // Add to collection
      applyCreditsToProfile(cards[topCardIndex]);
      // Wait for slide animation to complete before revealing next card
      setTimeout(() => {
        if (topCardIndex < cards.length - 1) {
          setTopCardIndex(topCardIndex + 1);
        }
      }, 1000);
    }
  }
  function getCardRarity(
    i: number,
    isGodPack: boolean,
    hasSecretRare: boolean,
    hasAdditionalSuperRare: boolean,
    hasUltraRare: boolean
  ): Rarity {
    let rarity: Rarity = "Common";

    if (isGodPack) {
      let rdm = Math.random();
      if (rdm < 0.5) {
        rarity = "SecretRare";
      } else {
        rarity = "UltraRare";
      }

      return rarity;
    }
    if (i === amount - 1) {
      if (hasUltraRare) {
        rarity = "UltraRare";
      } else {
        rarity = "SuperRare";
      }
    } else if (i === amount - 2) {
      if (hasSecretRare) {
        rarity = "SecretRare";
      } else {
        rarity = "SuperRare";
      }
    } else {
      if (hasAdditionalSuperRare && i === amount - 3) {
        rarity = "SuperRare";
      }
    }
    return rarity;
  }
  return (
    <Box sx={{ position: "relative" }}>
      <BoosterPackage zIndex={10} onOpenPack={() => setPackOpen(true)} />

      {cards.map((card, index) => {
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
          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                position: "absolute",
                top: 0 + index * 4,
                left: 0,
                zIndex: zIndex,
                pointerEvents: index === topCardIndex ? "auto" : "none",
              }}
              key={index}
              onClick={() => handleCardClick(index)}
            >
              <TCGCard
                slideOnClick
                card={card}
                visible={index === topCardIndex || index === topCardIndex + 1}
                move={packOpen && index >= topCardIndex}
              />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
