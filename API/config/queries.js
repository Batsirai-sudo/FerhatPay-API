module.exports = {
	getEmail: 'SELECT Email FROM users WHERE Email=?',
	getAccountNumber: 'SELECT AccountNumber FROM account WHERE AccountNumber=?',
	getApi: 'SELECT * FROM APIs',
	createUser: 'INSERT INTO users SET ?',
	createAccount: 'INSERT INTO account SET ?',
	incrementRegistration: 'UPDATE statistics SET ? WHERE id = 1',
	currentRegistrationCount: 'SELECT * FROM statistics',
	getUserByAccountNumber: 'SELECT  users.*, account.AccountNumber, account.account_id FROM account JOIN users ON account.UserID=users.id WHERE account.AccountNumber = ?';
	getUserByID: 'SELECT users.*,account.AccountNumber, account.account_id FROM users JOIN account ON users.id = account.UserID where users.id = '

};
	