import { Box, Button, Typography } from "@mui/material";
import { getImgSrc } from "common/quizUtils";
import { Anime, Character } from "common/types";
import {
  getDailyUTCDate,
  getRandomCharacter,
  hasBeenSolvedToday,
  QUIZ_KEY,
} from "common/utils";
import { AnimeAutocomplete } from "components/AnimeAutocomplete";
import { CharacterAutocomplete } from "components/CharacterAutocomplete";
import { DayStreak, StreakRef } from "components/Streak";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { COLORS } from "styling/constants";

interface ImageCharacterQuizProps {
  charData: Character[];
  animeData: Anime[];
  endlessMode?: boolean;
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
const IMAGE_SOLVED_KEY = QUIZ_KEY.IMAGE + "_HasBeenSolvedToday";

export default function ImageCharacterQuiz({
  charData,
  animeData,
  endlessMode = true,
}: ImageCharacterQuizProps) {
  const [isSolving, setIsSolving] = useState(false);
  const [elements, setElements] = useState<ImageTarget[]>([
    {
      character: null,
      anime: null,
      isCharacterCorrect: false,
      isAnimeCorrect: false,
    },
    {
      character: null,
      anime: null,
      isCharacterCorrect: false,
      isAnimeCorrect: false,
    },
    {
      character: null,
      anime: null,
      isCharacterCorrect: false,
      isAnimeCorrect: false,
    },
    {
      character: null,
      anime: null,
      isCharacterCorrect: false,
      isAnimeCorrect: false,
    },
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
      {
        character: null,
        anime: null,
        isCharacterCorrect: false,
        isAnimeCorrect: false,
      },
      {
        character: null,
        anime: null,
        isCharacterCorrect: false,
        isAnimeCorrect: false,
      },
      {
        character: null,
        anime: null,
        isCharacterCorrect: false,
        isAnimeCorrect: false,
      },
      {
        character: null,
        anime: null,
        isCharacterCorrect: false,
        isAnimeCorrect: false,
      },
    ]);
    resetTargets();
    setScore(0);
    setIsSolving(false);
  }

  function resetTargets() {
    let targets: Character[] = [];
    if (endlessMode) {
      const targetCharacters = getRandomCharacterArray(4);
      targets = targetCharacters;
    } else {
      const hasSolvedToday = hasBeenSolvedToday(QUIZ_KEY.IMAGE);
      if (hasSolvedToday) {
        setIsSolving(true);
      } else {
        localStorage.removeItem(ANSWER_KEY);
        localStorage.removeItem(SCORE_KEY);
      }
      const targetCharacters = getRandomCharacterArray(4, false);
      targets = targetCharacters;
    }
    setTargets(targets);
  }

  const handleCharacterChange = (
    event: SyntheticEvent<Element, Event>,
    value: Character | null,
    reason: any,
    id?: number
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
    id?: number
  ) => {
    if (typeof id === "number") {
      const elementCopy = [...elements];
      elementCopy[id].anime = value;
      setElements(elementCopy);
    }
  };

  function getRandomCharacterArray(
    count: number,
    endlessMode = true
  ): Character[] {
    let counter = 0;
    let chars: Character[] = [];
    if (endlessMode) {
      while (counter < Math.max(0, count)) {
        const char = getRandomCharacter(charData);
        if (!chars.some((item) => item.Name === char.Name)) {
          chars.push(char);
          counter++;
        }
      }
    } else {
      // Get current day of the year to ensure all characters are used
      // Use the current date in production, or test date for development
      const isTestMode = false; // Toggle this for testing
      const customTestDate = new Date("2025-01-05T10:00:00Z");
      const today = isTestMode ? customTestDate : new Date();

      const dayOfYear = Math.floor(
        (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
          (1000 * 60 * 60 * 24)
      );
      const yearSignature = `${today.getFullYear()}`;

      // Create a seed using the day of year and year
      let seed = dayOfYear;
      for (let i = 0; i < yearSignature.length; i++) {
        seed += yearSignature.charCodeAt(i);
      }

      // Add a prime multiplier to ensure different sets on consecutive days
      const primeFactor = 31;
      seed = seed * primeFactor;

      // Create character pools that rotate through the year
      // This ensures all characters get chosen at some point
      // Use a different rotation offset formula to avoid patterns
      const rotationOffset = (dayOfYear * primeFactor) % charData.length;

      // Create a rotated copy of the character data
      const rotatedChars = [
        ...charData.slice(rotationOffset),
        ...charData.slice(0, rotationOffset),
      ];

      // Further shuffle the rotated characters with the seed
      // Use character ID or another unique property in the hash calculation
      const shuffledChars = [...rotatedChars].sort((a, b) => {
        const hashA =
          (seed * (a.Name.length + a.Anime.length)) % charData.length;
        const hashB =
          (seed * (b.Name.length + b.Anime.length)) % charData.length;
        return hashA - hashB;
      });

      // Get the first four unique characters
      chars = [];
      let i = 0;
      while (chars.length < count && i < shuffledChars.length) {
        // Ensure we don't add duplicates
        if (!chars.some((char) => char.Name === shuffledChars[i].Name)) {
          chars.push(shuffledChars[i]);
        }
        i++;
      }
    }
    return chars;
  }

  function saveDailyAnswers(selection: ImageTarget[], score: number) {
    if (targets) {
      localStorage.setItem(ANSWER_KEY, JSON.stringify(selection));
      localStorage.setItem(SCORE_KEY, JSON.stringify(score));
    }
  }

  function checkCorrectAnswers() {
    if (targets) {
      if (hasBeenSolvedToday(QUIZ_KEY.IMAGE)) {
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
          const targetAnime = animeData.filter(
            (anime) => anime.Name === target.Anime
          )[0];
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
        localStorage.setItem(IMAGE_SOLVED_KEY, JSON.stringify(solveData));
      }
    }
  }

  function calculatePoints(animeCounter: number, charCounter: number) {
    const animePoints = animeCounter * BASEPOINTS_ANIME;
    const charPoints = charCounter * BASEPOINTS_CHAR;
    return animePoints + charPoints;
  }

  return (
    <Box
      sx={{
        position: "relative",
        background:
          "linear-gradient(90deg,rgba(0, 100, 148, 1) 0%, rgba(209, 107, 129, 1) 100%)",
        padding: 4,
        borderRadius: 2,
        border: `1px solid ${COLORS.quiz.light}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <DayStreak
        ref={streakRef}
        streakKey={STREAK_KEY}
        colorRotate="250deg"
        sx={{ top: "-5px" }}
      ></DayStreak>

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
                  src={getImgSrc(char.Name)}
                ></Box>
                {!isSolving && (
                  <CharacterAutocomplete
                    width={200}
                    charData={charData}
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
                      {elements[index].anime === null
                        ? "-"
                        : elements[index].anime?.Name}
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
  );
}
