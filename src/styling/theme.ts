import { createTheme, ThemeProvider } from '@mui/material';
export const theme = createTheme({
  typography: {
    fontFamily: [
      'Work Sans',
      'cursive',
    ].join(','),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960, // Adjusted to ensure mobile devices reliably trigger the "down(md)" breakpoint
      lg: 1280,
      xl: 1920,
    },
  },
});