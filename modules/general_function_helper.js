const regexGetFirstLetter = /\b\w/g;

const upperMe = (string) => string.toUpperCase();

const lowerMe = (string) => string.toLowerCase();

const capsMe = (string) =>
  string
    .toLowerCase()
    .replace(regexGetFirstLetter, (caps) => caps.toUpperCase());

const removeDuplicate = (array) => [...new Set(array)];

function array2string(length, array) {
  let resString = "";
  for (let i = 0; i < length; i++) {
    if (i === length - 1) resString += array[i];
    else resString += array[i] + ", ";
  }
  return resString;
}

function sorting(sorttype, number_arr) {
  try {
    return sorttype === "ASC"
      ? quickSortASC(number_arr)
      : quickSortDESC(number_arr);
  } catch (error) {
    console.error(error);
  }
}

function quickSortASC(data) {
  // edge case
  if (data.length <= 1) return data;

  const sortedArr = data.slice();

  const pivot = sortedArr[sortedArr.length - 1];
  const leftArr = [];
  const rightArr = [];

  for (let el of sortedArr.slice(0, data.length - 1)) {
    pivot > el ? leftArr.push(el) : rightArr.push(el);
  }

  return [...quickSortASC(leftArr), pivot, ...quickSortASC(rightArr)];
}

function quickSortDESC(data) {
  // edge case
  if (data.length <= 1) return data;

  const sortedArr = data.slice();

  const pivot = sortedArr[sortedArr.length - 1];
  const leftArr = [];
  const rightArr = [];

  for (let el of sortedArr.slice(0, data.length - 1)) {
    pivot < el ? leftArr.push(el) : rightArr.push(el);
  }

  return [...quickSortDESC(leftArr), pivot, ...quickSortDESC(rightArr)];
}

module.exports = {
  sorting,
  upperMe,
  lowerMe,
  capsMe,
  removeDuplicate,
  array2string,
};
