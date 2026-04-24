import { Box, Typography } from "@mui/material";
import { COLORS } from "@/styling/constants";
import CharacterList from "./CharacterList";
import { SearchBar } from "./SearchBar";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Character, Difficulty, SolvedKeys, StatisticFields } from "@/common/types";
import { compareObjects, getImgSrc, solveQuizHelper } from "@/common/quizUtils";
import { Score } from "@/pages/Home";
import { DayStreak } from "@/components/Streak";
import { StreakRef } from "@/components/Streak";
import {
  gaveUpOnTodaysQuiz,
  getRandomCharacter,
  hasBeenSolvedToday,
  isIncludedInDifficulty,
  QUIZ_KEY,
} from "@/common/utils";
import { LemonButton } from "@/components/LemonButton";
import { calculateSelectionPoints, removeOptionFromArray } from "./utils";
import {
  getHighscoresFromProfile,
  getProfileSetting,
  saveFieldToTotalStatistics,
} from "@/common/profileUtils";
import { useProfile } from "@/components/Profile/ProfileContext";
import { HintFunctionRef, Hints } from "./Hints";

const CHAR_SOLVED_KEY = (QUIZ_KEY.CHAR + "Solved") as SolvedKeys;

interface BasicCharacterQuizProps {
  charData: Character[];
  endlessMode?: boolean;
  changeQuizMode?: (event: React.SyntheticEvent, id: number) => void;
}

export default function BasicCharacterQuiz({
  charData,
  endlessMode = true,
  changeQuizMode,
}: BasicCharacterQuizProps) {
  const [searchHistory, setSearchHistory] = useState<Character[]>([]);
  const [selectedOption, setSelectedOption] = useState<Character | null>(null);
  const [targetChar, setTargetCharacter] = useState<Character | null>(null);
  const [points, setPoints] = useState(10000);
  const [usedHints, setUsedHints] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [localCharData, setLocalCharData] = useState<Character[]>([]);
  const [scores, setScores] = useState<Score[]>([]);
  const [difficulty, setDifficulty] = useState<Difficulty>("C");
  const [showGiveUp, setShowGiveUp] = useState(false);
  const [gaveUp, setGaveUp] = useState(false);

  const streakRef = useRef<StreakRef | null>(null);
  const hintRef = useRef<HintFunctionRef | null>(null);

  const { refreshKey } = useProfile();

  const STREAK_KEY = endlessMode ? "charStreak" : "dailyCharStreak";

  useEffect(() => {
    if (charData.length > 0 && localCharData.length === 0) {
      setLocalCharData(charData);
    }
  }, [localCharData, charData]);

  useEffect(() => {
    if (localCharData.length > 0 && !targetChar) {
      init();
    }
  }, [localCharData, init, targetChar]);

  useEffect(() => {
    if (selectedOption) {
      setTimeout(() => {
        setSelectedOption(null);
      }, 100);
    }
  }, [selectedOption]);

  useEffect(() => {
    //get scores
    const scores = getHighscoresFromProfile(QUIZ_KEY.CHAR);
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
    setLocalCharData([...charData.sort((a, b) => (a.Name < b.Name ? -1 : 1))]);
    setSearchHistory([]);
    setPoints(10000);
    setUsedHints(0);
    setShowGiveUp(false);
    setGaveUp(false);
    if (hintRef.current) {
      hintRef.current.resetHints();
    }
  }

  function init() {
    setIsCorrect(false);
    resetQuiz();

    //select random character
    let target = getRandomCharacter(charData, { endlessMode: endlessMode });
    if (endlessMode) {
      while (!isIncludedInDifficulty(target, difficulty)) {
        target = getRandomCharacter(charData, { endlessMode: endlessMode });
      }
    } else {
      const hasSolvedToday = hasBeenSolvedToday(QUIZ_KEY.CHAR);
      const gaveUpToday = gaveUpOnTodaysQuiz(QUIZ_KEY.CHAR);
      if (hasSolvedToday) {
        setIsCorrect(true);
      }
      if (gaveUpToday) {
        setGaveUp(true);
      }
      if (hasSolvedToday || gaveUpToday) {
        if (hintRef.current) {
          hintRef.current.revealAllHints();
        }
      }
    }
    setTargetCharacter(target as Character);
  }

  function handleSearchChange(
    event: SyntheticEvent<Element, Event> | null,
    value: Character | null,
    reason: any,
  ) {
    if (value && targetChar) {
      const res = compareObjects(value, targetChar);
      value.ValidFields = res.all;

      if (value.ValidFields.includes("Anime") && getProfileSetting("autoRevealBasicQuizHints")) {
        if (hintRef.current) {
          hintRef.current.handleSetRevealAnimeHint(true);
        }
      }

      setSelectedOption(value);
      removeOptionFromArray(value, localCharData, setLocalCharData);
      setSearchHistory([value, ...searchHistory]);

      if (res.all.length + 1 === Object.keys(targetChar).length) {
        saveFieldToTotalStatistics(
          [StatisticFields.totalCharacterGuesses],
          searchHistory.length + 1,
        );
        solveQuizHelper(
          reason,
          setGaveUp,
          setIsCorrect,
          endlessMode,
          CHAR_SOLVED_KEY,
          QUIZ_KEY.CHAR,
          points,
          targetChar,
          res,
          searchHistory.length + 1,
        );

        //get scores
        const scores = getHighscoresFromProfile(QUIZ_KEY.CHAR);
        updateScores(scores);

        if (streakRef.current) {
          streakRef.current.setStreak();
        }
      }
      //calculate point reduce
      calculateSelectionPoints(res.short.length, searchHistory, difficulty, points, setPoints);
    }
  }

  function reducePointsForHint(costs: number) {
    setUsedHints(usedHints + 1);
    setPoints(points - costs < 0 ? 0 : points - costs);
  }

  return (
    <Box sx={{ position: "relative" }}>
      {!endlessMode && (
        <Box
          sx={{
            borderRadius: 2,
            background: COLORS.gradient,
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
                  <Typography fontSize={"12px"}>{"Points: " + item.points}</Typography>
                  <Typography fontSize={"12px"}>{"Date: " + item.date}</Typography>
                </Box>
              ))}
              {scores.length === 0 && (
                <Typography sx={{ color: COLORS.quiz.primary_text }} textAlign={"center"}>
                  <Typography component={"span"}>No Scores available.</Typography>
                  <br />
                  <Typography component={"span"}>
                    You should definitely change that (*≧ω≦*)
                  </Typography>
                </Typography>
              )}
            </Box>
          </Box>

          {!endlessMode && <DayStreak ref={streakRef} streakKey={STREAK_KEY}></DayStreak>}
        </Box>
      )}

      <SearchBar
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        points={points}
        searchHistory={searchHistory}
        isCorrect={isCorrect}
        selectedOption={selectedOption}
        charData={localCharData}
        handleSearchChange={handleSearchChange}
        init={init}
        handleGiveUp={() => handleSearchChange(null, targetChar, "giveUp")}
        showGiveUp={showGiveUp}
        gaveUp={gaveUp}
        endlessMode={endlessMode}
        originalCharData={charData}
        quizKey={QUIZ_KEY.CHAR}
        hintBar={
          <Hints
            ref={hintRef}
            gaveUp={gaveUp}
            isCorrect={isCorrect}
            targetChar={targetChar}
            onClickHint={reducePointsForHint}
            points={points}
          />
        }
      ></SearchBar>

      {targetChar && isCorrect && (
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
              backgroundColor: gaveUp ? COLORS.quiz.failed : COLORS.quiz.success,
              width: "300px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingX: 2,
              paddingY: 3,
              marginTop: 4,
              borderRadius: 2,
              border: gaveUp
                ? `2px solid ${COLORS.quiz.failed_light}`
                : `2px solid ${COLORS.quiz.success_light}`,
            }}
          >
            <Typography fontWeight={"bold"} fontSize={"24px"} marginBottom={1} textAlign={"center"}>
              {targetChar?.Name}
            </Typography>
            <Box
              width={"200px"}
              component={"img"}
              height={"276px"}
              sx={{
                objectFit: "cover",
              }}
              src={getImgSrc(targetChar?.id)}
            ></Box>
          </Box>
          {!endlessMode && (
            <LemonButton onClick={(event) => changeQuizMode?.(event, 1)} text="Next: Image Quiz" />
          )}
        </Box>
      )}
      {(endlessMode || (!endlessMode && !isCorrect)) && (
        <CharacterList searchHistory={searchHistory} targetChar={targetChar}></CharacterList>
      )}
    </Box>
  );
}
