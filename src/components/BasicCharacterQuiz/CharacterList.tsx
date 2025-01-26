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

export default function CharacterList({searchHistory, targetChar}: CharacterListProps) {

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
        <Box sx={{ marginTop: 4, display: "flex", flexDirection: "column", justifyContent: "flex-start", maxHeight: "400px", overflowX: "hidden", overflowY: "auto" }}>
        {[1].map((item) => <Box key={item} sx={{ display: "flex", gap: 2, justifyContent: "flex-start", padding: "16px", borderTopLeftRadius: "16px", borderTopRightRadius: "16px", backgroundColor: COLORS.quiz.main, position: "sticky", top: 0 }}>
           <Typography sx={{ width: "60px", fontWeight: "bold" }}>{"Image"}</Typography>
           <Typography sx={{ width: "200px", fontWeight: "bold" }}>{"Name"}</Typography>
           <Typography sx={{ width: "100px", fontWeight: "bold" }}>{"Sex"}</Typography>
           <Typography sx={{ width: "100px", fontWeight: "bold" }}>{"Age Group"}</Typography>
           <Typography sx={{ width: "150px", fontWeight: "bold" }}>{"Hair Color"}</Typography>
           <Typography sx={{ width: "100px", fontWeight: "bold" }}>{"Eye Color"}</Typography>
           <Typography sx={{ width: "100px", fontWeight: "bold" }}>{"Height"}</Typography>
           <Typography sx={{ width: "100px", fontWeight: "bold" }}>{"Origin"}</Typography>
           <Typography sx={{ width: "100px", fontWeight: "bold" }}>{"Release Year"}</Typography>
        </Box>)}
        {searchHistory.map((item) => <Box key={item.Name} sx={{ display: "flex", gap: 2, justifyContent: "flex-start", marginBottom: "4px" }}>
           <Box sx={{ width: "60px" }} component={"img"} src={getImgSrc(item.Name)}></Box>
           <Typography sx={{ width: "200px", display: "flex", alignItems: "center", padding: "16px", backgroundColor: item.ValidFields?.includes("Name") ? COLORS.quiz.success : COLORS.quiz.secondary }}>{item.Name}</Typography>
           <Typography sx={{ width: "100px", display: "flex", alignItems: "center", padding: "16px", backgroundColor: item.ValidFields?.includes("Sex") ? COLORS.quiz.success : COLORS.quiz.secondary }}>{item.Sex}</Typography>
           <Typography sx={{ width: "100px", display: "flex", alignItems: "center", gap: 1, padding: "16px", backgroundColor: item.ValidFields?.includes("Age_Group") ? COLORS.quiz.success : COLORS.quiz.secondary }}>
              <Typography component={"span"}>
                 {item.Age_Group}
              </Typography>
              {checkValueDiff(checkAgeGroup(item.Age_Group) ?? 0, checkAgeGroup(targetChar?.Age_Group ?? "12-18") ?? 0)}
           </Typography>
           <Typography sx={{ width: "150px", display: "flex", alignItems: "center", padding: "16px", backgroundColor: item.ValidFields?.includes("Hair_Color") ? COLORS.quiz.success : COLORS.quiz.secondary }}>{item.Hair_Color}</Typography>
           <Typography sx={{ width: "100px", display: "flex", alignItems: "center", padding: "16px", backgroundColor: item.ValidFields?.includes("Eye_Color") ? COLORS.quiz.success : COLORS.quiz.secondary }}>{item.Eye_Color}</Typography>
           <Typography sx={{ width: "100px", display: "flex", alignItems: "center", gap: 2, padding: "16px", backgroundColor: item.ValidFields?.includes("Height") ? COLORS.quiz.success : COLORS.quiz.secondary }}>
              <Typography component={"span"}>
                 {item.Height}
              </Typography>
              {checkValueDiff(item.Height ?? 0, targetChar?.Height ?? 0)}
           </Typography>
           <Typography sx={{ width: "100px", display: "flex", alignItems: "center", padding: "16px", flexGrow: 1, backgroundColor: item.ValidFields?.includes("Origin") ? COLORS.quiz.success : COLORS.quiz.secondary }}>{item.Origin}</Typography>
           <Typography sx={{ width: "100px", display: "flex", alignItems: "center", padding: "16px", flexGrow: 1, backgroundColor: item.ValidFields?.includes("First_Release_Year") ? COLORS.quiz.success : COLORS.quiz.secondary }}>

              <Typography component={"span"}>
                 {item.First_Release_Year}
              </Typography>
              {checkValueDiff(item.First_Release_Year ?? 0, targetChar?.First_Release_Year ?? 0)}
           </Typography>

        </Box>)}
     </Box>
    )
}