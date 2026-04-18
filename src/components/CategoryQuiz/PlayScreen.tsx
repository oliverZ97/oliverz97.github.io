import { Box, Divider, LinearProgress, TextField, Typography } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { INPUT_BASE_STYLE, TIMER_STYLING, WINDOW_BASE_STYLE } from "./styles";
import { COLORS } from "@/styling/constants";

interface PlayScreenProps {
  category: string;
  endTime: number;
  onTimeUp: (answer: string) => void;
  roundCounter: number;
  maxRounds: number;
}

export const PlayScreen = ({
  category,
  endTime,
  onTimeUp,
  roundCounter,
  maxRounds,
}: PlayScreenProps) => {
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [progress, setProgress] = React.useState(100);

  // Use a Ref to store the "Effective Start Time"
  // This is the exact moment this specific component mounted on the user's screen
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const updateUI = () => {
      const now = Date.now();
      const remainingMs = endTime - now;

      // Calculate total window from the moment the player entered this screen
      // instead of using a fixed 30s setting
      const totalWindow = endTime - startTimeRef.current;

      const remainingSec = Math.max(0, Math.ceil(remainingMs / 1000));

      // Progress is relative to when THIS browser started the phase
      const newProgress = totalWindow > 0 ? Math.max(0, (remainingMs / totalWindow) * 100) : 0;

      setTimeLeft(remainingSec);
      setProgress(newProgress);

      if (remainingMs <= 0) return true;
      return false;
    };

    updateUI();
    const timer = setInterval(() => {
      if (updateUI()) {
        clearInterval(timer);
        onTimeUp(answer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [endTime, answer]);

  return (
    <Box
      sx={{
        ...WINDOW_BASE_STYLE,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Box sx={{ position: "absolute", top: 4, right: 12 }}>
        <Typography sx={{ fontSize: "24px", color: COLORS.fresh.primary.main }}>
          {roundCounter + "/" + maxRounds}
        </Typography>
      </Box>
      <Typography sx={{ color: COLORS.fresh.primary.main, fontSize: "22px" }}>
        Name a character who is
      </Typography>
      <Typography variant="h2" sx={{ color: COLORS.fresh.primary.main, fontWeight: "400" }}>
        {" "}
        {category}
      </Typography>
      <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <Divider
          sx={{ backgroundColor: COLORS.fresh.secondary.main, width: "30%", my: 2 }}
          flexItem
        ></Divider>
      </Box>

      <Box
        sx={{
          ...TIMER_STYLING,
          marginTop: 0,
          color: timeLeft <= 5 ? "#ff4d4d" : COLORS.fresh.primary.main, // Turn red when 5s left
        }}
      >
        {timeLeft}s
      </Box>
      <Box sx={{ width: "60%" }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: "rgba(255,255,255,0.1)",
            // Add a slight glow to the track (optional)
            boxShadow: `0 0 30px ${
              progress < 20 ? "rgba(255, 0, 0, 0.2)" : COLORS.fresh.secondary.main + "AA"
            }`,

            "& .MuiLinearProgress-bar": {
              backgroundColor: progress < 20 ? "red" : COLORS.fresh.secondary.main,
              transition: "none",
              borderRadius: 5, // Keep the bar itself rounded

              // THE GLOW EFFECT
              boxShadow:
                progress < 20
                  ? "0 0 25px #ff0000, 0 0 10px #ff4d4d" // Intense red glow
                  : `0 0 25px ${COLORS.fresh.secondary.main}, 0 0 10px ${COLORS.fresh.secondary.main}`, // Themed glow

              // Optional: Add a "shine" highlight on top of the bar for extra polish
              "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: "50%", // Only top half
                background: "rgba(255, 255, 255, 0.2)",
                borderRadius: 5,
              },
            },
          }}
        />
      </Box>

      <Box style={{ marginTop: "50px" }}>
        <TextField
          id="answer"
          type="text"
          value={answer}
          onChange={(e) => {
            console.log("e: ", e.target.value);
            setAnswer(e.target.value);
          }}
          placeholder="Type here..."
          autoFocus
          sx={INPUT_BASE_STYLE}
          disabled={timeLeft <= 0}
        />
      </Box>

      {timeLeft === 0 && <p>Times up! Submitting...</p>}
    </Box>
  );
};
