const express = require('express');
const router = express.Router();
const connection = require('../Database/dbconnection');
const queries = require('./config/queries');
const Speakeasy = require('speakeasy'); // speakeasy for  generating token and otp
const genPassword = require('./config/passwordUtils').genPassword;
const genApiKey = require('./config/apiSecret').genApiKey;
const generateUserObject = require('./config/generateUserObject');
const getApiType = require('./config/apiKey');
const updateUserCount = require('./config/updateUserCount');
// const nexmoOTP = require("../Otp/nexmoSms").nexmoOTP;

const isUserExisting = async (req, res, next) => {
	try {
		const [rows] = await connection.execute(queries.getAccountNumber, [parseInt(req.body.mobile)]);
		rows.length > 0
			? (() => {
					res.status(409).send('User Exist with this account. Try another please! ');
			  })()
			: (() => {
					next();
			  })();
	} catch (error) {
		res.status(500).send({
			error,
		});
	}
};
const isEmailExisting = async (req, res, next) => {
	try {
		const [rows] = await connection.execute(queries.getEmail, [req.body.email]);
		rows.length > 0
			? (() => {
					res.status(409).send('User Exist with this email. Try another please! ');
			  })()
			: (() => {
					next();
			  })();
	} catch (error) {
		res.status(500).send({
			error,
		});
	}
};
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
/**
 * @Batsirai
 * @FerhatPay
 *  Using Transactions to ~
 * 1) Create User user table
 * 2) Create Account account table (amount 0)
 * 3) Increment number of registered users
 *
 * Generate salt password
 * Generate API secret key for Authentication
 * (Optional Token)
 * Assign API Token user or agent
 * notification of register agent or user
 * isAgentuser fxn
 */
router.post('/registration', isEmailExisting, (req, res, next) => {
	const passwordHash = genPassword(req.body.password);
	req.body.password = passwordHash.hash;
	req.body.salt = passwordHash.salt;
	req.body.API_Key_Secret = genApiKey();
	const user = generateUserObject(req.body).user;
	const account = generateUserObject(req.body).account;

	const transaction = async () => {
		const conn = await connection.getConnection();
		try {
			await conn.beginTransaction();
			user.API = await getApiType(req.body.type, conn);
			console.log(user);
			/** Creating a user first into database*/
			const response = await conn.query(queries.createUser, [user]);
			account.UserID = response[0].insertId;

			/** Creating an Account  into database*/
			await conn.query(queries.createAccount, [account]);
			await updateUserCount(req.body.type, conn);
			await conn.commit();
			await conn.release();
			res.send({
				registration: true,
			});
		} catch (error) {
			await conn.rollback();
			console.log(error);
			res.status(500).send({
				error,
			});
		}
	};

	transaction();
});
// console.log(req.header('x-api-key'));API:

// console.log(req.header('x-secret-key'));
module.exports = router;

// router.post('/batsiraiferhatpay/registration', (req, res, next) => {
// 	let query = dbConnect.query(sql, req.body.data.Email, (emailerror, result) => {
//

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
