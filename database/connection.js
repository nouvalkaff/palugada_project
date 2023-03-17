// Requiring / importing "dotenv" config to allow access to .env file
require('dotenv').config();
const { Client } = require('pg');

const port = process.env.DEV_PORT;
const DBConfig = require('../config/dbConfig');
const {
  username: user,
  password,
  database,
  host
} = DBConfig[process.env.NODE_ENV];

const client = new Client({ user, password, host, database });

// Calling client.connect with promise
client
  .connect()
  .then(() => {
    console.log('DB connected and server start on ' + port);
  })
  .catch((error) => {
    client
      .end()
      .then(() => console.log('client has disconnected'))
      .catch((error) =>
        console.error('error during disconnection', error.stack)
      );
    console.error('connection error', error.stack);
  });

module.exports = client;
