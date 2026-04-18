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
  // 1. The text color
  color: COLORS.fresh.secondary.highlight,

  // 2. The Border (The specific class for the Outlined variant)
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: `${COLORS.fresh.secondary.highlight} !important`,
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: `${COLORS.fresh.secondary.highlight} !important`,
    borderWidth: "2px",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: `${COLORS.fresh.secondary.highlight} !important`,
  },

  // 3. The Arrow Icon
  "& .MuiSelect-icon": {
    color: COLORS.fresh.secondary.highlight,
  },
};

export const TIMER_STYLING: SxProps<Theme> = {
  fontSize: "4rem",
  fontWeight: "bold",
  FontVariantNumeric: "tabular-nums", // Prevents numbers from jumping
};
