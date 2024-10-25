import React from 'react';
import { useGame } from '../context/GameContext';
import { Timer, Trophy, Zap, History } from 'lucide-react';

export function GameStats() {
  const { state } = useGame();

  const formatTime = (seconds: number) => {
    if (seconds === 0 && state.gameMode !== 'timeAttack') return '∞';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-yellow-300" />
          <span className="text-white">Score</span>
        </div>
        <span className="text-2xl font-bold text-white">{state.score}</span>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-yellow-300" />
          <span className="text-white">Combo</span>
        </div>
        <span className="text-2xl font-bold text-white">x{state.combo}</span>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Timer className="w-5 h-5 text-yellow-300" />
          <span className="text-white">Time</span>
        </div>
        <span className="text-2xl font-bold text-white">{formatTime(state.timeLeft)}</span>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <History className="w-5 h-5 text-yellow-300" />
          <span className="text-white">Best</span>
        </div>
        <span className="text-2xl font-bold text-white">{state.highScore}</span>
      </div>
    </div>
  );
}