import { Box } from "@mui/material";
import { useState, MouseEvent } from "react";

interface HolographicFilterProps {
    width?: string;
    height?: string;
    intensity?: number;
    enabled?: boolean;
}

export const HolographicFilter = ({
    width = "330px",
    height = "450px",
    intensity = 1,
    enabled = true,
}: HolographicFilterProps) => {
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
    };

    if (!enabled) return null;

    return (
        <Box
            onMouseMove={handleMouseMove}
            sx={{
                position: "absolute",
                left: 0,
                top: 0,
                width,
                height,
                overflow: "hidden",
                pointerEvents: "none",
                zIndex: 100,
            }}
        >
            {/* Specular layer with color-dodge effect */}
            <Box
                sx={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%",
                    mixBlendMode: "color-dodge",
                    opacity: intensity * 0.7,
                    background: `radial-gradient(
            circle at ${mousePosition.x}% ${mousePosition.y}%,
            transparent 0%,
            rgba(60, 94, 109, 0.3) 20%,
            rgba(244, 49, 14, 0.4) 40%,
            rgba(245, 131, 8, 0.5) 60%,
            transparent 80%
          )`,
                    transition: "background 0.1s ease-out",
                }}
            >
                {/* Mask layer with multiply effect */}
                <Box
                    sx={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: "100%",
                        height: "100%",
                        mixBlendMode: "multiply",
                        background: `linear-gradient(
              ${mousePosition.x * 1.8}deg,
              rgba(255, 255, 255, 0.1) 0%,
              rgba(255, 255, 255, 0.5) 30%,
              rgba(255, 255, 255, 0.8) 50%,
              rgba(255, 255, 255, 0.5) 70%,
              rgba(255, 255, 255, 0.1) 100%
            )`,
                        transition: "background 0.1s ease-out",
                    }}
                />
            </Box>

            {/* Additional shine effect */}
            <Box
                sx={{
                    position: "absolute",
                    left: `${mousePosition.x - 10}%`,
                    top: `${mousePosition.y - 10}%`,
                    width: "20%",
                    height: "20%",
                    background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)",
                    mixBlendMode: "overlay",
                    filter: "blur(20px)",
                    transition: "left 0.1s ease-out, top 0.1s ease-out",
                    pointerEvents: "none",
                }}
            />
        </Box>
    );
};

export const RainbowHolographicFilter = ({
    width = "330px",
    height = "450px",
    intensity = 1,
    enabled = true,
}: HolographicFilterProps) => {
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
    };

    if (!enabled) return null;

    // Calculate gradient angle based on mouse position
    const gradientAngle = (mousePosition.x / 100) * 180;

    return (
        <Box
            onMouseMove={handleMouseMove}
            sx={{
                position: "absolute",
                left: 0,
                top: 0,
                width,
                height,
                overflow: "hidden",
                pointerEvents: "none",
                zIndex: 100,
                backfaceVisibility: "hidden",
            }}
        >
            {/* Specular layer with color-dodge blend mode - rainbow gradient */}
            <Box
                sx={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%",
                    mixBlendMode: "color-dodge",
                    opacity: intensity,
                    backgroundImage: `linear-gradient(
                        ${gradientAngle}deg,
                        black 0%,
                        black 10%,
                        rgb(138, 43, 226) 20%,
                        rgb(75, 0, 130) 30%,
                        rgb(0, 0, 255) 40%,
                        rgb(0, 255, 0) 50%,
                        rgb(255, 255, 0) 60%,
                        rgb(255, 127, 0) 70%,
                        rgb(255, 0, 0) 80%,
                        black 90%,
                        black 100%
                    )`,
                    backgroundSize: "100%",
                    backgroundPosition: "center",
                    transition: "background-image 0.2s ease-out",
                }}
            >
                {/* Nested mask layer with color-burn blend mode - opposite angle gradient */}
                <Box
                    sx={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: "100%",
                        height: "100%",
                        mixBlendMode: "color-burn",
                        backgroundImage: `linear-gradient(
                            ${gradientAngle + 90}deg,
                            black 0%,
                            white 25%,
                            white 50%,
                            white 75%,
                            black 100%
                        )`,
                        backgroundSize: "100%",
                        backgroundPosition: "center",
                        transition: "background-image 0.2s ease-out",
                    }}
                />
            </Box>
        </Box>
    );
};
