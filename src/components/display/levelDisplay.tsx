import styles from '../../app/page.module.css';

interface LevelProps {
  level: number;
}

const Level = ({ level }: LevelProps) => {
  return (
    <>
      <div className={styles.rightElements}>
        <div className={styles.rightElementsTitle}>LEVEL</div>
        <div className={styles.level}>{level + 1}</div>
      </div>
    </>
  );
};

export default Level;
