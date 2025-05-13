import generateNextShape from '../utils/generateNextShape';

const nextShapeI = () => {
  const nextShapeI = generateNextShape();

  nextShapeI[3][0] = 1;
  nextShapeI[3][1] = 1;
  nextShapeI[3][2] = 1;
  nextShapeI[3][3] = 1;

  return nextShapeI;
};

export { nextShapeI };
