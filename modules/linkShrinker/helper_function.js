const joi = require('joi');
const isEmpty = require('lodash/isEmpty');
const { RANDOM_CHARS } = require('../../constant/urlShrinker');
const { shrinkUrl } = require('../../database/executor');
const DOMAIN = process.env.DOMAIN;

function isMyURLValid(URL) {
  const schemaUri = joi.string().uri().required();
  const validateUri = schemaUri.validate(URL);
  if (validateUri.error) return false;
  return true;
}

async function deleteTheUrlById(id) {
  const deletedId = await shrinkUrl.deleteURLById(id);
  return deletedId;
}

async function isUniqueCharsExist(uniqChars) {
  const isExist = await shrinkUrl.isUnixCharactersExist(uniqChars);
  if (isEmpty(isExist)) return false;
  const [dataFromDB] = isExist;
  const { uniquechar, hit } = dataFromDB;

  // update the hit column whenever the link clicked or accessed
  const queryUpdate = { uniquechar, hit: hit + 1 };

  await shrinkUrl.updateHitUniqueCharacter(queryUpdate);
  return isExist;
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
  let isDuplicate = await shrinkUrl.isUnixCharactersExist(uniqueCharacters);
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

async function processAndValidateMyCustomUrl(longURL, customPrefix) {
  let customUrl;
  let notifDuplicate;
  let isDuplicate = await shrinkUrl.isUnixCharactersExist(customPrefix);

  const urlValidity = isMyURLValid(longURL);

  if (isDuplicate.length) {
    customUrl = `${DOMAIN}${isDuplicate[0].uniquechar}`;
    notifDuplicate = true;
  } else {
    customUrl = `${DOMAIN}${customPrefix}`;
    if (urlValidity) await saveToDB(longURL, customPrefix);
  }

  return [customUrl, urlValidity, notifDuplicate];
}

module.exports = {
  ShrinkMyLongURLPlease,
  saveToDB,
  checkMyUniqChars,
  processAndValidateMyCustomUrl,
  isUniqueCharsExist,
  getAllData,
  deleteTheUrlById
};
