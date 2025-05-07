'use client';

import styles from './page.module.css';
import playField from '../components/display/playFieldDisplay'

export default function Home() {

  return (
    <>
      <h1>Tetris</h1>
      <div className={styles.container}>
        <div className={styles.left}>
          <h1>Left{playField}</h1>
        </div>
        <div className={styles.right}>
          <h1>Right</h1>
        </div>
      </div>
    </>
  );
}
