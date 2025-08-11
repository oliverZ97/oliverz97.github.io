import { Box, Checkbox, FormLabel, TextField, Typography } from "@mui/material";
import { Anime, Character } from "common/types";
import { debugGetRandomCharacter } from "common/utils";
import { DateTime } from "luxon";
import React from "react";

interface DebugProps {
    charData?: Character[];
    animeData?: Anime[];
}

export default function Debug({ charData, animeData }: DebugProps) {
    const [days, setDays] = React.useState(10);
    const [checked, setChecked] = React.useState(true);
    const [blurred, setBlurred] = React.useState(false);
    const [displayChars, setDisplayChars] = React.useState(false);

    const entriesToDisplay = charData && charData.length > 0 ? debugGetRandomCharacter(charData, {
        numberOfEntries: days,
        endlessMode: false,
        isPrevious: checked,
        usePreviousVersion: checked,
        quizMode: blurred ? "blurred" : "normal",
    }) : [];

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, backgroundColor: "#f0f0f0", padding: 2, borderRadius: 1, width: "600px", overflowY: "auto", maxHeight: "80vh" }}>
            <TextField label="number of days" variant="outlined" value={days} onChange={(e) => setDays(Number(e.target.value))} />
            <FormLabel >
                <span>Display Characters</span>
                <Checkbox checked={displayChars} onChange={(e) => setDisplayChars(e.target.checked)} />
            </FormLabel>
            <FormLabel >
                <span>Use Past</span>
                <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />
            </FormLabel>
            <FormLabel >
                <span>Blurred Mode</span>
                <Checkbox checked={blurred} onChange={(e) => setBlurred(e.target.checked)} />
            </FormLabel>
            {displayChars && Object.entries(entriesToDisplay).map(([key, entry], index) => (
                <Box key={index} sx={{ padding: 1, border: "1px solid #ccc", borderRadius: 1, display: "flex", gap: 1 }}>
                    <Typography variant="subtitle1">{DateTime.fromISO(key).toLocaleString(DateTime.DATE_MED)}</Typography>
                    <Typography>{entry.Name}</Typography>
                </Box>
            ))}

        </Box>
    );
}