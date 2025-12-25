import { useMemo } from "react";

interface Snowflake {
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    drift: number;
}

export const Snowfall = () => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const height = typeof window !== 'undefined' ? window.innerHeight : 1080;

    const snowflakes = useMemo(() => {
        const flakes: Snowflake[] = [];
        const numSnowflakes = 100;

        for (let i = 0; i < numSnowflakes; i++) {
            flakes.push({
                x: Math.random() * width,
                y: -Math.random() * 500, // Start above the viewport
                size: Math.random() * 4 + 3,
                duration: Math.random() * 3 + 7,
                delay: Math.random() * 3,
                drift: (Math.random() - 0.5) * 50,
            });
        }
        return flakes;
    }, [width, height]);

    return (
        <>
            <style>
                {`
                    @keyframes snowfall {
                        0% {
                            transform: translateY(0) translateX(0);
                            opacity: 1;
                        }
                        100% {
                            transform: translateY(100vh) translateX(var(--drift));
                            opacity: 0;
                        }
                    }
                `}
            </style>
            <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                pointerEvents: "none",
                zIndex: 9999,
                overflow: "hidden"
            }}>
                {snowflakes.map((flake, index) => (
                    <div
                        key={index}
                        style={{
                            position: "absolute",
                            top: flake.y,
                            left: flake.x,
                            width: flake.size,
                            height: flake.size,
                            backgroundColor: "white",
                            borderRadius: "50%",
                            boxShadow: "0 0 5px rgba(255,255,255,0.9)",
                            animation: `snowfall ${flake.duration}s linear ${flake.delay}s infinite`,
                            willChange: "transform",
                            // @ts-ignore
                            "--drift": `${flake.drift}px`,
                        }}
                    />
                ))}
            </div>
        </>
    );
}