import { Box, Button, Drawer, List, ListItem, ListItemButton, Divider, Tooltip, SvgIconTypeMap, SxProps, Theme } from '@mui/material';
import * as React from 'react';
import { COLORS } from 'styling/constants';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { OverridableComponent } from '@mui/material/OverridableComponent';

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
}

export default function CustomDrawer({ children, position, icon, sx, title }: CustomDrawerProps) {
	const [open, setOpen] = React.useState(false);

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
		};

	return (
		<Box sx={{ display: 'flex' }}>
			<Tooltip title={title} arrow placement='right'>
				<Button variant="contained" sx={{
					position: "absolute", top: position?.top ?? "initial", bottom: position?.bottom ?? "initial", left: position?.left ?? "initial", right: position?.right ?? "initial", backgroundColor: COLORS.quiz.secondary, height: "60px", borderTopLeftRadius: 0, borderBottomLeftRadius: 0, "&:hover": {
						backgroundColor: COLORS.quiz.main,
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