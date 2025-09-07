import {
  Box,
  Button,
  Divider,
  Tooltip,
  Typography,
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
import { formatScoresForCalendar, getCharacterBirthdaysAsCalendarData, getDailyScore, getDailyUTCDate, getScoreLogs } from "common/utils";
import BlurredCharacterQuiz from "components/BlurredCharacterQuiz/BlurredCharacterQuiz";
import { dialogManager } from "components/DialogPortal";
import { NavigationTabs } from "components/NavigationTabs";
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import Calendar from "components/Calendar";
import SettingsIcon from '@mui/icons-material/Settings';

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

  function getCalendarData() {
    const scoreLogs = getScoreLogs();
    return formatScoresForCalendar(scoreLogs);
  }

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
                <NavigationTabs value={value} handleChange={handleChange} />
                <Divider sx={{ backgroundColor: "white", marginX: 1 }}></Divider>
              </Box>
              <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>

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
                      /40000
                    </Typography>
                  </Typography>
                </Box>
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

          <Tooltip title={"Score Calendar"} arrow placement="right">
            <Box
              sx={{
                position: "absolute",
                top: "280px",
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
                  dialogManager.setShowScoreCalendar(true, getCalendarData());
                }}
              >
                <SportsScoreIcon fontSize="large" />
              </Button>
            </Box>
          </Tooltip>
        </Box>

        <Tooltip title={"Settings"} arrow placement="right">
          <Box
            sx={{
              position: "absolute",
              top: "360px",
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
                dialogManager.setShowSettings(true);
              }}
            >
              <SettingsIcon fontSize="large" />
            </Button>
          </Box>
        </Tooltip>

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
              <AnimeQuiz animeData={animeData} endlessMode={false} changeQuizMode={(event: React.SyntheticEvent, id: number) =>
                handleChange(event, id)
              }></AnimeQuiz>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={3}>
              <BlurredCharacterQuiz charData={charData} endlessMode={false}></BlurredCharacterQuiz>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={5}>
              <BasicCharacterQuiz
                charData={charData}
                endlessMode={true}
              ></BasicCharacterQuiz>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={6}>
              <ImageCharacterQuiz
                animeData={animeData}
                charData={charData}
                endlessMode={true}
              ></ImageCharacterQuiz>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={7}>
              <AnimeQuiz animeData={animeData} endlessMode={true}></AnimeQuiz>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={8}>
              <MultipleChoiceQuiz
                animeData={animeData}
                charData={charData}
              ></MultipleChoiceQuiz>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={9}>
              <KissMarryKill charData={charData}></KissMarryKill>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={10}>
              <BlurredCharacterQuiz charData={charData}></BlurredCharacterQuiz>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={11}>
              <Calendar title="Birthdays" ignoreOpener={true} data={getCharacterBirthdaysAsCalendarData(charData)}></Calendar>
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
                <NavigationTabs value={value} handleChange={handleChange} />
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
                    /40000
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

