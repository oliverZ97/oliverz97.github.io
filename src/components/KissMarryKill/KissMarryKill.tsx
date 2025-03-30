import { Box, Typography } from "@mui/material"
import { COLORS } from "styling/constants"

export const KissMarryKill = () => {

    return (
    <Box position={"relative"}>
      <Box
        sx={{
          position: "relative",
          backgroundColor: COLORS.quiz.secondary,
          padding: 4,
          borderRadius: "16px",
          border: `1px solid ${COLORS.quiz.light}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "500px",
        }}
      >
        <Typography>Coming Soon</Typography>
      </Box>
    </Box>
    )
}