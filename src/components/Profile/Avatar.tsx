import { Box } from "@mui/material";
import { getCurrentUserProfile } from "common/profileUtils";
import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { COLORS } from "styling/constants";
import { useProfile } from "./ProfileContext";

interface AvatarProps {
  size?: number;
}

export const avatarBasepath = !import.meta.env.PROD
  ? "/src/assets/profile/"
  : "assets/profile/";

const Avatar = forwardRef(({ size = 60 }: AvatarProps, ref) => {
  const [user, setUser] = useState(getCurrentUserProfile());
  const { refreshKey } = useProfile();

  // Load user profile when refreshKey changes
  useEffect(() => {
    setUser(getCurrentUserProfile());
  }, [refreshKey]);

  useImperativeHandle(ref, () => ({
    reloadAvatar() {
      // Force re-render by updating state
      setUser(getCurrentUserProfile());
    },
  }));

  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:
          user?.avatar?.backgroundColor || COLORS.profile.backgroundColors[0],
      }}
    >
      <Box
        component="img"
        src={`${
          user?.avatar?.avatarUrl
            ? avatarBasepath + user.avatar.avatarUrl
            : avatarBasepath + "chisato.png"
        }?v=${refreshKey}`}
        alt="User Avatar"
        sx={{
          width: size - size * 0.2,
          height: size - size * 0.2,
          objectFit: "contain",
          objectPosition: "center",
        }}
      />
    </Box>
  );
});

export { Avatar };
