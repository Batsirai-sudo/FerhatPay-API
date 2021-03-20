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
					res.status(409).json({ error: { message: 'User Exist with this account. Try another please! ' } });
			  })()
			: (() => {
					next();
			  })();
	});
};

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

module.exports = router;
