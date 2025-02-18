import { Box, Button, CircularProgress, colors, Typography } from "@mui/material";
import { getImgSrc } from "common/quizUtils";
import { Character } from "common/types";
import { DayStreak, StreakRef } from "components/Streak";
import { useEffect, useRef, useState } from "react";
import { COLORS } from "styling/constants";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface ImageCharacterQuizProps {
  charData: Character[];
  animeData: string[];
  getRandomCharacter: () => Character;
}

interface ImageTarget {
  character: string;
  anime: string;
  isTarget: boolean;
}

const BASEPOINTS_ANIME = 1000;
const BASEPOINTS_CHAR = 1500;

export default function MultipleChoiceQuiz({
  getRandomCharacter, charData
}: ImageCharacterQuizProps) {
  const [answers, setAnswers] = useState<ImageTarget[]>([]);
  const [target, setTarget] = useState<Character | null>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lifes, setLifes] = useState(3);
  const [sessionHistory, setSessionHistory] = useState<string[]>([])
  const [isGameOver, setIsGameOver] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<ImageTarget | null>(
    {} as ImageTarget
  );

  const streakRef = useRef<StreakRef | null>(null);

  useEffect(() => {
    if (!target) {
      resetTargets();
    } else {
      getTargetAnswers();
    }
  }, [target]);

  useEffect(() => {
    if (selectedAnswer) {
      if (selectedAnswer.isTarget) {
        calculatePoints();
      } else {
        setLifes(lifes - 1);
        if (lifes < 1) {
          setIsGameOver(true);
          if (streakRef) {
            streakRef.current?.setStreak();
          }
        }
      }
      setTimeout(() => {
        resetTargets();
        setLevel(level + 1)
      }, 1000);
    }
  }, [selectedAnswer]);

  function resetImageQuiz() {
    setAnswers([
      {
        character: "",
        anime: "",
        isTarget: false,
      },
    ]);
    setSessionHistory([])
    setScore(0);
    setLevel(1);
    setLifes(2);
    resetTargets();
    getTargetAnswers();
  }

  function resetTargets() {
    if (sessionHistory.length === 2) {
      setIsGameOver(true);
      return;
    }
    let target = getRandomCharacter();
    while (sessionHistory.includes(target.Name)) {
      target = getRandomCharacter();
    }
    setSelectedAnswer(null);
    setTarget(target);
    setSessionHistory(sessionHistory => [...sessionHistory, target.Name])
  }

  function getTargetAnswers() {
    if (target) {
      let answers: ImageTarget[] = [];
      const correctAnswer: ImageTarget = {
        anime: target.Anime,
        character: target.Name,
        isTarget: true,
      };
      answers.push(correctAnswer);
      while (answers.length <= 3) {
        let char = getRandomCharacter();
        if (char.Name !== correctAnswer.character) {
          answers.push({
            anime: char.Anime,
            character: char.Name,
            isTarget: false,
          });
        }
      }

      answers = shuffleArray(answers);
      setAnswers(answers);
    }
  }

  function shuffleArray(array: ImageTarget[]) {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function checkCorrectAnswers(answer: ImageTarget) {
    setSelectedAnswer(answer);
  }

  function calculatePoints() {
    setScore(score + 1);
  }

  function returnAnswerColor(answer: ImageTarget | null) {
    if (selectedAnswer) {
      if (
        selectedAnswer.character === answer?.character &&
        selectedAnswer.isTarget
      ) {
        return COLORS.quiz.success;
      } else {
        return COLORS.quiz.failed;
      }
    } else {
      return COLORS.quiz.main;
    }
  }

  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: COLORS.quiz.secondary,
        padding: 4,
        borderRadius: "16px",
        border: `1px solid ${COLORS.quiz.light}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "500px",
      }}
    >
      <DayStreak
        ref={streakRef}
        streakKey={"imageStreak"}
        colorRotate="70deg"
        sx={{ top: "-121px", right: "-1px" }}
      ></DayStreak>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          position: "relative"
        }}
      >
        <Box position={"absolute"} sx={{ left: 0, top: 0 }}>

          {Array.from({ length: lifes + 1 }, (_, k) => (
            <FavoriteBorderIcon key={k} color="error"></FavoriteBorderIcon>
          ))}
          <Typography sx={{ color: "white", fontSize: "24px", paddingLeft: "2px" }}>{`${String(score).padStart(4, '0')}`}</Typography>
          <Typography sx={{ color: "white", fontSize: "18px", paddingLeft: "2px" }}>{`#${level}`}</Typography>

        </Box>
        <Box sx={{ display: "flex", gap: 4 }}>
          {target && (
            <Box
              width={"200px"}
              component={"img"}
              src={getImgSrc(target.Name)}
            ></Box>
          )}
          {!target && (
            <Box
              width={"200px"}
              height={"275px"}
              sx={{ backgroundColor: "transparent", display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <CircularProgress size={50} color="info"></CircularProgress>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            width: "70%",
            gap: 2,
          }}
        >
          {target &&
            answers.map((answer) => (
              <Box
                sx={{
                  border: `1px solid ${COLORS.quiz.light}`,
                  width: "450px",
                  paddingX: 2,
                  paddingY: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  color: "white",
                  cursor: "pointer",
                  backgroundColor: returnAnswerColor(answer),
                }}
                onClick={() => checkCorrectAnswers(answer)}
              >
                <Typography fontWeight={"bold"}>{answer.character}</Typography>
                <Typography>{answer.anime}</Typography>
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
        {/* {isSolving && <Typography fontSize={"24px"}>🏆 {score}</Typography>} */}
      </Box>
    </Box >
  );
}
