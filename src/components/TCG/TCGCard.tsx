import { Box, darken, lighten, Typography } from "@mui/material";
import { getImgSrc } from "common/quizUtils";
import { Character } from "common/types";
import { useState } from "react";
import { COLORS } from "styling/constants";
import { Star } from "./Star";

type Rarity = "Rare" | "SuperRare" | "UltraRare";
type CardType =
  | "Drama"
  | "Action"
  | "Comedy"
  | "Romance"
  | "Fantasy"
  | "Adventure"
  | "Fighting-Shounen";

interface TCGCardProps {
  character: Character;
  rarity: Rarity;
  visible?: boolean;
  slideOnClick?: boolean;
  inStack?: boolean;
}

export const TCGCard = ({
  character,
  rarity,
  visible,
  slideOnClick = false,
  inStack = false,
}: TCGCardProps) => {
  const [slideOut, setSlideOut] = useState(false);

  const effectsOn = visible;
  const inspectAnimation = inStack && !slideOut;
  const showShimmer = rarity !== "Rare" && effectsOn;
  const showUltraRare = rarity === "UltraRare" && effectsOn;
  console.log(character);

  function handleClick() {
    if (slideOnClick && !slideOut) {
      setSlideOut(true);
    }
  }

  function getBackgroundColor() {
    const charGenres = character.Genre.split(" ");
    const colors: string[] = [];
    if (charGenres.includes("Action")) {
      colors.push(COLORS.cards.bg.action);
    }
    if (charGenres.includes("Comedy")) {
      colors.push(COLORS.cards.bg.comedy);
    }
    if (charGenres.includes("Romance") || charGenres.includes("Romantic")) {
      colors.push(COLORS.cards.bg.romance);
    }
    if (charGenres.includes("Drama")) {
      colors.push(COLORS.cards.bg.drama);
    }
    if (charGenres.includes("Fantasy") || charGenres.includes("Adventure")) {
      colors.push(COLORS.cards.bg.fantasy);
    }
    if (charGenres.includes("Fighting-Shounen")) {
      colors.push(COLORS.cards.bg.drama);
    }
    if (charGenres.includes("Supernatural") || charGenres.includes("Horror")) {
      colors.push(COLORS.cards.bg.drama);
    }

    if (colors.length === 1) {
      colors.push(lighten(colors[0], 0.3));
    }
    return colors;
  }

  return (
    <Box
      onClick={handleClick}
      sx={{
        width: "330px",
        height: "450px",
        borderRadius: "8px",
        borderColor: COLORS.cards.border,
        borderWidth: 4,
        borderStyle: "solid",
        boxShadow: 2,
        backgroundImage: `linear-gradient(230deg,${
          getBackgroundColor()[0]
        } 39%, ${getBackgroundColor()[1]} 100%)`,
        position: "relative",
        animation: slideOut
          ? "slideOut 1s forwards"
          : inspectAnimation
          ? "inspect 5s infinite ease-in-out alternate"
          : undefined,
        pointerEvents: slideOut ? "none" : "auto",
        "@keyframes inspect": {
          from: {
            transform: "rotateY(-20deg) rotateX(10deg)",
          },
          to: {
            transform: "rotateY(20deg) rotateX(-10deg)",
          },
        },
        "@keyframes slideOut": {
          from: {
            transform: "translateX(0px)",
          },
          to: {
            transform: "translateX(-500px)",
            zIndex: -1,
          },
        },
        cursor: slideOnClick ? "pointer" : "default",
        overflow: "hidden",
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
          sx={{
            marginBottom: 2,
            textAlign: "center",
            boxShadow: 1,
            padding: 1,
            borderRadius: 1,
            backgroundColor: COLORS.cards.rare,
            width: "90%",
          }}
        >
          <Typography>{character?.Name}</Typography>
        </Box>
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
          src={getImgSrc(character.id)}
        ></Box>
        <Box sx={{ position: "absolute", right: 55, bottom: 30 }}>
          <Box sx={{ position: "relative" }}>
            {rarity === "UltraRare" && <Star zIndex={10} left="0px" />}
            {(rarity === "SuperRare" || rarity === "UltraRare") && (
              <Star zIndex={20} left="12.5px" />
            )}
            <Star zIndex={30} left="25px" />
          </Box>
        </Box>
      </Box>
      {showUltraRare && (
        <Box
          sx={{
            position: "absolute",
            left: -4,
            top: -4,
            height: "450px",
            width: "330px",
            background: COLORS.cards.ultraRare,
            backgroundSize: "300% 100%",
            backgroundPosition: "0% 0%",
            animation: "shimmer 3s infinite linear alternate",
            "@keyframes shimmer": {
              from: {
                backgroundPosition: "0% 0%",
              },
              to: {
                backgroundPosition: "100% 0%",
              },
            },
          }}
        ></Box>
      )}
      {showShimmer && (
        <Box
          sx={{
            position: "absolute",
            left: -4,
            top: -4,
            height: "450px",
            width: "330px",
            background: COLORS.cards.shimmer,
            backgroundSize: "300%",
            backgroundPositionX: "100%",
            animation: "shimmer 2.5s infinite linear alternate",
            "@keyframes shimmer": {
              from: {
                backgroundPosition: "0% 0%",
              },
              to: {
                backgroundPosition: "100% 0%",
              },
            },
          }}
        ></Box>
      )}
    </Box>
  );
};
