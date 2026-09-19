import { Box, useTheme } from "@mui/material";
import { Character, HintRef } from "@/common/types";
import { RevealCard } from "@/components/RevealCard";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

interface HintsProps {
  isCorrect: boolean;
  gaveUp: boolean;
  targetChar: Character | null;
  points: number;
  onClickHint: (param: number) => void;
}

export interface HintFunctionRef {
  resetHints: () => void;
  revealAllHints: () => void;
  handleSetRevealAnimeHint: (state: boolean) => void;
  handleSetRevealStudioHint: (state: boolean) => void;
}

export const Hints = forwardRef(
  ({ isCorrect, gaveUp, targetChar, points, onClickHint }: HintsProps, ref) => {
    const genreHintRef = useRef<HintRef | null>(null);
    const animeHintRef = useRef<HintRef | null>(null);
    const studioHintRef = useRef<HintRef | null>(null);
    const tagsHintRef = useRef<HintRef | null>(null);
    const professionHintRef = useRef<HintRef | null>(null);
    const nameRef = useRef<HintRef | null>(null);

    const [revealAnimeHint, setRevealAnimeHint] = useState(false);
    const [revealStudioHint, setRevealStudioHint] = useState(false);

    const theme = useTheme();

    useImperativeHandle(ref, () => ({
      resetHints,
      revealAllHints,
      handleSetRevealAnimeHint,
      handleSetRevealStudioHint,
    }));

    function resetHints() {
      if (genreHintRef.current) {
        genreHintRef.current.resetHint();
      }
      if (animeHintRef.current) {
        animeHintRef?.current.resetHint();
      }
      if (studioHintRef.current) {
        studioHintRef?.current.resetHint();
      }
      if (tagsHintRef.current) {
        tagsHintRef?.current.resetHint();
      }
      if (professionHintRef.current) {
        professionHintRef?.current.resetHint();
      }
      if (nameRef.current) {
        nameRef?.current.resetHint();
      }
    }

    function revealAllHints() {
      if (animeHintRef.current) {
        animeHintRef.current.revealHint();
      }
      if (tagsHintRef.current) {
        tagsHintRef.current.revealHint();
      }
      if (genreHintRef.current) {
        genreHintRef.current.revealHint();
      }
      if (studioHintRef.current) {
        studioHintRef.current.revealHint();
      }
      if (professionHintRef.current) {
        professionHintRef?.current.revealHint();
      }
      if (nameRef.current) {
        nameRef?.current.revealHint();
      }
    }

    function handleSetRevealAnimeHint(state: boolean) {
      setRevealAnimeHint(state);
    }

    function handleSetRevealStudioHint(state: boolean) {
      setRevealStudioHint(state);
    }

    function handleNameHint(name: string) {
      if (name.length === 0) {
        return "";
      }
      const firstLetter = name.slice(0, 1);
      const anonymizedName = name
        .replaceAll(/ /g, "\u00A0\u00A0\u00A0")
        .replaceAll(/[a-zA-Z0-9]/g, "_ ");
      return firstLetter + anonymizedName.slice(1, -1);
    }

    return (
      <Box
        sx={{
          width: "100%",
          paddingX: 2,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "space-between",
          [theme.breakpoints.down("md")]: {
            flexWrap: "wrap",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            paddingX: 2,
            borderRadius: 2,
            display: "flex",
            gap: 2,
            justifyContent: "space-between",
            [theme.breakpoints.down("md")]: {
              flexWrap: "wrap",
            },
          }}
        >
          <RevealCard
            costs={500}
            onReveal={isCorrect || gaveUp ? undefined : () => onClickHint(500)}
            ref={tagsHintRef}
            cardText={targetChar?.Tags ?? ""}
            cardTitle="Tags"
          ></RevealCard>
          <RevealCard
            costs={500}
            onReveal={isCorrect || gaveUp ? undefined : () => onClickHint(500)}
            ref={genreHintRef}
            cardText={[targetChar?.Subgenre1, targetChar?.Subgenre2].join(";") ?? ""}
            cardTitle="Subgenres"
          ></RevealCard>
          <RevealCard
            costs={revealStudioHint ? 0 : 500}
            onReveal={isCorrect || gaveUp ? undefined : () => onClickHint(500)}
            ref={studioHintRef}
            cardText={targetChar?.Studio ?? ""}
            cardTitle="Studio"
            revealFromOutside={revealStudioHint}
          ></RevealCard>
        </Box>
        <Box
          sx={{
            width: "100%",
            paddingX: 2,
            borderRadius: 2,
            display: "flex",
            gap: 2,
            justifyContent: "space-between",
            [theme.breakpoints.down("md")]: {
              flexWrap: "wrap",
            },
          }}
        >
          <RevealCard
            costs={750}
            onReveal={isCorrect || gaveUp ? undefined : () => onClickHint(750)}
            ref={nameRef}
            cardText={handleNameHint(targetChar?.Name ?? "")}
            cardTitle="First Letter"
          ></RevealCard>
          <RevealCard
            costs={750}
            onReveal={isCorrect || gaveUp ? undefined : () => onClickHint(750)}
            ref={professionHintRef}
            cardText={[targetChar?.Profession1, targetChar?.Profession2].join(";") ?? ""}
            cardTitle="Profession"
          ></RevealCard>
          <RevealCard
            costs={revealAnimeHint ? 0 : 1000}
            onReveal={isCorrect || gaveUp ? undefined : () => onClickHint(1000)}
            ref={animeHintRef}
            cardText={targetChar?.Anime ?? ""}
            cardTitle="Anime"
            revealFromOutside={revealAnimeHint}
          ></RevealCard>
        </Box>
      </Box>
    );
  },
);
