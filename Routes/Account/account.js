const express = require("express");
const router = express.Router();
const dbConnect = require("../../Database/dbconnection");
const isAuth = require("../../Authorization/authMiddleware").isAuth;

router.get("/batsiraiferhatpay/account", isAuth, (req, res, next) => {
  let userid = req.session.passport.user;

  let sql =
    "SELECT  * FROM  account  WHERE UserID = ?";

  let query = dbConnect.query(sql, [userid], (err, accountResult) => {
    if (err) {
      return res.send({
        data: null,
        authorization: true,
        error: "Database Error",
      });
    }
    if (!accountResult[0]) {
      return res.send({
        data: null,
        authorization: true,
        error: "No User Found",
      });
    }

    if (accountResult[0]) {
      return res.send({
        data: {  account: accountResult[0] },
        authorization: true,
        error: false,
      });
    }
  });
});

module.exports = router;
