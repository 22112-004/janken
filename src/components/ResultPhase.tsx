import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { getDirectionEmoji } from '../utils/gameUtils';

export function ResultPhase() {
  const { state, dispatch } = useGame();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: 'RESET_ROUND' });
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const isMatch = state.playerDirection === state.cpuDirection;

  return (
    <motion.div
      className="flex flex-col items-center space-y-8"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <h2 className="text-2xl font-bold text-white">
        {isMatch ? 'Perfect Match! 🎉' : 'Try Again!'}
      </h2>
      
      <div className="flex items-center justify-center space-x-8">
        <div className="text-center">
          <p className="text-white mb-2">You</p>
          <span className="text-6xl">
            {state.playerDirection && getDirectionEmoji(state.playerDirection)}
          </span>
        </div>
        <div className="text-4xl text-white">VS</div>
        <div className="text-center">
          <p className="text-white mb-2">CPU</p>
          <span className="text-6xl">
            {state.cpuDirection && getDirectionEmoji(state.cpuDirection)}
          </span>
        </div>
      </div>

      {isMatch && (
        <motion.div
          className="text-4xl font-bold text-yellow-400"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
          +100
        </motion.div>
      )}
    </motion.div>
  );
}