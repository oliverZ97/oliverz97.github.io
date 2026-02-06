import { Box } from "@mui/material";
import { useState, useEffect } from "react";

interface RadiantHolographicFilterProps {
  width: string;
  height: string;
  intensity?: number;
  enabled?: boolean;
  animating?: boolean;
}

export const RadiantHolographicFilter = ({
  width,
  height,
  intensity = 0.5,
  enabled = true,
  animating = false,
}: RadiantHolographicFilterProps) => {
  const [animationTime, setAnimationTime] = useState(0);

  useEffect(() => {
    if (!animating) return;

    let startTime = Date.now();
    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000; // time in seconds
      setAnimationTime(elapsed);
      requestAnimationFrame(animate);
    };

    const frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [animating]);

  if (!enabled) return null;

  // Calculate positions based on animation rotation
  // The inspect animation rotates the card, we simulate light reflection
  const rotation = animating ? Math.sin((animationTime * Math.PI) / 5) * 40 : 0; // -40 to 40 range or 0 if static
  const pointerX = 50 + rotation * 0.5;
  const pointerY =
    50 + (animating ? Math.cos((animationTime * Math.PI) / 5) * 20 : 0);
  const bgX = 50 + rotation * 0.8;
  const bgY =
    50 + (animating ? Math.sin((animationTime * Math.PI) / 5) * 15 : 0);

  const barWidth = 1.2;
  const space = 200;

  return (
    <Box
      sx={{
        position: "absolute",
        left: 0,
        top: 0,
        width,
        height,
        pointerEvents: "none",
        overflow: "hidden",
        borderRadius: "8px",
        zIndex: 50,
      }}
    >
      {/* Main shine layer - subtle cross-hatch pattern */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `
            repeating-linear-gradient(
              45deg,
              hsla(0,0%,100%, 0.05) 0%,
              hsla(0,0%,100%, 0.05) ${barWidth}%,
              hsla(0,0%,100%, 0.15) ${barWidth + 0.01}%,
              hsla(0,0%,100%, 0.15) ${barWidth * 2}%,
              hsla(0,0%,100%, 0.08) ${barWidth * 2 + 0.01}%,
              hsla(0,0%,100%, 0.08) ${barWidth * 3}%,
              hsla(0,0%,100%, 0.05) ${barWidth * 3 + 0.01}%,
              hsla(0,0%,100%, 0.05) ${barWidth * 4}%
            ),
            repeating-linear-gradient(
              -45deg,
              hsla(0,0%,100%, 0.05) 0%,
              hsla(0,0%,100%, 0.05) ${barWidth}%,
              hsla(0,0%,100%, 0.15) ${barWidth + 0.01}%,
              hsla(0,0%,100%, 0.15) ${barWidth * 2}%,
              hsla(0,0%,100%, 0.08) ${barWidth * 2 + 0.01}%,
              hsla(0,0%,100%, 0.08) ${barWidth * 3}%,
              hsla(0,0%,100%, 0.05) ${barWidth * 3 + 0.01}%,
              hsla(0,0%,100%, 0.05) ${barWidth * 4}%
            )
          `,
          backgroundSize: "210% 210%, 210% 210%",
          backgroundPosition: `
            ${(bgX - 50) * 1.5 + 50}% ${(bgY - 50) * 1.5 + 50}%,
            ${(bgX - 50) * 1.5 + 50}% ${(bgY - 50) * 1.5 + 50}%
          `,
          mixBlendMode: "overlay",
          opacity: intensity * 0.6,
        }}
      />

      {/* Rainbow foil layer - subtle color shifting */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `
            repeating-linear-gradient(
              55deg,
              hsla(3, 95%, 85%, 0.15) ${space * 1}px,
              hsla(207, 100%, 84%, 0.15) ${space * 2}px,
              hsla(29, 100%, 85%, 0.15) ${space * 3}px,
              hsla(160, 100%, 86%, 0.15) ${space * 4}px,
              hsla(309, 94%, 87%, 0.15) ${space * 5}px,
              hsla(188, 95%, 85%, 0.15) ${space * 6}px,
              hsla(3, 95%, 85%, 0.15) ${space * 7}px
            )
          `,
          backgroundSize: "400% 100%",
          backgroundPosition: `
            ${(bgX - 50) * -2.5 + 50}% ${(bgY - 50) * -2.5 + 50}%
          `,
          mixBlendMode: "screen",
          opacity: intensity * 0.4,
        }}
      />

      {/* Subtle glare highlight */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `
            radial-gradient(
              farthest-corner circle at ${pointerX}% ${pointerY}%,
              hsla(0, 0%, 100%, 0.2) 0%,
              transparent 50%
            )
          `,
          mixBlendMode: "overlay",
          opacity: intensity * 0.5,
        }}
      />
    </Box>
  );
};
