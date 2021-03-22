const express = require("express");
const router = express.Router();
const dbConnect = require("../../Database/dbconnection");
const isAuth = require("../../Authorization/authMiddleware").isAuth;

router.get("/batsiraiferhatpay/home", isAuth, (req, res, next) => {
  let userid = req.session.passport.user;

  let sql =
    "SELECT   account.AccountNumber,account.Status ,account.AccountBalance, account.account_id, users.FullName,users.LastName FROM users JOIN account ON account.UserID = users.id   WHERE users.id = ?";
  let query = dbConnect.query(sql, [userid], (err, result) => {
    if (err) {
      return res.send({
        data: null,
        authorization: true,
        error: err,
      });
    }
    if (!result[0]) {
      return res.send({
        data: null,
        authorization: true,
        error: "No User Found",
      });
    }

    if (result[0]) {
      return res.send({ data: result[0], authorization: true, error: false });
    }
  });
});


router.get("/batsiraiferhatpay", (req, res) => {
  var message = '<h1>It this is home page!</h1>';
       
    res.end(message);
});

module.exports = router;
