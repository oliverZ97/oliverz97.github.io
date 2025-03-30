import { Box, SxProps, Theme, Typography, useTheme } from "@mui/material";
import { isMoreThanADay, sameDate } from "common/quizUtils";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { COLORS } from "styling/constants";

interface StreakProps {
  streakKey: string;
  colorRotate?: string;
  sx?: SxProps<Theme>;
}

export interface Streak {
  date: string;
  streak: number;
}

export interface StreakRef {
  setStreak: () => void;
}

export const DayStreak = forwardRef(
  ({ streakKey, colorRotate = "0deg", sx }: StreakProps, ref) => {
    const [currentStreak, setCurrentStreak] = useState<
      | Streak
      | {
          streak: number;
          date: undefined;
        }
    >({
      streak: 0,
      date: undefined,
    });

    const theme = useTheme();

    useEffect(() => {
      if (streakKey) {
        const streak = getStreak();
        setCurrentStreak(streak);
      }
    }, [streakKey]);

    useImperativeHandle(ref, () => ({
      setStreak() {
        const streakObj = getStreak();
        if (streakObj) {
          const today = new Date();
          today.setHours(4);
          today.setMinutes(0);
          today.setSeconds(0);
          today.setMilliseconds(0);

          if (streakObj.date) {
            const currentDate = new Date(parseInt(streakObj.date));
            if (sameDate(currentDate, today)) {
              return;
            }
          }

          const newStreak: Streak = {
            date: today.getTime().toString(),
            streak: streakObj.streak + 1,
          };

          localStorage.setItem(streakKey, JSON.stringify(newStreak));
          setCurrentStreak(newStreak);
        }
      },
    }));

    function getStreak() {
      const streak = localStorage.getItem(streakKey);

      if (streak) {
        const streakObj: Streak = JSON.parse(streak);
        const date = new Date(parseInt(streakObj.date));
        const today = new Date();
        today.setHours(4);
        const isInvalid = isMoreThanADay(date, today);
        if (isInvalid) {
          return {
            streak: 0,
            date: undefined,
          };
        }

        return streakObj;
      } else {
        return {
          streak: 0,
          date: undefined,
        };
      }
    }

    return (
      <Box
        sx={{
          padding: 2,
          position: "absolute",
          top: 12,
          right: 0,
          [theme.breakpoints.down("md")]: {
            top: -200,
          },
          ...sx,
        }}
      >
        <Typography
          sx={{
            filter:
              currentStreak.streak < 1
                ? "grayscale(100%)"
                : `grayscale(0%) hue-rotate(${colorRotate});`,
            color: COLORS.quiz.primary_text,
          }}
          fontSize={32}
        >{`🔥 ${currentStreak.streak ?? 0}`}</Typography>
      </Box>
    );
  }
);
