import { Box } from "@mui/material";
import { Card, Collection as CollectionType } from "common/types";
import { useEffect, useState } from "react";
import { COLORS } from "styling/constants";
import bg from "assets/bg.jpg";
import { getUserCollection } from "common/profileUtils";
import { TCGCard } from "components/TCG/TCGCard";


const Collection = () => {
  const [collection, setCollection] = useState<CollectionType | null>(null);
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    if (collection === null) {
      let collectionData = getUserCollection();
      if (collectionData === null) {
        setCollection(null)
      } else {
        setCollection(collectionData);
        console.log(collectionData.cards);

        //remove duplicates based on cardId
        let filteredArr: Card[] = collectionData.cards.filter((card, index, self) =>
          index === self.findIndex((c) => c.cardId === card.cardId)
        );
        console.log("Filtered Arr:", filteredArr);

        filteredArr.sort((a, b) => {
          // Sort by rarity (Secret Rare > Ultra Rare > Super Rare > Rare > Common)
          const rarityOrder = ["Common", "Rare", "SuperRare", "UltraRare", "SecretRare"];
          let rarityComparison = rarityOrder.indexOf(b.rarity) - rarityOrder.indexOf(a.rarity);
          // then by anime title alphabetically
          if (rarityComparison === 0) {
            rarityComparison = a.character.Anime.localeCompare(b.character.Anime);
          }
          // then by name alphabetically
          if (rarityComparison === 0) {
            return a.character.Name.localeCompare(b.character.Name);
          } else {
            return rarityComparison;
          }
        });
        setCards(filteredArr);
      }
    }
  }, [collection]);

  return (
    <Box
      sx={{
        backgroundColor: COLORS.quiz.background,
        background: `url(${bg})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        maxWidth: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 4,
      }}
    >
      <Box sx={{ paddingTop: 4, display: "flex", flexWrap: "wrap", gap: 2, width: "90%" }}>
        {cards.map((card) => (
          <TCGCard key={card.cardId} card={card} visible size="small" />
        ))}
      </Box>
    </Box>
  );
};

export default Collection;
