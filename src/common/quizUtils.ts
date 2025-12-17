import JSConfetti from "js-confetti";
import {
  saveFieldToTotalStatistics,
  saveHasBeenSolvedToday,
  saveHighscoreToProfile,
} from "./profileUtils";
import { Anime, Character, SolvedKeys, StatisticFields } from "./types";
import { getDailyUTCDate, QUIZ_KEY, setDailyScore } from "./utils";

export function isMoreThanADay(date1: Date, date2: Date) {
  // Calculate the time difference in milliseconds
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());

  // Calculate the number of milliseconds in a day
  const millisecondsPerDay = 48 * 60 * 60 * 1000;

  // Calculate the difference in days
  const daysDiff = timeDiff / millisecondsPerDay;

  // Check if the difference is more than one day
  return daysDiff > 1;
}

export function sameDate(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function checkAgeGroup(value: string) {
  if ("0-11" === value) return 1;
  if ("12-18" === value) return 2;
  if ("19-30" === value) return 3;
  if ("31-50" === value) return 4;
  if ("51-70" === value) return 5;
  if ("100+" === value) return 6;
}

export function getImgSrc(id: number) {
  const filename = id.toString();
  const basepath = !import.meta.env.PROD
    ? "/src/assets/characters/"
    : "assets/characters/";

  return basepath + filename + ".webp";
}

export function getAnimeImgSrc(id: number) {
  const filename = id.toString();
  const basepath = !import.meta.env.PROD
    ? "/src/assets/posters/"
    : "assets/posters/";

  return basepath + filename + ".webp";
}

export function compareObjects<T extends Record<string, any>>(
  obj1: T,
  obj2: T
): {
  all: string[];
  short: string[];
} {
  const sameFieldsObj: {
    all: string[];
    short: string[];
  } = { all: [], short: [] };
  const validFields = [
    "Name",
    "Sex",
    "Origin",
    "Hair_Color",
    "Age_Group",
    "Height",
    "Eye_Color",
    "First_Release_Year",
    "Genre",
  ];

  for (const key in obj1) {
    if (
      obj1.hasOwnProperty(key) &&
      obj2.hasOwnProperty(key) &&
      obj1[key] === obj2[key]
    ) {
      if (typeof obj1[key] === "string" && obj1[key].endsWith(" ")) {
        obj1[key] = obj1[key].slice(0, -1);
      }
      if (typeof obj2[key] === "string" && obj2[key].endsWith(" ")) {
        obj2[key] = obj2[key].slice(0, -1);
      }
      if (validFields.includes(key)) {
        sameFieldsObj.short.push(key);
      }
      sameFieldsObj.all.push(key);
    }
  }
  return sameFieldsObj;
}

export function solveQuizHelper(
  reason: any,
  setGaveUp: (value: boolean) => void,
  setIsCorrect: (value: boolean) => void,
  endlessMode: boolean,
  solvedKey: SolvedKeys,
  quizKey: QUIZ_KEY,
  points: number,
  target: Character | Anime | null,
  correctFields: {
    all: string[];
    short: string[];
  }
) {
  if (target) {
    if (correctFields.all.length + 1 === Object.keys(target).length) {
      if (reason !== "giveUp") {
        const jsConfetti = new JSConfetti();
        jsConfetti.addConfetti({
          emojis: ["🎉", "🍛", "🍣", "✨", "🍜", "🌸", "🍙"],
          emojiSize: 30,
        });
        saveFieldToTotalStatistics([StatisticFields.totalWins], 1);
      } else {
        setGaveUp(true);
        saveFieldToTotalStatistics([StatisticFields.totalLosses], 1);
      }

      setIsCorrect(true);
      if (!endlessMode) {
        const utcDate = getDailyUTCDate();
        const solveData = {
          date: utcDate.toISOString(),
          gaveUp: reason === "giveUp",
        };
        saveHasBeenSolvedToday(solvedKey, solveData);
        setDailyScore(utcDate.toISOString(), points, quizKey);
        const key =
          quizKey === QUIZ_KEY.CHAR
            ? StatisticFields.totalCharactersGuessed
            : quizKey === QUIZ_KEY.ANIME
            ? StatisticFields.totalAnimesGuessed
            : StatisticFields.totalBlurredCharactersGuessed;
        saveFieldToTotalStatistics(
          [StatisticFields.totalGamesPlayed, StatisticFields[key]],
          1
        );
        saveFieldToTotalStatistics([StatisticFields.totalScore], points);
        if (points === 10000) {
          const key =
            quizKey === QUIZ_KEY.CHAR
              ? StatisticFields.charQuizMaxPoints
              : quizKey === QUIZ_KEY.ANIME
              ? StatisticFields.animeQuizMaxPoints
              : StatisticFields.blurQuizMaxPoints;
          saveFieldToTotalStatistics([StatisticFields[key]], 1);
        }
      }
      if (points > 0 && !endlessMode) {
        //Set Highscore
        const scoreObj = {
          points: points,
          date: new Date().toLocaleString("de-DE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }),
        };

        saveHighscoreToProfile(quizKey, scoreObj);
      }
    }
  }
}
