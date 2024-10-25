import React from 'react';
import { GameProvider } from './context/GameContext';
import { Layout } from './components/Layout';
import { Game } from './components/Game';

function App() {
  return (
    <GameProvider>
      <Layout>
        <Game />
      </Layout>
    </GameProvider>
  );
}

export default App;