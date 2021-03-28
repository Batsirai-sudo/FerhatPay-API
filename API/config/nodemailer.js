var nodemailer = require('nodemailer');
const nodemailConstamts = require('../constants');

const sendResetEmail = () => {
	const { service, user, pass } = nodemailConstamts;
	const { from, subject, html } = nodemailConstamts.options;

	var transporter = nodemailer.createTransport({
		service,
		auth: {
			user,
			pass,
		},
	});

	var mailOptions = {
		from,
		to: req.body.email,
		subject,
		html,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			throw new Error(error);
		}
		console.log('info', info);
		return info.response;
	});
};

module.exports = sendResetEmail;
