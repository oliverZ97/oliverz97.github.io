import { Box } from "@mui/material";
import { getImgSrc } from "common/quizUtils";
import { Character } from "common/types";
import characterData from "data/character_data.json";
import { useEffect, useState } from "react";
import { COLORS } from "styling/constants";

const TCG = () => {
  const [charData, setCharData] = useState<Character[]>([]);

  useEffect(() => {
    if (charData.length === 0) {
      setCharData([
        ...characterData.sort((a, b) => (a.Name < b.Name ? -1 : 1)),
      ] as Character[]);
    }
  }, [charData, characterData]);

  return (
    <Box sx={{ padding: 4 }}>
      <Box
        sx={{
          width: "330px",
          height: "450px",
          borderRadius: "8px",
          borderColor: COLORS.cards.border,
          borderWidth: 4,
          borderStyle: "solid",
          backgroundImage: COLORS.cards.bgRare,
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginY: 2,
          }}
        >
          <Box
            width={"200px"}
            component={"img"}
            height={"276px"}
            sx={{
              objectFit: "cover",
              border: "1px solid black",
              borderColor: COLORS.cards.border,
              borderRadius: 1,
            }}
            src={getImgSrc(71)}
          ></Box>
        </Box>
        <Box
          sx={{
            position: "absolute",
            left: -4,
            top: -4,
            height: "450px",
            width: "330px",
            background: `linear-gradient(-60deg,rgba(163, 163, 163, 0) 0%, rgba(250, 250, 250, 1) 50%, rgba(163, 163, 163, 0) 100%)`,
            backgroundSize: "300%",
            backgroundPositionX: "100%",
            animation: "shimmer 2s infinite linear",
            "@keyframes shimmer": {
              to: {
                backgroundPositionX: "0%",
              },
            },
          }}
        ></Box>
      </Box>
    </Box>
  );
};

export default TCG;
