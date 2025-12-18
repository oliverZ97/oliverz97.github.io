import { Box, Typography, Button, useTheme, Tooltip } from "@mui/material";
import { getAnimeImgSrc, getCharacterFromAnime } from "common/quizUtils";
import { Anime, Character } from "common/types";
import { getRandomAnime } from "common/utils";
import { AnimeAutocomplete } from "components/AnimeAutocomplete";
import { useEffect, useState } from "react";
import { COLORS } from "styling/constants";
import FastForwardIcon from "@mui/icons-material/FastForward";

interface SearchBarProps {
  points: number;
  searchHistory: Anime[];
  isCorrect: boolean;
  selectedOption: Anime | null;
  animeData: Anime[];
  handleSearchChange: (event: any, value: Anime | null, reason: any) => void;
  init: () => void;
  showGiveUp: boolean;
  gaveUp: boolean;
  handleGiveUp: () => void;
  endlessMode?: boolean;
  originalAnimeData: Anime[];
  targetAnime: Anime | null;
  charData: Character[];
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
  originalAnimeData,
  targetAnime,
  charData,
}: SearchBarProps) {
  const [blurFactor, setBlurFactor] = useState(5);
  const [clueCount, setClueCount] = useState(0);
  const showClueCount = (searchHistory.length % 5 !== 0 || searchHistory.length === 0);

  const theme = useTheme();

  useEffect(() => {
    if (isCorrect || gaveUp) {
      setBlurFactor(0);
    }
  }, [isCorrect, gaveUp]);

  function getYesterdaysAnime(animeData: Anime[]) {
    if (animeData.length > 0) {
      const anime = getRandomAnime(animeData, {
        endlessMode: false,
        isPrevious: true,
      });
      return anime.Name;
    } else {
      return "-";
    }
  }

  function handleInit() {
    setClueCount(0);
    setBlurFactor(5);
    init();
  }

  function showClueButton() {
    let show = false;
    if (searchHistory.length % 5 === 0 && searchHistory.length !== 0) {
      show = true;
    }
    if (clueCount === 0 && searchHistory.length >= 5 || clueCount === 1 && searchHistory.length >= 10) {
      show = true;
    }
    if (clueCount > 2) {
      show = false;
    }
    return show;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>

      {!isCorrect && clueCount > 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            alignItems: "center",
            justifyContent: "space-between",
            background:
              "linear-gradient(90deg,rgba(0, 100, 148, 1) 0%, rgba(209, 107, 129, 1) 100%)",
            borderRadius: 2,
            border: `1px solid ${COLORS.quiz.light}`,
            width: "500px",
            [theme.breakpoints.down("md")]: {
              flexDirection: "column",
              padding: 2,
            },
            paddingY: 2,
            marginBottom: 4,
          }}
        >
          {targetAnime && (
            <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
              {clueCount > 1 && (
                <Box
                  sx={{
                    width: "200px",
                    height: "276px",
                    backgroundImage: `url(${getAnimeImgSrc(targetAnime?.id)})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: `blur(${blurFactor}px)`,
                    zIndex: 1,
                  }}
                />
              )}

              {clueCount > 0 && (
                <Box textAlign={"center"}>
                  <Typography sx={{ color: "white" }}>
                    Character from this anime:
                  </Typography>
                  <Typography
                    sx={{ fontWeight: "bold", color: "white", fontSize: 20 }}
                  >
                    {
                      getCharacterFromAnime(
                        targetAnime?.id,
                        charData,
                        originalAnimeData
                      )?.Name
                    }
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
          justifyContent: "space-between",
          background:
            "linear-gradient(90deg,rgba(0, 100, 148, 1) 0%, rgba(209, 107, 129, 1) 100%)",
          borderRadius: 2,
          border: `1px solid ${COLORS.quiz.light}`,
          width: "100%",
          paddingY: endlessMode ? 2 : 0,
          [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            padding: 2,
          },
        }}
      >
        {!endlessMode && originalAnimeData && (
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={2}
            sx={{
              background:
                "linear-gradient(90deg,rgba(0, 53, 84, 1) 0%, rgba(0, 100, 148, 1) 100%)",
              width: "100%",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
              paddingX: 2,
              paddingY: 1,
            }}
          >
            <Typography
              fontSize="16px"
              textAlign={"center"}
              fontWeight={"bold"}
              color={"white"}
            >
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
            paddingX: 2,
            paddingBottom: endlessMode ? 0 : 2,
            [theme.breakpoints.down("md")]: {
              flexDirection: "column",
              padding: 2,
            },
          }}
        >
          <Box>
            <Typography sx={{ color: "white" }}>
              {"Points: " + points}
            </Typography>
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
              marginTop: 0,
            }}
          >
            <AnimeAutocomplete
              animeData={animeData}
              disabled={isCorrect}
              value={selectedOption}
              handleSearchChange={handleSearchChange}
            ></AnimeAutocomplete>
            {!showClueButton() && searchHistory.length <= 10 && <Typography sx={{ color: "white", fontStyle: "italic" }}>{`Next clue in ${searchHistory.length > 5 ? 10 - searchHistory.length : 5 - searchHistory.length} Tries`}</Typography>}

            {showClueButton() && (
              <Button
                sx={{ backgroundColor: COLORS.quiz.light_red, "&:hover": { backgroundColor: COLORS.quiz.light_red_hover } }}
                onClick={() => setClueCount(clueCount + 1)}
                endIcon={<FastForwardIcon />}
                variant="contained"
              >
                Next Clue
              </Button>
            )}
            {showGiveUp && !gaveUp && (
              <Button
                onClick={handleGiveUp}
                sx={{ position: "absolute", right: -100, backgroundColor: COLORS.quiz.failed, "&:hover": { backgroundColor: COLORS.quiz.failed_light } }}
                variant="contained"
              >
                Give Up!
              </Button>
            )}
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            {endlessMode && (
              <Button
                onClick={handleInit}
                sx={{
                  backgroundColor: COLORS.quiz.main,
                  color: "white",
                  "&:hover": {
                    backgroundColor: COLORS.quiz.secondary,

                  },
                }}
                variant="contained"
              >
                RESET QUIZ
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
