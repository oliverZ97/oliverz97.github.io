import { Box } from "@mui/material";
import { Rarity, TCGCard } from "./TCGCard";
import { Character, Card, Pack, defaultPackConfig } from "common/types";
import { useEffect, useState } from "react";
import {
  applyCardToCollection,
  filterCharsByPack,
  generateCardId,
  getCardArt,
  getCardArtSync,
} from "./utils";
import { BoosterPackage } from "./BoosterPackage";

interface CardStackProps {
  charData: Character[];
  amount: number;
  pack: Pack;
  openable?: boolean;
  purchased?: boolean;
  onPackEmpty?: () => void;
}

export const CardStack = ({
  amount,
  charData,
  openable,
  purchased,
  pack,
  onPackEmpty,
}: CardStackProps) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [topCardIndex, setTopCardIndex] = useState<number>(0);
  const [packOpen, setPackOpen] = useState<boolean>(false);
  const [localCharData, setLocalCharData] = useState<Character[]>(charData);
  const {
    secretRarePossibilty,
    additionalSuperRare,
    ultraRarePossibility,
    godPackPossibility,
    mainCastChance,
    secretRareOnly,
    ultraRareOnly,
  } = pack.config || defaultPackConfig;
  const wiggleAnimation = purchased && !packOpen;

  useEffect(() => {
    setLocalCharData(filterCharsByPack(charData, pack));
  }, [charData, pack]);

  useEffect(() => {
    if (cards.length === 0 && openable) {
      void fillBooster();
    }
  }, [charData, localCharData, amount, openable]);

  async function fillBooster() {
    const hasSecretRare = Math.random() <= secretRarePossibilty;
    const hasAdditionalSuperRare = Math.random() <= additionalSuperRare;
    const hasUltraRare = Math.random() <= ultraRarePossibility;
    const isGodPack = Math.random() <= godPackPossibility;
    let guaranteedInPack = false;

    const booster: Card[] = [];
    for (let i = 0; i < amount; i++) {
      let boosterCharData = charData;
      let isFromMainAnime =
        Math.random() < mainCastChance ||
        (i === amount - 1 && !guaranteedInPack);
      let randomIndex;
      if (isFromMainAnime) {
        guaranteedInPack = true;
        boosterCharData = localCharData;
        randomIndex = Math.floor(Math.random() * boosterCharData.length);
      } else {
        randomIndex = Math.floor(Math.random() * charData.length);
      }

      let isFullArt = Math.random() < 0.25;
      let path = await getCardArt(boosterCharData[randomIndex].id);
      if (path === "") {
        isFullArt = false;
      }
      let rarity = getCardRarity(
        i,
        isGodPack,
        hasSecretRare,
        hasAdditionalSuperRare,
        hasUltraRare,
        ultraRareOnly,
        secretRareOnly
      );
      let card: Card = {
        character: boosterCharData[randomIndex],
        characterId: boosterCharData[randomIndex].id,
        cardId: generateCardId(
          boosterCharData[randomIndex].id,
          rarity,
          isFullArt ? "full" : "default"
        ),
        obtainedAt: new Date().toISOString(),
        rarity: rarity,
        art: isFullArt ? "full" : "default",
        packId: pack.id,
      };
      booster.push(card);
    }
    setCards(booster);
  }

  function handleCardClick(index: number) {
    if (index === topCardIndex) {
      // Add to collection
      applyCardToCollection(cards[topCardIndex]);
      // Wait for slide animation to complete before revealing next card
      setTimeout(() => {
        if (topCardIndex < cards.length - 1) {
          setTopCardIndex(topCardIndex + 1);
        } else {
          if (onPackEmpty) {
            onPackEmpty();
          }
        }
      }, 1000);
    }
  }
  function getCardRarity(
    i: number,
    isGodPack: boolean,
    hasSecretRare: boolean,
    hasAdditionalSuperRare: boolean,
    hasUltraRare: boolean,
    ultraRareOnly?: boolean,
    secretRareOnly?: boolean
  ): Rarity {
    let rarity: Rarity = "Common";

    if (isGodPack) {
      if (ultraRareOnly) {
        return "UltraRare";
      }
      if (secretRareOnly) {
        return "SecretRare";
      }
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
    <Box
      sx={{
        position: "relative",
        width: "330px", // Explicit width matching card size
        height: "550px",
        pointerEvents: !openable ? "none" : "auto",
        zIndex: 300,
        animation: wiggleAnimation ? "wiggle infinite 2s linear" : "none",
        "@keyframes wiggle": {
          "0%": {
            transform: " rotateZ(0deg)",
          },
          "65%": {
            transform: " rotateZ(0deg)",
          },
          "70%": {
            transform: " rotateZ(2deg)",
          },
          "80%": {
            transform: " rotateZ(-2deg)",
          },
          "85%": {
            transform: " rotateZ(5deg)",
          },
          "90%": {
            transform: " rotateZ(-5deg)",
          },
          "95%": {
            transform: " rotateZ(2deg)",
          },
          "100%": {
            transform: " rotateZ(0deg)",
          },
        },
      }}
    >
      <BoosterPackage
        zIndex={10}
        onOpenPack={() => setPackOpen}
        openable={openable}
        showPointer={purchased}
        coverPath={getCardArtSync(pack.coverId)}
      />

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
        );
      })}
    </Box>
  );
};
