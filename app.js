const express = require('express'); // express for backend server
const app = express(); // express object
const Speakeasy = require('speakeasy'); // speakeasy for generating 32 long secrettoken and 6 digit token and otp
const mysql = require('mysql'); // our database for storing data
const passport = require('passport'); // passport for login authentication and protecting routes
const bodyParser = require('body-parser'); // for json encoded body
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
const routes = require('./routesNames');
// var http = require("http").createServer(app);
// var io = require("socket.io").listen(http);

// // Usefull libraries not yet used
// // const flash = require("connect-flash");
// // const bcrypt = require("bcrypt");

// //////////////////////////////////////////////////////////////////
// //===============================================================
// //            -------------ROUTES REQUIRING INTO MAIN SERVER ---------------                //

// //  *************** CHECK USER SESSION TO SEE IF HE IS STILL AUTHENTICATED  ******************

const authenticationRoute = require('./Authorization/splashAuth');

// //            ***************  REGISTRATION  REQUIRING  ******************               //

const registerNumberOTPRoute = require('./Routes/SignUp/registerNumberOTP');
const otp_resend = require('./Routes/SignUp/otp_resend');
const adminRegister = require('./Routes/SignUp/adminRegister');

// // .........................const nexmoRoute = require("./Routes/Otp/nexmoSms");
const verifyOtpRoute = require('./Routes/Otp/verifyOtp');
const registerRoute = require('./Routes/SignUp/register');

// //            ***************  LOGIN  REQUIRING ******************                //

const loginRoute = require('./Routes/SignIn/login');
const forgotPasswordRoute = require('./Routes/SignIn/forgotPassword');
const passwordResetVerifyRoute = require('./Routes/Otp/passwordResetVerify');
const passwordResetRoute = require('./Routes/SignIn/passwordReset');

// //            ***************  HOME  REQUIRING ******************                //

const homeRoute = require('./Routes/Home/home');

// //            ***************  ACCOUNT  REQUIRING ******************                //

const accountRoute = require('./Routes/Account/account');
const receiveMoneyRoute = require('./Routes/transactions/receivemoney');
const aacountAmount_transactionfee = require('./Routes/transactions/AccountBalance_transactionfee/index');
const checkUser = require('./Routes/transactions/SendMoney/checkUser');
const getuserAccount = require('./Routes/transactions/SendMoney/getuserAccount');
const sendMoneyCheckout = require('./Routes/transactions/SendMoney/sendMoneyCheckout');

const topUpFee = require('./Routes/transactions/TopUp/topuptransactionfee');

const notifyMechandRoute = require('./Routes/MechandsRoute/NotifyMechandiser/topUpNotify');
const topUpCheckOutRoute = require('./Routes/transactions/TopUp/topUpCheckOut');
const withdrawCheckOutRoute = require('./Routes/transactions/Withdraw/withdrawCheckOut');

const checkingtopupRoute = require('./Routes/transactions/TopUp/checkConfirmation');
const checkingWithdrawRoute = require('./Routes/transactions/Withdraw/checkWithdralConfirm');

// const withdrawalAmountRoute = require("./Routes/transactions/Withdraw/withdrawAmount");

// //            ***************  DASHBOARD  REQUIRING ******************                //

const agentListRoute = require('./Routes/AgentRoute/AgentList');
const mechandiserTopUpcheckRoute = require('./Routes/MechandsRoute/TopUpMechandiser/topUpCheckRequest');
const topUpAcceptedRoute = require('./Routes/MechandsRoute/TopUpMechandiser/topUpAccepted');
const withdrawAcceptedRoute = require('./Routes/MechandsRoute/WithdrawMechandiser/withdrawAccepted');
const mechandiserwithdrawRoute = require('./Routes/MechandsRoute/WithdrawMechandiser/withdrawCheckRequest');
const agentPasswordRoute = require('./Routes/MechandsRoute/AgentPassword/agentPassword');
const agentRegistrationRoute = require('./Routes/MechandsRoute/AgentsRoute/AgentRegistration/agentRegistration');
const checkUserExist = require('./Routes/MechandsRoute/AgentsRoute/AgentRegistration/checkUserExist');
const agentCreatePasswordRoute = require('./Routes/MechandsRoute/AgentPassword/agentCreatePassword');
const createAgentAccountRoute = require('./Routes/MechandsRoute/AgentPassword/createAccountAgent');
const updateAgentAccountStatusRoute = require('./Routes/AgentRoute/updateAccountStatus');

// //            ***************  ADMIN STATISTICS  REQUIRING ****************** .js               //
const admin_statistics = require('./Routes/Admin_Statistics/Dashboard/adminStats');
const requests = require('./Routes/Admin_Statistics/Dashboard/requests');
const reply_request = require('./Routes/Admin_Statistics/RequestManagement/index');
const analytics = require('./Routes/Admin_Statistics/Analytics/index');
const registered_users = require('./Routes/Admin_Statistics/Users/registered_users');
const user_detail = require('./Routes/Admin_Statistics/Users/user_detail');
const accounts_list = require('./Routes/Admin_Statistics/Accounts/accounts_list');
const activity = require('./Routes/Admin_Statistics/Accounts/activity');
const agents_list = require('./Routes/Admin_Statistics/Agents/agents_list');
const transaction_detail = require('./Routes/Admin_Statistics/Transactions/transaction_detail');

const receivedmoney = require('./Routes/Admin_Statistics/Transactions/receivedmoney');
const sendmoney = require('./Routes/Admin_Statistics/Transactions/sendmoney');
const topup = require('./Routes/Admin_Statistics/Transactions/topup');
const withdraw = require('./Routes/Admin_Statistics/Transactions/withdraw');

const breakfast = require('./Routes/Admin_Statistics/PaymentsTransactions/breakfast');
const combo_tickets = require('./Routes/Admin_Statistics/PaymentsTransactions/combo_tickets');
const dinner = require('./Routes/Admin_Statistics/PaymentsTransactions/dinner');
const lunch = require('./Routes/Admin_Statistics/PaymentsTransactions/lunch');
const create_fee = require('./Routes/Admin_Statistics/Fees/create');
const ferhataccount = require('./Routes/Admin_Statistics/Ferhat/index');
const faqs = require('./Routes/Admin_Statistics/Website/faqs');

// //            ***************  PAYMENTS  REQUIRING ****************** .js               //

const paymentsRoute = require('./Routes/Payments/payments');
const getProducts = require('./Routes/Payments/getProducts');
const generateQR = require('./Routes/Payments/generateQR');

const paymentsCheckoutRoute = require('./Routes/Payments/PaymentCheckout/paymentCheckout');
const comboticketPrizes = require('./Routes/ProductPrizes/compoMealTcketPrizes');

const paymentsHistoryRoute = require('./Routes/Payments/PaymentHistory/paymentHistory');
// //            ***************  PROFILE  REQUIRING ******************                //

const profileSettingsRoute = require('./Routes/Profile/ProfileSettings/ProfileSettingsAPI/profileSettings');

// //############################# PERSONAL DETAILS

const updateNamesRoute = require('./Routes/Profile/ProfileSettings/UpdatePersonalDetails/updateNames');
const profilePasswordRoute = require('./Routes/Profile/Secutity/checkOldpassword');
const logoutRoute = require('./Routes/Profile/Logout/logout');
const securityRoute = require('./Routes/Profile/Secutity/SecurityAPI');
const accountsettingsRoute = require('./Routes/Profile/AccountSettings/AccountAPI');
const API = require('./API');
// //////////////////////////////////////////////////////////////////
// //===============================================================

// // Middlware chain include in every request for route made to the server
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

// var express = require('express');
// var app = module.exports = express();
// var session = require('express-session');

var options = {
	host: 'localhost',
	port: '3306',
	user: 'ferhmguw_ferhatpay',
	password: 'bats1raiMucha',
	database: 'ferhmguw_ferhatpay',
};

var sessionStore = new MySQLStore(options);

// app.use(session({
//     key: 'session_cookie_name',
//     secret: 'session_cookie_secret',

//     resave: false,
//     saveUninitialized: false
// }));

app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		store: sessionStore,
		saveUninitialized: true,
		cookie: { secure: false },
	})
);

require('./Authentication/config/passportLogin');

// console.log("req.session");
// // console.log(req.user);
// // console.log(req.isAuthenticated());

// // app.use(flash());
// io.on("connection", (socket) => {
//   console.log(`${socket.id} joined`);
//   console.log();
//   socket.on("chatEdit", (msq) => {
//     console.log(msq);

//     io.emit("checkcheck", "received");

//     // socket.join(msq);
//     // socket.to(msq).emit("Cornfirm")
//     // io.to("msq").emit("waitingForAgent","waitingForAgent")
//     // socket.broadcast.emit("waitingForAgent", "waitingForAgent");
//   });

//   socket.emit("joinedwaitingForConfimation", "Joined Waiting Confimation");
//   // socket.emit("message",'Welcome'); .......emit to single client
//   // socket.broadcast.emit("message",'Welcome');.........all clients connected except the client connected
//   // io.emit("message",'Welcome');......./ all clinets  in general

//   socket.on("disconnect", () => {
//     io.emit("message", "a user logged out chat");
//     console.log("disconnected");
//   });
// });

//  http.listen(4547, () => console.log("Server running"));
// // config the port in which the server is listening
// // const server = app.listen(4547, function () {
// //   const host = server.address().address;
// //   const port = server.address().port;
// // });
// // var http = require('http').createServer(app);

// // re initialize and rerun passport on each request
// //   // `req.user` contains the authenticated user.
app.use(routes.authentication, API);
console.log(routes.authentication);

app.use(passport.initialize());
app.use(passport.session());

// //////////////////////////////////////////////////////////////////
// //===============================================================
// //            -------------ROUTES---------------                //
// //-----------------------AUTHENTICATION ROUTES------------------------------ //

app.use(authenticationRoute);
// //-----------------------LOGIN ROUTES------------------------------ //
app.use(loginRoute);
app.use(forgotPasswordRoute);
app.use(passwordResetVerifyRoute);
app.use(passwordResetRoute);
// app.use(nexmoRoute);passwordResetVerify

// //-----------------------REGISTRATION ROUTES--------------------------- //
app.use(registerNumberOTPRoute);
app.use(verifyOtpRoute);
app.use(registerRoute);
app.use(adminRegister);
app.use(otp_resend);

// //------------------------HOME ROUTES------------------------ //
app.use(homeRoute);

// //-----------------------ACCOUNT ROUTES---------------------------- //

app.use(accountRoute);
app.use(receiveMoneyRoute);
app.use(aacountAmount_transactionfee);
app.use(notifyMechandRoute);
app.use(topUpCheckOutRoute);
app.use(topUpFee);
app.use(checkUser);
app.use(getuserAccount);
app.use(sendMoneyCheckout);

app.use(withdrawCheckOutRoute);

app.use(checkingtopupRoute);
// app.use(withdrawalAmountRoute);
app.use(mechandiserwithdrawRoute);
app.use(checkingWithdrawRoute);

// //-----------------------ADMIN STATISTICS ROUTES---------------------------- //

app.use(admin_statistics);
app.use(requests);
app.use(reply_request);
app.use(analytics);
app.use(registered_users);
app.use(user_detail);
app.use(accounts_list);
app.use(activity);
app.use(agents_list);
app.use(transaction_detail);
app.use(create_fee);
app.use(ferhataccount);
app.use(faqs);

app.use(breakfast);
app.use(combo_tickets);
app.use(dinner);
app.use(lunch);

app.use(receivedmoney);
app.use(sendmoney);
app.use(topup);
app.use(withdraw);
// //-----------------------DASHBOARD ROUTES---------------------------- //

app.use(agentListRoute);
app.use(mechandiserTopUpcheckRoute);
app.use(topUpAcceptedRoute);
app.use(withdrawAcceptedRoute);
app.use(agentPasswordRoute);
app.use(agentRegistrationRoute);
app.use(checkUserExist);
app.use(agentCreatePasswordRoute);
app.use(createAgentAccountRoute);
app.use(updateAgentAccountStatusRoute);

// //-----------------------PAYMENTS ROUTES----------------------------  //
app.use(paymentsRoute);
app.use(paymentsCheckoutRoute);
app.use(comboticketPrizes);
app.use(paymentsHistoryRoute);
app.use(getProducts);
app.use(generateQR);

// //-----------------------PROFILE ROUTES---------------------------- //
app.use(profileSettingsRoute);
// //__________________________PERSONAL DETAILS ROUTES____________________//

app.use(updateNamesRoute);
app.use(profilePasswordRoute);
app.use(logoutRoute);
app.use(securityRoute);
app.use(accountsettingsRoute);

// var http = require('http');
// var server = http.createServer(function(req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     var message = 'It works!\n',
//         version = 'NodeJS ' + process.versions.node + '\n',
//         response = [message, version].join('\n');
//     res.end(response);
// });
// server.listen();

app.listen();
