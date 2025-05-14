"use client"

import { useEffect, useState } from 'react';
import styles from '../../app/page.module.css';
import { shapeIPlayField } from '../shapes/shapePlayField';

const PlayFieldDisplay = () => {
  const [playField,setPlayField] = useState(shapeIPlayField());
  const [downShapeCount,setDownShapeCount] = useState(0);

  
  const downShape = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      setPlayField((prevField) => {
        if(downShapeCount < 3){
          const newField = [...prevField];
          newField.pop();
          newField.unshift(new Array(10).fill(0));
          setDownShapeCount((prevCount) => prevCount + 1);
          return newField;
        }
        return prevField;
        });
      }
    };

  useEffect(() => {
    window.addEventListener('keydown', downShape);
    return () => {
      window.removeEventListener('keydown', downShape);
    };
  }, []);

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
