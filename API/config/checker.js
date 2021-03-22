const connection = require('../../Database/dbconnection');

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

module.exports = {
	isEmailExisting,
	isUserExisting,
};
