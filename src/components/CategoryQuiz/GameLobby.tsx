import React, { useEffect, useState } from "react";
import ably from "./ablyClient";
import {
  Box,
  Button,
  List,
  ListItem,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { COLORS } from "@/styling/constants";
import { GamePhase } from "./types";
import { INPUT_BASE_STYLE, WINDOW_BASE_STYLE } from "./styles";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface LobbyProps {
  members: any[];
  isHost: boolean;
  roomId: string;
  phase: GamePhase;
  totalScores: Record<string, number>;
  onStart: () => void;
  onModeChange?: (mode: "host" | "join") => void;
  onRoomIdChange?: (roomId: string) => void;
}

export const GameLobby = ({
  members,
  isHost,
  onStart,
  onModeChange,
  roomId,
  phase,
  onRoomIdChange,
  totalScores,
}: LobbyProps) => {
  const [mode, setMode] = useState<"host" | "join">("host");

  const handleChange = (event: React.MouseEvent<HTMLElement>, newMode: "host" | "join") => {
    if (newMode !== null) {
      if (onModeChange) onModeChange(newMode);
      setMode(newMode);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      // You could add a toast/snackbar here
      console.log("Copied!");
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  useEffect(() => {});

  return (
    <Box
      sx={{
        ...WINDOW_BASE_STYLE,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "600px",
        width: "30%",
        maxWidth: "300px",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <ToggleButtonGroup
          sx={{ backgroundColor: COLORS.fresh.secondary.main, marginBottom: 2 }}
          value={mode}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
          disabled={members.length > 1 || phase !== "LOBBY"}
        >
          <ToggleButton
            sx={{
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
              },
            }}
            value="host"
          >
            Host Game
          </ToggleButton>
          <ToggleButton
            sx={{
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
              },
            }}
            value="join"
          >
            Join Game
          </ToggleButton>
        </ToggleButtonGroup>
        <Box sx={{ display: "flex", width: "100%", justifyContent: "center", marginBottom: 2 }}>
          {mode === "host" && (
            <Box onClick={handleCopy}>
              <Typography
                sx={{
                  fontSize: "36px",
                  height: "56px",
                  color: COLORS.fresh.primary.main,
                  cursor: "pointer",
                  "&:hover": {
                    color: COLORS.fresh.primary.hover,
                  },
                }}
              >
                <ContentCopyIcon sx={{ mr: 1 }} />
                {roomId}
              </Typography>
            </Box>
          )}
          {mode === "join" && (
            <TextField
              disabled={phase !== "LOBBY"}
              sx={INPUT_BASE_STYLE}
              onPaste={(event) =>
                onRoomIdChange && onRoomIdChange(event.clipboardData.getData("text"))
              }
              placeholder="Paste Room Code Here"
            />
          )}
        </Box>
      </Box>
      <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-start", height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <List sx={{ margin: 0, padding: 0 }}>
            {members.map((m, idx) => (
              <Box
                sx={{
                  border: `1px solid ${COLORS.fresh.primary.main}`,
                  borderRadius: 1,
                  marginBottom: 1,
                  width: "260px",
                }}
              >
                <ListItem
                  sx={{
                    color: COLORS.fresh.primary.main,
                    fontWeight: m.clientId === ably.auth.clientId ? "bold" : "normal",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  key={m.clientId}
                >
                  <Box>
                    {"#" + (idx + 1) + " "}
                    {m.data?.name || "Anonymous"}
                    {m.clientId === ably.auth.clientId && " (You)"}
                  </Box>
                  <Typography
                    sx={{ fontWeight: m.clientId === ably.auth.clientId ? "bold" : "normal" }}
                  >
                    {totalScores[m.clientId] ?? 0}
                  </Typography>
                </ListItem>
              </Box>
            ))}
          </List>
          {isHost && phase === "LOBBY" && (
            <Button
              sx={{
                backgroundColor: COLORS.fresh.secondary.main,
                "&:hover": {
                  backgroundColor: COLORS.fresh.secondary.hover,
                },
              }}
              variant="contained"
              onClick={onStart}
            >
              Start Game
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};
