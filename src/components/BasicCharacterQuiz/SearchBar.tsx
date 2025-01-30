import { Box, Typography, Button } from "@mui/material";
import { Character } from "common/types";
import { CharacterAutocomplete } from "components/CharacterAutocomplete";
import { COLORS } from "styling/constants";

interface SearchBarProps {
   points: number;
   searchHistory: Character[];
   isCorrect: boolean;
   selectedOption: Character | null;
   charData: Character[]
   handleSearchChange: (event: any, value: Character | null, reason: any) => void
   init: () => void
}

export function SearchBar({ points, searchHistory, isCorrect, selectedOption, charData, handleSearchChange, init }: SearchBarProps) {

   return (
      <Box sx={{ display: "flex", gap: 4, alignItems: "center", justifyContent: "space-between", backgroundColor: COLORS.quiz.secondary, padding: 2, borderRadius: "16px", border: `1px solid ${COLORS.quiz.light}` }}>
         <Box>
            <Typography sx={{ color: "white" }}>{"Points: " + points}</Typography>
            <Typography sx={{ color: "white" }}>{"Tries: " + searchHistory.length}</Typography>
         </Box>
         <CharacterAutocomplete charData={charData} disabled={isCorrect} value={selectedOption} handleSearchChange={handleSearchChange} showPreviewImage></CharacterAutocomplete>
         <Button onClick={init} sx={{
            backgroundColor: COLORS.quiz.main, color: "white",
            "&:hover": {
               backgroundColor: COLORS.quiz.secondary
            }
         }} variant="outlined">RESET QUIZ</Button>

      </Box>
   )
}