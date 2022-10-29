function sorting(sorttype, number_arr) {
  try {
    return sorttype === "ASC"
      ? quickSortASC(number_arr)
      : quickSortDESC(number_arr);
  } catch (error) {
    console.error(error);
  }
}

function quickSortASC(num) {
  // edge case
  if (num.length <= 1) return num;

  const sortedArr = num.slice();

  const pivot = sortedArr[sortedArr.length - 1];
  const leftArr = [];
  const rightArr = [];

  for (let el of sortedArr.slice(0, num.length - 1)) {
    pivot > el ? leftArr.push(el) : rightArr.push(el);
  }

  return [...quickSortASC(leftArr), pivot, ...quickSortASC(rightArr)];
}

function quickSortDESC(num) {
  // edge case
  if (num.length <= 1) return num;

  const sortedArr = num.slice();

  const pivot = sortedArr[sortedArr.length - 1];
  const leftArr = [];
  const rightArr = [];

  for (let el of sortedArr.slice(0, num.length - 1)) {
    pivot < el ? leftArr.push(el) : rightArr.push(el);
  }

  return [...quickSortDESC(leftArr), pivot, ...quickSortDESC(rightArr)];
}

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

        for (let i = 0; i < length; i++) {
          const eachNo = result[i];
          if (i === length - 1) resString += eachNo;
          else resString += eachNo + ", ";
        }

        result = resString;
      }
    }

    return result;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { generateNumber };
