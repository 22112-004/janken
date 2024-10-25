import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { useSound } from '../hooks/useSound';

interface TargetProps {
  id: string;
  x: number;
  y: number;
  size: number;
  isRed: boolean;
}

export function Target({ id, x, y, size, isRed }: TargetProps) {
  const { dispatch } = useGame();
  const { preloadSound, playSound } = useSound();

  useEffect(() => {
    preloadSound({ src: '/sounds/hit.mp3', volume: 0.5 });
    preloadSound({ src: '/sounds/miss.mp3', volume: 0.5 });
  }, [preloadSound]);

  const handleClick = () => {
    playSound({ src: isRed ? '/sounds/hit.mp3' : '/sounds/miss.mp3' });
    dispatch({ type: 'HIT_TARGET', payload: { targetId: id, isRed } });
  };

  return (
    <motion.div
      className={`absolute rounded-full cursor-pointer
        ${isRed ? 'bg-red-500' : 'bg-blue-500'}
        hover:brightness-110 transition-colors`}
      style={{
        width: size,
        height: size,
        x,
        y,
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      onClick={handleClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    />
  );
}