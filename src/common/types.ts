export interface Character {
  Name: string;
  Sex: string;
  Origin: string;
  Hair_Color: string;
  Age: string;
  Age_Group: "0-11" | "12-18" | "19-30" | "31-50" | "51-70" | "100+";
  Height: number | null;
  Eye_Color: string;
  Genre: string;
  Anime: string;
  Editorial_Staff_Hint: string;
  First_Release_Year: number;
  Difficulty: Difficulty;
  Studio: string;
  Version: number;
  Subgenre1?: string;
  Subgenre2?: string;
  Tags?: string;
  Birthday?: string;
  ValidFields?: string[];
}

export interface Anime {
  Name: string;
  First_Release_Year: number;
  Studio: string;
  Genre: string;
  Subgenre1?: string;
  Subgenre2?: string;
  Tags?: string;
  ValidFields?: string[];
  Version: number;
}

export type Difficulty = "A" | "B" | "C";
