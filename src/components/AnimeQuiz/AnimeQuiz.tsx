import { Box, Typography, useTheme } from "@mui/material";
import { compareObjects, solveQuizHelper } from "common/quizUtils";
import { Anime, SolvedKeys } from "common/types";
import {
  gaveUpOnTodaysQuiz,
  getRandomAnime,
  hasBeenSolvedToday,
  QUIZ_KEY,
} from "common/utils";
import { DayStreak, StreakRef } from "components/Streak";
import { Score } from "pages/Home";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { COLORS } from "styling/constants";
import AnimeList from "./AnimeList";
import { SearchBar } from "./SearchBar";
import { LemonButton } from "components/LemonButton";
import { calculateSelectionPoints, removeOptionFromArray } from "./utils";
import { getHighscoresFromProfile } from "common/profileUtils";
import { useProfile } from "components/Profile/ProfileContext";

const ANIME_SOLVED_KEY = (QUIZ_KEY.ANIME + "Solved") as SolvedKeys;

interface AnimeQuizProps {
  animeData: Anime[];
  endlessMode?: boolean;
  changeQuizMode?: (event: React.SyntheticEvent, id: number) => void;
}

export const AnimeQuiz = ({
  animeData,
  endlessMode = true,
  changeQuizMode,
}: AnimeQuizProps) => {
  const [searchHistory, setSearchHistory] = useState<Anime[]>([]);
  const [selectedOption, setSelectedOption] = useState<Anime | null>(null);
  const [targetAnime, setTargetAnime] = useState<Anime | null>(null);
  const [points, setPoints] = useState(10000);
  const [isCorrect, setIsCorrect] = useState(false);
  const [localAnimeData, setLocalAnimeData] = useState<Anime[]>([]);
  const [scores, setScores] = useState<Score[]>([]);
  const [showGiveUp, setShowGiveUp] = useState(false);
  const [gaveUp, setGaveUp] = useState(false);

  const streakRef = useRef<StreakRef | null>(null);

  const theme = useTheme();

  const { refreshKey } = useProfile();

  const STREAK_KEY = endlessMode ? "animeStreak" : "dailyAnimeStreak";

  useEffect(() => {
    if (animeData.length > 0 && localAnimeData.length === 0) {
      setLocalAnimeData(animeData);
    }
  }, [localAnimeData, animeData]);

  useEffect(() => {
    if (localAnimeData.length > 0 && !targetAnime) {
      init();
    }
  }, [localAnimeData, init, targetAnime]);

  useEffect(() => {
    if (selectedOption) {
      setTimeout(() => {
        setSelectedOption(null);
      }, 100);
    }
  }, [selectedOption]);

  useEffect(() => {
    //get scores
    const scores = getHighscoresFromProfile(QUIZ_KEY.ANIME);
    updateScores(scores);
  }, [refreshKey]);

  useEffect(() => {
    if (points <= 0) {
      setShowGiveUp(true);
    }
  }, [points]);

  function updateScores(scores: Score[]) {
    if (scores) {
      const topThree = scores.slice(0, 3);
      setScores(topThree);
    }
  }

  function resetQuiz() {
    setLocalAnimeData([
      ...animeData.sort((a, b) => (a.Name < b.Name ? -1 : 1)),
    ]);
    setSearchHistory([]);
    setPoints(10000);
    setShowGiveUp(false);
    setGaveUp(false);
  }

  function init() {
    setIsCorrect(false);
    resetQuiz();

    //select random character
    let target = getRandomAnime(animeData, { endlessMode });
    if (endlessMode) {
      target = getRandomAnime(animeData, {});
    } else {
      const hasSolvedToday = hasBeenSolvedToday(QUIZ_KEY.ANIME);
      const gaveUpToday = gaveUpOnTodaysQuiz(QUIZ_KEY.ANIME);
      if (hasSolvedToday) {
        setIsCorrect(true);
      }
      if (gaveUpToday) {
        setGaveUp(true);
      }
    }
    setTargetAnime(target as Anime);
  }

  function handleSearchChange(
    event: SyntheticEvent<Element, Event> | null,
    value: Anime | null,
    reason: any
  ) {
    if (value && targetAnime) {
      const res = compareObjects(value, targetAnime);
      value.ValidFields = res.all;

      setSelectedOption(value);
      removeOptionFromArray(value, localAnimeData, setLocalAnimeData);
      setSearchHistory([value, ...searchHistory]);

      if (res.all.length + 1 === Object.keys(targetAnime).length) {
        solveQuizHelper(
          reason,
          setGaveUp,
          setIsCorrect,
          endlessMode,
          ANIME_SOLVED_KEY,
          QUIZ_KEY.ANIME,
          points,
          targetAnime,
          res
        );

        //get scores
        const scores = getHighscoresFromProfile(QUIZ_KEY.ANIME);
        updateScores(scores);

        if (streakRef.current) {
          streakRef.current.setStreak();
        }
      }
      //calculate point reduce
      calculateSelectionPoints(
        res.short.length,
        searchHistory,
        points,
        setPoints
      );
    }
  }

  return (
    <Box sx={{ position: "relative", paddingTop: !endlessMode ? 0 : 2 }}>
      {!endlessMode && (
        <Box
          sx={{
            borderRadius: 2,
            background:
              "linear-gradient(90deg,rgba(0, 100, 148, 1) 0%, rgba(209, 107, 129, 1) 100%)",
            marginBottom: 4,
            border: `1px solid ${COLORS.quiz.light}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingY: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", height: "70px", alignItems: "center" }}>
              {scores.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingX: 2,
                    color: "white",
                  }}
                >
                  {index === 0 && <Typography fontSize={"24px"}>🏆</Typography>}
                  {index === 1 && <Typography fontSize={"24px"}>🥈</Typography>}
                  {index === 2 && <Typography fontSize={"24px"}>🥉</Typography>}
                  <Typography fontSize={"12px"}>
                    {"Points: " + item.points}
                  </Typography>
                  <Typography fontSize={"12px"}>
                    {"Date: " + item.date}
                  </Typography>
                </Box>
              ))}
              {scores.length === 0 && (
                <Typography
                  sx={{ color: COLORS.quiz.primary_text }}
                  textAlign={"center"}
                >
                  <Typography component={"span"}>
                    No Scores available.
                  </Typography>
                  <br />
                  <Typography component={"span"}>
                    You should definitely change that (*≧ω≦*)
                  </Typography>
                </Typography>
              )}
            </Box>
          </Box>

          <Box
            sx={{
              width: "100%",
              paddingX: 2,
              marginTop: 2,
              borderRadius: 2,
              display: "flex",
              gap: 2,
              justifyContent: "space-between",
              [theme.breakpoints.down("md")]: {
                flexWrap: "wrap",
              },
            }}
          >
            <DayStreak ref={streakRef} streakKey={STREAK_KEY}></DayStreak>
          </Box>
        </Box>
      )}
      <SearchBar
        points={points}
        searchHistory={searchHistory}
        isCorrect={isCorrect}
        selectedOption={selectedOption}
        animeData={localAnimeData}
        handleSearchChange={handleSearchChange}
        init={init}
        handleGiveUp={() => handleSearchChange(null, targetAnime, "giveUp")}
        showGiveUp={showGiveUp}
        gaveUp={gaveUp}
        endlessMode={endlessMode}
        originalAnimeData={animeData}
      />

      {targetAnime && isCorrect && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: gaveUp
                ? COLORS.quiz.failed
                : COLORS.quiz.success,
              width: "300px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingX: 2,
              paddingY: 3,
              marginTop: 4,
              borderRadius: 2,
              border: gaveUp
                ? `2px solid ${COLORS.quiz.failed_light}`
                : `2px solid ${COLORS.quiz.success_light}`,
            }}
          >
            <Typography fontWeight={"bold"} fontSize={"20px"} marginBottom={1}>
              Congratulations!
            </Typography>
            <Typography marginBottom={3}>The Anime was:</Typography>
            <Typography
              fontWeight={"bold"}
              fontSize={"24px"}
              textAlign={"center"}
            >
              {targetAnime?.Name}
            </Typography>
          </Box>
          {!endlessMode && (
            <LemonButton
              onClick={(event) => changeQuizMode?.(event, 3)}
              text="Next: Blurred Character Quiz"
            />
          )}
        </Box>
      )}

      {(endlessMode || (!endlessMode && !isCorrect)) && (
        <AnimeList
          searchHistory={searchHistory}
          targetAnime={targetAnime}
        ></AnimeList>
      )}
    </Box>
  );
};
