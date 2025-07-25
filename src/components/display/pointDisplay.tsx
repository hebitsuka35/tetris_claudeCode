import styles from '../../app/page.module.css';

interface PointProps {
  score: number;
}

const Point = ({ score }: PointProps) => {
  return (
    <>
      <div className={styles.rightElements}>
        <div className={styles.rightElementsTitle}>POINT</div>
        <div className={styles.point}>{score.toLocaleString()}</div>
      </div>
    </>
  );
};

export default Point;
