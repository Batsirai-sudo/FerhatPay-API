const connection = require('../../Database/dbconnection');
const queries = require('./queries');

const getApiType = async (type) => {
	try {
		const [rows] = await connection.execute(queries.getApi);
		const filter = rows.map((x) => x.type === type);
		return filter[0].api;
	} catch (error) {
		res.status(500).send({
			error,
		});
	}
};
module.exports = getApiType;
