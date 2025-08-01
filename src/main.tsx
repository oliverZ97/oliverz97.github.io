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
import { HowToPlayDialogPortal } from "components/HowToPlayDialogPortal";

// Create dialog root element before React initializes
if (!document.getElementById('dialog-root')) {
   const portalDiv = document.createElement('div');
   portalDiv.id = 'dialog-root';
   document.body.appendChild(portalDiv);
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
   <React.StrictMode>
      <ThemeProvider theme={theme}>
         <>
            <HowToPlayDialogPortal />
            <RouterProvider router={Router} />
         </>
      </ThemeProvider>
   </React.StrictMode>,
);
