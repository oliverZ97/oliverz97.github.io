import { lazy, Suspense } from "react";
import { createHashRouter } from "react-router-dom";
import paths from "routes/paths";
import { Box, CssBaseline } from "@mui/material";

const Home = lazy(() => import("pages/Home"));
const TCG = lazy(() => import("pages/TCG"));
const Collection = lazy(() => import("pages/Collection"));
const PageNotFound = lazy(() => import("pages/PageNotFound"));
const Sandbox = lazy(() => import("pages/Sandbox"));

interface Routes {
  path: string;
  element: React.ReactNode;
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
  { path: paths.COLLECTION, element: getRouteElement(Collection, paths.COLLECTION) },
  { path: paths.SANDBOX, element: getRouteElement(Sandbox, paths.SANDBOX) },
  {
    path: paths.NOT_FOUND,
    element: getRouteElement(PageNotFound, paths.NOT_FOUND),
  },
];

export default createHashRouter(routes);
