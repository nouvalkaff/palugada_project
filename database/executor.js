const client = require('./connection');

const getAllTableShrinkUrl = async () => {
  const query = 'SELECT * FROM shrinkurl';
  const executeQuery = await client.query(query);
  return executeQuery;
};

module.exports = {
  shrinkUrl: {
    getAllTableShrinkUrl
  }
};
