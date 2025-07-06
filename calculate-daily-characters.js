// Script to calculate characters for the next 7 days
const fs = require('fs');
const path = require('path');

// Load character data
const charDataPath = path.join(__dirname, 'src/data/character_data.json');
const charData = JSON.parse(fs.readFileSync(charDataPath, 'utf8'));

// Function to get characters for a specific date
function getCharactersForDate(date, count = 4) {
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const yearSignature = `${date.getFullYear()}`;
  
  // Create a seed using the day of year and year
  let seed = dayOfYear;
  for (let i = 0; i < yearSignature.length; i++) {
    seed += yearSignature.charCodeAt(i);
  }

  // Create character pools that rotate through the year
  const rotationOffset = dayOfYear % charData.length;
  
  // Create a rotated copy of the character data
  const rotatedChars = [
    ...charData.slice(rotationOffset),
    ...charData.slice(0, rotationOffset)
  ];
  
  // Further shuffle the rotated characters with the seed
  const shuffledChars = [...rotatedChars].sort((a, b) => {
    const hashA = (seed * a.Name.length) % charData.length;
    const hashB = (seed * b.Name.length) % charData.length;
    return hashA - hashB;
  });

  // Get the first four unique characters
  const chars = [];
  let i = 0;
  while (chars.length < count && i < shuffledChars.length) {
    // Ensure we don't add duplicates
    if (!chars.some(char => char.Name === shuffledChars[i].Name)) {
      chars.push(shuffledChars[i]);
    }
    i++;
  }
  
  return chars;
}

// Calculate for the next 7 days
const today = new Date(2025, 6, 6); // July 6, 2025
console.log("Daily character quiz characters for the next 7 days:");

for (let i = 0; i < 7; i++) {
  const date = new Date(today);
  date.setDate(today.getDate() + i);
  const characters = getCharactersForDate(date);
  
  console.log(`\n${date.toDateString()}:`);
  characters.forEach(char => {
    console.log(`- ${char.Name} from ${char.Anime}`);
  });
}
