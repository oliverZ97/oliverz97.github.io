import { Box, Typography, useTheme } from "@mui/material";
import { RevealCard } from "components/RevealCard";
import { COLORS } from "styling/constants";
import { SearchBar } from "../BasicCharacterQuiz/SearchBar";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Character, Difficulty } from "common/types";
import JSConfetti from "js-confetti";
import { compareObjects, getImgSrc } from "common/quizUtils";
import { Score } from "pages/Home";
import { DayStreak } from "components/Streak";
import { StreakRef } from "components/Streak";
import {
  gaveUpOnTodaysQuiz,
  getDailyUTCDate,
  getRandomCharacter,
  hasBeenSolvedToday,
  isIncludedInDifficulty,
  QUIZ_KEY,
  setDailyScore,
} from "common/utils";
import CharacterList from "./CharacterList";

interface HintRef {
  resetHint: () => void;
}

const BASEPOINTS = 1000;
const CHAR_SOLVED_KEY = QUIZ_KEY.BLUR + "_HasBeenSolvedToday";

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
  const [isCorrect, setIsCorrect] = useState(false);
  const [localCharData, setLocalCharData] = useState<Character[]>([]);
  const [scores, setScores] = useState<Score[]>([]);
  const [difficulty, setDifficulty] = useState<Difficulty>("C");
  const [showGiveUp, setShowGiveUp] = useState(false);
  const [gaveUp, setGaveUp] = useState(false);
  const [blurFactor, setBlurFactor] = useState(50);

  const theme = useTheme();

  const genreHintRef = useRef<HintRef | null>(null);
  const animeHintRef = useRef<HintRef | null>(null);
  const studioHintRef = useRef<HintRef | null>(null);
  const tagsHintRef = useRef<HintRef | null>(null);
  const streakRef = useRef<StreakRef | null>(null);

  const SCORE_KEY = endlessMode ? "scores" : "dailyScores";
  const STREAK_KEY = endlessMode ? "basicStreak" : "dailyBasicStreak";

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
    const scores = localStorage.getItem(SCORE_KEY);
    if (scores) {
      const scoreArr = JSON.parse(scores) as Score[];

      const topThree = scoreArr.slice(0, 3);
      setScores(topThree);
    }
  }, []);

  useEffect(() => {
    if (points <= 0) {
      setShowGiveUp(true);
    }
  }, [points]);

  function resetQuiz() {
    setBlurFactor(50);
    setLocalCharData([...charData.sort((a, b) => (a.Name < b.Name ? -1 : 1))]);
    setSearchHistory([]);
    setPoints(10000);
    setShowGiveUp(false);
    setGaveUp(false);
    if (genreHintRef.current) {
      genreHintRef.current.resetHint();
    }
    if (animeHintRef.current) {
      animeHintRef?.current.resetHint();
    }
    if (studioHintRef.current) {
      studioHintRef?.current.resetHint();
    }
    if (tagsHintRef.current) {
      tagsHintRef?.current.resetHint();
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
      const hasSolvedToday = hasBeenSolvedToday(QUIZ_KEY.BLUR);
      const gaveUpToday = gaveUpOnTodaysQuiz(QUIZ_KEY.BLUR);
      if (hasSolvedToday) {
        setIsCorrect(true);
      }
      if (gaveUpToday) {
        setGaveUp(true);
      }
    }
    setTargetCharacter(target as Character);
  }

  function removeOptionFromArray(value: Character) {
    const index = localCharData.indexOf(value);
    const tempArray = localCharData;
    tempArray.splice(index, 1);
    setLocalCharData(tempArray);
  }

  function calculateSelectionPoints(correctFieldCount: number) {
    const baseValue = BASEPOINTS;
    let roundPoints = baseValue;
    setPoints(points - roundPoints < 0 ? 0 : points - roundPoints);
  }

  function handleSearchChange(
    event: SyntheticEvent<Element, Event> | null,
    value: Character | null,
    reason: any
  ) {
    if (value && targetChar) {
      const res = compareObjects(value, targetChar);
      value.ValidFields = res.all;

      setSelectedOption(value);
      removeOptionFromArray(value);
      setSearchHistory([value, ...searchHistory]);

      if (res.all.length + 1 === Object.keys(targetChar).length) {
        setBlurFactor(0);
        if (reason !== "giveUp") {
          const jsConfetti = new JSConfetti();
          jsConfetti.addConfetti({
            emojis: ["🎉", "🍛", "🍣", "✨", "🍜", "🌸", "🍙"],
            emojiSize: 30,
          });
        } else {
          setGaveUp(true);
        }

        setIsCorrect(true);
        if (!endlessMode) {
          const utcDate = getDailyUTCDate();
          const solveData = {
            date: utcDate.toISOString(),
            gaveUp: reason === "giveUp",
          };
          localStorage.setItem(CHAR_SOLVED_KEY, JSON.stringify(solveData));
          setDailyScore(utcDate.toISOString(), points, QUIZ_KEY.BLUR);
        }
        if (points > 0) {
          //Set Highscore
          const scoreObj = {
            points: points,
            date: new Date().toLocaleString("de-DE", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }),
          };

          let localScores = localStorage.getItem(SCORE_KEY);
          let scores;
          if (localScores) {
            scores = JSON.parse(localScores);
            scores.push(scoreObj);
          } else[(scores = [scoreObj])];

          //sort
          scores.sort((a: Score, b: Score) => (a.points < b.points ? 1 : -1));
          setScores(scores.slice(0, 3));
          const scoreString = JSON.stringify(scores);
          localStorage.setItem(SCORE_KEY, scoreString);
          if (streakRef) {
            streakRef.current?.setStreak();
          }
        }
        return;
      }
      setBlurFactor(blurFactor - 5);

      //calculate point reduce
      calculateSelectionPoints(res.short.length);
    }
  }

  return (
    <Box position={"relative"}>
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
                <Typography component={"span"}>No Scores available.</Typography>
                <br />
                <Typography component={"span"}>
                  You should definitely change that (*≧ω≦*)
                </Typography>
              </Typography>
            )}
          </Box>
        </Box>

        <DayStreak ref={streakRef} streakKey={STREAK_KEY}></DayStreak>
      </Box>

      <Box
        sx={{
          borderRadius: 2,
          background:
            "linear-gradient(90deg,rgba(0, 100, 148, 1) 0%, rgba(209, 107, 129, 1) 100%)",
          marginBottom: 4,
          border: `1px solid ${COLORS.quiz.light}`,
          paddingY: 2,
        }}
      >
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={4}
          width={"100%"}
          position={"relative"}
          sx={{
            [theme.breakpoints.down("md")]: {
              flexDirection: "column",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 2,
              position: "absolute",
              left: "calc(50% - 420px)", // Position from center: half of parent width - desired margin - card width
              zIndex: 1,
              [theme.breakpoints.down("md")]: {
                position: "initial",
              },
            }}
          >
            <RevealCard
              onReveal={() => { }}
              ref={tagsHintRef}
              cardText={targetChar?.Studio ?? ""}
              cardTitle="Studio"
              disabled={searchHistory.length <= 3}
              sx={{
                width: "250px",
              }}
            ></RevealCard>
            <RevealCard
              onReveal={() => { }}
              ref={tagsHintRef}
              cardText={targetChar?.First_Release_Year.toString() ?? ""}
              cardTitle="First Release Year"
              disabled={searchHistory.length <= 6}
              sx={{
                width: "250px",
              }}
            ></RevealCard>
            <RevealCard
              onReveal={() => { }}
              ref={tagsHintRef}
              cardText={targetChar?.Anime.toString() ?? ""}
              cardTitle="Anime"
              disabled={searchHistory.length <= 8}
              sx={{
                width: "250px",
              }}
            ></RevealCard>
          </Box>
          {targetChar && (
            <Box
              key={targetChar.Name}
              sx={{
                gap: 2,
                position: "relative",
              }}
            >
              <Box
                width={"300px"}
                component={"img"}
                height={"420px"}
                sx={{
                  objectFit: "cover",
                }}
                src={getImgSrc(targetChar.Name)}
              ></Box>
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: "420px",
                  backdropFilter: `blur(${blurFactor}px)`,
                }}
              />
            </Box>
          )}
        </Box>
      </Box>

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
        showPreviewImage={false}
      ></SearchBar>
      {(endlessMode || (!endlessMode && !isCorrect)) && (
        <CharacterList
          searchHistory={searchHistory}
          targetChar={targetChar}
        ></CharacterList>
      )}
    </Box>
  );
}
