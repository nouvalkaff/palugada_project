const URL_PKG = require('url').URL;
const isEmpty = require('lodash/isEmpty');
const { RANDOM_CHARS } = require('../../constant/urlShrinker');
const { shrinkUrl } = require('../../database/executor');
const DOMAIN = process.env.DOMAIN;

function isMyURLValid(URL) {
  try {
    const checkMyURL = new URL_PKG(URL);
    if (URL === checkMyURL.href) return true;
  } catch (error) {
    return false;
  }
}

async function isUniqueCharsExist(uniqChars) {
  try {
    const isExist = await User_URL.findOne({
      where: { uniqchar: uniqChars },
      raw: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    });

    if (!isExist) return false;

    // update the hit column whenever the link clicked or accessed
    const queryUpdate = { hit: isExist.hit + 1 };

    await User_URL.update(queryUpdate, { where: { uniqchar: uniqChars } });
    return isExist;
  } catch (error) {
    console.error(error);
  }
}

function ShrinkMyLongURLPlease(longURL, length) {
  try {
    const urlValid = isMyURLValid(longURL);
    if (urlValid === false) return ['', '', false];

    let uniqChar = '';
    let shortURL = DOMAIN;

    const totalChars = RANDOM_CHARS.length;
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
  uniqueCharLength,
  uniqueCharacters,
  urlArray
) {
  let isDuplicate = await shrinkUrl.isUniqueCharsExist(uniqueCharacters);
  if (isEmpty(isDuplicate)) return urlArray;

  const shrinkedAgain = ShrinkMyLongURLPlease(longURL, uniqueCharLength);
  const [newUniqChars] = shrinkedAgain;

  // return recursive until get a new unique set of chars
  // ALWAYS RETURNED RECUSIVE OR YOU WILL GET UNDEFINED
  return await checkMyUniqChars(
    longURL,
    uniqueCharLength,
    newUniqChars,
    shrinkedAgain
  );
}

async function saveToDB(longURL, uniqueChars) {
  try {
    await shrinkUrl.saveDataToDB({
      originalLink: longURL,
      uniqueChar: uniqueChars,
      hit: 0
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function getAllData() {
  return shrinkUrl.getAllDataFromShrinkURL();
}

module.exports = {
  ShrinkMyLongURLPlease,
  saveToDB,
  checkMyUniqChars,
  isUniqueCharsExist,
  getAllData
};
