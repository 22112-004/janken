import React from 'react';
import { useGame } from '../context/GameContext';
import { Trophy, Zap, Target, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function GameResult() {
  const { state } = useGame();

  if (state.gameStatus !== 'finished') return null;

  const stats = [
    { label: 'Final Score', value: state.score, icon: <Trophy className="w-6 h-6 text-yellow-400" /> },
    { label: 'Max Combo', value: `x${state.maxCombo}`, icon: <Zap className="w-6 h-6 text-blue-400" /> },
    { label: 'Matches', value: `${state.matchedPairs.length}/${state.cards.length / 2}`, icon: <Target className="w-6 h-6 text-green-400" /> },
  ];

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-6"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Game Over!</h2>
        
        <div className="space-y-4">
          {stats.map(({ label, value, icon }) => (
            <div key={label} className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                {icon}
                <span className="font-medium text-gray-700">{label}</span>
              </div>
              <span className="text-xl font-bold text-gray-900">{value}</span>
            </div>
          ))}
        </div>

        {state.score === state.highScore && state.score > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
            <p className="text-yellow-800 font-semibold">🎉 New High Score! 🎉</p>
          </div>
        )}

        <div className="flex space-x-4">
          <button
            onClick={() => window.location.reload()}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg
              flex items-center justify-center space-x-2 transition-colors duration-200"
          >
            <span>Play Again</span>
          </button>
          <button
            onClick={() => {
              // Share functionality would go here
            }}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg
              flex items-center justify-center space-x-2 transition-colors duration-200"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}