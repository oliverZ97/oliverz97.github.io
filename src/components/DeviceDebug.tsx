import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

export const DeviceDebug = ({ show = false }) => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.only("xs"));
    const isSm = useMediaQuery(theme.breakpoints.only("sm"));
    const isMd = useMediaQuery(theme.breakpoints.only("md"));
    const isLg = useMediaQuery(theme.breakpoints.only("lg"));
    const isXl = useMediaQuery(theme.breakpoints.only("xl"));
    const isDownMd = useMediaQuery(theme.breakpoints.down("md"));

    if (!show) return null;

    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 0,
                right: 0,
                backgroundColor: "rgba(0,0,0,0.7)",
                color: "white",
                padding: 1,
                zIndex: 9999,
            }}
        >
            <Typography variant="caption">
                Window Width: {window.innerWidth}px<br />
                Window Height: {window.innerHeight}px<br />
                Breakpoint: {isXs ? "xs" : isSm ? "sm" : isMd ? "md" : isLg ? "lg" : isXl ? "xl" : "unknown"}<br />
                down(md): {isDownMd ? "true" : "false"}
            </Typography>
        </Box>
    );
};

export default DeviceDebug;
