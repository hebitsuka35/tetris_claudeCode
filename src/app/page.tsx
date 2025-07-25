'use client';

import { useState } from 'react';
import Level from '../components/display/levelDisplay';
import NextShape from '../components/display/nextShapeDisplay';
import PlayFieldDisplay from '../components/display/playFieldDisplay';
import Point from '../components/display/pointDisplay';
import { GameState } from '../types/tetris';
import { createEmptyGrid, createPiece, getRandomTetromino } from '../utils/tetrisLogic';
import styles from './page.module.css';

export default function Home() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const initialPiece = createPiece(getRandomTetromino());
    const nextPiece = createPiece(getRandomTetromino());
    
    return {
      playField: createEmptyGrid(),
      currentPiece: initialPiece,
      nextPiece: nextPiece,
      score: 0,
      level: 0,
      lines: 0,
      gameOver: false,
    };
  });

  const resetGame = () => {
    const initialPiece = createPiece(getRandomTetromino());
    const nextPiece = createPiece(getRandomTetromino());
    
    setGameState({
      playField: createEmptyGrid(),
      currentPiece: initialPiece,
      nextPiece: nextPiece,
      score: 0,
      level: 0,
      lines: 0,
      gameOver: false,
    });
  };

  return (
    <>
      <div className={styles.title}>TETRIS</div>
      <div className={styles.container}>
        <div className={styles.left}>
          <PlayFieldDisplay 
            gameState={gameState} 
            onGameStateChange={setGameState} 
          />
        </div>
        <div className={styles.right}>
          <NextShape nextPiece={gameState.nextPiece} />
          <Level level={gameState.level} />
          <Point score={gameState.score} />
        </div>
      </div>
      <div className={styles.footer}>
        {gameState.gameOver && (
          <>
            <br />
            <button onClick={resetGame} style={{ marginTop: '10px', padding: '5px 10px' }}>
              リスタート
            </button>
          </>
        )}
      </div>
    </>
  );
}
