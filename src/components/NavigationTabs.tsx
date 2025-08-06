import { Divider, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import { COLORS } from "styling/constants";


function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

interface TabPanelProps {
    value: number;
    handleChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export function NavigationTabs({ value, handleChange }: TabPanelProps) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Tabs
            variant={matches ? "fullWidth" : "standard"}
            orientation="vertical"
            sx={{
                "& .MuiTabs-indicator": {
                    backgroundColor: COLORS.quiz.light,
                },
            }}
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
        >
            <Tab
                sx={{
                    color: COLORS.quiz.light,
                    "&.Mui-selected": {
                        color: "white",
                    },
                }}
                label="Daily Character Quiz"
                {...a11yProps(0)}
            />
            <Tab
                sx={{
                    color: COLORS.quiz.light,
                    "&.Mui-selected": {
                        color: "white",
                    },
                }}
                label="Daily Image Quiz"
                {...a11yProps(1)}
            />
            <Tab
                sx={{
                    color: COLORS.quiz.light,
                    "&.Mui-selected": {
                        color: "white",
                    },
                }}
                label="Daily Anime Quiz"
                {...a11yProps(2)}
            />
            <Tab
                sx={{
                    color: COLORS.quiz.light,
                    "&.Mui-selected": {
                        color: "white",
                    },
                }}
                label="Daily Blurred Character Quiz"
                {...a11yProps(3)}
            />
            <Divider sx={{ backgroundColor: "white", marginX: 1 }} />

            <Tab
                sx={{
                    color: COLORS.quiz.light,
                    "&.Mui-selected": {
                        color: "white",
                    },
                }}
                label="Endless Character Quiz"
                {...a11yProps(5)}
            />
            <Tab
                sx={{
                    color: COLORS.quiz.light,
                    "&.Mui-selected": {
                        color: "white",
                    },
                }}
                label="Endless Image Quiz"
                {...a11yProps(6)}
            />
            <Tab
                sx={{
                    color: COLORS.quiz.light,
                    "&.Mui-selected": {
                        color: "white",
                    },
                }}
                label="Endless Anime Quiz"
                {...a11yProps(7)}
            />
            <Tab
                sx={{
                    color: COLORS.quiz.light,
                    "&.Mui-selected": {
                        color: "white",
                    },
                }}
                label="Multiple Choice Quiz"
                {...a11yProps(8)}
            />
            <Tab
                sx={{
                    color: COLORS.quiz.light,
                    "&.Mui-selected": {
                        color: "white",
                    },
                }}
                label="Kiss, Marry, Kill"
                {...a11yProps(9)}
            />
            <Tab
                sx={{
                    color: COLORS.quiz.light,
                    "&.Mui-selected": {
                        color: "white",
                    },
                }}
                label="Endless Blurred Character Quiz"
                {...a11yProps(10)}
            />
        </Tabs>
    )
}