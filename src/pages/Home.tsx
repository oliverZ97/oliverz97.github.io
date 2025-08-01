import {
  Box,
  Button,
  Divider,
  Hidden,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import characterData from "data/character_data.json";
import { COLORS } from "styling/constants";

import bg from "assets/bg.jpg";
import { Anime, Character } from "common/types";
import BasicCharacterQuiz from "components/BasicCharacterQuiz/BasicCharacterQuiz";
import ImageCharacterQuiz from "components/ImageCharacterQuiz/ImageCharacterQuiz";
import DrawerBasic from "components/CustomDrawer";
import MultipleChoiceQuiz from "components/MultipleChoiceQuiz/MultipleChoiceQuiz";
import { VERSION } from "common/version";
import MenuIcon from "@mui/icons-material/Menu";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ArticleIcon from "@mui/icons-material/Article";
import { KissMarryKill } from "components/KissMarryKill/KissMarryKill";
import { AnimeIndex } from "components/AnimeIndex";
import { AnimeQuiz } from "components/AnimeQuiz/AnimeQuiz";
import { getDailyScore, getDailyUTCDate } from "common/utils";
import BlurredCharacterQuiz from "components/BlurredCharacterQuiz/BlurredCharacterQuiz";
import { dialogManager } from "components/HowToPlayDialogPortal";

export interface Score {
  points: number;
  date: string;
}

const Home = () => {
  const [charData, setCharData] = useState<Character[]>([]);
  const [animeData, setAnimeData] = useState<Anime[]>([]);
  const [getTotalScore, setGetTotalScore] = useState(
    getDailyScore(getDailyUTCDate().toISOString())
  );

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (charData.length === 0) {
      setCharData([
        ...characterData.sort((a, b) => (a.Name < b.Name ? -1 : 1)),
      ] as Character[]);
    }
    if (charData && animeData.length === 0) {
      // Create a map to track anime entries with lowest version numbers
      const animeMap = new Map();

      // First pass: populate the map with anime entries
      charData.forEach((item: Character) => {
        const animeEntry = {
          Name: item.Anime,
          First_Release_Year: item.First_Release_Year,
          Studio: item.Studio,
          Genre: item.Genre,
          Subgenre1: item.Subgenre1,
          Subgenre2: item.Subgenre2,
          Tags: item.Tags,
          Version: item.Version,
        };

        // If this anime isn't in the map yet or has a lower version number, update the map
        if (
          !animeMap.has(item.Anime) ||
          item.Version < animeMap.get(item.Anime).Version
        ) {
          animeMap.set(item.Anime, animeEntry);
        }
      });

      // Convert map values to array
      const localAnimeData = Array.from(animeMap.values());

      setAnimeData(
        localAnimeData.sort((a, b) => (a.Name < b.Name ? -1 : 1)) as Anime[]
      );
    }
  }, [charData, characterData, animeData]);

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ paddingY: 3 }}>{children}</Box>}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: COLORS.quiz.background,
          background: `url(${bg})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          maxWidth: "100%",
          minHeight: "100vh",
          position: "relative",

        }}
      >
        <Box position={"relative"} sx={{
          [theme.breakpoints.down("md")]: {
            display: "none"
          },
        }}>
          <DrawerBasic
            title="Anime Index"
            position={{ top: "120px" }}
            icon={<ArticleIcon fontSize="large" />}
            sx={{ padding: 2 }}
          >
            <AnimeIndex animeData={animeData} />
          </DrawerBasic>

          <DrawerBasic
            title="Gamemodes"
            position={{ top: "40px" }}
            icon={<MenuIcon fontSize="large" />}
            onOpenFn={() => {
              setGetTotalScore(getDailyScore(getDailyUTCDate().toISOString()));
            }}
          >
            <Box
              minHeight={"100vh"}
              display={"flex"}
              flexDirection="column"
              justifyContent={"space-between"}
            >
              <Box>
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
                  <Divider sx={{ backgroundColor: "white", marginX: 1 }} />

                  <Tab
                    sx={{
                      color: COLORS.quiz.light,
                      "&.Mui-selected": {
                        color: "white",
                      },
                    }}
                    label="Endless Character Quiz"
                    {...a11yProps(4)}
                  />
                  <Tab
                    sx={{
                      color: COLORS.quiz.light,
                      "&.Mui-selected": {
                        color: "white",
                      },
                    }}
                    label="Endless Image Quiz"
                    {...a11yProps(5)}
                  />
                  <Tab
                    sx={{
                      color: COLORS.quiz.light,
                      "&.Mui-selected": {
                        color: "white",
                      },
                    }}
                    label="Endless Anime Quiz"
                    {...a11yProps(6)}
                  />
                  <Tab
                    sx={{
                      color: COLORS.quiz.light,
                      "&.Mui-selected": {
                        color: "white",
                      },
                    }}
                    label="Multiple Choice Quiz"
                    {...a11yProps(7)}
                  />
                  <Tab
                    sx={{
                      color: COLORS.quiz.light,
                      "&.Mui-selected": {
                        color: "white",
                      },
                    }}
                    label="Kiss, Marry, Kill"
                    {...a11yProps(8)}
                  />
                  <Tab
                    sx={{
                      color: COLORS.quiz.light,
                      "&.Mui-selected": {
                        color: "white",
                      },
                    }}
                    label="Blurred Character Quiz"
                    {...a11yProps(9)}
                  />
                </Tabs>
                <Divider sx={{ backgroundColor: "white", marginX: 1 }}></Divider>
              </Box>
              <Box padding={2} sx={{ color: "white" }}>
                <Typography>Today's score:</Typography>
                <Typography>
                  <Typography
                    component={"span"}
                    sx={{
                      fontWeight: "bold",
                      color: COLORS.quiz.light_red,
                      marginRight: 1,
                    }}
                  >
                    {getTotalScore}
                  </Typography>
                  <Typography component={"span"} fontSize={12}>
                    /30000
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </DrawerBasic>

          <Tooltip title={"How to play"} arrow placement="right">
            <Box
              sx={{
                position: "absolute",
                top: "200px",
                left: 0,
                zIndex: 1000,
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: COLORS.quiz.secondary,
                  color: "white",
                  borderColor: "transparent",
                  height: "60px",
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  "&:hover": {
                    backgroundColor: COLORS.quiz.main,
                    borderColor: "transparent",
                  },
                }}
                onClick={() => {
                  dialogManager.setShowManual(true);
                }}
              >
                <HelpOutlineIcon fontSize="large" />
              </Button>
            </Box>
          </Tooltip>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            [theme.breakpoints.down("md")]: {
              minHeight: "100vh",
            },
          }}
        >
          <Box
            sx={{
              width: "80%",
              [theme.breakpoints.down("md")]: {
                width: "95%",
              },
            }}
          >
            <CustomTabPanel value={value} index={0}>
              <BasicCharacterQuiz
                charData={charData}
                endlessMode={false}
                changeQuizMode={(event: React.SyntheticEvent, id: number) =>
                  handleChange(event, id)
                }
              ></BasicCharacterQuiz>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
              <ImageCharacterQuiz
                animeData={animeData}
                charData={charData}
                endlessMode={false}
                changeQuizMode={(event: React.SyntheticEvent, id: number) =>
                  handleChange(event, id)
                }
              ></ImageCharacterQuiz>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={2}>
              <AnimeQuiz animeData={animeData} endlessMode={false}></AnimeQuiz>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={4}>
              <BasicCharacterQuiz
                charData={charData}
                endlessMode={true}
              ></BasicCharacterQuiz>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={5}>
              <ImageCharacterQuiz
                animeData={animeData}
                charData={charData}
                endlessMode={true}
              ></ImageCharacterQuiz>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={6}>
              <AnimeQuiz animeData={animeData} endlessMode={true}></AnimeQuiz>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={7}>
              <MultipleChoiceQuiz
                animeData={animeData}
                charData={charData}
              ></MultipleChoiceQuiz>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={8}>
              <KissMarryKill charData={charData}></KissMarryKill>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={9}>
              <BlurredCharacterQuiz charData={charData}></BlurredCharacterQuiz>
            </CustomTabPanel>
          </Box>
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            [theme.breakpoints.down("md")]: {
              display: "none",
            },
          }}
        >
          <Typography sx={{ color: "white", padding: 1 }}>
            {"Version " + VERSION}
          </Typography>
        </Box>
        <Box position={"sticky"} sx={{
          bottom: 0, display: "flex", zIndex: 1000, [theme.breakpoints.up("md")]: {
            display: "none"
          },
        }}>
          <Box sx={{ backgroundColor: "red", display: "flex", justifyContent: "center" }} flexGrow={1}>
            <DrawerBasic
              title="Anime Index"
              icon={<ArticleIcon fontSize="large" />}
            >
              <AnimeIndex animeData={animeData} />
            </DrawerBasic>
          </Box>
          <Box sx={{ backgroundColor: "green", display: "flex", justifyContent: "center" }} flexGrow={1}><DrawerBasic
            title="Gamemodes"
            icon={<MenuIcon fontSize="large" />}
            onOpenFn={() => {
              setGetTotalScore(getDailyScore(getDailyUTCDate().toISOString()));
            }}
          >
            <Box
              minHeight={"100vh"}
              display={"flex"}
              flexDirection="column"
              justifyContent={"space-between"}
            >
              <Box>
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
                  <Divider sx={{ backgroundColor: "white", marginX: 1 }} />

                  <Tab
                    sx={{
                      color: COLORS.quiz.light,
                      "&.Mui-selected": {
                        color: "white",
                      },
                    }}
                    label="Endless Character Quiz"
                    {...a11yProps(4)}
                  />
                  <Tab
                    sx={{
                      color: COLORS.quiz.light,
                      "&.Mui-selected": {
                        color: "white",
                      },
                    }}
                    label="Endless Image Quiz"
                    {...a11yProps(5)}
                  />
                  <Tab
                    sx={{
                      color: COLORS.quiz.light,
                      "&.Mui-selected": {
                        color: "white",
                      },
                    }}
                    label="Endless Anime Quiz"
                    {...a11yProps(6)}
                  />
                  <Tab
                    sx={{
                      color: COLORS.quiz.light,
                      "&.Mui-selected": {
                        color: "white",
                      },
                    }}
                    label="Multiple Choice Quiz"
                    {...a11yProps(7)}
                  />
                  <Tab
                    sx={{
                      color: COLORS.quiz.light,
                      "&.Mui-selected": {
                        color: "white",
                      },
                    }}
                    label="Kiss, Marry, Kill"
                    {...a11yProps(8)}
                  />
                  <Tab
                    sx={{
                      color: COLORS.quiz.light,
                      "&.Mui-selected": {
                        color: "white",
                      },
                    }}
                    label="Blurred Character Quiz"
                    {...a11yProps(9)}
                  />
                </Tabs>
                <Divider sx={{ backgroundColor: "white", marginX: 1 }}></Divider>
              </Box>
              <Box padding={2} sx={{ color: "white" }}>
                <Typography>Today's score:</Typography>
                <Typography>
                  <Typography
                    component={"span"}
                    sx={{
                      fontWeight: "bold",
                      color: COLORS.quiz.light_red,
                      marginRight: 1,
                    }}
                  >
                    {getTotalScore}
                  </Typography>
                  <Typography component={"span"} fontSize={12}>
                    /30000
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </DrawerBasic></Box>
          <Box sx={{ display: "flex", justifyContent: "center", maxWidth: "33.33%", boxShadow: 1 }} flexGrow={1}>
            <Tooltip title={"How to play"} arrow placement="right">
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    backgroundColor: COLORS.quiz.secondary,
                    color: "white",
                    borderColor: "transparent",
                    height: "60px",
                    borderRadius: 0,
                    "&:hover": {
                      backgroundColor: COLORS.quiz.main,
                      borderColor: "transparent",
                    },
                    width: "100%",
                  }}
                  onClick={() => {
                    console.log('Help button clicked');
                    dialogManager.setShowManual(true);
                  }}
                >
                  <HelpOutlineIcon fontSize="large" />
                </Button>
              </Box>
            </Tooltip></Box>
        </Box>
      </Box >
    </>
  );
};

export default Home;

