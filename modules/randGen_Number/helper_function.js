const { sorting, array2string } = require("../general_function_helper");

const generateNumber = (format) => {
  try {
    let result;

    let { arr, withzero, maxnum, length, sort, sorttype } = format;

    arr = arr === "true";
    withzero = withzero === "true";
    sort = sort === "true";
    maxnum = +maxnum;
    length = +length;

    const numAdd = withzero ? 0 : 1;

    if (arr === true) {
      result = [];
      for (let i = 0; i < length; i++) {
        const randNum = Math.floor(Math.random() * maxnum + numAdd);
        result.push(randNum);
      }

      if (sort === true) result = sorting(sorttype, result);
    }

    if (arr === false) {
      resString = "";
      result = [];
      for (let i = 0; i < length; i++) {
        const randNum = Math.floor(Math.random() * maxnum + numAdd);

        result.push(randNum);
      }

      if (sort === true) {
        result = sorting(sorttype, result);
        result = array2string(result.length, result);
      }
    }

    return result;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { generateNumber };
