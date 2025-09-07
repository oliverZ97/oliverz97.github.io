import { Box, Button, TextField, Typography } from "@mui/material";
import { createUserProfile, downloadStats, loadUserProfile } from "common/statisticUtils";
import { useState } from "react";

export default function Settings() {
    const existingProfilesStr = localStorage.getItem('existingProfiles');
    let existingProfiles: string[] = existingProfilesStr ? JSON.parse(existingProfilesStr) : [];
    const currentUser = existingProfiles.length > 0 ? loadUserProfile(existingProfiles[0]) : null;

    const [newUsername, setNewUsername] = useState("");

    return (
        <Box sx={{ minWidth: 300 }}>
            <Typography variant="h5" gutterBottom>
                Settings
            </Typography>
            <Typography>
                Profile:  {currentUser ? currentUser.username : "Guest"}
            </Typography>
            <Box marginBottom={4}>


                <Typography marginTop={4}>New Profile</Typography>
                <TextField
                    label="Username"
                    variant="outlined"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    fullWidth
                    InputLabelProps={{
                        style: { color: 'white' }
                    }}
                    sx={{
                        marginBottom: 2,
                        marginTop: 1,
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: 'white' },
                            "&:hover fieldset": { borderColor: 'white' },
                            "&.Mui-focused fieldset": { borderColor: 'white' }
                        },
                        input: { color: 'white' }
                    }}
                />
                <Button variant="outlined" onClick={() => createUserProfile(newUsername)}>Create</Button>
            </Box>
            <Button variant="outlined" onClick={downloadStats}>Export Data</Button>
        </Box>
    );
}