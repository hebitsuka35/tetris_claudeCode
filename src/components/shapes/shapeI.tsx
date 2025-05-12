const shapeI = () => {
  const playFieldRows: number = 20;
  const playFieldColumns: number = 10;
  const playField: number[][] = Array.from({ length: playFieldRows }, () =>
    Array.from({ length: playFieldColumns }, () => 0),
  );
  playField[0][3] = 1;
  playField[0][4] = 1;
  playField[0][5] = 1;
  playField[0][6] = 1;

  return playField;
};

export default shapeI;
