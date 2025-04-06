import { SxProps } from "@mui/material";
import { Theme } from "@mui/system";
import { COLORS } from "styling/constants";

export const IconButtonStyle: (active: boolean) => SxProps<Theme> = (active: boolean) => {
    return {
        border: "1px solid",
        borderColor: COLORS.quiz.light,
        fontSize: "20px",
        width: "40px",
        height: "40px",
        minWidth: "inherit",
        backgroundColor: active ? COLORS.quiz.light : COLORS.quiz.secondary,
        "&: hover": {
            transform: "scale(1.1)",
            transition: "transform 100ms ease-in-out",
            backgroundColor: active ? COLORS.quiz.light : COLORS.quiz.tertiary,
        }
    }
}