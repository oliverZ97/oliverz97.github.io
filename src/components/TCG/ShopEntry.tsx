import { Box, Button, Divider, Typography } from "@mui/material";
import { CardStack } from "./CardStack";
import { Character } from "common/types";
import { substractCreditsFromProfile } from "common/profileUtils";
import { useState } from "react";

interface ShopEntryProps {
  charData: Character[];
  cardAmount: number;
  price: number;
  packname: string;
  credits: number;
  updateCredits: () => void;
}

export const ShopEntry = ({
  charData,
  cardAmount,
  price,
  packname,
  credits,
  updateCredits,
}: ShopEntryProps) => {
  const [purchased, setPurchased] = useState(false);

  function purchasePack() {
    if (credits > price) {
      substractCreditsFromProfile(price);
      updateCredits();
      setPurchased(true);
    }
  }

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <CardStack amount={cardAmount} charData={charData} openable={purchased} />
      <Typography sx={{ color: "white", fontSize: "20px" }}>
        {packname}
      </Typography>
      <Divider sx={{ marginY: 2, backgroundColor: "white" }} flexItem />
      <Button
        onClick={purchasePack}
        variant="contained"
        disabled={credits < price}
      >
        {price + " 🪙"}
      </Button>
    </Box>
  );
};
