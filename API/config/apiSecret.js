const genApiKey = () => {
	return [...Array(30)].map((x) => ((Math.random() * 36) | 0).toString(36)).join('');
};

module.exports.genApiKey = genApiKey;

// const createUser = (_email, req) => {
// 	const today = new Date().toISOString().split('T')[0];
// 	let user = {
// 		_id: Date.now(),
// 		apiKey: genApiKey(),
// 		email: _email,
// 		host: req.headers.origin,
// 		usage: [{ date: today, count: 0 }],
// 	};

// 	users.push(user);
// };

// const validteKey = (req, res, next) => {
// 	let host = req.headers.origin;
// 	let apiKey = req.query.apiKey; //version 1.
// 	let account = users.find((u) => u.host === host && u.apiKey === apiKey);

// 	if (account) {
// 		const today = new Date().toISOString().split('T')[0];
// 		let usageIndex = account.usage.findIndex((day) => day.date === today);

// 		if (usageIndex >= 0) {
// 			/// already used today

// 			if (account.usage[usageIndex].count >= 25) {
// 				res.status(429).send({
// 					error: {
// 						code: 429,
// 						message: 'Max API calls exceeded',
// 					},
// 				});
// 			} else {
// 				// you havent reached max usage
// 				account.usage[usageIndex].count++;
// 				console.log('Good Api call');
// 				next();
// 			}
// 		} else {
//             // not today yet
// 			account.usage.push({ date: today, count: 1 });
//         //   okay to use again the api to go and extract the products
//             next();
// 		}
// 	}else{
//         res.status(403).send({ error: { code:403,message:'not allowed'}})
//     }
// };

// 'http://localhost/user/125uibdfvjibdf845cj'
// 'http://localhost/user/125uibdfvjibdf845cj/458'

// to get it you say you

// app.post('/user/:apiKey')
// app.post('/user/:apiKey/:id')

// req.params.apiKey
// req.params.id

// inside header it

// let apikey = req.header('x-api-key'); // version 3
