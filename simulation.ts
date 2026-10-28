// Import or paste your functions here:
// getRandomCharacter, getRandomAnime, getRandomIndicesFromUTCDate, getMultipleDailyIndices, etc.

import characterData from "@/data/character_data.json";
import animeDataFile from "@/data/anime_data.json";
import { Anime, Character } from "./src/common/types";
import { createAnimeListFromCharData, getRandomAnime, getRandomCharacter } from "@/common/utils";

function runSimulation() {
  console.log("=== STARTING QUIZ DISTRIBUTION SIMULATION ===\n");

  let charData: Character[] = [];
  let animeData: Anime[] = [];
  charData = [...characterData.sort((a, b) => (a.Name < b.Name ? -1 : 1))] as Character[];

  if (charData && animeData.length === 0) {
    const localAnimeData = createAnimeListFromCharData(charData, animeDataFile);

    animeData = localAnimeData.sort((a, b) => (a.Name < b.Name ? -1 : 1)) as Anime[];
  }

  // Helper to generate a date offset from a base date
  const startDate = new Date(Date.UTC(2026, 0, 1)); // Jan 1, 2026
  const totalDays = 730; // Simulate 2 full years (730 days)

  // Track selection frequencies
  const singleCharCounts: Record<number, number> = {};
  const multiCharCounts: Record<number, number> = {};
  const animeCounts: Record<number, number> = {};

  // Track uniqueness to verify determinism across runs
  const dayOneCharsFirstRun: number[] = [];
  const dayOneCharsSecondRun: number[] = [];

  console.log(`Simulating over ${totalDays} UTC days...\n`);

  for (let d = 0; d < totalDays; d++) {
    const currentDate = new Date(startDate);
    currentDate.setUTCDate(startDate.getUTCDate() + d);

    // 1. Test Single Character (EndlessMode = false for daily deterministic check)
    const singleChars = getRandomCharacter(
      charData,
      { endlessMode: false, isPrevious: false, gender: "all", date: currentDate },
      1,
    );
    const singleId = singleChars[0].id;
    singleCharCounts[singleId] = (singleCharCounts[singleId] || 0) + 1;

    // Capture Day 1 for determinism check
    if (d === 0) {
      dayOneCharsFirstRun.push(singleId);
    }

    // 2. Test Multiple Characters (e.g., amount = 5)
    const multiChars = getRandomCharacter(
      charData,
      { endlessMode: false, isPrevious: false, gender: "all", date: currentDate },
      5,
    );
    multiChars.forEach((char) => {
      multiCharCounts[char.id] = (multiCharCounts[char.id] || 0) + 1;
    });

    // 3. Test Anime (endlessMode = false)
    const anime = getRandomAnime(animeData, {
      endlessMode: false,
      isPrevious: false,
      date: currentDate,
    });
    animeCounts[anime.id] = (animeCounts[anime.id] || 0) + 1;
  }

  // Run Day 1 again to verify determinism
  const dayOneAgain = getRandomCharacter(
    charData,
    { endlessMode: false, isPrevious: false, gender: "all", date: startDate },
    1,
  );
  dayOneCharsSecondRun.push(dayOneAgain[0].id);

  // --- ANALYZE RESULTS ---

  console.log("--- 1. Determinism Check ---");
  console.log(`Day 1 Character (Run 1): ID ${dayOneCharsFirstRun[0]}`);
  console.log(`Day 1 Character (Run 2): ID ${dayOneCharsSecondRun[0]}`);
  if (dayOneCharsFirstRun[0] === dayOneCharsSecondRun[0]) {
    console.log("✅ PASS: Same date produces identical results across runs.\n");
  } else {
    console.log("❌ FAIL: Date results changed between runs!\n");
  }

  console.log("--- 2. Dataset Coverage & Distribution Check ---");

  // Single Character Stats
  const uniqueCharsSelected = Object.keys(singleCharCounts).length;
  const maxSingleHits = Math.max(...Object.values(singleCharCounts));
  const minSingleHits = Math.min(...Object.values(singleCharCounts));
  console.log(`[Single Characters - Total Pool: ${charData.length}]`);
  console.log(`- Unique characters hit over ${totalDays} days: ${uniqueCharsSelected}`);
  console.log(`- Max times a single character was picked: ${maxSingleHits}`);
  console.log(`- Min times a single character was picked: ${minSingleHits}`);
  console.log(`- Coverage rate: ${((uniqueCharsSelected / charData.length) * 100).toFixed(1)}%\n`);

  // Anime Stats
  const uniqueAnimesSelected = Object.keys(animeCounts).length;
  const maxAnimeHits = Math.max(...Object.values(animeCounts));
  console.log(`[Animes - Total Pool: ${animeData.length}]`);
  console.log(`- Unique animes hit over ${totalDays} days: ${uniqueAnimesSelected}`);
  console.log(`- Max times a single anime was picked: ${maxAnimeHits}`);
  console.log(
    `- Coverage rate: ${((uniqueAnimesSelected / animeData.length) * 100).toFixed(1)}%\n`,
  );

  // Multiple Character Stats (amount = 5, so each day picks 5 items)
  const uniqueMultiSelected = Object.keys(multiCharCounts).length;
  console.log(`[Multiple Characters (amount=5)]`);
  console.log(
    `- Unique characters touched across all multi-draws: ${uniqueMultiSelected} / ${charData.length}`,
  );
  console.log("------------------------------------------");
}

runSimulation();
