import { Box, Button } from "@mui/material"
import { useState } from "react"
import { IconButtonStyle } from "./ButtonContainer.style"
import { SelectionState } from "./KissMarryKill"

export type State = "none" | "kiss" | "marry" | "kill"

interface ButtonContainerProps {
    selectionStates: SelectionState,
    updateSelectionStates: (state: State) => void
}

export const ButtonContainer = ({selectionStates, updateSelectionStates}: ButtonContainerProps) => {
    const [currentState, setCurrentState] = useState<State>("none")

    function handleStateChange(state: State) {
        if (currentState !== state) {
            setCurrentState(state);
        } else {
            setCurrentState("none")
        }
        updateSelectionStates(state)
    }

    return (
        <Box display={"flex"} gap={2}>
            <Button disabled={(selectionStates.kiss && currentState !== "kiss") || (currentState !== "none" && currentState !== "kiss")} sx={IconButtonStyle(currentState === "kiss")}
                onClick={() => handleStateChange("kiss")}
            >
                💋
            </Button>
            <Button disabled={(selectionStates.marry && currentState !== "marry") || (currentState !== "none" && currentState !== "marry")} sx={IconButtonStyle(currentState === "marry")}
                onClick={() => handleStateChange("marry")}
            >
                💍
            </Button>
            <Button disabled={(selectionStates.kill && currentState !== "kill") || (currentState !== "none" && currentState !== "kill")} sx={IconButtonStyle(currentState === "kill")}
                onClick={() => handleStateChange("kill")}
            >
                💀
            </Button>
        </Box>
    )
}