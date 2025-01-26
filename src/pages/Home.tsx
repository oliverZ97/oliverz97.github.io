import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import characterData from "data/character_data.json";
import { COLORS } from "styling/constants";

import bg from "assets/bg.jpeg"
import { Character } from "common/types";
import { getImgSrc, isMoreThanADay, sameDate } from "common/quizUtils";
import BasicCharacterQuiz from "components/BasicCharacterQuiz/BasicCharacterQuiz";
import ImageCharacterQuiz from "components/ImageCharacterQuiz/ImageCharacterQuiz";

interface Streak {
   date: string;
   streak: number;
}

export interface Score {
   points: number;
   date: string;
}

const Home = () => {
   const [charData, setCharData] = useState<Character[]>([]);
   const [animeData, setAnimeData] = useState<string[]>([])
   const [scores, setScores] = useState<Score[]>([]);

   useEffect(() => {
      //get scores
      const scores = localStorage.getItem("scores");
      if (scores) {
         const scoreArr = JSON.parse(scores) as Score[];

         const topThree = scoreArr.slice(0, 3);
         setScores(topThree);
      }
   }, [])

   useEffect(() => {
      if (charData.length === 0) {
         setCharData([...characterData.sort((a, b) => a.Name < b.Name ? -1 : 1)] as Character[])
      }
      if (animeData.length === 0) {
         setAnimeData([...new Set(charData.map((item) => item.Anime))].sort((a, b) => a < b ? -1 : 1))
      }
   }, [charData, characterData, animeData])

   function getRandomCharacter() {
      const charArray = Object.values(characterData);
      let i = Math.floor(Math.random() * charArray.length);
      const target = charArray[i];
      return target as Character;
   }

   function setStreak() {
      const streakObj = getStreak();
      if (streakObj) {
         const today = new Date()
         today.setHours(4);
         today.setMinutes(0);
         today.setSeconds(0);
         today.setMilliseconds(0);

         if (streakObj.date) {
            const currentDate = new Date(parseInt(streakObj.date));
            if (sameDate(currentDate, today)) {
               return;
            }
         }

         const newStreak: Streak = {
            date: today.getTime().toString(),
            streak: streakObj.streak + 1
         }

         localStorage.setItem("quizStreak", JSON.stringify(newStreak))
      }
   }

   function getStreak() {
      const streak = localStorage.getItem("quizStreak");

      if (streak) {

         const streakObj: Streak = JSON.parse(streak);
         const date = new Date(parseInt(streakObj.date));
         const today = new Date()
         today.setHours(4);
         const isInvalid = isMoreThanADay(date, today);
         if (isInvalid) {
            return {
               streak: 0,
               date: undefined
            };
         }

         return streakObj;
      } else {
         return {
            streak: 0,
            date: undefined
         };
      }
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
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
         </div>
      );
   }

   function a11yProps(index: number) {
      return {
         id: `simple-tab-${index}`,
         'aria-controls': `simple-tabpanel-${index}`,
      };
   }

   const [value, setValue] = useState(0);

   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
   };

   return (
      <>


         <Box sx={{
            backgroundColor: COLORS.quiz.tertiary,
            background: `url(${bg})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            maxWidth: "100%",
            minHeight: "100vh",
            position: "relative"
         }}>

            <Box sx={{ position: "absolute", left: 0, top: 0, marginTop: "100px", backgroundColor: COLORS.quiz.secondary, padding: 2, borderTopRightRadius: "16px", borderBottomRightRadius: "16px", width: "320px" }}>
               {animeData.map((item) => <Typography key={item} fontSize={"14px"} color={"black"}>{item}</Typography>)}
            </Box>

            <Box sx={{ position: "absolute", left: 0, top: 680, marginBottom: 4, width: "320px" }}>
               <Box sx={{ padding: 2, backgroundColor: COLORS.quiz.main, color: "white", borderTopRightRadius: "16px" }}><Typography>Highscore</Typography></Box>
               {scores.length > 0 && scores.map(((item, index) => <Box key={index} sx={{ display: "flex", justifyContent: "space-between", gap: 2, paddingX: 2, paddingY: 1, color: "white", backgroundColor: COLORS.quiz.secondary }}>
                  <Typography>{"Points: " + item.points}</Typography>
                  <Typography>{"Date: " + item.date}</Typography>
               </Box>))}
            </Box>

            <Box sx={{
               display: "flex",
               flexDirection: "column",
               justifyContent: "center",
               alignItems: "center",
            }}>


               <Box sx={{ marginTop: "300px", width: "60%" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>

                     <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: COLORS.quiz.secondary, borderRadius: "16px" }}>
                        <Tabs sx={{
                           '& .MuiTabs-indicator': {
                              backgroundColor: COLORS.quiz.main,
                           },
                        }} value={value} onChange={handleChange} aria-label="basic tabs example">
                           <Tab sx={{
                              "&.Mui-selected": {
                                 color: "white",
                              },
                           }} 
                           label="Character Quiz" {...a11yProps(0)} />
                           <Tab sx={{
                              "&.Mui-selected": {
                                 color: "white",
                              },
                           }} 
                           label="Character Image Quiz" {...a11yProps(1)} />
                        </Tabs>
                     </Box>


                     <Box sx={{ backgroundColor: COLORS.quiz.secondary, borderRadius: "16px", padding: 2 }}>
                        <Typography sx={{ filter: !getStreak() || getStreak() && getStreak().streak < 1 ? "grayscale(100%)" : "grayscale(0%)" }} fontSize={32}>{`🔥 ${getStreak()?.streak ?? 0}`}</Typography>
                     </Box>
                  </Box>
                  <CustomTabPanel value={value} index={0}>
                     <BasicCharacterQuiz charData={charData} getRandomCharacter={getRandomCharacter} setStreak={setStreak} setScores={setScores}></BasicCharacterQuiz>
                  </CustomTabPanel>
               </Box>

               <CustomTabPanel value={value} index={1}>
                  <ImageCharacterQuiz animeData={animeData} charData={charData} getRandomCharacter={getRandomCharacter}></ImageCharacterQuiz>
               </CustomTabPanel>

            </Box>
         </Box >
      </>
   );
};

export default Home;
