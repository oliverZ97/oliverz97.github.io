import { TCG_CARD_BASE } from "./constants";

interface StarProps {
  zIndex?: number;
  art?: "default" | "full";
  size?: number; // Scale factor (1 for large, 2/3 for small)
}

export const Star = ({ zIndex, art = "default", size = 1 }: StarProps) => {
  const starSize = TCG_CARD_BASE.STAR_SIZE * size;
  const strokeWidth = TCG_CARD_BASE.STAR_STROKE_WIDTH * size;

  return (
    <svg
      width={starSize}
      height={starSize}
      viewBox="0 0 25 25"
      style={{ zIndex }}
    >
      {art === "default" && <defs>
        <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="12%" stopColor="rgba(242, 216, 111, 1)" />
          <stop offset="41%" stopColor="rgba(244, 223, 139, 1)" />
          <stop offset="57%" stopColor="rgba(247, 234, 181, 1)" />
          <stop offset="83%" stopColor="rgba(242, 216, 111, 1)" />
          <stop offset="91%" stopColor="rgba(242, 216, 111, 1)" />
        </linearGradient>

      </defs>}
      {art === "full" && <defs>
        <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="12%" stopColor="rgba(218, 218, 218, 1)" />
          <stop offset="41%" stopColor="rgba(232, 230, 223, 1)" />
          <stop offset="57%" stopColor="rgba(248, 248, 249, 1)" />
          <stop offset="83%" stopColor="rgba(218, 218, 218, 1)" />
          <stop offset="91%" stopColor="rgba(218, 218, 218, 1)" />
        </linearGradient>
      </defs>}
      <polygon
        points="12.5,2 15.5,9.5 23.5,9.5 17,14.5 19.5,22.5 12.5,17 5.5,22.5 8,14.5 1.5,9.5 9.5,9.5"
        fill="url(#starGradient)"
        stroke="black"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};
