import { Box, Typography, useTheme } from "@mui/material";
import { RevealCard } from "components/RevealCard";
import { COLORS } from "styling/constants";
import { SearchBar } from "../BasicCharacterQuiz/SearchBar";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import {
  Character,
  Difficulty,
  SolvedKeys,
  StatisticFields,
} from "common/types";
import JSConfetti from "js-confetti";
import { compareObjects, getImgSrc, solveQuizHelper } from "common/quizUtils";
import { Score } from "pages/Home";
import { DayStreak } from "components/Streak";
import { StreakRef } from "components/Streak";
import {
  gaveUpOnTodaysQuiz,
  getRandomCharacter,
  hasBeenSolvedToday,
  isIncludedInDifficulty,
  QUIZ_KEY,
} from "common/utils";
import CharacterList from "./CharacterList";
import { getHighscoresFromProfile, saveFieldToTotalStatistics } from "common/profileUtils";
import { useProfile } from "components/Profile/ProfileContext";

interface HintRef {
  resetHint: () => void;
}

const BASEPOINTS = 1000;
const CHAR_SOLVED_KEY = (QUIZ_KEY.BLUR + "Solved") as SolvedKeys;

interface BasicCharacterQuizProps {
  charData: Character[];
  endlessMode?: boolean;
  changeQuizMode?: (event: React.SyntheticEvent, id: number) => void;
}

export default function BasicCharacterQuiz({
  charData,
  endlessMode = true,
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
  // Add a state to track if we should freeze the blur
  const [freezeBlur, setFreezeBlur] = useState(false);
  // Store the last blur value before freezing
  const [frozenBlurValue, setFrozenBlurValue] = useState(50);
  const [imageRevealed, setImageRevealed] = useState(false);
  const [imageKey, setImageKey] = useState(Date.now());

  const theme = useTheme();

  const releaseHintRef = useRef<HintRef | null>(null);
  const animeHintRef = useRef<HintRef | null>(null);
  const studioHintRef = useRef<HintRef | null>(null);
  const streakRef = useRef<StreakRef | null>(null);

  const { refreshKey } = useProfile();

  const STREAK_KEY = endlessMode ? "blurStreak" : "dailyBlurStreak";

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

  // Ensure blur factor is properly set whenever targetChar changes
  useEffect(() => {
    if (targetChar && !isCorrect && !gaveUp) {
      setBlurWithFreeze(50); // Reset to full blur when a new character is loaded
    }
  }, [targetChar, isCorrect, gaveUp]);

  useEffect(() => {
    if (selectedOption) {
      setTimeout(() => {
        setSelectedOption(null);
      }, 100);
    }
  }, [selectedOption]);

  useEffect(() => {
    //get scores
    const scores = getHighscoresFromProfile(QUIZ_KEY.BLUR);
    updateScores(scores);
  }, [refreshKey]);

  useEffect(() => {
    if (points <= 0 && !showGiveUp) {
      // Only set showGiveUp to true when points reach zero
      // Freeze the blur when showing the "Give Up" button
      setShowGiveUp(true);
      setFreezeBlur(true);
      // Store the current blur value
      setFrozenBlurValue(blurFactor);

      // Force a direct log to see what's happening with blur values
    }
  }, [points, showGiveUp, blurFactor]);

  // Safeguard to ensure blurFactor is never accidentally 0 unless the puzzle is solved
  useEffect(() => {
    if (
      blurFactor === 0 &&
      !isCorrect &&
      !gaveUp &&
      targetChar &&
      !freezeBlur
    ) {
      // If blur factor is 0 but the puzzle isn't solved, reset it
      // But don't do this if blur is frozen
      setBlurWithFreeze(50);
    }
  }, [blurFactor, isCorrect, gaveUp, targetChar, freezeBlur]);

  function updateScores(scores: Score[]) {
    if (scores) {
      const topThree = scores.slice(0, 3);
      setScores(topThree);
    }
  }

  function setBlurWithFreeze(newValue: number) {
    // If blur is frozen, always use the frozen value unless setting to 0 for correct answer
    if (freezeBlur) {
      if (newValue === 0) {
        // Only allow setting to 0 (for correct answer)
        setBlurFactor(0);
      } else {
        // Otherwise keep the frozen value
        setBlurFactor(frozenBlurValue);
      }
    } else {
      // Normal case - not frozen
      setBlurFactor(newValue);
    }
  }

  function resetQuiz() {
    // Reset all blur-related states
    setFreezeBlur(false);
    setFrozenBlurValue(50);
    setBlurFactor(50);

    // Reset other states
    setLocalCharData([...charData.sort((a, b) => (a.Name < b.Name ? -1 : 1))]);
    setSearchHistory([]);
    setPoints(10000);
    setShowGiveUp(false);
    setGaveUp(false);
    if (releaseHintRef.current) {
      releaseHintRef.current.resetHint();
    }
    if (animeHintRef.current) {
      animeHintRef?.current.resetHint();
    }
    if (studioHintRef.current) {
      studioHintRef?.current.resetHint();
    }
  }

  function init() {
    setIsCorrect(false);
    setImageRevealed(false); // Reset image reveal state
    setImageKey(Date.now()); // Force new image loading
    resetQuiz();

    //select random character
    let target = getRandomCharacter(charData, {
      endlessMode: endlessMode,
      quizMode: "blurred",
    });
    if (endlessMode) {
      while (!isIncludedInDifficulty(target, difficulty)) {
        target = getRandomCharacter(charData, {
          endlessMode: endlessMode,
          quizMode: "blurred",
        });
      }
    } else {
      const hasSolvedToday = hasBeenSolvedToday(QUIZ_KEY.BLUR);
      const gaveUpToday = gaveUpOnTodaysQuiz(QUIZ_KEY.BLUR);
      if (hasSolvedToday) {
        setIsCorrect(true);
        setBlurFactor(0);
        setFrozenBlurValue(0);
        setImageRevealed(true); // Add this line
        setImageKey(Date.now()); // Force image reload
      }
      if (gaveUpToday) {
        setGaveUp(true);
        setBlurFactor(0);
        setFrozenBlurValue(0);
        setImageRevealed(true); // Add this line
        setImageKey(Date.now()); // Force image reload
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

      // Check if the answer is correct
      const isCorrectAnswer =
        res.all.length + 1 === Object.keys(targetChar).length;

      if (isCorrectAnswer) {
        // Always allow setting blur to 0 for a correct answer
        setBlurWithFreeze(0);
        setBlurFactor(0); // Explicitly set blur to 0
        setFrozenBlurValue(0); // Ensure frozen value is 0 too
        setImageRevealed(true); // Explicitly mark image as revealed
        setImageKey(Date.now()); // Force image reload

        saveFieldToTotalStatistics([StatisticFields.totalBlurredCharacterGuesses], searchHistory.length + 1);

        solveQuizHelper(
          reason,
          setGaveUp,
          setIsCorrect,
          endlessMode,
          CHAR_SOLVED_KEY,
          QUIZ_KEY.BLUR,
          points,
          targetChar,
          res
        );

        //get scores
        const scores = getHighscoresFromProfile(QUIZ_KEY.BLUR);
        updateScores(scores);

        if (streakRef.current) {
          streakRef.current.setStreak();
        }

        return; // Exit early for correct answers to avoid blur changes
      }

      // For incorrect answers, continue with points calculation and blur adjustment
      const oldPoints = points;
      const newPoints = Math.max(0, points - BASEPOINTS);

      // Update points
      setPoints(newPoints);

      // Check if we just hit zero points
      if (oldPoints > 0 && newPoints <= 0) {
        // If we just hit zero points, freeze the blur at current value
        setFreezeBlur(true);
        setFrozenBlurValue(blurFactor);
      } else if (!freezeBlur) {
        // Only change blur if we're not frozen
        setBlurWithFreeze(blurFactor - 5);
      }
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

          <DayStreak ref={streakRef} streakKey={STREAK_KEY}></DayStreak>
        </Box>
      )}

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
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
            width: "100%",
            position: "relative",
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
              ref={studioHintRef}
              cardText={targetChar?.Studio ?? ""}
              cardTitle="Studio"
              disabled={searchHistory.length <= 3}
              sx={{
                width: "250px",
              }}
            ></RevealCard>
            <RevealCard
              onReveal={() => { }}
              ref={releaseHintRef}
              cardText={targetChar?.First_Release_Year.toString() ?? ""}
              cardTitle="First Release Year"
              disabled={searchHistory.length <= 6}
              sx={{
                width: "250px",
              }}
            ></RevealCard>
            <RevealCard
              onReveal={() => { }}
              ref={animeHintRef}
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
              key={`${targetChar.Name}-container-${Date.now()}`} // Force re-render with unique key
              sx={{
                gap: 2,
                position: "relative",
                width: "300px",
                height: "420px",
                overflow: "hidden",
                backgroundColor: "rgba(200, 200, 200, 0.2)",
                border: "1px solid rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Primary blurred background using multiple techniques */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: "300px",
                  height: "420px",
                  backgroundImage: `url(${getImgSrc(targetChar.Name)})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: `blur(${freezeBlur ? frozenBlurValue : blurFactor
                    }px)`,
                  transform: "scale(1.05)",
                  zIndex: 1,
                  willChange: "filter, opacity",
                }}
              />

              {/* Redundant image element as additional backup */}
              <Box
                component="img"
                src={getImgSrc(targetChar.Name)}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "300px",
                  height: "420px",
                  objectFit: "cover",
                  filter: `blur(${freezeBlur ? frozenBlurValue : blurFactor
                    }px)`,
                  opacity: blurFactor > 0 ? 0.5 : 0, // Low opacity backup when blurred
                  zIndex: 1,
                }}
                loading="eager"
              />

              {/* Clean image for when solved */}
              <Box
                component="img"
                key={`clean-image-${imageKey}`} // Force re-render with unique key
                src={getImgSrc(targetChar.Name)}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "300px",
                  height: "420px",
                  objectFit: "cover",
                  opacity: imageRevealed || isCorrect || gaveUp ? 1 : 0, // Use explicit state and fallbacks
                  transition: "opacity 0.3s ease",
                  zIndex: 10, // Increased to ensure it's on top
                }}
                loading="eager"
                onError={(e) => {
                  // If image fails to load, try reloading once
                  const target = e.currentTarget;
                  const currentSrc = target.src;
                  target.src = "";
                  setTimeout(() => {
                    target.src = currentSrc;
                  }, 200);
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
        init={() => {
          // Reset freeze state when initializing
          setFreezeBlur(false);
          // When restarting, make sure to properly set the blur
          init();
        }}
        handleGiveUp={() => {
          // Store current blur value before giving up
          setFrozenBlurValue(blurFactor);
          setFreezeBlur(true);

          // Then handle the give up action
          handleSearchChange(null, targetChar, "giveUp");
        }}
        showGiveUp={showGiveUp}
        gaveUp={gaveUp}
        endlessMode={endlessMode}
        originalCharData={charData}
        showPreviewImage={false}
        mode="blurred"
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
