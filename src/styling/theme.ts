import { createTheme } from "@mui/material";
import { COLORS } from "./constants";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    exo2: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    exo2?: React.CSSProperties;
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: ["Work Sans", "cursive"].join(","),
    exo2: { fontFamily: ['"Exo 2"', "cursive"].join(",") },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        // Target the 'outlined' variant specifically
        outlined: {
          borderWidth: "2px",
          borderColor: COLORS.quiz.border,
          borderRadius: "4px",
          color: COLORS.quiz.border,
          "&:hover": {
            borderWidth: "2px", // Prevents button size shift on hover
            borderColor: COLORS.quiz.border,
            backgroundColor: "rgba(25, 118, 210, 0.04)",
          },
        },
      },
    },
  },
});
