import { Box, Typography, useTheme } from "@mui/material";
import { RevealCard } from "components/RevealCard";
import { COLORS } from "styling/constants";
import CharacterList from "./CharacterList";
import { SearchBar } from "./SearchBar";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Character, Difficulty } from "common/types";
import JSConfetti from "js-confetti";
import { compareObjects, getImgSrc } from "common/quizUtils";
import { Score } from "pages/Home";
import { DayStreak } from "components/Streak";
import { StreakRef } from "components/Streak";
import { getDailyUTCDate, isIncludedInDifficulty } from "utils";

interface HintRef {
  resetHint: () => void;
}

const BASEPOINTS = 150;
const REDUCEFACTOR = 10;

interface BasicCharacterQuizProps {
  charData: Character[];
  getRandomCharacter: (endlessMode?: boolean, isPrevious?: boolean) => Character;
  endlessMode?: boolean;
}

export default function BasicCharacterQuiz({
  charData,
  getRandomCharacter,
  endlessMode = true,
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

  const genreHintRef = useRef<HintRef | null>(null);
  const animeHintRef = useRef<HintRef | null>(null);
  const studioHintRef = useRef<HintRef | null>(null);
  const editorialHintRef = useRef<HintRef | null>(null);
  const streakRef = useRef<StreakRef | null>(null);

  const theme = useTheme();

  const scoreKey = endlessMode ? "scores" : "dailyScores"
  const streakKey = endlessMode ? "basicStreak" : "dailyBasicStreak"

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
    const scores = localStorage.getItem(scoreKey);
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
    setLocalCharData([...charData.sort((a, b) => (a.Name < b.Name ? -1 : 1))]);
    setSearchHistory([]);
    setPoints(10000);
    setUsedHints(0);
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
    if (editorialHintRef.current) {
      editorialHintRef?.current.resetHint();
    }
  }

  function getYesterdaysChar() {
    const char = getRandomCharacter(false, true);
    return char.Name
  }

  function init() {
    setIsCorrect(false);
    resetQuiz();

    //select random character
    let target = getRandomCharacter(endlessMode ? true : false);
    if (endlessMode) {
      while (!isIncludedInDifficulty(target, difficulty)) {
        target = getRandomCharacter();
      }
    } else {
      const hasSolvedToday = hasBeenSolvedToday();
      if (hasSolvedToday) {
        setIsCorrect(true);
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
    const baseValue = Math.max(searchHistory.length, 1) * BASEPOINTS;
    let difficultyFactor = 2;
    if (difficulty === "B") {
      difficultyFactor = 1.5;
    }
    if (difficulty === "C") {
      difficultyFactor = 1;
    }
    let roundPoints =
      baseValue - correctFieldCount * REDUCEFACTOR * difficultyFactor;
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
          localStorage.setItem("HasBeenSolvedToday", utcDate.toISOString());
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

          let localScores = localStorage.getItem(scoreKey);
          let scores;
          if (localScores) {
            scores = JSON.parse(localScores);
            scores.push(scoreObj);
          } else[(scores = [scoreObj])];

          //sort
          scores.sort((a: Score, b: Score) => (a.points < b.points ? 1 : -1));
          setScores(scores.slice(0, 3));
          const scoreString = JSON.stringify(scores);
          localStorage.setItem(scoreKey, scoreString);
          if (streakRef) {
            streakRef.current?.setStreak();
          }

        }
        return;
      }

      //calculate point reduce
      calculateSelectionPoints(res.short.length);
    }
  }

  function hasBeenSolvedToday() {
    const dailyExpireDate = localStorage.getItem("HasBeenSolvedToday");
    if (dailyExpireDate) {
      const date = new Date(dailyExpireDate).toDateString();
      const now = new Date().toDateString();
      if (date === now) {
        return true;
      } else {
        localStorage.removeItem("HasBeenSolvedToday")
        return false;
      }
    } else {
      return false
    }
  }

  function reducePointsForHint(costs: number) {
    setUsedHints(usedHints + 1);
    setPoints(points - costs < 0 ? 0 : points - costs);
  }

  return (
    <Box position={"relative"}>
      {scores.length > 0 && (
        <Box
          sx={{
            borderRadius: "16px",
            backgroundColor: COLORS.quiz.secondary,
            marginBottom: 4,
            border: `1px solid ${COLORS.quiz.light}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingY: 2,
          }}
        >
          <Box sx={{ display: "flex" }}>
            {scores.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingX: 2,
                  color: "white",
                  backgroundColor: COLORS.quiz.secondary,
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
          </Box>
        </Box>
      )}

      <Box
        sx={{
          backgroundColor: COLORS.quiz.secondary,
          padding: 2,
          borderRadius: "16px",
          marginBottom: 4,
          display: "flex",
          gap: 2,
          justifyContent: "space-between",
          border: `1px solid ${COLORS.quiz.light}`,
          [theme.breakpoints.down("md")]: {
            flexWrap: "wrap",
          },
        }}
      >
        <RevealCard
          costs={500}
          onReveal={() => reducePointsForHint(500)}
          ref={genreHintRef}
          cardText={targetChar?.Genre ?? ""}
          cardTitle="Genre"
        ></RevealCard>
        <RevealCard
          costs={500}
          onReveal={() => reducePointsForHint(500)}
          ref={studioHintRef}
          cardText={targetChar?.Studio ?? ""}
          cardTitle="Studio"
        ></RevealCard>
        <RevealCard
          costs={1000}
          onReveal={() => reducePointsForHint(1000)}
          ref={animeHintRef}
          cardText={targetChar?.Anime ?? ""}
          cardTitle="Anime"
        ></RevealCard>
        <RevealCard
          costs={0}
          onReveal={() => reducePointsForHint(0)}
          ref={editorialHintRef}
          cardText={targetChar?.Editorial_Staff_Hint ?? ""}
          cardTitle="Staff Hint"
        ></RevealCard>
      </Box>
      <DayStreak ref={streakRef} streakKey={streakKey}></DayStreak>

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
      ></SearchBar>

      {targetChar && isCorrect && (
        <Box
          sx={{
            display: "flex",
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
              paddingX: 2,
              paddingY: 3,
              marginTop: 4,
              borderRadius: "16px",
            }}
          >
            <Typography fontWeight={"bold"} fontSize={"24px"}>
              {targetChar?.Name}
            </Typography>
            <Box
              width={"200px"}
              component={"img"}
              src={getImgSrc(targetChar?.Name)}
            ></Box>
            {!endlessMode && <Box sx={{marginTop: 2}}>
              <Typography fontSize="14px" textAlign={"center"}>{"Yesterdays character was"}</Typography>
            <Typography fontWeight={"bold"} fontSize="14px" textAlign={"center"}>{`${getYesterdaysChar()}`}</Typography>
            </Box>}
          </Box>
        </Box>
      )}
      {(endlessMode || (!endlessMode && !isCorrect)) && <CharacterList
        searchHistory={searchHistory}
        targetChar={targetChar}
      ></CharacterList>}
    </Box>
  );
}
