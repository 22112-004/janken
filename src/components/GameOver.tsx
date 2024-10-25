import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Trophy, Zap, Target, RotateCcw, Share2 } from 'lucide-react';

export function GameOver() {
  const { state, dispatch } = useGame();

  const accuracy = state.hits > 0
    ? Math.round((state.hits / (state.hits + state.misses)) * 100)
    : 0;

  const stats = [
    { label: 'Final Score', value: state.score, icon: <Trophy className="w-6 h-6 text-yellow-400" /> },
    { label: 'Max Combo', value: `x${state.maxCombo}`, icon: <Zap className="w-6 h-6 text-blue-400" /> },
    { label: 'Accuracy', value: `${accuracy}%`, icon: <Target className="w-6 h-6 text-green-400" /> },
  ];

  const handleRestart = () => {
    dispatch({
      type: 'START_GAME',
      payload: { mode: state.mode, difficulty: state.difficulty },
    });
  };

  return (
    <motion.div
      className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md w-full"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-white text-center mb-8">Game Over!</h2>
        
        <div className="space-y-4 mb-8">
          {stats.map(({ label, value, icon }) => (
            <div key={label} className="flex items-center justify-between bg-white/10 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                {icon}
                <span className="text-white font-medium">{label}</span>
              </div>
              <span className="text-xl font-bold text-white">{value}</span>
            </div>
          ))}
        </div>

        {state.score === state.highScore && state.score > 0 && (
          <motion.div
            className="bg-yellow-400/20 border border-yellow-400/40 rounded-xl p-4 text-center mb-8"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <p className="text-yellow-400 font-bold">🎉 New High Score! 🎉</p>
          </motion.div>
        )}

        <div className="flex space-x-4">
          <button
            onClick={handleRestart}
            className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 
              hover:to-purple-600 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200
              flex items-center justify-center space-x-2"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Play Again</span>
          </button>
          
          <button
            onClick={() => {
              // Share functionality would go here
            }}
            className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl
              flex items-center justify-center space-x-2 transition-colors duration-200"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}