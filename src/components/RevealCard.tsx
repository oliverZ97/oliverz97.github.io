import { Box, Button, Typography } from "@mui/material"
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { COLORS } from "styling/constants";

interface RevealCardProps {
    cardText: string;
    cardTitle: string;
    costs: number;
    onReveal: () => void
}

export const RevealCard = forwardRef(({ cardText, cardTitle, costs, onReveal }: RevealCardProps, ref) => {
    const [revealHint, setRevealHint] = useState(false);

    const resetHint = () => {
        setRevealHint(false);
    };

    useEffect(() => {
        if (revealHint) {
            onReveal();
        }
    }, [revealHint])

    useImperativeHandle(ref, () => ({
        resetHint: resetHint,
    }));

    return (
        <Button sx={{ position: "relative", cursor: "pointer", minWidth: "300px", width: "100%", minHeight: "58px", padding: 0 }} onClick={() => setRevealHint(true)}>
            <Box sx={{ padding: 2, backgroundColor: COLORS.quiz.main, borderRadius: "8px", width: "100%", minHeight: "58px" }}>
                <Typography sx={{ color: COLORS.quiz.primary_text, textTransform: "capitalize" }}>
                    {cardText !== "" ? cardText : "No hint available"}
                </Typography>
            </Box>
            <Box sx={{
                width: "100%",
                position: "absolute",
                zIndex: 2,
                height: "100%",
                borderRadius: "8px",
                backdropFilter: revealHint ? "blur(0px)" : "blur(12px)",
                top: 0,
                background: revealHint ? "rgba(255, 255, 255, 0.0)" : "rgba(255, 255, 255, 0.2)",
                "@keyframes removeBlur": {
                    "0%": {
                        backdropFilter: "blur(12px)",
                        background: "rgba(255, 255, 255, 0.2)",

                    },
                    "100%": {
                        backdropFilter: "blur(0px)",
                        background: "rgba(255, 255, 255, 0.0)",
                    }
                },
                animation: revealHint ? `removeBlur 1000ms ease-in-out` : undefined,

            }}>

            </Box>
            <Box sx={{
                width: "100%",
                padding: 2,
                position: "absolute",
                top: 0,
                borderRadius: "8px",
                zIndex: 3,
                opacity: revealHint ? 0 : 1,
                display: "flex",
                justifyContent: "space-between",
                height: "100%",
                "@keyframes hideTitle": {
                    "0%": {
                        opacity: 1,
                    },
                    "100%": {
                        opacity: 0,
                    }
                },
                animation: revealHint ? `hideTitle 1000ms ease-in-out` : undefined,

            }}>
                <Typography sx={{textTransform: "capitalize", color: "black"}}>{cardTitle}</Typography>
                <Box sx={{padding: 1, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#12616e", borderRadius: "4px"}}>
                <Typography sx={{ color: COLORS.quiz.primary_text }}>
                    {costs}
                </Typography>
                </Box>
            </Box>

        </Button>
    )
})