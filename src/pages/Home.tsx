import { Autocomplete, Box, Button, Divider, MenuItem, Select, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import characterData from "data/character_data.json";
import JSConfetti from 'js-confetti'
import { set } from "react-hook-form";

interface Character {
   Name: string;
   Sex: string;
   Origin: string;
   Hair_Color: string;
   Age: string;
   Age_Group: string;
   Height: number | null;
   Eye_Color: string;
   Genre: string;
   Anime: string;
   ValidFields?: string[]
}

const Home = () => {
   const [targetChar, setTargetCharacter] = useState<Character | null>(null);
   const [searchHistory, setSearchHistory] = useState<Character[]>([]);
   const [charData, setCharData] = useState<Character[]>([]);
   const [selectedValue, setSelectedValue] = useState<Character | null>(null);
   const [reset, setReset] = useState(false);
   const [scores, setScores] = useState<Score[]>([]);
   const [isCorrect, setIsCorrect] = useState(false)

   useEffect(() => {
      if (charData.length === 0 || reset) {
         setCharData([...characterData.sort((a, b) => a.Name < b.Name ? -1 : 1)])
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
      setCharData(characterData);
      setSearchHistory([])
      //select random character
      const charArray = Object.values(characterData);
      let i = Math.floor(Math.random() * charArray.length);
      const target = charArray[i]
      setTargetCharacter(target);

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
      tries: number;
      date: string;
   }

   function handleSearchChange(event: SyntheticEvent<Element, Event>, value: Character | null, reason: any) {
      if (value && targetChar) {
         //setSelectedValue(null)
         const res = compareObjects(value, targetChar);
         value.ValidFields = res;

         if (res.length + 1 === Object.keys(targetChar).length) {
            const jsConfetti = new JSConfetti()
            jsConfetti.addConfetti({
               emojis: ['🎉', '🍛', '🍣', '✨', '🍜', '🌸', '🍙'],
               emojiSize: 30,
            })

            setIsCorrect(true)

            //Set Highscore
            const scoreObj = {
               tries: searchHistory.length,
               date: new Date().toLocaleString("en-US")
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
            scores.sort((a: Score, b: Score) => a.tries < b.tries ? -1 : 1)
            setScores(scores.slice(0, 3))
            const scoreString = JSON.stringify(scores);
            localStorage.setItem("scores", scoreString);
         }

         setSearchHistory([...searchHistory, value]);
         removeOptionFromArray(value)

      }
   }

   function compareObjects<T extends Record<string, any>>(obj1: T, obj2: T): string[] {
      const sameFields: string[] = [];

      for (const key in obj1) {
         if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key) && obj1[key] === obj2[key]) {
            sameFields.push(key);
         }
      }

      return sameFields;
   }

   return (
      <>
         <Box sx={{
            height: "100vh",
            width: "100wh",
            backgroundColor: "#291f40"
         }}>

            <Box sx={{
               display: "flex",
               flexDirection: "column",
               justifyContent: "center",
               alignItems: "center"
            }}>

               <Typography sx={{ fontSize: "42px", marginBottom: 8, marginTop: 4, color: "white" }}>Anime Quiz</Typography>
               <Box sx={{marginBottom: 4, width: "60%"}}>
                  <Box sx={{padding: 2, backgroundColor: "#9a81d4", color: "white", borderTopLeftRadius: "16px", borderTopRightRadius: "16px"}}><Typography>Highscore</Typography></Box>
                  {scores.map((item => <Box key={item.date} sx={{display: "flex", justifyContent: "space-between", gap: 2, paddingX: 2, paddingY: 1, color: "white", backgroundColor: "#c3a9d6"}}>
                     <Typography>{"Tries: " + item.tries}</Typography>
                     <Typography>{"Date: " + item.date}</Typography>
                  </Box>))}
               </Box>

               <Box sx={{ display: "flex", gap: 4, alignItems: "center", width: "60%", justifyContent: "space-between" }}>
                  <Typography sx={{color: "white"}}>{"Tries: " + searchHistory.length}</Typography>
                  <Autocomplete
                     disablePortal
                     options={charData}
                     sx={{ width: 300, backgroundColor: "white" }}
                     renderInput={(params) => <TextField {...params} label="Character" />}
                     onChange={(ev, value, reason) => handleSearchChange(ev, value, reason)}
                     value={selectedValue}
                     clearOnBlur
                     disabled={isCorrect}
                  />
                  <Button onClick={init} sx={{ backgroundColor: "#9a81d4", color: "white", "&:hover": {
                     backgroundColor: "#c3a9d6"
                  } }} variant="outlined">RESET QUIZ</Button>

               </Box>

               <Box sx={{ marginTop: 4, display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                  {[1].map((item) => <Box key={item} sx={{ display: "flex", gap: 2, justifyContent: "flex-start", padding: "16px", borderTopLeftRadius: "16px", borderTopRightRadius: "16px", backgroundColor: "#9a81d4" }}>
                     <Typography sx={{ width: "200px", fontWeight: "bold" }}>{"Name"}</Typography>
                     <Typography sx={{ width: "100px", fontWeight: "bold" }}>{"Sex"}</Typography>
                     <Typography sx={{ width: "100px", fontWeight: "bold" }}>{"Age Group"}</Typography>
                     <Typography sx={{ width: "150px", fontWeight: "bold" }}>{"Hair Color"}</Typography>
                     <Typography sx={{ width: "100px", fontWeight: "bold" }}>{"Eye Color"}</Typography>
                     <Typography sx={{ width: "100px", fontWeight: "bold" }}>{"Height"}</Typography>
                     <Typography sx={{ width: "100px", fontWeight: "bold" }}>{"Origin"}</Typography>
                     <Typography sx={{ fontWeight: "bold" }} >{"Name"}</Typography>
                  </Box>)}
                  {searchHistory.map((item) => <Box key={item.Name} sx={{ display: "flex", gap: 2, justifyContent: "flex-start", marginBottom: "4px" }}>

                     <Typography sx={{ width: "200px", padding: "16px", backgroundColor: item.ValidFields?.includes("Name") ? "#99c2ab" : "#c3a9d6" }}>{item.Name}</Typography>
                     <Typography sx={{ width: "100px", padding: "16px", backgroundColor: item.ValidFields?.includes("Sex") ? "#99c2ab" : "#c3a9d6" }}>{item.Sex}</Typography>
                     <Typography sx={{ width: "100px", padding: "16px", backgroundColor: item.ValidFields?.includes("Age_Group") ? "#99c2ab" : "#c3a9d6" }}>{item.Age_Group}</Typography>
                     <Typography sx={{ width: "150px", padding: "16px", backgroundColor: item.ValidFields?.includes("Hair_Color") ? "#99c2ab" : "#c3a9d6" }}>{item.Hair_Color}</Typography>
                     <Typography sx={{ width: "100px", padding: "16px", backgroundColor: item.ValidFields?.includes("Eye_Color") ? "#99c2ab" : "#c3a9d6" }}>{item.Eye_Color}</Typography>
                     <Typography sx={{ width: "100px", padding: "16px", backgroundColor: item.ValidFields?.includes("Height") ? "#99c2ab" : "#c3a9d6" }}>{item.Height}</Typography>
                     <Typography sx={{ width: "100px", padding: "16px", backgroundColor: item.ValidFields?.includes("Origin") ? "#99c2ab" : "#c3a9d6" }}>{item.Origin}</Typography>
                     <Typography sx={{ padding: "16px", flexGrow: 1, backgroundColor: item.ValidFields?.includes("Anime") ? "#99c2ab" : "#c3a9d6" }} >{item.Anime}</Typography>
                  </Box>)}
               </Box>
            </Box>
         </Box>
      </>
   );
};

export default Home;
