import { Box, Typography } from "@mui/material";
import { Character } from "common/types";
import characterData from "data/character_data.json";
import bg from "assets/bg.jpg";
import { useEffect, useState } from "react";
import { COLORS } from "styling/constants";
import { getUserAvailableCredits } from "common/profileUtils";
import { ShopEntry } from "components/TCG/ShopEntry";

const TCG = () => {
  const [charData, setCharData] = useState<Character[]>([]);
  const [userAvailableCredits, setUserAvailableCredits] = useState(
    getUserAvailableCredits()
  );

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
            <ShopEntry
              cardAmount={6}
              charData={charData}
              price={75}
              credits={userAvailableCredits}
              packname="Maiden's Fortune"
              updateCredits={updateCredits}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TCG;
