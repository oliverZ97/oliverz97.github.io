import {
  Box,
  Typography,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
  Tooltip,
} from "@mui/material";
import { getImgSrc } from "common/quizUtils";
import { Character, Difficulty } from "common/types";
import { getRandomCharacter, getYesterdayUTCDate } from "common/utils";
import { getCurrentVersion } from "common/version";
import { CharacterAutocomplete } from "components/CharacterAutocomplete";
import { DateTime } from "luxon";
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
  mode?: "blurred" | "normal";
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
  mode = "normal",
}: SearchBarProps) {
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
      const currentVersionDate = getCurrentVersion().date;
      const yesterday = getYesterdayUTCDate();
      if (
        DateTime.fromJSDate(yesterday) < DateTime.fromISO(currentVersionDate)
      ) {
        const char = getRandomCharacter(charData, {
          endlessMode: false,
          isPrevious: true,
          usePreviousVersion: true,
          quizMode: mode
        });
        return char.Name;
      }
      const char = getRandomCharacter(charData, {
        endlessMode: false,
        isPrevious: true,
        quizMode: mode
      });
      return char.Name;
    } else {
      return "-";
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
          "linear-gradient(90deg,rgba(0, 100, 148, 1) 0%, rgba(209, 107, 129, 1) 100%)",
        borderRadius: 2,
        border: `1px solid ${COLORS.quiz.light}`,
        width: "100%",
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
          padding: 2,
        },
      }}
    >
      {!endlessMode && originalCharData && (
        <Box
          display={"flex"}
          alignItems={"center"}
          gap={2}
          sx={{
            background:
              "linear-gradient(90deg,rgba(0, 53, 84, 1) 0%, rgba(0, 100, 148, 1) 100%)",
            width: "100%",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            paddingX: 2,
            paddingY: 1,
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
            title={getYesterdaysChar(originalCharData)}
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
              src={getImgSrc(getYesterdaysChar(originalCharData))}
            ></Box>
          </Tooltip>
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
        <Box sx={{
          position: "absolute", left: 16, [theme.breakpoints.down("md")]: {
            position: "initial"
          },
        }}>
          <Typography sx={{ color: "white" }}>{"Points: " + points}</Typography>
          <Typography sx={{ color: "white" }}>
            {"Tries: " + searchHistory.length}
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
            charData={charData}
            disabled={isCorrect}
            value={selectedOption}
            handleSearchChange={handleSearchChange}
            showPreviewImage={showPreviewImage}
          ></CharacterAutocomplete>

        </Box>
        <Box sx={{ position: "absolute", right: 16, display: "flex", gap: 1, [theme.breakpoints.down("md")]: { flexDirection: "column", position: "initial" } }}>
          {showGiveUp && !gaveUp && (
            <Button
              onClick={handleGiveUp}
              color="error"
              variant="contained"
            >
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
