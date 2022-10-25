// Declare variable to use Express function
const Express = require("express");

// Declare other essential packages
const Cors = require("cors");
const { Sequelize } = require("sequelize");
const config = require("./config/config").config;

// Requiring / importing "dotenv" config to allow access to .env file
require("dotenv").config();

// Declare app variable to allow in creating other essential functions
const PORT = process.env.PORT;
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
app.use(Cors({ origin: "*" }));

const shrinkerRoute = require("./modules/link_shrinker/routers.js");

app.use("", shrinkerRoute);
app.use("/api/palugada/shrinker", shrinkerRoute);

const { username, password, database, host } = config.development;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: "postgres",
});

// Declare a function to check API is online or offline
app.all("*", (req, res) => {
  return res.status(200).send({
    code: 200,
    statustext: "OK",
    success: true,
    message: "Welcome to API PALUGADA Project by Mohamad Nouval Abdel Alkaf",
  });
});

// Listening port to start the server and connect to database
(async () => {
  await sequelize.sync({ force: false });
  await sequelize.authenticate();
  console.log("Connected to DB");

  app.listen(PORT);
  console.log("Server start on PORT " + PORT);
})();
