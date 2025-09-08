import { Box, DialogContentText, Typography } from "@mui/material";
import { COLORS } from "styling/constants";

export default function HowToPlay() {
    return (
        <Box sx={{ width: "100%" }}>
            <DialogContentText sx={{ color: "white" }}>
                <Typography>
                    This website offers various anime-related quizzes. You can choose
                    between character quizzes, image quizzes, and anime quizzes. Each
                    quiz has a daily mode and an endless mode. You can switch the
                    gamemodes using the upper left menu icon.{" "}
                </Typography>
                <Typography sx={{ marginTop: 2 }}>
                    When guessing for a character or an anime, you will be given clues to help you.
                    Pay attention to the clues and use them to make your guess!
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        marginTop: 2,
                    }}
                >
                    <Box
                        sx={{
                            borderRadius: "50px",
                            backgroundColor: COLORS.quiz.success,
                            border: "2px solid",
                            borderColor: COLORS.quiz.success_light,
                            width: "30px",
                            height: "30px",
                        }}
                    ></Box>
                    <Typography>All Clues Match</Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        marginTop: 2,
                    }}
                >
                    <Box
                        sx={{
                            borderRadius: "50px",
                            backgroundColor: COLORS.quiz.warning,
                            border: "2px solid",
                            borderColor: COLORS.quiz.warning_light,
                            width: "30px",
                            height: "30px",
                        }}
                    ></Box>
                    <Typography>At least one of the Clues Match</Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        marginTop: 2,
                    }}
                >
                    <Box
                        sx={{
                            borderRadius: "50px",
                            backgroundColor: COLORS.quiz.main,
                            border: "2px solid",
                            borderColor: COLORS.quiz.light,
                            width: "30px",
                            height: "30px",
                        }}
                    ></Box>
                    <Typography>None of the Clues Match</Typography>
                </Box>
            </DialogContentText>
        </Box>
    );
}