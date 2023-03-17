// Requiring / importing "dotenv" config to allow access to .env file
require('dotenv').config();

// Declare variable to use Express function
const Express = require('express');

// Declare other essential packages
const { Client } = require('pg');
const Cors = require('cors');
const DBConfig = require('./config/dbConfig');
const config = DBConfig;

// Declare app variable to allow in creating other essential functions
const port = process.env.DEV_PORT;
const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));

/**
 * Enable CORS
 * Cross-Origin Resource Sharing (CORS) is
 * an HTTP-header based mechanism that allows a server
 * to indicate any origins (domain, scheme, or port)
 * other than its own from which a browser should permit loading resources.
 */
app.use(Cors({ origin: '*' }));

const shrinkerRoute = require('./modules/link_shrinker/routers.js');
const randGenNumRoute = require('./modules/randGen_Number/routers.js');
const randGenAniRoute = require('./modules/randGen_Animal/routers.js');

app.use('', shrinkerRoute);
app.use('/api/palugada/shrinker', shrinkerRoute);
app.use('/api/palugada/rgnum', randGenNumRoute);
app.use('/api/palugada/rgani', randGenAniRoute);

const {
  username: user,
  password,
  database,
  host
} = config[process.env.NODE_ENV];

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
    console.error('connection error ->', error.stack);
  });

// Declare a function to check API is online or offline
app.all('*', (_, res) => {
  return res.status(200).send({
    code: 200,
    statustext: 'OK',
    success: true,
    message: 'Welcome to API PALUGADA a project by Mohamad Nouval Abdel Alkaf'
  });
});

app.listen(port);
