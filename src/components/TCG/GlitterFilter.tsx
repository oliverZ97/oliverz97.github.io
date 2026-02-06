import { Box } from "@mui/material";
import { useState, useEffect } from "react";

interface GlitterFilterProps {
  width: string;
  height: string;
  intensity?: number;
  enabled?: boolean;
  animating?: boolean;
}

export const GlitterFilter = ({
  width,
  height,
  intensity = 0.5,
  enabled = true,
  animating = false,
}: GlitterFilterProps) => {
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
  const rotation = animating ? Math.sin((animationTime * Math.PI) / 5) * 40 : 0;
  const bgX = 50 + rotation * 0.8;
  const bgY =
    50 + (animating ? Math.sin((animationTime * Math.PI) / 5) * 15 : 0);

  // Glitter animation - creates pulsing sparkle effect
  const glitterPhase = animating ? (animationTime * 2) % 1 : 0.5;
  const glitterOpacity = animating
    ? Math.sin(glitterPhase * Math.PI * 2) * 0.5 + 0.5
    : 0.6;

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
        zIndex: 60,
      }}
    >
      {/* Glitter sparkle effect - primary layer */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `
            radial-gradient(circle at 12% 18%, hsla(0, 0%, 100%, ${
              glitterOpacity * 1
            }) 0%, transparent 0.8%),
            radial-gradient(circle at 22% 25%, hsla(60, 100%, 90%, ${
              glitterOpacity * 0.9
            }) 0%, transparent 0.7%),
            radial-gradient(circle at 8% 35%, hsla(180, 100%, 90%, ${
              glitterOpacity * 1
            }) 0%, transparent 0.75%),
            radial-gradient(circle at 18% 48%, hsla(0, 0%, 100%, ${
              glitterOpacity * 0.85
            }) 0%, transparent 0.7%),
            radial-gradient(circle at 15% 62%, hsla(120, 100%, 90%, ${
              glitterOpacity * 0.9
            }) 0%, transparent 0.8%),
            radial-gradient(circle at 25% 75%, hsla(300, 100%, 90%, ${
              glitterOpacity * 1
            }) 0%, transparent 0.75%),
            radial-gradient(circle at 10% 88%, hsla(200, 100%, 90%, ${
              glitterOpacity * 0.85
            }) 0%, transparent 0.7%),
            
            radial-gradient(circle at 38% 12%, hsla(0, 0%, 100%, ${
              glitterOpacity * 1
            }) 0%, transparent 0.75%),
            radial-gradient(circle at 45% 28%, hsla(270, 100%, 90%, ${
              glitterOpacity * 0.9
            }) 0%, transparent 0.8%),
            radial-gradient(circle at 42% 42%, hsla(0, 0%, 100%, ${
              glitterOpacity * 1
            }) 0%, transparent 0.7%),
            radial-gradient(circle at 35% 58%, hsla(45, 100%, 90%, ${
              glitterOpacity * 0.85
            }) 0%, transparent 0.75%),
            radial-gradient(circle at 48% 68%, hsla(180, 100%, 90%, ${
              glitterOpacity * 1
            }) 0%, transparent 0.8%),
            radial-gradient(circle at 40% 82%, hsla(0, 0%, 100%, ${
              glitterOpacity * 0.9
            }) 0%, transparent 0.7%),
            
            radial-gradient(circle at 58% 8%, hsla(60, 100%, 90%, ${
              glitterOpacity * 1
            }) 0%, transparent 0.75%),
            radial-gradient(circle at 65% 22%, hsla(0, 0%, 100%, ${
              glitterOpacity * 1
            }) 0%, transparent 0.7%),
            radial-gradient(circle at 62% 38%, hsla(300, 100%, 90%, ${
              glitterOpacity * 0.9
            }) 0%, transparent 0.8%),
            radial-gradient(circle at 55% 52%, hsla(120, 100%, 90%, ${
              glitterOpacity * 0.85
            }) 0%, transparent 0.75%),
            radial-gradient(circle at 68% 65%, hsla(0, 0%, 100%, ${
              glitterOpacity * 1
            }) 0%, transparent 0.7%),
            radial-gradient(circle at 60% 78%, hsla(200, 100%, 90%, ${
              glitterOpacity * 0.9
            }) 0%, transparent 0.8%),
            radial-gradient(circle at 58% 92%, hsla(270, 100%, 90%, ${
              glitterOpacity * 0.85
            }) 0%, transparent 0.75%),
            
            radial-gradient(circle at 78% 15%, hsla(0, 0%, 100%, ${
              glitterOpacity * 1
            }) 0%, transparent 0.7%),
            radial-gradient(circle at 85% 28%, hsla(180, 100%, 90%, ${
              glitterOpacity * 0.9
            }) 0%, transparent 0.75%),
            radial-gradient(circle at 82% 45%, hsla(45, 100%, 90%, ${
              glitterOpacity * 1
            }) 0%, transparent 0.8%),
            radial-gradient(circle at 75% 58%, hsla(0, 0%, 100%, ${
              glitterOpacity * 0.85
            }) 0%, transparent 0.7%),
            radial-gradient(circle at 88% 72%, hsla(60, 100%, 90%, ${
              glitterOpacity * 1
            }) 0%, transparent 0.75%),
            radial-gradient(circle at 80% 85%, hsla(300, 100%, 90%, ${
              glitterOpacity * 0.9
            }) 0%, transparent 0.8%),
            radial-gradient(circle at 92% 95%, hsla(0, 0%, 100%, ${
              glitterOpacity * 0.85
            }) 0%, transparent 0.7%)
          `,
          backgroundPosition: `
            ${bgX * 0.4 + 8}% ${bgY * 0.3 + 15}%,
            ${bgX * -0.3 + 18}% ${bgY * 0.4 + 22}%,
            ${bgX * 0.5 + 5}% ${bgY * -0.2 + 32}%,
            ${bgX * -0.4 + 15}% ${bgY * 0.5 + 45}%,
            ${bgX * 0.3 + 12}% ${bgY * -0.3 + 59}%,
            ${bgX * -0.5 + 22}% ${bgY * 0.4 + 72}%,
            ${bgX * 0.4 + 7}% ${bgY * -0.4 + 85}%,
            
            ${bgX * -0.3 + 35}% ${bgY * 0.5 + 9}%,
            ${bgX * 0.4 + 42}% ${bgY * -0.2 + 25}%,
            ${bgX * -0.4 + 39}% ${bgY * 0.3 + 39}%,
            ${bgX * 0.5 + 32}% ${bgY * -0.4 + 55}%,
            ${bgX * -0.3 + 45}% ${bgY * 0.4 + 65}%,
            ${bgX * 0.3 + 37}% ${bgY * -0.5 + 79}%,
            
            ${bgX * -0.4 + 55}% ${bgY * 0.5 + 5}%,
            ${bgX * 0.5 + 62}% ${bgY * -0.3 + 19}%,
            ${bgX * -0.5 + 59}% ${bgY * 0.4 + 35}%,
            ${bgX * 0.4 + 52}% ${bgY * -0.4 + 49}%,
            ${bgX * -0.3 + 65}% ${bgY * 0.3 + 62}%,
            ${bgX * 0.5 + 57}% ${bgY * -0.5 + 75}%,
            ${bgX * -0.4 + 55}% ${bgY * 0.4 + 89}%,
            
            ${bgX * 0.5 + 75}% ${bgY * -0.3 + 12}%,
            ${bgX * -0.4 + 82}% ${bgY * 0.4 + 25}%,
            ${bgX * 0.4 + 79}% ${bgY * -0.5 + 42}%,
            ${bgX * -0.5 + 72}% ${bgY * 0.5 + 55}%,
            ${bgX * 0.3 + 85}% ${bgY * -0.3 + 69}%,
            ${bgX * -0.4 + 77}% ${bgY * 0.4 + 82}%,
            ${bgX * 0.5 + 89}% ${bgY * -0.4 + 92}%
          `,
          mixBlendMode: "screen",
          opacity: intensity * 1,
          filter: "blur(0.5px)",
        }}
      />

      {/* Secondary glitter layer with offset timing */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `
            radial-gradient(circle at 15% 12%, hsla(0, 0%, 100%, ${
              (1 - glitterOpacity) * 1
            }) 0%, transparent 0.75%),
            radial-gradient(circle at 5% 28%, hsla(270, 100%, 90%, ${
              (1 - glitterOpacity) * 0.9
            }) 0%, transparent 0.7%),
            radial-gradient(circle at 20% 42%, hsla(180, 100%, 90%, ${
              (1 - glitterOpacity) * 1
            }) 0%, transparent 0.8%),
            radial-gradient(circle at 10% 55%, hsla(45, 100%, 90%, ${
              (1 - glitterOpacity) * 0.85
            }) 0%, transparent 0.75%),
            radial-gradient(circle at 18% 70%, hsla(0, 0%, 100%, ${
              (1 - glitterOpacity) * 1
            }) 0%, transparent 0.7%),
            radial-gradient(circle at 8% 85%, hsla(60, 100%, 90%, ${
              (1 - glitterOpacity) * 0.9
            }) 0%, transparent 0.8%),
            
            radial-gradient(circle at 32% 8%, hsla(120, 100%, 90%, ${
              (1 - glitterOpacity) * 1
            }) 0%, transparent 0.75%),
            radial-gradient(circle at 42% 22%, hsla(0, 0%, 100%, ${
              (1 - glitterOpacity) * 0.9
            }) 0%, transparent 0.7%),
            radial-gradient(circle at 38% 38%, hsla(300, 100%, 90%, ${
              (1 - glitterOpacity) * 1
            }) 0%, transparent 0.8%),
            radial-gradient(circle at 48% 52%, hsla(200, 100%, 90%, ${
              (1 - glitterOpacity) * 0.85
            }) 0%, transparent 0.75%),
            radial-gradient(circle at 35% 68%, hsla(0, 0%, 100%, ${
              (1 - glitterOpacity) * 1
            }) 0%, transparent 0.7%),
            radial-gradient(circle at 45% 88%, hsla(180, 100%, 90%, ${
              (1 - glitterOpacity) * 0.9
            }) 0%, transparent 0.8%),
            
            radial-gradient(circle at 62% 15%, hsla(0, 0%, 100%, ${
              (1 - glitterOpacity) * 1
            }) 0%, transparent 0.75%),
            radial-gradient(circle at 55% 32%, hsla(45, 100%, 90%, ${
              (1 - glitterOpacity) * 0.9
            }) 0%, transparent 0.7%),
            radial-gradient(circle at 68% 48%, hsla(270, 100%, 90%, ${
              (1 - glitterOpacity) * 1
            }) 0%, transparent 0.8%),
            radial-gradient(circle at 58% 62%, hsla(0, 0%, 100%, ${
              (1 - glitterOpacity) * 0.85
            }) 0%, transparent 0.75%),
            radial-gradient(circle at 65% 78%, hsla(60, 100%, 90%, ${
              (1 - glitterOpacity) * 1
            }) 0%, transparent 0.7%),
            
            radial-gradient(circle at 85% 10%, hsla(300, 100%, 90%, ${
              (1 - glitterOpacity) * 1
            }) 0%, transparent 0.8%),
            radial-gradient(circle at 78% 25%, hsla(0, 0%, 100%, ${
              (1 - glitterOpacity) * 0.9
            }) 0%, transparent 0.75%),
            radial-gradient(circle at 88% 42%, hsla(120, 100%, 90%, ${
              (1 - glitterOpacity) * 1
            }) 0%, transparent 0.7%),
            radial-gradient(circle at 82% 58%, hsla(180, 100%, 90%, ${
              (1 - glitterOpacity) * 0.85
            }) 0%, transparent 0.8%),
            radial-gradient(circle at 75% 75%, hsla(0, 0%, 100%, ${
              (1 - glitterOpacity) * 1
            }) 0%, transparent 0.75%),
            radial-gradient(circle at 90% 88%, hsla(200, 100%, 90%, ${
              (1 - glitterOpacity) * 0.9
            }) 0%, transparent 0.7%)
          `,
          backgroundPosition: `
            ${bgX * -0.4 + 12}% ${bgY * 0.5 + 9}%,
            ${bgX * 0.5 + 2}% ${bgY * -0.3 + 25}%,
            ${bgX * -0.5 + 17}% ${bgY * 0.4 + 39}%,
            ${bgX * 0.4 + 7}% ${bgY * -0.4 + 52}%,
            ${bgX * -0.3 + 15}% ${bgY * 0.5 + 67}%,
            ${bgX * 0.5 + 5}% ${bgY * -0.5 + 82}%,
            
            ${bgX * -0.5 + 29}% ${bgY * 0.4 + 5}%,
            ${bgX * 0.4 + 39}% ${bgY * -0.5 + 19}%,
            ${bgX * -0.3 + 35}% ${bgY * 0.5 + 35}%,
            ${bgX * 0.5 + 45}% ${bgY * -0.4 + 49}%,
            ${bgX * -0.4 + 32}% ${bgY * 0.3 + 65}%,
            ${bgX * 0.4 + 42}% ${bgY * -0.5 + 85}%,
            
            ${bgX * -0.3 + 59}% ${bgY * 0.5 + 12}%,
            ${bgX * 0.5 + 52}% ${bgY * -0.4 + 29}%,
            ${bgX * -0.5 + 65}% ${bgY * 0.4 + 45}%,
            ${bgX * 0.4 + 55}% ${bgY * -0.3 + 59}%,
            ${bgX * -0.4 + 62}% ${bgY * 0.5 + 75}%,
            
            ${bgX * 0.5 + 82}% ${bgY * -0.4 + 7}%,
            ${bgX * -0.4 + 75}% ${bgY * 0.5 + 22}%,
            ${bgX * 0.3 + 85}% ${bgY * -0.5 + 39}%,
            ${bgX * -0.5 + 79}% ${bgY * 0.4 + 55}%,
            ${bgX * 0.4 + 72}% ${bgY * -0.3 + 72}%,
            ${bgX * -0.3 + 87}% ${bgY * 0.5 + 85}%
          `,
          mixBlendMode: "screen",
          opacity: intensity * 0.8,
          filter: "blur(0.5px)",
        }}
      />
    </Box>
  );
};
