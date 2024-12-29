import { lighten, ThemeOptions } from "@mui/material";

export const theme: ThemeOptions = {
   palette: {
      mode: "dark",
      background: {
         default: "#222222",
      },
      primary: {
         main: "#01487B",
         light: lighten("#01487B", 0.2),
         highlight: "#4294bd",
      },
      secondary: {
         main: "#F4803A",
         light: "#F7E0D3",
         dark: "#DC4730",
         contrastText: "rgba(255,255,255,0.87)",
      },
      light: {
         main: "#eee",
      },
      slide: {
         main: "#01487B",
      },
      progress: {
         main: "#4294bd",
         red: "#b91c1c",
         orange: "#f59e0b",
         yellow: "#eab308",
         green: "#84cc16",
      },
   },
   shape: {
      borderRadius: 2,
   },
};

export default theme;
