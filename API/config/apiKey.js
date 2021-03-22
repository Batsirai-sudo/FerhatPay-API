const queries = require('./queries');

const getApiType = async (type, conn) => {
	try {
		const [rows] = await conn.execute(queries.getApi);
		const filter = rows.map((x) => x.type === type);
		console.log('getApiTypegetApiType', filter);

		return filter[0].api;
	} catch (error) {
		res.status(500).send({
			error,
		});
	}
};
module.exports = getApiType;
