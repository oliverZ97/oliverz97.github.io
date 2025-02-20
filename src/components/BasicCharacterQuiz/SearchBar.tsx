import { Box, Typography, Button, ButtonGroup, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Character, Difficulty } from "common/types";
import { CharacterAutocomplete } from "components/CharacterAutocomplete";
import { COLORS } from "styling/constants";

interface SearchBarProps {
   points: number;
   searchHistory: Character[];
   isCorrect: boolean;
   selectedOption: Character | null;
   charData: Character[]
   handleSearchChange: (event: any, value: Character | null, reason: any) => void
   init: () => void;
   setDifficulty: (difficuly: Difficulty) => void;
   difficulty: Difficulty
}

export function SearchBar({ points, searchHistory, isCorrect, selectedOption, charData, handleSearchChange, init, setDifficulty, difficulty }: SearchBarProps) {

   const handleDifficulty = (
     event: React.MouseEvent<HTMLElement>,
     newDifficulty: string | null,
   ) => {
      if(newDifficulty) {
         setDifficulty(newDifficulty as Difficulty);
      } else {
         setDifficulty("C")
      }
      init()
   };


   return (
      <Box sx={{ display: "flex", gap: 4, alignItems: "center", justifyContent: "space-between", backgroundColor: COLORS.quiz.secondary, padding: 2, borderRadius: "16px", border: `1px solid ${COLORS.quiz.light}` }}>
         <Box>
            <Typography sx={{ color: "white" }}>{"Points: " + points}</Typography>
            <Typography sx={{ color: "white" }}>{"Tries: " + searchHistory.length}</Typography>
         </Box>
         <CharacterAutocomplete difficulty={difficulty} charData={charData} disabled={isCorrect} value={selectedOption} handleSearchChange={handleSearchChange} showPreviewImage></CharacterAutocomplete>
         <Box sx={{display: "flex", gap: 1}}>
         <ToggleButtonGroup
      value={difficulty}
      exclusive
      onChange={handleDifficulty}
      aria-label="text alignment"
      size="small"
      sx={{backgroundColor: COLORS.quiz.main}}
    >
      <ToggleButton value="A" aria-label="left aligned" >
        <Typography sx={{color: "white"}}>Easy</Typography>
      </ToggleButton>
      <ToggleButton value="B" aria-label="centered">
      <Typography sx={{color: "white"}}>Normal</Typography>
      </ToggleButton>
      <ToggleButton value="C" aria-label="right aligned">
      <Typography sx={{color: "white"}}>Hard</Typography>
      </ToggleButton>
    </ToggleButtonGroup>
            <Button onClick={init} sx={{
               backgroundColor: COLORS.quiz.main, color: "white",
               "&:hover": {
                  backgroundColor: COLORS.quiz.secondary
               }
            }} variant="outlined">RESET QUIZ</Button>
         </Box>

      </Box>
   )
}