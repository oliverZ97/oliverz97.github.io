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

  const channel = ably.channels.get(`room-${roomId}`);

  // Keep the ref in sync with the state
  useEffect(() => {
    submissionsRef.current = submissions;
  }, [submissions]);

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

      if (data.type === "START_ROUND") {
        setSubmissions([]); // CRITICAL: Clear previous round answers
        setCategory(data.category);
        setEndTime(data.endTime);
        setRoundDuration(data.writeTime);
        setPhase("WRITING");
      }

      if (data.type === "SUBMIT_ANSWER") {
        // Only the Host processes the logic for tallying
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
        console.log("CRITICAL: Processing END_ROUND. isLastRound is:", data.isLastRound);

        setSubmissions(data.finalSubmissions);
        setTotalScores(data.updatedTotals);
        setRoundCounter(data.nextRoundNumber);

        if (data.isLastRound === true) {
          console.log("SWITCHING TO RESULTS PHASE NOW");
          setPhase("RESULTS");
        } else {
          console.log("SWITCHING TO WRITING PHASE FOR NEXT ROUND");
          setPhase("WRITING");
        }
      }
    });

    return () => {
      channel.presence.leave();
      channel.presence.unsubscribe();
      channel.unsubscribe();
    };
  }, [roomId, playerName, config]);

  // Determine Host (First one in the list)
  const sorted = [...members].sort((a, b) => a.timestamp - b.timestamp);
  const isHost = mode === "host" && sorted[0]?.clientId === ably.auth.clientId;

  // Helper to send the start signal
  const startRound = (selectedCategory: string, seconds: number) => {
    channel.publish("game-event", {
      type: "START_ROUND",
      category: selectedCategory,
      endTime: Date.now() + seconds * 1000,
      writeTime: config.writeTime,
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

    // 1. Force everything to Numbers to prevent "3" vs 3 issues
    const currentRound = Number(roundCounter);
    const totalRounds = Number(config.rounds);

    // 2. Determine if this is the end
    const isLastRound = currentRound >= totalRounds;

    console.log(`Finalizing: Round ${currentRound} of ${totalRounds}. Last Round: ${isLastRound}`);

    const updatedTotals = { ...totalScores };
    submissions.forEach((s) => {
      const currentScore = updatedTotals[s.playerId] || 0;
      updatedTotals[s.playerId] = currentScore + s.votes;
    });

    // 3. Broadcast
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
    submitAnswer,
    startVoting,
    sendVote,
    finalizeRound,
    totalScores,
  };
};
