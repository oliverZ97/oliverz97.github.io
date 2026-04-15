import { Box, Button, ButtonGroup, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import { GameContainer } from "./GameContainer"
import { getCurrentUserProfile } from "common/profileUtils"
import { useState } from "react"
import { generateLobbyKey } from "./utils"
import { COLORS } from "styling/constants"

export const GameWrapper = () => {
    const [roomId, setRoomId] = useState(generateLobbyKey())
    const [mode, setMode] = useState<"host" | "join">("host")

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: "host" | "join",
    ) => {
        if (newAlignment !== null) {
            setMode(newAlignment);
        }
    };

    return (
        <Box sx={{ background: COLORS.gradient, padding: 2, borderRadius: 4, border: `1px solid ${COLORS.quiz.light}`, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <ToggleButtonGroup
                sx={{ backgroundColor: COLORS.quiz.main, marginBottom: 2 }}
                value={mode}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
            >
                <ToggleButton sx={{ width: "110px" }} value="host">Host Game</ToggleButton>
                <ToggleButton sx={{ width: "110px" }} value="join">Join Game</ToggleButton>
            </ToggleButtonGroup>
            <Box sx={{ display: "flex", width: "100%", justifyContent: "center", marginBottom: 2 }}>
                {mode === "host" && <Typography sx={{ fontSize: "36px", height: "56px" }}>{roomId}</Typography>}
                {mode === "join" && <TextField onPaste={(event) => setRoomId(event.clipboardData.getData("text"))} placeholder="Paste Room Code Here" />}
            </Box>
            <GameContainer roomId={roomId} playerName={getCurrentUserProfile()?.username || "Rem"} />
        </Box>
    )
}