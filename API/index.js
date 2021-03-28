const express = require('express');
const router = express.Router();
const connection = require('../Database/dbconnection');
var nodemailer = require('nodemailer');
const query = require('./config/queries');
const Speakeasy = require('speakeasy'); // speakeasy for  generating token and otp
const genPassword = require('./config/passwordUtils').genPassword;
const genApiKey = require('./config/apiSecret').genApiKey;
const generateUserObject = require('./config/generateUserObject');
const getApiType = require('./config/apiKey');
const passport = require('passport');
const { isEmailExisting, isUserExisting } = require('./config/checker');
const updateUserCount = require('./config/updateUserCount');
const sendResetEmail = require('./config/nodemailer');
// const nexmoOTP = require("../Otp/nexmoSms").nexmoOTP;
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
			const response = await conn.query(query.createUser, [user]);
			account.UserID = response[0].insertId;

			/** Creating an Account  into database*/
			await conn.query(query.createAccount, [account]);
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
/**
 * @Batsirai
 * @FerhatPay
 *  If this function for authenticatin for passsport
 *  is called and logs individual  which return successRedirect or fail
 * on authentication  successful or not
 */
router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/batsiraiferhatpay/authentication/login-success',
		failureRedirect: '/batsiraiferhatpay/authentication/error',
		failureFlash: true,
	})
);
router.get('/error', (req, res) => {
	res.status(401).send(req.flash('error')[0]);
});
router.get('/login-success', (req, res) => {
	res.send({ login: true });
});
router.post('/resetPassword', async (req, res, next) => {
	const email = req.body.email;
	try {
		const [rows, fields] = await connection.execute(query.checkEmailForPasswordReset, [email]);
		if (rows.length > 0) {
			const response = await sendResetEmail();

			return res.send({ response });
		}
		res.status(401).send('No user found');
	} catch (error) {
		res.status(500).send({
			error,
		});
	}
});

module.exports = router;

// console.log(req.header('x-api-key'));API:

// console.log(req.header('x-secret-key'));
