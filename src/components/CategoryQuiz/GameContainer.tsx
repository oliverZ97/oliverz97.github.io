import React, { useEffect } from 'react';
import categories from '../../data/categories.json';
import { useGameRoom } from './useGameRoom';
import { GameLobby } from './GameLobby';
import { PlayScreen } from './PlayScreen';
import { VotingScreen } from './VotingScreen';

export const GameContainer = ({ roomId, playerName }: { roomId: string, playerName: string }) => {
    const { phase, members, isHost, category, endTime, startRound, submissions, submitAnswer, startVoting, finalizeRound, sendVote, clientId, totalScores } = useGameRoom(roomId, playerName);

    useEffect(() => {
        if (isHost && phase === 'WRITING' && submissions.length > 0) {
            // Check if everyone in the lobby has submitted
            if (submissions.length === members.length) {
                startVoting(submissions);
            }
        }
    }, [submissions, members.length, isHost, phase]);

    const handleTimeUp = (finalAnswer: string) => {
        submitAnswer(finalAnswer);
    };



    const handleStartGame = () => {
        if (!isHost) return;
        const randomCat = categories[Math.floor(Math.random() * categories.length)];
        startRound(randomCat, 30); // Start 30s round
    };

    if (phase === 'LOBBY') {
        return (
            <GameLobby
                members={members}
                isHost={isHost}
                onStart={handleStartGame}
            />
        );
    }
    if (phase === 'WRITING') {
        return <PlayScreen category={category} endTime={endTime} onTimeUp={handleTimeUp} />;
    }

    if (phase === 'VOTING') {
        return <VotingScreen submissions={submissions}
            myId={clientId}
            isHost={isHost}
            onVote={(target, approved) => sendVote(target, approved)}
            onDone={finalizeRound} />;
    }
    if (phase === 'RESULTS') {
        return (
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <h2>Round Results</h2>
                <div style={{ marginBottom: '30px' }}>
                    {submissions.sort((a, b) => b.votes - a.votes).map(s => (
                        <div key={s.playerId} style={resultRowStyle}>
                            <span>{s.playerName}</span>
                            <span style={{ fontWeight: 'bold' }}>+{s.votes} pts</span>
                        </div>
                    ))}
                </div>

                <hr />

                <div className="leaderboard">
                    <h3>🏆 All-Time Leaderboard</h3>
                    {Object.entries(totalScores)
                        .sort(([, scoreA], [, scoreB]) => scoreB - scoreA) // Sort by highest score
                        .map(([id, score]) => {
                            // Find the player's name from the members list using their ID
                            const player = members.find(m => m.clientId === id);
                            const name = player?.data?.name || "Unknown Player";

                            return (
                                <div key={id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>{name}</span>
                                    <span>{score} pts</span>
                                </div>
                            );
                        })}
                </div>

                {isHost && (
                    <button
                        onClick={handleStartGame}
                        style={{ marginTop: '30px', padding: '15px 30px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        Start Next Round
                    </button>
                )}
            </div>
        );
    }

    return <div>Loading...</div>;
};

const resultRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    borderBottom: '1px solid #eee'
};