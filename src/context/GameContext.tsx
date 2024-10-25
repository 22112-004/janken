import React, { createContext, useContext, useReducer } from 'react';
import { GameState, GameAction, JankenHand, Direction } from '../types';
import { determineWinner, getRandomHand, getRandomDirection } from '../utils/gameUtils';

const initialState: GameState = {
  phase: 'janken',
  score: 0,
  streak: 0,
  bestStreak: 0,
  gameMode: 'single',
  difficulty: 'normal',
  timeLeft: 30,
  isPlaying: false,
  gameStatus: 'menu',
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...initialState,
        gameMode: action.payload.mode,
        difficulty: action.payload.difficulty,
        isPlaying: true,
        gameStatus: 'playing',
      };

    case 'SELECT_HAND': {
      const cpuHand = getRandomHand();
      const result = determineWinner(action.payload, cpuHand);
      
      return {
        ...state,
        playerHand: action.payload,
        cpuHand,
        phase: result === 'win' ? 'direction' : 'janken',
      };
    }

    case 'SELECT_DIRECTION': {
      const cpuDirection = getRandomDirection();
      const isMatch = action.payload === cpuDirection;
      const newScore = state.score + (isMatch ? 100 : 0);
      const newStreak = isMatch ? state.streak + 1 : 0;

      return {
        ...state,
        playerDirection: action.payload,
        cpuDirection,
        score: newScore,
        streak: newStreak,
        bestStreak: Math.max(state.bestStreak, newStreak),
        phase: 'result',
      };
    }

    case 'TICK':
      const newTimeLeft = state.timeLeft - 1;
      return {
        ...state,
        timeLeft: newTimeLeft,
        gameStatus: newTimeLeft <= 0 ? 'gameover' : state.gameStatus,
        isPlaying: newTimeLeft > 0,
      };

    case 'RESET_ROUND':
      return {
        ...state,
        phase: 'janken',
        playerHand: undefined,
        cpuHand: undefined,
        playerDirection: undefined,
        cpuDirection: undefined,
      };

    case 'END_GAME':
      return {
        ...state,
        gameStatus: 'gameover',
        isPlaying: false,
      };

    default:
      return state;
  }
}

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}