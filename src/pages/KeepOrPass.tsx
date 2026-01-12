import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Typography,
} from "@mui/material";
import { getImgSrc } from "common/quizUtils";
import { Character } from "common/types";
import { useEffect, useState } from "react";
import { COLORS } from "styling/constants";
import { useProfile } from "../components/Profile/ProfileContext";
import characterData from "data/character_data.json";


const KeepOrPass = () => {
    const [charData, setCharData] = useState<Character[]>([]);

    const [activeElement, setActiveElement] = useState<Character | null>(
        null
    );
    const [newElement, setNewElement] = useState<Character | null>(null);
    const [nextLeftElement, setNextLeftElement] = useState<
        Character | null
    >(null);
    const [nextRightElement, setNextRightElement] = useState<
        Character | null
    >(null);
    const [mode, setMode] = useState<"adultsOnly" | "all">("adultsOnly");
    const [animate, setAnimate] = useState<"left" | "right" | "false">("false");
    const [genderFilter, setGenderFilter] = useState("all");
    const [charHistory, setCharHistory] = useState<Character[]>([])

    const { refreshKey } = useProfile();

    useEffect(() => {
        if (charData.length === 0) {
            setCharData([
                ...characterData.sort((a, b) => (a.Name < b.Name ? -1 : 1)),
            ] as Character[]);
        }
    }, [charData, characterData]);

    function init() {
        let validAgeGroups = ["0-11", "12-18", "19-30", "31-50", "51-70", "100+"]
        if (mode === "adultsOnly") {
            validAgeGroups = ["19-30", "31-50", "51-70", "100+"]
        }
        let filteredChars = charData.filter((char) => validAgeGroups.includes(char.Age_Group));
        if (filteredChars.length === 0) return; // Wait for charData to be populated
        if (genderFilter !== "all") {
            filteredChars = filteredChars.filter((char) => char.Sex.toLowerCase() === genderFilter)
        }
        const randomChar =
            filteredChars[Math.floor(Math.random() * filteredChars.length)];
        let anotherRandomChar =
            filteredChars[Math.floor(Math.random() * filteredChars.length)];
        let nextLeft =
            filteredChars[Math.floor(Math.random() * filteredChars.length)];
        let nextRight =
            filteredChars[Math.floor(Math.random() * filteredChars.length)];
        setActiveElement(randomChar);
        setNewElement(anotherRandomChar);
        setNextLeftElement(nextLeft);
        setNextRightElement(nextRight);

    }

    useEffect(() => {
        if (charData.length > 0 && !activeElement && !newElement) {
            init();
        }
    }, [charData]);

    useEffect(() => {
        init();
    }, [genderFilter, mode])

    function handleGuess(guess: "left" | "right") {
        if (
            activeElement &&
            newElement
        ) {
            // Prepare the next character before animation
            let validAgeGroups = ["0-11", "12-18", "19-30", "31-50", "51-70", "100+"]
            if (mode === "adultsOnly") {
                validAgeGroups = ["19-30", "31-50", "51-70", "100+"]
            }
            let filteredChars = charData.filter((char) => validAgeGroups.includes(char.Age_Group));
            if (genderFilter !== "all") {
                filteredChars = filteredChars.filter((char) => char.Sex.toLowerCase() === genderFilter);
            }
            const anotherRandomChar =
                filteredChars[Math.floor(Math.random() * filteredChars.length)];

            if (guess === "left") {
                let arr = charHistory
                arr.push(activeElement);
                setCharHistory(arr)
                // Trigger animation - right image moves up
                setAnimate("right");
                // Pre-load the next character that will replace the right side
                setTimeout(() => {
                    setNewElement(nextRightElement);
                    setNextRightElement(anotherRandomChar);
                    setAnimate("false");
                }, 500);
            } else {
                let arr = charHistory
                arr.push(newElement);
                setCharHistory(arr)
                // Trigger animation - left image moves up
                setAnimate("left");
                // Pre-load the next character that will replace the left side
                setTimeout(() => {
                    setActiveElement(nextLeftElement);
                    setNextLeftElement(anotherRandomChar);
                    setAnimate("false");
                }, 500);
            }
        }

    }

    return (
        <Box>
            <Box
                sx={{
                    position: "relative",
                    background: COLORS.gradient,
                    padding: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "100vh"
                }}
            >
                <Box sx={{ display: "flex", gap: 12 }}>
                    <FormControl>
                        <FormLabel
                            sx={{
                                color: COLORS.quiz.primary_text,
                                "&.Mui-focused": {
                                    color: COLORS.quiz.primary_text,
                                },
                            }}
                        >
                            Gender
                        </FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="all"
                            name="radio-buttons-group"
                            row
                            onChange={(event) => setGenderFilter(event?.target.value)}
                        >
                            <FormControlLabel
                                sx={{ color: COLORS.quiz.primary_text }}
                                value="all"
                                control={<Radio />}
                                label="All"
                            />
                            <FormControlLabel
                                sx={{ color: COLORS.quiz.primary_text }}
                                value="female"
                                control={<Radio />}
                                label="Female"
                            />
                            <FormControlLabel
                                sx={{ color: COLORS.quiz.primary_text }}
                                value="male"
                                control={<Radio />}
                                label="Male"
                            />
                        </RadioGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel
                            sx={{
                                color: COLORS.quiz.primary_text,
                                "&.Mui-focused": {
                                    color: COLORS.quiz.primary_text,
                                },
                            }}
                        >
                            Age
                        </FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="adultsOnly"
                            name="radio-buttons-group"
                            row
                            onChange={(event) => setMode(event?.target.value as "adultsOnly" | "all")}
                        >
                            <FormControlLabel
                                sx={{ color: COLORS.quiz.primary_text }}
                                value="all"
                                control={<Radio />}
                                label="All"
                            />
                            <FormControlLabel
                                sx={{ color: COLORS.quiz.primary_text }}
                                value="adultsOnly"
                                control={<Radio />}
                                label="Adults Only"
                            />
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flex: 1,
                        width: "100%",
                        position: "relative",
                    }}
                >
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", position: "relative" }}>

                        {/* Centered images and VS box */}
                        <Box
                            sx={{ display: "flex", alignItems: "center", position: "relative" }}
                        >
                            {/* Left image - activeElement */}

                            <Box sx={{ position: "relative", width: "300px", height: "400px" }}>
                                {/* Next element - will slide left when animating */}
                                {activeElement && (
                                    <Box
                                        key={activeElement.id}
                                        width={"300px"}
                                        component={"img"}
                                        height={"400px"}
                                        sx={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            objectFit: "cover",
                                            transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
                                            transform: animate === "left"
                                                ? "translateY(-500px)"
                                                : "translateY(0)",
                                            opacity: animate === "left" ? 0 : 1,
                                            zIndex: 2,
                                        }}
                                        src={
                                            getImgSrc(activeElement?.id)
                                        }
                                    />
                                )}

                                {/* Next left element - hidden underneath */}
                                {nextLeftElement && (
                                    <Box
                                        key={nextLeftElement.id}
                                        width={"300px"}
                                        component={"img"}
                                        height={"400px"}
                                        sx={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            objectFit: "cover",
                                            zIndex: 1,
                                        }}
                                        src={
                                            getImgSrc(nextLeftElement?.id)
                                        }
                                    />
                                )}
                            </Box>

                            {/* VS badge */}
                            <Box
                                sx={{
                                    backgroundColor: COLORS.quiz.primary_text,
                                    padding: 2,
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: "60px",
                                    width: "60px",
                                    flexShrink: 0,
                                    position: "absolute",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    zIndex: 10,
                                }}
                            >
                                <Typography sx={{ fontWeight: "bold" }}>VS.</Typography>

                            </Box>

                            {/* Right side - with stacked images */}
                            <Box sx={{ position: "relative", width: "300px", height: "400px" }}>
                                {/* Next element - will slide left when animating */}
                                {newElement && (
                                    <Box
                                        key={newElement.id}
                                        width={"300px"}
                                        component={"img"}
                                        height={"400px"}
                                        sx={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            objectFit: "cover",
                                            transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
                                            transform: animate === "right"
                                                ? "translateY(-500px)"
                                                : "translateY(0)",
                                            opacity: animate === "right" ? 0 : 1,
                                            zIndex: 2,
                                        }}
                                        src={
                                            getImgSrc(newElement?.id)
                                        }
                                    />
                                )}

                                {/* Next right element - hidden underneath */}
                                {nextRightElement && (
                                    <Box
                                        key={nextRightElement.id}
                                        width={"300px"}
                                        component={"img"}
                                        height={"400px"}
                                        sx={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            objectFit: "cover",
                                            zIndex: 1,
                                        }}
                                        src={
                                            getImgSrc(nextRightElement?.id)
                                        }
                                    />
                                )}
                            </Box>

                        </Box>
                        <Box sx={{ marginTop: 4, display: "flex", gap: 28 }}>
                            <Button
                                sx={{
                                    backgroundColor: COLORS.quiz.success,
                                    width: "100px",
                                    "&:hover": { backgroundColor: COLORS.quiz.success_light },

                                }}
                                onClick={() => handleGuess("left")}
                                variant="contained"
                            >
                                Keep
                            </Button>
                            <Button
                                sx={{
                                    backgroundColor: COLORS.quiz.success,
                                    width: "100px",
                                    "&:hover": { backgroundColor: COLORS.quiz.success_light },

                                }}
                                onClick={() => handleGuess("right")}
                                variant="contained"
                            >
                                Keep
                            </Button>
                        </Box>
                    </Box>

                    {/* Left text - positioned absolutely */}
                    {activeElement && (
                        <Box
                            sx={{
                                position: "absolute",
                                left: "7%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 1,
                                color: "white",
                                maxWidth: "250px",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "24px",
                                    wordWrap: "break-word",
                                    textAlign: "center",
                                    whiteSpace: "break-spaces",
                                    fontWeight: "bold"
                                }}
                            >
                                {activeElement.Name}
                            </Typography>
                            <Typography>from</Typography>
                            <Typography sx={{ fontSize: "28px", textAlign: "center" }}>
                                {(activeElement as Character).Anime}
                            </Typography>
                        </Box>
                    )}

                    {/* Right buttons - positioned absolutely */}
                    {newElement && (
                        <Box
                            sx={{
                                position: "absolute",
                                right: "7%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 1,
                                color: "white",
                                maxWidth: "250px",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "24px",
                                    wordWrap: "break-word",
                                    textAlign: "center",
                                    whiteSpace: "break-spaces",
                                    fontWeight: "bold"
                                }}
                            >
                                {newElement.Name}
                            </Typography>
                            <Typography>from</Typography>
                            <Typography sx={{ fontSize: "28px", textAlign: "center" }}>
                                {(newElement as Character).Anime}
                            </Typography>

                        </Box>
                    )}
                </Box>

            </Box>
        </Box>
    );
};

export default KeepOrPass
