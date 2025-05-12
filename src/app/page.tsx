'use client';

import Level from '../components/display/levelDisplay';
import NextShape from '../components/display/nextShapeDisplay';
import PlayFieldDisplay from '../components/display/playFieldDisplay';
import Point from '../components/display/pointDisplay';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <div className={styles.title}>TETRIS</div>
      <div className={styles.container}>
        <div className={styles.left}>
          <PlayFieldDisplay />
        </div>
        <div className={styles.right}>
          <NextShape />
          <Level />
          <Point />
        </div>
      </div>
      <div className={styles.footer}>F5ボタンでリセットできます。</div>
    </>
  );
}
