import { Box, darken, Typography } from "@mui/material";
import { getImgSrc } from "common/quizUtils";
import { useEffect, useState } from "react";
import { COLORS } from "styling/constants";
import { Star } from "./Star";
import { getBackgroundColor, getCardArt } from "./utils";
import { CardInfoEntry } from "./CardInfoEntry";
import { SharpHolographicFilter } from "./SharpHolographicFilter";
import { RadiantHolographicFilter } from "./RadiantHolographicFilter";
import { GlitterFilter } from "./GlitterFilter";
import { Card } from "./CardStack";

export type Rarity = "Common" | "SuperRare" | "UltraRare" | "SecretRare";

interface TCGCardProps {
  card: Card;
  rarity: Rarity;
  visible?: boolean;
  slideOnClick?: boolean;
  inStack?: boolean;
}

export const TCGCard = ({
  card,
  rarity,
  visible,
  slideOnClick = false,
  inStack = false,
}: TCGCardProps) => {
  const [slideOut, setSlideOut] = useState(false);
  const [fullArtPath, setFullArtPath] = useState("");

  const effectsOn = visible;
  const inspectAnimation = inStack && !slideOut;
  const showShimmer = rarity === "SuperRare" && effectsOn;
  const showUltraRare = rarity === "UltraRare" && effectsOn;
  const showHolographic = rarity === "SecretRare" && effectsOn;
  const showRadiantHolo =
    rarity === "UltraRare" && effectsOn && inspectAnimation;
  const showGlitter =
    (rarity === "UltraRare" || rarity === "SecretRare") && effectsOn;
  const useFullArt = card.art === "full" && fullArtPath !== "";

  function handleClick() {
    if (slideOnClick && !slideOut) {
      setSlideOut(true);
    }
  }

  useEffect(() => {
    getCardArt(card.id, "jpg").then((path) => {
      setFullArtPath(path);
    });
  }, [card.id]);


  return (
    <Box
      onClick={handleClick}
      sx={{
        width: "330px",
        height: "450px",
        borderRadius: "8px",
        borderColor:
          rarity === "SecretRare"
            ? COLORS.cards.secretRareBorder
            : COLORS.cards.border,
        borderWidth: 4,
        borderStyle: "solid",
        boxShadow: 2,
        backgroundImage: useFullArt ? `url(${fullArtPath})` : `linear-gradient(230deg,${getBackgroundColor(card)[0]
          } 29%, ${getBackgroundColor(card)[1]} 100%)`,
        backgroundSize: "cover",
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
            marginBottom: 1,
            textAlign: "center",
            boxShadow: 1,
            padding: 0.8,
            borderRadius: 1,
            background: `linear-gradient(180deg,${darken(
              getBackgroundColor(card)[0],
              0.2
            )} 0%, ${getBackgroundColor(card)[0]} 50%, ${darken(
              getBackgroundColor(card)[0],
              0.2
            )} 100%)`,
            width: "90%",
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Exo 2", sans-serif',
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {card?.Name}
          </Typography>
        </Box>
        <Box sx={{ position: "relative" }}>
          <CardInfoEntry card={card} text={card?.Anime} isFullArt={useFullArt} />
          {card.art === "default" && <Box
            width={"200px"}
            component={"img"}
            height={"276px"}
            sx={{
              objectFit: "cover",
              border: "1px solid black",
              borderColor: COLORS.cards.border,
              borderRadius: 1,
            }}
            src={getImgSrc(card.id)}
          ></Box>}
          <Box
            sx={{
              position: "absolute",
              left: useFullArt ? -110 : -10,
              bottom: useFullArt ? -340 : -5,
              background:
                "linear-gradient(180deg,rgba(224, 224, 224, 1) 34%, rgba(224, 224, 224, 1) 0%, rgba(250, 250, 250, 1) 49%, rgba(199, 199, 199, 1) 71%)",
              width: "220px",
              borderRadius: 15,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingX: 1,
              paddingY: 0.1,
              boxShadow: 1,
              gap: 1,
            }}
          >
            <Typography
              sx={{ fontFamily: '"Exo 2", sans-serif', fontSize: 10 }}
            >{`DOB: ${card?.Birthday ?? "???"}`}</Typography>
            <Typography
              sx={{ fontFamily: '"Exo 2", sans-serif', fontSize: 10 }}
            >{`HT: ${card?.Height ?? "???"}`}</Typography>
          </Box>
        </Box>
        <Box sx={{ position: "absolute", left: 17, bottom: -4 }}>
          {rarity !== "Common" && <Star zIndex={30} />}
          {useFullArt && rarity === "Common" && <Star zIndex={30} art="full" />}
          {(rarity === "SecretRare" || rarity === "UltraRare") && <Star art={useFullArt ? "full" : "default"} zIndex={30} />}
          {rarity === "SecretRare" && <Star zIndex={30} art={useFullArt ? "full" : "default"} />}
        </Box>
        <Box sx={{ position: "absolute", left: 2, bottom: 0 }}>
          <Typography sx={{ fontFamily: '"Exo 2", sans-serif', fontSize: 8 }}>{card.id}</Typography>
        </Box>
      </Box>
      {
        showUltraRare && (
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
        )
      }
      {
        showShimmer && (
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
        )
      }
      {/* Holographic filter overlay */}
      <SharpHolographicFilter
        width="330px"
        height="450px"
        intensity={1}
        enabled={showHolographic}
        animating={inspectAnimation}
      />
      <RadiantHolographicFilter
        width="330px"
        height="450px"
        intensity={0.7}
        enabled={showRadiantHolo}
        animating={inspectAnimation}
      />
      <GlitterFilter
        width="330px"
        height="450px"
        intensity={0.7}
        enabled={showGlitter}
        animating={inspectAnimation}
      />
    </Box >
  );
};
