const fs = require('fs')

module.exports = {
  development: {
    username: 'root',
    password: '123123',
    database: 'wallet_dev',
    host: '127.0.0.1',
    dialect: 'mysql',
    define: { charset: 'utf8', dialectOptions: { collate: 'utf8_general_ci' } },
  },
  // test: {
  //   username: 'root',
  //   password: null,
  //   database: 'wallet_test',
  //   host: '127.0.0.1',
  //   dialect: 'mysql',
  // },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    port: process.env.PROD_DB_PORT,
    dialect: 'mysql',
    define: { charset: 'utf8', dialectOptions: { collate: 'utf8_general_ci' } },
    logging: false,
  },
}
