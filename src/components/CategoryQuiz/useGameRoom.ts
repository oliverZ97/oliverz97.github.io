import { useEffect, useRef, useState } from 'react';
import ably from './ablyClient';
import { GameMessage, GamePhase, PlayerProfile, Submission } from './types';
import * as Ably from 'ably';

export const useGameRoom = (roomId: string, playerName: string, mode: "host" | "join") => {
    const [members, setMembers] = useState<Ably.PresenceMessage[]>([]);
    const [phase, setPhase] = useState<GamePhase>('LOBBY');
    const [category, setCategory] = useState('');
    const [endTime, setEndTime] = useState<number>(0);
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [totalScores, setTotalScores] = useState<Record<string, number>>({});

    const submissionsRef = useRef<Submission[]>([]);

    const channel = ably.channels.get(`room-${roomId}`);

    // Keep the ref in sync with the state
    useEffect(() => {
        console.log("Current Submissions State:", submissions);
        submissionsRef.current = submissions;
    }, [submissions]);

    useEffect(() => {
        // --- 1. PRESENCE LOGIC (The Lobby) ---
        const updateMembers = async () => {
            const currentMembers = await channel.presence.get();
            setMembers(currentMembers);
        };

        channel.presence.subscribe('enter', updateMembers);
        channel.presence.subscribe('leave', updateMembers);
        channel.presence.subscribe('update', updateMembers);

        channel.presence.enter({ name: playerName });
        updateMembers();

        // --- 2. MESSAGING LOGIC (The Game Events) ---
        channel.subscribe('game-event', (message) => {
            const data = message.data as GameMessage;

            if (data.type === 'START_ROUND') {
                setSubmissions([]); // CRITICAL: Clear previous round answers
                setCategory(data.category);
                setEndTime(data.endTime);
                setPhase('WRITING');
            }

            if (data.type === 'SUBMIT_ANSWER') {
                // Only the Host processes the logic for tallying
                setSubmissions(prev => {
                    const exists = prev.find(s => s.playerId === data.playerId);
                    if (exists) return prev;
                    return [...prev, { ...data, votes: 0 }];
                });
            }

            if (data.type === 'START_VOTING') {
                setSubmissions(data.submissions);
                setPhase('VOTING');
            }

            if (data.type === 'CAST_VOTE') {
                setSubmissions(prev => prev.map(s =>
                    s.playerId === data.targetPlayerId
                        ? { ...s, votes: s.votes + (data.isApproved ? 1 : 0) }
                        : s
                ));
            }

            if (data.type === 'END_ROUND') {
                // 1. Update the round submissions with the "official" ones from the Host
                setSubmissions(data.finalSubmissions);

                // 2. Update the leaderboard with the "official" totals from the Host
                setTotalScores(data.updatedTotals);

                // 3. Switch screen
                setPhase('RESULTS');
            }
        });


        return () => {
            channel.presence.leave();
            channel.presence.unsubscribe();
            channel.unsubscribe();
        };
    }, [roomId, playerName]);

    // Determine Host (First one in the list)
    const sorted = [...members].sort((a, b) => a.timestamp - b.timestamp);
    const isHost = mode === "host" && sorted[0]?.clientId === ably.auth.clientId;

    // Helper to send the start signal
    const startRound = (selectedCategory: string, seconds: number) => {
        channel.publish('game-event', {
            type: 'START_ROUND',
            category: selectedCategory,
            endTime: Date.now() + seconds * 1000
        });
    };

    const submitAnswer = (answer: string) => {
        channel.publish('game-event', {
            type: 'SUBMIT_ANSWER',
            playerId: ably.auth.clientId,
            playerName: playerName,
            answer
        });
    };

    const startVoting = (finalSubmissions: Submission[]) => {
        channel.publish('game-event', {
            type: 'START_VOTING',
            submissions: finalSubmissions
        });
    };

    const sendVote = (targetPlayerId: string, isApproved: boolean) => {
        channel.publish('game-event', {
            type: 'CAST_VOTE',
            targetPlayerId,
            isApproved
        });
    };

    const finalizeRound = () => {
        if (!isHost) return;

        // 1. Start with the current total scores
        const updatedTotals = { ...totalScores };

        // 2. Add the votes from the round that just ended
        submissions.forEach(s => {
            const currentScore = updatedTotals[s.playerId] || 0;
            updatedTotals[s.playerId] = currentScore + s.votes;
        });

        // 3. Broadcast the "Official" totals to everyone
        channel.publish('game-event', {
            type: 'END_ROUND',
            finalSubmissions: submissions,
            updatedTotals: updatedTotals // This is the property the clients look for
        });
    }

    return { members, isHost, phase, category, endTime, startRound, clientId: ably.auth.clientId, submissions, submitAnswer, startVoting, sendVote, finalizeRound, totalScores };
};