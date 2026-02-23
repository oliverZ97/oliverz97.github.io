import { Box, Button, Link, Tooltip } from "@mui/material"
import { ReactNode } from "react";
import { COLORS } from "styling/constants";

export interface SideNavigationItemProps {
    title: string;
    icon: ReactNode;
    disabled?: boolean;
    variant?: "default" | "comingsoon"
}

interface SideNavigationItemButtonProps extends SideNavigationItemProps {
    onClick: () => void;
}

export const SideNavigationItemButton = ({ title, icon, onClick, disabled, variant = "default" }: SideNavigationItemButtonProps) => {
    return (
        <Tooltip title={title} arrow placement="right">
            <Box
                sx={{
                    zIndex: 1000,
                    boxShadow: disabled ? "none" : "0px 4px 10px rgba(0, 0, 0, 0.3)",

                }}
            >
                <Button
                    variant="outlined"
                    sx={{
                        backgroundColor: variant === "comingsoon" ? COLORS.quiz.light_red_hover : COLORS.quiz.secondary,
                        color: "white",
                        borderColor: "transparent",
                        height: "60px",
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        "&:hover": {
                            backgroundColor: COLORS.quiz.main,
                            borderColor: "transparent",
                        },
                    }}
                    onClick={() => {
                        onClick()
                    }}
                    disabled={disabled}
                >
                    {icon}
                </Button>
            </Box>
        </Tooltip>
    )
}