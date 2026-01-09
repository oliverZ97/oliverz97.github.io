import { Box, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Anime, Card, Character, Collection as CollectionType, Pack } from "common/types";
import { useEffect, useState } from "react";
import { COLORS } from "styling/constants";
import bg from "assets/bg.jpg";
import { getUserCollection } from "common/profileUtils";
import { TCGCard } from "components/TCG/TCGCard";
import characterData from "data/character_data.json";
import { createAnimeListFromCharData } from "common/utils";
import ClearIcon from '@mui/icons-material/Clear';
import tcg_packs from "data/tcg_packs.json";

const Collection = () => {
  const [collection, setCollection] = useState<CollectionType | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [search, setSearch] = useState<string>("");
  const [animeFilter, setAnimeFilter] = useState<number | null>(null);
  const [packFilter, setPackFilter] = useState<number | null>(null);
  const [charData, setCharData] = useState<Character[]>([]);
  const [packs, setPacks] = useState(tcg_packs as Record<string, Pack>);
  const [animeData, setAnimeData] = useState<Anime[]>([]);

  useEffect(() => {
    setPacks(tcg_packs as Record<string, Pack>);
  }, [tcg_packs]);

  useEffect(() => {
    if (charData.length === 0) {
      setCharData([
        ...characterData.sort((a, b) => (a.Name < b.Name ? -1 : 1)),
      ] as Character[]);
    }
    if (charData && animeData.length === 0) {
      const localAnimeData = createAnimeListFromCharData(charData)

      setAnimeData(
        localAnimeData.sort((a, b) => (a.Name < b.Name ? -1 : 1)) as Anime[]
      );
    }
  }, [charData, characterData, animeData]);

  useEffect(() => {
    if (collection === null) {
      let collectionData = getUserCollection();
      if (collectionData === null) {
        setCollection(null)
      } else {
        setCollection(collectionData);

        let filteredArr = filterCards(collectionData);
        setCards(filteredArr);
      }
    } else {
      let filteredArr = filterCards(collection);
      setCards(filteredArr);
    }
  }, [collection, search, animeFilter, packFilter]);

  function filterCards(collectionData: CollectionType) {

    //remove duplicates based on cardId
    let filteredArr: Card[] = collectionData.cards.filter((card, index, self) =>
      index === self.findIndex((c) => c.cardId === card.cardId)
    );

    if (animeFilter) {
      filteredArr = filteredArr.filter((card) => {
        return card.character.Anime_Id === animeFilter
      })
    }

    if (packFilter) {
      filteredArr = filteredArr.filter((card) => {
        return card.packId === packFilter
      })
    }

    if (search.length >= 3) {
      filteredArr = filteredArr.filter((card) => {
        const searchLower = search.toLowerCase();
        return (
          card.character.Name.toLowerCase().includes(searchLower) ||
          card.character.Anime.toLowerCase().includes(searchLower)
        );
      });
    }

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

    return filteredArr;

  }


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
        paddingBottom: 4,
        position: "relative"
      }}
    >
      <Box sx={{ position: "absolute", width: "95%", height: "100%", backgroundColor: "white", opacity: 0.3, backdropFilter: "blur(2px)" }} />
      <Box sx={{ position: "sticky", top: 0, zIndex: 1000, width: "100%", height: "80px", backgroundColor: COLORS.quiz.background, display: "flex", alignItems: "center", paddingX: 2, gap: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search By Name or Anime"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          inputProps={{
            style: {
              color: "white"
            }
          }}
          sx={{ width: "300px", "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "white" }, "&:hover fieldset": { borderColor: "white" }, "&.Mui-focused fieldset": { borderColor: "white" } } }}
        />
        <FormControl>
          <InputLabel sx={{ color: "white" }}>Anime</InputLabel>
          <Select
            displayEmpty
            value={animeFilter}
            onChange={(event) => setAnimeFilter(event.target.value as number)}
            endAdornment={<IconButton onClick={() => setAnimeFilter(null)}><ClearIcon /></IconButton>}
            sx={{
              width: "300px",
              color: "white",
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '.MuiSvgIcon-root ': {
                fill: "white !important",
                "&.MuiSelect-icon": {
                  marginRight: "32px",
                  display: "none"
                },

              },
              ".MuiIconButton-root": {
                margin: 0,
                padding: 0
              }
            }}>
            {animeData.map((anime) => (<MenuItem key={anime.id} value={anime.id}>{anime.Name}</MenuItem>))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel sx={{ color: "white" }}>Booster</InputLabel>
          <Select
            displayEmpty
            value={packFilter}
            onChange={(event) => setPackFilter(event.target.value as number)}
            endAdornment={<IconButton onClick={() => setPackFilter(null)}><ClearIcon /></IconButton>}
            sx={{
              width: "300px",
              color: "white",
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '.MuiSvgIcon-root ': {
                fill: "white !important",
                "&.MuiSelect-icon": {
                  marginRight: "32px",
                  display: "none"
                },

              },
              ".MuiIconButton-root": {
                margin: 0,
                padding: 0
              }
            }}>
            {Object.values(packs).map((pack) => (<MenuItem key={pack.id} value={pack.id}>{pack.packname}</MenuItem>))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ paddingTop: 4, display: "flex", flexWrap: "wrap", gap: 2, width: "90%" }}>
        {cards.map((card, index) => (
          <>
            {index > 0 && cards[index - 1].rarity !== card.rarity && (
              <Box key={card.rarity} sx={{ width: "100%", borderBottom: `2px solid white`, marginY: 2 }} />
            )}
            <TCGCard key={card.cardId} card={card} visible size="small" />
          </>
        ))}
      </Box>
    </Box>
  );
};

export default Collection;
