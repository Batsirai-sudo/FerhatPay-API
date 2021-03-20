const express = require('express');
const router = express.Router();

router.get('/requestOTP/:phone', isUserExist, (req, res, next) => {
	res.send({
		result: 'Batsirai Muchareva',
	});
});

module.exports = router;
