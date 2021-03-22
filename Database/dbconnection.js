const mysql = require('mysql2/promise');
const bluebird = require('bluebird');
const connection = mysql.createPool({
  host: "localhost",
  port: "3306",
  user: "ferhmguw_ferhatpay",
  password: "bats1raiMucha",
  database: "ferhmguw_ferhatpay",
  Promise: bluebird
});

 module.exports = connection;
