import { Box, Typography } from "@mui/material"
import { getImgSrc } from "common/quizUtils";
import { Character } from "common/types";
import { useState } from "react";
import { COLORS } from "styling/constants"

interface TCGCardProps {
    character: Character;
    visible?: boolean;
    slideOnClick?: boolean;
    inStack?: boolean;
}

export const TCGCard = ({ character, visible, slideOnClick = false, inStack = false }: TCGCardProps) => {
    const [slideOut, setSlideOut] = useState(false);

    const effectsOn = visible;
    const inspectAnimation = inStack && !slideOut;
    const showShimmer = true && effectsOn;
    const showUltraRare = true && effectsOn;

    function handleClick() {
        if (slideOnClick && !slideOut) {
            setSlideOut(true);
        }
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
                backgroundImage: COLORS.cards.bgRare,
                position: "relative",
                animation: slideOut ? "slideOut 1s forwards" : inspectAnimation ? "inspect 5s infinite ease-in-out alternate" : undefined,
                pointerEvents: slideOut ? "none" : "auto",
                "@keyframes inspect": {
                    from: {
                        transform: "rotateY(-20deg) rotateX(10deg) rotateZ(-2deg)",
                    },
                    to: {
                        transform: "rotateY(20deg) rotateX(10deg) rotateZ(2deg)",
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
                <Box sx={{ marginBottom: 2, textAlign: "center", boxShadow: 1, padding: 1, borderRadius: 1, backgroundColor: COLORS.cards.rare, width: "90%" }}>
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
                <Box>

                </Box>
            </Box>
            {showUltraRare && <Box
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
            ></Box>}
            {showShimmer && <Box
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
            ></Box>}
        </Box>
    )
}