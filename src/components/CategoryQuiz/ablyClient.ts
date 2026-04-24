import * as Ably from 'ably';

// This pulls the key from your .env file
const ably = new Ably.Realtime({
    key: import.meta.env.VITE_ABLY_KEY,
    clientId: `player-${Math.random().toString(36).substring(2, 9)}`
});

export default ably;