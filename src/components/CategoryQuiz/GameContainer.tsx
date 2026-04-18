import React, { useEffect, useState } from "react";
import categories from "../../data/categories.json";
import { useGameRoom } from "./useGameRoom";
import { GameLobby } from "./GameLobby";
import { PlayScreen } from "./PlayScreen";
import { VotingScreen } from "./VotingScreen";
import { getCurrentUserProfile } from "@/common/profileUtils";
import { generateLobbyKey } from "./utils";
import { Box } from "@mui/material";
import { COLORS } from "@/styling/constants";
import GameSettings, { defaultConfig, GameConfig } from "./GameSettings";

export const GameContainer = () => {
  const [mode, setMode] = useState<"host" | "join">("host");
  const [gameConfig, setGameConfig] = useState<GameConfig>(defaultConfig);
  const [roomId, setRoomId] = useState(generateLobbyKey());
  const {
    phase,
    members,
    isHost,
    category,
    endTime,
    voteEndTime,
    startRound,
    submissions,
    submitAnswer,
    startVoting,
    finalizeRound,
    sendVote,
    clientId,
    totalScores,
  } = useGameRoom(roomId, getCurrentUserProfile()?.username || "Rem", mode, gameConfig);

  useEffect(() => {
    if (isHost && phase === "WRITING" && submissions.length > 0) {
      // Check if everyone in the lobby has submitted
      if (submissions.length === members.length) {
        startVoting(submissions, gameConfig.voteTime);
      }
    }
  }, [submissions, members.length, isHost, phase]);

  const handleTimeUp = (finalAnswer: string) => {
    submitAnswer(finalAnswer);
  };

  const handleStartGame = () => {
    if (!isHost) return;
    const randomCat = categories[Math.floor(Math.random() * categories.length)];
    startRound(randomCat, gameConfig.writeTime); // Start 30s round
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
      />
      <Box sx={{ flexGrow: 1 }}>
        {phase === "LOBBY" && (
          <GameSettings
            gameConfig={gameConfig}
            onSettingChange={(config) => {
              console.log(config);
              setGameConfig(config);
            }}
            disabled={!isHost}
          />
        )}
        {phase === "WRITING" && (
          <PlayScreen category={category} endTime={endTime} onTimeUp={handleTimeUp} />
        )}
        {phase === "VOTING" && (
          <VotingScreen
            submissions={submissions}
            myId={clientId}
            isHost={isHost}
            votingEndTime={voteEndTime}
            onVote={(target, approved) => sendVote(target, approved)}
            onDone={finalizeRound}
          />
        )}
        {phase === "RESULTS" && (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>Round Results</h2>
            <div style={{ marginBottom: "30px" }}>
              {submissions
                .sort((a, b) => b.votes - a.votes)
                .map((s) => (
                  <div key={s.playerId} style={resultRowStyle}>
                    <span>{s.playerName}</span>
                    <span style={{ fontWeight: "bold" }}>+{s.votes} pts</span>
                  </div>
                ))}
            </div>

            <hr />

            <div className="leaderboard">
              <h3>🏆 All-Time Leaderboard</h3>
              {Object.entries(totalScores)
                .sort(([, scoreA], [, scoreB]) => scoreB - scoreA) // Sort by highest score
                .map(([id, score]) => {
                  // Find the player's name from the members list using their ID
                  const player = members.find((m) => m.clientId === id);
                  const name = player?.data?.name || "Unknown Player";

                  return (
                    <div key={id} style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>{name}</span>
                      <span>{score} pts</span>
                    </div>
                  );
                })}
            </div>

            {isHost && (
              <button
                onClick={handleStartGame}
                style={{
                  marginTop: "30px",
                  padding: "15px 30px",
                  background: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Start Next Round
              </button>
            )}
          </div>
        )}
      </Box>
    </Box>
  );

  return <div>Loading...</div>;
};

const resultRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px",
  borderBottom: "1px solid #eee",
};
