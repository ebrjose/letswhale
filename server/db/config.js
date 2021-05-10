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
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    define: { charset: 'utf8', dialectOptions: { collate: 'utf8_general_ci' } },
    logging: false,
  },
}
