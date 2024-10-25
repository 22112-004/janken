import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  id: number;
  value: number;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

export function Card({ value, isFlipped, isMatched, onClick }: CardProps) {
  return (
    <motion.div
      className="relative w-full aspect-[3/4] cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: isFlipped ? 1 : 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="absolute w-full h-full"
        initial={false}
        animate={{
          rotateY: isFlipped ? 180 : 0,
          opacity: isMatched ? 0.7 : 1
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Card Back */}
        <div
          className="absolute w-full h-full backface-hidden bg-gradient-to-br from-blue-500 to-purple-600 
            rounded-xl shadow-lg border-2 border-white/20 flex items-center justify-center"
        >
          <div className="text-4xl">🎴</div>
        </div>

        {/* Card Front */}
        <div
          className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-lg border-2 
            border-white/20 flex items-center justify-center rotate-y-180"
        >
          <span className="text-4xl font-bold text-gray-800">{value}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}