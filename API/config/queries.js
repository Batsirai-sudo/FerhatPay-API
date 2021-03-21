module.exports = {
	getEmail: 'SELECT Email FROM users WHERE Email=?',
	getAccountNumber: 'SELECT AccountNumber FROM account WHERE AccountNumber=?',
	getApi: 'SELECT * FROM APIs',
	createUser: 'INSERT INTO users SET ?',
	createAccount: 'INSERT INTO account SET ?',
};

// let account_data = {
// 	UserID: result.insertId,
// 	Status: 'Active',
// 	AccountBalance: 0,
// 	AccountNumber: req.body.mobile_number,
// };

// const con =async()=>{
//     console.log('--------------=====started');

// try {
// const [rows,fields] = await connection.execute("SELECT * FROM users")
// console.log('--------------========++++++++===rows-----fields', fields);
// // connection.execute(
// //   "SELECT * FROM users",
// //   function(err, results, fields) {
// //     console.log('====execute=========',results); // results contains rows returned by server
// //     console.log(fields); // fields contains extra meta data about results, if available
// //   }
// // );
// } catch (error) {

//     console.log('--------------=====con error', error);

// }

// }
// con()

// const connection = mysql.createConnection({
//   host: "localhost",
//   port: "3306",
//   user: "ferhmguw_ferhatpay",
//   password: "bats1raiMucha",
//   database: "ferhmguw_ferhatpay",
//   Promise: bluebird
// });

// // / get the client
// // const mysql = require('mysql2/promise');

// // // get the promise implementation, we will use bluebird
// // const bluebird = require('bluebird');

// // // create the connection, specify bluebird as Promise
// // const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'test', Promise: bluebird});

// // query database

// const co =async()=>{
//     try {
//         		console.log('firstfirstfirstfirstfirst');

// 	    const [rows, fields] = await connection.execute("SELECT * FROM users");
// 		console.log('--------------=====rows', rows);
// 		console.log('--------------=====error', fields);

// 	} catch (error) {
// 		console.log('--------------=====error', error);

// 	}}

// 	co()

// // connection.connect((error) => {
// //   if (error) console.log(error);
// //   else console.log("Connected");
// // });

// get the client

// create the connection to database

// simple query
