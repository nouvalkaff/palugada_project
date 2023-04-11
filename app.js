// Requiring / importing "dotenv" config to allow access to .env file
require('dotenv').config();

// Declare variable to use Express function
const Express = require('express');

// Declare other essential packages
const Cors = require('cors');
const port = process.env.DEV_PORT;

// Declare app variable to allow in creating other essential functions
const app = Express();
const { connection } = require('./database/connection');

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
const gitCommitMakerRoute = require('./modules/gitCommitMaker/routers.js');

app.use('', shrinkerRoute);
app.use('/api/palugada/shrinker', shrinkerRoute);
app.use('/api/palugada/rgnum', randGenNumRoute);
app.use('/api/palugada/rgani', randGenAniRoute);
app.use('/api/palugada/commiter', gitCommitMakerRoute);

// Declare a function to check API is online or offline
app.all('*', (_, res) => {
  return res.status(200).send({
    code: 200,
    statustext: 'OK',
    success: true,
    message: 'Welcome to API PALUGADA a project by Mohamad Nouval Abdel Alkaf'
  });
});

connection();
app.listen(port);
