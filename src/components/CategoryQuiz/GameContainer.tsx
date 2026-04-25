import React, { useEffect, useState } from "react";
import categories from "../../data/categories.json";
import { useGameRoom } from "./useGameRoom";
import { GameLobby } from "./GameLobby";
import { PlayScreen } from "./PlayScreen";
import { VotingScreen } from "./VotingScreen";
import { getCurrentUserProfile } from "@/common/profileUtils";
import { generateLobbyKey } from "./utils";
import { Box, Typography } from "@mui/material";
import { COLORS } from "@/styling/constants";
import GameSettings, { defaultConfig, GameConfig } from "./GameSettings";
import ResultScreen from "./ResultScreen";
import { WINDOW_BASE_STYLE } from "./styles";

export const GameContainer = () => {
  const [mode, setMode] = useState<"host" | "join">("host");
  const [gameConfig, setGameConfig] = useState<GameConfig>(defaultConfig);
  const [roomId, setRoomId] = useState(generateLobbyKey());

  const handleStartGame = () => {
    if (!isHost) return;
    const randomCat = categories[Math.floor(Math.random() * categories.length)];
    // Ensure we are passing a valid number from config
    const duration = Number(gameConfig.writeTime) || 30;
    startRound(randomCat, duration);
  };

  const {
    phase,
    members,
    isHost,
    category,
    endTime,
    voteEndTime,
    startRound,
    submissions,
    roundCounter,
    updateGameSettings,
    submitAnswer,
    startVoting,
    finalizeRound,
    sendVote,
    clientId,
    totalScores,
    resetGame,
  } = useGameRoom(
    roomId,
    getCurrentUserProfile()?.username || "Rem",
    mode,
    gameConfig,
    setGameConfig,
    handleStartGame,
  );

  useEffect(() => {
    // Only trigger if we are in WRITING phase AND we actually have
    // submissions that belong to THIS round (length > 0)
    if (isHost && phase === "WRITING" && submissions.length > 0) {
      if (submissions.length === members.length) {
        startVoting(submissions, Number(gameConfig.voteTime) || 15);
      }
    }
  }, [submissions.length, members.length, isHost, phase, gameConfig.voteTime]);

  useEffect(() => {
    if (mode === "host" && gameConfig) {
      updateGameSettings(gameConfig);
    }
  }, [gameConfig, mode]);

  const handleTimeUp = (finalAnswer: string) => {
    submitAnswer(finalAnswer);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        background: COLORS.fresh.bg.bg_1,
        padding: 2,
        borderRadius: 2,
        border: `1px solid ${COLORS.fresh.primary.main}`,
        gap: 2,
      }}
    >
      <GameLobby
        phase={phase}
        members={members}
        isHost={isHost}
        onStart={handleStartGame}
        onModeChange={(mode) => setMode(mode)}
        onRoomIdChange={(roomId) => setRoomId(roomId)}
        roomId={roomId}
        totalScores={totalScores}
      />
      <Box sx={{ flexGrow: 1 }}>
        {phase === "LOBBY" && (
          <GameSettings
            gameConfig={gameConfig}
            onSettingChange={(config) => {
              setGameConfig(config);
            }}
            disabled={!isHost}
          />
        )}
        {phase === "WRITING" && (
          <PlayScreen
            key={`round-${roundCounter}-${category}`}
            category={category}
            endTime={endTime}
            onTimeUp={handleTimeUp}
            roundCounter={roundCounter}
            maxRounds={gameConfig.rounds}
          />
        )}
        {phase === "TRANSITION" && (
          <Box sx={{ ...WINDOW_BASE_STYLE, height: "100%", position: "relative" }}>
            <Box sx={{ textAlign: "center", py: 10 }}>
              <Typography variant="h4" sx={{ color: COLORS.fresh.primary.main }}>
                Round {roundCounter} is starting...
              </Typography>
              <Typography sx={{ color: COLORS.fresh.primary.main }}>
                Get those fingers ready!
              </Typography>
            </Box>
          </Box>
        )}
        {phase === "VOTING" && (
          <VotingScreen
            key={`voting-${roundCounter}`}
            submissions={submissions}
            myId={clientId}
            isHost={isHost}
            category={category}
            votingEndTime={voteEndTime}
            roundCounter={roundCounter}
            maxRounds={gameConfig.rounds}
            onVote={(target, approved) => sendVote(target, approved)}
            onDone={() => finalizeRound()}
          />
        )}
        {phase === "RESULTS" && (
          <ResultScreen
            handleFinishGame={resetGame}
            isHost={isHost}
            members={members}
            totalScores={totalScores}
          />
        )}
      </Box>
    </Box>
  );
};
