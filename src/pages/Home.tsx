import { Box, Button, Drawer, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import characterData from "data/character_data.json";
import { COLORS } from "styling/constants";

import bg from "assets/bg.jpg";
import { Character } from "common/types";
import BasicCharacterQuiz from "components/BasicCharacterQuiz/BasicCharacterQuiz";
import ImageCharacterQuiz from "components/ImageCharacterQuiz/ImageCharacterQuiz";
import DrawerBasic from "components/CustomDrawer";
import MultipleChoiceQuiz from "components/MultipleChoiceQuiz/MultipleChoiceQuiz";

export interface Score {
  points: number;
  date: string;
}

const Home = () => {
  const [charData, setCharData] = useState<Character[]>([]);
  const [animeData, setAnimeData] = useState<string[]>([]);

  useEffect(() => {
    if (charData.length === 0) {
      setCharData([
        ...characterData.sort((a, b) => (a.Name < b.Name ? -1 : 1)),
      ] as Character[]);
    }
    if (animeData.length === 0) {
      setAnimeData(
        [...new Set(charData.map((item) => item.Anime))].sort((a, b) =>
          a < b ? -1 : 1
        )
      );
    }
  }, [charData, characterData, animeData]);

  function getRandomCharacter() {
    const charArray = Object.values(characterData);
    let i = Math.floor(Math.random() * charArray.length);
    const target = charArray[i];
    return target as Character;
  }

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
        <DrawerBasic>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: 2,
              color: COLORS.quiz.primary_text,
            }}
          >
            Current Anime Index
          </Typography>
          {animeData.map((item) => (
            <Typography
              key={item}
              fontSize={"12px"}
              color={COLORS.quiz.primary_text}
            >
              {item}
            </Typography>
          ))}
        </DrawerBasic>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              marginTop: "100px",
              width: "80%",
              backgroundColor: COLORS.quiz.secondary,
              borderRadius: "16px",
              border: `1px solid ${COLORS.quiz.light}`,
              marginBottom: 4,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ paddingLeft: 2 }}>
                <Tabs
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
                    label="Character Quiz"
                    {...a11yProps(0)}
                  />
                  <Tab
                    sx={{
                      color: COLORS.quiz.light,
                      "&.Mui-selected": {
                        color: "white",
                      },
                    }}
                    label="Multiple Choice Quiz"
                    {...a11yProps(1)}
                  />
                  <Tab
                    sx={{
                      color: COLORS.quiz.light,
                      "&.Mui-selected": {
                        color: "white",
                      },
                    }}
                    label="Multiple Choice Quiz"
                    {...a11yProps(2)}
                  />
                </Tabs>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: "80%" }}>
            <CustomTabPanel value={value} index={0}>
              <BasicCharacterQuiz
                charData={charData}
                getRandomCharacter={getRandomCharacter}
              ></BasicCharacterQuiz>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
              <ImageCharacterQuiz
                animeData={animeData}
                charData={charData}
                getRandomCharacter={getRandomCharacter}
              ></ImageCharacterQuiz>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={2}>
              <MultipleChoiceQuiz
                animeData={animeData}
                charData={charData}
                getRandomCharacter={getRandomCharacter}
              ></MultipleChoiceQuiz>
            </CustomTabPanel>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
