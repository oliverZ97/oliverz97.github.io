import {
  Box,
  Button,
  Divider,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  useTheme,
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
import { useEffect, useRef, useState } from "react";
import Fileupload from "../Fileupload";
import { UserLogs, UserProfile } from "common/types";
import { AvatarEdit } from "./AvatarEdit";
import { useProfile } from "./ProfileContext";

export default function Profile() {
  const avatarEditRef = useRef(null);
  const [existingProfiles, setExistingProfiles] = useState(
    loadExistingProfiles()
  );
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(
    getCurrentUserProfile() ?? null
  );
  const { profileChanged } = useProfile();

  const theme = useTheme();

  useEffect(() => {
    if (avatarEditRef.current) {
      // @ts-ignore
      avatarEditRef.current.reloadAvatar();
    }
  }, [currentUser]);

  const [newUsername, setNewUsername] = useState("");

  function handleImport(data: UserLogs) {
    console.log("Imported data:", data);
    // Handle the imported user logs data
    createUserProfile(data.user);
    setUserLog(data);
    setExistingProfiles(loadExistingProfiles());
    setCurrentUser(getCurrentUserProfile());
    profileChanged(data.user.username); // Notify about profile change
  }

  return (
    <Box
      sx={{
        [theme.breakpoints.down("md")]: {
          width: "100%",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          width: "750px",
          [theme.breakpoints.down("md")]: {
            width: "100%",
            flexDirection: "column",
          },
        }}
      >
        <Box
          sx={{
            marginRight: 4,

            [theme.breakpoints.down("md")]: {
              width: "100%",
            },
          }}
        >
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
                [theme.breakpoints.down("md")]: {
                  width: "100%",
                },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "& .MuiSelect-select": { color: "white" },
                "& .MuiSvgIcon-root": { color: "white" },
                color: "white",
              }}
              value={currentUser ? currentUser.username : defaultUser.username}
              onChange={(e: SelectChangeEvent) => {
                setCurrentUserProfile(e.target.value as string);
                setCurrentUser(getCurrentUserProfile());
                profileChanged(e.target.value as string); // Notify about profile change
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
            sx={{
              marginBottom: 2,
              [theme.breakpoints.up("md")]: {
                display: "block",
              },
              [theme.breakpoints.down("md")]: {
                display: "none",
              },
            }}
            variant="outlined"
            onClick={downloadStats}
          >
            Export Data
          </Button>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"flex-start"}
          minHeight={"100%"}
          marginBottom={2}
        >
          <AvatarEdit ref={avatarEditRef} />
        </Box>
        <Button
          sx={{
            marginBottom: 2,
            [theme.breakpoints.up("md")]: {
              display: "none",
            },
            [theme.breakpoints.down("md")]: {
              display: "block",
            },
          }}
          variant="outlined"
          onClick={downloadStats}
        >
          Export Data
        </Button>
      </Box>
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
            [theme.breakpoints.down("md")]: {
              flexDirection: "column",
              alignItems: "stretch",
              width: "100%",
            },
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
              [theme.breakpoints.down("md")]: {
                width: "100%",
              },

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
              profileChanged(newUsername); // Notify about profile change
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
