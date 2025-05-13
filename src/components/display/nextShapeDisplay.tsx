import styles from '../../app/page.module.css';
import NextShapeI from '../shapes/nextShapeI';

const NextShape = () => {
  return (
    <>
      <div className={styles.rightElements}>
        <div className={styles.rightElementsTitle}>NEXT SHAPE</div>
        <div className={styles.nextShape}>
          <NextShapeI />
        </div>
      </div>
    </>
  );
};

export default NextShape;
