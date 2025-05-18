'use client';

import { useCallback, useEffect, useState } from 'react';
import styles from '../../app/page.module.css';
import { shape1PlayField } from '../shapes/shapePlayField';

const PlayFieldDisplay = () => {
  const [playField, setPlayField] = useState<number[][]>(shape1PlayField());
  const [downShapeCount, setDownShapeCount] = useState<number>(0);

  const directions: number[][] = [
    [0, 1], //下
  ];

  const hasShapeBottom = (playField: number[][]): boolean => {
    for (let x = 0; x < playField[0].length, x++; ) {
      if (playField[playField.length - 1][x] === 1) {
        return true;
      }
    }
    return false;
  };

  const downShape = useCallback(
    (event: KeyboardEvent) => {
      if (hasShapeBottom(playField)) return 0;
      if (event.key === 'ArrowDown' && downShapeCount < 19) {
        setPlayField((prevField) => {
          const newField = [...prevField];
          newField.pop();
          newField.unshift(new Array(10).fill(0) as number[]);
          return newField;
        });
        setDownShapeCount((prevCount) => prevCount + 1);
      }
    },
    [downShapeCount, playField],
  );

  const leftShape = useCallback((event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      setPlayField((prevField) => {
        for (const row of prevField) {
          if (row[0] !== 0) {
            return prevField;
          }
        }
        const newField = prevField.map((row) => {
          const newRow = [...row];
          newRow.shift();
          newRow.push(0);
          return newRow;
        });
        return newField;
      });
    }
  }, []);

  const rightShape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        for (const row of playField) {
          if (row[9] !== 0) {
            return;
          }
        }
        setPlayField((prevField) => {
          const newField = prevField.map((row) => {
            const newRow = [...row];
            newRow.pop();
            newRow.unshift(0);
            return newRow;
          });
          return newField;
        });
      }
    },
    [playField],
  );

  useEffect(() => {
    window.addEventListener('keydown', downShape);
    window.addEventListener('keydown', leftShape);
    window.addEventListener('keydown', rightShape);
    document.addEventListener('keydown', function (event) {
      event.preventDefault();
    });
    return () => {
      window.removeEventListener('keydown', downShape);
      window.removeEventListener('keydown', leftShape);
      window.removeEventListener('keydown', rightShape);
    };
  }, [downShape, leftShape, rightShape]);

  return (
    <>
      <div className={styles.playField}>
        {playField.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={styles.cell}
              style={{ backgroundColor: cell === 0 ? 'white' : 'lightgray' }}
            />
          )),
        )}
      </div>
    </>
  );
};

export default PlayFieldDisplay;
