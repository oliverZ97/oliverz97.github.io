import {
    Box,
    Button,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import { getAnimeImgSrc, getImgSrc } from "common/quizUtils";
import { Anime, Character, Score, StatisticFields } from "common/types";
import { useEffect, useState } from "react";
import { COLORS } from "styling/constants";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { theme } from "styling/theme";
import { QUIZ_KEY } from "common/utils";
import { getHighscoresFromProfile, getStatisticField, saveFieldToTotalStatistics, saveHighscoreToProfile } from "common/profileUtils";
import { useProfile } from "./Profile/ProfileContext";

interface HigherLowerProps {
    charData: Character[];
    animeData: Anime[];
}

export const HigherLower = ({ charData, animeData }: HigherLowerProps) => {
    const [mode, setMode] = useState<"height" | "animeReleaseYear">("height");
    const [score, setScore] = useState<Score | null>(null);
    const [activeElement, setActiveElement] = useState<Character | Anime | null>(
        null
    );
    const [newElement, setNewElement] = useState<Character | Anime | null>(null);
    const [secondNextElement, setSecondNextElement] = useState<
        Character | Anime | null
    >(null);
    const [points, setPoints] = useState<number>(0);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const [showGameOver, setShowGameOver] = useState<boolean>(false);

    const { refreshKey } = useProfile();

    useEffect(() => {
        if (mode === "height") {
            const score = getHighscoresFromProfile(QUIZ_KEY.HIGHERLOWER_HEIGHT);
            setScore(score[0] || null);
        } else if (mode === "animeReleaseYear") {
            const score = getHighscoresFromProfile(QUIZ_KEY.HIGHERLOWER_ANIME);
            setScore(score[0] || null);
        }
    }, [refreshKey, mode]);

    function updateScores(score: Score) {
        const highscores = getHighscoresFromProfile(
            mode === "height"
                ? QUIZ_KEY.HIGHERLOWER_HEIGHT
                : QUIZ_KEY.HIGHERLOWER_ANIME
        );
        if (score && (highscores.length === 0 || score.points > highscores[0].points)) {
            saveHighscoreToProfile(QUIZ_KEY.HIGHERLOWER_HEIGHT, score);
            setScore(score);
        }
    }

    function init() {
        setPoints(0);
        setShowGameOver(false);
        if (mode === "height") {
            const filteredChars = charData.filter((char) => char.Height !== null);
            const randomChar =
                filteredChars[Math.floor(Math.random() * filteredChars.length)];
            let anotherRandomChar =
                filteredChars[Math.floor(Math.random() * filteredChars.length)];
            let yetAnotherRandomChar =
                filteredChars[Math.floor(Math.random() * filteredChars.length)];
            setActiveElement(randomChar);
            setNewElement(anotherRandomChar);
            setSecondNextElement(yetAnotherRandomChar);
        } else if (mode === "animeReleaseYear") {
            const randomAnime =
                animeData[Math.floor(Math.random() * animeData.length)];
            setActiveElement(randomAnime);
            let anotherRandomAnime =
                animeData[Math.floor(Math.random() * animeData.length)];
            setNewElement(anotherRandomAnime);
            let yetAnotherRandomAnime =
                animeData[Math.floor(Math.random() * animeData.length)];
            setSecondNextElement(yetAnotherRandomAnime);
        }
    }

    function handleGuess(guess: "higher" | "lower") {
        if (mode === "height") {
            checkHeightGuess(guess);
        } else if (mode === "animeReleaseYear") {
            checkAnimeReleaseYearGuess(guess);
        }
    }

    function handleCharacterChange() {
        setActiveElement(newElement);
        setNewElement(secondNextElement);

        const filteredChars = charData.filter((char) => char.Height !== null);
        const anotherRandomChar =
            filteredChars[Math.floor(Math.random() * filteredChars.length)];
        if (
            anotherRandomChar.id === activeElement?.id ||
            anotherRandomChar.id === newElement?.id
        ) {
            //avoid duplicates
            handleCharacterChange();
            return;
        }
        setSecondNextElement(anotherRandomChar);
    }

    function handleAnimeChange() {
        setActiveElement(newElement);
        setNewElement(secondNextElement);

        const randomAnime = animeData[Math.floor(Math.random() * animeData.length)];
        if (
            randomAnime.id === newElement?.id ||
            randomAnime.id === secondNextElement?.id
        ) {
            //avoid duplicates
            handleAnimeChange();
            return;
        }
        setSecondNextElement(randomAnime);
    }

    function checkHeightGuess(guess: "higher" | "lower") {
        if (
            activeElement &&
            newElement &&
            "Height" in activeElement &&
            "Height" in newElement
        ) {
            if (guess === "higher" && newElement.Height! > activeElement.Height!) {
                setPoints(points + 1);
                // Trigger animation
                setIsAnimating(true);

                // After animation completes, update state
                setTimeout(() => {
                    handleCharacterChange();
                    setIsAnimating(false);
                }, 500);
            } else if (
                guess === "lower" &&
                newElement.Height! < activeElement.Height!
            ) {
                setPoints(points + 1);
                // Trigger animation
                setIsAnimating(true);

                // After animation completes, update state
                setTimeout(() => {
                    handleCharacterChange();
                    setIsAnimating(false);
                }, 500);
            } else {
                setShowGameOver(true);
                const scoreObj = {
                    points: points ?? 0,
                    date: new Date().toLocaleString("de-DE", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                    }),
                };
                saveFieldToTotalStatistics(
                    [StatisticFields.higherlowerHeightGamesPlayed],
                    (getStatisticField(StatisticFields.higherlowerHeightGamesPlayed) ?? 0) + 1
                );
                saveFieldToTotalStatistics(
                    [StatisticFields.higherlowerHeightPointsTotal],
                    (getStatisticField(StatisticFields.higherlowerHeightPointsTotal) ?? 0) +
                    (points ?? 0)
                );

                updateScores(scoreObj);
                return;
            }
        }
    }

    function checkAnimeReleaseYearGuess(guess: "higher" | "lower") {
        if (
            activeElement &&
            newElement &&
            "First_Release_Year" in activeElement &&
            "First_Release_Year" in newElement
        ) {
            if (
                guess === "higher" &&
                newElement.First_Release_Year! > activeElement.First_Release_Year!
            ) {
                setPoints(points + 1);
                // Trigger animation
                setIsAnimating(true);

                // After animation completes, update state
                setTimeout(() => {
                    handleAnimeChange();
                    setIsAnimating(false);
                }, 500);
            } else if (
                guess === "lower" &&
                newElement.First_Release_Year! < activeElement.First_Release_Year!
            ) {
                setPoints(points + 1);
                // Trigger animation
                setIsAnimating(true);

                // After animation completes, update state
                setTimeout(() => {
                    handleAnimeChange();
                    setIsAnimating(false);
                }, 500);
            } else if (
                newElement.First_Release_Year! === activeElement.First_Release_Year!
            ) {
                setPoints(points + 1);
                // Trigger animation
                setIsAnimating(true);

                // After animation completes, update state
                setTimeout(() => {
                    handleAnimeChange();
                    setIsAnimating(false);
                }, 500);
            } else {
                const scoreObj = {
                    points: points ?? 0,
                    date: new Date().toLocaleString("de-DE", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                    }),
                };
                saveHighscoreToProfile(QUIZ_KEY.HIGHERLOWER_ANIME, scoreObj);
                saveFieldToTotalStatistics(
                    [StatisticFields.higherlowerAnimeGamesPlayed],
                    (getStatisticField(StatisticFields.higherlowerAnimeGamesPlayed) ?? 0) + 1
                );
                saveFieldToTotalStatistics(
                    [StatisticFields.higherlowerAnimePointsTotal],
                    (getStatisticField(StatisticFields.higherlowerAnimePointsTotal) ?? 0) +
                    (points ?? 0)
                );
                updateScores(scoreObj);
                init();
                return;
            }
        }
    }

    useEffect(() => {
        init();
    }, [mode]);

    return (
        <Box>
            <Box
                sx={{
                    position: "relative",
                    background: COLORS.gradient,
                    padding: 4,
                    borderRadius: 2,
                    border: `1px solid ${COLORS.quiz.light}`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: 4,
                }}
            >
                {score && <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        paddingX: 2,
                        color: "white",
                        position: "absolute",
                        left: 20,
                        top: "50%",
                        transform: "translateY(-50%)",
                    }}
                >
                    <Typography fontSize={"24px"}>🏆</Typography>
                    <Typography fontSize={"12px"}>
                        {"Points: " + score.points}
                    </Typography>
                    <Typography fontSize={"12px"}>
                        {"Date: " + score.date}
                    </Typography>
                </Box>}
                <Typography
                    sx={{ fontWeight: "bold", fontSize: "28px", color: "white" }}
                >
                    <Typography
                        sx={{
                            color: COLORS.quiz.success,
                            fontWeight: "bold",
                            fontSize: "32px",
                        }}
                        component={"span"}
                    >
                        Higher
                    </Typography>{" "}
                    or{" "}
                    <Typography
                        sx={{
                            color: COLORS.quiz.failed,
                            fontWeight: "bold",
                            fontSize: "32px",
                        }}
                        component={"span"}
                    >
                        Lower
                    </Typography>
                </Typography>
                <Typography
                    sx={{
                        color: "white",
                        marginBottom: 1,
                        fontSize: "20px",
                        fontWeight: "bold",
                        marginTop: 2,
                    }}
                >
                    Game Mode
                </Typography>
                <ToggleButtonGroup
                    value={mode}
                    exclusive
                    onChange={(event, newMode) => {
                        if (newMode !== null) {
                            setMode(newMode);
                        }
                    }}
                    aria-label="game mode"
                    sx={{ backgroundColor: COLORS.quiz.main }}
                >
                    <ToggleButton value="height" aria-label="height">
                        <Typography sx={{ color: mode === "height" ? "white" : "inherit" }}>
                            Height
                        </Typography>
                    </ToggleButton>
                    <ToggleButton
                        sx={{
                            backgroundColor:
                                mode === "animeReleaseYear" ? COLORS.quiz.light : "transparent",
                        }}
                        value="animeReleaseYear"
                        aria-label="animeReleaseYear"
                    >
                        <Typography
                            sx={{ color: mode === "animeReleaseYear" ? "white" : "inherit" }}
                        >
                            Anime Release Year
                        </Typography>
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <Box
                sx={{
                    position: "relative",
                    background: COLORS.gradient,
                    padding: 4,
                    borderRadius: 2,
                    border: `1px solid ${COLORS.quiz.light}`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minHeight: "500px",
                }}
            >
                <Box
                    position={"absolute"}
                    sx={{
                        left: 20,
                        top: 20,
                        [theme.breakpoints.down("md")]: {
                            left: 60,
                        },
                    }}
                >
                    <Typography
                        sx={{ color: "white", fontSize: "24px", paddingLeft: "2px" }}
                    >{`${String(points).padStart(4, "0")}`}</Typography>
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
                    {/* Centered images and VS box */}
                    <Box
                        sx={{ display: "flex", alignItems: "center", position: "relative" }}
                    >
                        {/* Left image - activeElement */}
                        {activeElement && (
                            <Box
                                key={activeElement.id}
                                width={"300px"}
                                component={"img"}
                                height={"400px"}
                                sx={{
                                    objectFit: "cover",
                                }}
                                src={
                                    mode === "height"
                                        ? getImgSrc(activeElement?.id)
                                        : getAnimeImgSrc(activeElement?.id)
                                }
                            ></Box>
                        )}

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
                                        transition: "transform 0.5s ease-in-out",
                                        transform: isAnimating
                                            ? "translateX(-300px)"
                                            : "translateX(0)",
                                        zIndex: 2,
                                    }}
                                    src={
                                        mode === "height"
                                            ? getImgSrc(newElement?.id)
                                            : getAnimeImgSrc(newElement?.id)
                                    }
                                />
                            )}

                            {/* Second next element - hidden underneath */}
                            {secondNextElement && (
                                <Box
                                    key={secondNextElement.id}
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
                                        mode === "height"
                                            ? getImgSrc(secondNextElement?.id)
                                            : getAnimeImgSrc(secondNextElement?.id)
                                    }
                                />
                            )}
                        </Box>
                    </Box>

                    {showGameOver && <Box sx={{ position: "absolute", width: "600px", height: "400px", backgroundColor: "rgba(0, 0, 0, 0.9)", zIndex: 20, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", }}>
                        <Typography sx={{ color: "white", fontSize: "32px", fontWeight: "bold" }}>Game Over</Typography>
                        <Typography sx={{ color: "white", fontSize: "24px", marginTop: 2 }}>Your final score: {points}</Typography>
                        <Button variant="contained" sx={{ marginTop: 3 }} onClick={() => init()}>Restart</Button>
                    </Box>}

                    {/* Left text - positioned absolutely */}
                    {activeElement && !showGameOver && mode === "height" && (
                        <Box
                            sx={{
                                position: "absolute",
                                left: "7%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 1,
                                color: "white",
                                maxWidth: "200px",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "24px",
                                    wordWrap: "break-word",
                                    textAlign: "center",
                                    whiteSpace: "break-spaces",
                                }}
                            >
                                {activeElement.Name}
                            </Typography>
                            <Typography>is</Typography>
                            <Typography sx={{ fontWeight: "bold", fontSize: "28px" }}>
                                {(activeElement as Character).Height} cm
                            </Typography>
                        </Box>
                    )}

                    {activeElement && !showGameOver && mode === "animeReleaseYear" && (
                        <Box
                            sx={{
                                position: "absolute",
                                left: "7%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 1,
                                color: "white",
                                maxWidth: "200px",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "24px",
                                    wordWrap: "break-word",
                                    textAlign: "center",
                                    whiteSpace: "break-spaces",
                                }}
                            >
                                {activeElement.Name}
                            </Typography>
                            <Typography>is from</Typography>
                            <Typography sx={{ fontWeight: "bold", fontSize: "28px" }}>
                                {(activeElement as Anime).First_Release_Year}
                            </Typography>
                        </Box>
                    )}

                    {/* Right buttons - positioned absolutely */}
                    {newElement && !showGameOver && mode === "height" && (
                        <Box
                            sx={{
                                position: "absolute",
                                right: "7%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 1,
                                color: "white",
                                maxWidth: "200px",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "24px",
                                    wordWrap: "break-word",
                                    textAlign: "center",
                                    whiteSpace: "break-spaces",
                                }}
                            >
                                {newElement.Name}'s height is
                            </Typography>
                            <Button
                                sx={{
                                    backgroundColor: COLORS.quiz.success,
                                    width: "100px",
                                    "&:hover": { backgroundColor: COLORS.quiz.success_light },
                                }}
                                onClick={() => handleGuess("higher")}
                                endIcon={<KeyboardArrowUpIcon />}
                                variant="contained"
                            >
                                Higher
                            </Button>
                            <Button
                                sx={{
                                    backgroundColor: COLORS.quiz.failed,
                                    width: "100px",
                                    "&:hover": { backgroundColor: COLORS.quiz.failed_light },
                                }}
                                onClick={() => handleGuess("lower")}
                                endIcon={<KeyboardArrowDownIcon />}
                                variant="contained"
                            >
                                Lower
                            </Button>
                        </Box>
                    )}

                    {newElement && !showGameOver && mode === "animeReleaseYear" && (
                        <Box
                            sx={{
                                position: "absolute",
                                right: "7%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 1,
                                color: "white",
                                maxWidth: "200px",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "24px",
                                    wordWrap: "break-word",
                                    textAlign: "center",
                                    whiteSpace: "break-spaces",
                                }}
                            >
                                {newElement.Name}'s first release year is
                            </Typography>
                            <Button
                                sx={{
                                    backgroundColor: COLORS.quiz.success,
                                    width: "100px",
                                    "&:hover": { backgroundColor: COLORS.quiz.success_light },
                                }}
                                onClick={() => handleGuess("higher")}
                                endIcon={<KeyboardArrowUpIcon />}
                                variant="contained"
                            >
                                Higher
                            </Button>
                            <Button
                                sx={{
                                    backgroundColor: COLORS.quiz.failed,
                                    width: "100px",
                                    "&:hover": { backgroundColor: COLORS.quiz.failed_light },
                                }}
                                onClick={() => handleGuess("lower")}
                                endIcon={<KeyboardArrowDownIcon />}
                                variant="contained"
                            >
                                Lower
                            </Button>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};
