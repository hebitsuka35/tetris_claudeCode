import styles from '../../app/page.module.css';

const NextShapeI = () => {
  const nextShapeRows: number = 4;
  const nextShapeColumns: number = 4;
  const nextShapeI: number[][] = Array.from({ length: nextShapeRows }, () =>
    Array.from({ length: nextShapeColumns }, () => 0),
  );

  nextShapeI[3][0] = 1;
  nextShapeI[3][1] = 1;
  nextShapeI[3][2] = 1;
  nextShapeI[3][3] = 1;

  return (
    <>
      <div className={styles.nextShapeField}>
        {nextShapeI.map((row, y) =>
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

export default NextShapeI;
