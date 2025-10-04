import { Box, Typography } from "@mui/material";
import StatsEntry from "./StatsEntry";
import { getUserStatistics } from "common/profileUtils";

const userStats = getUserStatistics();

export default function Statistics() {

  return (
    <Box sx={{ padding: 2, width: "800px" }}>
      <Typography variant="h4">Statistics</Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, marginTop: 2 }}>
        <Box>
          <StatsEntry title="Total Daily Wins" value={userStats.totalWins} />
          <StatsEntry title="Total Daily Losses" value={userStats.totalLosses} />
          <StatsEntry title="Total Daily Characters Guessed" value={userStats.totalCharactersGuessed} />
          <StatsEntry title="Total Daily Character Images Guessed" value={userStats.totalCharacterImagesGuessed} />
          <StatsEntry title="Total Daily Animes Guessed" value={userStats.totalAnimesGuessed} />
          <StatsEntry title="Total Daily Blurred Characters Guessed" value={userStats.totalBlurredCharactersGuessed} />
          <StatsEntry title="Total Daily Games Played" value={userStats.totalGamesPlayed} />
          <StatsEntry title="Longest Daily Win Streak" value={userStats.longestStreak} />
        </Box>
        <Box>
          <StatsEntry title="Total Overall Score" value={userStats.totalScore} />
          <StatsEntry title="Kiss Marry Kill Games Played" value={userStats.kissMarryKillGamesPlayed} />
          <StatsEntry title="Total Games Played" value={userStats.totalGamesPlayed} />
        </Box>
      </Box>
    </Box>
  );
}
