import { useEffect, useRef, useState } from "react";
import ably from "./ablyClient";
import { GameMessage, GamePhase, Submission } from "./types";
import * as Ably from "ably";
import { GameConfig } from "./GameSettings";

export const useGameRoom = (
  roomId: string,
  playerName: string,
  mode: "host" | "join",
  config: GameConfig,
  onConfigSync?: (newConfig: GameConfig) => void,
  onNextRound?: () => void,
) => {
  const [members, setMembers] = useState<Ably.PresenceMessage[]>([]);
  const [phase, setPhase] = useState<GamePhase>("LOBBY");
  const [category, setCategory] = useState("");
  const [endTime, setEndTime] = useState<number>(0);
  const [roundDuration, setRoundDuration] = useState<number>(0);
  const [voteEndTime, setVoteEndTime] = useState<number>(0);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [totalScores, setTotalScores] = useState<Record<string, number>>({});
  const [roundCounter, setRoundCounter] = useState<number>(1);

  const submissionsRef = useRef<Submission[]>([]);
  const configRef = useRef(config);
  const isFinishingRef = useRef(false);

  const channel = ably.channels.get(`room-${roomId}`);
  const isHost = mode === "host";

  // Keep the ref in sync with the state
  useEffect(() => {
    submissionsRef.current = submissions;
  }, [submissions]);

  useEffect(() => {
    configRef.current = config;
  }, [config]);

  useEffect(() => {
    // --- 1. PRESENCE LOGIC (The Lobby) ---
    const updateMembers = async () => {
      const currentMembers = await channel.presence.get();
      setMembers(currentMembers);
    };

    channel.presence.subscribe("enter", updateMembers);
    channel.presence.subscribe("leave", updateMembers);
    channel.presence.subscribe("update", updateMembers);

    channel.presence.enter({ name: playerName });
    updateMembers();

    // --- 2. MESSAGING LOGIC (The Game Events) ---
    channel.subscribe("game-event", (message) => {
      const data = message.data as GameMessage;

      if (data.type === "RESET_GAME") {
        setPhase("LOBBY");
        setRoundCounter(1);
        setTotalScores({});
        setCategory("");
        setSubmissions([]);
        onConfigSync?.(data.config);
      }

      if (data.type === "GAME_PREPARATION") {
        // Only non-hosts should force-update their local config to match the host
        // This prevents the host from getting stuck in a loop
        if (mode === "join") {
          onConfigSync?.(data.config);
        }
      }

      if (data.type === "START_ROUND") {
        isFinishingRef.current = false;
        setSubmissions([]);
        setCategory(data.category);
        // Ensure writeTime is a valid number to prevent NaN timers
        const duration = Number(data.writeTime) || configRef.current.writeTime;
        setEndTime(Date.now() + duration * 1000);
        setRoundDuration(duration);
        setPhase("WRITING");
      }

      if (data.type === "SUBMIT_ANSWER") {
        setSubmissions((prev) => {
          const exists = prev.find((s) => s.playerId === data.playerId);
          if (exists) return prev;
          return [...prev, { ...data, votes: 0 }];
        });
      }

      if (data.type === "START_VOTING") {
        setSubmissions(data.submissions);
        setVoteEndTime(data.voteEndTime);
        setPhase("VOTING");
      }

      if (data.type === "CAST_VOTE") {
        setSubmissions((prev) =>
          prev.map((s) =>
            s.playerId === data.targetPlayerId
              ? { ...s, votes: s.votes + (data.isApproved ? 1 : 0) }
              : s,
          ),
        );
      }

      if (data.type === "END_ROUND") {
        setTotalScores(data.updatedTotals);
        setRoundCounter(data.nextRoundNumber);

        if (data.isLastRound) {
          setPhase("RESULTS");
        } else {
          setSubmissions([]);
          setCategory("");
          setPhase("TRANSITION");

          if (isHost) {
            setTimeout(() => {
              onNextRound?.();
            }, 2000);
          }
        }
      }
    });

    return () => {
      channel.presence.leave();
      channel.presence.unsubscribe();
      channel.unsubscribe();
    };
  }, [roomId, playerName, isHost]);

  const resetGame = () => {
    if (!isHost) return;

    channel.publish("game-event", {
      type: "RESET_GAME",
      config: config,
    });
  };

  const updateGameSettings = (gameConfig: GameConfig) => {
    channel.publish("game-event", {
      type: "GAME_PREPARATION",
      config: gameConfig,
    });
  };

  const startRound = (selectedCategory: string, seconds: number) => {
    // HOST: Clear locally before publishing to prevent auto-triggering voting
    setSubmissions([]);

    channel.publish("game-event", {
      type: "START_ROUND",
      category: selectedCategory,
      endTime: Date.now() + seconds * 1000,
      writeTime: seconds,
    });
  };

  const submitAnswer = (answer: string) => {
    channel.publish("game-event", {
      type: "SUBMIT_ANSWER",
      playerId: ably.auth.clientId,
      playerName: playerName,
      answer,
    });
  };

  const startVoting = (finalSubmissions: Submission[], seconds: number) => {
    channel.publish("game-event", {
      type: "START_VOTING",
      submissions: finalSubmissions,
      voteEndTime: Date.now() + seconds * 1000,
    });
  };

  const sendVote = (targetPlayerId: string, isApproved: boolean) => {
    channel.publish("game-event", {
      type: "CAST_VOTE",
      targetPlayerId,
      isApproved,
    });
  };

  const finalizeRound = () => {
    if (!isHost) return;

    isFinishingRef.current = true;

    const currentRound = Number(roundCounter);
    const totalRounds = Number(config.rounds);
    const isLastRound = currentRound >= totalRounds;

    const updatedTotals = { ...totalScores };
    submissions.forEach((s) => {
      const currentScore = updatedTotals[s.playerId] || 0;
      updatedTotals[s.playerId] = currentScore + s.votes;
    });

    channel.publish("game-event", {
      type: "END_ROUND",
      finalSubmissions: submissions,
      updatedTotals: updatedTotals,
      isLastRound: isLastRound,
      nextRoundNumber: currentRound + 1,
    });
  };

  return {
    members,
    isHost,
    phase,
    category,
    endTime,
    voteEndTime,
    roundDuration,
    roundCounter,
    startRound,
    clientId: ably.auth.clientId,
    submissions,
    updateGameSettings,
    submitAnswer,
    startVoting,
    sendVote,
    finalizeRound,
    resetGame,
    totalScores,
  };
};
