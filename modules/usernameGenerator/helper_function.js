const fs = require('fs');
const fetch = require('node-fetch');

const { RAND_QUERY, CONNECTOR } = require('../../constant/usernameGen');
const {
  generateRandomNumber,
  upperMe,
  lowerMe,
  capsMe
} = require('../general_function_helper');
const { animals } = require('../randGenAnimal/animals_name_en');

const [fixedQuery, ...rest] = RAND_QUERY;

const headers = { 'X-Api-Key': process.env.RAND_WORD_API_KEY };
const method = 'get';
const path = './tmp/wordWarehouse.json';

const getQueryType = () => {
  const index = generateRandomNumber(3, 0);
  return rest[index];
};

const randomUsernameGenerator = async (query) => {
  const { type } = getQueryType();
  const { preset, useConnector, firstSet } = query;
  const getContent = JSON.parse(fs.readFileSync(path, { encoding: 'utf8' }));

  let theUsername;
  let URI = `${process.env.RAND_WORD_URI}?type=${type}`;

  //Generate Username Below
  let isGenerateWord = [true, false];
  isGenerateWord = isGenerateWord[generateRandomNumber(2, 0)];

  if (isGenerateWord) {
    const response = await fetch(URI, { method, headers });
    const { word: randomWord } = await response.json();

    if (!firstSet || firstSet === 'lower') {
      theUsername = lowerMe(randomWord);
    } else if (firstSet === 'upper') {
      theUsername = upperMe(randomWord);
    } else {
      theUsername = capsMe(randomWord);
    }

    // const isExist = getContent[type].find((element) => element === randomWord);

    // if (!isExist) {
    //   getContent[type].push(randomWord);
    //   fs.writeFileSync(path, JSON.stringify(getContent));
    // }
  } else {
    theUsername = getContent[type];
    theUsername = theUsername[generateRandomNumber(theUsername.length, 0)];

    if (!firstSet || firstSet === 'lower') {
      theUsername = lowerMe(theUsername);
    } else if (firstSet === 'upper') {
      theUsername = upperMe(theUsername);
    } else {
      theUsername = capsMe(theUsername);
    }
  }

  if (useConnector === '1') {
    theUsername += CONNECTOR[generateRandomNumber(CONNECTOR.length, 0)];
  }

  if (!preset) {
    let isGeneratePreset = [true, false];
    isGeneratePreset = isGeneratePreset[generateRandomNumber(2, 0)];

    if (isGeneratePreset) {
      URI = `${process.env.RAND_WORD_URI}?type=${fixedQuery}`;

      const response = await fetch(URI, { method, headers });

      const { word: generatedPreset } = await response.json();
      theUsername += generatedPreset.toLowerCase();
      return theUsername;
    } else {
      animalPreset = animals[generateRandomNumber(animals.length, 0)];
      animalPreset = animalPreset.replace(/\s/g, '').toLowerCase();

      theUsername += animalPreset;
      return theUsername;
    }
  }

  theUsername += preset;
  return theUsername;
};

module.exports = { randomUsernameGenerator };
