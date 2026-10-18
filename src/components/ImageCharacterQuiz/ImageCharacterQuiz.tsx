import { Box, Button, Typography } from "@mui/material";
import {
  applyCreditsToProfile,
  saveFieldToTotalStatistics,
  saveHasBeenSolvedToday,
} from "@/common/profileUtils";
import { getImgSrc } from "@/common/quizUtils";
import { Anime, Character, SolvedKeys, StatisticFields } from "@/common/types";
import {
  getDailyUTCDate,
  getRandomCharacter,
  hasBeenSolvedToday,
  QUIZ_KEY,
  setDailyScore,
} from "@/common/utils";
import { AnimeAutocomplete } from "@/components/AnimeAutocomplete";
import { CharacterAutocomplete } from "@/components/CharacterAutocomplete";
import { LemonButton } from "@/components/LemonButton";
import { DayStreak, StreakRef } from "@/components/Streak";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { COLORS } from "@/styling/constants";

interface ImageCharacterQuizProps {
  charData: Character[];
  animeData: Anime[];
  endlessMode?: boolean;
  changeQuizMode?: (event: React.SyntheticEvent, id: number) => void;
}

interface ImageTarget {
  character: Character | null;
  anime: Anime | null;
  isCharacterCorrect: boolean;
  isAnimeCorrect: boolean;
}

const BASEPOINTS_ANIME = 1000;
const BASEPOINTS_CHAR = 1500;
const ANSWER_KEY = QUIZ_KEY.IMAGE + "_daily_answers";
const SCORE_KEY = QUIZ_KEY.IMAGE + "_daily_score";
const IMAGE_SOLVED_KEY = (QUIZ_KEY.IMAGE + "Solved") as SolvedKeys;

const characterPreset = {
  character: null,
  anime: null,
  isCharacterCorrect: false,
  isAnimeCorrect: false,
};

export default function ImageCharacterQuiz({
  charData,
  animeData,
  endlessMode = true,
  changeQuizMode,
}: ImageCharacterQuizProps) {
  const [isSolving, setIsSolving] = useState(false);
  const [elements, setElements] = useState<ImageTarget[]>([
    { ...characterPreset },
    { ...characterPreset },
    { ...characterPreset },
    { ...characterPreset },
  ]);
  const [targets, setTargets] = useState<Character[] | null>(null);
  const [score, setScore] = useState(0);

  const streakRef = useRef<StreakRef | null>(null);
  const STREAK_KEY = endlessMode ? "imageStreak" : "dailyImageStreak";

  useEffect(() => {
    if (!targets) {
      resetTargets();
    }
  });

  useEffect(() => {
    if (isSolving) {
      checkCorrectAnswers();
    }
  }, [isSolving]);

  function resetImageQuiz() {
    setElements([
      { ...characterPreset },
      { ...characterPreset },
      { ...characterPreset },
      { ...characterPreset },
    ]);
    resetTargets();
    setScore(0);
    setIsSolving(false);
  }

  function resetTargets() {
    let targets: Character[] = [];
    if (endlessMode) {
      const targetCharacters = getRandomCharacter(
        charData,
        { endlessMode: endlessMode, mode: QUIZ_KEY.IMAGE },
        4,
      );
      targets = targetCharacters;
    } else {
      const hasSolvedToday = hasBeenSolvedToday(QUIZ_KEY.IMAGE);
      if (hasSolvedToday) {
        setIsSolving(true);
      } else {
        localStorage.removeItem(ANSWER_KEY);
        localStorage.removeItem(SCORE_KEY);
      }
      const targetCharacters = getRandomCharacter(
        charData,
        { endlessMode: endlessMode, mode: QUIZ_KEY.IMAGE },
        4,
      );
      targets = targetCharacters;
    }
    setTargets(targets);
  }

  const handleCharacterChange = (
    event: SyntheticEvent<Element, Event>,
    value: Character | null,
    reason: any,
    id?: number,
  ) => {
    if (typeof id === "number") {
      const elementCopy = [...elements];
      elementCopy[id].character = value;
      setElements(elementCopy);
    }
  };

  const handleAnimeChange = (
    event: SyntheticEvent<Element, Event>,
    value: Anime | null,
    reason: any,
    id?: number,
  ) => {
    if (typeof id === "number") {
      const elementCopy = [...elements];
      elementCopy[id].anime = value;
      setElements(elementCopy);
    }
  };

  function saveDailyAnswers(selection: ImageTarget[], score: number) {
    if (targets) {
      localStorage.setItem(ANSWER_KEY, JSON.stringify(selection));
      localStorage.setItem(SCORE_KEY, JSON.stringify(score));
    }
  }

  function checkCorrectAnswers() {
    if (targets) {
      if (hasBeenSolvedToday(QUIZ_KEY.IMAGE) && !endlessMode) {
        const dailyAnswers = localStorage.getItem(ANSWER_KEY);
        const dailyScore = localStorage.getItem(SCORE_KEY);
        if (dailyAnswers && dailyScore) {
          const parsedAnswers = JSON.parse(dailyAnswers) as ImageTarget[];
          const parsedScore = JSON.parse(dailyScore) as number;
          setElements(parsedAnswers);
          setScore(parsedScore);
          return;
        }
      }

      const selectionCopy = [...elements];
      let correctAnime = 0;
      let correctCharacter = 0;
      for (let i = 0; i < targets?.length; i++) {
        const target = targets[i];
        const selection = selectionCopy[i];
        if (selection.anime?.Name === target.Anime) {
          selection.isAnimeCorrect = true;
          correctAnime++;
        } else {
          const targetAnime = animeData.filter((anime) => anime.Name === target.Anime)[0];
          selection.anime = targetAnime;
          selection.isAnimeCorrect = false;
        }
        if (selection.character?.Name === target.Name) {
          selection.isCharacterCorrect = true;
          correctCharacter++;
        } else {
          selection.character = target;
          selection.isCharacterCorrect = false;
        }
      }
      const finalScore = calculatePoints(correctAnime, correctCharacter);
      if (finalScore === 10000) {
        saveFieldToTotalStatistics([StatisticFields.imageQuizMaxPoints], 1);
      }

      setScore(finalScore);
      setElements(selectionCopy);
      if (streakRef) {
        streakRef.current?.setStreak();
      }

      if (!endlessMode) {
        saveDailyAnswers(selectionCopy, finalScore);
        const utcDate = getDailyUTCDate();
        const solveData = {
          date: utcDate.toISOString(),
        };
        saveHasBeenSolvedToday(IMAGE_SOLVED_KEY, solveData);
        setDailyScore(utcDate.toISOString(), finalScore, QUIZ_KEY.IMAGE);
        saveFieldToTotalStatistics(
          [StatisticFields.totalWins, StatisticFields.totalGamesPlayed],
          1,
        );
        saveFieldToTotalStatistics([StatisticFields.totalCharacterImagesGuessed], 4);
        saveFieldToTotalStatistics([StatisticFields.totalScore], finalScore);
        applyCreditsToProfile(15);
      }
    }
  }

  function calculatePoints(animeCounter: number, charCounter: number) {
    const animePoints = animeCounter * BASEPOINTS_ANIME;
    const charPoints = charCounter * BASEPOINTS_CHAR;
    return animePoints + charPoints;
  }

  return (
    <Box display={"flex"} flexDirection="column" alignItems="center" width={"100%"}>
      <Box
        sx={{
          position: "relative",
          background: COLORS.gradient,
          padding: 4,
          borderRadius: 2,
          border: `1px solid ${COLORS.quiz.light}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        {!endlessMode && (
          <DayStreak
            ref={streakRef}
            streakKey={STREAK_KEY}
            colorRotate="250deg"
            sx={{ top: "-5px" }}
          ></DayStreak>
        )}

        <Box>
          <Box
            sx={{
              display: "flex",
              gap: 4,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {targets &&
              targets.map((char: Character, index) => (
                <Box
                  key={char.Name}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box
                    width={"200px"}
                    component={"img"}
                    height={"276px"}
                    sx={{
                      objectFit: "cover",
                    }}
                    src={getImgSrc(char.id)}
                  ></Box>
                  {!isSolving && (
                    <CharacterAutocomplete
                      width={200}
                      charData={charData.sort((a, b) => a.Name.localeCompare(b.Name))}
                      disabled={false}
                      value={elements[index].character}
                      handleSearchChange={handleCharacterChange}
                      id={index}
                    ></CharacterAutocomplete>
                  )}
                  {!isSolving && (
                    <AnimeAutocomplete
                      width={200}
                      animeData={animeData}
                      disabled={false}
                      value={elements[index].anime}
                      handleSearchChange={handleAnimeChange}
                      id={index}
                    ></AnimeAutocomplete>
                  )}
                  {isSolving && (
                    <Box sx={{ width: 200 }}>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          color: elements[index].isCharacterCorrect
                            ? COLORS.quiz.correct
                            : COLORS.quiz.failed,
                          marginBottom: 1,
                        }}
                      >
                        {elements[index].character?.Name ?? "-"}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          color: elements[index].isAnimeCorrect
                            ? COLORS.quiz.correct
                            : COLORS.quiz.failed,
                          whiteSpace: "break-spaces",
                        }}
                      >
                        {elements[index].anime === null ? "-" : elements[index].anime?.Name}
                      </Typography>
                    </Box>
                  )}
                </Box>
              ))}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 4,
            width: "100%",
          }}
        >
          {endlessMode && (
            <Button
              sx={{
                color: COLORS.quiz.light,
                borderColor: COLORS.quiz.light,
                "&:hover": {
                  fontWeight: "bold",
                  borderColor: COLORS.quiz.tertiary,
                },
              }}
              variant="outlined"
              onClick={resetImageQuiz}
            >
              Reset
            </Button>
          )}
          {!endlessMode && <Box />}
          {isSolving && (
            <Typography color={"white"} fontSize={"24px"}>
              🏆 {score}
            </Typography>
          )}
          <Button
            sx={{
              backgroundColor: COLORS.quiz.tertiary,
              "&:hover": {
                backgroundColor: COLORS.quiz.tertiary_hover,
              },
            }}
            variant="contained"
            onClick={() => setIsSolving(true)}
          >
            Solve
          </Button>
        </Box>
      </Box>
      {!endlessMode && isSolving && (
        <LemonButton onClick={(event) => changeQuizMode?.(event, 2)} text="Next: Anime Quiz" />
      )}
    </Box>
  );
}
