const queries = require('./queries');

const updateUserCount = async (type, conn) => {
	const [rows] = await conn.query(queries.currentRegistrationCount);
	await conn.query(queries.incrementRegistration, [{ UserCounter: addFxn(rows[0].UserCounter) }]);

	const result = userTypeIncrement(type, rows[0]);
	await conn.query(queries.incrementRegistration, [result]);

	return true;
};
module.exports = updateUserCount;

const addFxn = (x) => {
	return x + 1;
};
const userTypeIncrement = (type, data) => {
	return type === 'agent' ? { Agents: addFxn(data.Agents) } : { Users: addFxn(data.Users) };
};
