const connection = require('../../Database/dbconnection');
const query = require('./queries');

const isUserExisting = async (req, res, next) => {
	try {
		const [rows] = await connection.execute(query.getAccountNumber, [parseInt(req.body.mobile)]);
		rows.length > 0
			? (() => {
					res.status(409).send('User Exist with this account. Try another please! ');
			  })()
			: (() => {
					next();
			  })();
	} catch (error) {
		console.log(error);
		res.status(500).send({
			error,
		});
	}
};
const isEmailExisting = async (req, res, next) => {
	try {
		const [rows] = await connection.execute(query.getEmail, [req.body.email]);
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

module.exports = {
	isEmailExisting,
	isUserExisting,
};
