const express = require('express');
const router = express.Router();

router.get('/requestOTP', (req, res, next) => {
	console.log('logged batsy');

	res.send({
		result: 'Sent Received Ichanged everything',
		otp: 'OTP.token',
	});
});

module.exports = router;
