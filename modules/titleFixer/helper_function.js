const { capsMe, lowerMe } = require('../general_function_helper');

const capsTheFirstRepetition = (repetitiveWord) => {
  // This function is to capitalize the first word in repetition words.
  return lowerMe(repetitiveWord)
    .split('-')
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
