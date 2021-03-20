const generateUrl = (endpoint) => {
	return `/batsiraiferhatpay/${endpoint}`;
};

module.exports = {
	authentication: generateUrl('authentication'),
};
