export type JankenHand = 'rock' | 'paper' | 'scissors';
export type Direction = 'up' | 'down' | 'left' | 'right';
export type GamePhase = 'janken' | 'direction' | 'result';
export type Difficulty = 'easy' | 'normal' | 'hard';
export type GameMode = 'single' | 'challenge';

export interface GameState {
  phase: GamePhase;
  playerHand?: JankenHand;
  cpuHand?: JankenHand;
  playerDirection?: Direction;
  cpuDirection?: Direction;
  score: number;
  streak: number;
  bestStreak: number;
  gameMode: GameMode;
  difficulty: Difficulty;
  timeLeft: number;
  isPlaying: boolean;
  gameStatus: 'menu' | 'playing' | 'paused' | 'gameover';
}

export type GameAction =
  | { type: 'SELECT_HAND'; payload: JankenHand }
  | { type: 'SELECT_DIRECTION'; payload: Direction }
  | { type: 'START_GAME'; payload: { mode: GameMode; difficulty: Difficulty } }
  | { type: 'TICK' }
  | { type: 'RESET_ROUND' }
  | { type: 'END_GAME' };