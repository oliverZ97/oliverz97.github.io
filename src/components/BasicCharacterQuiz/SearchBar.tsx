import {
  Box,
  Typography,
  Button,
  ButtonGroup,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from "@mui/material";
import { Character, Difficulty } from "common/types";
import { CharacterAutocomplete } from "components/CharacterAutocomplete";
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
  endlessMode = true
}: SearchBarProps) {
  const theme = useTheme();

  const handleDifficulty = (
    event: React.MouseEvent<HTMLElement>,
    newDifficulty: string | null
  ) => {
    if (newDifficulty && newDifficulty !== difficulty) {
      setDifficulty(newDifficulty as Difficulty);
      setTimeout(() => {
        init()
      }, 400)
    }

  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 4,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: COLORS.quiz.secondary,
        padding: 2,
        borderRadius: "16px",
        border: `1px solid ${COLORS.quiz.light}`,
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
          padding: 2,
        },
      }}
    >
      <Box>
        <Typography sx={{ color: "white" }}>{"Points: " + points}</Typography>
        <Typography sx={{ color: "white" }}>
          {"Tries: " + searchHistory.length}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          position: "relative",
        }}
      >
        <CharacterAutocomplete
          difficulty={difficulty}
          charData={charData}
          disabled={isCorrect}
          value={selectedOption}
          handleSearchChange={handleSearchChange}
          showPreviewImage
        ></CharacterAutocomplete>
        {showGiveUp && !gaveUp && (
          <Button
            onClick={handleGiveUp}
            sx={{ height: "40px", position: "absolute", right: -100 }}
            color="error"
            variant="contained"
          >
            Give Up!
          </Button>
        )}
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        {endlessMode && < ToggleButtonGroup
          value={difficulty}
          exclusive
          onChange={handleDifficulty}
          aria-label="text alignment"
          size="small"
          sx={{ backgroundColor: COLORS.quiz.main }}
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
        </ToggleButtonGroup>}
        {endlessMode && <Button
          onClick={init}
          sx={{
            backgroundColor: COLORS.quiz.main,
            color: "white",
            "&:hover": {
              backgroundColor: COLORS.quiz.secondary,
            },
          }}
          variant="outlined"
        >
          RESET QUIZ
        </Button>}
      </Box>
    </Box >
  );
}
