'use client';

import { useCallback, useEffect, useState } from 'react';
import styles from '../../app/page.module.css';
import type { GameState } from '../../types/tetris';
import { TETROMINO_COLORS } from '../../types/tetris';
import {
  calculateScore,
  clearLines,
  createPiece,
  getDropSpeed,
  getGridWithPiece,
  getRandomTetromino,
  isValidPosition,
  placePiece,
  rotatePiece,
} from '../../utils/tetrisLogic';

interface PlayFieldDisplayProps {
  gameState: GameState;
  onGameStateChange: (gameState: GameState) => void;
}

const PlayFieldDisplay = ({ gameState, onGameStateChange }: PlayFieldDisplayProps) => {
  const [dropTime, setDropTime] = useState<number | null>(null);

  const spawnNewPiece = useCallback(() => {
    const newPiece = gameState.nextPiece || createPiece(getRandomTetromino());
    const nextPiece = createPiece(getRandomTetromino());

    if (!isValidPosition(gameState.playField, newPiece)) {
      onGameStateChange({
        ...gameState,
        gameOver: true,
      });
      return;
    }

    onGameStateChange({
      ...gameState,
      currentPiece: newPiece,
      nextPiece,
    });
  }, [gameState, onGameStateChange]);

  const movePiece = useCallback(
    (deltaX: number, deltaY: number) => {
      if (!gameState.currentPiece || gameState.gameOver) return;

      const newPosition = {
        x: gameState.currentPiece.position.x + deltaX,
        y: gameState.currentPiece.position.y + deltaY,
      };

      if (isValidPosition(gameState.playField, gameState.currentPiece, newPosition)) {
        onGameStateChange({
          ...gameState,
          currentPiece: {
            ...gameState.currentPiece,
            position: newPosition,
          },
        });
      } else if (deltaY > 0) {
        // Piece hit bottom, place it
        const newGrid = placePiece(gameState.playField, gameState.currentPiece);
        const { newGrid: clearedGrid, linesCleared } = clearLines(newGrid);
        const newScore = gameState.score + calculateScore(linesCleared, gameState.level);
        const newLines = gameState.lines + linesCleared;
        // レベルアップはタイマーで行うのでここではlevelを変更しない
        onGameStateChange({
          ...gameState,
          playField: clearedGrid,
          currentPiece: null,
          score: newScore,
          lines: newLines,
          // level: newLevel, // 削除
        });
      }
    },
    [
      gameState.playField,
      gameState.currentPiece,
      gameState.gameOver,
      gameState.score,
      gameState.level,
      gameState.lines,
      onGameStateChange,
    ],
  );

  const rotatePieceHandler = useCallback(() => {
    if (!gameState.currentPiece || gameState.gameOver) return;

    const rotatedPiece = rotatePiece(gameState.currentPiece);
    if (isValidPosition(gameState.playField, rotatedPiece)) {
      onGameStateChange({
        ...gameState,
        currentPiece: rotatedPiece,
      });
    }
  }, [gameState.playField, gameState.currentPiece, gameState.gameOver, onGameStateChange]);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (gameState.gameOver) return;

      switch (event.key) {
        case 'ArrowLeft':
          movePiece(-1, 0);
          break;
        case 'ArrowRight':
          movePiece(1, 0);
          break;
        case 'ArrowDown':
          movePiece(0, 1);
          break;
        case 'ArrowUp':
        case ' ':
          rotatePieceHandler();
          break;
      }
    },
    [movePiece, rotatePieceHandler, gameState.gameOver],
  );

  // Auto drop
  useEffect(() => {
    if (gameState.gameOver) {
      setDropTime(null);
      return;
    }

    const speed = getDropSpeed(gameState.level);
    setDropTime(speed);
  }, [gameState.level, gameState.gameOver]);

  useEffect(() => {
    if (dropTime === null) return;

    const interval = setInterval(() => {
      movePiece(0, 1);
    }, dropTime);

    return () => clearInterval(interval);
  }, [dropTime, movePiece]);

  // Spawn new piece when current piece is null
  useEffect(() => {
    if (!gameState.currentPiece && !gameState.gameOver) {
      const timer = setTimeout(() => {
        spawnNewPiece();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [gameState.currentPiece, gameState.gameOver, spawnNewPiece]);

  // Keyboard events
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  // 30秒ごとにレベルアップ
  useEffect(() => {
    if (gameState.gameOver) return;
    const levelUpTimer = setInterval(() => {
      onGameStateChange({
        ...gameState,
        level: gameState.level + 1,
      });
    }, 30000);
    return () => clearInterval(levelUpTimer);
  }, [gameState, gameState.gameOver, onGameStateChange]);

  const getCellColor = (cellValue: number): string => {
    if (cellValue === 0) return 'white';

    const colorMap: Record<number, string> = {
      1: TETROMINO_COLORS.I,
      2: TETROMINO_COLORS.O,
      3: TETROMINO_COLORS.T,
      4: TETROMINO_COLORS.S,
      5: TETROMINO_COLORS.Z,
      6: TETROMINO_COLORS.J,
      7: TETROMINO_COLORS.L,
    };

    return colorMap[cellValue] || 'lightgray';
  };

  const displayGrid = getGridWithPiece(gameState.playField, gameState.currentPiece);

  return (
    <>
      <div className={styles.playField}>
        {displayGrid.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={styles.cell}
              style={{
                backgroundColor: getCellColor(cell),
                border: y === 0 ? 'none' : cell === 0 ? '1px solid #ccc' : '1px solid #333',
              }}
            />
          )),
        )}
        {gameState.gameOver && <div className={styles.gameOver}>GAME OVER</div>}
      </div>
    </>
  );
};

export default PlayFieldDisplay;
