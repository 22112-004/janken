export function calculateScore(currentScore: number, combo: number): number {
  const baseScore = 100;
  let comboBonus = 0;
  
  if (combo === 2) comboBonus = 50;
  else if (combo === 3) comboBonus = 100;
  else if (combo >= 4) comboBonus = 200;
  
  return currentScore + baseScore + comboBonus;
}

export function generateDeck(): number[] {
  const numbers = Array.from({ length: 8 }, (_, i) => i + 1);
  const deck = [...numbers, ...numbers]; // Create pairs
  
  // Fisher-Yates shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  
  return deck;
}

export function createInitialCards(): Card[] {
  const values = generateDeck();
  return values.map((value, index) => ({
    id: index,
    value,
    isFlipped: false,
    isMatched: false
  }));
}

interface Card {
  id: number;
  value: number;
  isFlipped: boolean;
  isMatched: boolean;
}