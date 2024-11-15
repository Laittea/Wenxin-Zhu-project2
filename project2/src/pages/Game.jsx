import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '../components/Grid';
import { GameContext } from '../context/GameContext';
import './Game.css';

const Game = () => {
    // Get difficulty level from URL
  const { difficulty } = useParams();
  const { gameState, setGameState } = useContext(GameContext);
  const [gridSize, setGridSize] = useState({ rows: 8, cols: 8, mines: 10 });
  const [key, setKey] = useState(0);
    //This was inspired by some React game tutorials
  useEffect(() => {
    // Update grid size based on difficulty
    switch (difficulty) {
      case 'medium':
        setGridSize({ rows: 16, cols: 16, mines: 40 });
        break;
      case 'hard':
        setGridSize({ rows: 16, cols: 30, mines: 99 });
        break;
      default:
        setGridSize({ rows: 8, cols: 8, mines: 10 });
    }


    setGameState('playing');
    // Update the key to reset the grid component
    setKey((prevKey) => prevKey + 1);
    // Re-run when difficulty changes
  }, [difficulty, setGameState]);
  // This is also from some React tutorial
  // Emoji and text customization for each difficulty
  const getDifficultyDetails = () => {
    switch (difficulty) {
      case 'medium':
        return {
          emoji: "🟡",
          message: "Challenge yourself with Medium mode! 🧠",
        };
      case 'hard':
        return {
          emoji: "🔴",
          message: "Brace yourself for Hard mode! 💪",
        };
      default:
        return {
          emoji: "🟢",
          message: "Take it easy with Easy mode! 🌟",
        };
    }
  };

  const { emoji, message } = getDifficultyDetails();

  return (
    <div className="game-container">
      <h2 className="game-difficulty">
        {emoji} Difficulty: {difficulty} {emoji}
      </h2>
      <p className="game-intro">{message}</p>
      {gameState === 'won' && <p className="game-message">🎉 Game over! You won! 🎉</p>}
      {gameState === 'lost' && <p className="game-message">💥 Game over! You lost! 💥</p>}
      <button
        className="game-reset-button"
        onClick={() => {
          setGameState('playing');
          setKey((prevKey) => prevKey + 1);
        }}
      >
        🔄 Reset
      </button>
      <Grid key={key} gridSize={gridSize} />
    </div>
  );
};

export default Game;
