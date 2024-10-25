import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Direction } from '../types';
import { getDirectionEmoji } from '../utils/gameUtils';

export function DirectionPhase() {
  const { dispatch } = useGame();
  const directions: Direction[] = ['up', 'down', 'left', 'right'];

  return (
    <div className="flex flex-col items-center space-y-8">
      <h2 className="text-2xl font-bold text-white">Point in a Direction!</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {directions.map(direction => (
          <motion.button
            key={direction}
            onClick={() => dispatch({ type: 'SELECT_DIRECTION', payload: direction })}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-6
              flex items-center justify-center transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-4xl">{getDirectionEmoji(direction)}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}