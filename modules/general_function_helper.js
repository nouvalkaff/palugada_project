const regexGetFirstLetter = /\b\w/g;

const upperMe = (string) => string.toUpperCase();

const lowerMe = (string) => string.toLowerCase();

const capsMe = (string) =>
  string
    .toLowerCase()
    .replace(regexGetFirstLetter, (caps) => caps.toUpperCase());

const array2string = (array) => String(array).replace(/\,/g, ', ');

function sorting(sorttype, dataInArray) {
  console.log(dataInArray, 'dataInArray');
  return sorttype === 'ASC'
    ? quickSortASC(dataInArray)
    : quickSortDESC(dataInArray);
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

const findDuplicates = (arr) => {
  return arr.filter((item, index) => arr.indexOf(item) !== index);
};

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

const getNewData = (fullArrayInput, resultFromGenerate, totalNeeded) => {
  const filteredAnimalData = fullArrayInput.filter(
    (animal) => !resultFromGenerate.includes(animal)
  );
  const randomizedNewAnimal = shuffle(filteredAnimalData);
  return randomizedNewAnimal.slice(0, totalNeeded);
};

const handleDuplicate = (resultFromGenerate, fullArrayInput) => {
  const totalDuplicate = findDuplicates(resultFromGenerate).length;
  if (totalDuplicate === 0) return resultFromGenerate;
  const newAnimals = getNewData(
    fullArrayInput,
    resultFromGenerate,
    totalDuplicate
  );
  return [...new Set(resultFromGenerate), ...newAnimals];
};

const generateRandomNummber = (maxnum, startNumber) =>
  Math.floor(Math.random() * maxnum + startNumber);

module.exports = {
  sorting,
  upperMe,
  lowerMe,
  capsMe,
  array2string,
  handleDuplicate,
  generateRandomNummber
};
