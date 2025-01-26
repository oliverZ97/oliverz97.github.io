import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { getImgSrc } from "common/quizUtils";
import { Character } from "common/types";

interface CharacterAutocompleteProps {
    charData: Character[];
    disabled: boolean;
    value: Character | null;
    handleSearchChange: (event: any, value: Character | null, reason: any, id?: number) => void
    showPreviewImage?: boolean;
    id?: number
    width?: number
}

export function CharacterAutocomplete({charData, disabled, value, handleSearchChange, showPreviewImage, id, width}: CharacterAutocompleteProps) {
    return (
        <Autocomplete
        disablePortal
        options={charData}
        sx={{ width: width ?? 300, backgroundColor: "white", borderRadius: "8px" }}
        renderInput={(params) => <TextField {...params} label="Character" />}
        renderOption={(props, option) => (
           <Box component="li" sx={{ '& > *': { m: 0.5 } }} {...props}>
              {showPreviewImage && <Box sx={{ width: "40px" }} component={"img"} src={getImgSrc(option.Name)}></Box>}
              <Typography sx={{ marginLeft: 2 }} variant="body2">{option.Name}</Typography>
           </Box>
        )}
        onChange={(ev, value, reason) => handleSearchChange(ev, value, reason, id)}
        clearOnBlur
        disabled={disabled}
        value={value}
        filterOptions={(options, { inputValue }) => {
           // Only filter if there is at least one character in the input
           return inputValue !== '' ? options.filter((option) => option.Name.toLowerCase().includes(inputValue.toLowerCase())) : [];
        }}
     />
    )
}