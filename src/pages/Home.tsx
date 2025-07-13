import {
  Box,
  Divider,
  Tab,
  Tabs,
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
import MenuIcon from '@mui/icons-material/Menu';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { KissMarryKill } from "components/KissMarryKill/KissMarryKill";
import { AnimeIndex } from "components/AnimeIndex";
import { AnimeQuiz } from "components/AnimeQuiz/AnimeQuiz";


export interface Score {
  points: number;
  date: string;
}

const Home = () => {
  const [charData, setCharData] = useState<Character[]>([]);
  const [animeData, setAnimeData] = useState<Anime[]>([]);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (charData.length === 0) {
      setCharData([
        ...characterData.sort((a, b) => (a.Name < b.Name ? -1 : 1)),
      ] as Character[]);
    }
    if (charData && animeData.length === 0) {
      // Create a map of anime names to prevent duplicates
      const animeMap = new Map();
      const localAnimeData = charData.map((item: Character) => ({
        Name: item.Anime,
        First_Release_Year: item.First_Release_Year,
        Studio: item.Studio,
        Genre: item.Genre,
        Subgenre1: item.Subgenre1,
        Subgenre2: item.Subgenre2,
        Tags: item.Tags
      })).filter(anime => {
        // If this anime name is not in the map yet, add it and return true to keep it
        if (!animeMap.has(anime.Name)) {
          animeMap.set(anime.Name, true);
          return true;
        }
        // Otherwise, it's a duplicate, so return false to filter it out
        return false;
      });

      setAnimeData(localAnimeData.sort((a, b) => (a.Name < b.Name ? -1 : 1)) as Anime[]);
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
        <DrawerBasic title="Anime Index" position={{ top: "120px" }} icon={<HelpOutlineIcon fontSize="large" />} sx={{ padding: 2 }}>
          <AnimeIndex
            animeData={animeData}
          />
        </DrawerBasic>

        <DrawerBasic title="Gamemodes" position={{ top: "40px" }} icon={<MenuIcon fontSize="large" />}>
          <Box minHeight={"100vh"}>


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
            </Tabs>
            <Divider sx={{ backgroundColor: "white", marginX: 1 }}></Divider>
          </Box>
        </DrawerBasic>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{
            width: "80%", [theme.breakpoints.down('md')]: {
              marginLeft: '70px',
            },
          }}>
            <CustomTabPanel value={value} index={0}>
              <BasicCharacterQuiz
                charData={charData}
                endlessMode={false}
              ></BasicCharacterQuiz>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
              <ImageCharacterQuiz
                animeData={animeData}
                charData={charData}
                endlessMode={false}
              ></ImageCharacterQuiz>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={2}>
              <AnimeQuiz
                animeData={animeData}
                endlessMode={false}
              ></AnimeQuiz>
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
              <AnimeQuiz
                animeData={animeData}
                endlessMode={true}
              ></AnimeQuiz>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={7}>
              <MultipleChoiceQuiz
                animeData={animeData}
                charData={charData}
              ></MultipleChoiceQuiz>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={8}>
              <KissMarryKill
                charData={charData}
              ></KissMarryKill>
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
          }}
        >
          <Typography sx={{ color: "white", padding: 1 }}>
            {"Version " + VERSION}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Home;
