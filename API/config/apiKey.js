const queries = require('./queries');

const getApiType =async (type, conn) => {
	const [rows] = await conn.query(queries.getApi);
	const filter = rows.filter((x) => x.type === type);
	return filter[0].api;
};
module.exports = getApiType;
