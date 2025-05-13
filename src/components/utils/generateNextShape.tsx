const generateNextShape = () => {
  const nextShapeRows: number = 4;
  const nextShapeColumns: number = 4;
  const nextShape: number[][] = Array.from({ length: nextShapeRows }, () =>
    Array.from({ length: nextShapeColumns }, () => 0),
  );
  return nextShape;
};

export default generateNextShape;
