import { Box, Typography } from "@mui/material"
import { COLORS } from "styling/constants"

export const LemonButton = ({ onClick, text }: { onClick: (event: any) => void, text: string }) => {
    return (
        <Box
            component={"button"}
            sx={{
                backgroundColor: COLORS.quiz.main,
                marginTop: 4,
                cursor: "pointer",
                border: `2px solid ${COLORS.quiz.light}`,
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 1,
                width: "300px",
                gap: 2,
                "&:hover .wiggle-img": {
                    animation: "wiggle 2s linear infinite",
                },
                "@keyframes wiggle": {
                    "0%": { transform: "rotate(0deg)" },
                    "10%": { transform: "rotate(8deg)" },
                    "20%": { transform: "rotate(-8deg)" },
                    "30%": { transform: "rotate(7deg)" },
                    "40%": { transform: "rotate(-7deg)" },
                    "50%": { transform: "rotate(6deg)" },
                    "60%": { transform: "rotate(-6deg)" },
                    "70%": { transform: "rotate(5deg)" },
                    "80%": { transform: "rotate(-5deg)" },
                    "90%": { transform: "rotate(5deg)" },
                    "100%": { transform: "rotate(0deg)" },
                },
            }}
            onClick={onClick}
        >
            <Box
                className="wiggle-img"
                component={"img"}
                src={!import.meta.env.PROD
                    ? "/src/assets/Remon.png"
                    : "assets/characters/Remon.png"}
                width={"40px"}
            />
            <Typography flexGrow={1} fontWeight={"bold"} fontSize={"16px"} fontFamily={"roboto"} color={"white"}>
                {text}
            </Typography>
        </Box>
    )
}