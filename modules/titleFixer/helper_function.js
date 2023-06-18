const { capsMe, lowerMe } = require('../general_function_helper');

const capsTheFirstRepetition = (repetitiveWord) => {
  // This condition is to capitalize the word in repetition words.

  const splittedWords = lowerMe(repetitiveWord).split('-');
  const [left, right] = splittedWords;

  // This condition is to capitalize the first and second words in repetition words.
  if (left === right)
    return splittedWords.map((element) => capsMe(element)).join('-');

  // This condition is to capitalize the first word in repetition words.
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

const fixMyTitle = (myTitle) => {
  const standardizedTitle = standardizedGeneralFormat(myTitle);

  // This function fix the capitalization of the repetition words, join, and return it
  return standardizedTitle
    .map((element) =>
      !element.includes('-') ? element : capsTheFirstRepetition(element)
    )
    .join(' ');
};

exports.titleFixerService = (judul) => fixMyTitle(judul);
