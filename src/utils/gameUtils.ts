import { JankenHand, Direction } from '../types';

export function determineWinner(playerHand: JankenHand, cpuHand: JankenHand): 'win' | 'lose' | 'draw' {
  if (playerHand === cpuHand) return 'draw';
  
  if (
    (playerHand === 'rock' && cpuHand === 'scissors') ||
    (playerHand === 'paper' && cpuHand === 'rock') ||
    (playerHand === 'scissors' && cpuHand === 'paper')
  ) {
    return 'win';
  }
  
  return 'lose';
}

export function getRandomHand(): JankenHand {
  const hands: JankenHand[] = ['rock', 'paper', 'scissors'];
  return hands[Math.floor(Math.random() * hands.length)];
}

export function getRandomDirection(): Direction {
  const directions: Direction[] = ['up', 'down', 'left', 'right'];
  return directions[Math.floor(Math.random() * directions.length)];
}

export function getHandEmoji(hand: JankenHand): string {
  switch (hand) {
    case 'rock': return '✊';
    case 'paper': return '✋';
    case 'scissors': return '✌️';
  }
}

export function getDirectionEmoji(direction: Direction): string {
  switch (direction) {
    case 'up': return '⬆️';
    case 'down': return '⬇️';
    case 'left': return '⬅️';
    case 'right': return '➡️';
  }
}