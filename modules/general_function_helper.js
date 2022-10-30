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

module.exports = sorting;
