import { Dialog, DialogActions, DialogContent, DialogTitle, SxProps, Theme } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { COLORS } from "styling/constants";

interface DialogWrapperProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    sx?: SxProps<Theme>
    keepMounted?: boolean;
    TransitionProps?: TransitionProps;
    dialogTitle?: React.ReactNode;
    dialogActions?: React.ReactNode;
}

export default function DialogWrapper({ open, onClose, children, sx, keepMounted, TransitionProps, dialogTitle, dialogActions }: DialogWrapperProps) {
    return (
        <Dialog
            sx={sx}
            open={open}
            onClose={onClose}
            keepMounted={keepMounted ?? false}
            TransitionProps={{
                appear: false,
                mountOnEnter: true,
                unmountOnExit: true,
                ...TransitionProps
            }}
        >
            {dialogTitle && (
                <DialogTitle>
                    {dialogTitle}
                </DialogTitle>
            )}
            <DialogContent>
                {children}
            </DialogContent>
            {dialogActions && (
                <DialogActions>
                    {dialogActions}
                </DialogActions>
            )}
        </Dialog>
    )
}