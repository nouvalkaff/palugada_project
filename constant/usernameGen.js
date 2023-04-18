/**
 * $ = placement of random word
 * ? = placement of preset noun or API generated noun
 * ! = placement of 'the' word
 */
exports.RAND_QUERY = [
  'noun',
  {
    type: 'verb',
    placement: 'the$?'
  },
  {
    type: 'adjective',
    placement: '$?'
  },
  {
    type: 'adverb',
    placement: '!$?'
  }
];
