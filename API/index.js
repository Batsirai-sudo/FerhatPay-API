const express = require('express');
const router = express.Router();
const connection = require('../Database/dbconnection');
const queries = require('./queries');
const Speakeasy = require('speakeasy'); // speakeasy for generating token and otp
// const nexmoOTP = require("../Otp/nexmoSms").nexmoOTP;

const isUserExisting = async (req, res, next) => {
	try {
		const [rows, fields] = await connection.execute(queries.getAccountNumber, [parseInt(req.body.mobile)]);
		console.log('--------------=====11', rows);
		console.log('--------------=====1122222', fields);

		true
			? (() => {
					res.status(409).send('User Exist with this account. Try another please! ');
			  })()
			: (() => {
					next();
			  })();
	} catch (error) {
		console.log('--------------=====error', error);

		res.status(500).send({
			error,
		});
	}

	// (error, result) => {
	// 	if (error) {

	// 	}

	// });
};
// const isEmailExisting = async (req, res, next) => {
// 	try {
// 		const response = await connection.query(queries.getEmail, [req.body.email]);
// 		console.log(response)
// 		response.length
// 			? (() => {
// 					res.status(409).send('User Exist with this email. Try another please! ');
// 			  })()
// 			: (() => {
// 					next();
// 			  })();

// 	} catch (error) {
// 		return res.status(500).send({
// 			error,
// 		});
// 	}

// 	// connection.query(sql, [req.body.email], (error, result) => {
// 	// 	if (error) {
// 	// 		return res.status(500).send({
// 	// 			error,
// 	// 		});
// 	// 	}

// 	// 	result.length
// 	// 		? (() => {
// 	// 				res.status(409).send('User Exist with this email. Try another please! ');
// 	// 		  })()
// 	// 		: (() => {
// 	// 				next();
// 	// 		  })();
// 	// });
// };
/**
 * @Batsirai
 * @FerhatPay
 *  User  Requesting OTP from client
 * side to verify Mobile Number
 */
router.post('/requestOTP', isUserExisting, (req, res, next) => {
	let secretKey = Speakeasy.generateSecret({ length: 20 });
	try {
		let OTP = {
			token: Speakeasy.totp({
				secret: secretKey.base32,
				encoding: 'base32',
			}),
			remaining: 300 - Math.floor((new Date().getTime() / 1000.0) % 30),
		};
		res.send({
			sent: true,
			secretKey,
			OTP,
		});
	} catch (error) {
		res.status(500).send({
			error,
		});
	}
});

/**
 * @Batsirai
 * @FerhatPay
 *  Verify Otp by checking the validity of
 *  the OTP token sent by Client side
 */
router.post('/verifyOTP', (req, res, next) => {
	const valid = Speakeasy.totp.verify({
		secret: req.body.secretKey.base32,
		encoding: 'base32',
		token: req.body.otp,
		window: 10,
	});

	valid
		? res.send({
				valid,
		  })
		: res.status(409).send('Error either the OTP is invalid or has expired! ');
});
/**
 * @Batsirai
 * @FerhatPay
 *  OTP resend Request from client
 */
router.post('/resendOTP', (req, res, next) => {
	const secretKey = req.body.secretKey;
	const OTP = {
		token: Speakeasy.totp({
			secret: secretKey.base32,
			encoding: 'base32',
		}),
		remaining: 300 - Math.floor((new Date().getTime() / 1000.0) % 30),
	};
	// const isSent = nexmoOTP(OTP.token, req.body.phoneNumber);
	res.send({
		sent: true,
		secretKey,
		OTP,
	});
});

// router.post('/registration', isEmailExisting, (req, res, next) => {
// 	// const secretKey = req.body.secretKey;
// 	// const OTP = {
// 	// 	token: Speakeasy.totp({
// 	// 		secret: secretKey.base32,
// 	// 		encoding: 'base32',
// 	// 	}),
// 	// 	remaining: 300 - Math.floor((new Date().getTime() / 1000.0) % 30),
// 	// };
// 	// // const isSent = nexmoOTP(OTP.token, req.body.phoneNumber);
// 	// res.send({
// 	// 	sent: true,
// 	// 	secretKey,
// 	// 	OTP,
// 	// });
// });

// router.get("/batsiraiferhatpay/otp-resend", (req, res, next) => {

// console.log(req.header('x-api-key'));

// console.log(req.header('x-secret-key'));

// module.exports = router;

module.exports = router;

// // const genPassword = require();
// const genPassword = require('../../Authentication/passwordUtils/passwordUtils').genPassword;

// router.post('/batsiraiferhatpay/registration', (req, res, next) => {
// 	let sql = 'SELECT Email FROM users WHERE Email=?';
// 	let query = dbConnect.query(sql, req.body.data.Email, (emailerror, result) => {
// 		if (emailerror) {
// 			return res.send({
// 				error: 'Error In Requesting User',
// 				inserted: null,
// 			});
// 		}
// 		if (result.length > 0) {
// 			// Creating an object to insert data into database
// 			// req.accountid = result.insertId;
// 			res.send({
// 				error: null,
// 				inserted: false,
// 			});
// 		}

// 		if (!result.length) {
// 			// Creating an object to insert data into database
// 			// req.accountid = result.insertId;

// 			//// ................................Check Email Before cOntinue.......................
// 			let passwordHash = genPassword(req.body.data.password);
// 			console.log(passwordHash);
// 			let user_data = {
// 				FullName: req.body.data.FullName,
// 				LastName: req.body.data.LastName,
// 				Password: passwordHash.hash,
// 				Email: req.body.data.Email,
// 				DOB: req.body.dob,
// 				gender: req.body.gender,
// 				State: req.body.data.State,
// 				StreetAddress: req.body.data.StreetAddress,
// 				NationalID: req.body.data.NationalID,
// 				StudentID: req.body.data.StudentID,
// 				salt: passwordHash.salt,
// 				user_status: 'Active',
// 				passwordResetStatus: 'False',
// 				ContactNo: req.body.mobile_number,
// 				secretToken: req.body.secret_key,
// 			};

// 			//          OkPacket {
// 			// App 945988 output:   fieldCount: 0,
// 			// App 945988 output:   affectedRows: 1,
// 			// App 945988 output:   insertId: 177,
// 			// App 945988 output:   serverStatus: 2,
// 			// App 945988 output:   warningCount: 0,
// 			// App 945988 output:   message: '',
// 			// App 945988 output:   protocol41: true,
// 			// App 945988 output:   changedRows: 0
// 			// App 945988 output: }

// 			let ssql = 'INSERT INTO users SET ?';
// 			let queery = dbConnect.query(ssql, [user_data], (err, result) => {
// 				if (err) throw err;

// 				if (result) {
// 					let account_data = {
// 						UserID: result.insertId,
// 						Status: 'Active',
// 						AccountBalance: 0,
// 						AccountNumber: req.body.mobile_number,
// 					};

// 					let sql2 = 'INSERT INTO account SET ?';
// 					let query2 = dbConnect.query(sql2, [account_data], (err2, result2) => {
// 						if (err2) throw err2;

// 						if (result2) {
// 							userIncrementer(() => {
// 								res.send({ inserted: true, error: null });
// 							});
// 						}
// 					});
// 				}
// 			});

// 			/// ...............................................................................
// 		}
// 	});
// });

// module.exports = router;

// function userIncrementer(callback) {
// 	let sql = 'SELECT UserCounter FROM statistics WHERE id=1';
// 	let query = dbConnect.query(sql, (error, result) => {
// 		let calculTotal = result[0].UserCounter + 1;

// 		let increment = { UserCounter: calculTotal };

// 		let sql2 = 'UPDATE statistics SET ? WHERE id = 1';
// 		let query2 = dbConnect.query(sql2, [increment], (error, rows) => {
// 			if (error) throw error;
// 			if (rows) callback();
// 		});
// 	});
// }
