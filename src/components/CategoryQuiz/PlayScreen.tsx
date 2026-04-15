import React, { useState, useEffect } from 'react';

interface PlayScreenProps {
    category: string;
    endTime: number;
    onTimeUp: (answer: string) => void;
}

export const PlayScreen = ({ category, endTime, onTimeUp }: PlayScreenProps) => {
    const [answer, setAnswer] = useState('');
    const [timeLeft, setTimeLeft] = useState<number>(0);

    useEffect(() => {
        // 1. Calculate time immediately on mount
        const calculateTime = () => {
            const now = Date.now();
            const diff = Math.max(0, Math.floor((endTime - now) / 1000));
            return diff;
        };

        setTimeLeft(calculateTime());

        // 2. Start the countdown interval
        const timer = setInterval(() => {
            const remaining = calculateTime();
            setTimeLeft(remaining);

            if (remaining <= 0) {
                clearInterval(timer);
                onTimeUp(answer); // This triggers the submission logic in the Container
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [endTime, onTimeUp, answer]);

    return (
        <div style={containerStyle}>
            <header>
                <p>Category:</p>
                <h1 style={{ margin: '0 0 20px 0', fontSize: '2.5rem' }}>{category}</h1>
            </header>

            <div style={{
                ...timerStyle,
                color: timeLeft <= 5 ? '#ff4d4d' : '#333' // Turn red when 5s left
            }}>
                {timeLeft}s
            </div>

            <div style={{ marginTop: '30px' }}>
                <label htmlFor="answer" style={{ display: 'block', marginBottom: '10px' }}>
                    Your Answer:
                </label>
                <input
                    id="answer"
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Type here..."
                    autoFocus
                    style={inputStyle}
                    disabled={timeLeft <= 0}
                />
            </div>

            {timeLeft === 0 && <p>Times up! Submitting...</p>}
        </div>
    );
};

// Simple inline styles to keep the UI clean
const containerStyle: React.CSSProperties = {
    padding: '40px',
    textAlign: 'center',
    maxWidth: '500px',
    margin: '0 auto'
};

const timerStyle: React.CSSProperties = {
    fontSize: '4rem',
    fontWeight: 'bold',
    fontVariantNumeric: 'tabular-nums' // Prevents numbers from jumping
};

const inputStyle: React.CSSProperties = {
    padding: '12px 20px',
    fontSize: '1.2rem',
    borderRadius: '8px',
    border: '2px solid #ddd',
    width: '100%',
    outline: 'none'
};