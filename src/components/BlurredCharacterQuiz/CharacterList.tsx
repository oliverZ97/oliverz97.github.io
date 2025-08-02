import { Box, Tooltip, Typography, useTheme } from "@mui/material";
import { getImgSrc } from "common/quizUtils";
import { Character } from "common/types";
import { COLORS } from "styling/constants";

interface CharacterListProps {
  searchHistory: Character[];
  targetChar: Character | null;
}

export default function CharacterList({
  searchHistory,
  targetChar,
}: CharacterListProps) {
  const theme = useTheme();

  function getCardBorderColor(item: Character) {
    return item.Name === targetChar?.Name
      ? `2px solid ${COLORS.quiz.success_light}`
      : `2px solid ${COLORS.quiz.light}`;
  }

  function getCardBackgroundColor(item: Character) {
    return item.Name === targetChar?.Name
      ? COLORS.quiz.success
      : COLORS.quiz.main;
  }

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          width: "600px",
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          maxHeight: "400px",
          overflowX: "hidden",
          overflowY: "auto",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          border:
            searchHistory.length > 0
              ? `1px solid ${COLORS.quiz.light}`
              : "none",
          borderBottom: 0,
          background:
            "linear-gradient(90deg,rgba(0, 100, 148, 1) 0%, rgba(209, 107, 129, 1) 100%)",
          [theme.breakpoints.down("md")]: {
            overflowX: "scroll",
          },
        }}
      >
        {searchHistory.length > 0 && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "60px repeat(1, 1fr)",
              gap: 2,
              paddingX: 2,
            }}
          >
            {" "}
            {/* 4 equal columns */}
            {/* Header Row */}
            <Box
              sx={{
                gridColumn: "1 / 2",
                textAlign: "center",
                marginY: 2,
                fontWeight: "bold",
                color: COLORS.quiz.primary_text,
              }}
            >
              Image
            </Box>
            <Box
              sx={{
                gridColumn: "2 / 3",
                textAlign: "center",
                marginY: 2,
                fontWeight: "bold",
                color: COLORS.quiz.primary_text,
              }}
            >
              Name
            </Box>
          </Box>
        )}
        {/* Data Rows */}
        {searchHistory.map((item) => (
          <Box
            key={item.Name}
            sx={{
              display: "grid",
              gridTemplateColumns: "60px repeat(1, 1fr)",
              gap: 2,
              paddingX: 2,
              marginBottom: 2,
            }}
          >
            <Box
              sx={{
                gridColumn: "1 / 2",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 50,
              }}
            >
              <Tooltip
                title={item.Name}
                placement="bottom"
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, -24],
                        },
                      },
                    ],
                  },
                }}
              >
                <Box
                  sx={{ maxWidth: "60px", height: "75px", objectFit: "cover" }}
                  component={"img"}
                  src={getImgSrc(item.Name)}
                ></Box>
              </Tooltip>
            </Box>
            <Box
              sx={{
                gridColumn: "2 / 3",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 50,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  flexGrow: 1,
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  backgroundColor: getCardBackgroundColor(item),
                  height: "100%",
                  borderRadius: "4px",
                  border: getCardBorderColor(item),
                }}
              >
                <Typography>{item.Name}</Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      {}
    </Box>
  );
}
