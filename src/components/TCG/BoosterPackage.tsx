import { Box } from "@mui/material";
import { COLORS } from "styling/constants";
import boosterArt from "assets/tcg/109_full_art.jpg";
import { useEffect, useState } from "react";

interface BoosterPackageProps {
  zIndex: number;
  onOpenPack: () => void;
  openable?: boolean;
}

const pressurePattern =
  "linear-gradient(90deg,rgba(227, 227, 227, 0.3) 0%, rgba(247, 247, 247, 1) 4%, rgba(227, 227, 227, 0.3) 8%, rgba(247, 247, 247, 1) 12%, rgba(227, 227, 227, 0.3) 16%, rgba(247, 247, 247, 1) 20%, rgba(227, 227, 227, 0.3) 24%, rgba(247, 247, 247, 1) 28%, rgba(227, 227, 227, 0.3) 32%, rgba(247, 247, 247, 1) 36%, rgba(227, 227, 227, 0.3) 40%, rgba(247, 247, 247, 1) 44%, rgba(227, 227, 227, 0.3) 48%, rgba(247, 247, 247, 1) 52%, rgba(227, 227, 227, 0.3) 56%, rgba(247, 247, 247, 1) 60%, rgba(227, 227, 227, 0.3) 64%, rgba(247, 247, 247, 1) 68%, rgba(227, 227, 227, 0.3) 72%, rgba(247, 247, 247, 1) 76%, rgba(227, 227, 227, 0.3) 80%, rgba(247, 247, 247, 1) 84%, rgba(227, 227, 227, 0.3) 88%, rgba(247, 247, 247, 1) 92%, rgba(227, 227, 227, 0.3) 96%)";

export const BoosterPackage = ({
  zIndex,
  onOpenPack,
  openable = true,
}: BoosterPackageProps) => {
  // States: 'closed' -> 'ripping' -> 'hidden'
  const [packState, setPackState] = useState("closed");

  const handleOpen = () => {
    if (packState === "closed" && openable) {
      setPackState("ripping");
    }
  };

  useEffect(() => {
    if (packState === "hidden") {
      setTimeout(() => {
        onOpenPack();
      }, 1000);
    }
  });

  const handleTransitionEnd = (e: any) => {
    // Only trigger if we just finished the 'ripping' phase
    // We check for 'transform' to avoid multiple triggers for every property
    if (packState === "ripping" && e.propertyName === "transform") {
      // Delay slightly so the user sees the rip before it vanishes
      setTimeout(() => {
        setPackState("hidden");
      }, 300);
    }
  };

  const topPath =
    "polygon(0% 0%, 100% 0%, 100% 10%, 90% 8%, 80% 11%, 70% 9%, 60% 12%, 50% 8%, 40% 11%, 30% 9%, 20% 12%, 10% 8%, 0% 10%)";
  const bottomPath =
    "polygon(0% 10%, 10% 8%, 20% 12%, 30% 9%, 40% 11%, 50% 8%, 60% 12%, 70% 9%, 80% 11%, 90% 8%, 100% 10%, 100% 100%, 0% 100%)";

  const CardLayers = (
    <>
      <Box
        sx={{
          position: "absolute",
          backgroundImage: `url(${boosterArt})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          width: "100%",
          height: "100%",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "40px",
          background: pressurePattern,
          opacity: 0.8,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "40px",
          bottom: 0,
          background: pressurePattern,
          opacity: 0.8,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          background:
            "linear-gradient(225deg, #ff4dff 0%, #e18ff4 25%, #b9d1e7 50%, #91ffdb 75%, #6affcd 100%)",
          width: "100%",
          height: "100%",
          opacity: 0.3,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          background:
            "linear-gradient(342deg,rgba(227, 227, 227, 0) 1%, rgba(247, 247, 247, 1) 50%, rgba(227, 227, 227, 0) 100%)",
          width: "100%",
          height: "100%",
          opacity: 0.8,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "90px",
          bottom: 40,
          background:
            "linear-gradient(0deg,rgba(0, 0, 0, 0.3) 0%, rgba(255, 255, 255, 0) 100%)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "90px",
          top: 40,
          background:
            "linear-gradient(185deg,rgba(255, 255, 255, 1) 0%, rgba(242, 242, 242, 0) 50%)",
        }}
      />
    </>
  );

  return (
    <Box
      sx={{
        position: "absolute",
        zIndex: 200,
        left: -10,
        top: -4,
        pointerEvents: packState === "hidden" ? "none" : "auto",
        display: packState === "hidden" ? "none" : "block",
        boxShadow: 4,
      }}
    >
      <Box
        onClick={handleOpen}
        // This event fires when the pieces finish moving
        onTransitionEnd={handleTransitionEnd}
        sx={{
          cursor: openable ? "pointer" : "auto",
          position: "relative",
          width: "350px",
          height: "540px",
          zIndex: packState === "hidden" ? -2 : zIndex + 1,
          // Disable clicks once it starts hiding
          pointerEvents: packState === "hidden" ? "none" : "auto",
          // Fade the whole group out in the final step
          opacity: packState === "hidden" ? 0 : 1,
          transition: "opacity 0.8s ease-out, transform 0.2s ease",
          "&:active": {
            transform:
              packState === "closed" && openable ? "scale(1.04)" : "none",
          },
        }}
      >
        {/* TOP PIECE */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: COLORS.cards.rare,
            clipPath: topPath,
            zIndex: 2,
            transition: "transform 2.0s cubic-bezier(0.34, 1.56, 0.64, 1)",
            transform:
              packState !== "closed"
                ? "translateY(-120px) translateX(-40px) rotate(-25deg)"
                : "translateY(0) rotate(0)",
          }}
        >
          {CardLayers}
        </Box>

        {/* BOTTOM PIECE */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: COLORS.cards.rare,
            clipPath: bottomPath,
            zIndex: 1,
            transition: "transform 2.0s cubic-bezier(0.34, 1.56, 0.64, 1)",
            transform:
              packState !== "closed"
                ? "translateY(400px) scale(1.02)"
                : "translateY(0)",
          }}
        >
          {CardLayers}
        </Box>
      </Box>
    </Box>
  );
};
