const { User_URL } = require("../../models");
const DOMAIN = process.env.DOMAIN;
const URL_PKG = require("url").URL;

function isMyURLValid(URL) {
  try {
    const checkMyURL = new URL_PKG(URL);
    if (checkMyURL) return true;
  } catch (err) {
    return false;
  }
}

function ShrinkMyLongURLPlease(longURL, length) {
  try {
    let uniqChar = "";
    let shortURL = DOMAIN;

    const urlValid = isMyURLValid(longURL);

    if (urlValid === false) return ["", "", false];

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * 63);
      const genRandomChar = RANDOM_CHARS[randomIndex];
      uniqChar += genRandomChar;
    }

    shortURL += uniqChar;
    return [uniqChar, shortURL, true];
  } catch (error) {
    console.error(error);
  }
}

async function ShrinkAgainPlease(VeryLongURL) {
  try {
    const newUniqueChar = ShrinkMyLongURLPlease(VeryLongURL);

    const IS_EXIST = await User_URL.findOne({
      where: { uniqchar: newUniqueChar },
    });

    if (!IS_EXIST) return newUniqueChar;
    else ShrinkAgainPlease(VeryLongURL);
  } catch (error) {
    console.error(error);
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

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
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

module.exports = {
  ShrinkMyLongURLPlease,
  ShrinkAgainPlease,
  RANDOM_CHARS,
};
