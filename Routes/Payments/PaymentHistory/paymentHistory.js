const express = require("express");
const router = express.Router();
const dbConnect = require("../../../Database/dbconnection");
const isAuth = require("../../../Authorization/authMiddleware").isAuth;

router.get("/batsiraiferhatpay/paymentHistory", isAuth, (req, res, next) => {
  let userid = req.session.passport.user;

  let sql = "SELECT * FROM paymentTransactions  WHERE UserID = ?";
  dbConnect.query(sql, [userid], (err, transaction) => {
    if (err) {
      return res.send({
        data: null,
        authorization: true,
        error: "Database Error",
      });
    }
    if (!transaction) {
      return res.send({
        data: null,
        authorization: true,
        error: "No User Found",
      });
    }

    if (transaction) {
      console.log(transaction);

      return res.send({ data: transaction, authorization: true, error: false });
    }
  });
});

module.exports = router;
