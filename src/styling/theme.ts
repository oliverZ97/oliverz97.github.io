import { createTheme, ThemeProvider } from "@mui/material";

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
    // You can customize variants like h1, h2, etc., for "Exo 2" if needed:
    exo2: { fontFamily: ['"Exo 2"', "cursive"].join(",") },
    // Add more variants as needed
  },
});
