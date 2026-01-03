import { Box } from "@mui/material";
import { useState, MouseEvent, useEffect } from "react";

interface SharpHolographicFilterProps {
    width?: string;
    height?: string;
    intensity?: number;
    enabled?: boolean;
    animating?: boolean;
}

export const SharpHolographicFilter = ({
    width = "330px",
    height = "450px",
    intensity = 0.5,
    enabled = true,
    animating = false,
}: SharpHolographicFilterProps) => {
    const [animationTime, setAnimationTime] = useState(0);

    useEffect(() => {
        if (!animating) return;

        let startTime = Date.now();
        const animate = () => {
            const elapsed = (Date.now() - startTime) / 2000; // time in seconds
            setAnimationTime(elapsed);
            requestAnimationFrame(animate);
        };

        const frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [animating]);

    if (!enabled) return null;

    // Calculate gradient angle based on animation time (simulates the inspect rotation)
    // The inspect animation goes from -20deg to 20deg over 5 seconds
    const inspectRotation = Math.sin(animationTime * Math.PI / 5) * 40; // -40 to 40 range
    const gradientAngle = -25 + inspectRotation;

    return (
        <Box
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
            {/* Specular layer with color-dodge blend and rainbow gradient */}
            <Box
                sx={{
                    background: "black",
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    backgroundPosition: "center",
                    mixBlendMode: "color-dodge",
                    opacity: intensity * 0.1,
                    backgroundImage: `linear-gradient(
                        ${gradientAngle}deg,
                        hsl(0, 0%, 0%) 0%,
                        hsl(0, 0%, 0%) 10%,
                        hsl(275, 100%, 60%) 20%,
                        hsl(240, 100%, 70%) 30%,
                        hsl(180, 100%, 60%) 40%,
                        hsl(120, 100%, 50%) 50%,
                        hsl(60, 100%, 50%) 60%,
                        hsl(30, 100%, 50%) 70%,
                        hsl(0, 100%, 50%) 80%,
                        hsl(0, 0%, 0%) 90%,
                        hsl(0, 0%, 0%) 100%
                    )`,
                    transition: "background-image 0.1s linear",
                }}
            >
                {/* Mask layer with multiply blend - creates the holographic pattern */}
                <Box
                    sx={{
                        background: "black",
                        mixBlendMode: "multiply",
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        backgroundPosition: "center",
                        backgroundImage: `repeating-linear-gradient(
                            ${gradientAngle + 115}deg,
                            hsl(0, 0%, 0%) 0px,
                            hsl(0, 0%, 100%) 1px,
                            hsl(0, 0%, 100%) 3px,
                            hsl(0, 0%, 0%) 4px,
                            hsl(0, 0%, 0%) 8px
                        )`,
                        transition: "background-image 0.1s linear",
                    }}
                />
            </Box>
        </Box>
    );
};

export const MetallicHolographicFilter = ({
    width = "330px",
    height = "450px",
    intensity = 1,
    enabled = true,
}: SharpHolographicFilterProps) => {
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
    };

    if (!enabled) return null;

    const angle = ((mousePosition.x - 50) * 2.5) + ((mousePosition.y - 50) * 1.5);

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
            {/* Main holographic pattern */}
            <Box
                sx={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%",
                    mixBlendMode: "color-dodge",
                    opacity: intensity * 0.2,
                    backgroundImage: `conic-gradient(
                        from ${angle}deg at 50% 50%,
                        rgb(255, 0, 150) 0deg,
                        rgb(255, 150, 0) 60deg,
                        rgb(255, 255, 0) 120deg,
                        rgb(0, 255, 150) 180deg,
                        rgb(0, 150, 255) 240deg,
                        rgb(150, 0, 255) 300deg,
                        rgb(255, 0, 150) 360deg
                    )`,
                    backgroundSize: "200% 200%",
                    backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                    transition: "background-position 0.1s linear",
                }}
            >
                {/* Striped pattern mask */}
                <Box
                    sx={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: "100%",
                        height: "100%",
                        mixBlendMode: "multiply",
                        backgroundImage: `repeating-linear-gradient(
                            ${angle + 45}deg,
                            rgba(255, 255, 255, 0.3) 0px,
                            rgba(255, 255, 255, 1) 2px,
                            rgba(255, 255, 255, 0.3) 4px
                        )`,
                        transition: "background-image 0.1s linear",
                    }}
                />
            </Box>

            {/* Additional shine sweep */}
            <Box
                sx={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%",
                    mixBlendMode: "screen",
                    opacity: intensity * 0.4,
                    backgroundImage: `linear-gradient(
                        ${angle - 90}deg,
                        transparent 0%,
                        transparent 30%,
                        rgba(255, 255, 255, 0.6) 50%,
                        transparent 70%,
                        transparent 100%
                    )`,
                    transition: "background-image 0.1s linear",
                }}
            />
        </Box>
    );
};
