'use client';

import Level from '../components/display/levelDisplay';
import NextShape from '../components/display/nextShapeDisplay';
import playField from '../components/display/playFieldDisplay';
import Point from '../components/display/pointDisplay';
import Reset from '../utils/reset';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <h1>Tetris</h1>
      <div className={styles.container}>
        <div className={styles.left}>
          <h1>{playField}</h1>
        </div>
        <div className={styles.right}>
          <NextShape />
          <Level />
          <Point />
          <Reset />
        </div>
      </div>
    </>
  );
}
