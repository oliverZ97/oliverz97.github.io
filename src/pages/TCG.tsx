import { Box, Card } from "@mui/material";
import { Character } from "common/types";
import { CardStack } from "components/TCG/CardStack";
import { TCGCard } from "components/TCG/TCGCard";
import characterData from "data/character_data.json";
import { useEffect, useState } from "react";

const TCG = () => {
  const [charData, setCharData] = useState<Character[]>([]);

  useEffect(() => {
    if (charData.length === 0) {
      setCharData([
        ...characterData.sort((a, b) => (a.Name < b.Name ? -1 : 1)),
      ] as Character[]);
    }
  }, [charData, characterData]);

  return (
    <Box sx={{ padding: 4 }}>
      {charData.length > 0 && <Box>
        <CardStack amount={5} charData={charData} />
        {/* <TCGCard character={charData[0]} />
        <TCGCard character={charData[4]} /> */}
      </Box>}
    </Box >
  );
};

export default TCG;


