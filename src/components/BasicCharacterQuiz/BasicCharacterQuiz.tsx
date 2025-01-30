import { Box, Typography } from "@mui/material";
import { RevealCard } from "components/RevealCard";
import { COLORS } from "styling/constants";
import CharacterList from "./CharacterList";
import { SearchBar } from "./SearchBar";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Character } from "common/types";
import JSConfetti from "js-confetti";
import { compareObjects, getImgSrc } from "common/quizUtils";
import { Score } from "pages/Home";

interface HintRef {
    resetHint: () => void;
}

const BASEPOINTS = 200;
const HINTPOINTS = 750;
const REDUCEFACTOR = 10;

interface BasicCharacterQuizProps {
    charData: Character[];
    getRandomCharacter: () => Character;
    setStreak: () => void;
}

export default function BasicCharacterQuiz({ charData, getRandomCharacter, setStreak }: BasicCharacterQuizProps) {
    const [searchHistory, setSearchHistory] = useState<Character[]>([]);
    const [selectedOption, setSelectedOption] = useState<Character | null>(null);
    const [targetChar, setTargetCharacter] = useState<Character | null>(null);
    const [points, setPoints] = useState(10000);
    const [usedHints, setUsedHints] = useState(0);
    const [isCorrect, setIsCorrect] = useState(false);
    const [localCharData, setLocalCharData] = useState<Character[]>([]);
    const [scores, setScores] = useState<Score[]>([]);


    const genreHintRef = useRef<HintRef | null>(null);
    const animeHintRef = useRef<HintRef | null>(null);
    const editorialHintRef = useRef<HintRef | null>(null);

    useEffect(() => {
        if (charData.length > 0 && localCharData.length === 0) {
            setLocalCharData(charData)
        }
    }, [localCharData, charData]);

    useEffect(() => {
        if (localCharData.length > 0 && !targetChar) {
            init();
        }
    }, [localCharData, init])

    useEffect(() => {
        if (usedHints > 0) {
            const reducePoints = usedHints * HINTPOINTS
            setPoints(points - reducePoints < 0 ? 0 : points - reducePoints);
        }
    }, [usedHints])

    useEffect(() => {
        if (selectedOption) {
            setTimeout(() => {
                setSelectedOption(null);
            }, 100)
        }

    }, [selectedOption]);


    useEffect(() => {
        //get scores
        const scores = localStorage.getItem("scores");
        if (scores) {
            const scoreArr = JSON.parse(scores) as Score[];

            const topThree = scoreArr.slice(0, 3);
            setScores(topThree);
        }
    }, [])

    function resetQuiz() {
        setLocalCharData([...charData.sort((a, b) => a.Name < b.Name ? -1 : 1)])
        setSearchHistory([]);
        setPoints(10000);
        setUsedHints(0);
        if (genreHintRef.current) {
            genreHintRef.current.resetHint();
        }
        if (animeHintRef.current) {
            animeHintRef?.current.resetHint();
        }
        if (editorialHintRef.current) {
            editorialHintRef?.current.resetHint();
        }
    }

    function init() {
        setIsCorrect(false)
        resetQuiz()

        //select random character
        const target = getRandomCharacter();
        setTargetCharacter(target as Character);
    }

    function removeOptionFromArray(value: Character) {
        const index = localCharData.indexOf(value);
        const tempArray = localCharData;
        tempArray.splice(index, 1);
        setLocalCharData(tempArray);
    }

    function calculateSelectionPoints(correctFieldCount: number) {
        const baseValue = ((Math.max(searchHistory.length, 1)) * BASEPOINTS);
        let roundPoints = baseValue - correctFieldCount * REDUCEFACTOR;
        setPoints(points - roundPoints < 0 ? 0 : points - roundPoints);
    }

    function handleSearchChange(event: SyntheticEvent<Element, Event>, value: Character | null, reason: any) {
        if (value && targetChar) {
            const res = compareObjects(value, targetChar);
            value.ValidFields = res.all;

            setSelectedOption(value);
            removeOptionFromArray(value);
            setSearchHistory([value, ...searchHistory]);

            if (res.all.length + 1 === Object.keys(targetChar).length) {
                const jsConfetti = new JSConfetti()
                jsConfetti.addConfetti({
                    emojis: ['🎉', '🍛', '🍣', '✨', '🍜', '🌸', '🍙'],
                    emojiSize: 30,
                })

                setIsCorrect(true)

                //Set Highscore
                const scoreObj = {
                    points: points,
                    date: new Date().toLocaleString("de-DE", { year: "numeric", month: "2-digit", day: "2-digit" })
                }

                let localScores = localStorage.getItem("scores");
                let scores;
                if (localScores) {
                    scores = JSON.parse(localScores);
                    scores.push(scoreObj)
                } else[
                    scores = [
                        scoreObj
                    ]
                ]

                //sort
                scores.sort((a: Score, b: Score) => a.points < b.points ? 1 : -1)
                setScores(scores.slice(0, 3))
                const scoreString = JSON.stringify(scores);
                localStorage.setItem("scores", scoreString);
                setStreak()

                return;
            }


            //calculate point reduce
            calculateSelectionPoints(res.short.length)

        }
    }

    function reducePointsForHint() {
        setUsedHints(usedHints + 1);
    }

    return (
        <Box>
            {scores.length > 0 && <Box sx={{ borderRadius: "16px", backgroundColor: COLORS.quiz.secondary, marginBottom: 4, border: `1px solid ${COLORS.quiz.light}`, display: "flex", flexDirection: "column", alignItems: "center", paddingY: 2 }}>
                <Box sx={{display: "flex"}}>
                {scores.map(((item, index) => <Box key={index} sx={{ display: "flex", flexDirection: "column", alignItems: "center", paddingX: 2, color: "white", backgroundColor: COLORS.quiz.secondary }}>
                    {index === 0 && <Typography fontSize={"24px"}>🏆</Typography>}
                    {index === 1 && <Typography fontSize={"24px"}>🥈</Typography>}
                    {index === 2 && <Typography fontSize={"24px"}>🥉</Typography>}
                    <Typography fontSize={"12px"}>{"Points: " + item.points}</Typography>
                    <Typography fontSize={"12px"}>{"Date: " + item.date}</Typography>
                </Box>))}
                </Box>
            </Box>}

            <Box sx={{ backgroundColor: COLORS.quiz.secondary, padding: 2, borderRadius: "16px", marginBottom: 4, display: "flex", gap: 2, justifyContent: "space-between", border: `1px solid ${COLORS.quiz.light}` }}>
                <RevealCard onReveal={reducePointsForHint} ref={genreHintRef} cardText={targetChar?.Genre ?? ""} cardTitle="Genre"></RevealCard>
                <RevealCard onReveal={reducePointsForHint} ref={animeHintRef} cardText={targetChar?.Anime ?? ""} cardTitle="Anime"></RevealCard>
                <RevealCard onReveal={reducePointsForHint} ref={editorialHintRef} cardText={targetChar?.Editorial_Staff_Hint ?? ""} cardTitle="Editoral Staff Hint"></RevealCard>
            </Box>

            <SearchBar points={points} searchHistory={searchHistory} isCorrect={isCorrect} selectedOption={selectedOption} charData={charData} handleSearchChange={handleSearchChange} init={init}></SearchBar>

            {targetChar && isCorrect && <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Box sx={{ backgroundColor: COLORS.quiz.success, width: "300px", display: "flex", flexDirection: "column", alignItems: "center", paddingX: 2, paddingY: 3, marginTop: 4, borderRadius: "16px" }}>
                    <Typography fontWeight={"bold"} fontSize={"24px"}>{targetChar?.Name}</Typography>
                    <Box width={"200px"} component={"img"} src={getImgSrc(targetChar?.Name)}></Box>
                </Box> </Box>}
            <CharacterList searchHistory={searchHistory} targetChar={targetChar}></CharacterList>

        </Box>
    )
}