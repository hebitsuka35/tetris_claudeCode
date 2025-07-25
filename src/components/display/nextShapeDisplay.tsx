import styles from '../../app/page.module.css';
import { TETROMINO_COLORS, TetrisPiece } from '../../types/tetris';

interface NextShapeProps {
  nextPiece: TetrisPiece | null;
}

const NextShape = ({ nextPiece }: NextShapeProps) => {
  const getCellColor = (cellValue: number, pieceType?: string): string => {
    if (cellValue === 0) return 'white';
    if (pieceType && TETROMINO_COLORS[pieceType as keyof typeof TETROMINO_COLORS]) {
      return TETROMINO_COLORS[pieceType as keyof typeof TETROMINO_COLORS];
    }
    return 'lightgray';
  };

  return (
    <>
      <div className={styles.rightElements}>
        <div className={styles.rightElementsTitle}>NEXT SHAPE</div>
        <div className={styles.nextShape}>
          <div className={styles.nextShapeField}>
            {nextPiece ? (
              nextPiece.shape.map((row, y) =>
                row.map((cell, x) => (
                  <div
                    key={`${x}-${y}`}
                    className={styles.cell}
                    style={{ 
                      backgroundColor: getCellColor(cell, nextPiece.type),
                      border: cell === 0 ? '1px solid #ccc' : '1px solid #333'
                    }}
                  />
                )),
              )
            ) : (
              Array.from({ length: 4 }, (_, y) =>
                Array.from({ length: 4 }, (_, x) => (
                  <div
                    key={`${x}-${y}`}
                    className={styles.cell}
                    style={{ backgroundColor: 'white', border: '1px solid #ccc' }}
                  />
                )),
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NextShape;
