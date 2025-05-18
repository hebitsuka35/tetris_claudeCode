import generateNextShape from '../utils/generateNextShape';

const nextShape1 = () => {
  const nextShape1 = generateNextShape();

  nextShape1[3][1] = 1;

  return nextShape1;
};

export { nextShape1 };
