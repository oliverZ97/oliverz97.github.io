import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Dialog, DialogTitle, DialogContent, DialogContentText, Typography, Box, DialogActions, Button } from "@mui/material";
import { COLORS } from "styling/constants";
import Calendar from './Calendar';

// Define dialog types
export type DialogType = 'howToPlay' | 'scoreCalendar';

// Define calendar data type
export interface CalendarData {
    // Define your calendar data structure here
    [date: string]: any;
}

// Create a singleton dialog manager that's independent from React's component tree
class DialogManager {
    private static instance: DialogManager;
    private listeners: ((dialogStates: Record<DialogType, boolean>, calendarData?: CalendarData) => void)[] = [];
    private showManualState: boolean;
    private showScoreCalendarState: boolean;
    private calendarDataState: CalendarData | undefined;

    private constructor() {
        this.showManualState = localStorage.getItem("showManual") !== "false" ? true : false;
        this.showScoreCalendarState = false;
        this.calendarDataState = undefined;
    }

    public static getInstance(): DialogManager {
        if (!DialogManager.instance) {
            DialogManager.instance = new DialogManager();
        }
        return DialogManager.instance;
    }

    // Get current state for manual
    get showManual(): boolean {
        return this.showManualState;
    }

    // Get current state for score calendar
    get showScoreCalendar(): boolean {
        return this.showScoreCalendarState;
    }

    // Get calendar data
    get calendarData(): CalendarData | undefined {
        return this.calendarDataState;
    }

    // Get all dialog states
    get dialogStates(): Record<DialogType, boolean> {
        return {
            howToPlay: this.showManualState,
            scoreCalendar: this.showScoreCalendarState
        };
    }

    // Set manual dialog state and notify all subscribers
    setShowManual(show: boolean): void {
        //console.log('DialogManager: setShowManual called with', show);
        this.showManualState = show;
        this.notifyListeners();
    }

    // Set score calendar dialog state and notify all subscribers
    setShowScoreCalendar(show: boolean, calendarData?: CalendarData): void {
        //console.log('DialogManager: setShowScoreCalendar called with', show);
        this.showScoreCalendarState = show;
        if (calendarData) {
            this.calendarDataState = calendarData;
        }
        this.notifyListeners();
    }

    // Open a specific dialog (and close others)
    openDialog(type: DialogType, calendarData?: CalendarData): void {
        if (type === 'howToPlay') {
            this.showManualState = true;
            this.showScoreCalendarState = false;
        } else if (type === 'scoreCalendar') {
            this.showManualState = false;
            this.showScoreCalendarState = true;
            if (calendarData) {
                this.calendarDataState = calendarData;
            }
        }
        this.notifyListeners();
    }

    // Close manual dialog and save to localStorage
    handleCloseManual(): void {
        //console.log('DialogManager: handleCloseManual called');
        localStorage.setItem("showManual", "false");
        this.showManualState = false;
        this.notifyListeners();
    }

    // Close score calendar dialog
    handleCloseScoreCalendar(): void {
        //console.log('DialogManager: handleCloseScoreCalendar called');
        this.showScoreCalendarState = false;
        this.notifyListeners();
    }

    // Add a new listener
    subscribe(listener: (dialogStates: Record<DialogType, boolean>, calendarData?: CalendarData) => void): () => void {
        this.listeners.push(listener);
        // Return unsubscribe function
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    // Notify all listeners of state change
    private notifyListeners(): void {
        // console.log('DialogManager: notifying', this.listeners.length, 'listeners with states',
        //     {
        //         howToPlay: this.showManualState,
        //         scoreCalendar: this.showScoreCalendarState,
        //         calendarData: this.calendarDataState
        //     });
        this.listeners.forEach(listener => listener(this.dialogStates, this.calendarDataState));
    }
}

// Export the singleton instance
export const dialogManager = DialogManager.getInstance();

// Component that will render the dialog using a portal
export const HowToPlayDialogPortal: React.FC = () => {
    const [dialogStates, setDialogStates] = useState(dialogManager.dialogStates);
    const [calendarData, setCalendarData] = useState<CalendarData | undefined>(dialogManager.calendarData);

    useEffect(() => {
        // Subscribe to changes
        const unsubscribe = dialogManager.subscribe((states, data) => {
            setDialogStates(states);
            if (data) setCalendarData(data);
        });

        // Cleanup subscription
        return () => unsubscribe();
    }, []);

    const handleCloseManual = () => {
        dialogManager.handleCloseManual();
    };

    const handleCloseScoreCalendar = () => {
        dialogManager.handleCloseScoreCalendar();
    };

    // Create and manage the portal container
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
        };
    }, []);

    // Prepare the manual dialog content
    const manualDialogContent = (
        <Dialog
            sx={{
                "& .MuiDialog-paper": {
                    backgroundColor: COLORS.quiz.background,
                    color: "white",
                }
            }}
            open={dialogStates.howToPlay}
            onClose={handleCloseManual}
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
                        handleCloseManual();
                    }}
                >
                    Let's Go
                </Button>
            </DialogActions>
        </Dialog>
    );

    // Score calendar dialog content
    const scoreCalendarDialogContent = (
        <Dialog
            sx={{
                "& .MuiDialog-paper": {
                    backgroundColor: COLORS.quiz.background,
                    color: "white",
                    maxWidth: "95vw",
                    width: "auto"
                }
            }}
            open={dialogStates.scoreCalendar}
            onClose={handleCloseScoreCalendar}
            keepMounted={false}
            TransitionProps={{
                appear: false,
                mountOnEnter: true,
                unmountOnExit: true
            }}
        >
            <DialogContent>
                {calendarData && (
                    <Calendar
                        title="Score Calendar"
                        data={calendarData}
                        cellStyling={{ height: "65px", width: "80px" }}
                        ignoreOpener={true}
                        onClose={handleCloseScoreCalendar}
                    />
                )}
            </DialogContent>
        </Dialog>
    );

    // Use ReactDOM.createPortal to render outside the component tree
    if (!portalElement) return null;

    // Return both dialogs at once through the portal
    return ReactDOM.createPortal(
        <>
            {manualDialogContent}
            {dialogStates.scoreCalendar && scoreCalendarDialogContent}
        </>,
        portalElement
    );
};
