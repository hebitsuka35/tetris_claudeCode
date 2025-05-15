'use client';

import { useCallback, useEffect, useState } from 'react';
import styles from '../../app/page.module.css';
import { shapeIPlayField } from '../shapes/shapePlayField';

const PlayFieldDisplay = () => {
  const [playField, setPlayField] = useState<number[][]>(shapeIPlayField());
  const [downShapeCount, setDownShapeCount] = useState<number>(0);

  const downShape = useCallback(
    (event: KeyboardEvent) => {
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
    [downShapeCount],
  );

  const leftShape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        const canMoveLeft = playField.every((row) => row[0] === 0);
        if (!canMoveLeft) {
          return;
        }
        setPlayField((prevField) => {
          const newField = prevField.map((row) => {
            const newRow = [...row];
            newRow.shift();
            newRow.push(0);
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
    return () => {
      window.removeEventListener('keydown', downShape);
      window.removeEventListener('keydown', leftShape);
    };
  }, [downShape, leftShape]);

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
