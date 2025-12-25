import {
  Box,
  Typography,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
  Tooltip,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { getProfileSetting, updateProfileSettings } from "common/profileUtils";
import { getImgSrc, getTodaysCharacterPointsAndTries } from "common/quizUtils";
import { Character, Difficulty } from "common/types";
import { getRandomCharacter, QUIZ_KEY } from "common/utils";
import { CharacterAutocomplete } from "components/CharacterAutocomplete";
import { CustomSwitch } from "components/CustomSwitch";
import { useState } from "react";
import { COLORS } from "styling/constants";

interface SearchBarProps {
  points: number;
  searchHistory: Character[];
  isCorrect: boolean;
  selectedOption: Character | null;
  charData: Character[];
  handleSearchChange: (
    event: any,
    value: Character | null,
    reason: any
  ) => void;
  init: () => void;
  setDifficulty: (difficuly: Difficulty) => void;
  difficulty: Difficulty;
  showGiveUp: boolean;
  gaveUp: boolean;
  handleGiveUp: () => void;
  endlessMode?: boolean;
  originalCharData: Character[];
  showPreviewImage?: boolean;
  showAnimeHintOption?: boolean;
  mode?: "blurred" | "normal";
  quizKey?: QUIZ_KEY;
}

export function SearchBar({
  points,
  searchHistory,
  isCorrect,
  selectedOption,
  charData,
  handleSearchChange,
  init,
  setDifficulty,
  difficulty,
  showGiveUp,
  gaveUp,
  handleGiveUp,
  endlessMode = true,
  originalCharData,
  showPreviewImage = true,
  showAnimeHintOption = true,
  mode = "normal",
  quizKey,
}: SearchBarProps) {
  const [autoRevealHintSetting, setAutoRevealHintSetting] = useState<boolean>(
    getProfileSetting("autoRevealBasicQuizHints") as boolean
  );

  const theme = useTheme();

  const handleDifficulty = (
    event: React.MouseEvent<HTMLElement>,
    newDifficulty: string | null
  ) => {
    if (newDifficulty && newDifficulty !== difficulty) {
      setDifficulty(newDifficulty as Difficulty);
      setTimeout(() => {
        init();
      }, 400);
    }
  };

  function getYesterdaysChar(charData: Character[]) {
    if (charData.length > 0) {
      const char = getRandomCharacter(charData, {
        endlessMode: false,
        isPrevious: true,
        quizMode: mode,
      });
      return char;
    } else {
      return null;
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        alignItems: "center",
        justifyContent: "space-between",
        background:
          COLORS.gradient,
        borderRadius: 2,
        border: `1px solid ${COLORS.quiz.light}`,
        width: "100%",
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
          padding: 2,
        },
      }}
    >
      {(showAnimeHintOption || !endlessMode) && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            background: COLORS.gradientBar,
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            paddingX: 2,
            paddingY: 1,
            justifyContent: "space-between",
          }}
        >
          {!endlessMode && originalCharData && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography
                fontSize="16px"
                textAlign={"center"}
                fontWeight={"bold"}
                color={"white"}
              >
                {"Yesterdays character:"}
              </Typography>

              <Tooltip
                title={getYesterdaysChar(originalCharData)?.Name}
                placement="bottom"
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, -24],
                        },
                      },
                    ],
                  },
                }}
              >
                <Box
                  sx={{ maxWidth: "60px", height: "50px", objectFit: "cover" }}
                  component={"img"}
                  src={getImgSrc(getYesterdaysChar(originalCharData)?.id ?? 0)}
                ></Box>
              </Tooltip>
            </Box>
          )}
          {showAnimeHintOption && (
            <FormControlLabel
              control={
                <CustomSwitch
                  onChange={(event, checked) => {
                    setAutoRevealHintSetting(checked);
                    updateProfileSettings("autoRevealBasicQuizHints", checked);
                  }}
                  checked={autoRevealHintSetting}
                  inputProps={{ "aria-label": "Switch demo" }}
                />
              }
              sx={{
                color: "white",
                "& .MuiFormControlLabel-label": { fontSize: "14px" },
              }}
              label="Reveal Hints automatically"
            />
          )}
        </Box>
      )}

      <Box
        sx={{
          width: "100%",
          display: "flex",
          gap: 4,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 2,
          marginBottom: 2,
          paddingX: 2,
          [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            padding: 2,
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: 16,
            [theme.breakpoints.down("md")]: {
              position: "initial",
            },
          }}
        >
          <Typography sx={{ color: "white" }}>
            {"Points: " +
              (isCorrect
                ? getTodaysCharacterPointsAndTries(quizKey ?? QUIZ_KEY.CHAR)
                  .points
                : gaveUp
                  ? 0
                  : points)}
          </Typography>
          <Typography sx={{ color: "white" }}>
            {"Tries: " +
              (isCorrect
                ? getTodaysCharacterPointsAndTries(quizKey ?? QUIZ_KEY.CHAR)
                  .tries
                : gaveUp
                  ? 0
                  : searchHistory.length)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            position: "relative",
            marginTop: endlessMode ? 2 : 0,
            width: "60%",
            [theme.breakpoints.down("md")]: {
              width: "100%",
            },
          }}
        >
          <CharacterAutocomplete
            difficulty={difficulty}
            charData={charData.sort((a, b) => a.Name.localeCompare(b.Name))}
            disabled={isCorrect}
            value={selectedOption}
            handleSearchChange={handleSearchChange}
            showPreviewImage={showPreviewImage}
          ></CharacterAutocomplete>
        </Box>
        <Box
          sx={{
            position: "absolute",
            right: 16,
            display: "flex",
            gap: 1,
            [theme.breakpoints.down("md")]: {
              flexDirection: "column",
              position: "initial",
            },
          }}
        >
          {showGiveUp && !gaveUp && (
            <Button onClick={handleGiveUp} color="error" variant="contained">
              Give Up!
            </Button>
          )}
          {endlessMode && (
            <ToggleButtonGroup
              value={difficulty}
              exclusive
              onChange={handleDifficulty}
              aria-label="text alignment"
              size="small"
              sx={{
                backgroundColor: COLORS.quiz.main,
                border: `2px solid ${COLORS.quiz.light}`,
              }}
            >
              <ToggleButton value="A" aria-label="left aligned">
                <Typography sx={{ color: "white" }}>Easy</Typography>
              </ToggleButton>
              <ToggleButton value="B" aria-label="centered">
                <Typography sx={{ color: "white" }}>Normal</Typography>
              </ToggleButton>
              <ToggleButton value="C" aria-label="right aligned">
                <Typography sx={{ color: "white" }}>Hard</Typography>
              </ToggleButton>
            </ToggleButtonGroup>
          )}
          {endlessMode && (
            <Button
              onClick={init}
              sx={{
                backgroundColor: COLORS.quiz.main,
                border: `2px solid ${COLORS.quiz.light}`,
                color: "white",
                "&:hover": {
                  backgroundColor: COLORS.quiz.secondary,
                  border: `2px solid ${COLORS.quiz.light}`,
                },
              }}
              variant="outlined"
            >
              RESET QUIZ
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
