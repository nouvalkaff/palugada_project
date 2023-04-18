const { RAND_QUERY } = require('../../constant/usernameGen');
const { generateRandomNumber } = require('../general_function_helper');
const { animals } = require('../randGenAnimal/animals_name_en');

const [fixedQuery, ...rest] = RAND_QUERY;
const headers = { 'X-Api-Key': process.env.RAND_WORD_API_KEY };
const method = 'get';

const getQuery = () => {
  const index = generateRandomNumber(3, 0);
  return rest[index];
};

const randomUsernameGenerator = async (preset) => {
  const { type, placement } = getQuery();
  let theUsername = placement;

  let URI = `${process.env.RAND_WORD_URI}?type=${type}`;

  //Generate Username Below
  const response = await fetch(URI, { method, headers });

  const { word: randomWord } = await response.json();
  theUsername = placement.replace('$', randomWord);

  if (!preset) {
    let isGenerating = [true, false];
    isGenerating = isGenerating[generateRandomNumber(2, 0)];

    if (isGenerating) {
      URI = `${process.env.RAND_WORD_URI}?type=${fixedQuery}`;

      const response = await fetch(URI, { method, headers });

      const { word: generatedPreset } = await response.json();
      theUsername = theUsername.replace('?', generatedPreset);
      return theUsername.toLowerCase();
    } else {
      animalPreset = animals[generateRandomNumber(animals.length, 0)];
      animalPreset = animalPreset.replace(' ', '');

      theUsername = theUsername.replace('?', animalPreset);
      return theUsername.toLowerCase();
    }
  }

  theUsername = theUsername.replace('?', preset);
  return theUsername.toLowerCase();
};

module.exports = { randomUsernameGenerator };
