import React, { useState } from 'react';
import ably from './ablyClient';
import { Box, Typography } from '@mui/material';
import { COLORS } from 'styling/constants';
import { generateLobbyKey } from './utils';

interface LobbyProps {
    members: any[];
    isHost: boolean;
    onStart: () => void;
}

export const GameLobby = ({ members, isHost, onStart }: LobbyProps) => {

    return (
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Typography variant='h5'>Lobby</Typography>
            <ul>
                {members.map(m => (
                    <li key={m.clientId}>
                        {m.data?.name || "Anonymous"}
                        {m.clientId === ably.auth.clientId && " (You)"}
                    </li>
                ))}
            </ul>
            {isHost && <button onClick={onStart}>Start Game</button>}
        </Box>
    );
};