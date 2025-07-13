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
import { getDailyUTCDate, getRandomCharacter, hasBeenSolvedToday, isIncludedInDifficulty } from "common/utils";

interface HintRef {
  resetHint: () => void;
}

const BASEPOINTS = 150;
const REDUCEFACTOR = 10;

interface BasicCharacterQuizProps {
  charData: Character[];
  endlessMode?: boolean;
}

export default function BasicCharacterQuiz({
  charData,
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
  const tagsHintRef = useRef<HintRef | null>(null);
  const streakRef = useRef<StreakRef | null>(null);

  const theme = useTheme();

  const scoreKey = endlessMode ? "scores" : "dailyScores";
  const streakKey = endlessMode ? "basicStreak" : "dailyBasicStreak";

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
    if (tagsHintRef.current) {
      tagsHintRef?.current.resetHint();
    }
  }

  function init() {
    setIsCorrect(false);
    resetQuiz();

    //select random character
    let target = getRandomCharacter(charData, endlessMode ? true : false);
    if (endlessMode) {
      while (!isIncludedInDifficulty(target, difficulty)) {
        target = getRandomCharacter(charData);
      }
    } else {
      const hasSolvedToday = hasBeenSolvedToday("charquiz");
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
          localStorage.setItem("charquiz_HasBeenSolvedToday", utcDate.toISOString());
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


  function reducePointsForHint(costs: number) {
    setUsedHints(usedHints + 1);
    setPoints(points - costs < 0 ? 0 : points - costs);
  }

  return (
    <Box position={"relative"}>
      <Box sx={{
        borderRadius: 2,
        background: "linear-gradient(90deg,rgba(0, 100, 148, 1) 0%, rgba(209, 107, 129, 1) 100%)",
        marginBottom: 4,
        border: `1px solid ${COLORS.quiz.light}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingY: 2,
      }}>
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
            {scores.length === 0 && <Typography sx={{ color: COLORS.quiz.primary_text }} textAlign={"center"}>
              <Typography component={"span"}>
                No Scores available.
              </Typography>
              <br />
              <Typography component={"span"}>
                You should definitely change that (*≧ω≦*)
              </Typography>
            </Typography>}
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
          <RevealCard
            costs={500}
            onReveal={() => reducePointsForHint(500)}
            ref={tagsHintRef}
            cardText={targetChar?.Tags ?? ""}
            cardTitle="Tags"
          ></RevealCard>
          <RevealCard
            costs={500}
            onReveal={() => reducePointsForHint(500)}
            ref={genreHintRef}
            cardText={
              [targetChar?.Subgenre1, targetChar?.Subgenre2].join(";") ?? ""
            }
            cardTitle="Subgenres"
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
        </Box>
        <DayStreak ref={streakRef} streakKey={streakKey}></DayStreak>
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
              borderRadius: 2,
              border: gaveUp ? `2px solid ${COLORS.quiz.failed_light}` : `2px solid ${COLORS.quiz.success_light}`,

            }}
          >
            <Typography
              fontWeight={"bold"}
              fontSize={"24px"}
              marginBottom={1}
              textAlign={"center"}
            >
              {targetChar?.Name}
            </Typography>
            <Box
              width={"200px"}
              component={"img"}
              height={"276px"}
              sx={{
                objectFit: "cover"
              }}
              src={getImgSrc(targetChar?.Name)}
            ></Box>

          </Box>
        </Box>
      )}
      {(endlessMode || (!endlessMode && !isCorrect)) && (
        <CharacterList
          searchHistory={searchHistory}
          targetChar={targetChar}
        ></CharacterList>
      )}
    </Box>
  );
}
