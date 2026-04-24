import { Box, Link, Tooltip } from "@mui/material";
import { COLORS } from "@/styling/constants";
import { SideNavigationItemProps } from "./SideNavigationItemButton";

interface SideNavigationItemLinkProps extends SideNavigationItemProps {
  href: string;
}

export const SideNavigationItemLink = ({
  title,
  icon,
  href,
  disabled,
  variant = "default",
}: SideNavigationItemLinkProps) => {
  const variant_color =
    variant === "comingsoon" ? COLORS.quiz.light_red_hover : COLORS.quiz.secondary;
  const variant_hover =
    variant && disabled
      ? variant_color
      : disabled
      ? COLORS.quiz.disabled
      : variant === "comingsoon"
      ? COLORS.quiz.light_red
      : COLORS.quiz.main;

  return (
    <Tooltip title={title} arrow placement="right">
      <Box
        sx={{
          zIndex: 1000,
          pointerEvents: disabled ? "none" : "auto",
          opacity: disabled ? 0.5 : 1,
          boxShadow: disabled ? "none" : "0px 4px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Link href={disabled ? undefined : href} component={"a"}>
          <Box
            sx={{
              width: "68px",
              backgroundColor: variant_color,
              color: "white",
              borderColor: "transparent",
              height: "60px",
              borderTopRightRadius: 4,
              borderBottomRightRadius: 4,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: disabled ? "default" : "pointer",
              "&:hover": {
                backgroundColor: variant_hover,
                borderColor: "transparent",
              },
            }}
          >
            {icon}
          </Box>
        </Link>
      </Box>
    </Tooltip>
  );
};
