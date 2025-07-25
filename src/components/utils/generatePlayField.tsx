const generatePlayField = () => {
  //Tetrisの初期プレイフィールドを意味する。
  const playFieldRows: number = 21;
  const playFieldColumns: number = 10;
  const playField: number[][] = Array.from({ length: playFieldRows }, () =>
    Array.from({ length: playFieldColumns }, () => 0),
  );
  return playField;
};

export default generatePlayField;
