const express = require('express');
const router = express.Router();

router.get('/batsiraiferhatpay/good', (req, res, next) => {
	console.log('logged batsy');

	res.send('received');
});

module.exports = router;
