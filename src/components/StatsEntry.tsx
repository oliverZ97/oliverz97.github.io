import { Box, Typography } from "@mui/material";

interface StatsEntryProps {
    title: string;
    value?: string | number;
}

export default function StatsEntry({ title, value }: StatsEntryProps) {
    return (
        <Box sx={{ display: "flex", alignItems: "center", padding: 1, gap: 2 }}>
            <Typography>{title + ":"}</Typography>
            <Typography>{value !== undefined ? value : "-"}</Typography>
        </Box>
    );
}