import { useState } from "react";
import { Submission } from "./types";

interface VotingProps {
    submissions: Submission[];
    myId: string;
    isHost: boolean;
    onVote: (targetId: string, approved: boolean) => void;
    onDone: () => void;
}

export const VotingScreen = ({ submissions, myId, isHost, onVote, onDone }: VotingProps) => {
    // Track which players we've already voted for locally to disable buttons
    const [votedFor, setVotedFor] = useState<string[]>([]);

    const handleVote = (id: string, approved: boolean) => {
        setVotedFor(prev => [...prev, id]);
        onVote(id, approved);
    };

    return (
        <div>
            <h2>Review Answers</h2>
            {submissions.map((s) => (
                <div key={s.playerId} style={cardStyle}>
                    <strong>{s.playerName}</strong>
                    <p>"{s.answer}"</p>

                    {/* Add this line so the Host can see the votes tick up */}
                    {isHost && <span>Current Votes: {s.votes}</span>}

                    {s.playerId !== myId && !votedFor.includes(s.playerId) && (
                        <div>
                            <button onClick={() => handleVote(s.playerId, true)}>✅</button>
                            <button onClick={() => handleVote(s.playerId, false)}>❌</button>
                        </div>
                    )}
                </div>
            ))}

            {isHost && (
                <button
                    onClick={onDone}
                    style={{ marginTop: '20px', background: 'gold', padding: '10px 20px' }}
                >
                    Finish Voting & Show Results
                </button>
            )}
        </div>
    );
};

const cardStyle = {
    border: '1px solid #ddd',
    padding: '15px',
    borderRadius: '10px',
    background: '#f9f9f9'
};