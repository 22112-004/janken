import React from 'react';
import { useGame } from '../context/GameContext';
import { Play, Pause, RotateCcw, Users } from 'lucide-react';
import { GameMode } from '../types';

export function GameControls() {
  const { state, dispatch } = useGame();
  const [showModeSelect, setShowModeSelect] = React.useState(true);

  const gameModes: { id: GameMode; label: string; icon: React.ReactNode }[] = [
    { id: 'timeAttack', label: 'Time Attack', icon: <Timer className="w-5 h-5" /> },
    { id: 'free', label: 'Free Play', icon: <Play className="w-5 h-5" /> },
    { id: 'challenge', label: 'Challenge', icon: <Zap className="w-5 h-5" /> },
    { id: 'multiplayer', label: 'Multiplayer', icon: <Users className="w-5 h-5" /> },
  ];

  const handleStartGame = (mode: GameMode) => {
    setShowModeSelect(false);
    dispatch({ 
      type: 'START_GAME', 
      payload: { 
        mode,
        players: mode === 'multiplayer' ? 2 : undefined
      }
    });
  };

  if (showModeSelect) {
    return (
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Select Game Mode</h2>
        <div className="grid grid-cols-2 gap-4">
          {gameModes.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => handleStartGame(id)}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-4 rounded-xl
                flex items-center justify-center space-x-2 transition-colors duration-200"
            >
              {icon}
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center space-x-4 max-w-2xl mx-auto mt-8">
      {state.gameStatus === 'playing' ? (
        <button
          onClick={() => dispatch({ type: 'PAUSE_GAME' })}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-lg
            flex items-center space-x-2 transition-colors duration-200"
        >
          <Pause className="w-5 h-5" />
          <span>Pause</span>
        </button>
      ) : (
        <button
          onClick={() => dispatch({ type: 'RESUME_GAME' })}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-lg
            flex items-center space-x-2 transition-colors duration-200"
        >
          <Play className="w-5 h-5" />
          <span>Resume</span>
        </button>
      )}
      <button
        onClick={() => setShowModeSelect(true)}
        className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-lg
          flex items-center space-x-2 transition-colors duration-200"
      >
        <RotateCcw className="w-5 h-5" />
        <span>New Game</span>
      </button>
    </div>
  );
}