require("dotenv").config();
exports.config = {
  development: {
    username: process.env.POSTGRES_USERNAME,
    password: +process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    dialect: process.env.POSTGRES_DIALECT,
    logging: JSON.parse(process.env.POSTGRES_LOGGING.toLowerCase()),
    port: +process.env.POSTGRES_PORT,
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres",
    logging: false,
    port: 5432,
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "postgres",
    logging: false,
    port: 5432,
  },
};
