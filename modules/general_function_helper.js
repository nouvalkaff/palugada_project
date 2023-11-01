const Joi = require('joi');
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

const getIdnYear = (time) => {
  const regex = /[0-9]{4}/;

  const year = String(time).match(regex);

  if (!year) throw 'No year found from the time string';

  return +year[0];
};

const formatNumber = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

const toInt = (input) => {
  if (String(+input) === 'NaN') throw 'Input must be all number';
  return +input;
};

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

const generateRandomNumber = (maxnum, startNumber) =>
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
  let { bullet, commitMessage, headMessage, oneLiner } = object;
  const commitValues = Object.values(commitMessage);

  let commitResult = '';
  let counter = 1;
  let bulletUsed;

  if (bullet && bullet !== 'number') {
    bulletUsed = bulletPointHandler(bullet);
  }

  if (!bullet || bulletUsed === false || bullet === 'number') {
    bulletUsed = counter;
    bullet = 'number';
  }

  if (oneLiner === '0' && headMessage) {
    commitResult += `${COMMIT_COMMAND} -m '${headMessage}'`;
  } else if (oneLiner === '0' && !headMessage) {
    commitResult += `${COMMIT_COMMAND}`;
  } else if (oneLiner === '1' && headMessage) {
    commitResult += ` -m '${headMessage}'`;
  }

  commitValues.forEach((each) => {
    if (!each) return;
    commitResult += NEXT_MESSAGE.replace('$', `${bulletUsed} ${each}`);
    if (!bullet || bullet === 'number') bulletUsed += 1;
  });

  if (oneLiner === '0') commitResult += ' ';
  return [commitResult, commitValues.length];
};

const issueKeyValidator = (key) => {
  const regex = /^[a-zA-Z]{1,3}-[\d]{1,5}$/g;
  if (!regex.test(String(key)))
    throw 'Issue key input is not valid for PT DAnS Multi Pro standard format';
  return true;
};

const payloadValidator = (object) => {
  const { branch, bullet, detailComment, headComment, issueKey, time } = object;
  let { transition } = object;

  let errorMessage = 'Payload $ cannot be empty';

  if (!branch) errorMessage = errorMessage.replace('$', 'branch');
  if (!detailComment) errorMessage = errorMessage.replace('$', 'detailComment');
  if (!headComment) errorMessage = errorMessage.replace('$', 'headComment');
  if (!issueKey) errorMessage = errorMessage.replace('$', 'issueKey');
  if (!time) errorMessage = errorMessage.replace('$', 'time');

  if (!transition) transition = '';
  else transition = ` ${transition}`;

  const isError = errorMessage.includes('$');

  if (!isError) throw errorMessage;
  return transition;
};

const headerHandler = (header) => `#comment ${header}`;

const smartCommitHandler = (object) => {
  /**
   * $1 = issue key
   * $2 = time
   * $3 = header
   * $4 = detail comments
   * $5 = transition command
   * $6 = branch name
   */

  let firstLoop = true;
  let issueKeyCollections = '';
  let timeCollections = '#time';
  let commentCollections = '';
  let counter = '1.';
  let bulletUsed;
  let commitMessages =
    "git add . && git commit -m '$1$2$3' $4$5 && git push origin $6";

  const { branch, detailComment, headComment } = object;
  let { bullet } = object;
  const { issueKey, time, header } = headComment;

  const transitionHandler = payloadValidator({ ...object, ...headComment });

  issueKey.forEach((element) => {
    issueKeyValidator(element);
    if (firstLoop) issueKeyCollections += `${element}`;
    else issueKeyCollections += ` ${element}`;
    firstLoop = false;
  });

  const timeFormatValue = Object.entries(time);

  timeFormatValue.forEach((element) => {
    const [format, value] = element;
    if (value) {
      if (format === 'days') timeCollections += ` ${value}d`;
      if (format === 'hours') timeCollections += ` ${value}h`;
      if (format === 'minutes') timeCollections += ` ${value}m`;
    }
  });

  const detailCommentCollections = Object.values(detailComment);
  firstLoop = true;

  if (bullet && bullet !== 'number') {
    bulletUsed = bulletPointHandler(bullet);
  }

  if (!bullet || bulletUsed === false || bullet === 'number') {
    bulletUsed = counter;
    bullet = 'number';
  }

  detailCommentCollections.forEach((element) => {
    if (!element) return;

    if (element && firstLoop) {
      commentCollections += `-m '${bulletUsed} ${element}'`;
    } else {
      commentCollections += ` -m '${bulletUsed} ${element}'`;
    }

    if (!bullet || bullet === 'number') bulletUsed = `${+bulletUsed + 1}.`;

    firstLoop = false;
  });

  commitMessages = commitMessages
    .replace('$1', issueKeyCollections)
    .replace('$2', ` ${timeCollections}`)
    .replace('$3', ` ${headerHandler(header)}`)
    .replace('$4', `${commentCollections}`)
    .replace('$5', `${transitionHandler}`)
    .replace('$6', branch);

  return commitMessages;
};

const nameErrorMessage =
  'Cek kembali input nama anda. Nama harus terdiri dari 3 - 50 huruf.';

const emailErrorMessage = 'Format email salah, cek kembali email anda.';

const phoneNumErrorMessage =
  'Format nomor telpon salah. Harus terdiri dari 9 - 13 angka dan tidak boleh memiliki huruf / tambahan karakter.';

const errorMessageSimplifier = (error) => {
  const detailErr = error.message;
  if (detailErr.includes('/^[a-zA-Z]{3,50}$/')) return nameErrorMessage;
  if (detailErr.includes('must be a valid email')) return emailErrorMessage;
  if (detailErr.includes('/^[0-9]{9,13}$/')) return phoneNumErrorMessage;
  return detailErr;
};

const validateUserFidyah = (object) => {
  const schema = Joi.object({
    name: Joi.string()
      .pattern(/^[a-zA-Z]{3,50}$/)
      .required(),
    email: Joi.string().email().required(),
    phone_num: Joi.string()
      .pattern(/^[0-9]{9,13}$/)
      .required()
  });

  const isNotValid = schema.validate(object).error;

  if (isNotValid) throw new Error(errorMessageSimplifier(isNotValid));
  return true;
};

const queryInFormatter = (query) => `${query.replace(/\,/g, ', ')}`;

module.exports = {
  array2string,
  capsMe,
  commitMessageHandler,
  formatNumber,
  generateRandomNumber,
  getIdnYear,
  handleDuplicate,
  lowerMe,
  queryInFormatter,
  shuffle,
  smartCommitHandler,
  sorting,
  toInt,
  upperMe,
  validateUserFidyah
};
