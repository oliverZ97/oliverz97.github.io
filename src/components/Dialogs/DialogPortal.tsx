import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Button } from "@mui/material";
import { COLORS } from "styling/constants";
import Calendar from "../Calendar";
import Settings from "../Profile/Profile";
import DialogWrapper from "./DialogWrapper";
import HowToPlay from "components/HowToPlay";
import Statistics from "components/Statistics";
import { theme } from "styling/theme";

// Define dialog types
export type DialogType =
  | "howToPlay"
  | "scoreCalendar"
  | "settings"
  | "statistics"
  | "auth"; // Add this new type

// Define calendar data type
export interface CalendarData {
  // Define your calendar data structure here
  [date: string]: any;
}

// Create a singleton dialog manager that's independent from React's component tree
class DialogManager {
  private static instance: DialogManager;
  private listeners: ((
    dialogStates: Record<DialogType, boolean>,
    calendarData?: CalendarData
  ) => void)[] = [];
  private dialogStates: Record<DialogType, boolean>;
  private calendarDataState: CalendarData | undefined;

  private constructor() {
    this.dialogStates = {
      howToPlay: localStorage.getItem("showManual") !== "false",
      scoreCalendar: false,
      settings: false,
      statistics: false,
      auth: false, // Initialize auth dialog state
    };
    this.calendarDataState = undefined;
  }

  public static getInstance(): DialogManager {
    if (!DialogManager.instance) {
      DialogManager.instance = new DialogManager();
    }
    return DialogManager.instance;
  }

  // Get all dialog states
  get allDialogStates(): Record<DialogType, boolean> {
    return { ...this.dialogStates };
  }

  // Get calendar data
  get calendarData(): CalendarData | undefined {
    return this.calendarDataState;
  }

  // Set dialog state and notify all subscribers
  setDialogState(
    type: DialogType,
    isOpen: boolean,
    calendarData?: CalendarData
  ): void {
    this.dialogStates[type] = isOpen;

    if (type === "scoreCalendar" && calendarData) {
      this.calendarDataState = calendarData;
    }

    this.notifyListeners();
  }

  // Open a specific dialog (and close others)
  openDialog(type: DialogType, calendarData?: CalendarData): void {
    // Close all dialogs
    Object.keys(this.dialogStates).forEach((key) => {
      this.dialogStates[key as DialogType] = false;
    });

    // Open the requested dialog
    this.dialogStates[type] = true;

    if (type === "scoreCalendar" && calendarData) {
      this.calendarDataState = calendarData;
    } else if (type === "auth") {
      this.dialogStates.auth = true; // Handle auth dialog
    }

    this.notifyListeners();
  }

  // Close dialog and handle any special logic
  closeDialog(type: DialogType): void {
    this.dialogStates[type] = false;

    // Special handling for howToPlay/manual
    if (type === "howToPlay") {
      localStorage.setItem("showManual", "false");
    } else if (type === "auth") {
      this.dialogStates.auth = false; // Handle auth dialog
    }

    this.notifyListeners();
  }

  // Add a new listener
  subscribe(
    listener: (
      dialogStates: Record<DialogType, boolean>,
      calendarData?: CalendarData
    ) => void
  ): () => void {
    this.listeners.push(listener);
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  // Notify all listeners of state change
  private notifyListeners(): void {
    this.listeners.forEach((listener) =>
      listener(this.allDialogStates, this.calendarDataState)
    );
  }
}

// Export the singleton instance
export const dialogManager = DialogManager.getInstance();

// Component that will render the dialog using a portal
export const HowToPlayDialogPortal: React.FC = () => {
  const [dialogStates, setDialogStates] = useState(
    dialogManager.allDialogStates
  );
  const [calendarData, setCalendarData] = useState<CalendarData | undefined>(
    dialogManager.calendarData
  );

  useEffect(() => {
    // Subscribe to changes
    const unsubscribe = dialogManager.subscribe((states, data) => {
      setDialogStates(states);
      if (data) setCalendarData(data);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Create and manage the portal container
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Create the portal element if it doesn't exist
    let element = document.getElementById("dialog-root");
    if (!element) {
      element = document.createElement("div");
      element.id = "dialog-root";
      document.body.appendChild(element);
    }

    setPortalElement(element);

    // Cleanup function
    return () => {
      // In cleanup, we don't remove the element to avoid issues with React 18 StrictMode
    };
  }, []);

  // Handle closing dialogs
  const handleClose = (type: DialogType) => () => {
    dialogManager.closeDialog(type);
  };

  // Common dialog styling
  const commonDialogStyle = {
    "& .MuiDialog-paper": {
      backgroundColor: COLORS.quiz.background,
      color: "white",
      maxWidth: "95vw",
      width: "auto",
      [theme.breakpoints.down("md")]: {
        width: "95vw",
      },
    },
  };

  // Define dialog configurations
  // Define the dialog configuration interface
  interface DialogConfig {
    content: React.ReactNode;
    title?: string;
    actions?: React.ReactNode;
    style: object;
  }

  // Dialog configurations
  const dialogConfigs: Record<DialogType, DialogConfig> = {
    howToPlay: {
      content: <HowToPlay />,
      title: "How to play",
      actions: (
        <Button
          variant="outlined"
          sx={{ color: "white", borderColor: "white" }}
          onClick={(e) => {
            e.stopPropagation();
            handleClose("howToPlay")();
          }}
        >
          Let's Go
        </Button>
      ),
      style: {
        ...commonDialogStyle,
        "& .MuiDialog-paper": {
          backgroundColor: COLORS.quiz.background,
          color: "white",
          maxWidth: "600px",
          width: "auto",
        },
      },
    },
    scoreCalendar: {
      content: calendarData && (
        <Calendar
          title="Score Calendar"
          data={calendarData}
          cellStyling={{ height: "65px", width: "80px" }}
        />
      ),
      style: commonDialogStyle,
    },
    settings: {
      content: <Settings />,
      style: commonDialogStyle,
    },
    statistics: {
      content: <Statistics />,
      style: commonDialogStyle,
    },
  };

  // If portal element isn't ready, don't render anything
  if (!portalElement) return null;

  // Render all dialogs through the portal
  return ReactDOM.createPortal(
    <>
      {Object.entries(dialogConfigs).map(([type, config]) => (
        <DialogWrapper
          key={type}
          sx={config.style}
          open={dialogStates[type as DialogType]}
          onClose={handleClose(type as DialogType)}
          dialogTitle={config.title}
          dialogActions={config.actions}
        >
          {config.content}
        </DialogWrapper>
      ))}
    </>,
    portalElement
  );
};
