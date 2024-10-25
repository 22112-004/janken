import React, { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { GameMenu } from './GameMenu';
import { GameOver } from './GameOver';
import { GameHUD } from './GameHUD';
import { JankenPhase } from './JankenPhase';
import { DirectionPhase } from './DirectionPhase';
import { ResultPhase } from './ResultPhase';

export function Game() {
  const { state, dispatch } = useGame();

  useEffect(() => {
    if (state.isPlaying) {
      const timer = setInterval(() => {
        dispatch({ type: 'TICK' });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [state.isPlaying]);

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <AnimatePresence>
        {state.gameStatus === 'menu' && <GameMenu />}
        {state.gameStatus === 'gameover' && <GameOver />}
        
        {state.gameStatus === 'playing' && (
          <>
            <GameHUD />
            <div className="absolute inset-0 flex items-center justify-center">
              {state.phase === 'janken' && <JankenPhase />}
              {state.phase === 'direction' && <DirectionPhase />}
              {state.phase === 'result' && <ResultPhase />}
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}