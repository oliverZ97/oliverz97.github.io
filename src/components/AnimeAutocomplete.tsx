import { Autocomplete, Box, TextField, Typography } from "@mui/material";

interface AnimeAutocompleteProps {
    animeData: string[];
    disabled: boolean;
    value: string | null;
    handleSearchChange: (event: any, value: string | null, reason: any, id?: number) => void
    id?: number;
    width?: number;
}

export function AnimeAutocomplete({animeData, disabled, value, handleSearchChange, id, width}: AnimeAutocompleteProps) {
    return (
        <Autocomplete
        disablePortal
        options={animeData}
        sx={{ width: width ?? 300, backgroundColor: "white", borderRadius: "8px" }}
        renderInput={(params) => <TextField {...params} label="Anime" />}
        renderOption={(props, option) => (
           <Box component="li" sx={{ '& > *': { m: 0.5 } }} {...props}>
              <Typography sx={{ marginLeft: 2 }} variant="body2">{option}</Typography>
           </Box>
        )}
        onChange={(ev, value, reason) => handleSearchChange(ev, value, reason, id)}
        clearOnBlur
        disabled={disabled}
        value={value}
        filterOptions={(options, { inputValue }) => {
           // Only filter if there is at least one character in the input
           return inputValue !== '' ? options.filter((option) => option.toLowerCase().includes(inputValue.toLowerCase())) : [];
        }}
     />
    )
}