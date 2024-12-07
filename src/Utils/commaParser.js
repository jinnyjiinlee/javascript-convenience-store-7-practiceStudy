export const commaParser = (values) => {
  const parseComma = values.split(',').map((value) => value.trim());

  const deleteSquareBracket = [];
  for (let array of parseComma) {
    const parsedArray = array.replace('[', '').replace(']', '');
    deleteSquareBracket.push(parsedArray.split('-'));
  }

  return deleteSquareBracket;
};
