import { SxProps, Theme } from "@mui/material";
import { COLORS } from "@/styling/constants";

export const WINDOW_BASE_STYLE: SxProps<Theme> = {
  background: COLORS.fresh.bg.bg_1,
  padding: 2,
  borderRadius: 1,
  border: `1px solid ${COLORS.fresh.primary.main}`,
  boxShadow: `0 0 30px ${COLORS.fresh.secondary.main + "44"}`,
};

export const TEXT_BASE_STYLE: SxProps<Theme> = {
  color: COLORS.fresh.primary.main,
  fontSize: "18px",
};

export const SELECT_BASE_STYLE: SxProps<Theme> = {
  width: "300px",
  color: COLORS.fresh.secondary.highlight,

  // 1. Standard Border State
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: `${COLORS.fresh.secondary.highlight} !important`,
    borderWidth: "1px", // Define a base width
  },

  // 2. Hover State (only when NOT disabled)
  "&:hover:not(.Mui-disabled) .MuiOutlinedInput-notchedOutline": {
    borderColor: `${COLORS.fresh.secondary.highlight} !important`,
    borderWidth: "2px",
  },

  // 3. Focused State
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: `${COLORS.fresh.secondary.highlight} !important`,
  },

  // 4. The Arrow Icon
  "& .MuiSelect-icon": {
    color: COLORS.fresh.secondary.highlight,
  },

  // 5. Disabled State Overrides
  "&.Mui-disabled": {
    // Hide the arrow icon
    "& .MuiSelect-icon": {
      display: "none",
    },
    // Fix the text color
    "& .MuiSelect-select": {
      WebkitTextFillColor: COLORS.fresh.secondary.highlight,
    },
    // Force border width to stay constant on hover when disabled
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: `${COLORS.fresh.secondary.highlight} !important`,
      borderWidth: "1px !important",
    },
  },
};

export const TIMER_STYLING: SxProps<Theme> = {
  fontSize: "4rem",
  fontWeight: "bold",
  FontVariantNumeric: "tabular-nums", // Prevents numbers from jumping
};

export const INPUT_BASE_STYLE: SxProps<Theme> = {
  // 1. Target the text inside the input
  "& .MuiInputBase-input": {
    color: COLORS.fresh.secondary.highlight,
  },
  // 2. Target the placeholder text
  "& .MuiInputBase-input::placeholder": {
    color: COLORS.fresh.secondary.highlight,
    opacity: 0.7, // Placeholders usually look better with slight transparency
  },
  // 3. Target the border (the "OutlinedInput" fieldset)
  "& .MuiOutlinedInput-root": {
    "&.Mui-disabled": {
      "& .MuiInputBase-input": {
        WebkitTextFillColor: COLORS.fresh.secondary.highlight,
      },
      // Force border width to stay constant on hover when disabled
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: `${COLORS.fresh.secondary.highlight} !important`,
        borderWidth: "1px !important",
      },
    },
    "& fieldset": {
      borderColor: COLORS.fresh.secondary.highlight,
    },
    "&:hover fieldset": {
      borderColor: COLORS.fresh.secondary.highlight, // Color when hovering
      borderWidth: "2px",
    },
    "&.Mui-focused fieldset": {
      borderColor: COLORS.fresh.secondary.highlight, // Color when typing
    },
  },
};
