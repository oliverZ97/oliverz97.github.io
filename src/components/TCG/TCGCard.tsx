import { Box, darken, Typography } from "@mui/material";
import { getImgSrc } from "common/quizUtils";
import { useEffect, useState } from "react";
import { COLORS } from "styling/constants";
import { TCG_CARD_BASE } from "./constants";
import { Star } from "./Star";
import { getBackgroundColor, getCardArt } from "./utils";
import { CardInfoEntry } from "./CardInfoEntry";
import { SharpHolographicFilter } from "./SharpHolographicFilter";
import { RadiantHolographicFilter } from "./RadiantHolographicFilter";
import { GlitterFilter } from "./GlitterFilter";
import { Card } from "common/types";

export const Rarities = ["Common", "SuperRare", "UltraRare", "SecretRare"] as const;
export type Rarity = (typeof Rarities)[number]
export type Art = "default" | "full";

interface TCGCardProps {
  card: Card;
  visible?: boolean;
  slideOnClick?: boolean;
  move?: boolean;
  size?: "small" | "large";
  showRarityAnimation?: boolean;
  showInspectAnimation?: boolean;
}

export const TCGCard = ({
  card,
  visible,
  slideOnClick = false,
  move: inStack = false,
  size = "large",
  showRarityAnimation = true,
  showInspectAnimation = false,
}: TCGCardProps) => {
  const [slideOut, setSlideOut] = useState(false);
  const [fullArtPath, setFullArtPath] = useState("");

  const effectsOn = visible || showRarityAnimation;
  const inspectAnimation = (inStack && !slideOut) || showInspectAnimation;
  const showShimmer = card.rarity === "SuperRare" && effectsOn;
  const showUltraRare = card.rarity === "UltraRare" && effectsOn;
  const showHolographic = card.rarity === "SecretRare" && effectsOn;
  const showRadiantHolo = card.rarity === "UltraRare" && effectsOn;
  const showGlitter =
    (card.rarity === "UltraRare" || card.rarity === "SecretRare") && effectsOn;
  const useFullArt = card.art === "full" && fullArtPath !== "";

  const backgroundColors = getBackgroundColor(card.character);

  // Base size is "large", small is 2/3 of large
  const scaleFactor = size === "small" ? 2 / 3 : 1;

  const width = `${TCG_CARD_BASE.WIDTH * scaleFactor}px`;
  const height = `${TCG_CARD_BASE.HEIGHT * scaleFactor}px`;
  const borderRadius = `${TCG_CARD_BASE.BORDER_RADIUS * scaleFactor}px`;
  const borderWidth = TCG_CARD_BASE.BORDER_WIDTH * scaleFactor;
  const marginY = (TCG_CARD_BASE.MARGIN_Y * scaleFactor) / 8;
  const marginBottom = (TCG_CARD_BASE.MARGIN_BOTTOM * scaleFactor) / 8;
  const padding = (TCG_CARD_BASE.PADDING * scaleFactor) / 8;
  const fontSize = TCG_CARD_BASE.FONT_SIZE * scaleFactor;
  const imageWidth = `${TCG_CARD_BASE.IMAGE_WIDTH * scaleFactor}px`;
  const imageHeight = `${TCG_CARD_BASE.IMAGE_HEIGHT * scaleFactor}px`;
  const infoLeft = TCG_CARD_BASE.INFO_LEFT * scaleFactor;
  const infoBottom = TCG_CARD_BASE.INFO_BOTTOM * scaleFactor;
  const fullArtInfoLeft = TCG_CARD_BASE.INFO_FULL_ART_LEFT * scaleFactor;
  const fullArtInfoBottom = TCG_CARD_BASE.INFO_FULL_ART_BOTTOM * scaleFactor;
  const infoWidth = `${TCG_CARD_BASE.INFO_WIDTH * scaleFactor}px`;
  const infoBorderRadius = TCG_CARD_BASE.INFO_BORDER_RADIUS * scaleFactor;
  const infoPaddingX = (TCG_CARD_BASE.INFO_PADDING_X * scaleFactor) / 8;
  const infoPaddingY = (TCG_CARD_BASE.INFO_PADDING_Y * scaleFactor) / 8;
  const infoFontSize = TCG_CARD_BASE.INFO_FONT_SIZE * scaleFactor;
  const starLeft = TCG_CARD_BASE.STAR_LEFT * scaleFactor;
  const starBottom = size === "small" ? -5.5 : -4.5; // Different values for small and large
  const idLeft = TCG_CARD_BASE.ID_LEFT * scaleFactor;
  const idBottom = TCG_CARD_BASE.ID_BOTTOM * scaleFactor;
  const idFontSize = TCG_CARD_BASE.ID_FONT_SIZE * scaleFactor;
  const slideOutDistance = TCG_CARD_BASE.SLIDE_OUT_DISTANCE * scaleFactor;

  function handleClick() {
    if (slideOnClick && !slideOut) {
      setSlideOut(true);
    }
  }

  useEffect(() => {
    getCardArt(card.characterId).then((path) => {
      setFullArtPath(path);
    });
  }, [card.characterId]);

  return (
    <Box
      onClick={handleClick}
      sx={{
        width: width,
        height: height,
        borderRadius: borderRadius,
        borderColor:
          card.rarity === "SecretRare"
            ? COLORS.cards.secretRareBorder
            : COLORS.cards.border,
        borderWidth: borderWidth,
        borderStyle: "solid",
        boxShadow: 2,
        backgroundImage: useFullArt
          ? `url(${fullArtPath})`
          : `linear-gradient(230deg,${backgroundColors[0]} 29%, ${backgroundColors[1]} 100%)`,
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
            transform: `translateX(${slideOutDistance}px)`,
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
          marginY: marginY,
        }}
      >
        <Box
          sx={{
            marginBottom: marginBottom,
            textAlign: "center",
            boxShadow: 1,
            borderRadius: 1,
            width: "90%",
            height: "40px",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              background: `linear-gradient(180deg,${darken(
                backgroundColors[0],
                0.2
              )} 0%, ${backgroundColors[0]} 50%, ${darken(
                backgroundColors[0],
                0.2
              )} 100%)`,
              opacity: useFullArt ? 0.5 : 1,
              borderRadius: 1,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              padding: padding,
              backgroundColor: "transparent",
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Exo 2", sans-serif',
                fontSize: fontSize,
                fontWeight: "bold",
              }}
            >
              {card?.character.Name}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ position: "relative" }}>
          <CardInfoEntry
            card={card}
            text={card?.character.Anime}
            isFullArt={useFullArt}
            size={scaleFactor}
          />
          {card.art === "default" && (
            <Box
              width={imageWidth}
              component={"img"}
              height={imageHeight}
              sx={{
                objectFit: "cover",
                border: "1px solid black",
                borderColor: COLORS.cards.border,
                borderRadius: 1,
              }}
              src={getImgSrc(card.characterId)}
            ></Box>
          )}
          <Box
            sx={{
              position: "absolute",
              left: useFullArt ? fullArtInfoLeft : infoLeft,
              bottom: useFullArt ? fullArtInfoBottom : infoBottom,
              background:
                "linear-gradient(180deg,rgba(224, 224, 224, 1) 34%, rgba(224, 224, 224, 1) 0%, rgba(250, 250, 250, 1) 49%, rgba(199, 199, 199, 1) 71%)",
              width: infoWidth,
              borderRadius: infoBorderRadius,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingX: infoPaddingX,
              paddingY: infoPaddingY,
              boxShadow: 1,
              gap: 1,
            }}
          >
            <Typography
              sx={{ fontFamily: '"Exo 2", sans-serif', fontSize: infoFontSize }}
            >{`DOB: ${card?.character.Birthday ?? "???"}`}</Typography>
            <Typography
              sx={{ fontFamily: '"Exo 2", sans-serif', fontSize: infoFontSize }}
            >{`HT: ${card?.character.Height ?? "???"}`}</Typography>
          </Box>
        </Box>
        <Box >
          <Box sx={{ position: "absolute", left: starLeft, bottom: starBottom, zIndex: 20 }}>
            {card.rarity !== "Common" && <Star zIndex={30} size={scaleFactor} />}
            {useFullArt && card.rarity === "Common" && (
              <Star zIndex={30} art="full" size={scaleFactor} />
            )}
            {(card.rarity === "SecretRare" || card.rarity === "UltraRare") && (
              <Star
                art={useFullArt ? "full" : "default"}
                zIndex={30}
                size={scaleFactor}
              />
            )}
            {card.rarity === "SecretRare" && (
              <Star
                zIndex={30}
                art={useFullArt ? "full" : "default"}
                size={scaleFactor}
              />
            )}
          </Box>
          <Box sx={{ position: "absolute", left: 2, bottom: 1, width: "50px", height: "12px", backdropFilter: "blur(2px)", zIndex: 1, borderRadius: "50%" }}></Box>
          <Box sx={{ position: "absolute", left: idLeft, bottom: idBottom, zIndex: 30 }}>
            <Typography
              sx={{ fontFamily: '"Exo 2", sans-serif', fontSize: idFontSize }}
            >
              {card.characterId}
            </Typography>
          </Box>
        </Box>
      </Box>
      {showUltraRare && (
        <Box
          sx={{
            position: "absolute",
            left: -4,
            top: -4,
            height: height,
            width: width,
            background: COLORS.cards.ultraRare,
            backgroundSize: "300% 100%",
            backgroundPosition: "0% 0%",
            animation: effectsOn ? "shimmer 3s infinite linear alternate" : "none",
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
            height: height,
            width: width,
            background: COLORS.cards.shimmer,
            backgroundSize: "300%",
            backgroundPositionX: "100%",
            animation: effectsOn ? "shimmer 2.5s infinite linear alternate" : "none",
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
      {/* Holographic filter overlay */}
      <SharpHolographicFilter
        width={width}
        height={height}
        intensity={1}
        enabled={showHolographic}
        animating={effectsOn}
      />
      <RadiantHolographicFilter
        width={width}
        height={height}
        intensity={0.7}
        enabled={showRadiantHolo}
        animating={effectsOn}
      />
      <GlitterFilter
        width={width}
        height={height}
        intensity={0.7}
        enabled={showGlitter}
        animating={effectsOn}
      />
    </Box>
  );
};
