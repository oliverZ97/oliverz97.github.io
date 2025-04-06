import { Box, Button, ButtonGroup, FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, Typography } from "@mui/material"
import { getImgSrc } from "common/quizUtils";
import { Character } from "common/types";
import { getRandomCharacterArray } from "common/utils";
import { useEffect, useState } from "react";
import { COLORS } from "styling/constants"
import { ButtonContainer, State } from "./ButtonContainer";
import RefreshIcon from '@mui/icons-material/Refresh';

interface KissMarryKillProps {
  charData: Character[];
}

export type SelectionState = {
  [key in State]?: boolean;
};

export const KissMarryKill = ({ charData }: KissMarryKillProps) => {
  const [targets, setTargets] = useState<Character[] | null>(null);
  const [selectionStates, setSelectionStates] = useState<SelectionState>({
    "kiss": false,
    "marry": false,
    "kill": false
  })
  const [genderFilter, setGenderFilter] = useState("all");

  function updateSelectionState(state: State) {
    const newStates = { ...selectionStates };
    newStates[state] = !newStates[state];
    setSelectionStates(newStates)
  }

  useEffect(() => {
    if (!targets || genderFilter) {
      resetTargets();
    }
  }, [genderFilter]);

  function resetTargets() {
    const targetCharacters = getRandomCharacterArray(charData, 3, genderFilter);
    const targets = targetCharacters;
    setTargets(targets);
    setSelectionStates({
      "kiss": false,
      "marry": false,
      "kill": false
    })
  }

  return (
    <Box position={"relative"}>
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
        <Box>
          <Box display={"flex"} justifyContent={"space-between"} alignItems={"flex-start"} marginBottom={2}>
            <FormControl>
              <FormLabel sx={{
                color: COLORS.quiz.primary_text, "&.Mui-focused": {
                  color: COLORS.quiz.primary_text
                }
              }}>Gender</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="all"
                name="radio-buttons-group"
                row
                onChange={(event) => setGenderFilter(event?.target.value)}
              >
                <FormControlLabel sx={{ color: COLORS.quiz.primary_text }} value="all" control={<Radio />} label="All" />
                <FormControlLabel sx={{ color: COLORS.quiz.primary_text }} value="female" control={<Radio />} label="Female" />
                <FormControlLabel sx={{ color: COLORS.quiz.primary_text }} value="male" control={<Radio />} label="Male" />
              </RadioGroup>
            </FormControl>

          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 4,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {targets &&
              targets.map((char: Character) => (
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
                    src={getImgSrc(char.Name)}
                  />
                  <Box sx={{ width: 200 }}>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        marginBottom: 1,
                        textAlign: "center",
                        color: COLORS.quiz.primary_text
                      }}
                    >
                      {char.Name}
                    </Typography>
                  </Box>
                  <ButtonContainer selectionStates={selectionStates} updateSelectionStates={updateSelectionState} />
                </Box>
              ))}
          </Box>
        </Box>
          <Box width={"100%"} marginTop={6} display={"flex"} justifyContent={"flex-end"}>
            <Button sx={{backgroundColor: COLORS.quiz.tertiary, "&:hover": {
              backgroundColor:  COLORS.quiz.tertiary,
              transform: "scale(1.1)",
              transition: "transform 100ms ease-in-out",
            }}} variant="contained" onClick={resetTargets} >
              <RefreshIcon fontSize="medium" sx={{ color: COLORS.quiz.primary_text }}></RefreshIcon>
            </Button>
          </Box>
      </Box>
    </Box>
  )
}