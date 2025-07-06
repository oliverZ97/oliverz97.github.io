import { Box, Grid, Tooltip, Typography, useTheme } from "@mui/material";
import { getImgSrc, checkAgeGroup } from "common/quizUtils";
import { Character } from "common/types";
import { COLORS } from "styling/constants";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface CharacterListProps {
  searchHistory: Character[];
  targetChar: Character | null;
}

export default function CharacterList({
  searchHistory,
  targetChar,
}: CharacterListProps) {
  const theme = useTheme();

  function checkValueDiff(value1: number, value2: number) {
    if (value1 > value2) {
      return <ArrowDownwardIcon />;
    } else if (value1 < value2) {
      return <ArrowUpwardIcon />;
    } else {
      return;
    }
  }

  return (
    <Box>
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          maxHeight: "400px",
          overflowX: "hidden",
          overflowY: "auto",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          border: searchHistory.length > 0 ? `1px solid ${COLORS.quiz.light}` : "none",
          borderBottom: 0,
          background: "linear-gradient(90deg,rgba(0, 100, 148, 1) 0%, rgba(209, 107, 129, 1) 100%)",
          [theme.breakpoints.down("md")]: {
            overflowX: "scroll",
          },
        }}
      >
        {searchHistory.length > 0 && <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "60px repeat(8, 1fr)",
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
            Sex
          </Box>
          <Box
            sx={{
              gridColumn: "3 / 4",
              textAlign: "center",
              marginY: 2,
              fontWeight: "bold",
              color: COLORS.quiz.primary_text,
            }}
          >
            Age Group
          </Box>
          <Box
            sx={{
              gridColumn: "4 / 5",
              textAlign: "center",
              marginY: 2,
              fontWeight: "bold",
              color: COLORS.quiz.primary_text,
            }}
          >
            Hair Color
          </Box>
          <Box
            sx={{
              gridColumn: "5 / 6",
              textAlign: "center",
              marginY: 2,
              fontWeight: "bold",
              color: COLORS.quiz.primary_text,
            }}
          >
            Eye Color
          </Box>
          <Box
            sx={{
              gridColumn: "6 / 7",
              textAlign: "center",
              marginY: 2,
              fontWeight: "bold",
              color: COLORS.quiz.primary_text,
            }}
          >
            Height
          </Box>
          <Box
            sx={{
              gridColumn: "7 / 8",
              textAlign: "center",
              marginY: 2,
              fontWeight: "bold",
              color: COLORS.quiz.primary_text,
            }}
          >
            Origin
          </Box>
          <Box
            sx={{
              gridColumn: "8 / 9",
              textAlign: "center",
              marginY: 2,
              fontWeight: "bold",
              color: COLORS.quiz.primary_text,
            }}
          >
            Anime Release
          </Box>
          <Box
            sx={{
              gridColumn: "9 / 10",
              textAlign: "center",
              marginY: 2,
              fontWeight: "bold",
              color: COLORS.quiz.primary_text,
            }}
          >
            Anime Genre
          </Box>
        </Box>}
        {/* Data Rows */}
        {searchHistory.map((item) => (
          <Box
            key={item.Name}
            sx={{
              display: "grid",
              gridTemplateColumns: "60px repeat(8, 1fr)",
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
              <Tooltip title={item.Name} placement="bottom" slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: 'offset',
                      options: {
                        offset: [0, -24],
                      },
                    },
                  ],
                },
              }}>
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
                  backgroundColor: item.ValidFields?.includes("Sex")
                    ? COLORS.quiz.success
                    : COLORS.quiz.main,
                  height: "100%",
                  borderRadius: "4px",
                  border: item.ValidFields?.includes("Sex") ? `2px solid ${COLORS.quiz.success_light}` : `2px solid ${COLORS.quiz.light}`,

                }}
              >
                <Typography>{item.Sex}</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                gridColumn: "3 / 4",
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
                  backgroundColor: item.ValidFields?.includes("Age_Group")
                    ? COLORS.quiz.success
                    : COLORS.quiz.main,
                  height: "100%",
                  borderRadius: "4px",
                  border: item.ValidFields?.includes("Age_Group") ? `2px solid ${COLORS.quiz.success_light}` : `2px solid ${COLORS.quiz.light}`,

                }}
              >
                <Typography>{item.Age_Group}</Typography>
                {checkValueDiff(
                  checkAgeGroup(item.Age_Group) ?? 0,
                  checkAgeGroup(targetChar?.Age_Group ?? "12-18") ?? 0
                )}
              </Box>
            </Box>
            <Box
              sx={{
                gridColumn: "4 / 5",
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
                  backgroundColor: item.ValidFields?.includes("Hair_Color")
                    ? COLORS.quiz.success
                    : COLORS.quiz.main,
                  height: "100%",
                  borderRadius: "4px",
                  border: item.ValidFields?.includes("Hair_Color") ? `2px solid ${COLORS.quiz.success_light}` : `2px solid ${COLORS.quiz.light}`,

                }}
              >
                <Typography>{item.Hair_Color}</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                gridColumn: "5 / 6",
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
                  backgroundColor: item.ValidFields?.includes("Eye_Color")
                    ? COLORS.quiz.success
                    : COLORS.quiz.main,
                  height: "100%",
                  borderRadius: "4px",
                  border: item.ValidFields?.includes("Eye_Color") ? `2px solid ${COLORS.quiz.success_light}` : `2px solid ${COLORS.quiz.light}`,

                }}
              >
                <Typography>{item.Eye_Color}</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                gridColumn: "6 / 7",
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
                  backgroundColor: item.ValidFields?.includes("Height")
                    ? COLORS.quiz.success
                    : COLORS.quiz.main,
                  height: "100%",
                  borderRadius: "4px",
                  border: item.ValidFields?.includes("Height") ? `2px solid ${COLORS.quiz.success_light}` : `2px solid ${COLORS.quiz.light}`,

                }}
              >
                <Typography>{item.Height}</Typography>
                {checkValueDiff(item.Height ?? 0, targetChar?.Height ?? 0)}
              </Box>
            </Box>
            <Box
              sx={{
                gridColumn: "7 / 8",
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
                  backgroundColor: item.ValidFields?.includes("Origin")
                    ? COLORS.quiz.success
                    : COLORS.quiz.main,
                  height: "100%",
                  borderRadius: "4px",
                  border: item.ValidFields?.includes("Origin") ? `2px solid ${COLORS.quiz.success_light}` : `2px solid ${COLORS.quiz.light}`,

                }}
              >
                <Typography>{item.Origin}</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                gridColumn: "8 / 9",
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
                  backgroundColor: item.ValidFields?.includes(
                    "First_Release_Year"
                  )
                    ? COLORS.quiz.success
                    : COLORS.quiz.main,
                  height: "100%",
                  borderRadius: "4px",
                  border: item.ValidFields?.includes("First_Release_Year") ? `2px solid ${COLORS.quiz.success_light}` : `2px solid ${COLORS.quiz.light}`,

                }}
              >
                <Typography>{item.First_Release_Year}</Typography>
                {checkValueDiff(
                  item.First_Release_Year ?? 0,
                  targetChar?.First_Release_Year ?? 0
                )}
              </Box>
            </Box>
            <Box
              sx={{
                gridColumn: "9 / 10",
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
                  backgroundColor: item.ValidFields?.includes(
                    "Genre"
                  )
                    ? COLORS.quiz.success
                    : COLORS.quiz.main,
                  height: "100%",
                  borderRadius: "4px",
                  border: item.ValidFields?.includes("Genre") ? `2px solid ${COLORS.quiz.success_light}` : `2px solid ${COLORS.quiz.light}`,

                }}
              >
                <Typography>{item.Genre}</Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      { }
    </Box>
  );
}
