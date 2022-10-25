require("dotenv").config();
exports.config = {
  development: {
    username: process.env.PG_USERNAME,
    password: +process.env.PG_PASSWORD,
    database: process.env.PG_DB,
    host: "node_db",
    logging: false,
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    logging: false,
    dialect: "postgres",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    logging: false,
    dialect: "postgres",
  },
};
