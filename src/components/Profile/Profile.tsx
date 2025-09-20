import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  useTheme,
} from "@mui/material";
import {
  defaultUser,
  getCurrentUserProfile,
  loadExistingProfiles,
  setCurrentUserProfile,
} from "common/profileUtils";
import { useEffect, useRef, useState } from "react";
import { UserProfile } from "common/types";
import { AvatarEdit } from "./AvatarEdit";
import { useProfile } from "./ProfileContext";

export default function Profile() {
  const avatarEditRef = useRef(null);
  const [existingProfiles] = useState(
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
          width: "750px",
          flexDirection: "column",
          alignItems: "center",
          [theme.breakpoints.down("md")]: {
            width: "100%",
          },
        }}
      >
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
        <AvatarEdit ref={avatarEditRef} />
      </Box>
    </Box>
  );
}
