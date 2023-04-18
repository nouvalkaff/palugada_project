// Requiring / importing "dotenv" config to allow access to .env file
require('dotenv').config();
const { Client } = require('pg');

const port = process.env.DEV_PORT;
// const DBConfig = require('../config/dbConfig');

// const {
//   username: user,
//   password,
//   database,
//   host
// } = DBConfig[process.env.NODE_ENV];

const client = new Client({
  user: 'xenanzef',
  password: 'tzf6_eMh8gOwkOsmNhzZpx9kCNfSFyRu',
  host: 'rosie.db.elephantsql.com',
  database: 'xenanzef'
});

const connection = async () => {
  try {
    await client.connect();
    console.log('DB connected and server start on ' + port);
  } catch (error) {
    client.end((err) => {
      if (err) console.error('error during disconnection', err.stack);
      console.log('client has disconnected');
    });
    console.error('connection error', error.stack);
  }
};

module.exports = { connection, client };
