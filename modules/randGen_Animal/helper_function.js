const { animals } = require("./animals_name");
function generateAnimal(format) {
  let { arr, length, sort, sorttype, letter } = format;
  const regexFirstLetter = /\b\w/g;

  arr = arr === "true";
  sort = sort === "true";
  length = +length;

  if (length > animals.length) return animals.length;

  let result = [];
  let resString = "";

  if (length < animals.length) {
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
  }

  if (length === animals.length) {
    for (let i = 0; i < animals.length; i++) {
      if (letter === "upper") result.push(animals[i].toUpperCase());

      if (letter === "lower") result.push(animals[i].toLowerCase());

      if (letter === "caps") {
        result.push(
          animals[i]
            .toLowerCase()
            .replace(regexFirstLetter, (caps) => caps.toUpperCase())
        );
      }
    }
  }

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
