export interface Character {
    Name: string;
    Sex: string;
    Origin: string;
    Hair_Color: string;
    Age: string;
    Age_Group: "12-18" | "19-30" | "31-50" | "51-70" | "100+";
    Height: number | null;
    Eye_Color: string;
    Genre: string;
    Anime: string;
    Editorial_Staff_Hint: string;
    First_Release_Year: number,
    ValidFields?: string[]
 }