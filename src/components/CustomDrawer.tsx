import { Box, Button, Drawer, Tooltip, SxProps, Theme, useTheme } from '@mui/material';
import * as React from 'react';
import { COLORS } from 'styling/constants';

interface Position {
	top?: string | number;
	bottom?: string | number;
	left?: string | number;
	right?: string | number;
}

interface CustomDrawerProps {
	children: React.ReactNode;
	position?: Position;
	icon?: React.ReactNode;
	sx?: SxProps<Theme>;
	title?: string;
	onOpenFn?: () => void;
}

export default function CustomDrawer({ children, position, icon, sx, title, onOpenFn }: CustomDrawerProps) {
	const [open, setOpen] = React.useState(false);
	const theme = useTheme();

	const toggleDrawer =
		(inOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event.type === 'keydown' &&
				((event as React.KeyboardEvent).key === 'Tab' ||
					(event as React.KeyboardEvent).key === 'Shift')
			) {
				return;
			}

			setOpen(inOpen);
			if (onOpenFn) onOpenFn();
		};

	return (
		<Box sx={{
			display: 'flex', [theme.breakpoints.down("md")]: {
				width: "100%",
			},
		}}>
			<Tooltip title={title} arrow placement='right'>
				<Button variant="contained" sx={{
					position: "absolute", top: position?.top ?? "initial", bottom: position?.bottom ?? "initial", left: position?.left ?? "initial", right: position?.right ?? "initial", backgroundColor: COLORS.quiz.secondary, height: "60px", borderTopLeftRadius: 0, borderBottomLeftRadius: 0, "&:hover": {
						backgroundColor: COLORS.quiz.main,
					},
					[theme.breakpoints.down("md")]: {
						position: "initial",
						width: "100%",
						borderRadius: 0,
					},
				}} onClick={toggleDrawer(true)}>
					{icon}
				</Button>
			</Tooltip>
			<Drawer open={open} onClose={toggleDrawer(false)}>
				<Box
					role="presentation"
					onClick={toggleDrawer(false)}
					onKeyDown={toggleDrawer(false)}
					sx={{ backgroundColor: COLORS.quiz.secondary, ...sx }}
				>
					{children}
				</Box>
			</Drawer>
		</Box >
	);
}