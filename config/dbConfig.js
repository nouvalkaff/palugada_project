const DBConfig = {
  development: {
    username: process.env.DEV_USERNAME,
    password: process.env.DEV_PASSWORD,
    database: process.env.DEV_DATABASE,
    host: process.env.DEV_HOST,
    dialect: process.env.DEV_DIALECT
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: 'localhost',
    logging: false,
    dialect: 'postgres'
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: 'localhost',
    logging: false,
    dialect: 'postgres'
  }
};

module.exports = DBConfig;
