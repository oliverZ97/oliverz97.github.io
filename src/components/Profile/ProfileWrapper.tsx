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
import { AuthForm } from "components/Auth/AuthForm";
import { useAuth } from "components/Auth/AuthContext";
import Profile from "./Profile";

export default function ProfileWrapper() {
    const [currentUser, setCurrentUser] = useState<UserProfile | null>(
        getCurrentUserProfile() ?? null
    );
    const [authMode, setAuthMode] = useState(true)
    const { profileChanged } = useProfile();
    const { isAuthenticated } = useAuth();

    const theme = useTheme();

    return (
        <Box
            sx={{
                paddingY: 8,
                [theme.breakpoints.down("md")]: {
                    width: "100%",
                },
            }}
        >
            <Box
                sx={{
                    display: "flex",
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
                        width: "100%",

                        [theme.breakpoints.down("md")]: {
                            width: "100%",
                        },
                    }}
                >

                    {authMode && !isAuthenticated && <Box>
                        <AuthForm />
                    </Box>}
                    {!authMode && <>
                        <Profile />
                    </>}
                </Box>
            </Box>
        </Box >
    );
}
