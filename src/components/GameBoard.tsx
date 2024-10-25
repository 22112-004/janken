import React, { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { Card } from './Card';
import { motion } from 'framer-motion';

export function GameBoard() {
  const { state, dispatch } = useGame();

  useEffect(() => {
    if (state.flippedCards.length === 2) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CHECK_MATCH' });
        if (state.gameMode === 'multiplayer') {
          dispatch({ type: 'NEXT_TURN' });
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [state.flippedCards.length]);

  const handleCardClick = (card: Card) => {
    if (
      state.flippedCards.length === 2 ||
      card.isFlipped ||
      card.isMatched ||
      state.gameStatus !== 'playing'
    ) {
      return;
    }
    dispatch({ type: 'FLIP_CARD', payload: card });
  };

  return (
    <motion.div
      className="grid grid-cols-4 gap-4 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {state.cards.map(card => (
        <Card
          key={card.id}
          {...card}
          onClick={() => handleCardClick(card)}
        />
      ))}
    </motion.div>
  );
}