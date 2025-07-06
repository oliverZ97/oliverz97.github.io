import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { RouterProvider } from "react-router-dom";
import Router from "routes/Router";
import { ThemeProvider } from "@mui/material";
import { theme } from "styling/theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
   <React.StrictMode>
      <ThemeProvider theme={theme}>
         <RouterProvider router={Router} />
         </ThemeProvider>
   </React.StrictMode>,
);
