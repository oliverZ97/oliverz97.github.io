import { Box, Button, Typography } from "@mui/material";
import { getImgSrc } from "common/quizUtils";
import { Anime, Character } from "common/types";
import { useEffect, useState } from "react";
import { COLORS } from "styling/constants";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { set } from "react-hook-form";
import { theme } from "styling/theme";

interface HigherLowerProps {
    charData: Character[];
    animeData: Anime[];
}


export const HigherLower = ({ charData, animeData }: HigherLowerProps) => {
    const [mode, setMode] = useState<"height" | "animeReleaseYear">("height"); // Placeholder for mode state
    const [activeElement, setActiveElement] = useState<Character | Anime | null>(null); // Placeholder for active element state
    const [newElement, setNewElement] = useState<Character | Anime | null>(null); // Placeholder for new element state
    const [secondNextElement, setSecondNextElement] = useState<Character | Anime | null>(null); // Placeholder for second next element state
    const [points, setPoints] = useState<number>(0);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    function init() {
        setPoints(0);
        if (mode === "height") {
            const filteredChars = charData.filter((char) => char.Height !== null);
            const randomChar = filteredChars[Math.floor(Math.random() * filteredChars.length)];
            setActiveElement(randomChar);
            let anotherRandomChar = filteredChars[Math.floor(Math.random() * filteredChars.length)];
            setNewElement(anotherRandomChar);
            let yetAnotherRandomChar = filteredChars[Math.floor(Math.random() * filteredChars.length)];
            setSecondNextElement(yetAnotherRandomChar);
        }
    }

    function handleGuess(guess: "higher" | "lower") {
        if (mode === "height") {
            checkHeightGuess(guess);
        }
    }

    function handleCharacterChange() {
        setActiveElement(newElement);
        setNewElement(secondNextElement);

        const filteredChars = charData.filter((char) => char.Height !== null);
        const anotherRandomChar = filteredChars[Math.floor(Math.random() * filteredChars.length)];
        setSecondNextElement(anotherRandomChar);
    }

    function checkHeightGuess(guess: "higher" | "lower") {
        if (activeElement && newElement && 'Height' in activeElement && 'Height' in newElement) {
            if (guess === "higher" && newElement.Height! > activeElement.Height!) {
                setPoints(points + 1);
                // Trigger animation
                setIsAnimating(true);

                // After animation completes, update state
                setTimeout(() => {
                    handleCharacterChange();
                    setIsAnimating(false);
                }, 500);
            } else if (guess === "lower" && newElement.Height! < activeElement.Height!) {
                setPoints(points + 1);
                // Trigger animation
                setIsAnimating(true);

                // After animation completes, update state
                setTimeout(() => {
                    handleCharacterChange();
                    setIsAnimating(false);
                }, 500);
            } else {
                init();
                return;
            }
        }
    }

    useEffect(() => {
        init();
    }, [mode]);

    return <Box
        sx={{
            position: "relative",
            background:
                COLORS.gradient,
            padding: 4,
            borderRadius: 2,
            border: `1px solid ${COLORS.quiz.light}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "500px",
        }}
    >
        <Box position={"absolute"}
            sx={{
                left: 20,
                top: 20,
                [theme.breakpoints.down("md")]: {
                    left: 60,
                },
            }}>

            <Typography
                sx={{ color: "white", fontSize: "24px", paddingLeft: "2px" }}
            >{`${String(points).padStart(4, "0")}`}</Typography>
        </Box>
        <Typography sx={{ fontWeight: "bold", fontSize: "28px", color: "white" }}><Typography sx={{ color: COLORS.quiz.success, fontWeight: "bold", fontSize: "32px", }} component={"span"}>Higher</Typography> or <Typography sx={{ color: COLORS.quiz.failed, fontWeight: "bold", fontSize: "32px", }} component={"span"}>Lower</Typography></Typography>
        <Typography sx={{ color: "white", marginBottom: 4 }}>Category: {mode === "height" ? "Character Height" : "Anime Release Year"}</Typography>
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            width: "100%",
            position: "relative"
        }}>
            {/* Centered images and VS box */}
            <Box sx={{ display: "flex", alignItems: "center", position: "relative" }}>
                {/* Left image - activeElement */}
                {activeElement && <Box
                    key={activeElement.id}
                    width={"250px"}
                    component={"img"}
                    height={"300px"}
                    sx={{
                        objectFit: "cover",
                    }}
                    src={getImgSrc(activeElement?.id)}>
                </Box>}

                {/* VS badge */}
                <Box sx={{ backgroundColor: COLORS.quiz.primary_text, padding: 2, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", height: "60px", width: "60px", flexShrink: 0, position: "absolute", left: "50%", transform: "translateX(-50%)", zIndex: 10 }}>
                    <Typography sx={{ fontWeight: "bold" }}>VS.</Typography>
                </Box>

                {/* Right side - with stacked images */}
                <Box sx={{ position: "relative", width: "250px", height: "300px" }}>
                    {/* Next element - will slide left when animating */}
                    {newElement && <Box
                        key={newElement.id}
                        width={"250px"}
                        component={"img"}
                        height={"300px"}
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            objectFit: "cover",
                            transition: "transform 0.5s ease-in-out",
                            transform: isAnimating ? "translateX(-250px)" : "translateX(0)",
                            zIndex: 2,
                        }}
                        src={getImgSrc(newElement?.id)}
                    />}

                    {/* Second next element - hidden underneath */}
                    {secondNextElement && <Box
                        key={secondNextElement.id}
                        width={"250px"}
                        component={"img"}
                        height={"300px"}
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            objectFit: "cover",
                            zIndex: 1,
                        }}
                        src={getImgSrc(secondNextElement?.id)}
                    />}
                </Box>
            </Box>

            {/* Left text - positioned absolutely */}
            {activeElement && mode === "height" && <Box sx={{
                position: "absolute",
                left: "10%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                color: "white"
            }}>
                <Typography>{activeElement.Name}</Typography>
                <Typography>is</Typography>
                <Typography sx={{ fontWeight: "bold" }}>{(activeElement as Character).Height} cm</Typography>
            </Box>}

            {/* Right buttons - positioned absolutely */}
            {newElement && <Box sx={{
                position: "absolute",
                right: "10%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                color: "white"
            }}>
                <Typography>{newElement.Name}'s height is</Typography>
                <Button sx={{ backgroundColor: COLORS.quiz.success, width: "100px", "&:hover": { backgroundColor: COLORS.quiz.success_light } }} onClick={() => handleGuess("higher")} endIcon={<KeyboardArrowUpIcon />} variant="contained">Higher</Button>
                <Button sx={{ backgroundColor: COLORS.quiz.failed, width: "100px", "&:hover": { backgroundColor: COLORS.quiz.failed_light } }} onClick={() => handleGuess("lower")} endIcon={<KeyboardArrowDownIcon />} variant="contained">Lower</Button>
            </Box>}
        </Box>
    </Box >;
};