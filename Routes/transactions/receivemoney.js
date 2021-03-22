const express = require("express");
const router = express.Router();
const dbConnect = require("../../Database/dbconnection");
const isAuth = require("../../Authorization/authMiddleware").isAuth;

router.get("/batsiraiferhatpay/receivedMoney", isAuth, (req, res, next) => {
  let userid = req.session.passport.user;

  let sql =
    // "SELECT   receivedmoney.sendAccountID,receivedmoney.ReceiverAccountID ,receivedmoney.receivedAmount, receivedmoney.receiveTransactionID, receivedmoney.TransactionRef,receivedmoney.receivedStatus, receivedmoney.receiveNotification FROM users JOIN account ON account.UserID = users.id   WHERE users.id = ?";
    "SELECT * FROM receivedmoney  WHERE receiverUserID = ?";
  let query = dbConnect.query(sql, [userid], (err, result) => {
    if (err) {
      return res.send({
        data: null,
        authorization: true,
        error: "Database Error",
      });
    }
    if (!result) {
      console.log("data empty");

      return res.send({
        data: null,
        authorization: true,
        error: "No User Found",
      });
    }

    if (result) {
      console.log("data found");
      console.log(result);
      return res.send({ data: result, authorization: true, error: false });
    }
  });
});

module.exports = router;
