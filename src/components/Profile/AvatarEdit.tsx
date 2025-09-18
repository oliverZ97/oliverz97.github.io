import { Box, Fade, IconButton } from "@mui/material";
import { Avatar, avatarBasepath } from "./Avatar";
import EditIcon from "@mui/icons-material/Edit";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { COLORS } from "styling/constants";
import { getCurrentUserProfile, setUserProfile } from "common/profileUtils";
import SaveIcon from "@mui/icons-material/Save";
import { useProfile } from "./ProfileContext";

const size = 60;

export const AvatarEdit = forwardRef((props, ref) => {
  const [showEdit, setShowEdit] = useState(false);
  const avatarRef = useRef(null);
  const { refreshAvatar } = useProfile();
  const isValidProfile =
    localStorage.getItem("currentUserProfile") !== null &&
    localStorage.getItem("currentUserProfile") !== "Guest";

  useImperativeHandle(ref, () => ({
    reloadAvatar() {
      // Force re-render by updating state
      if (avatarRef.current) {
        // @ts-ignore
        avatarRef.current.reloadAvatar();
      }
    },
  }));

  function getProfilePictures() {
    // Implement logic to get available profile pictures
    return ["lemon.png", "chisato.png", "sinon.png", "power.png"];
  }

  function handleColorSelect(color: string) {
    // Implement color selection logic here

    const profile = getCurrentUserProfile();
    if (profile) {
      setUserProfile({
        ...profile,
        avatar: {
          ...(profile.avatar || {
            avatarUrl: "chisato.png",
            backgroundColor: COLORS.profile.backgroundColors[0],
          }),
          backgroundColor: color,
        },
      });
      if (avatarRef.current) {
        // @ts-ignore
        avatarRef.current.reloadAvatar();
      }
    }
  }

  function handlePictureSelect(picture: string) {
    const profile = getCurrentUserProfile();
    if (profile) {
      setUserProfile({
        ...profile,
        avatar: {
          ...(profile.avatar || {
            avatarUrl: "chisato.png",
            backgroundColor: COLORS.profile.backgroundColors[0],
          }),
          avatarUrl: picture,
        },
      });
      if (avatarRef.current) {
        // @ts-ignore
        avatarRef.current.reloadAvatar();
      }
    }
  }

  function handleSave() {
    setShowEdit(false);

    // Small delay to ensure profile is saved before refreshing
    setTimeout(() => {
      refreshAvatar(); // This will trigger all Avatar components to rerender
    }, 50);
  }

  return (
    <Box
      height={"100%"}
      display={"flex"}
      maxWidth={400}
      flexDirection={"row"}
      alignItems={"flex-start"}
    >
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 1, marginRight: 2 }}
      >
        <Avatar ref={avatarRef} size={120} />
        {!showEdit && isValidProfile && (
          <IconButton onClick={() => setShowEdit(true)}>
            <EditIcon sx={{ color: "white" }} />
          </IconButton>
        )}
        {showEdit && (
          <IconButton onClick={() => handleSave()}>
            <SaveIcon sx={{ color: "white" }} />
          </IconButton>
        )}
      </Box>
      <Box>
        {showEdit && (
          <Fade in={showEdit} timeout={500} unmountOnExit>
            <Box>
              <Box
                sx={{
                  marginTop: 2,
                  display: "flex",
                  gap: 1,
                  flexWrap: "wrap",
                  overflowX: "scroll",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    flexWrap: "wrap",
                    maxHeight: 100, // Limit height to enable vertical scrolling
                    overflowY: "auto", // Enable vertical scrolling
                    width: "100%", // Use available width
                    padding: 1,
                    "&::-webkit-scrollbar": {
                      width: "8px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "rgba(255,255,255,0.3)",
                      borderRadius: "4px",
                    },
                  }}
                >
                  {COLORS.profile.backgroundColors.map((color) => (
                    <Box
                      onClick={() => handleColorSelect(color)}
                      key={color.split("#")[1]}
                      sx={{
                        backgroundColor: color,
                        height: 33,
                        borderRadius: "50%",
                        marginBottom: 1,
                        width: 33,
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </Box>
              </Box>
              <Box
                sx={{ marginTop: 2, display: "flex", gap: 1, flexWrap: "wrap" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    flexWrap: "wrap",
                    maxHeight: 150,
                    overflowY: "auto",
                    width: "100%",
                    padding: 1,
                    "&::-webkit-scrollbar": {
                      width: "8px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "rgba(255,255,255,0.3)",
                      borderRadius: "4px",
                    },
                  }}
                >
                  {getProfilePictures().map((picture) => (
                    <Box
                      sx={{
                        width: size,
                        height: size,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "2px solid white",
                        cursor: "pointer",
                      }}
                      onClick={() => handlePictureSelect(picture)}
                      key={picture}
                    >
                      <Box
                        component="img"
                        src={avatarBasepath + picture}
                        alt="User Avatar"
                        sx={{
                          width: size - 10,
                          height: size - 10,
                          objectFit: "contain",
                          objectPosition: "center",
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Fade>
        )}
      </Box>
    </Box>
  );
});
