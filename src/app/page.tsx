'use client';

import styles from './page.module.css';

export default function Home() {
  //Tetrisの初期プレイフィールドを意味する。
  const playFieldRows: number = 20;
  const playFieldColumns: number = 10;
  const playField: number[][] = new Array(playFieldRows)
    .fill(0)
    .map(() => new Array(playFieldColumns).fill(0));

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
