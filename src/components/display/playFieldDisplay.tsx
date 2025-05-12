import styles from '../../app/page.module.css';

const PlayFieldDisplay = () => {
  //Tetrisの初期プレイフィールドを意味する。
  const playFieldRows: number = 20;
  const playFieldColumns: number = 10;
  const playField: number[][] = Array.from({ length: playFieldRows }, () =>
    Array.from({ length: playFieldColumns }, () => 0),
  );

  return (
    <>
      <div className={styles.playField}>
        {playField.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={styles.cell}
              style={{ backgroundColor: cell === 0 ? 'white' : 'gray' }}
            />
          )),
        )}
      </div>
    </>
  );
};

export default PlayFieldDisplay;
