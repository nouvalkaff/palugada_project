const animals_en = require("./animals_name_en").animals;
const animals_id = require("./animals_name_id").animals;
const {
  sorting,
  upperMe,
  lowerMe,
  capsMe,
  removeDuplicate,
  array2string,
} = require("../general_function_helper");

function generateAnimal(format) {
  let { arr, length, sort, sorttype, letter, allowduplic, language } = format;

  arr = arr === "true";
  allowduplic = allowduplic === "true";
  sort = sort === "true";
  length = +length;

  let animals;

  if (language === "id") animals = animals_id;
  else if (language === "en") animals = animals_en;

  if (length > animals.length) return animals.length;

  let result = [];

  while (result.length < length) {
    const index = Math.floor(Math.random() * animals.length);

    if (letter === "upper") result.push(upperMe(animals[index]));

    if (letter === "lower") result.push(lowerMe(animals[index]));

    if (letter === "caps") result.push(capsMe(animals[index]));

    if (allowduplic === false) result = removeDuplicate(result);
  }

  if (sort === true) result = sorting(sorttype, result);

  if (arr === false) result = array2string(result.length, result);

  return result;
}

module.exports = { generateAnimal };
