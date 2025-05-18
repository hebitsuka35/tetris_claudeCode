import generatePlayField from '../utils/generatePlayField';

const shape1PlayField = () => {
  const shape1PlayField = generatePlayField();
  shape1PlayField[0][4] = 1;

  return shape1PlayField;
};

export { shape1PlayField };
