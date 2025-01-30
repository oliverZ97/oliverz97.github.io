import { Box, Button, Typography } from "@mui/material";
import { getImgSrc } from "common/quizUtils";
import { Character } from "common/types";
import { AnimeAutocomplete } from "components/AnimeAutocomplete";
import { CharacterAutocomplete } from "components/CharacterAutocomplete";
import { SyntheticEvent, useEffect, useState } from "react";
import { COLORS } from "styling/constants";

interface ImageCharacterQuizProps {
    charData: Character[];
    animeData: string[];
    getRandomCharacter: () => Character;
    setStreak: () => void;
}

interface ImageTarget {
    character: Character | null;
    anime: string;
    isCharacterCorrect: boolean;
    isAnimeCorrect: boolean;
}

const BASEPOINTS_ANIME = 1000;
const BASEPOINTS_CHAR = 1500;

export default function ImageCharacterQuiz({ charData, getRandomCharacter, animeData, setStreak }: ImageCharacterQuizProps) {

    const [isSolving, setIsSolving] = useState(false)
    const [elements, setElements] = useState<ImageTarget[]>([
        { character: null, anime: '', isCharacterCorrect: false, isAnimeCorrect: false },
        { character: null, anime: '', isCharacterCorrect: false, isAnimeCorrect: false },
        { character: null, anime: '', isCharacterCorrect: false, isAnimeCorrect: false },
        { character: null, anime: '', isCharacterCorrect: false, isAnimeCorrect: false },
    ]);
    const [targets, setTargets] = useState<Character[] | null>(null);
    const [score, setScore] = useState(0);

    useEffect(() => {
        if (!targets) {
            resetTargets();
        }
    })

    useEffect(() => {
        if (isSolving) {
            checkCorrectAnswers();
        }
    }, [isSolving])

    function resetImageQuiz() {
        setElements([
            { character: null, anime: '', isCharacterCorrect: false, isAnimeCorrect: false },
            { character: null, anime: '', isCharacterCorrect: false, isAnimeCorrect: false },
            { character: null, anime: '', isCharacterCorrect: false, isAnimeCorrect: false },
            { character: null, anime: '', isCharacterCorrect: false, isAnimeCorrect: false },
        ])
        resetTargets();
        setScore(0);
        setIsSolving(false);
    }

    function resetTargets() {
        const targetCharacters = getRandomCharacterArray(4);
        const targets = targetCharacters
        setTargets(targets)
    }

    const handleCharacterChange = (event: SyntheticEvent<Element, Event>, value: Character | null, reason: any, id?: number) => {
        if (typeof id === "number") {
            const elementCopy = [...elements];
            elementCopy[id].character = value;
            setElements(elementCopy)
        }
    };

    const handleAnimeChange = (event: SyntheticEvent<Element, Event>, value: string | null, reason: any, id?: number) => {
        if (typeof id === "number" && value) {
            const elementCopy = [...elements];
            elementCopy[id].anime = value;
            setElements(elementCopy)
        }
    };

    function getRandomCharacterArray(count: number) {
        let counter = 0
        let chars: Character[] = []
        while (counter < Math.max(0, count)) {
            const char = getRandomCharacter();
            if (!chars.some((item) => item.Name === char.Name)) {
                chars.push(char);
                counter++;
            }
        }
        return chars
    }

    function checkCorrectAnswers() {
        if (targets) {
            const selectionCopy = [...elements]
            let correctAnime = 0;
            let correctCharacter = 0;
            for (let i = 0; i < targets?.length; i++) {
                const target = targets[i];
                const selection = selectionCopy[i];
                if (selection.anime === target.Anime) {
                    selection.isAnimeCorrect = true;
                    correctAnime++;
                } else {
                    selection.anime = target.Anime;
                    selection.isAnimeCorrect = false;
                }
                if (selection.character?.Name === target.Name) {
                    selection.isCharacterCorrect = true;
                    correctCharacter++
                } else {
                    selection.character = target;
                    selection.isCharacterCorrect = false;
                }
            }
            const finalScore = calculatePoints(correctAnime, correctCharacter);
            setScore(finalScore)
            setElements(selectionCopy);
            setStreak();
        }
    }

    function calculatePoints(animeCounter: number, charCounter: number) {
        const animePoints = animeCounter * BASEPOINTS_ANIME;
        const charPoints = charCounter * BASEPOINTS_CHAR
        return animePoints + charPoints
    }

    return (
        <Box sx={{ backgroundColor: COLORS.quiz.secondary, padding: 4, borderRadius: "16px", border: `1px solid ${COLORS.quiz.light}` }}>

            <Box >
                <Box sx={{ display: "flex", gap: 4 }}>
                    {targets && targets.map((char: Character, index) => (<Box key={char.Name} sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", gap: 2 }}>
                        <Box width={"200px"} component={"img"} src={getImgSrc(char.Name)}></Box>
                        {!isSolving && <CharacterAutocomplete width={200} charData={charData} disabled={false} value={elements[index].character} handleSearchChange={handleCharacterChange} id={index}></CharacterAutocomplete>}
                        {!isSolving && <AnimeAutocomplete width={200} animeData={animeData} disabled={false} value={elements[index].anime} handleSearchChange={handleAnimeChange} id={index}></AnimeAutocomplete>}
                        {isSolving && <Box sx={{ width: 200 }}>
                            <Typography sx={{ fontWeight: "bold", color: elements[index].isCharacterCorrect ? COLORS.quiz.correct : COLORS.quiz.failed, marginBottom: 1 }}>{elements[index].character?.Name ?? "-"}</Typography>
                            <Typography sx={{ fontWeight: "bold", color: elements[index].isAnimeCorrect ? COLORS.quiz.correct : COLORS.quiz.failed, whiteSpace: "break-spaces" }}>{elements[index].anime === "" ? "-" : elements[index].anime}</Typography>
                        </Box>}
                    </Box>))}
                </Box>
            </Box>
            <Box sx={{
                display: "flex", justifyContent: "space-between", marginTop: 4
            }}>
                <Button sx={{
                    color: COLORS.quiz.tertiary,
                    borderColor: COLORS.quiz.tertiary,
                    "&:hover": {
                        fontWeight: "bold",
                        borderColor: COLORS.quiz.tertiary,
                    }
                }} variant="outlined" onClick={resetImageQuiz}>Reset</Button>
                {isSolving && <Typography fontSize={"24px"}>🏆 {score}</Typography>}
                <Button sx={{
                    backgroundColor: COLORS.quiz.tertiary, "&:hover": {
                        backgroundColor: COLORS.quiz.tertiary_hover
                    }
                }} variant="contained" onClick={() => setIsSolving(true)}>Solve</Button>


            </Box>
        </Box>
    )
}