import { useEffect } from 'react';
import styles from '../../app/page.module.css';
import downShapeFn from '../utils/downShapeFn';
import generatePlayField from '../utils/generatePlayField';

const PlayFieldDisplay = () => {
  const playField = generatePlayField();

  const downShape = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      downShapeFn();
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
