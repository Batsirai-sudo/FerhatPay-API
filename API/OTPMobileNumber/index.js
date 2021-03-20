const express = require('express');
const router = express.Router();

router.get('/batsiraiferhatpay/requestOTP', (req, res, next) => {
	console.log('logged batsy');

	res.send({
		result: 'Batsirai Muchareva',
	});
});

module.exports = router;
