import { Box, Typography, darken } from "@mui/material";
import { getBackgroundColor } from "./utils";
import { Character } from "common/types";
import { COLORS } from "styling/constants";

interface CardInfoEntryProps {
  character: Character;
  text: string;
  width?: number;
}

export const CardInfoEntry = ({
  character,
  text,
  width,
}: CardInfoEntryProps) => {
  return (
    <Box sx={{ display: "flex", position: "absolute", top: 0, left: -45 }}>
      <Box
        sx={{
          borderTopRightRadius: "14px",
          borderBottomRightRadius: "14px",
          display: "flex",
          alignItems: "center",
          transform: "rotate(90deg)",
          height: "30px",
          width: "30px",
          wordWrap: "none",
          whiteSpace: "nowrap",
        }}
      >
        <Typography sx={{
          fontFamily: '"Exo 2", sans-serif',
          fontSize: 18,
          color: darken(getBackgroundColor(character)[0], 0.3),
          textShadow: `2px 3px 2px ${COLORS.cards.shadow}`,
        }}>
          {text}
        </Typography>
      </Box>
      {/* <Box
        sx={{
          width: 0,
          height: 0,
          borderTop: `28px solid ${darken(
            getBackgroundColor(character)[0],
            0.3
          )}`,
          borderRight: `28px solid transparent`,
        }}
      /> */}
    </Box >
  );
};
