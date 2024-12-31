import { Autocomplete, Box, Button, Divider, MenuItem, Select, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import characterData from "data/character_data.json";
import JSConfetti from 'js-confetti'
import { RevealCard } from "components/RevealCard";
import { COLORS } from "styling/constants";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import bg from "assets/bg.jpeg"

interface Character {
   Name: string;
   Sex: string;
   Origin: string;
   Hair_Color: string;
   Age: string;
   Age_Group: "12-18" | "19-30" | "31-50" | "51-70" | "100+";
   Height: number | null;
   Eye_Color: string;
   Genre: string;
   Anime: string;
   Editorial_Staff_Hint: string;
   ValidFields?: string[]
}

interface HintRef {
   resetHint: () => void;
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

   interface Score {
      points: number;
      date: string;
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

         setSearchHistory([...searchHistory, value]);
         setSelectedOption(value);



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

            return;
         }

         
         //calculate point reduce
         calculateSelectionPoints(res.short.length)

         removeOptionFromArray(value)

      }
   }

   function compareObjects<T extends Record<string, any>>(obj1: T, obj2: T): {
      all: string[],
      short: string[]
   } {
      const sameFieldsObj: {
         all: string[],
         short: string[]
      } = { all: [], short: [] };
      const validFields = ["Name",
         "Sex",
         "Origin",
         "Hair_Color",
         "Age_Group",
         "Height",
         "Eye_Color"]

      for (const key in obj1) {
         if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key) && obj1[key] === obj2[key]) {
            if (validFields.includes(key)) {
               sameFieldsObj.short.push(key);
            }
            sameFieldsObj.all.push(key)
         }
      }

      return sameFieldsObj;
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

   function checkAgeGroup(value: string) {
      if ("12-18" === value) return 1
      if ("19-30" === value) return 2
      if ("31-50" === value) return 3
      if ("51-70" === value) return 4
      if ("100+" === value) return 5
   }

   function checkValueDiff(value1: number, value2: number) {
      if (value1 > value2) {
         return <ArrowDownwardIcon />
      } else if (value1 < value2) {
         return <ArrowUpwardIcon />
      } else {
         return
      }
   }

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
               {scores.map((item => <Box key={item.date} sx={{ display: "flex", justifyContent: "space-between", gap: 2, paddingX: 2, paddingY: 1, color: "white", backgroundColor: COLORS.quiz.secondary }}>
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

               <Box>
                  <Box sx={{ backgroundColor: COLORS.quiz.secondary, padding: 2, borderRadius: "16px", marginBottom: 4, display: "flex", gap: 2, marginTop: "300px" }}>
                     <RevealCard onReveal={reducePointsForHint} ref={genreHintRef} cardText={targetChar?.Genre ?? ""} cardTitle="Genre"></RevealCard>
                     <RevealCard onReveal={reducePointsForHint} ref={animeHintRef} cardText={targetChar?.Anime ?? ""} cardTitle="Anime"></RevealCard>
                     <RevealCard onReveal={reducePointsForHint} ref={editorialHintRef} cardText={targetChar?.Editorial_Staff_Hint ?? ""} cardTitle="Editoral Staff Hint"></RevealCard>
                  </Box>

                  <Box sx={{ display: "flex", gap: 4, alignItems: "center", justifyContent: "space-between", backgroundColor: COLORS.quiz.secondary, padding: 2, borderRadius: "16px" }}>
                     <Box>
                        <Typography sx={{ color: "white" }}>{"Points: " + points}</Typography>
                        <Typography sx={{ color: "white" }}>{"Tries: " + searchHistory.length}</Typography>
                     </Box>
                     <Autocomplete
                        disablePortal
                        options={charData}
                        sx={{ width: 300, backgroundColor: "white", borderRadius: "8px" }}
                        renderInput={(params) => <TextField {...params} label="Character" />}
                        onChange={(ev, value, reason) => handleSearchChange(ev, value, reason)}
                        clearOnBlur
                        disabled={isCorrect}
                        value={selectedOption}
                        filterOptions={(options, { inputValue }) => {
                           // Only filter if there is at least one character in the input
                           return inputValue !== '' ? options.filter((option) => option.Name.toLowerCase().includes(inputValue.toLowerCase())) : [];
                        }}
                     />
                     <Button onClick={init} sx={{
                        backgroundColor: COLORS.quiz.main, color: "white", "&:hover": {
                           backgroundColor: COLORS.quiz.secondary
                        }
                     }} variant="outlined">RESET QUIZ</Button>

                  </Box>



                  <Box sx={{ marginTop: 4, display: "flex", flexDirection: "column", justifyContent: "flex-start", maxHeight: "400px",overflowX: "hidden", overflowY: "auto" }}>
                     {[1].map((item) => <Box key={item} sx={{ display: "flex", gap: 2, justifyContent: "flex-start", padding: "16px", borderTopLeftRadius: "16px", borderTopRightRadius: "16px", backgroundColor: COLORS.quiz.main, position: "sticky", top: 0 }}>
                        <Typography sx={{ width: "200px", fontWeight: "bold" }}>{"Name"}</Typography>
                        <Typography sx={{ width: "100px", fontWeight: "bold" }}>{"Sex"}</Typography>
                        <Typography sx={{ width: "100px", fontWeight: "bold" }}>{"Age Group"}</Typography>
                        <Typography sx={{ width: "150px", fontWeight: "bold" }}>{"Hair Color"}</Typography>
                        <Typography sx={{ width: "100px", fontWeight: "bold" }}>{"Eye Color"}</Typography>
                        <Typography sx={{ width: "100px", fontWeight: "bold" }}>{"Height"}</Typography>
                        <Typography sx={{ width: "100px", fontWeight: "bold" }}>{"Origin"}</Typography>
                     </Box>)}
                     {searchHistory.map((item) => <Box key={item.Name} sx={{ display: "flex", gap: 2, justifyContent: "flex-start", marginBottom: "4px" }}>

                        <Typography sx={{ width: "200px", padding: "16px", backgroundColor: item.ValidFields?.includes("Name") ? COLORS.quiz.success : COLORS.quiz.secondary }}>{item.Name}</Typography>
                        <Typography sx={{ width: "100px", padding: "16px", backgroundColor: item.ValidFields?.includes("Sex") ? COLORS.quiz.success : COLORS.quiz.secondary }}>{item.Sex}</Typography>
                        <Typography sx={{ width: "100px", display: "flex", alignItems: "center", gap: 1, padding: "16px", backgroundColor: item.ValidFields?.includes("Age_Group") ? COLORS.quiz.success : COLORS.quiz.secondary }}>
                           <Typography component={"span"}>
                              {item.Age_Group}
                           </Typography>
                           {checkValueDiff(checkAgeGroup(item.Age_Group) ?? 0, checkAgeGroup(targetChar?.Age_Group ?? "12-18") ?? 0)}
                        </Typography>
                        <Typography sx={{ width: "150px", padding: "16px", backgroundColor: item.ValidFields?.includes("Hair_Color") ? COLORS.quiz.success : COLORS.quiz.secondary }}>{item.Hair_Color}</Typography>
                        <Typography sx={{ width: "100px", padding: "16px", backgroundColor: item.ValidFields?.includes("Eye_Color") ? COLORS.quiz.success : COLORS.quiz.secondary }}>{item.Eye_Color}</Typography>
                        <Typography sx={{ width: "100px", display: "flex", alignItems: "center", gap: 2, padding: "16px", backgroundColor: item.ValidFields?.includes("Height") ? COLORS.quiz.success : COLORS.quiz.secondary }}>
                           <Typography component={"span"}>
                              {item.Height}
                           </Typography>
                           {checkValueDiff(item.Height ?? 0, targetChar?.Height ?? 0)}
                        </Typography>
                        <Typography sx={{ width: "100px", padding: "16px", flexGrow: 1, backgroundColor: item.ValidFields?.includes("Origin") ? COLORS.quiz.success : COLORS.quiz.secondary }}>{item.Origin}</Typography>
                     </Box>)}
                  </Box>
               </Box>
            </Box>
         </Box >
      </>
   );
};

export default Home;
