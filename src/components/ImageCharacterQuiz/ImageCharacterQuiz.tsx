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
}

interface ImageTarget {
    character: Character | null;
    anime: string;
    isCharacterCorrect: boolean;
    isAnimeCorrect: boolean;
}

export default function ImageCharacterQuiz({ charData, getRandomCharacter, animeData }: ImageCharacterQuizProps) {

    const [isSolving, setIsSolving] = useState(false)
    const [elements, setElements] = useState<ImageTarget[]>([
        { character: null, anime: '', isCharacterCorrect: false, isAnimeCorrect: false },
        { character: null, anime: '', isCharacterCorrect: false, isAnimeCorrect: false },
        { character: null, anime: '', isCharacterCorrect: false, isAnimeCorrect: false },
        { character: null, anime: '', isCharacterCorrect: false, isAnimeCorrect: false },
    ]);
    const [targets, setTargets] = useState<Character[] | null>(null)

    useEffect(() => {
        if(!targets) {
            const targetCharacters = getRandomCharacterArray(4);
            const targets = targetCharacters
            setTargets(targets)
        }
    })

    useEffect(() => {
        if(isSolving) {
            checkCorrectAnswers();
        }
    }, [isSolving])

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
        if(targets) {   
            const selectionCopy = [...elements]
            for(let i = 0; i < targets?.length; i++) {
                const target = targets[i];
                const selection = selectionCopy[i];
                if(selection.anime === target.Anime) {
                    selection.isAnimeCorrect = true;
                } else {
                    selection.anime = target.Anime;
                    selection.isAnimeCorrect = false;
                }
                if(selection.character?.Name === target.Name) {
                    selection.isCharacterCorrect = true;
                } else {
                    selection.character = target;
                    selection.isCharacterCorrect = false;
                }
            }
            setElements(selectionCopy)
        }
    }

    return (
        <Box sx={{ backgroundColor: COLORS.quiz.secondary, padding: 2, borderRadius: "16px" }}>

            <Box sx={{ backgroundColor: COLORS.quiz.secondary, padding: 2, borderRadius: "16px" }}>
                <Box sx={{ display: "flex", gap: 4 }}>
                    {targets && targets.map((char: Character, index) => (<Box key={char.Name} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 2 }}>
                        <Box  width={"200px"} component={"img"} src={getImgSrc(char.Name)}></Box>
                        {!isSolving &&<CharacterAutocomplete width={200} charData={charData} disabled={false} value={elements[index].character} handleSearchChange={handleCharacterChange} id={index}></CharacterAutocomplete>}
                        {!isSolving && <AnimeAutocomplete width={200} animeData={animeData} disabled={false} value={elements[index].anime} handleSearchChange={handleAnimeChange} id={index}></AnimeAutocomplete>}
                        {isSolving && <Box>
                            <Typography sx={{fontWeight: "bold", color: elements[index].isCharacterCorrect ? COLORS.quiz.correct : COLORS.quiz.failed}}>{elements[index].character?.Name ?? "-"}</Typography>
                            <Typography sx={{fontWeight: "bold", color: elements[index].isAnimeCorrect ? COLORS.quiz.correct : COLORS.quiz.failed}}>{elements[index].anime === "" ? "-" : elements[index].anime}</Typography>
                            </Box>}
                    </Box>))}
                </Box>
            </Box>
            <Button sx={{backgroundColor: COLORS.quiz.tertiary, "&:hover": {
                backgroundColor: COLORS.quiz.tertiary_hover
            }}} variant="contained" onClick={() => setIsSolving(true)}>Solve</Button>
        </Box>
    )
}