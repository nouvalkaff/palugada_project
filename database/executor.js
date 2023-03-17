const { client } = require('./connection');

const getAllDataFromShrinkURL = async () => {
  const query = 'SELECT * FROM shrinkurl';
  const executeQuery = await client.query(query);
  const { rows } = executeQuery;
  return rows;
};

module.exports = {
  shrinkUrl: {
    getAllDataFromShrinkURL
  }
};
