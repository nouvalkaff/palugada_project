const { animals } = require("./animals_name");
function generateAnimal(format) {
  const { arr, length, sort, sorttype, letter } = format;
  const regexFirstLetter = /\b\w/g;

  let result = [];

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
  console.log(result, "result");

  return result;
}

module.exports = { generateAnimal };
