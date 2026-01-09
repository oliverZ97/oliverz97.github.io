import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Typography,
} from "@mui/material";
import { CardStack } from "./CardStack";
import { Character, Pack } from "common/types";
import { substractCreditsFromProfile } from "common/profileUtils";
import { useState } from "react";

interface ShopEntryProps {
  charData: Character[];
  cardAmount: number;
  price: number;
  pack: Pack;
  credits: number;
  updateCredits: () => void;
}

export const ShopEntry = ({
  charData,
  cardAmount,
  price,
  pack,
  credits,
  updateCredits,
}: ShopEntryProps) => {
  const [purchased, setPurchased] = useState(false);
  const [showOpenPackOverlay, setShowOpenPackOverlay] = useState(false);

  function purchasePack() {
    if (credits >= price) {
      substractCreditsFromProfile(price);
      updateCredits();
      setPurchased(true);
    }
  }

  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box
          onClick={
            purchased
              ? () => {
                  setShowOpenPackOverlay(true);
                  setPurchased(false);
                }
              : undefined
          }
        >
          <CardStack
            amount={cardAmount}
            charData={charData}
            openable={false}
            pack={pack}
            purchased={purchased}
          />
        </Box>
        <Typography sx={{ color: "white", fontSize: "20px" }}>
          {pack.packname}
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
      <Dialog
        open={showOpenPackOverlay}
        sx={{
          width: "100%",
          height: "100%",
          "& .MuiDialog-paper": {
            backgroundColor: "transparent",
            boxShadow: 0,
          },
        }}
      >
        <DialogContent sx={{ overflow: "hidden" }}>
          <CardStack
            amount={cardAmount}
            charData={charData}
            openable={true}
            pack={pack}
            onPackEmpty={() => {
              setShowOpenPackOverlay(false);
              setPurchased(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
