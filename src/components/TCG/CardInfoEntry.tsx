import { Box, Typography, darken } from "@mui/material";
import { getBackgroundColor } from "./utils";
import { Character } from "common/types";
import { COLORS } from "styling/constants";
import { Card } from "./CardStack";

interface CardInfoEntryProps {
  card: Card;
  text: string;
  isFullArt?: boolean;
}

export const CardInfoEntry = ({ card, text, isFullArt }: CardInfoEntryProps) => {
  // Estimate if text will wrap to multiple lines (roughly 15 characters per line at font size 18)
  const isLongText = text.length > 35;

  return (
    <Box sx={{ display: "flex", position: "absolute", top: 125, left: isFullArt ? -250 : -160 }}>
      <Box
        sx={{
          borderRadius: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "rotate(90deg)",
          height: "50px",
          maxWidth: "270px",
          minWidth: "270px",
          width: "270px",
          paddingY: 0.5,
          paddingX: 2,
        }}
      >
        {isFullArt && <Box sx={{
          background: `linear-gradient(90deg,${darken(
            COLORS.cards.rare,
            0.3
          )} 0%, ${COLORS.cards.rare} 50%, ${darken(
            COLORS.cards.rare,
            0.3
          )} 100%)`,
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "14px",
          zIndex: -1,
          opacity: 0.8,

        }} />}

        <Typography
          sx={{
            fontFamily: '"Exo 2", sans-serif',
            fontSize: isLongText ? 14 : 18,
            color: darken(getBackgroundColor(card)[0], 0.3),
            whiteSpace: isLongText ? "normal" : "nowrap",
            wordBreak: isLongText ? "break-word" : "normal",
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          {text}
        </Typography>
      </Box>
    </Box>
  );
};
