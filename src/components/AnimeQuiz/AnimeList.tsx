import { Box, Typography, useTheme } from "@mui/material";
import { Anime } from "common/types";
import { COLORS } from "styling/constants";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface AnimeListProps {
  searchHistory: Anime[];
  targetAnime: Anime | null;
}

export default function AnimeList({
  searchHistory,
  targetAnime,
}: AnimeListProps) {
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

  function getCardBorderColor(key: string, item: Anime) {
    return item.ValidFields?.includes(key) ? `2px solid ${COLORS.quiz.success_light}` : `2px solid ${COLORS.quiz.light}`
  }

  function getCardBackgroundColor(key: string, item: Anime) {
    return item.ValidFields?.includes(key) ? COLORS.quiz.success : COLORS.quiz.main;
  }


  function findPartialMatch(item: Anime, targetAnime: Anime | null, field: "Genre" | "Subgenre1" | "Subgenre2" | "Tags" = "Genre") {
    if (!targetAnime) return false;

    // If there's no value for either item, return false
    if (!item[field] || !targetAnime[field]) return false;

    // If both values are identical, return false (exact match handled by ValidFields)
    if (JSON.stringify(item[field]) === JSON.stringify(targetAnime[field])) return false;

    // Special case for "Slice of Life" for Genre field
    if (field === "Genre" && item.Genre === "Slice of Life" && targetAnime.Genre === "Slice of Life") {
      return true;
    }

    // Determine the delimiter based on field
    const delimiter = field === "Genre" ? " " : ";";
    // Split and clean values
    const targetAnimeField = targetAnime[field] || "";
    if (!targetAnimeField) return false;
    const targetValues = targetAnimeField.split(delimiter).map(val => val.trim()).filter(Boolean);
    const itemAnimeField = item[field] || "";
    if (!itemAnimeField) return false;
    const itemValues = itemAnimeField.split(delimiter).map(val => val.trim()).filter(Boolean);

    // For subgenre fields, check the other subgenre field only if no match in primary field
    if ((field === "Subgenre1" || field === "Subgenre2") &&
      !itemValues.some(itemValue => targetValues.includes(itemValue))) {
      const otherField = field === "Subgenre1" ? "Subgenre2" : "Subgenre1";

      if (targetAnime[otherField] && item[otherField]) {
        const otherTargetField = targetAnime[otherField] || "";
        const otherTargetValues = otherTargetField.split(";").map(val => val.trim()).filter(Boolean);

        return itemValues.some(otherItemValue => otherTargetValues.includes(otherItemValue));
      }
    }

    // Check for partial matches
    const res = itemValues.some(itemValue => {
      // Handle Romance/Romantic matching for Genre
      if (field === "Genre") {
        if (itemValue === "Romance" && targetValues.some(g => g === "Romantic" || g === "Romance")) {
          return true;
        }
        if (itemValue === "Romantic" && targetValues.some(g => g === "Romance" || g === "Romantic")) {
          return true;
        }
      }

      // Default case - exact match
      return targetValues.includes(itemValue);
    });

    return res;
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
          background: COLORS.gradient,
          [theme.breakpoints.down("md")]: {
            overflowX: "scroll",
          },
        }}
      >
        {searchHistory.length > 0 && <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
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
            Name
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
            Release Year
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
            Studio
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
            Genre
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
            Subgenre
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
            Subgenre 2
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
            Tags
          </Box>
        </Box>}
        {/* Data Rows */}
        {searchHistory.map((item) => (
          <Box
            key={item.Name}
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
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
              <Box
                sx={{
                  width: "100%",
                  flexGrow: 1,
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  backgroundColor: getCardBackgroundColor("Name", item),
                  height: "100%",
                  borderRadius: "4px",
                  border: getCardBorderColor("Name", item),

                }}
              >
                <Typography>{item.Name}</Typography>
              </Box>
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
                  backgroundColor: getCardBackgroundColor("First_Release_Year", item),
                  height: "100%",
                  borderRadius: "4px",
                  border: getCardBorderColor("First_Release_Year", item),

                }}
              >
                <Typography>{item.First_Release_Year}</Typography>
                {checkValueDiff(
                  item.First_Release_Year ?? 0,
                  targetAnime?.First_Release_Year ?? 0
                )}
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
                  backgroundColor: getCardBackgroundColor("Studio", item),
                  height: "100%",
                  borderRadius: "4px",
                  border: getCardBorderColor("Studio", item),

                }}
              >
                <Typography>{item.Studio}</Typography>
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
                  backgroundColor: findPartialMatch(item, targetAnime) ? COLORS.quiz.warning : getCardBackgroundColor("Genre", item),
                  height: "100%",
                  borderRadius: "4px",
                  border: findPartialMatch(item, targetAnime) ? `2px solid ${COLORS.quiz.warning_light}` : getCardBorderColor("Genre", item),

                }}
              >
                <Typography>{item.Genre}</Typography>
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
                  backgroundColor: findPartialMatch(item, targetAnime, "Subgenre1") ? COLORS.quiz.warning : getCardBackgroundColor("Subgenre1", item),
                  height: "100%",
                  borderRadius: "4px",
                  border: findPartialMatch(item, targetAnime, "Subgenre1") ? `2px solid ${COLORS.quiz.warning_light}` : getCardBorderColor("Subgenre1", item),

                }}
              >
                <Typography>{item.Subgenre1}</Typography>
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
                  backgroundColor: findPartialMatch(item, targetAnime, "Subgenre2") ? COLORS.quiz.warning : getCardBackgroundColor("Subgenre2", item),
                  height: "100%",
                  borderRadius: "4px",
                  border: findPartialMatch(item, targetAnime, "Subgenre2") ? `2px solid ${COLORS.quiz.warning_light}` : getCardBorderColor("Subgenre2", item),

                }}
              >
                <Typography>{item.Subgenre2}</Typography>
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
                  backgroundColor: findPartialMatch(item, targetAnime, "Tags") ? COLORS.quiz.warning : getCardBackgroundColor("Tags", item),
                  height: "100%",
                  borderRadius: "4px",
                  border: findPartialMatch(item, targetAnime, "Tags") ? `2px solid ${COLORS.quiz.warning_light}` : getCardBorderColor("Tags", item),

                }}
              >
                <Typography>{item.Tags}</Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      { }
    </Box>
  );
}
