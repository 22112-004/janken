import React from 'react';
import { useGame } from '../context/GameContext';
import { Trophy, Timer, Zap } from 'lucide-react';

export function GameHUD() {
  const { state } = useGame();

  return (
    <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
      <div className="flex space-x-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          <span className="text-white font-bold">{state.score}</span>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 flex items-center space-x-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          <span className="text-white font-bold">x{state.streak}</span>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 flex items-center space-x-2">
        <Timer className="w-5 h-5 text-blue-400" />
        <span className="text-white font-bold">{state.timeLeft}s</span>
      </div>
    </div>
  );
}