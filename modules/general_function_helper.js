const { bullets, commands } = require('../constant/commitMaker');
const { arrowTail0, arrowTail1, arrowTail2, point } = bullets;
const { COMMIT_COMMAND, NEXT_MESSAGE } = commands;

const regexGetFirstLetter = /\b\w/g;

const upperMe = (string) => string.toUpperCase();

const lowerMe = (string) => string.toLowerCase();

const capsMe = (string) =>
  string
    .toLowerCase()
    .replace(regexGetFirstLetter, (caps) => caps.toUpperCase());

const array2string = (array) => String(array).replace(/\,/g, ', ');

function sorting(sorttype, dataInArray) {
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

const bulletPointHandler = (bullet) => {
  let bulletPoint;

  if (bullet === 'arrowTail0') bulletPoint = arrowTail0;
  else if (bullet === 'arrowTail1') bulletPoint = arrowTail1;
  else if (bullet === 'arrowTail2') bulletPoint = arrowTail2;
  else if (bullet === 'point') bulletPoint = point;
  else bulletPoint = false;

  return bulletPoint;
};

const commitMessageHandler = (object) => {
  let { bullet, commitMessage, headMessage } = object;
  const commitValues = Object.values(commitMessage);

  let commitResult = '';
  let counter = 1;
  let bulletUsed;

  if (!bullet) bulletUsed = counter;

  if (bullet && bullet !== 'number') {
    bulletUsed = bulletPointHandler(bullet);
  }

  if (bulletUsed === false || bullet === 'number') {
    bulletUsed = counter;
    bullet = 'number';
  }

  if (headMessage) commitResult += `${COMMIT_COMMAND} -m '${headMessage}'`;
  else commitResult += `${COMMIT_COMMAND}`;

  commitValues.forEach((each) => {
    if (!each) return;
    commitResult += NEXT_MESSAGE.replace('$', `${bulletUsed} ${each}`);
    if (!bullet || bullet === 'number') bulletUsed += 1;
  });

  commitResult += ' ';
  return [commitResult, commitValues.length];
};

module.exports = {
  array2string,
  capsMe,
  commitMessageHandler,
  generateRandomNummber,
  handleDuplicate,
  lowerMe,
  upperMe,
  sorting
};
