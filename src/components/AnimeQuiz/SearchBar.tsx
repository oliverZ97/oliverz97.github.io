import {
  Box,
  Typography,
  Button,
  useTheme,
  Tooltip,
} from "@mui/material";
import { getImgSrc } from "common/quizUtils";
import { Anime } from "common/types";
import { getRandomAnime } from "common/utils";
import { AnimeAutocomplete } from "components/AnimeAutocomplete";
import { COLORS } from "styling/constants";

interface SearchBarProps {
  points: number;
  searchHistory: Anime[];
  isCorrect: boolean;
  selectedOption: Anime | null;
  animeData: Anime[];
  handleSearchChange: (
    event: any,
    value: Anime | null,
    reason: any
  ) => void;
  init: () => void;
  showGiveUp: boolean;
  gaveUp: boolean;
  handleGiveUp: () => void;
  endlessMode?: boolean;
  originalAnimeData: Anime[]
}

export function SearchBar({
  points,
  searchHistory,
  isCorrect,
  selectedOption,
  animeData,
  handleSearchChange,
  init,
  showGiveUp,
  gaveUp,
  handleGiveUp,
  endlessMode = true,
  originalAnimeData
}: SearchBarProps) {
  const theme = useTheme();

  function getYesterdaysAnime(animeData: Anime[]) {
    if (animeData.length > 0) {
      const anime = getRandomAnime(animeData, false, true);
      return anime.Name;
    } else {
      return "-"
    }
  }

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      gap: 4,
      alignItems: "center",
      justifyContent: "space-between",
      background: "linear-gradient(90deg,rgba(0, 100, 148, 1) 0%, rgba(209, 107, 129, 1) 100%)",
      borderRadius: 2,
      border: `1px solid ${COLORS.quiz.light}`,
      width: "100%",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        padding: 2,
      },
    }}>
      {!endlessMode && originalAnimeData && (
        <Box display={"flex"} alignItems={"center"} gap={2} sx={{
          background: "linear-gradient(90deg,rgba(0, 53, 84, 1) 0%, rgba(0, 100, 148, 1) 100%)",
          width: "100%", borderTopLeftRadius: "8px", borderTopRightRadius: "8px", paddingX: 2, paddingY: 1,
        }}>
          <Typography fontSize="16px" textAlign={"center"} fontWeight={"bold"} color={"white"}>
            {"Yesterdays anime: " + getYesterdaysAnime(originalAnimeData)}
          </Typography>
        </Box>
      )}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          gap: 4,
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 2,
          marginBottom: 2,
          paddingX: 2,
          [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            padding: 2,
          },
        }}
      >
        <Box>
          <Typography sx={{ color: "white" }}>{"Points: " + points}</Typography>
          <Typography sx={{ color: "white" }}>
            {"Tries: " + searchHistory.length}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            position: "relative",
            marginTop: endlessMode ? 2 : 0
          }}
        >
          <AnimeAutocomplete
            animeData={animeData}
            disabled={isCorrect}
            value={selectedOption}
            handleSearchChange={handleSearchChange}
          ></AnimeAutocomplete>
          {showGiveUp && !gaveUp && (
            <Button
              onClick={handleGiveUp}
              sx={{ height: "40px", position: "absolute", right: -100 }}
              color="error"
              variant="contained"
            >
              Give Up!
            </Button>
          )}
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          {endlessMode && <Button
            onClick={init}
            sx={{
              backgroundColor: COLORS.quiz.main,
              border: `2px solid ${COLORS.quiz.light}`,
              color: "white",
              "&:hover": {
                backgroundColor: COLORS.quiz.secondary,
              },
            }}
            variant="outlined"
          >
            RESET QUIZ
          </Button>}

        </Box>

      </Box >
    </Box>
  );
}
