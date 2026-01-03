import { Box } from "@mui/material";

interface StarProps {
  left?: string;
  top?: string;
  bottom?: string;
  right?: string;
  zIndex?: number;
}

export const Star = ({ left, top, bottom, right, zIndex }: StarProps) => {
  return (
    <Box
      sx={{
        position: "absolute",
        left: left,
        top: top,
        bottom: bottom,
        right: right,
        zIndex: zIndex,
        width: "30px",
        height: "30px",
        aspectRatio: 1,
        border: "2px solid rgba(232, 202, 79, 1)",
        background:
          "linear-gradient(333deg,rgba(242, 216, 111, 1) 12%, rgba(244, 223, 139, 1) 41%, rgba(247, 234, 181, 1) 57%, rgba(242, 216, 111, 1) 83%, rgba(242, 216, 111, 1) 91%)",
        clipPath:
          "polygon(50% 0, calc(50%*(1 + sin(.4turn))) calc(50%*(1 - cos(.4turn))), calc(50%*(1 - sin(.2turn))) calc(50%*(1 - cos(.2turn))), calc(50%*(1 + sin(.2turn))) calc(50%*(1 - cos(.2turn))), calc(50%*(1 - sin(.4turn))) calc(50%*(1 - cos(.4turn))))",
      }}
    ></Box>
  );
};
