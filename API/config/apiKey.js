const queries = require('./queries');

const getApiType = (type, conn) => {
	const [rows] = conn.execute(queries.getApi);
	console.log('---------------------------------', conn, 'rowsrowsrowsrowsrowsrows', type, rows);

	// const filter = rows.map((x) => x.type === type);
	// console.log('getApiTypegetApiType', filter);

	// return filter[0].api;
};
module.exports = getApiType;
