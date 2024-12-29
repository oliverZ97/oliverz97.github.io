import { lighten, ThemeOptions } from "@mui/material";

declare module "@mui/material/styles" {
   interface Palette {
      light: Palette["primary"];
      slide: Palette["primary"];
      progress: Palette["primary"];
   }

   interface PaletteOptions {
      light: PaletteOptions["primary"];
      slide: PaletteOptions["primary"];
      progress: PaletteOptions["primary"];
   }

   interface PaletteColor {
      darker?: string;
      highlight?: string;
      red?: string;
      orange?: string;
      yellow?: string;
      green?: string;
      darkGreen?: string;
   }

   interface SimplePaletteColorOptions {
      darker?: string;
      highlight?: string;
      red?: string;
      orange?: string;
      yellow?: string;
      green?: string;
      darkGreen?: string;
   }
}

export const theme: ThemeOptions = {
   palette: {
      background: {
         default: lighten("#01487B", 0.9),
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
         darkGreen: "#267019",
      },
      mode: "light",
   },
   shape: {
      borderRadius: 2,
   },
};

export default theme;
