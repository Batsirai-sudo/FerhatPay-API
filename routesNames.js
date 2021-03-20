module.exports = {
	authentication: generateUrl('authentication'),
};

const generateUrl = (endpoint) => {
	return `/batsiraiferhatpay/${endpoint}`;
};
