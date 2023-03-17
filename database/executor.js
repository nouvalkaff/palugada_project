const { client } = require('./connection');

const getAllDataFromShrinkURL = async () => {
  const query = 'SELECT * FROM shrinkurl;';
  const executeQuery = await client.query(query);
  const { rows } = executeQuery;
  return rows;
};

const isUniqueCharsExist = async (uniqueChar) => {
  const query =
    'SELECT uniqueChar FROM shrinkurl WHERE uniqueChar = $1 LIMIT 1;';
  const params = [uniqueChar];
  const executeQuery = await client.query(query, params);
  const { rows } = executeQuery;
  return rows;
};

const saveDataToDB = async (data) => {
  const { originalLink, uniqueChar, hit } = data;
  const query =
    'INSERT INTO shrinkurl (originalLink, uniqueChar, hit) VALUES ($1, $2, $3);';
  const params = [originalLink, uniqueChar, hit];
  return client.query(query, params);
};

module.exports = {
  shrinkUrl: {
    getAllDataFromShrinkURL,
    isUniqueCharsExist,
    saveDataToDB
  }
};