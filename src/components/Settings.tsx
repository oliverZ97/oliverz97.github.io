import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import {
  createUserProfile,
  defaultUser,
  downloadStats,
  getCurrentUserProfile,
  loadExistingProfiles,
  loadUserProfile,
  setCurrentUserProfile,
  UserProfile,
} from "common/profileUtils";
import { useState } from "react";

export default function Settings() {
  const [existingProfiles, setExistingProfiles] = useState(
    loadExistingProfiles()
  );
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(
    getCurrentUserProfile() ?? null
  );

  const [newUsername, setNewUsername] = useState("");

  return (
    <Box sx={{ minWidth: 600 }}>
      <Typography variant="h5" gutterBottom>
        Settings
      </Typography>
      <Box
        display={"flex"}
        alignItems={"center"}
        gap={2}
        sx={{ marginTop: 4, marginBottom: 4 }}
      >
        <Typography>Profile:</Typography>
        <Select
          sx={{
            width: 300,
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "& .MuiSelect-select": { color: "white" },
            "& .MuiSvgIcon-root": { color: "white" }, // For the dropdown arrow
            color: "white", // For the text/placeholder
          }}
          value={currentUser ? currentUser.username : defaultUser.username}
          onChange={(e: SelectChangeEvent) => {
            setCurrentUserProfile(e.target.value as string);
            setCurrentUser(getCurrentUserProfile());
          }}
        >
          {existingProfiles.map((profile: string) => (
            <MenuItem key={profile} value={profile}>
              {profile}
            </MenuItem>
          ))}
          <MenuItem key={"Guest"} value={"Guest"}>
            Guest
          </MenuItem>
        </Select>
      </Box>
      <Box marginBottom={4}>
        <Typography sx={{ marginTop: 4 }}>New Profile</Typography>
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          sx={{ marginTop: 1, marginBottom: 2 }}
        >
          <TextField
            label="Username"
            variant="outlined"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            fullWidth
            InputLabelProps={{
              style: { color: "white" },
            }}
            sx={{
              width: 300,

              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "white" },
                "&.Mui-focused fieldset": { borderColor: "white" },
              },
              input: { color: "white" },
            }}
          />
          <Button
            variant="outlined"
            onClick={() => {
              createUserProfile(newUsername);
              setExistingProfiles(loadExistingProfiles());
              setCurrentUser(getCurrentUserProfile());
              setNewUsername("");
            }}
          >
            Create
          </Button>
        </Box>
      </Box>
      <Button variant="outlined" onClick={downloadStats}>
        Export Data
      </Button>
    </Box>
  );
}
