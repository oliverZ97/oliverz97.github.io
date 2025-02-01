import { Box, Typography } from "@mui/material";
import { getImgSrc, checkAgeGroup } from "common/quizUtils";
import { Character } from "common/types";
import { COLORS } from "styling/constants";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface CharacterListProps {
   searchHistory: Character[];
   targetChar: Character | null;
}

export default function CharacterList({ searchHistory, targetChar }: CharacterListProps) {

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
      <Box>
         <Box sx={{ marginTop: 4, display: "flex", flexDirection: "column", justifyContent: "flex-start", maxHeight: "400px", overflowX: "hidden", overflowY: "auto", backgroundColor: COLORS.quiz.secondary, borderTopLeftRadius: "16px", borderTopRightRadius: "16px", border: `1px solid ${COLORS.quiz.light}`, borderBottom: 0 }}>
            {[1].map((item) =>
               <Box key={item} sx={{ display: "flex", gap: 1, justifyContent: "flex-start", padding: "16px", position: "sticky", top: 0 }}>
                  <Box sx={{ display: "flex", justifyContent: "center", minWidth: "60px", }}><Typography sx={{ fontWeight: "bold", color: COLORS.quiz.primary_text }}>{"Image"}</Typography></Box>
                  <Box sx={{ display: "flex", justifyContent: "center", minWidth: "150px", flexGrow: 1, }}><Typography sx={{ fontWeight: "bold", color: COLORS.quiz.primary_text }}>{"Name"}</Typography></Box>
                  <Box sx={{ display: "flex", justifyContent: "center", minWidth: "100px", flexGrow: 1, }}><Typography sx={{ fontWeight: "bold", color: COLORS.quiz.primary_text }}>{"Sex"}</Typography></Box>
                  <Box sx={{ display: "flex", justifyContent: "center", minWidth: "120px", flexGrow: 1, }}><Typography sx={{ fontWeight: "bold", color: COLORS.quiz.primary_text }}>{"Age Group"}</Typography></Box>
                  <Box sx={{ display: "flex", justifyContent: "center", minWidth: "150px", flexGrow: 1, }}><Typography sx={{ fontWeight: "bold", color: COLORS.quiz.primary_text }}>{"Hair Color"}</Typography></Box>
                  <Box sx={{ display: "flex", justifyContent: "center", minWidth: "100px", flexGrow: 1, }}><Typography sx={{ fontWeight: "bold", color: COLORS.quiz.primary_text }}>{"Eye Color"}</Typography></Box>
                  <Box sx={{ display: "flex", justifyContent: "center", minWidth: "100px", flexGrow: 1, }}><Typography sx={{ fontWeight: "bold", color: COLORS.quiz.primary_text }}>{"Height"}</Typography></Box>
                  <Box sx={{ display: "flex", justifyContent: "center", minWidth: "140px", flexGrow: 1, }}><Typography sx={{ fontWeight: "bold", color: COLORS.quiz.primary_text }}>{"Origin"}</Typography></Box>
                  <Box sx={{ display: "flex", justifyContent: "center", minWidth: "140px", flexGrow: 1, }}><Typography sx={{ fontWeight: "bold", color: COLORS.quiz.primary_text }}>{"Release Year"}</Typography></Box>
               </Box>
            )}

         </Box>
         {
            searchHistory.map((item) => <Box key={item.Name} sx={{ display: "flex", gap: 1, justifyContent: "flex-start", marginBottom: "4px", borderLeft: "1px solid transparent", borderRight: "1px solid transparent", paddingX: 2 }}>
               <Box sx={{ width: "60px", objectFit: "contain" }} component={"img"} src={getImgSrc(item.Name)}></Box>
               <Box sx={{ minWidth: "150px", flexGrow: 1, display: "flex", alignItems: "center", padding: "10px", backgroundColor: item.ValidFields?.includes("Name") ? COLORS.quiz.success : COLORS.quiz.main }}>
                  <Typography >{item.Name}</Typography>
               </Box>
               <Box sx={{ minWidth: "100px", flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "10px", backgroundColor: item.ValidFields?.includes("Sex") ? COLORS.quiz.success : COLORS.quiz.main }}>
                  <Typography >{item.Sex}</Typography>
               </Box>
               <Box sx={{ minWidth: "120px", flexGrow: 1, display: "flex", alignItems: "center", gap: 1, justifyContent: "center", padding: "10px", backgroundColor: item.ValidFields?.includes("Age_Group") ? COLORS.quiz.success : COLORS.quiz.main }}>
                  <Typography sx={{display: "flex", alignItems: "center", gap: 1}}>
                     <Typography component={"span"}>
                        {item.Age_Group}
                     </Typography>
                     {checkValueDiff(checkAgeGroup(item.Age_Group) ?? 0, checkAgeGroup(targetChar?.Age_Group ?? "12-18") ?? 0)}
                  </Typography>
               </Box>
               <Box sx={{ minWidth: "150px", flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "10px", backgroundColor: item.ValidFields?.includes("Hair_Color") ? COLORS.quiz.success : COLORS.quiz.main }}>
                  <Typography >{item.Hair_Color}</Typography>
               </Box>
               <Box sx={{ minWidth: "100px", flexGrow: 1, display: "flex", alignItems: "center",justifyContent: "center", padding: "10px",backgroundColor: item.ValidFields?.includes("Eye_Color") ? COLORS.quiz.success : COLORS.quiz.main }}>
                  <Typography >{item.Eye_Color}</Typography>
               </Box>
               <Box sx={{ minWidth: "100px", flexGrow: 1, display: "flex", alignItems: "center", gap: 2, justifyContent: "center", padding: "10px", backgroundColor: item.ValidFields?.includes("Height") ? COLORS.quiz.success : COLORS.quiz.main }}>
                  <Typography sx={{display: "flex", alignItems: "center", gap: 1}}>
                     <Typography component={"span"}>
                        {item.Height}
                     </Typography>
                     {checkValueDiff(item.Height ?? 0, targetChar?.Height ?? 0)}
                  </Typography>
               </Box>
               <Box sx={{ minWidth: "140px", flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "10px", backgroundColor: item.ValidFields?.includes("Origin") ? COLORS.quiz.success : COLORS.quiz.main }}>
                  <Typography >{item.Origin}</Typography>
               </Box>
               <Box sx={{ minWidth: "140px", flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "10px", backgroundColor: item.ValidFields?.includes("First_Release_Year") ? COLORS.quiz.success : COLORS.quiz.main }}>
                  <Typography sx={{display: "flex", alignItems: "center", gap: 1}}>

                     <Typography component={"span"}>
                        {item.First_Release_Year}
                     </Typography>
                     {checkValueDiff(item.First_Release_Year ?? 0, targetChar?.First_Release_Year ?? 0)}
                  </Typography>
               </Box>
            </Box>)
         }
      </Box >
   )
}