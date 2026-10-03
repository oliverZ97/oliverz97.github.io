import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { getImgSrc } from "@/common/quizUtils";
import { Character, Difficulty } from "@/common/types";
import { isIncludedInDifficulty } from "@/common/utils";
import { COLORS } from "@/styling/constants";

interface CharacterAutocompleteProps {
  charData: Character[];
  disabled: boolean;
  value: Character | null;
  handleSearchChange: (event: any, value: Character | null, reason: any, id?: number) => void;
  showPreviewImage?: boolean;
  id?: number;
  width?: number;
  difficulty?: Difficulty;
}

export function CharacterAutocomplete({
  charData,
  disabled,
  value,
  handleSearchChange,
  showPreviewImage,
  id,
  width,
  difficulty,
}: CharacterAutocompleteProps) {
  return (
    <Autocomplete
      disablePortal
      options={
        difficulty ? charData.filter((char) => isIncludedInDifficulty(char, difficulty)) : charData
      }
      getOptionLabel={(option) => `${option.Name} (${option.id})`}
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
          backgroundColor: COLORS.card_bar_bg,
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
      renderInput={(params) => {
        // If showPreviewImage is false and a value is selected, show only the name in the input
        if (!showPreviewImage && value) {
          params.inputProps.value = value.Name;
        }
        return (
          <TextField
            {...params}
            sx={{ color: COLORS.quiz.border }}
            InputLabelProps={{ shrink: false }}
            placeholder="Guess Today's Character"
          />
        );
      }}
      renderOption={(props, option) => (
        <Box component="li" sx={{ "& > *": { m: 0.5 } }} {...props}>
          {showPreviewImage && (
            <Box
              sx={{ width: "40px", objectFit: "cover", height: "60px" }}
              component={"img"}
              src={getImgSrc(option.id)}
            ></Box>
          )}
          <Typography sx={{ marginLeft: 2 }} variant="body2">
            {option.Name}
          </Typography>
        </Box>
      )}
      onChange={(ev, value, reason) => handleSearchChange(ev, value, reason, id)}
      clearOnBlur
      disabled={disabled}
      value={value}
      filterOptions={(options, { inputValue }) => {
        // Only filter if there is at least one character in the input
        return inputValue !== ""
          ? options.filter((option) => option.Name.toLowerCase().includes(inputValue.toLowerCase()))
          : [];
      }}
    />
  );
}
