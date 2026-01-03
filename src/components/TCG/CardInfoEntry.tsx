import { Box, Typography, darken } from "@mui/material";
import { getBackgroundColor } from "./utils";
import { Character } from "common/types";

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
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          backgroundColor: darken(getBackgroundColor(character)[0], 0.3),
          padding: 0.5,
          height: "28px",
          width: width ? `${width}px` : "auto",
        }}
      >
        <Typography sx={{ fontFamily: '"Exo 2", sans-serif', fontSize: 12 }}>
          {text}
        </Typography>
      </Box>
      <Box
        sx={{
          width: 0,
          height: 0,
          borderTop: `28px solid ${darken(
            getBackgroundColor(character)[0],
            0.3
          )}`,
          borderRight: `28px solid transparent`,
        }}
      />
    </Box>
  );
};
