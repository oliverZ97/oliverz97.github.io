import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { Anime } from "common/types";
import { COLORS } from "styling/constants";

interface AnimeAutocompleteProps {
   animeData: Anime[];
   disabled: boolean;
   value: Anime | null;
   handleSearchChange: (event: any, value: Anime | null, reason: any, id?: number) => void
   id?: number;
   width?: number;
}

export function AnimeAutocomplete({ animeData, disabled, value, handleSearchChange, id, width }: AnimeAutocompleteProps) {
   return (
      <Autocomplete
         disablePortal
         options={animeData}
         sx={{
            width: width ?? 300, backgroundColor: "white", borderRadius: "8px",
            '& .MuiOutlinedInput-root': {
               '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: COLORS.quiz.secondary,
                  borderRadius: "8px"
               },
               '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: COLORS.quiz.tertiary,
                  borderRadius: "8px"
               },
            },
         }}
         renderInput={(params) => <TextField {...params} label="Anime" />}
         renderOption={(props, option) => (
            <Box component="li" sx={{ '& > *': { m: 0.5 } }} {...props}>
               <Typography sx={{ marginLeft: 2 }} variant="body2">{option.Name}</Typography>
            </Box>
         )}
         onChange={(ev, value, reason) => handleSearchChange(ev, value, reason, id)}
         clearOnBlur
         disabled={disabled}
         value={value}
         getOptionLabel={(option) => option.Name}
         filterOptions={(options, { inputValue }) => {
            // Only filter if there is at least one character in the input
            return inputValue !== '' ? options.filter((option) => option.Name.toLowerCase().includes(inputValue.toLowerCase())) : [];
         }}
      />
   )
}