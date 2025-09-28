import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { getImgSrc } from "common/quizUtils";
import { Character, Difficulty } from "common/types";
import { isIncludedInDifficulty } from "common/utils";
import { COLORS } from "styling/constants";

interface CharacterAutocompleteProps {
  charData: Character[];
  disabled: boolean;
  value: Character | null;
  handleSearchChange: (
    event: any,
    value: Character | null,
    reason: any,
    id?: number
  ) => void;
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
        difficulty
          ? charData.filter((char) => isIncludedInDifficulty(char, difficulty))
          : charData
      }
      sx={{
        width: width ?? 300,
        backgroundColor: "white",
        borderRadius: "8px",

        "& .MuiOutlinedInput-root": {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: COLORS.quiz.secondary,
            borderRadius: "8px",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: COLORS.quiz.tertiary,
            borderRadius: "8px",
          },
        },
      }}
      renderInput={(params) => (
        <TextField {...params} label="Guess Today's Character" />
      )}
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
      onChange={(ev, value, reason) =>
        handleSearchChange(ev, value, reason, id)
      }
      clearOnBlur
      disabled={disabled}
      value={value}
      filterOptions={(options, { inputValue }) => {
        // Only filter if there is at least one character in the input
        return inputValue !== ""
          ? options.filter((option) =>
              option.Name.toLowerCase().includes(inputValue.toLowerCase())
            )
          : [];
      }}
    />
  );
}
