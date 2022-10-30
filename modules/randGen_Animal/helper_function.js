const { animals } = require("./animals_name");
const sorting = require("../general_function_helper");
const regexGetFirstLetter = /\b\w/g;

const upperMe = (string) => string.toUpperCase();
const lowerMe = (string) => string.toLowerCase();
const capsMe = (string) =>
  string
    .toLowerCase()
    .replace(regexGetFirstLetter, (caps) => caps.toUpperCase());

function generateAnimal(format) {
  let { arr, length, sort, sorttype, letter, duplic } = format;

  arr = arr === "true";
  duplic = duplic === "true";
  sort = sort === "true";
  length = +length;

  if (length > animals.length) return animals.length;

  let result = [];
  let resString = "";

  while (result.length < length) {
    const index = Math.floor(Math.random() * animals.length);

    if (letter === "upper") result.push(upperMe(animals[index]));

    if (letter === "lower") result.push(lowerMe(animals[index]));

    if (letter === "caps") result.push(capsMe(animals[index]));

    if (duplic === false) result = [...new Set(result)];
  }

  if (sort === true) result = sorting(sorttype, result);

  if (arr === false) {
    for (let i = 0; i < result.length; i++) {
      if (i === result.length - 1) resString += result[i];
      else resString += result[i] + ", ";
    }

    result = resString;
  }

  return result;
}

module.exports = { generateAnimal };
