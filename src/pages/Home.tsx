import { Autocomplete, Box, Button, Divider, MenuItem, Select, Tab, Tabs, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import characterData from "data/character_data.json";
import JSConfetti from 'js-confetti'
import { RevealCard } from "components/RevealCard";
import { COLORS } from "styling/constants";

import bg from "assets/bg.jpeg"
import { Character } from "common/types";
import { checkAgeGroup, compareObjects, getImgSrc, isMoreThanADay, sameDate } from "common/quizUtils";
import AnimeCharacterQuiz from "components/BasicCharacterQuiz/AnimeCharacterQuiz";
import { SearchBar } from "components/BasicCharacterQuiz/SearchBar";

interface HintRef {
   resetHint: () => void;
}

interface Streak {
   date: string;
   streak: number;
}


interface Score {
   points: number;
   date: string;
}



const BASEPOINTS = 200;
const HINTPOINTS = 750;
const REDUCEFACTOR = 10;

const Home = () => {
   const [targetChar, setTargetCharacter] = useState<Character | null>(null);
   const [searchHistory, setSearchHistory] = useState<Character[]>([]);
   const [charData, setCharData] = useState<Character[]>([]);
   const [reset, setReset] = useState(false);
   const [scores, setScores] = useState<Score[]>([]);
   const [isCorrect, setIsCorrect] = useState(false);
   const [selectedOption, setSelectedOption] = useState<Character | null>(null)
   const [points, setPoints] = useState(10000);
   const [usedHints, setUsedHints] = useState(0);

   const genreHintRef = useRef<HintRef | null>(null);
   const animeHintRef = useRef<HintRef | null>(null);
   const editorialHintRef = useRef<HintRef | null>(null);

   useEffect(() => {
      if (charData.length === 0 || reset) {
         setCharData([...characterData.sort((a, b) => a.Name < b.Name ? -1 : 1)] as Character[])
         setReset(false)
      }
   }, [charData, characterData, reset])

   useEffect(() => {
      if (!targetChar) {
         init()
      }
   }, [targetChar])

   function init() {
      setIsCorrect(false)
      setReset(true);
      setCharData(characterData as Character[]);
      setSearchHistory([]);
      setPoints(10000);
      setUsedHints(0);
      if (genreHintRef.current) {
         genreHintRef.current.resetHint();
      }
      if (animeHintRef.current) {
         animeHintRef?.current.resetHint();
      }
      if (editorialHintRef.current) {
         editorialHintRef?.current.resetHint();
      }
      //select random character
      const charArray = Object.values(characterData);
      let i = Math.floor(Math.random() * charArray.length);
      const target = charArray[i]
      setTargetCharacter(target as Character);

      //get scores
      const scores = localStorage.getItem("scores");
      if (scores) {
         const scoreArr = JSON.parse(scores);

         const topThree = scoreArr.slice(0, 3);
         setScores(topThree);
      }
   }

   function removeOptionFromArray(value: Character) {
      const index = charData.indexOf(value);
      const tempArray = charData;
      tempArray.splice(index, 1);
      setCharData(tempArray);
   }

   useEffect(() => {
      if (selectedOption) {
         setTimeout(() => {

            setSelectedOption(null);
         }, 100)
      }

   }, [selectedOption])

   function calculateSelectionPoints(correctFieldCount: number) {

      const baseValue = ((Math.max(searchHistory.length, 1)) * BASEPOINTS);
      let roundPoints = baseValue - correctFieldCount * REDUCEFACTOR;


      setPoints(points - roundPoints < 0 ? 0 : points - roundPoints);
   }

   function handleSearchChange(event: SyntheticEvent<Element, Event>, value: Character | null, reason: any) {
      if (value && targetChar) {
         const res = compareObjects(value, targetChar);
         value.ValidFields = res.all;

         setSelectedOption(value);
         removeOptionFromArray(value);

         setSearchHistory([value, ...searchHistory]);

         if (res.all.length + 1 === Object.keys(targetChar).length) {
            const jsConfetti = new JSConfetti()
            jsConfetti.addConfetti({
               emojis: ['🎉', '🍛', '🍣', '✨', '🍜', '🌸', '🍙'],
               emojiSize: 30,
            })

            setIsCorrect(true)

            //Set Highscore
            const scoreObj = {
               points: points,
               date: new Date().toLocaleString("de-DE", { year: "numeric", month: "2-digit", day: "2-digit" })
            }

            let localScores = localStorage.getItem("scores");
            let scores;
            if (localScores) {
               scores = JSON.parse(localScores);
               scores.push(scoreObj)
            } else[
               scores = [
                  scoreObj
               ]
            ]

            //sort
            scores.sort((a: Score, b: Score) => a.points < b.points ? 1 : -1)
            setScores(scores.slice(0, 3))
            const scoreString = JSON.stringify(scores);
            localStorage.setItem("scores", scoreString);
            setStreak()

            return;
         }


         //calculate point reduce
         calculateSelectionPoints(res.short.length)

      }
   }

   function reducePointsForHint() {
      setUsedHints(usedHints + 1);
   }

   useEffect(() => {
      if (usedHints > 0) {
         const reducePoints = usedHints * HINTPOINTS
         setPoints(points - reducePoints < 0 ? 0 : points - reducePoints);
      }
   }, [usedHints])



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
            backgroundColor: COLORS.quiz.background,
            background: `url(${bg})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            maxWidth: "100%",
            minHeight: "100vh",
            position: "relative"
         }}>

            <Box sx={{ position: "absolute", left: 0, top: 0, marginTop: "100px", backgroundColor: COLORS.quiz.secondary, padding: 2, borderTopRightRadius: "16px", borderBottomRightRadius: "16px", width: "320px" }}>
               {[...new Set(charData.map((item) => item.Anime))].sort((a, b) => a < b ? -1 : 1).map((item) => <Typography fontSize={"14px"} color={"black"}>{item}</Typography>)}
            </Box>

            <Box sx={{ position: "absolute", left: 0, top: 680, marginBottom: 4, width: "320px" }}>
               <Box sx={{ padding: 2, backgroundColor: COLORS.quiz.main, color: "white", borderTopRightRadius: "16px" }}><Typography>Highscore</Typography></Box>
               {scores.map(((item, index) => <Box key={index} sx={{ display: "flex", justifyContent: "space-between", gap: 2, paddingX: 2, paddingY: 1, color: "white", backgroundColor: COLORS.quiz.secondary }}>
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
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                           <Tab label="Character Quiz" {...a11yProps(0)} />
                           <Tab label="Character Image Quiz" {...a11yProps(1)} />
                        </Tabs>
                     </Box>


                     <Box sx={{ backgroundColor: COLORS.quiz.secondary, borderRadius: "16px", padding: 2 }}>
                        <Typography sx={{ filter: !getStreak() || getStreak() && getStreak().streak < 1 ? "grayscale(100%)" : "grayscale(0%)" }} fontSize={32}>{`🔥 ${getStreak()?.streak ?? 0}`}</Typography>
                     </Box>
                  </Box>
                  <CustomTabPanel value={value} index={0}>
                     <Box>
                        <Box sx={{ backgroundColor: COLORS.quiz.secondary, padding: 2, borderRadius: "16px", marginBottom: 4, display: "flex", gap: 2 }}>
                           <RevealCard onReveal={reducePointsForHint} ref={genreHintRef} cardText={targetChar?.Genre ?? ""} cardTitle="Genre"></RevealCard>
                           <RevealCard onReveal={reducePointsForHint} ref={animeHintRef} cardText={targetChar?.Anime ?? ""} cardTitle="Anime"></RevealCard>
                           <RevealCard onReveal={reducePointsForHint} ref={editorialHintRef} cardText={targetChar?.Editorial_Staff_Hint ?? ""} cardTitle="Editoral Staff Hint"></RevealCard>
                        </Box>


                        <SearchBar points={points} searchHistory={searchHistory} isCorrect={isCorrect} selectedOption={selectedOption} charData={charData} handleSearchChange={handleSearchChange} init={init}></SearchBar>
                        <AnimeCharacterQuiz searchHistory={searchHistory} targetChar={targetChar}></AnimeCharacterQuiz>
                     </Box>
                  </CustomTabPanel>
               </Box>

               <CustomTabPanel value={value} index={1}>
                  <Box sx={{ backgroundColor: COLORS.quiz.secondary, padding: 2, borderRadius: "16px" }}>
                     <Typography>

                        Coming Soon...
                     </Typography>
                  </Box>
               </CustomTabPanel>

            </Box>
         </Box >
      </>
   );
};

export default Home;
