import { Box, Button, Drawer, List, ListItem, ListItemButton, Divider, Tooltip } from '@mui/material';
import * as React from 'react';
import { COLORS } from 'styling/constants';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

interface CustomDrawerProps {
	children: React.ReactNode
}

export default function CustomDrawer({ children }: CustomDrawerProps) {
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
			<Tooltip title={"Anime Index"} arrow placement='right'>
				<Button variant="contained" sx={{ position: "absolute", backgroundColor: COLORS.quiz.secondary, height: "60px", marginTop: "60px", borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} onClick={toggleDrawer(true)}>
					<HelpOutlineIcon fontSize='large' />
				</Button>
			</Tooltip>
			<Drawer open={open} onClose={toggleDrawer(false)}>
				<Box
					role="presentation"
					onClick={toggleDrawer(false)}
					onKeyDown={toggleDrawer(false)}
					sx={{ backgroundColor: COLORS.quiz.secondary, padding: 2, height: "100%" }}
				>
					{children}
				</Box>
			</Drawer>
		</Box >
	);
}