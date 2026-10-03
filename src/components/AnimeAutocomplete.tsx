import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { Anime } from "@/common/types";
import { COLORS } from "@/styling/constants";

interface AnimeAutocompleteProps {
  animeData: Anime[];
  disabled: boolean;
  value: Anime | null;
  handleSearchChange: (event: any, value: Anime | null, reason: any, id?: number) => void;
  id?: number;
  width?: number;
}

export function AnimeAutocomplete({
  animeData,
  disabled,
  value,
  handleSearchChange,
  id,
  width,
}: AnimeAutocompleteProps) {
  return (
    <Autocomplete
      disablePortal
      options={animeData}
      slotProps={{
        paper: {
          sx: {
            backgroundColor: COLORS.card_bar_bg,
            color: COLORS.quiz.primary_text,
            borderRadius: "8px",
            marginTop: "4px", // Optional gap between input and dropdown
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Custom shadow
          },
        },
      }}
      sx={{
        width: width ?? 300,
        borderRadius: "12px",
        color: COLORS.quiz.border,

        "& .MuiInputBase-input": {
          color: COLORS.quiz.primary_text, // General text color (typed value)

          "&::placeholder": {
            color: COLORS.quiz.disabled, // Custom placeholder color
            opacity: 1, // MUI defaults placeholder opacity to 0.42; set to 1 for exact color rendering
          },
        },

        "& .MuiAutocomplete-popupIndicator": {
          display: "none",
        },

        "& .MuiOutlinedInput-root": {
          backgroundColor: "#434343",
          borderRadius: "8px",

          // 2. Default / Active border color
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: COLORS.quiz.border, // Set your default border color here
            borderRadius: "8px",
          },
          "&:not(.Mui-disabled):hover .MuiOutlinedInput-notchedOutline": {
            borderColor: COLORS.quiz.border,
            borderWidth: "2px",
            borderRadius: "8px",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: COLORS.quiz.border,
            borderRadius: "8px",
          },
        },

        // 3. Optional: Hide label on focus/value if you don't want it overlapping input text
        "& .MuiInputLabel-root": {
          "&.Mui-focused, &.MuiFormLabel-filled": {
            display: "none", // Keeps label hidden once typing starts so it won't overlap text
          },
        },
      }}
      renderInput={(params) => <TextField {...params} placeholder="Anime" />}
      renderOption={(props, option) => (
        <Box component="li" sx={{ "& > *": { m: 0.5 } }} {...props}>
          <Typography sx={{ marginLeft: 2 }} variant="body2">
            {option.Name}
          </Typography>
        </Box>
      )}
      onChange={(ev, value, reason) => handleSearchChange(ev, value, reason, id)}
      clearOnBlur
      disabled={disabled}
      value={value}
      getOptionLabel={(option) => option.Name}
      filterOptions={(options, { inputValue }) => {
        // Only filter if there is at least one character in the input
        return inputValue !== ""
          ? options.filter((option) => option.Name.toLowerCase().includes(inputValue.toLowerCase()))
          : [];
      }}
    />
  );
}
