import { lighten } from "@mui/material";

export const DIALOG_PAPER_MIN_WIDTH = 600;

export const COLORS = {
  quiz: {
    main: "#318eb0",
    main_rgba: "rgba(49, 142, 176, 1)",
    main_hover: "#2782a3",
    secondary: "#006494",
    tertiary: "#00a6fb",
    tertiary_hover: lighten("#00a6fb", 0.2),
    success: "#99c2ab",
    success_light: "#a1f7c7",
    failed: "#ff686b",
    failed_light: "#f28385",
    warning: "#f5d273",
    warning_light: "#ffedbd",
    correct: "#a5be00",
    primary_text: "#fff",
    background: "#202020ff",
    light: "#90d0f0",
    hearts: "#d6477b",
    disabled: "#ccc8c9",
    disabled_border: "#8a8788",
    light_red: "#d16b81",
    light_red_hover: "#f06785",
  },
  calendar: {
    entryColors: ["#ff686b", "#99c2ab", "#f5d273"],
  },
  profile: {
    backgroundColors: [
      "#ffadad",
      "#ffd6a5",
      "#fdffb6",
      "#caffbf",
      "#9bf6ff",
      "#a0c4ff",
      "#bdb2ff",
      "#ffc6ff",
      "#ee6055",
      "#60d394",
      "#aaf683",
      "#ffd97d",
      "#ff9b85",
      "#70d6ff",
      "#ff70a6",
      "#ff9770",
      "#ffd670",
      "#e9ff70",
      "#7161ef",
      "#55d6c2",
    ],
  },
  gradient:
    "linear-gradient(90deg,rgba(0, 100, 148, 1) 0%, rgba(209, 107, 129, 1) 100%)",
  gradientBar:
    "linear-gradient(90deg,rgba(0, 53, 84, 1) 0%, rgba(0, 100, 148, 1) 100%)",
  cards: {
    border: "#ede9df",
    rare: "#e2ebf0",
    bg: {
      action: "#a0c4ff",
      comedy: "#ffd6a5",
      romance: "#ffc6ff",
      drama: "#ffadad",
      fantasy: "#caffbf",
      shounen: "#bdb2ff",
      supernatural: "#d1a2fa",
      default: "#60d394",
    },
    shimmer:
      "linear-gradient(-60deg,rgba(163, 163, 163, 0) 0%, rgba(250, 250, 250,0.5) 50%, rgba(163, 163, 163, 0) 100%)",
    bgRare: "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)",
    ultraRare:
      "linear-gradient(30deg, rgba(239,151,189,0.3) 0%, rgba(204,239,243,0.5) 16.666%, rgba(227,241,202,0.3) 33.333%, rgba(237,187,187,0.5) 50%, rgba(239,151,189,0.3) 66.666%, rgba(204,239,243,0.5) 83.333%, rgba(227,241,202,0.3) 100%)",
  },
};
