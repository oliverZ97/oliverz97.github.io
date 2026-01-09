import { Box, Typography } from "@mui/material";
import { Character, Pack } from "common/types";
import characterData from "data/character_data.json";
import bg from "assets/bg.jpg";
import { useEffect, useState } from "react";
import { COLORS } from "styling/constants";
import { getUserAvailableCredits } from "common/profileUtils";
import { ShopEntry } from "components/TCG/ShopEntry";
import tcg_packs from "data/tcg_packs.json";

const TCG = () => {
  const [charData, setCharData] = useState<Character[]>([]);
  const [packs, setPacks] = useState(tcg_packs as Record<string, Pack>);
  const [userAvailableCredits, setUserAvailableCredits] = useState(
    getUserAvailableCredits()
  );

  console.log(packs);

  useEffect(() => {
    setPacks(tcg_packs as Record<string, Pack>);
  }, [tcg_packs]);

  function updateCredits() {
    setUserAvailableCredits(getUserAvailableCredits());
  }

  useEffect(() => {
    if (charData.length === 0) {
      setCharData([
        ...characterData.sort((a, b) => (a.Name < b.Name ? -1 : 1)),
      ] as Character[]);
    }
  }, [charData, characterData]);

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
        padding: 4,
      }}
    >
      <Box sx={{ backgroundColor: COLORS.quiz.main }}>
        <Box
          padding={2}
          sx={{
            color: "white",
            display: "flex",
            gap: 0.5,
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <Typography>🪙</Typography>
          <Typography>{userAvailableCredits}</Typography>
        </Box>
        {charData.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              padding: 4, // Move padding here
              justifyContent: "center",
              alignItems: "flex-start",
              minHeight: "700px",
            }}
          >
            {Object.values(packs).map((pack) => (
              <ShopEntry
                cardAmount={6}
                charData={charData}
                price={pack.price}
                credits={userAvailableCredits}
                pack={pack}
                key={pack.id}
                updateCredits={updateCredits}
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TCG;
