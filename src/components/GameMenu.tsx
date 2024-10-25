import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { GameMode, Difficulty } from '../types';
import { Target, Crosshair, Timer, Infinity, Gamepad2 } from 'lucide-react';

export function GameMenu() {
  const { dispatch } = useGame();
  const [selectedMode, setSelectedMode] = React.useState<GameMode>('arcade');
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<Difficulty>('normal');

  const modes: { id: GameMode; label: string; icon: React.ReactNode; description: string }[] = [
    { id: 'arcade', label: 'Arcade', icon: <Timer className="w-6 h-6" />, description: '3 minutes • Score target' },
    { id: 'endless', label: 'Endless', icon: <Infinity className="w-6 h-6" />, description: '3 lives • No time limit' },
  ];

  const difficulties: { id: Difficulty; label: string; icon: React.ReactNode; description: string }[] = [
    { id: 'easy', label: 'Easy', icon: <Target className="w-6 h-6" />, description: 'Large targets • Slow speed' },
    { id: 'normal', label: 'Normal', icon: <Gamepad2 className="w-6 h-6" />, description: 'Medium targets • Normal speed' },
    { id: 'hard', label: 'Hard', icon: <Crosshair className="w-6 h-6" />, description: 'Small targets • Fast speed' },
    { id: 'expert', label: 'Expert', icon: <Target className="w-6 h-6" />, description: 'Random sizes • Variable speed' },
  ];

  const handleStartGame = () => {
    dispatch({
      type: 'START_GAME',
      payload: { mode: selectedMode, difficulty: selectedDifficulty },
    });
  };

  return (
    <motion.div
      className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl w-full mx-4"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white text-center mb-8">Color Shooting Game</h1>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Select Mode</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {modes.map(({ id, label, icon, description }) => (
                <button
                  key={id}
                  onClick={() => setSelectedMode(id)}
                  className={`p-4 rounded-xl transition-all duration-200
                    ${selectedMode === id
                      ? 'bg-white/20 border-2 border-white/40'
                      : 'bg-white/10 hover:bg-white/15 border-2 border-transparent'
                    }`}
                >
                  <div className="flex flex-col items-center text-white space-y-2">
                    {icon}
                    <h3 className="font-bold">{label}</h3>
                    <p className="text-sm opacity-80">{description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Select Difficulty</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {difficulties.map(({ id, label, icon, description }) => (
                <button
                  key={id}
                  onClick={() => setSelectedDifficulty(id)}
                  className={`p-4 rounded-xl transition-all duration-200
                    ${selectedDifficulty === id
                      ? 'bg-white/20 border-2 border-white/40'
                      : 'bg-white/10 hover:bg-white/15 border-2 border-transparent'
                    }`}
                >
                  <div className="flex flex-col items-center text-white space-y-2">
                    {icon}
                    <h3 className="font-bold">{label}</h3>
                    <p className="text-xs opacity-80">{description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleStartGame}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 
              hover:to-purple-600 text-white font-bold py-4 px-8 rounded-xl transition-colors duration-200
              shadow-lg shadow-purple-500/20"
          >
            Start Game
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}