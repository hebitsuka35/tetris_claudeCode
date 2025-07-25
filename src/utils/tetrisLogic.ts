import type { Position, TetrisPiece, TetrominoType } from '../types/tetris';
import { TETROMINOES } from '../types/tetris';

export const createEmptyGrid = (): number[][] => {
  return Array.from({ length: 21 }, () => Array.from({ length: 10 }, () => 0));
};

export const getRandomTetromino = (): TetrominoType => {
  const types: TetrominoType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
  return types[Math.floor(Math.random() * types.length)];
};

export const createPiece = (type: TetrominoType): TetrisPiece => {
  return {
    shape: TETROMINOES[type][0],
    position: { x: 3, y: 0 },
    type,
    rotation: 0,
  };
};

export const isValidPosition = (
  grid: number[][],
  piece: TetrisPiece,
  newPosition?: Position,
): boolean => {
  const pos = newPosition || piece.position;

  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x] !== 0) {
        const newX = pos.x + x;
        const newY = pos.y + y;

        if (newX < 0 || newX >= 10 || newY >= 21 || (newY >= 0 && grid[newY][newX] !== 0)) {
          return false;
        }
      }
    }
  }
  return true;
};

export const placePiece = (grid: number[][], piece: TetrisPiece): number[][] => {
  const newGrid = grid.map((row) => [...row]);
  const typeValue = getTypeValue(piece.type);

  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x] !== 0) {
        const gridY = piece.position.y + y;
        const gridX = piece.position.x + x;
        if (gridY >= 0 && gridY < 21 && gridX >= 0 && gridX < 10) {
          newGrid[gridY][gridX] = typeValue;
        }
      }
    }
  }
  return newGrid;
};

export const clearLines = (grid: number[][]): { newGrid: number[][]; linesCleared: number } => {
  const newGrid = [...grid];
  let linesCleared = 0;

  for (let y = 20; y >= 0; y--) {
    if (newGrid[y].every((cell) => cell !== 0)) {
      newGrid.splice(y, 1);
      newGrid.unshift(Array.from({ length: 10 }, () => 0));
      linesCleared++;
      y++; // Check the same row again
    }
  }

  return { newGrid, linesCleared };
};

export const rotatePiece = (piece: TetrisPiece): TetrisPiece => {
  const rotations = TETROMINOES[piece.type];
  const nextRotation = (piece.rotation + 1) % rotations.length;

  return {
    ...piece,
    shape: rotations[nextRotation],
    rotation: nextRotation,
  };
};

export const getGridWithPiece = (grid: number[][], piece: TetrisPiece | null): number[][] => {
  if (!piece) return grid;

  const newGrid = grid.map((row) => [...row]);
  const typeValue = getTypeValue(piece.type);

  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x] !== 0) {
        const gridY = piece.position.y + y;
        const gridX = piece.position.x + x;
        if (gridY >= 0 && gridY < 21 && gridX >= 0 && gridX < 10) {
          newGrid[gridY][gridX] = typeValue;
        }
      }
    }
  }
  return newGrid;
};

export const calculateScore = (linesCleared: number, level: number): number => {
  const baseScores = [0, 40, 100, 300, 1200];
  return baseScores[linesCleared] * (level + 1);
};

export const getTypeValue = (type: TetrominoType): number => {
  const typeMap: Record<TetrominoType, number> = {
    I: 1,
    O: 2,
    T: 3,
    S: 4,
    Z: 5,
    J: 6,
    L: 7,
  };
  return typeMap[type];
};

export const getDropSpeed = (level: number): number => {
  return Math.max(50, 1000 / Math.pow(1.5, level));
};
