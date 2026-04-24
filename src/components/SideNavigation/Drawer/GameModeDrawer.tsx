import { Box, Divider, Typography } from "@mui/material";
import { NavigationTabs } from "@/components/NavigationTabs";
import { COLORS } from "@/styling/constants";

interface GameModeDrawerProps {
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
  userAvailableCredits: number;
  getTotalScore: number;
}

export const GameModeDrawer = ({
  value,
  handleChange,
  userAvailableCredits,
  getTotalScore,
}: GameModeDrawerProps) => {
  return (
    <Box
      minHeight={"100vh"}
      display={"flex"}
      flexDirection="column"
      justifyContent={"space-between"}
    >
      <Box>
        <NavigationTabs value={value} handleChange={handleChange} />
        <Divider sx={{ backgroundColor: "white", marginX: 1 }}></Divider>
      </Box>
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box padding={2} sx={{ color: "white" }}>
            <Typography>Today's score:</Typography>
            <Typography>
              <Typography
                component={"span"}
                sx={{
                  fontWeight: "bold",
                  color: COLORS.quiz.light_red,
                  marginRight: 1,
                }}
              >
                {getTotalScore}
              </Typography>
              <Typography component={"span"} fontSize={12}>
                /40000
              </Typography>
            </Typography>
          </Box>

          <Box
            sx={{
              color: "white",
              display: "flex",
              gap: 0.5,
              alignItems: "flex-end",
              justifyContent: "flex-end",
              padding: 2,
            }}
          >
            <Typography>🪙</Typography>
            <Typography>{userAvailableCredits}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
