const express = require('express');
const router = express.Router();
const dbConnect = require('../Database/dbconnection');
const Speakeasy = require('speakeasy'); // speakeasy for generating token and otp
// const nexmoOTP = require("../Otp/nexmoSms").nexmoOTP;

const isUserExisting = (req, res, next) => {
	const sql = 'SELECT AccountNumber FROM account WHERE AccountNumber=?';
	dbConnect.query(sql, [parseInt(req.body.mobile, 10)], (error, result) => {
		if (error) {
			return res.status(500).send({
				error,
			});
		}

		result.length
			? (() => {
					res.status(409).send('User Exist with this account. Try another please! ');
			  })()
			: (() => {
					next();
			  })();
	});
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
	res.send({
		valid: Speakeasy.totp.verify({
			secret: req.body.secretKey,
			encoding: 'base32',
			token: req.body.otp,
			window: 10,
		}),
	});
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

// router.get("/batsiraiferhatpay/otp-resend", (req, res, next) => {

// console.log(req.header('x-api-key'));
// console.log(req.header('x-secret-key'));

// module.exports = router;

module.exports = router;
