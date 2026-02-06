import { Box, Typography, darken } from "@mui/material";
import { getBackgroundColor } from "./utils";
import { Card, Character } from "common/types";
import { COLORS } from "styling/constants";
import { CARD_INFO_ENTRY_BASE } from "./constants";

interface CardInfoEntryProps {
  card: Card;
  text: string;
  isFullArt?: boolean;
  size?: number; // Scale factor (1 for large, 2/3 for small)
}

export const CardInfoEntry = ({ card, text, isFullArt, size = 1 }: CardInfoEntryProps) => {
  // Estimate if text will wrap to multiple lines (roughly 15 characters per line at font size 18)
  const isLongText = text.length > CARD_INFO_ENTRY_BASE.LONG_TEXT_THRESHOLD;

  const top = CARD_INFO_ENTRY_BASE.TOP * size;
  const left = isFullArt ? CARD_INFO_ENTRY_BASE.LEFT_FULL_ART * size : CARD_INFO_ENTRY_BASE.LEFT_DEFAULT * size;
  const borderRadius = `${CARD_INFO_ENTRY_BASE.BORDER_RADIUS * size}px`;
  const height = `${CARD_INFO_ENTRY_BASE.HEIGHT * size}px`;
  const width = `${CARD_INFO_ENTRY_BASE.WIDTH * size}px`;
  const paddingY = (CARD_INFO_ENTRY_BASE.PADDING_Y * size) / 8;
  const paddingX = (CARD_INFO_ENTRY_BASE.PADDING_X * size) / 8;
  const fontSize = (isLongText ? CARD_INFO_ENTRY_BASE.FONT_SIZE_LONG : CARD_INFO_ENTRY_BASE.FONT_SIZE_NORMAL) * size;

  return (
    <Box sx={{ display: "flex", position: "absolute", top: top, left: left }}>
      <Box
        sx={{
          borderRadius: borderRadius,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "rotate(90deg)",
          height: height,
          maxWidth: width,
          minWidth: width,
          width: width,
          paddingY: paddingY,
          paddingX: paddingX,
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
          minWidth: "100%",
          height: "100%",
          borderRadius: borderRadius,
          zIndex: -1,
          opacity: 0.8,

        }} />}

        <Typography
          sx={{
            fontFamily: '"Exo 2", sans-serif',
            fontSize: fontSize,
            color: darken(getBackgroundColor(card.character)[0], 0.3),
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
