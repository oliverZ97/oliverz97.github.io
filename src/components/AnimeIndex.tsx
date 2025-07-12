import { Box, Typography } from "@mui/material";
import { COLORS } from "styling/constants";

interface AnimeIndexProps {
    animeData: string[];
}

export const AnimeIndex = ({ animeData }: AnimeIndexProps) => {
    return (
        <Box>
            <Typography
                sx={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    marginBottom: 2,
                    color: COLORS.quiz.primary_text,
                }}
            >
                Anime Index
            </Typography>
            {
                animeData.map((item, index) => (
                    <>
                        {(index === 0 || item[0] !== animeData[index - 1][0]) && <Typography fontWeight={"bold"} color={"white"} marginTop={1}>{item[0]}</Typography>}
                        <Typography
                            key={item}
                            fontSize={"12px"}
                            color={COLORS.quiz.primary_text}
                        >
                            {item}
                        </Typography>
                    </>
                ))
            }
        </Box>
    );
}