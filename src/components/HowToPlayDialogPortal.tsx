import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Dialog, DialogTitle, DialogContent, DialogContentText, Typography, Box, DialogActions, Button } from "@mui/material";
import { COLORS } from "styling/constants";

// Create a singleton dialog manager that's independent from React's component tree
class DialogManager {
    private static instance: DialogManager;
    private listeners: ((show: boolean) => void)[] = [];
    private showManualState: boolean;

    private constructor() {
        this.showManualState = localStorage.getItem("showManual") !== "false" ? true : false;
    }

    public static getInstance(): DialogManager {
        if (!DialogManager.instance) {
            DialogManager.instance = new DialogManager();
        }
        return DialogManager.instance;
    }

    // Get current state
    get showManual(): boolean {
        return this.showManualState;
    }

    // Set state and notify all subscribers
    setShowManual(show: boolean): void {
        console.log('DialogManager: setShowManual called with', show);
        this.showManualState = show;
        this.notifyListeners();
    }

    // Close dialog and save to localStorage
    handleCloseManual(): void {
        console.log('DialogManager: handleCloseManual called');
        localStorage.setItem("showManual", "false");
        this.showManualState = false;
        this.notifyListeners();
    }

    // Add a new listener
    subscribe(listener: (show: boolean) => void): () => void {
        this.listeners.push(listener);
        // Return unsubscribe function
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    // Notify all listeners of state change
    private notifyListeners(): void {
        console.log('DialogManager: notifying', this.listeners.length, 'listeners with state', this.showManualState);
        this.listeners.forEach(listener => listener(this.showManualState));
    }
}

// Export the singleton instance
export const dialogManager = DialogManager.getInstance();

// Component that will render the dialog using a portal
export const HowToPlayDialogPortal: React.FC = () => {
    const [showDialog, setShowDialog] = useState(dialogManager.showManual);

    useEffect(() => {
        // Subscribe to changes
        const unsubscribe = dialogManager.subscribe((show) => {
            setShowDialog(show);
        });

        // Cleanup subscription
        return () => unsubscribe();
    }, []);

    const handleClose = () => {
        dialogManager.handleCloseManual();
    };

    // Create and manage the portal container
    // Using a more reliable approach to handle the portal element
    const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

    useEffect(() => {
        // Create the portal element if it doesn't exist
        let element = document.getElementById('dialog-root');
        if (!element) {
            element = document.createElement('div');
            element.id = 'dialog-root';
            document.body.appendChild(element);
        }

        setPortalElement(element);

        // Cleanup function
        return () => {
            // In cleanup, we don't remove the element to avoid issues with React 18 StrictMode
            // This is a safer approach that prevents potential issues with double unmounting
        };
    }, []);    // Prepare the dialog content
    const dialogContent = (
        <Dialog
            sx={{
                "& .MuiDialog-paper": {
                    backgroundColor: COLORS.quiz.background,
                    color: "white",
                }
            }}
            open={showDialog}
            onClose={handleClose}
            keepMounted={false}
            TransitionProps={{
                appear: false,
                mountOnEnter: true,
                unmountOnExit: true
            }}
        >
            <DialogTitle>How to play</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ color: "white" }}>
                    <Typography>
                        This website offers various anime-related quizzes. You can choose
                        between character quizzes, image quizzes, and anime quizzes. Each
                        quiz has a daily mode and an endless mode. You can switch the
                        gamemodes using the upper left menu icon.{" "}
                    </Typography>
                    <Typography sx={{ marginTop: 2 }}>
                        When guessing for a character or an anime, you will be given clues to help you.
                        Pay attention to the clues and use them to make your guess!
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            marginTop: 2,
                        }}
                    >
                        <Box
                            sx={{
                                borderRadius: "50px",
                                backgroundColor: COLORS.quiz.success,
                                border: "2px solid",
                                borderColor: COLORS.quiz.success_light,
                                width: "30px",
                                height: "30px",
                            }}
                        ></Box>
                        <Typography>All Clues Match</Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            marginTop: 2,
                        }}
                    >
                        <Box
                            sx={{
                                borderRadius: "50px",
                                backgroundColor: COLORS.quiz.warning,
                                border: "2px solid",
                                borderColor: COLORS.quiz.warning_light,
                                width: "30px",
                                height: "30px",
                            }}
                        ></Box>
                        <Typography>At least one of the Clues Match</Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            marginTop: 2,
                        }}
                    >
                        <Box
                            sx={{
                                borderRadius: "50px",
                                backgroundColor: COLORS.quiz.main,
                                border: "2px solid",
                                borderColor: COLORS.quiz.light,
                                width: "30px",
                                height: "30px",
                            }}
                        ></Box>
                        <Typography>None of the Clues Match</Typography>
                    </Box>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    sx={{ color: "white", borderColor: "white" }}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleClose();
                    }}
                >
                    Let's Go
                </Button>
            </DialogActions>
        </Dialog>
    );

    // Use ReactDOM.createPortal to render outside the component tree
    if (!portalElement) return null;

    // Use the stable portalElement reference for createPortal
    return ReactDOM.createPortal(dialogContent, portalElement);
};
