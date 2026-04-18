import { useEffect, useState } from "react";
import { Submission } from "./types";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { TIMER_STYLING, WINDOW_BASE_STYLE } from "./styles";
import { COLORS } from "@/styling/constants";

interface VotingProps {
  submissions: Submission[];
  myId: string;
  isHost: boolean;
  votingEndTime: number;
  onVote: (targetId: string, approved: boolean) => void;
  onDone: () => void;
}

export const VotingScreen = ({
  submissions,
  myId,
  isHost,
  onVote,
  onDone,
  votingEndTime,
}: VotingProps) => {
  // Track which players we've already voted for locally to disable buttons
  const [votedFor, setVotedFor] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    // 1. Calculate time immediately on mount
    const calculateTime = () => {
      const now = Date.now();
      const diff = Math.max(0, Math.floor((votingEndTime - now) / 1000));
      return diff;
    };

    setTimeLeft(calculateTime());

    // 2. Start the countdown interval
    const timer = setInterval(() => {
      const remaining = calculateTime();
      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(timer);
        onDone();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [votingEndTime, onDone]);

  const handleVote = (id: string, approved: boolean) => {
    setVotedFor((prev) => [...prev, id]);
    onVote(id, approved);
  };

  return (
    <Box sx={{ ...WINDOW_BASE_STYLE, height: "100%" }}>
      <Box
        sx={{
          ...TIMER_STYLING,
          color: timeLeft <= 5 ? "#ff4d4d" : "#333", // Turn red when 5s left
        }}
      >
        {timeLeft}s
      </Box>
      <h2>Review Answers</h2>
      {submissions.map((s) => (
        <Box key={s.playerId}>
          <Box
            sx={{
              // --- 1. GLASS BASE STYLES ---
              position: "relative", // CRITICAL for the gradient pseudo-element
              overflow: "hidden", // CRITICAL to keep the gradient inside the card corners
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderRadius: 2,
              padding: 2,
              mb: 2,
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              color: "#fff", // Set base text color to white for glass contrast

              // Transition for interaction
              transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: `0 8px 40px -5px ${COLORS.fresh.secondary.main}20`, // Add a very subtle colored shadow on hover
              },

              // --- 2. SUBTLE GLOW GRADIENT (Lower Right) ---
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: "-30%", // Offset so it's only partially visible
                right: "0%", // Offset so it's only partially visible
                left: "0%",
                width: "200%", // The size of the "glow bubble"
                height: "80%",

                // Radial Gradient using YOUR color
                // We add alpha transparency (e.g., 20% opacity) for subtlety
                background: `radial-gradient(circle, ${COLORS.fresh.secondary.main}30 0%, transparent 70%)`,

                filter: "blur(20px)", // Extra blur to soften the gradient
                zIndex: -1, // Puts the gradient *behind* the text/content
              },
            }}
          >
            {/* --- CONTENT (Slightly dimmed for contrast) --- */}
            <Typography sx={{ fontWeight: "bold", color: "rgba(255,255,255,0.7)" }}>
              {s.playerName}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography sx={{ fontSize: "24px", my: 1, color: "#fff", fontWeight: "300" }}>
                {s.answer ? s.answer : "-"}
              </Typography>

              {isHost && (
                <Typography
                  sx={{
                    background: "rgba(255,255,255,0.1)",
                    padding: "4px 8px",
                    borderRadius: "12px",
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  ❤️ {s.votes}
                </Typography>
              )}
            </Box>

            {/* --- VOTING SECTION --- */}
            {s.playerId !== myId && !votedFor.includes(s.playerId) && (
              <Box sx={{ display: "flex", gap: 1, mt: 2, position: "relative", zIndex: 1 }}>
                {" "}
                {/* zIndex keeps buttons clickable over gradient */}
                <IconButton
                  sx={{
                    background: "rgba(255,255,255,0.1)",
                    padding: "4px 8px",
                    borderRadius: "12px",
                    "&:hover": {
                      background: "rgba(255,255,255,0.2)",
                    },
                  }}
                  onClick={() => handleVote(s.playerId, true)}
                >
                  ❤️
                </IconButton>
                <IconButton
                  sx={{
                    background: "rgba(255,255,255,0.1)",
                    padding: "4px 8px",
                    borderRadius: "12px",
                    "&:hover": {
                      background: "rgba(255,255,255,0.2)",
                    },
                  }}
                  onClick={() => handleVote(s.playerId, false)}
                >
                  👎
                </IconButton>
              </Box>
            )}
          </Box>
        </Box>
      ))}

      {isHost && (
        <Button
          onClick={onDone}
          sx={{
            backgroundColor: COLORS.fresh.secondary.main,
            "&:hover": {
              backgroundColor: COLORS.fresh.secondary.hover,
            },
          }}
          variant="contained"
        >
          Finish Voting
        </Button>
      )}
    </Box>
  );
};
