import { Theme } from "@emotion/react";
import { Box, Button, SxProps, Typography, useTheme } from "@mui/material";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { COLORS } from "styling/constants";

interface RevealCardProps {
  disabled?: boolean;
  cardText: string;
  cardTitle: string;
  costs?: number;
  onReveal?: () => void;
  sx?: SxProps<Theme>;
}

export const RevealCard = forwardRef(
  (
    { cardText, cardTitle, costs, onReveal, disabled, sx }: RevealCardProps,
    ref
  ) => {
    const [revealHint, setRevealHint] = useState(false);

    const resetHint = () => {
      setRevealHint(false);
    };

    useEffect(() => {
      if (revealHint && onReveal) {
        onReveal();
      }
    }, [revealHint]);

    useImperativeHandle(ref, () => ({
      resetHint: resetHint,
    }));

    function listTagList(tagList: string) {
      const tags = tagList.split(";");
      if (tags.length > 1) {
        return tags
          .filter((tag) => tag !== "-")
          .map((tag, index) => (
            <Typography
              key={index}
              sx={{
                color: COLORS.quiz.primary_text,
                textTransform: "capitalize",
              }}
              fontSize={"13px"}
            >
              {tag}
            </Typography>
          ));
      } else {
        return (
          <Typography
            sx={{
              color: COLORS.quiz.primary_text,
              textTransform: "capitalize",
            }}
          >
            {tagList}
          </Typography>
        );
      }
    }

    return (
      <Button
        sx={{
          position: "relative",
          cursor: "pointer",
          width: "100%",
          minHeight: "58px",
          padding: 0,
          borderRadius: "9px",
          border: `2px solid ${
            disabled ? COLORS.quiz.disabled_border : COLORS.quiz.light
          }`,
          ...sx,
        }}
        onClick={() => setRevealHint(true)}
        disabled={disabled}
      >
        <Box
          sx={{
            padding: 2,
            backgroundColor: disabled ? COLORS.quiz.disabled : COLORS.quiz.main,
            borderRadius: "8px",
            width: "100%",
            minHeight: "58px",
            height: "100%",
          }}
        >
          {listTagList(cardText)}
        </Box>
        <Box
          sx={{
            width: "100%",
            position: "absolute",
            zIndex: 2,
            height: "100%",
            borderRadius: "8px",
            top: 0,
            background: revealHint
              ? "rgba(255, 255, 255, 0.0)"
              : disabled
              ? COLORS.quiz.disabled
              : COLORS.quiz.main_rgba,
            "@keyframes removeBlur": {
              "0%": {
                background: COLORS.quiz.main_rgba,
              },
              "100%": {
                background: "rgba(255, 255, 255, 0.0)",
              },
            },
            animation: revealHint ? `removeBlur 1000ms ease-in-out` : undefined,
          }}
        ></Box>
        <Box
          sx={{
            width: "100%",
            padding: 2,
            position: "absolute",
            top: 0,
            borderRadius: "8px",
            zIndex: 3,
            opacity: revealHint ? 0 : 1,
            display: "flex",
            justifyContent: "space-between",
            height: "100%",
            alignItems: "center",

            "@keyframes hideTitle": {
              "0%": {
                opacity: 1,
              },
              "100%": {
                opacity: 0,
              },
            },
            animation: revealHint ? `hideTitle 1000ms ease-in-out` : undefined,
          }}
        >
          <Typography sx={{ textTransform: "capitalize", color: "black" }}>
            {cardTitle}
          </Typography>
          {costs && (
            <Box
              sx={{
                padding: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#12616e",
                borderRadius: "4px",
              }}
            >
              <Typography sx={{ color: COLORS.quiz.primary_text }}>
                {costs}
              </Typography>
            </Box>
          )}
        </Box>
      </Button>
    );
  }
);
