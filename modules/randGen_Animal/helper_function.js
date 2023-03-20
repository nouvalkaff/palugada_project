const isEmpty = require('lodash/isEmpty');
const animals_en = require('./animals_name_en').animals;
const animals_id = require('./animals_name_id').animals;
const {
  sorting,
  upperMe,
  lowerMe,
  capsMe,
  array2string
} = require('../general_function_helper');

function generateAnimal(format) {
  let animals;
  let result = [];
  let { arr, language, length, letter, sort, sorttype, allowduplic } = format;

  arr = +arr;
  length = +length;
  sort = +sort;
  allowduplic = +allowduplic;

  if (language === 'id') animals = animals_id;
  else if (language === 'en') animals = animals_en;

  if (length > animals.length) return animals.length;

  while (result.length < length) {
    const index = Math.floor(Math.random() * animals.length);

    if (letter === 'upper') result.push(upperMe(animals[index]));
    if (letter === 'lower') result.push(lowerMe(animals[index]));
    if (letter === 'caps') result.push(capsMe(animals[index]));
  }

  if (allowduplic === 0) result = handleDuplicate(result, animals);
  if (sort === 1) result = sorting(sorttype, result);
  if (arr === 0) result = array2string(result.length, result);
  return result;
}

const findDuplicates = (arr) => {
  return arr.filter((item, index) => arr.indexOf(item) !== index);
};

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

const getNewAnimals = (animals, resultFromGenerate, totalNeeded) => {
  const filteredAnimalData = animals.filter(
    (animal) => !resultFromGenerate.includes(animal)
  );
  const randomizedNewAnimal = shuffle(filteredAnimalData);
  return randomizedNewAnimal.slice(0, totalNeeded);
};

const handleDuplicate = (resultFromGenerate, fullAnimals) => {
  const totalDuplicate = findDuplicates(resultFromGenerate).length;
  if (totalDuplicate === 0) return resultFromGenerate;
  const newAnimals = getNewAnimals(
    fullAnimals,
    resultFromGenerate,
    totalDuplicate
  );
  return [...new Set(resultFromGenerate), ...newAnimals];
};

module.exports = { generateAnimal };
