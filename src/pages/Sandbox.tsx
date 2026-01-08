import { Box, FormControlLabel, FormGroup, MenuItem, Select, Slider, Switch } from "@mui/material";
import { Art, Rarities, Rarity, TCGCard } from "components/TCG/TCGCard";
import { useEffect, useState } from "react";
import characterData from "data/character_data.json";
import { Card, Character } from "common/types";
import { generateCardId } from "components/TCG/utils";

const Sandbox = () => {
  const [charData, setCharData] = useState<Character[]>([]);

  const [card, setCard] = useState<Card | null>(null);
  const [rarity, setRarity] = useState<Rarity>("Common");
  const [art, setArt] = useState<Art>("default");
  const [characterId, setCharacterId] = useState<number>(97);
  const [effectsEnabled, setEffectsEnabled] = useState<boolean>(true);
  const [inspectEnabled, setInspectEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (charData.length === 0) {
      setCharData([
        ...characterData.sort((a, b) => (a.Name < b.Name ? -1 : 1)),
      ] as Character[]);
    }
  }, [charData, characterData]);

  useEffect(() => {
    if (charData.length > 0) {
      const character =
        charData.find((char) => char.id === characterId) ?? charData[0];
      let card: Card = {
        cardId: generateCardId(characterId, rarity, art), //combination of characterId + rarity + art
        characterId: characterId, //id of the character
        character,
        rarity,
        art,
        obtainedAt: new Date().toISOString(),
        packname: "sandbox pack",
      };
      setCard(card);
    }
  }, [charData, rarity, art, characterId]);

  return (
    <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#222" }}>
      <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
        {card && <TCGCard card={card} size="large" showRarityAnimation={effectsEnabled} showInspectAnimation={inspectEnabled} />}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Select value={rarity} onChange={(e) => setRarity(e.target.value as Rarity)} sx={{ color: "white" }}>
            {Rarities.map(
              (rarityOption) => (
                <MenuItem
                  key={rarityOption}
                  value={rarityOption}
                >
                  {rarityOption}
                </MenuItem>
              )
            )}
          </Select>
          <Select value={art} onChange={(e) => setArt(e.target.value as Art)} sx={{ color: "white" }}>
            {(["default", "full"] as Art[]).map(
              (artOption) => (
                <MenuItem

                  key={artOption}
                  value={artOption}
                >
                  {artOption}
                </MenuItem>
              )
            )}
          </Select>
          <Select
            sx={{ color: "white" }}
            value={characterId}
            onChange={(e) => setCharacterId(Number(e.target.value))}
          >
            {charData.map((char) => (
              <MenuItem key={char.id} value={char.id}>
                {char.Name}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box>
          <FormGroup>
            <FormControlLabel sx={{ color: "white" }} control={<Switch defaultChecked={effectsEnabled} onChange={(e) => setEffectsEnabled(e.target.checked)} />} label="Effects" />
            <FormControlLabel sx={{ color: "white" }} control={<Switch defaultChecked={inspectEnabled} onChange={(e) => setInspectEnabled(e.target.checked)} />} label="Inspect" />
          </FormGroup>
        </Box>
      </Box>
    </Box>
  );
};

export default Sandbox;