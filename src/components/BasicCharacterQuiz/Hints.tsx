import { Box, Typography, useTheme } from "@mui/material"
import { Character, HintRef } from "common/types";
import { RevealCard } from "components/RevealCard"
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

interface HintsProps {
    isCorrect: boolean;
    gaveUp: boolean;
    targetChar: Character | null;
    points: number;
    onClickHint: (param: number) => void;
}

export interface HintFunctionRef {
    resetHints: () => void;
    revealAllHints: () => void;
    handleSetRevealAnimeHint: (state: boolean) => void;
}

export const Hints = forwardRef(({ isCorrect, gaveUp, targetChar, points, onClickHint }: HintsProps, ref) => {
    const genreHintRef = useRef<HintRef | null>(null);
    const animeHintRef = useRef<HintRef | null>(null);
    const studioHintRef = useRef<HintRef | null>(null);
    const tagsHintRef = useRef<HintRef | null>(null);

    const [revealAnimeHint, setRevealAnimeHint] = useState(false);
    const [randomIndices, setRandomIndices] = useState<number[]>([]);

    const theme = useTheme();

    useImperativeHandle(ref, () => ({
        resetHints,
        revealAllHints,
        handleSetRevealAnimeHint
    }));

    useEffect(() => {
        if (targetChar) {
            const maxChars = Math.ceil(targetChar.Name.length * 0.5);
            const allIndices = Array.from({ length: targetChar.Name.length }, (_, i) => i);

            // Shuffle and select maxChars random indices
            const shuffled = allIndices.sort(() => Math.random() - 0.5);
            const selected = shuffled.slice(0, maxChars);

            setRandomIndices(selected);
        }
    }, [targetChar])

    function resetHints() {
        if (genreHintRef.current) {
            genreHintRef.current.resetHint();
        }
        if (animeHintRef.current) {
            animeHintRef?.current.resetHint();
        }
        if (studioHintRef.current) {
            studioHintRef?.current.resetHint();
        }
        if (tagsHintRef.current) {
            tagsHintRef?.current.resetHint();
        }
    }

    function revealAllHints() {
        if (animeHintRef.current) {
            animeHintRef.current.revealHint();
        }
        if (tagsHintRef.current) {
            tagsHintRef.current.revealHint();
        }
        if (genreHintRef.current) {
            genreHintRef.current.revealHint();
        }
        if (studioHintRef.current) {
            studioHintRef.current.revealHint();
        }
    }

    function handleSetRevealAnimeHint(state: boolean) {
        setRevealAnimeHint(state)
    }

    function renderNameHintChar(char: string, index: number, points: number) {
        
        if(randomIndices.includes(index)) {
            return char;
        }

        return "_"
    }

    return (
        <Box
            sx={{
                width: "100%",
                paddingX: 2,
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                justifyContent: "space-between",
                [theme.breakpoints.down("md")]: {
                    flexWrap: "wrap",
                },
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    paddingX: 2,
                    borderRadius: 2,
                    display: "flex",
                    gap: 2,
                    justifyContent: "space-between",
                    [theme.breakpoints.down("md")]: {
                        flexWrap: "wrap",
                    },
                }}
            >
                <RevealCard
                    costs={500}
                    onReveal={
                        isCorrect || gaveUp ? undefined : () => onClickHint(500)
                    }
                    ref={tagsHintRef}
                    cardText={targetChar?.Tags ?? ""}
                    cardTitle="Tags"
                ></RevealCard>
                <RevealCard
                    costs={500}
                    onReveal={
                        isCorrect || gaveUp ? undefined : () => onClickHint(500)
                    }
                    ref={genreHintRef}
                    cardText={
                        [targetChar?.Subgenre1, targetChar?.Subgenre2].join(";") ?? ""
                    }
                    cardTitle="Subgenres"
                ></RevealCard>
                <RevealCard
                    costs={500}
                    onReveal={
                        isCorrect || gaveUp ? undefined : () => onClickHint(500)
                    }
                    ref={studioHintRef}
                    cardText={targetChar?.Studio ?? ""}
                    cardTitle="Studio"
                ></RevealCard>
                <RevealCard
                    costs={revealAnimeHint ? 0 : 1000}
                    onReveal={
                        isCorrect || gaveUp
                            ? undefined
                            : () => onClickHint(1000)
                    }
                    ref={animeHintRef}
                    cardText={targetChar?.Anime ?? ""}
                    cardTitle="Anime"
                    revealFromOutside={revealAnimeHint}
                ></RevealCard>
            </Box>
            <Box sx={{ display: "flex", gap: 1, width: "100%", justifyContent: "center" }}>
                {Array.from(targetChar?.Name ?? "").map((char, index) => (
                    <Typography sx={{ color: "white" }} key={index}>{renderNameHintChar(char, index, points)}</Typography>
                ))}
            </Box>
        </Box >
    )
})