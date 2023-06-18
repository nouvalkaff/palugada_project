const { capsMe, lowerMe } = require('../general_function_helper');
const { particleWords } = require('../../constant/titleFixer');

let count = 0;

const capsTheFirstRepetition = (repetitiveWord) => {
  // This function is to capitalize the word in repetition words
  const splittedWords = lowerMe(repetitiveWord).split('-');
  const [left, right] = splittedWords;

  // This condition is to capitalize the first and second words in repetition words
  if (right.includes(left)) {
    return splittedWords.map((element) => capsMe(element)).join('-');
  }

  // This condition is to capitalize the first word in repetition words
  return splittedWords
    .map((element, index) => (!index ? capsMe(element) : element))
    .join('-');
};

const standardizedGeneralFormat = (myTitle) => {
  // This function is to standardize the title format
  // Standardization: unite the space separated repetition words
  const splitTitle = myTitle.split(' ');

  let getRepetitiveWord = [];
  let newTitleArray = [];

  for (let i = 0; i < splitTitle.length; i++) {
    if (
      splitTitle[i + 1] === '-' ||
      splitTitle[i] === '-' ||
      splitTitle[i - 1] === '-'
    ) {
      getRepetitiveWord.push(splitTitle[i]);

      if (getRepetitiveWord.length === 3) {
        const joinedWord = getRepetitiveWord.join('');
        newTitleArray.push(joinedWord);
        getRepetitiveWord = [];
      }
    } else {
      newTitleArray.push(splitTitle[i]);
    }
  }

  // This function returns the splitted standardized title
  return newTitleArray;
};

const checkParticleWords = (words) => {
  if (count === 0) {
    count++;
    return capsMe(words);
  }

  const checkWordCondition = particleWords.includes(lowerMe(words));

  if (!checkWordCondition) return capsMe(words);
  return lowerMe(words);
};

const fixMyTitle = (myTitle) => {
  // This is a main service function to fix queried title
  const standardizedTitle = standardizedGeneralFormat(myTitle);

  // This function fix the capitalization of the repetition words and join
  return standardizedTitle
    .map((element) =>
      !element.includes('-')
        ? checkParticleWords(element)
        : capsTheFirstRepetition(element)
    )
    .join(' ');
};

exports.titleFixerService = (judul) => fixMyTitle(judul);
