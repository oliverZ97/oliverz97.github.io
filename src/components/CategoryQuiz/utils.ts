export function generateLobbyKey() {
  const allowedSymbols = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const hash: string[] = [];

  for (let i = 0; i < 6; i++) {
    const idx = Math.floor(Math.random() * allowedSymbols.length);
    hash[i] = allowedSymbols[idx];
  }

  return hash.join("");
}
