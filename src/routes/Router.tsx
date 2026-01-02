import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import paths from "routes/paths";
import { Box, Typography, Link, Avatar, CssBaseline } from "@mui/material";

const Home = lazy(() => import("pages/Home"));
const TCG = lazy(() => import("pages/TCG"));
const PageNotFound = lazy(() => import("pages/PageNotFound"));

interface Routes {
  path: string;
  element: React.ReactNode;
}

function Copyright(props: any) {
  return (
    <Typography variant="body2" color={props.color} align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const getRouteElement = (
  Component: React.ElementType,
  path: string
): React.ReactNode => (
  <Suspense>
    <CssBaseline></CssBaseline>
    <Box sx={{ height: "100vh" }}>
      <Component />
    </Box>
  </Suspense>
);

const routes: Routes[] = [
  { path: paths.HOME, element: getRouteElement(Home, paths.HOME) },
  { path: paths.TCG, element: getRouteElement(TCG, paths.TCG) },
  {
    path: paths.NOT_FOUND,
    element: getRouteElement(PageNotFound, paths.NOT_FOUND),
  },
];

export default createBrowserRouter(routes);
