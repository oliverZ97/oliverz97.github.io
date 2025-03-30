import {
  Box,
  Button,
  CircularProgress,
  colors,
  Typography,
  useTheme,
} from "@mui/material";
import { getImgSrc } from "common/quizUtils";
import { Character } from "common/types";
import { DayStreak, StreakRef } from "components/Streak";
import { useEffect, useRef, useState } from "react";
import { COLORS } from "styling/constants";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { Score } from "pages/Home";

interface ImageCharacterQuizProps {
  charData: Character[];
  animeData: string[];
  getRandomCharacter: () => Character;
}

interface ImageTarget {
  character: string;
  anime: string;
  isTarget: boolean;
  isJokerAnswer: boolean;
}

let score = 0;
let topThree: Score[] = [];
const scores = localStorage.getItem("multiple_choice_scores");
if (scores) {
  const scoreArr = JSON.parse(scores) as Score[];
  topThree = scoreArr.slice(0, 3);
}

export default function MultipleChoiceQuiz({
  getRandomCharacter,
  charData,
}: ImageCharacterQuizProps) {
  const [answers, setAnswers] = useState<ImageTarget[]>([]);
  const [target, setTarget] = useState<Character | null>(null);
  const [level, setLevel] = useState(1);
  const [lifes, setLifes] = useState(3);
  const [sessionHistory, setSessionHistory] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<ImageTarget | null>(
    null
  );
  const [scores, setScores] = useState<Score[]>(topThree);
  const [fiftyJoker, setFiftyJoker] = useState<"idle" | "active" | "used">(
    "idle"
  );
  const [skipJoker, setSkipJoker] = useState<"idle" | "active" | "used">(
    "idle"
  );

  const streakRef = useRef<StreakRef | null>(null);
  const theme = useTheme();

  useEffect(() => {
    if (!target) {
      resetTargets();
      getTargetAnswers();
    } else {
      getTargetAnswers();
    }
  }, [target]);

  function skipQuestion() {
    resetTargets();
    setLevel(level + 1);
  }

  function setHighscore() {
    //Set Highscore
    const scoreObj = {
      points: score,
      date: new Date().toLocaleString("de-DE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
    };

    let localScores = localStorage.getItem("multiple_choice_scores");
    let scores;
    if (localScores) {
      scores = JSON.parse(localScores);
      scores.push(scoreObj);
    } else[(scores = [scoreObj])];

    //sort
    scores.sort((a: Score, b: Score) => (a.points < b.points ? 1 : -1));
    setScores(scores.slice(0, 3));
    const scoreString = JSON.stringify(scores);
    localStorage.setItem("multiple_choice_scores", scoreString);
    if (streakRef) {
      streakRef.current?.setStreak();
    }
    if (streakRef) {
      streakRef.current?.setStreak();
    }
  }

  function resetImageQuiz() {
    setAnswers([
      {
        character: "",
        anime: "",
        isTarget: false,
        isJokerAnswer: false,
      },
    ]);
    setSessionHistory([]);
    score = 0;
    setLevel(1);
    setLifes(3);
    setFiftyJoker("idle");
    setSkipJoker("idle");
    setIsGameOver(false);
    resetTargets();
    getTargetAnswers();
  }

  function resetTargets() {
    let target = getRandomCharacter();
    while (sessionHistory.includes(target.Name)) {
      target = getRandomCharacter();
    }
    setSelectedAnswer(null);
    setTarget(target);
    setSessionHistory((sessionHistory) => [...sessionHistory, target.Name]);
  }

  function getTargetAnswers() {
    if (target) {
      let answers: ImageTarget[] = [];
      const correctAnswer: ImageTarget = {
        anime: target.Anime,
        character: target.Name,
        isTarget: true,
        isJokerAnswer: true,
      };
      answers.push(correctAnswer);
      let jokerAnswerSet = false;
      while (answers.length <= 3) {
        let char = getRandomCharacter();
        if (char.Name !== correctAnswer.character) {
          answers.push({
            anime: char.Anime,
            character: char.Name,
            isTarget: false,
            isJokerAnswer: !jokerAnswerSet ? true : false,
          });
          jokerAnswerSet = true;
          if (fiftyJoker !== "idle") {
            jokerAnswerSet = false;
          }
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
    if (answer.isTarget) {
      calculatePoints();
    } else {
      setLifes(lifes - 1);
      if (lifes < 1) {
        setIsGameOver(true);
        setHighscore();
      }
    }
    if (fiftyJoker === "active") {
      setFiftyJoker("used");
    }
    setSelectedAnswer(answer);

    if (sessionHistory.length + 1 === charData.length) {
      setIsGameOver(true);
      setHighscore();
      return;
    } else {
      setTimeout(() => {
        skipQuestion();
      }, 1000);
    }
  }

  function calculatePoints() {
    score++;
  }

  function returnAnswerColor(answer: ImageTarget | null) {
    if (selectedAnswer) {
      if (answer?.character === target?.Name) {
        return COLORS.quiz.success;
      } else {
        return COLORS.quiz.failed;
      }
    } else {
      if (fiftyJoker === "active") {
        if (!answer?.isJokerAnswer) {
          return COLORS.quiz.disabled;
        } else {
          return COLORS.quiz.main;
        }
      } else {
        return COLORS.quiz.main;
      }
    }
  }

  function useFiftyJoker() {
    setFiftyJoker("active");
  }

  function useSkipJoker() {
    setSkipJoker("active");
    skipQuestion();
    score = (Math.max(score - 3, 0));
    setSkipJoker("used");
  }

  return (
    <Box position={"relative"}>
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
            position: "relative"
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
                        {scores.length === 0 && <Typography sx={{color: COLORS.quiz.primary_text}} textAlign={"center"}>
              <Typography component={"span"}>
              No Scores available.
              </Typography>
              <br/>
              <Typography component={"span"}>
              You should definitely change that (*≧ω≦*)
              </Typography>
               </Typography>}
          </Box>
        </Box>
      <DayStreak
        ref={streakRef}
        streakKey={"choiceStreak"}
        colorRotate="70deg"
      ></DayStreak>
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            position: "relative",
            flexGrow: 1,
          }}
        >
          {!isGameOver && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                position: "relative",
              }}
            >
              <Box
                position={"absolute"}
                sx={{
                  left: 0,
                  top: 0,
                  [theme.breakpoints.down("md")]: {
                    left: 60,
                  },
                }}
              >
                {Array.from({ length: lifes }, (_, k) => (
                  <FavoriteIcon
                    key={k}
                    sx={{ color: COLORS.quiz.hearts }}
                    color="error"
                  ></FavoriteIcon>
                ))}
                {lifes === 0 && (
                  <FavoriteIcon
                    sx={{
                      color: COLORS.quiz.hearts,
                      "@keyframes blinking": {
                        "0%": {
                          color: COLORS.quiz.hearts,
                        },
                        "50%": {
                          color: "transparent",
                        },
                        "100%": {
                          color: COLORS.quiz.hearts,
                        },
                      },
                      animation: "blinking 3s ease-out infinite",
                    }}
                  ></FavoriteIcon>
                )}
                <Typography
                  sx={{ color: "white", fontSize: "24px", paddingLeft: "2px" }}
                >{`${String(score).padStart(4, "0")}`}</Typography>
                <Typography
                  sx={{ color: "white", fontSize: "18px", paddingLeft: "2px" }}
                >{`#${level}`}</Typography>
              </Box>
              <Box
                position={"absolute"}
                sx={{
                  right: 0,
                  top: 0,
                  display: "flex",
                  gap: 1,
                  [theme.breakpoints.down("md")]: {
                    right: 60,
                  },
                }}
              >
                <Button
                  disabled={fiftyJoker !== "idle"}
                  onClick={useFiftyJoker}
                  sx={{
                    backgroundColor: COLORS.quiz.main,
                    "&:hover": {
                      backgroundColor: COLORS.quiz.main_hover,
                    },
                  }}
                  variant="contained"
                >
                  <sup>50</sup>/<sup>50</sup>
                </Button>
                <Button
                  disabled={skipJoker === "used"}
                  onClick={useSkipJoker}
                  sx={{
                    backgroundColor: COLORS.quiz.main,
                    "&:hover": {
                      backgroundColor: COLORS.quiz.main_hover,
                    },
                  }}
                  variant="contained"
                >
                  &gt;&gt;
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 4,
                  [theme.breakpoints.down("md")]: {
                    marginTop: "100px",
                  },
                }}
              >
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
                    sx={{
                      backgroundColor: "transparent",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
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
                    <Button
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
                        textTransform: "capitalize",
                        "&:hover": {
                          backgroundColor: selectedAnswer
                            ? returnAnswerColor(answer)
                            : COLORS.quiz.main_hover,
                        },
                        "&:active": {
                          backgroundColor: returnAnswerColor(answer),
                        },
                      }}
                      disabled={
                        fiftyJoker === "active" && !answer.isJokerAnswer
                      }
                      onClick={() => checkCorrectAnswers(answer)}
                    >
                      <Typography fontWeight={"bold"}>
                        {answer.character}
                      </Typography>
                      <Typography>{answer.anime}</Typography>
                    </Button>
                  ))}
              </Box>
            </Box>
          )}
          {isGameOver && (
            <Box sx={{ height: "100%", width: "100%" }}>
              <Typography
                marginBottom={2}
                textAlign={"center"}
                variant="h4"
                color={COLORS.quiz.light}
              >
                Game Over!
              </Typography>
              <Box
                width={"200px"}
                component={"img"}
                src={
                  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExODN6MGVsaW5rYmZwdnQxaHl5M293M2V1eDZtcnltd2JyM2ZyYXExaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/a6pzK009rlCak/giphy.gif"
                }
              ></Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography fontSize={"40px"}>🏆</Typography>
                <Typography
                  fontSize={"20px"}
                  textAlign={"center"}
                  color={"white"}
                >{`Your Score: ${score}`}</Typography>
              </Box>
            </Box>
          )}
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
        </Box>
      </Box>
    </Box>
  );
}
