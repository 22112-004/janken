import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { JankenHand } from '../types';
import { getHandEmoji } from '../utils/gameUtils';

export function JankenPhase() {
  const { state, dispatch } = useGame();
  const hands: JankenHand[] = ['rock', 'paper', 'scissors'];

  return (
    <div className="flex flex-col items-center space-y-8">
      <h2 className="text-2xl font-bold text-white">Choose Your Hand!</h2>
      
      <div className="grid grid-cols-3 gap-4">
        {hands.map(hand => (
          <motion.button
            key={hand}
            onClick={() => dispatch({ type: 'SELECT_HAND', payload: hand })}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-6
              flex items-center justify-center transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-4xl">{getHandEmoji(hand)}</span>
          </motion.button>
        ))}
      </div>

      {state.playerHand && state.cpuHand && (
        <div className="flex items-center justify-center space-x-8">
          <div className="text-center">
            <p className="text-white mb-2">You</p>
            <span className="text-6xl">{getHandEmoji(state.playerHand)}</span>
          </div>
          <div className="text-4xl text-white">VS</div>
          <div className="text-center">
            <p className="text-white mb-2">CPU</p>
            <span className="text-6xl">{getHandEmoji(state.cpuHand)}</span>
          </div>
        </div>
      )}
    </div>
  );
}