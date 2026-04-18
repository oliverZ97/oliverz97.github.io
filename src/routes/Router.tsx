import { lazy, Suspense } from "react";
import { createHashRouter } from "react-router-dom";
import paths from "@/routes/paths";
import { Box, CssBaseline } from "@mui/material";

const Home = lazy(() => import("@/pages/Home"));
const TCG = lazy(() => import("@/pages/TCG"));
const Collection = lazy(() => import("@/pages/Collection"));
const PageNotFound = lazy(() => import("@/pages/PageNotFound"));
const Sandbox = lazy(() => import("@/pages/Sandbox"));

interface Routes {
  path: string;
  element: React.ReactNode;
}

const getRouteElement = (Component: React.ElementType): React.ReactNode => (
  <Suspense>
    <CssBaseline></CssBaseline>
    <Box sx={{ height: "100vh" }}>
      <Component />
    </Box>
  </Suspense>
);

const routes: Routes[] = [
  { path: paths.HOME, element: getRouteElement(Home) },
  { path: paths.TCG, element: getRouteElement(TCG) },
  { path: paths.COLLECTION, element: getRouteElement(Collection) },
  { path: paths.SANDBOX, element: getRouteElement(Sandbox) },
  {
    path: paths.NOT_FOUND,
    element: getRouteElement(PageNotFound),
  },
];

export default createHashRouter(routes);
