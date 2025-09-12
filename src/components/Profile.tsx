import {
  Box,
  Button,
  Divider,
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
  setCurrentUserProfile,
  setUserLog,
} from "common/profileUtils";
import { useState } from "react";
import Fileupload from "./Fileupload";
import { UserLogs, UserProfile } from "common/types";

export default function Profile() {
  const [existingProfiles, setExistingProfiles] = useState(
    loadExistingProfiles()
  );
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(
    getCurrentUserProfile() ?? null
  );

  const [newUsername, setNewUsername] = useState("");

  function handleImport(data: UserLogs) {
    // Handle the imported user logs data
    createUserProfile(data.user);
    setUserLog(data);
    setExistingProfiles(loadExistingProfiles());
    setCurrentUser(getCurrentUserProfile());
  }

  return (
    <Box sx={{ minWidth: 600 }}>
      <Typography variant="h5" gutterBottom>
        Profile
      </Typography>
      <Typography sx={{ marginTop: 4, marginBottom: 1 }}>
        Active Profile
      </Typography>
      <Box
        display={"flex"}
        alignItems={"center"}
        gap={2}
        sx={{ marginBottom: 4 }}
      >
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
      <Button
        sx={{ marginBottom: 2 }}
        variant="outlined"
        onClick={downloadStats}
      >
        Export Data
      </Button>
      <Divider sx={{ borderColor: "white" }}></Divider>
      <Typography sx={{ marginTop: 4, textAlign: "center", fontSize: 20 }}>
        Create New Profile
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 1,
          marginBottom: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            marginTop: 1,
            marginBottom: 2,
          }}
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
            variant="contained"
            sx={{ height: "56px" }}
            onClick={() => {
              if (newUsername.trim() === "") return;
              createUserProfile(newUsername);
              setExistingProfiles(loadExistingProfiles());
              setCurrentUser(getCurrentUserProfile());
              setNewUsername("");
            }}
          >
            Create
          </Button>
        </Box>
        <Typography sx={{ marginBottom: 2 }}>OR</Typography>
        <Fileupload onFileLoaded={handleImport} />
      </Box>
    </Box>
  );
}
