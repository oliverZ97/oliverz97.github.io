import { Autocomplete, Box, Button, Divider, MenuItem, Select, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import characterData from "data/character_data.json";
import JSConfetti from 'js-confetti'

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

useEffect(() => {
   if(charData.length === 0) {
      setCharData(characterData.sort((a,b) => a.Name < b.Name ? -1 : 1))
   }
}, [charData, characterData])

   useEffect(() => {
      if (!targetChar) {
         init()
      }
   }, [targetChar])

   function init() {
      setSearchHistory([])
      //select random character
      const charArray = Object.values(characterData);
      let i = Math.floor(Math.random() * charArray.length);
      const target = charArray[i]
      setTargetCharacter(target)
   }

   function removeOptionFromArray(value: Character) {
      const index = charData.indexOf(value);
      const tempArray = charData;
      tempArray.splice(index, 1)
      setCharData(tempArray);
   }

   function handleSearchChange(event: SyntheticEvent<Element, Event>, value: Character | null) {
      if (value && targetChar) {
         const res = compareObjects(value, targetChar);
         value.ValidFields = res;

         if(res.length === Object.keys(targetChar).length) {
            const jsConfetti = new JSConfetti()
            jsConfetti.addConfetti({
               emojis: ['🎉','🍛', '🍣', '✨', '🍜', '🌸', '🍙'],
               emojiSize: 30,
            })
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
            backgroundColor: "background.default"}}>
            
            <Box sx={{
               display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
         }}>
            
            <Typography sx={{ fontSize: "32px", marginBottom: 8, marginTop: 4 }}>Anime Quiz</Typography>
            <Box sx={{ display: "flex", gap: 4 }}>
               <Autocomplete
                  disablePortal
                  options={charData}
                  sx={{ width: 300, backgroundColor: "white" }}
                  renderInput={(params) => <TextField {...params} label="Character" />}
                  onChange={(ev, value) => handleSearchChange(ev, value)}
               />
               <Button onClick={init} sx={{ backgroundColor: "secondary.main", color: "white" }} variant="outlined">RESET</Button>

            </Box>

            <Box sx={{ marginTop: 4, display: "flex",flexDirection: "column", justifyContent: "flex-start" }}>
               {[1].map((item) => <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-start" }}>
                  <Typography sx={{ width: "200px", fontWeight: "bold" }}>{"Name"}</Typography>
                  <Typography sx={{ width: "100px", fontWeight: "bold" }}>{"Sex"}</Typography>
                  <Typography sx={{ width: "100px", fontWeight: "bold" }}>{"Age Group"}</Typography>
                  <Typography sx={{ width: "100px", fontWeight: "bold" }}>{"Hair Color"}</Typography>
                  <Typography sx={{ width: "100px", fontWeight: "bold" }}>{"Eye Color"}</Typography>
                  <Typography sx={{ width: "100px", fontWeight: "bold" }}>{"Height"}</Typography>
                  <Typography sx={{ width: "100px", fontWeight: "bold" }}>{"Origin"}</Typography>
                  <Typography sx={{ fontWeight: "bold"}} >{"Name"}</Typography>
               </Box>)}
               {searchHistory.map((item) => <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-start" }}>

                  <Typography sx={{ width: "200px", color: item.ValidFields?.includes("Name") ? "green" : "red" }}>{item.Name}</Typography>
                  <Typography sx={{ width: "100px", color: item.ValidFields?.includes("Sex") ? "green" : "red" }}>{item.Sex}</Typography>
                  <Typography sx={{ width: "100px", color: item.ValidFields?.includes("Age_Group") ? "green" : "red" }}>{item.Age_Group}</Typography>
                  <Typography sx={{ width: "100px", color: item.ValidFields?.includes("Hair_Color") ? "green" : "red" }}>{item.Hair_Color}</Typography>
                  <Typography sx={{ width: "100px", color: item.ValidFields?.includes("Eye_Color") ? "green" : "red" }}>{item.Eye_Color}</Typography>
                  <Typography sx={{ width: "100px", color: item.ValidFields?.includes("Height") ? "green" : "red" }}>{item.Height}</Typography>
                  <Typography sx={{ width: "100px", color: item.ValidFields?.includes("Origin") ? "green" : "red" }}>{item.Origin}</Typography>
                  <Typography sx={{ color: item.ValidFields?.includes("Anime") ? "green" : "red" }} >{item.Anime}</Typography>
               </Box>)}
            </Box>
            </Box>
         </Box>
      </>
   );
};

export default Home;
