import { alpha, styled, Switch } from "@mui/material";
import { COLORS } from "styling/constants";

export const CustomSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: COLORS.quiz.success,
    "&:hover": {
      backgroundColor: alpha(
        COLORS.quiz.success,
        theme.palette.action.hoverOpacity
      ),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: COLORS.quiz.success,
  },
}));
