const randomWordGenerator = async () => {
  const params = new URLSearchParams();
  params.append('type', 'adjective');
  const URI = process.env.RAND_WORD_URI;
  const response = await fetch(URI, {
    method: 'get',
    headers: { 'X-Api-Key': process.env.RAND_WORD_API_KEY }
  });
  const data = await response.json();
  const randomWord = data.word;
  return randomWord;
};

module.exports = { randomWordGenerator };
