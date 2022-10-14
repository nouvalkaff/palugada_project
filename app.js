// Declare variable to use Express function
import Express, { json, urlencoded } from "express";

// Declare other essential packages
import Cors from "cors";
import { Sequelize } from "sequelize";

// Requiring / importing "dotenv" config to allow access to .env file
import { config } from "dotenv";
config();

// Declare app variable to allow in creating other essential functions
const PORT = process.env.PORT;
const app = Express();

app.use(json());
app.use(urlencoded({ extended: false }));

/**
 * Enable CORS
 * Cross-Origin Resource Sharing (CORS) is
 * an HTTP-header based mechanism that allows a server
 * to indicate any origins (domain, scheme, or port)
 * other than its own from which a browser should permit loading resources.
 */
app.use(Cors({ origin: "*" }));

import shrinkerRoute from "./modules/link_shrinker/routers.js";

app.use("/api/palugada/shrinker", shrinkerRoute);

const sequelize = new Sequelize("palugada", "postgres", "12345678", {
  host: "127.0.0.1",
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
app.listen(PORT, async () => {
  try {
    console.log("Server start on PORT " + PORT);
    await sequelize.authenticate();
    console.log("Connected to DB");
  } catch (error) {
    console.error(error);
  }
});
