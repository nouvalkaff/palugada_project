const DBConfig = {
  development: {
    username: process.env.DEV_USERNAME,
    password: process.env.DEV_PASSWORD,
    database: process.env.DEV_DATABASE,
    host: process.env.DEV_HOST,
    dialect: process.env.DEV_DIALECT
  },
  test: {
    username: 'postgres',
    password: 'postgres1234',
    database: 'palugada',
    host: 'localhost',
    logging: false,
    dialect: 'postgres'
  },
  production: {
    username: process.env.PROD_USERNAME,
    password: process.env.PROD_PASSWORD,
    database: process.env.PROD_DATABASE,
    host: process.env.PROD_HOST,
    dialect: process.env.PROD_DIALECT
  }
};

module.exports = DBConfig;
