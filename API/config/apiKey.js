const queries = require('./queries');

const getApiType = (type, conn) => {
	const [rows] = conn.query(queries.getApi);
	console.log('---------------------------------', rows, 'rowsrowsrowsrowsrowsrows', type);

	// const filter = rows.map((x) => x.type === type);
	// console.log('getApiTypegetApiType', filter);

	// return filter[0].api;
};
module.exports = getApiType;
