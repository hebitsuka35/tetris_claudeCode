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

  useEffect(() => {
    window.addEventListener('keydown', downShape);
    return () => {
      window.removeEventListener('keydown', downShape);
    };
  }, [downShape]);

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
