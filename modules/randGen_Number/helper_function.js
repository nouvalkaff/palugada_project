const {
  sorting,
  array2string,
  handleDuplicate,
  generateRandomNummber
} = require('../general_function_helper');

const generateNumber = (format) => {
  let result = [];
  let { random, arr, withzero, maxnum, sort, sorttype, length, allowduplic } =
    format;

  random = +random;
  withzero = +withzero;
  maxnum = +maxnum;
  arr = +arr;
  sort = +sort;
  length = +length;
  allowduplic = +allowduplic;

  const startNumber = withzero === 1 ? 0 : 1;

  if (random === 1)
    for (let i = 0; i < length; i++) {
      result.push(generateRandomNummber(maxnum, startNumber));

      // If maxnum > length, it able to activate the duplicate handler
      if (maxnum >= length && allowduplic === 0) {
        let fullNumberOrder = [];
        for (let i = startNumber; i <= maxnum; i++) fullNumberOrder.push(i);
        result = handleDuplicate(result, fullNumberOrder);
      }
    }

  if (random === 0) for (let i = startNumber; i <= maxnum; i++) result.push(i);
  if (sort === 1) result = sorting(sorttype, result);
  if (arr === 0) result = array2string(result);
  return result;
};

module.exports = { generateNumber };
