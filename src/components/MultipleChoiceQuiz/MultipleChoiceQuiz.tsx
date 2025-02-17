import { Box, Button, CircularProgress, colors, Typography } from "@mui/material";
import { getImgSrc } from "common/quizUtils";
import { Character } from "common/types";
import { AnimeAutocomplete } from "components/AnimeAutocomplete";
import { CharacterAutocomplete } from "components/CharacterAutocomplete";
import { DayStreak, StreakRef } from "components/Streak";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
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
  charData,
  getRandomCharacter,
  animeData,
}: ImageCharacterQuizProps) {
  const [isSolving, setIsSolving] = useState(false);
  const [answers, setAnswers] = useState<ImageTarget[]>([]);
  const [target, setTarget] = useState<Character | null>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lifes, setLifes] = useState(3);
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
        if(lifes < 1) {
          setIsGameOver(true);
          if(streakRef) {
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
    resetTargets();
    setScore(0);
    setLevel(1);
    setLifes(2);
    setIsSolving(false);
  }

  function resetTargets() {
    const targetCharacters = getRandomCharacterArray(1);
    const targets = targetCharacters[0];
    setSelectedAnswer(null);
    setTarget(targets);
  }

  function getRandomCharacterArray(count: number) {
    let counter = 0;
    let chars: Character[] = [];
    while (counter < Math.max(0, count)) {
      const char = getRandomCharacter();
      if (!chars.some((item) => item.Name === char.Name)) {
        chars.push(char);
        counter++;
      }
    }
    return chars;
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

      let randoms = getRandomCharacterArray(3);
      randoms.forEach((item) => {
        answers.push({
          anime: item.Anime,
          character: item.Name,
          isTarget: false,
        });
      });
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
      <Box position={"absolute"} sx={{left: 0, top: 0}}>

        { Array.from({ length: lifes + 1 }, (_, k) => (
          <FavoriteBorderIcon color="error"></FavoriteBorderIcon>
        ))}
        <Typography sx={{color: "white", fontSize: "24px", paddingLeft: "2px"}}>{`${String(score).padStart(4, '0')}`}</Typography>
        <Typography sx={{color: "white", fontSize: "18px", paddingLeft: "2px"}}>{`#${level}`}</Typography>

      </Box>
        <Box sx={{ display: "flex", gap: 4 }}>
          {target && (
            <Box
              key={target.Name}
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
                src={getImgSrc(target.Name)}
              ></Box>
            </Box>
          )}
          {!target && (
            <Box sx={{ height: "275.33px", width: "200px" }}>
              <CircularProgress size="30px" color="primary"></CircularProgress>
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
    </Box>
  );
}
