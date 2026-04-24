import { Box, Button, Typography } from "@mui/material";
import { PresenceMessage } from "ably";
import { WINDOW_BASE_STYLE } from "./styles";
import { COLORS } from "@/styling/constants";

interface ResultScreenProps {
  totalScores: Record<string, number>;
  members: PresenceMessage[];
  isHost: boolean;
  handleFinishGame: () => void;
}

const ResultScreen = ({ totalScores, members, isHost, handleFinishGame }: ResultScreenProps) => {
  return (
    <Box
      sx={{
        ...WINDOW_BASE_STYLE,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Box className="leaderboard">
          <Typography sx={{ color: COLORS.fresh.primary.main, mb: 4 }} variant={"h2"}>
            Leaderboard
          </Typography>
          {Object.entries(totalScores)
            .sort(([, scoreA], [, scoreB]) => scoreB - scoreA) // Sort by highest score
            .map(([id, score]) => {
              // Find the player's name from the members list using their ID
              const player = members.find((m) => m.clientId === id);
              const name = player?.data?.name || "Unknown Player";

              return (
                <Box key={id} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography sx={{ color: COLORS.fresh.primary.main }} component="span">
                    {name}
                  </Typography>
                  <Typography sx={{ color: COLORS.fresh.primary.main }} component="span">
                    {score} pts
                  </Typography>
                </Box>
              );
            })}
        </Box>

        {isHost && (
          <Button
            variant="contained"
            onClick={handleFinishGame}
            sx={{
              marginTop: "30px",
              padding: "15px 30px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              backgroundColor: COLORS.fresh.secondary.main,
              "&:hover": {
                backgroundColor: COLORS.fresh.secondary.hover,
              },
            }}
          >
            Start New Game
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ResultScreen;
