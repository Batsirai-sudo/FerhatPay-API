const queries = require('./queries');

const updateUserCount = async (type, conn) => {
	console.log('inside');
	const [rows] = await conn.execute(queries.currentRegistrationCount);
	console.log('inside1 rows', rows);
	await conn.query(queries.incrementRegistration, [{ UserCounter: addFxn(rows[0].UserCounter) }]);
	console.log('inside2');
	const result = userTypeIncrement(type, rows[0]);
	console.log('inside3 result', result);

	await conn.query(queries.incrementRegistration, [result]);
	console.log('inside4');

	return true;
};
module.exports = updateUserCount;

const addFxn = (x) => {
	return x + 1;
};
const userTypeIncrement = (type, data) => {
	return type === 'agent' ? { Agents: addFxn(data.Agents) } : { Users: addFxn(data.Users) };
};
