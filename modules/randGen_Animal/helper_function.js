const { animals } = require("./animals_name");
function generateAnimal(format) {
  let { arr, length, sort, sorttype, letter } = format;
  const regexFirstLetter = /\b\w/g;

  arr = arr === "true";
  sort = sort === "true";
  length = +length;

  let result = [];
  let resString = "";

  while (result.length < length) {
    const index = Math.floor(Math.random() * animals.length);

    if (letter === "upper") result.push(animals[index].toUpperCase());

    if (letter === "lower") result.push(animals[index].toLowerCase());

    if (letter === "caps") {
      result.push(
        animals[index]
          .toLowerCase()
          .replace(regexFirstLetter, (caps) => caps.toUpperCase())
      );
    }

    result = [...new Set(result)];
  }

  if (arr === false) {
    for (let i = 0; i < result.length; i++) {
      const el = result[i];
      if (i === result.length - 1) resString += el;
      else resString += el + ", ";
    }

    result = resString;
  }

  return result;
}

module.exports = { generateAnimal };