import React, { useEffect, useState } from 'react';
import ably from './ablyClient';
import { Box, Button, List, ListItem, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { COLORS } from 'styling/constants';
import { generateLobbyKey } from './utils';

interface LobbyProps {
    members: any[];
    isHost: boolean;
    roomId: string;
    onStart: () => void;
    onModeChange?: (mode: "host" | "join") => void
    onRoomIdChange?: (roomId: string) => void;
}

export const GameLobby = ({ members, isHost, onStart, onModeChange, roomId, onRoomIdChange }: LobbyProps) => {
    const [mode, setMode] = useState<"host" | "join">("host")

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newMode: "host" | "join",
    ) => {
        if (newMode !== null) {
            if (onModeChange)
                onModeChange(newMode)
            setMode(newMode);
        }
    };

    useEffect(() => {

    })

    return (
        <Box sx={{
            background: COLORS.fresh.bg.bg_1, padding: 2, borderRadius: 2, border: `1px solid ${COLORS.fresh.primary.main}`, display: "flex", flexDirection: "column", alignItems: "center", minHeight: "600px", width: "25%", maxWidth: "260px", gap: 2
        }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }
            } >
                <ToggleButtonGroup
                    sx={{ backgroundColor: COLORS.fresh.secondary.main, marginBottom: 2 }}
                    value={mode}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                    disabled={members.length > 1}
                >
                    <ToggleButton sx={{
                        color: "rgba(255, 255, 255, 0.7)", // Dimmed text
                        backgroundColor: "transparent",
                        border: "none",

                        // 2. SELECTED STATE
                        "&.Mui-selected": {
                            color: "#FFFFFF", // Bright text
                            backgroundColor: COLORS.fresh.secondary.selected, // Your active background
                        },

                        // 3. HOVER (Ensuring active color stays on hover)
                        "&.Mui-selected:hover": {
                            backgroundColor: COLORS.fresh.secondary.hover,
                            filter: "brightness(1.1)", // Slightly brighten on hover
                        },
                        "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                        }
                    }} value="host">Host Game</ToggleButton>
                    <ToggleButton sx={{
                        color: "rgba(255, 255, 255, 0.7)", // Dimmed text
                        backgroundColor: "transparent",
                        border: "none",

                        // 2. SELECTED STATE
                        "&.Mui-selected": {
                            color: "#FFFFFF", // Bright text
                            backgroundColor: COLORS.fresh.secondary.selected, // Your active background
                        },

                        // 3. HOVER (Ensuring active color stays on hover)
                        "&.Mui-selected:hover": {
                            backgroundColor: COLORS.fresh.secondary.hover,
                            filter: "brightness(1.1)", // Slightly brighten on hover
                        },
                        "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                        }
                    }} value="join">Join Game</ToggleButton>
                </ToggleButtonGroup>
                <Box sx={{ display: "flex", width: "100%", justifyContent: "center", marginBottom: 2 }}>
                    {mode === "host" && <Typography sx={{ fontSize: "36px", height: "56px", color: COLORS.fresh.primary.main }}>{roomId}</Typography>}
                    {mode === "join" && <TextField sx={{
                        // 1. Target the text inside the input
                        "& .MuiInputBase-input": {
                            color: COLORS.fresh.secondary.highlight,
                        },
                        // 2. Target the placeholder text
                        "& .MuiInputBase-input::placeholder": {
                            color: COLORS.fresh.secondary.highlight,
                            opacity: 0.7, // Placeholders usually look better with slight transparency
                        },
                        // 3. Target the border (the "OutlinedInput" fieldset)
                        "& .MuiOutlinedInput-root": {

                            "& fieldset": {
                                borderColor: COLORS.fresh.secondary.highlight,
                            },
                            "&:hover fieldset": {
                                borderColor: COLORS.fresh.secondary.highlight, // Color when hovering
                                borderWidth: '2px',
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: COLORS.fresh.secondary.highlight, // Color when typing
                            },
                        },
                    }} onPaste={(event) => onRoomIdChange && onRoomIdChange(event.clipboardData.getData("text"))} placeholder="Paste Room Code Here" />}
                </Box>
            </Box >
            <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-start", height: "100%" }}>
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                    <List sx={{ margin: 0, padding: 0 }}>
                        {members.map((m, idx) => (
                            <Box sx={{ border: `1px solid ${COLORS.fresh.primary.main}`, borderRadius: 1, marginBottom: 1, width: "200px" }}>
                                <ListItem sx={{ color: COLORS.fresh.primary.main, fontWeight: m.clientId === ably.auth.clientId ? "bold" : "normal" }} key={m.clientId}>
                                    {"#" + (idx + 1) + " "}
                                    {m.data?.name || "Anonymous"}
                                    {m.clientId === ably.auth.clientId && " (You)"}
                                </ListItem>
                            </Box>
                        ))}
                    </List>
                    {isHost && <Button sx={{
                        backgroundColor: COLORS.fresh.primary.main, "&:hover": {
                            backgroundColor: COLORS.fresh.primary.hover
                        }
                    }} variant='contained' onClick={onStart}>Start Game</Button>}
                </Box>
            </Box>

        </Box >

    );
};