import { Box, Typography, Autocomplete, TextField, Button } from "@mui/material";
import { getImgSrc } from "common/quizUtils";
import { Character } from "common/types";
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

export function SearchBar({points, searchHistory, isCorrect, selectedOption, charData, handleSearchChange, init}: SearchBarProps) {
    
    return (
        <Box sx={{ display: "flex", gap: 4, alignItems: "center", justifyContent: "space-between", backgroundColor: COLORS.quiz.secondary, padding: 2, borderRadius: "16px" }}>
        <Box>
           <Typography sx={{ color: "white" }}>{"Points: " + points}</Typography>
           <Typography sx={{ color: "white" }}>{"Tries: " + searchHistory.length}</Typography>
        </Box>
        <Autocomplete
           disablePortal
           options={charData}
           sx={{ width: 300, backgroundColor: "white", borderRadius: "8px" }}
           renderInput={(params) => <TextField {...params} label="Character" />}
           renderOption={(props, option) => (
              <Box component="li" sx={{ '& > *': { m: 0.5 } }} {...props}>
                 <Box sx={{ width: "40px" }} component={"img"} src={getImgSrc(option.Name)}></Box>
                 <Typography sx={{ marginLeft: 2 }} variant="body2">{option.Name}</Typography>
              </Box>
           )}
           onChange={(ev, value, reason) => handleSearchChange(ev, value, reason)}
           clearOnBlur
           disabled={isCorrect}
           value={selectedOption}
           filterOptions={(options, { inputValue }) => {
              // Only filter if there is at least one character in the input
              return inputValue !== '' ? options.filter((option) => option.Name.toLowerCase().includes(inputValue.toLowerCase())) : [];
           }}
        />
        <Button onClick={init} sx={{
           backgroundColor: COLORS.quiz.main, color: "white", 
           "&:hover": {
              backgroundColor: COLORS.quiz.secondary
           }
        }} variant="outlined">RESET QUIZ</Button>

     </Box>
    )
}