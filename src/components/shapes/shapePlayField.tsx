import generatePlayField from '../utils/generatePlayField';

const shapeIPlayField = () => {
  const shapeIPlayField = generatePlayField();
  shapeIPlayField[0][3] = 1;
  shapeIPlayField[0][4] = 1;
  shapeIPlayField[0][5] = 1;
  shapeIPlayField[0][6] = 1;

  return shapeIPlayField;
};

export { shapeIPlayField };
