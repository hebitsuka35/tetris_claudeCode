import styles from '../../app/page.module.css';
import { nextShape1 } from '../shapes/nextShape';

const NextShape = () => {
  const nextShape = nextShape1();

  return (
    <>
      <div className={styles.rightElements}>
        <div className={styles.rightElementsTitle}>NEXT SHAPE</div>
        <div className={styles.nextShape}>
          <div className={styles.nextShapeField}>
            {nextShape.map((row, y) =>
              row.map((cell, x) => (
                <div
                  key={`${x}-${y}`}
                  className={styles.cell}
                  style={{ backgroundColor: cell === 0 ? 'white' : 'lightgray' }}
                />
              )),
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NextShape;
