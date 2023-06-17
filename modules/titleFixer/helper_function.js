const { capsMe } = require('../general_function_helper');

const capsTheFirstRepetition = (repetitiveWord) => {
  return repetitiveWord
    .toLowerCase(repetitiveWord)
    .split('-')
    .map((element, index) => (!index ? capsMe(element) : element))
    .join('-');
};

const standardizedGeneralFormat = (myTitle) => {
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
        newTitleArray.push(
          getRepetitiveWord
            .map((element, index) => (!index ? capsMe(element) : element))
            .join('')
        );
        getRepetitiveWord = [];
      }
    } else {
      newTitleArray.push(splitTitle[i]);
    }
  }

  return newTitleArray;
};

const fixMyTitle = (myTitle) => {
  return standardizedGeneralFormat(myTitle)
    .map((element) =>
      !element.includes('-') ? capsMe(element) : capsTheFirstRepetition(element)
    )
    .join(' ');
};

exports.titleFixerService = (judul) => fixMyTitle(judul);
