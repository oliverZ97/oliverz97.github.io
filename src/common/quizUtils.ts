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
  if ("12-18" === value) return 1;
  if ("19-30" === value) return 2;
  if ("31-50" === value) return 3;
  if ("51-70" === value) return 4;
  if ("100+" === value) return 5;
}

export function getImgSrc(name: string) {
  const filename = name.toLowerCase().replaceAll(" ", "_");
  const basepath = !import.meta.env.PROD
    ? "/src/assets/characters/"
    : "assets/characters/";

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
