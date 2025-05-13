import styles from '../../app/page.module.css';
import generatePlayField from '../utils/generatePlayField';

const PlayFieldDisplay = () => {
  const playField = generatePlayField();

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
