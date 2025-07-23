import { Box, Typography } from "@mui/material";
import { Anime } from "common/types";
import { COLORS } from "styling/constants";

interface AnimeIndexProps {
  animeData: Anime[];
}

export const AnimeIndex = ({ animeData }: AnimeIndexProps) => {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: 2,
          color: COLORS.quiz.primary_text,
        }}
      >
        Anime Index
      </Typography>
      {animeData.map((item: Anime, index: number) => (
        <>
          {(index === 0 || item.Name[0] !== animeData[index - 1].Name[0]) && (
            <Typography
              sx={{ fontWeight: "bold", color: "white", marginTop: 1 }}
            >
              {item.Name[0]}
            </Typography>
          )}
          <Typography
            key={item.Name}
            fontSize={"12px"}
            color={COLORS.quiz.primary_text}
          >
            {item.Name}
          </Typography>
        </>
      ))}
    </Box>
  );
};
