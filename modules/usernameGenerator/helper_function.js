const { RAND_QUERY } = require('../../constant/usernameGen');
const { generateRandomNumber } = require('../general_function_helper');
const [fixedQuery, ...rest] = RAND_QUERY;

const getQuery = () => {
  const index = generateRandomNumber(3, 0);
  return rest[index];
};

const randomUsernameGenerator = async (preset) => {
  const { type, placement } = getQuery();
  let theUsername = placement;

  let URI = `${process.env.RAND_WORD_URI}?type=${type}`;

  if (type === 'adverb') {
    let usingThe = ['', 'the'];
    usingThe = usingThe[generateRandomNumber(2, 0)];
    theUsername = placement.replace('!', usingThe);
  }

  //generate random word below
  const response = await fetch(URI, {
    method: 'get',
    headers: { 'X-Api-Key': process.env.RAND_WORD_API_KEY }
  });

  const { word: randomWord } = await response.json();
  theUsername = theUsername.replace('$', randomWord);

  if (!preset) {
    URI = `${process.env.RAND_WORD_URI}?type=${fixedQuery}`;

    const response = await fetch(URI, {
      method: 'get',
      headers: { 'X-Api-Key': process.env.RAND_WORD_API_KEY }
    });

    const { word: generatedPreset } = await response.json();
    theUsername = theUsername.replace('?', generatedPreset);
  } else {
    theUsername = theUsername.replace('?', preset);
  }

  return theUsername;
};

module.exports = { randomUsernameGenerator };
