const { User_URL } = require('../../models');
const DOMAIN = process.env.DOMAIN;
const URL_PKG = require('url').URL;

function isMyURLValid(URL) {
  try {
    const checkMyURL = new URL_PKG(URL);
    if (checkMyURL) return true;
  } catch (err) {
    return false;
  }
}

async function getAllFromDB() {
  try {
    const getAll = await User_URL.findAll({
      raw: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    let dataArr = getAll.slice();
    for (let el of dataArr) el.shortURL = DOMAIN + el.uniqchar;

    return dataArr;
  } catch (error) {
    console.error(error);
  }
}

async function isUniqueCharsExist(uniqChars) {
  try {
    const isExist = await User_URL.findOne({
      where: { uniqchar: uniqChars },
      raw: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    if (!isExist) return false;

    // update the hit column whenever the link clicked or accessed
    const queryUpdate = {
      hit: isExist.hit + 1,
    };

    await User_URL.update(queryUpdate, { where: { uniqchar: uniqChars } });
    return isExist;
  } catch (error) {
    console.error(error);
  }
}

function ShrinkMyLongURLPlease(longURL, length) {
  try {
    let uniqChar = '';
    let shortURL = DOMAIN;

    const urlValid = isMyURLValid(longURL);
    if (urlValid === false) return ['', '', false];

    const totalChars = RANDOM_CHARS.length;

    // length of the unique character defined in file .env
    for (let i = 0; i < length; i++) {
      uniqChar += RANDOM_CHARS[Math.floor(Math.random() * totalChars)];
    }

    shortURL += uniqChar;

    return [uniqChar, shortURL, true];
  } catch (error) {
    console.error(error);
  }
}

async function checkMyUniqChars(
  longURL,
  UNIQ_LEN_LINK,
  uniqueCharacters,
  urlArray
) {
  try {
    let isDuplicate = await User_URL.findOne({
      where: { uniqchar: uniqueCharacters },
      raw: true,
      attributes: {
        exclude: ['original', 'hit', 'createdAt', 'updatedAt'],
      },
    });

    if (isDuplicate !== null) {
      const shrinkedAgain = ShrinkMyLongURLPlease(longURL, UNIQ_LEN_LINK);
      const newUniqChars = shrinkedAgain[0];

      // return recursive until get a new unique set of chars
      // ALWAYS RETURNED RECUSIVE OR YOU WILL GET UNDEFINED
      return await checkMyUniqChars(
        longURL,
        UNIQ_LEN_LINK,
        newUniqChars,
        shrinkedAgain
      );
    }

    if (isDuplicate === null) return urlArray;
  } catch (error) {
    console.error(error);
  }
}

async function saveToDB(longURL, uniqueChars) {
  try {
    let data = {
      original: longURL,
      uniqchar: uniqueChars,
      hit: 0,
    };

    // Create data to database
    await User_URL.create(data);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
// }

const RANDOM_CHARS = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

module.exports = {
  ShrinkMyLongURLPlease,
  saveToDB,
  checkMyUniqChars,
  isUniqueCharsExist,
  getAllFromDB,
};
