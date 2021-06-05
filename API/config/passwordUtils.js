const crypto = require('crypto');

function genPassword(password) {
	//generate random numbers
	var salt = crypto.randomBytes(32).toString('hex');
	// generate a hash password
	var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

	return {
		salt: salt,
		hash: genHash,
	};
}

//hash and salt from database
function validPassword(password, hash, salt) {
	var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

	return hash === hashVerify;
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
